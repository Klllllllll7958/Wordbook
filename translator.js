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

    // 翻译单词并提取句子（一次API调用完成单词翻译+句子定位+句子翻译）
    async translateWordsWithSentences(articleContent, words) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API密钥未配置');
        }

        const systemPrompt = `你是一个专业的英汉词典。用户会提供一篇文章和一组从文章中选出的英文单词。
请为每个单词做三件事：
1. 给出词性和中文释义
2. 在文章中找到包含该单词的句子（选取用户最可能选中该单词的上下文句子）
3. 将该句子翻译成中文

重要标记规则：
- 在原句(sentence)中，用 **单词** 标记目标单词（例如：**ubiquitous**）
- 在翻译(sentenceTranslation)中，用 **对应中文释义** 标记目标单词的翻译部分（例如：**无处不在的**）

请严格按照以下JSON数组格式返回，不要包含任何其他内容：
[
  {
    "word": "单词",
    "pos": "词性（如 n./v./adj./adv. 等）",
    "meaning": "中文释义（简洁准确）",
    "sentence": "原句，目标单词用**包裹",
    "sentenceTranslation": "句子中文翻译，单词释义用**包裹"
  }
]

示例文章：
"The ubiquitous nature of smartphones has changed society profoundly."

示例输入单词：ubiquitous, profoundly

示例输出：
[
  {"word": "ubiquitous", "pos": "adj.", "meaning": "无处不在的", "sentence": "The **ubiquitous** nature of smartphones has changed society profoundly.", "sentenceTranslation": "智能手机的**无处不在的**本质已经深刻地改变了社会。"},
  {"word": "profoundly", "pos": "adv.", "meaning": "深刻地", "sentence": "The ubiquitous nature of smartphones has changed society **profoundly**.", "sentenceTranslation": "智能手机的无处不在的本质已经**深刻地**改变了社会。"}
]`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
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
                        { role: 'user', content: `文章内容：\n${articleContent}\n\n请为以下单词查找句子并翻译：${words.join(', ')}` }
                    ],
                    temperature: 0.3,
                    max_tokens: Math.max(1000, words.length * 300)
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

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
            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content.trim();
                console.log('单词+句子翻译返回:', content);

                // 提取JSON数组
                let jsonStr = content;
                const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
                if (jsonMatch) {
                    jsonStr = jsonMatch[1].trim();
                }
                const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
                if (arrayMatch) {
                    jsonStr = arrayMatch[0];
                }

                const parsed = JSON.parse(jsonStr);
                const resultMap = {};
                for (const item of parsed) {
                    const w = item.word.toLowerCase();
                    let meaning = '';
                    if (item.pos && item.meaning) {
                        meaning = `${item.pos} ${item.meaning}`;
                    } else if (item.meaning) {
                        meaning = item.meaning;
                    }
                    resultMap[w] = {
                        word: item.word,
                        meaning: meaning,
                        sentence: item.sentence || '',
                        sentenceTranslation: item.sentenceTranslation || ''
                    };
                }

                // 按原始顺序返回结果
                return words.map(word => {
                    const result = resultMap[word.toLowerCase()];
                    return {
                        word: word,
                        meaning: result ? result.meaning : '',
                        sentence: result ? result.sentence : '',
                        sentenceTranslation: result ? result.sentenceTranslation : '',
                        source: 'deepseek'
                    };
                });
            }

            throw new Error('AI未返回有效结果');
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('DeepSeek API请求超时');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // 分析英文长难句结构（从句类型+语法角色+翻译+拆解+树状图）
    async analyzeSentence(sentence) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API密钥未配置');
        }

        const systemPrompt = `你是一个专业的英语语法分析专家。用户会提供一个英文长难句，请做三件事：
1. 将句子翻译成中文
2. 将句子按语法结构分段，标注每段的从句类型和语法角色
3. 输出逐层拆解和树状图

从句类型(type)：
- "main" — 主句
- "that-object" — that引导的宾语从句
- "which-relative" — which引导的定语从句
- "concessive" — although/though/while引导的让步状语从句
- "embedded-object" — 嵌套的宾语从句（省略that）
- "inf-purpose" — 不定式目的状语
- "other-clause" — 其他从句/短语

语法角色(role)：
- "S" — 主语
- "V" — 谓语/系动词
- "O" — 宾语
- "C" — 补语/表语/主补
- "Attr" — 定语
- "Adv" — 状语
- "Conj" — 连词
- "Rel" — 关系代词
- "Prep" — 介词短语
- "" — 无特殊角色（标点、冠词、普通介词等辅助词）

请返回如下JSON（不要包含任何其他内容）：
{
  "translation": "中文翻译",
  "segments": [
    {"text": "The study", "type": "main", "role": "S"},
    {"text": "found", "type": "main", "role": "V"},
    ...
  ],
  "breakdown": "逐层拆解和树状图文本（用emoji标记从句类型，如🔵主句、🟢that宾语从句、🟠which定语从句、🟣让步状语从句、🔴嵌套宾语从句）"
}

segments必须覆盖句子的每一个词/标点，顺序与原文一致。
breakdown格式示例：
🔵 主句：The study (S) + found (V) + that... (宾语从句)
  主句是句子的核心骨架。

🟢 that宾语从句：team-building exercises (S) + which... (定语从句) + were considered (V, 被动) + too heavy-handed and intrusive (主补)
  that从句作found的宾语，说明"发现了什么"。

🌳 结构树：
├─ 主句
│  ├─ The study (S)
│  ├─ found (V)
│  └─ [that宾语从句]
│
└─ ...`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
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
                        { role: 'user', content: `请分析以下英文句子：\n${sentence}` }
                    ],
                    temperature: 0.3,
                    max_tokens: 2000
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

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
            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content.trim();
                console.log('句子分析返回:', content);

                let jsonStr = content;
                const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
                if (jsonMatch) {
                    jsonStr = jsonMatch[1].trim();
                }
                const objMatch = jsonStr.match(/\{[\s\S]*\}/);
                if (objMatch) {
                    jsonStr = objMatch[0];
                }

                const parsed = JSON.parse(jsonStr);
                return {
                    translation: parsed.translation || '',
                    segments: parsed.segments || [],
                    breakdown: parsed.breakdown || ''
                };
            }

            throw new Error('AI未返回有效结果');
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('DeepSeek API请求超时');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
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
