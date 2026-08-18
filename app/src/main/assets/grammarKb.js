// 语法分析规则知识库 - 长句分析输出约束 + 本地校验
// 单一数据源：prompt 注入文本 与 本地校验器 共用同一份枚举与规则
// 手写维护（区别于 grammar.js 的 Obsidian 导出流程）；新增规则只需加一条 pattern 记录

// ---------- 内部工具 ----------

// 分词：小写、去标点，按字母连续段切分
function kbTokenize(text) {
    return (String(text || '').toLowerCase().match(/[a-z']+/g) || []);
}

// 逐词覆盖检查：segments 是否逐词覆盖原句（贪心按顺序匹配）
function kbCoverageIssues(sentence, segments) {
    var sTok = kbTokenize(sentence);
    var segTok = [];
    segments.forEach(function (s) {
        if (s && s.text) segTok = segTok.concat(kbTokenize(s.text));
    });
    var segConsumed = [];
    for (var c = 0; c < segTok.length; c++) segConsumed.push(false);

    var missing = [];
    var p = 0;
    for (var i = 0; i < sTok.length; i++) {
        var t = sTok[i];
        var found = -1;
        for (var k = p; k < segTok.length; k++) {
            if (!segConsumed[k] && segTok[k] === t) { found = k; break; }
        }
        if (found >= 0) { segConsumed[found] = true; p = found + 1; }
        else { missing.push(t); }
    }
    var extra = [];
    for (var j = 0; j < segTok.length; j++) {
        if (!segConsumed[j]) extra.push(segTok[j]);
    }
    return { missing: missing, extra: extra, ok: missing.length === 0 && extra.length === 0 };
}

// 枚举校验：type / role 必须落在知识库枚举内
function kbEnumIssues(segments) {
    var issues = [];
    var typeSet = {}, roleSet = {};
    GRAMMAR_KB.clauseTypes.forEach(function (t) { typeSet[t.type] = true; });
    GRAMMAR_KB.roles.forEach(function (r) { roleSet[r.role] = true; });
    segments.forEach(function (s, i) {
        if (s && s.type !== undefined && s.type !== null && !typeSet[s.type]) {
            issues.push('第' + (i + 1) + '段的 type "' + s.type + '" 不在枚举内');
        }
        if (s && s.role !== undefined && s.role !== null && !roleSet[s.role]) {
            issues.push('第' + (i + 1) + '段的 role "' + s.role + '" 不在枚举内');
        }
    });
    return issues;
}

// ---------- 规则校验器 ----------

// 规则A 同位语：主句成分段内出现逗号配对的 a/an/the+名词短语 → 疑似吞并同位语
function kbAppositiveValidate(segments, idx) {
    var s = segments[idx];
    if (!s || !s.text) return null;
    if (s.type === 'main' && (s.role === 'S' || s.role === 'O' || s.role === 'C')) {
        var re = /,\s+(?:a|an|the)\s+[A-Za-z][^,]{0,40}?(?:,\s|$)/g;
        var m;
        var found = null;
        while ((m = re.exec(s.text)) !== null) {
            // 排除并列列表（含 and/or）与 such as / including 等举例结构
            if (/\band\s+|\bor\s+|such\s+as|including\s+/i.test(m[0].replace(/,\s+(?:a|an|the)\s+/, ', the '))) continue;
            found = m[0].trim();
            break;
        }
        if (found) {
            return '第' + (idx + 1) + '段（main/' + s.role + '）内出现 "' + found + '"，疑似把同位语并进了主句成分；同位语应独立成段（type=appositive, role=Attr）';
        }
    }
    return null;
}

// 分词短语后置定语常见动词表（分词吞并检查用）
var KB_HIGH_SIGNAL_PARTICIPLES = {
    supporting: 1, providing: 1, causing: 1, increasing: 1, making: 1, using: 1,
    showing: 1, affecting: 1, changing: 1, following: 1, including: 1, reflecting: 1,
    representing: 1, concerning: 1, contributing: 1, explaining: 1, describing: 1,
    suggesting: 1, involving: 1, covering: 1, preventing: 1, reducing: 1, raising: 1,
    lowering: 1, helping: 1, forcing: 1, encouraging: 1, enabling: 1, allowing: 1,
    requiring: 1, offering: 1, claiming: 1, arguing: 1, indicating: 1, revealing: 1,
    bringing: 1, producing: 1, creating: 1, forming: 1, developing: 1, improving: 1,
    maintaining: 1, protecting: 1, controlling: 1, managing: 1, operating: 1,
    training: 1, testing: 1, treating: 1, questioning: 1, challenging: 1,
    reviewing: 1, working: 1, studying: 1, teaching: 1, driving: 1, leading: 1
};

// 分词前可合法出现的词（be 动词、助动词、介词、连词等）→ 前面的 -ing 不是后置定语
var KB_PARTICIPLE_SKIP = {
    is: 1, am: 1, are: 1, was: 1, were: 1, be: 1, been: 1, being: 1, "'s": 1,
    not: 1, "n't": 1, by: 1, without: 1, after: 1, before: 1, while: 1, when: 1,
    as: 1, since: 1, because: 1, although: 1, though: 1, if: 1, the: 1, a: 1, an: 1,
    of: 1, in: 1, on: 1, at: 1, with: 1, to: 1, for: 1, and: 1, or: 1, but: 1,
    so: 1, that: 1, who: 1, which: 1, it: 1, their: 1, its: 1, his: 1, her: 1, our: 1
};

// 规则B/C 分词短语后置定语：that/which 从句段内出现裸 doing（前非 be/助词）→ 疑似吞并分词短语
function kbParticipleValidate(segments, idx) {
    var s = segments[idx];
    if (!s || !s.text) return null;
    if (s.type !== 'which-relative' && s.type !== 'that-object') return null;
    var toks = kbTokenize(s.text);
    for (var i = 0; i < toks.length; i++) {
        var tok = toks[i];
        if (tok.length < 5 || !KB_HIGH_SIGNAL_PARTICIPLES[tok]) continue;
        var prev = i > 0 ? toks[i - 1] : '';
        if (KB_PARTICIPLE_SKIP[prev]) continue;
        return '第' + (idx + 1) + '段（' + s.type + '）内出现分词 "' + tok + '"，疑似把"分词短语后置定语"并进了从句段；它应独立成段（type=non-finite, role=Attr），该从句段应在宾语处结束';
    }
    return null;
}

// ---------- 知识库数据 ----------

var GRAMMAR_KB = {
    clauseTypes: [
        { type: 'main', desc: '主句' },
        { type: 'that-object', desc: 'that 引导的宾语从句（及物动词/介词后 that + 完整陈述）' },
        { type: 'embedded-object', desc: '嵌套的宾语从句（省略 that）' },
        { type: 'subject-clause', desc: '主语从句（that/whether/wh- 引导，整体作主句主语）' },
        { type: 'predicative-clause', desc: '表语从句（系动词 is/are/was 后 that/whether/wh- 引导）' },
        { type: 'appositive', desc: '同位语从句/同位语（抽象名词 fact/idea/evidence/risk 后 that 从句，或名词后逗号配对的同位语短语）' },
        { type: 'which-relative', desc: 'that/which/who/whose/where/when 引导的定语从句' },
        { type: 'adverbial', desc: '其他状语从句（时间 when/before、原因 because/since/as、目的 so that、结果 so...that、地点 where 等）' },
        { type: 'concessive', desc: 'although/though/while 引导的让步状语从句' },
        { type: 'conditional', desc: '条件状语从句（if/unless，含虚拟条件句）' },
        { type: 'cleft', desc: '强调句（It is ... that）' },
        { type: 'reporting-insert', desc: '引述插入句（says/argues/claims + 人名，逗号配对插在主谓之间，不是主句谓语）' },
        { type: 'inf-purpose', desc: '不定式目的状语' },
        { type: 'inf-object', desc: '不定式宾补（drive/want/allow/force/encourage sb to do，to do 补充说明宾语）' },
        { type: 'non-finite', desc: '分词/动名词非谓语短语（分词作定语/状语、动名词短语、独立主格、with 复合结构）' },
        { type: 'other-clause', desc: '其他未归类的从句/短语（兜底）' }
    ],
    roles: [
        { role: 'S', desc: '主语' },
        { role: 'V', desc: '谓语/系动词' },
        { role: 'O', desc: '宾语' },
        { role: 'C', desc: '补语/表语/主补/宾补' },
        { role: 'Attr', desc: '定语（修饰名词）' },
        { role: 'Adv', desc: '状语（修饰动词或整句）' },
        { role: 'Conj', desc: '连词/引导词/插入语' },
        { role: 'Rel', desc: '关系代词（定语从句中的 that/which/who）' },
        { role: 'Prep', desc: '介词短语' },
        { role: '', desc: '无特殊角色（标点、冠词、普通介词等）' }
    ],
    patterns: [
        {
            id: 'appositive',
            name: '同位语',
            promptText: '规则A 同位语：成对逗号内，若"专有名词/名词短语 + a/an/the+名词"相邻且所指相同 → 判为同位语，必须独立成段，type=appositive，role=Attr；禁止计入主句 S/V/O/C，禁止与引述插入句混标。',
            validate: kbAppositiveValidate
        },
        {
            id: 'participle-post-attrib',
            name: '分词短语后置定语',
            promptText: '规则B 分词短语后置定语：名词后紧跟裸 doing（前面无 be、无引导词）→ 判为现在分词短语作后置定语，必须独立成段，type=non-finite，role=Attr。',
            validate: kbParticipleValidate
        },
        {
            id: 'clause-boundary',
            name: '从句段边界',
            promptText: '规则C 从句段边界：that/which/who 定语从句段在其谓语动词的宾语处结束；宾语名词后紧跟的 doing 短语另起一段，不并入该从句段。',
            validate: null // 边界规则的实际拦截由 kbParticipleValidate 覆盖
        },
        {
            id: 'inf-object',
            name: '不定式宾补',
            promptText: '规则D 不定式宾补：drive/want/allow/force/encourage/require/cause + 宾语 + to do → to do 是不定式作宾补，type=inf-object，补充说明宾语；仅当 to do 表目的（为了…）时才标 inf-purpose。',
            validate: null
        },
        {
            id: 'reporting-insert',
            name: '引述插入句',
            promptText: '规则E 引述插入句：says/argues/claims/notes/writes/observes + 人名/机构名，被逗号配对夹在主谓之间 → 引述插入句，type=reporting-insert，role=Conj；它不是主句谓语，不得标 main。',
            validate: null
        }
    ]
};

// ---------- 对外接口 ----------

// 生成注入 prompt 的规则文本
function buildRuleContext() {
    var lines = ['=== 语法规则（必须严格遵守）==='];
    GRAMMAR_KB.patterns.forEach(function (p) {
        if (p.promptText) lines.push('- ' + p.promptText);
    });
    return lines.join('\n');
}

// 生成从句类型枚举文本
function buildClauseTypeEnumText() {
    return GRAMMAR_KB.clauseTypes.map(function (t) {
        return '- "' + t.type + '" — ' + t.desc;
    }).join('\n');
}

// 生成语法角色枚举文本
function buildRoleEnumText() {
    return GRAMMAR_KB.roles.map(function (r) {
        return '- "' + r.role + '" — ' + r.desc;
    }).join('\n');
}

// 本地校验器：返回问题列表（空数组 = 通过）
function validateSegments(sentence, segments) {
    var issues = [];
    if (!segments || !segments.length) {
        return ['segments 为空'];
    }

    segments.forEach(function (s, i) {
        if (!s) { issues.push('第' + (i + 1) + '段为空'); return; }
        if (!s.text || !String(s.text).trim()) issues.push('第' + (i + 1) + '段缺少 text');
        if (s.type === undefined || s.type === null) issues.push('第' + (i + 1) + '段缺少 type');
        if (s.role === undefined || s.role === null) issues.push('第' + (i + 1) + '段缺少 role');
    });

    var cov = kbCoverageIssues(sentence, segments);
    if (!cov.ok) {
        var msg = 'segments 未逐词覆盖原句';
        if (cov.missing.length) msg += '，缺少单词：[' + cov.missing.join(', ') + ']';
        if (cov.extra.length) msg += '，多出单词：[' + cov.extra.join(', ') + ']';
        issues.push(msg);
    }

    issues = issues.concat(kbEnumIssues(segments));

    GRAMMAR_KB.patterns.forEach(function (p) {
        if (!p.validate) return;
        segments.forEach(function (s, i) {
            var issue = p.validate(segments, i);
            if (issue) issues.push(issue);
        });
    });

    return issues;
}

if (typeof window !== 'undefined') {
    window.GrammarKB = {
        clauseTypes: GRAMMAR_KB.clauseTypes,
        roles: GRAMMAR_KB.roles,
        patterns: GRAMMAR_KB.patterns,
        buildRuleContext: buildRuleContext,
        buildClauseTypeEnumText: buildClauseTypeEnumText,
        buildRoleEnumText: buildRoleEnumText,
        validateSegments: validateSegments
    };
}
