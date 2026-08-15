#!/usr/bin/env node
// 语法知识库导出脚本：Obsidian 库 → app/src/main/assets/grammar.js
// 用法：node tools/export_grammar.js
// 来源：C:/Users/jpc79/Documents/obsidian/英语 下 词法/语法/句法 三个目录

const fs = require('fs');
const path = require('path');

const OBSIDIAN_DIR = 'C:/Users/jpc79/Documents/obsidian/英语';
const DIRS = ['词法', '语法', '句法'];
const EXCLUDE_TAGS = new Set(['英语', '语法', '词法', '句法', '目录']);
const STOP_KEYWORDS = new Set(['核心主线', '注意', '口诀', '化简', '不作成分', '作成分']);
// 标题里含这些核心词时，把核心词也加为关键词（如"定语从句"→"从句"/"定语"）
const TITLE_EXTRA = ['从句', '语态', '语气', '动词', '句型', '成分', '时态', '代词', '名词', '冠词', '数词', '形容词', '副词', '介词', '连词', '非谓语', '定语', '状语', '主语', '宾语', '表语', '同位语', '虚拟', '被动', '情态', '主谓一致', '倒装', '强调', '并列', '简单句', '复合句'];
const OUTPUT = path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'grammar.js');

// 解析 YAML frontmatter，返回 { body, tags }
function parseFrontmatter(text) {
    const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (!m) return { body: text, tags: [] };
    const fm = m[1];
    const body = text.slice(m[0].length);
    const tags = [];
    const tagMatch = fm.match(/^tags:\s*\n([\s\S]*?)(?=\n\w+\s*:|\n---|$)/m);
    if (tagMatch) {
        tagMatch[1].split('\n').forEach(function(line) {
            const t = line.match(/^\s*-\s*(.+?)\s*$/);
            if (t && t[1]) tags.push(t[1].trim());
        });
    }
    return { body, tags };
}

// 抽标题中文部分："# 虚拟语气 Subjunctive Mood" → "虚拟语气"
function extractTitle(body) {
    const m = body.match(/^#\s+(.+?)\s*$/m);
    if (!m) return '';
    const raw = m[1].trim();
    const cn = raw.match(/[\u4e00-\u9fa5][\u4e00-\u9fa5\s]*/);
    return cn ? cn[0].trim() : raw;
}

// 抽"核心主线"引用块（多行 > 引用），作总纲用
function extractSummary(body) {
    const m = body.match(/>\s*\*\*核心主线[：:]?\*\*\s*([\s\S]*?)(?=\n(?!>))/);
    if (!m) return '';
    return m[1].trim();
}

// 清洗 wikilink："[[英语/句法/1 句子成分]]" → "句子成分"；"[[path|别名]]" → "别名"
function cleanWikilinks(body) {
    return body.replace(/\[\[([^\]]+)\]\]/g, function(match, inner) {
        const parts = inner.split('|');
        const target = parts.length > 1 ? parts[1] : parts[0];
        const seg = target.split('/').pop();
        return seg.replace(/^\d+\s*/, '').trim();
    });
}

// 抽关键词：tags（去通用）+ 标题（含核心词）+ 正文加粗（过滤噪音）
function extractKeywords(tags, title, body) {
    const kw = new Set();
    tags.forEach(function(t) {
        if (t && !EXCLUDE_TAGS.has(t)) kw.add(t);
    });
    if (title) {
        kw.add(title);
        TITLE_EXTRA.forEach(function(w) {
            if (title.indexOf(w) !== -1) kw.add(w);
        });
    }
    const boldRe = /\*\*([^*]+)\*\*/g;
    let m;
    while ((m = boldRe.exec(body)) !== null) {
        const b = m[1].trim();
        if (!b) continue;
        if (b.length < 2 || b.length > 12) continue;
        if (!/[\u4e00-\u9fa5]/.test(b)) continue;
        if (/[:：、，。!?！？]/.test(b)) continue;
        if (STOP_KEYWORDS.has(b)) continue;
        kw.add(b);
        if (kw.size >= 30) break;
    }
    return Array.from(kw).slice(0, 30);
}

// 生成 grammar.js 源码
function buildGrammarJs(sections) {
    const data = JSON.stringify(sections, null, 2);
    return `// 语法知识库 - 由 tools/export_grammar.js 生成，勿手改
// 来源：${OBSIDIAN_DIR}
var GRAMMAR_SECTIONS = ${data};

function matchGrammarSections(question) {
    if (!question) return [];
    var q = question.toLowerCase();
    var scored = [];
    GRAMMAR_SECTIONS.forEach(function(section) {
        var score = 0;
        (section.keywords || []).forEach(function(kw) {
            if (kw && q.indexOf(kw.toLowerCase()) !== -1) {
                score += kw.length;
            }
        });
        if (score > 0) scored.push({ key: section.key, score: score });
    });
    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.slice(0, 3).map(function(s) { return s.key; });
}

function buildGrammarContext(question) {
    var MAX_LEN = 6000;
    var parts = [];
    ['词法总览', '语法总览', '句法总览'].forEach(function(key) {
        var sec = GRAMMAR_SECTIONS.find(function(s) { return s.key === key; });
        if (sec && sec.summary) parts.push(sec.summary);
    });
    matchGrammarSections(question).forEach(function(key) {
        var sec = GRAMMAR_SECTIONS.find(function(s) { return s.key === key; });
        if (sec && sec.key.indexOf('总览') === -1) parts.push(sec.content);
    });
    var result = parts.join('\\n\\n');
    if (result.length > MAX_LEN) result = result.substring(0, MAX_LEN);
    return result;
}

if (typeof window !== 'undefined') {
    window.Grammar = {
        GRAMMAR_SECTIONS: GRAMMAR_SECTIONS,
        matchGrammarSections: matchGrammarSections,
        buildGrammarContext: buildGrammarContext
    };
}
`;
}

// 主流程
function main() {
    const sections = [];
    for (const dir of DIRS) {
        const dirPath = path.join(OBSIDIAN_DIR, dir);
        if (!fs.existsSync(dirPath)) {
            console.error('目录不存在：' + dirPath);
            continue;
        }
        const files = fs.readdirSync(dirPath).filter(function(f) { return f.endsWith('.md'); }).sort();
        for (const file of files) {
            const text = fs.readFileSync(path.join(dirPath, file), 'utf8');
            const { body, tags } = parseFrontmatter(text);
            const title = extractTitle(body);
            const summary = extractSummary(body);
            const keywords = extractKeywords(tags, title, body);
            const content = cleanWikilinks(body);
            const key = title || file.replace(/\.md$/, '').replace(/^\d+\s*/, '');
            sections.push({ key: key, title: title, dir: dir, summary: summary, content: content, keywords: keywords });
        }
    }

    const grammarJs = buildGrammarJs(sections);
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, grammarJs, 'utf8');
    console.log('✅ 生成 grammar.js：' + sections.length + ' 个章节，' + (grammarJs.length / 1024).toFixed(1) + ' KB');
    console.log('   输出：' + OUTPUT);
}

main();
