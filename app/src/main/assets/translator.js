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

        const kb = (typeof window !== 'undefined' && window.GrammarKB);
        if (!kb) {
            throw new Error('grammarKb.js 未加载，无法分析句子');
        }
        const clauseTypeEnum = kb.buildClauseTypeEnumText();
        const roleEnum = kb.buildRoleEnumText();
        const ruleContext = kb.buildRuleContext();

        const systemPrompt = `你是一个专业的考研英语长难句语法分析专家。分析方法遵循名师拆解体系，必须按以下顺序思考，禁止跳步：

分析步骤：
1. 数谓语动词：找出句中所有真正的谓语动词（限定动词）。注意：doing / done / to do 等非谓语动词不是谓语；情态动词+动词原形算一个谓语；并列谓语算多个。有几个谓语动词，就有几件"事"。
2. 识别特殊句式：先判断是否含以下结构，并按规则还原后再断开——
   - 虚拟条件句省略 if 的倒装：Were/Had/Should + 主语 → 还原为 If + 主语 + were/had/should；主句 would/could/might + 动词原形
   - 部分倒装：Only by/Never/Not until/So 等开头，助动词提前 → 还原正常语序（如 Only by ... can we hope → we can hope）
   - 强调句：It is/was + 强调部分 + that/who + 其余 → 去掉 It is ... that 框架后，剩余部分必须是完整句子
   - 分裂结构：成对逗号/破折号夹住的插入语 → 先取出，让主干恢复连贯
   还原后的语序写在 steps 里；segments 仍保持原文词序。
3. 断开：再按标点、连接词（that/which/who/whom/whose/when/where/if/although/though/while/as/because 等）、以及主谓结构，把句子断成若干简单句。
4. 简化：对每一件事，去掉修饰成分（介词短语、非谓语动词短语、插入语、同位语、定语从句），找出核心主干：主谓宾（SVO）或主系表（SVC）。
5. 标注：把句子按语法结构切分成 segments，标出每段所属的从句类型 type 和语法角色 role。segments 必须逐词覆盖整句、顺序与原文完全一致，禁止遗漏、合并、改写任何单词或标点。

输出 JSON（不要包含任何其他内容，不要用 markdown 代码块包裹）：
{
  "translation": "全句中文翻译",
  "steps": "简述思考过程：谓语动词清单 → 特殊句式还原 → 断开结果 → 每件事的主干（不超过200字）",
  "segments": [
    {"text": "单词或短语原文", "type": "main", "role": "S"}
  ],
  "breakdown": "分层拆解：先用emoji标出每件事（🔵主句、🟢that宾语从句、🟠that/which定语从句、🟣让步状语从句、🔴嵌套宾语从句等），每件事写清'主干：S + V + O'，再说明修饰成分挂在哪里；最后以 🌳 开头输出结构树状图（├─ └─ 缩进）"
}

硬性规则：
- 主干优先：先保证每个谓语动词的主语、谓语、宾语/表语正确，再标注修饰成分。
- 插入语（如 says Hofstadter、everyone claims）不是主干，不能当主句谓语。
- 非谓语（doing/done/to do）不是谓语动词，但可作定语/状语/宾补，按语法功能标角色。
- that 从句判定：先行词是名词且 that 在从句中作成分 → 定语从句（which-relative）；及物动词后 that 引导完整陈述 → 宾语从句（that-object）；抽象名词（fact/idea/evidence/risk）后 that 引导完整陈述 → 同位语从句（appositive）。
- 每个从句必须有谓语，主句必须结构完整。若某从句没有谓语，说明切分或标注错误，必须重新思考。

特殊句式处理规则：
- 虚拟语气：were/had/should 前置是谓语动词，要数进谓语清单；主句 would/could/might + 动词原形构成谓语。按还原后的 If + 主语 + 谓语来标 S/V。
- 倒装：只把助动词提前的是部分倒装（主语仍在谓语后）；there be、方位词开头的全倒装也一样，先还原主语和谓语的位置再标角色。
- 强调句：It is ... that 不是"it 作主语 + that 定语从句"；被强调成分按它在原句中的真实角色标注（主语标 S、状语标 Adv），that 后剩余成分按真实角色标注。
- 独立主格 / with 复合结构 → 非谓语短语（non-finite）；比较结构 → 兜底（other-clause）；整体内部再标 S/V 等角色。

${ruleContext}

从句类型(type)枚举（只能选以下）：
${clauseTypeEnum}

语法角色(role)枚举（只能选以下）：
${roleEnum}

示例（输入）：
The same dramatic technological changes that have provided marketers with more communications choices have also increased the risk that passionate consumers will voice their opinions.

示例（输出）：
{
  "translation": "同样剧烈的技术变革使营销人员获得了更多沟通选择，但也增加了充满激情的消费者表达观点的风险。",
  "steps": "谓语动词：have provided / have increased / will voice，共3件事。特殊句式：无。断开：主句 + that定语从句（修饰changes）+ that定语从句（修饰risk）。简化：主句主干 = changes have increased risk。",
  "segments": [
    {"text": "The same dramatic technological changes", "type": "main", "role": "S"},
    {"text": "that have provided marketers with more communications choices", "type": "which-relative", "role": "Attr"},
    {"text": "have also increased", "type": "main", "role": "V"},
    {"text": "the risk", "type": "main", "role": "O"},
    {"text": "that passionate consumers will voice their opinions", "type": "appositive", "role": "Attr"}
  ],
  "breakdown": "🔵 主句：The same dramatic technological changes (S) + have also increased (V) + the risk (O)，主干 = changes have increased risk。\\n\\n🟠 that定语从句（修饰 changes）：that have provided marketers with more communications choices。\\n\\n🟠 that同位语从句（说明 risk）：that passionate consumers will voice their opinions。\\n\\n🌳 结构树：\\n├─ 主句\\n│  ├─ The same dramatic technological changes (S)\\n│  │  └─ [that定语从句]\\n│  ├─ have also increased (V)\\n│  └─ the risk (O)\\n│     └─ [that同位语从句]"
}`;

        const cleanResult = (parsed, warnings) => {
            const result = {
                translation: parsed.translation || '',
                segments: parsed.segments || [],
                breakdown: parsed.breakdown || ''
            };
            if (warnings && warnings.length) {
                result.validationWarnings = warnings;
            }
            return result;
        };

        let lastParsed = null;
        let lastIssues = [];

        // 最多 2 次：首次 + 1 次重试（重试时携带校验错误，让 LLM 修正）
        for (let attempt = 0; attempt < 2; attempt++) {
            const userContent = attempt === 0
                ? `请分析以下英文句子：\n${sentence}`
                : `请分析以下英文句子：\n${sentence}\n\n上一次分析存在以下问题，请修正后重新输出完整 JSON：\n- ${lastIssues.join('\n- ')}`;

            try {
                const parsed = await this._callAnalyzeDeepSeek(systemPrompt, userContent);
                lastParsed = parsed;
                lastIssues = kb.validateSegments(sentence, parsed.segments);

                if (lastIssues.length === 0) {
                    console.log('句子分析校验通过');
                    return cleanResult(parsed);
                }
                console.warn(`句子分析校验未通过（第${attempt + 1}次）:`, lastIssues);
            } catch (error) {
                if (lastParsed) {
                    // 首次已拿到结果但重试请求失败：回退到上次结果
                    console.warn('句子分析重试请求失败，回退到上次结果:', error.message);
                    return cleanResult(lastParsed, lastIssues);
                }
                throw error;
            }
        }

        // 两次均未通过校验：返回最后一次结果，附上校验警告
        console.warn('句子分析两次均未通过校验，返回带警告的结果');
        return cleanResult(lastParsed, lastIssues);
    }

    // 调用 DeepSeek 分析句子，返回解析后的 JSON 对象
    async _callAnalyzeDeepSeek(systemPrompt, userContent) {
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
                        { role: 'user', content: userContent }
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

    // 批量翻译（并行请求，大幅提升速度）
    async translateBatch(words) {
        const results = await Promise.all(
            words.map(async (word) => {
                try {
                    return await this.translate(word);
                } catch (error) {
                    return {
                        word: word,
                        meaning: '翻译失败',
                        source: 'error'
                    };
                }
            })
        );
        return results;
    }
}

// 创建全局翻译器实例
const translator = new Translator();

// 将翻译器实例添加到window对象，以便其他模块访问
if (typeof window !== 'undefined') {
    window.translator = translator;
}
