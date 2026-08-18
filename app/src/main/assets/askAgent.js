// 问它 - 单词语境问答引擎（单次 DeepSeek 调用）
// 负责：组装卡片语境、注入 system prompt、调用 DeepSeek、错误映射
// 会话历史由调用方（app.js）维护，此处只接收完整 messages（不含 system）并补上 system
class AskAgent {
    constructor() {
        this.apiUrl = 'https://api.deepseek.com/chat/completions';
        this.loadConfig();
    }

    // 从localStorage加载配置
    loadConfig() {
        this.apiKey = localStorage.getItem('deepseekApiKey') || '';
    }

    // 组装卡片语境（免费预填进首轮 prompt）
    buildContext(wordInfo) {
        if (!wordInfo) return '';
        var parts = [];
        parts.push('【单词】' + (wordInfo.word || ''));
        if (wordInfo.meaning) parts.push('【释义】' + wordInfo.meaning);
        if (wordInfo.sentence) parts.push('【原句】' + wordInfo.sentence);
        if (wordInfo.sentenceTranslation) parts.push('【原句翻译】' + wordInfo.sentenceTranslation);
        return parts.join('\n');
    }

    // 组装长句语境（全本地免费，预填进首轮 prompt）
    buildSentenceContext(sentenceInfo, question, articleText) {
        if (!sentenceInfo) return '';
        var parts = [];
        if (sentenceInfo.sentence) parts.push('【原句】' + sentenceInfo.sentence);
        if (sentenceInfo.translation) parts.push('【中文翻译】' + sentenceInfo.translation);
        if (sentenceInfo.segments && sentenceInfo.segments.length) {
            parts.push('【结构解析】' + JSON.stringify(sentenceInfo.segments));
        }
        if (sentenceInfo.breakdown) parts.push('【逐层拆解】' + sentenceInfo.breakdown);
        var grammar = (typeof window !== 'undefined' && window.Grammar)
            ? window.Grammar.buildGrammarContext(question)
            : '';
        if (grammar) parts.push('【语法参考】\n' + grammar);
        if (articleText) parts.push('【原文段落】\n' + articleText);
        return parts.join('\n\n');
    }

    // system prompt：四类口径 + 内容红线 + 输出格式
    _systemPrompt() {
        return `你是考研英语单词辅导老师。用户就当前卡片上的单词提出开放问题，你要结合给出的卡片语境回答。回答严格限定在当前词/句语境，不做与学习无关的自由对话。

支持的提问类型与回答要点：
1. 语境词义（"在这里什么意思"）：给出该语境下的义项 + 画面感 + 1-2 个同义替换。
2. 一词多义（"还有其他意思吗"）：列出其他义项，说明与本语境义项的区分。
3. 母语者语感（"母语者怎么理解"）：用画面/意象解释母语者的直觉感受，而非罗列词典释义。
4. 近义词辨析（"区分 X 和 Y"）：给出画面对比 + 各自适用场景 + 英中对照例句。

回答结构（通用骨架）：语境义项 → 依据/画面感 → 1-2 个英中对照例句；辨析题追加双方对比。

硬性要求：
- 不编造词义；拿不准的义项标注"此义项较少见"。
- 对比类回答必须给出双方适用场景，不能只夸一方。
- 回答精炼，不铺陈。

输出格式：仅用 mini-markdown —— **加粗**、换行、- 列表、| 表格。禁止标题(#)、代码块、编号列表。`;
    }

    // system prompt：长句专属口径（结构拆解/时态语气/指代关系）+ 本地解析的使用
    _sentenceSystemPrompt() {
        return `你是考研英语长难句辅导老师。用户就当前句子提出开放问题，你要结合【原句】【中文翻译】【结构解析】【逐层拆解】【语法参考】等给出的语境回答。回答严格限定在当前句子语境，不做与学习无关的自由对话。

支持的提问类型与回答要点：
1. 结构拆解（"这句话怎么拆解？"）：先给出句子主干（主谓宾），再逐层标注修饰成分——从句、非谓语、插入语、并列结构，说明各成分修饰什么、在句中起什么作用，最后串联整体语义。
2. 时态语气（"为什么用这个时态/语气？"）：说明时态/语态/虚拟语气/情态动词的选择逻辑，对应原文语境、时间关系或作者意图；必要时对比换成另一种写法会有什么差别。
3. 指代关系（"这里 it/它/which 指什么？"）：结合就近原则、单复数与语法一致、上下文的语义联系定位先行词/指代对象，并说明判定依据；拿不准时明确说无法确定。

回答结构（通用骨架）：主干定位 → 成分标注 → 结合原文语境解释；指代题追加先行词判定依据。

硬性要求：
- 不编造语法规则；句式用标准术语（定语从句/状语从句/非谓语等）。
- 与给出的【结构解析】【逐层拆解】冲突时，以原文句子为准，可指出本地解析的偏差。
- 回答精炼，不铺陈。

输出格式：仅用 mini-markdown —— **加粗**、换行、- 列表、| 表格。禁止标题(#)、代码块、编号列表。`;
    }

    // 长句提问入口：使用长句专属 system prompt
    async askSentence(messages) {
        return this.ask(messages, this._sentenceSystemPrompt());
    }

    // 单次调用。messages 为完整对话历史（不含 system），此处补上 system 后请求
    // systemPrompt 可选：默认单词口径，长句请走 askSentence
    async ask(messages, systemPrompt) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API密钥未配置');
        }

        // 只把 role/content 发给 API（本地历史里的 display 等字段剥离，避免多余字段）
        const fullMessages = [{ role: 'system', content: systemPrompt || this._systemPrompt() }].concat(
            (messages || []).map(function(m) { return { role: m.role, content: m.content }; })
        );

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.apiKey
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: fullMessages,
                    temperature: 0.3,
                    max_tokens: 800
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log('问它响应状态: ' + response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('问它 API错误: ' + response.status + ' - ' + errorText);
                if (response.status === 401) {
                    throw new Error('API密钥无效，请检查DeepSeek API密钥');
                }
                if (response.status === 402) {
                    throw new Error('API余额不足，请充值DeepSeek账户');
                }
                throw new Error('API请求失败: HTTP ' + response.status);
            }

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                const content = data.choices[0].message.content.trim();
                console.log('问它返回:', content);
                return content;
            }

            throw new Error('AI未返回有效结果');
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('请求超时，请重试');
            }
            console.error('问它失败:', error);
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }
}

// 创建全局实例
const askAgent = new AskAgent();

// 将实例添加到window对象，以便其他模块访问
if (typeof window !== 'undefined') {
    window.askAgent = askAgent;
}
