// 翻译服务 - 使用DeepSeek AI API和本地词库
class Translator {
    constructor() {
        this.loadConfig();
        this.apiUrl = 'https://api.deepseek.com/chat/completions';
    }

    // 从localStorage加载配置
    loadConfig() {
        this.apiKey = localStorage.getItem('deepseekApiKey') || '';
    }

    // 设置DeepSeek API密钥
    setDeepSeekCredentials(apiKey) {
        this.apiKey = apiKey;
        localStorage.setItem('deepseekApiKey', apiKey);
    }

    // 使用DeepSeek AI翻译单词，返回词性+释义
    async translateWithDeepSeek(word) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API密钥未配置');
        }

        const systemPrompt = `你是一个专业的英汉词典。对于用户输入的英文单词，请返回该单词的词性和中文释义。

请严格按照以下JSON格式返回，不要包含任何其他内容：
{
  "word": "单词",
  "pos": "词性（如 n./v./adj./adv./prep./conj./pron. 等，多个词性用 | 分隔）",
  "meaning": "中文释义（简洁准确，多个释义用分号分隔，每个释义前标注对应词性编号）"
}

示例：
输入: book
输出: {"word": "book", "pos": "n. | v.", "meaning": "①书，书籍；本子，册子 ②预订，预约"}

输入: beautiful
输出: {"word": "beautiful", "pos": "adj.", "meaning": "美丽的，漂亮的；出色的，完美的"}`;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: word }
                    ],
                    temperature: 0.3,
                    max_tokens: 500
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log(`DeepSeek响应状态: ${response.status}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`DeepSeek API错误: ${response.status} - ${errorText}`);
                if (response.status === 401) {
                    throw new Error('API密钥无效，请检查DeepSeek API密钥');
                }
                if (response.status === 402) {
                    throw new Error('API余额不足，请充值DeepSeek账户');
                }
                throw new Error(`API请求失败: HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log('DeepSeek响应:', JSON.stringify(data));

            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content.trim();
                console.log('AI返回内容:', content);

                // 尝试解析JSON格式响应
                try {
                    // 提取JSON（处理可能的markdown代码块包裹）
                    let jsonStr = content;
                    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
                    if (jsonMatch) {
                        jsonStr = jsonMatch[1].trim();
                    }
                    const parsed = JSON.parse(jsonStr);

                    let result = '';
                    if (parsed.pos && parsed.meaning) {
                        result = `${parsed.pos} ${parsed.meaning}`;
                    } else if (parsed.meaning) {
                        result = parsed.meaning;
                    } else {
                        result = content;
                    }

                    console.log('翻译成功:', result);
                    return result;
                } catch (parseError) {
                    // JSON解析失败，直接返回内容作为释义
                    console.log('JSON解析失败，使用原始内容:', content);
                    return content;
                }
            }

            throw new Error('AI未返回有效结果');
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('DeepSeek API请求超时');
            }
            console.error('DeepSeek翻译失败:', error);
            throw error;
        }
    }

    // 主翻译函数 - 先尝试DeepSeek API，失败再使用本地词库
    async translate(word) {
        // 1. 首先尝试DeepSeek API（获取词性+释义）
        try {
            const deepseekResult = await this.translateWithDeepSeek(word);
            return {
                word: word,
                meaning: deepseekResult,
                source: 'deepseek'
            };
        } catch (error) {
            console.warn('DeepSeek翻译失败，尝试本地词库:', error.message);
        }

        // 2. DeepSeek失败，尝试本地词库
        const localResult = lookupInLocalDictionary(word);
        if (localResult) {
            return {
                word: word,
                meaning: localResult,
                source: 'local'
            };
        }

        // 3. 都失败，返回提示
        return {
            word: word,
            meaning: '（需要配置DeepSeek API密钥或添加到本地词库）',
            source: 'none'
        };
    }

    // 批量翻译
    async translateBatch(words) {
        const results = [];
        for (const word of words) {
            try {
                const result = await this.translate(word);
                results.push(result);
            } catch (error) {
                results.push({
                    word: word,
                    meaning: '翻译失败',
                    source: 'error'
                });
            }
        }
        return results;
    }
}

// 创建全局翻译器实例
const translator = new Translator();

// 将翻译器实例添加到window对象，以便其他模块访问
if (typeof window !== 'undefined') {
    window.translator = translator;
}
