# Wordbook（单词本）

一款**离线优先**的语境化英语词汇学习 Android 应用，主要面向考研英语备考者。

## 为什么选择 Wordbook？

传统背单词软件有两个通病：**单词与语境割裂**（背诵孤立的词汇表，缺乏真实文本的关联支撑）和**强网络依赖**（在线查词在地铁、图书馆等场景不可靠）。

Wordbook 的解决思路是让用户将任意英文文章粘贴进应用，直接从中选取陌生单词纳入学习计划，实现"从阅读中来，到记忆中去"的语境化学习闭环。内置约 5500 词的离线英汉词典，核心查词功能无需网络即可完成。

## 主要功能

- **从文章提取单词**：粘贴英文文章，自动分词，点击选择需要学习的单词
- **AI 智能翻译**：DeepSeek AI 返回单词的词性 + 中文释义，翻译质量远超传统机翻
- **二级翻译回退**：DeepSeek API → 本地词典（~5500 词）→ 占位提示，平滑离线降级
- **抽认卡复习模式**：Fisher-Yates 随机洗牌，每次学习顺序不同，卡片翻转交互
- **文章组管理**：将单词按文章来源分组，复习时原文高亮当前单词位置
- **长按删除**：单词和文章组均支持长按删除，带确认弹窗
- **纯本地存储**：所有数据存储在 localStorage，无服务端、无账号、无隐私顾虑

## UI 结构

```
📱 Wordbook 单词本
│
├── 📖 词组页面 (#articles-section)          ← 首页，默认显示
│   ├── 标题栏: "我的词组" + [添加词组] 按钮
│   └── 词组卡片列表 (#articles-list)
│
├── 📝 我的单词页面 (#wordbook-section)       ← hidden
│   ├── 标题栏: "我的单词" + 计数 + [添加单词] 按钮
│   └── 单词列表 (#wordbook-list)
│
├── ⚙️ 设置页面 (#settings-section)           ← hidden
│   └── DeepSeek AI 翻译配置卡片
│       ├── API Key 输入框
│       ├── [保存配置] [清除配置]
│       └── 获取密钥帮助说明
│
├── 📄 文章详情页面 (#article-detail-section) ← hidden
│   ├── [← 返回] 标题
│   ├── 单词闪卡 (翻牌效果 —— 单词 ↔ 释义)
│   ├── [上一个] [下一个] 导航
│   └── 原文展示区 (选中单词高亮)
│
├── 🪟 模态框 (弹窗)
│   ├── #article-modal              → 粘贴文章，点击选词
│   ├── #word-modal                 → 添加/编辑单词和释义
│   ├── #add-article-options-modal  → 选择"添加文章"或"添加单词"
│   └── #article-title-modal       → 输入词组标题
│
└── 🔽 底部导航栏 (footer)
    ├── 📚 词组  (data-page="home")
    ├── 📄 单词  (data-page="words")
    └── ⚙️ 设置  (data-page="settings")
```

### 页面流转

```
首页(词组列表)
  ├── [底部导航] → 切换到 单词页面 / 设置页面
  ├── [添加词组] → 选项弹窗 → 粘贴文章弹窗 → 点击选词 → 词组标题弹窗 → 保存
  ├── [点击词组卡片] → 文章详情页 (闪卡 + 原文高亮)
  └── [添加单词] → 单词弹窗 → 输入单词和释义 → 保存
```

## 技术架构

```
┌──────────────────────────┐
│  Android WebView 壳       │   Kotlin / MainActivity
│  加载 assets/index.html  │
├──────────────────────────┤
│  单页 Web 应用（SPA）     │
│  ├─ app.js       核心逻辑 │   ~1400 行，状态管理、CRUD、抽认卡引擎
│  ├─ dictionary.js 离线词库 │   ~4266 行，~5500 考研英语词汇
│  ├─ translator.js 翻译模块 │   DeepSeek Chat API + 本地词典回退
│  └─ styles.css    样式    │   Material Design 风格，CSS 变量、过渡动画
└──────────────────────────┘
```

- **Android 层**：极薄封装，仅 `ComponentActivity` + `WebView`，无 Jetpack Compose / ViewModel / Navigation
- **Web 层**：原生 JavaScript SPA，不依赖任何前端框架
- **数据持久化**：同步 `localStorage`（键：`wordbook`、`articles`、`deepseekApiKey`）
- **翻译服务**：DeepSeek AI Chat API，通过 system prompt 约束返回 JSON 格式的词性 + 释义

## 快速开始

### 构建 Android 应用

```bash
# 在 Android Studio 中打开项目目录，或使用命令行：
./gradlew assembleDebug
```

生成的 APK 位于 `app/build/outputs/apk/debug/`。

### 在浏览器中开发调试

由于 DeepSeek API 支持浏览器端 CORS 请求，直接在浏览器中打开 `index.html` 即可调试翻译功能。

```bash
# 启动本地静态服务器（可选，用于避免 file:// 协议限制）
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 目录结构

```
Wordbook/
├── app/
│   ├── build.gradle.kts          # 应用模块构建（minSdk 24 / targetSdk 36）
│   └── src/main/
│       ├── java/com/example/wordbook/
│       │   └── MainActivity.kt   # WebView 入口
│       ├── assets/               # Web 应用文件
│       │   ├── index.html
│       │   ├── app.js
│       │   ├── dictionary.js
│       │   ├── translator.js
│       │   └── styles.css
│       ├── res/                  # Android 资源
│       └── AndroidManifest.xml
├── build.gradle.kts              # 根构建文件
├── settings.gradle.kts
├── proxy_server.py               # Python 开发代理（已废弃，DeepSeek 不再需要）
└── 使用指南.md                   # 用户使用文档
```

## 核心逻辑流

```
用户粘贴文章 ──→ 正则分词（单词 / 标点 / 空白）
       │
       ▼
点击选中单词 ──→ 批量翻译 ──→ 二级回退：
       │           ├─ DeepSeek AI API（返回词性 + 释义 JSON）
       │           ├─ 本地词典 O(1) 查找（~5500 词）
       │           └─ 占位提示文本
       │
       ▼
保存到文章组 ──→ 抽认卡复习：
                    ├─ Fisher-Yates 洗牌（O(n) 原地随机）
                    ├─ 卡片翻转（单词 ↔ 释义）
                    ├─ 原文高亮（正则边界匹配，按长度降序防误匹配）
                    └─ 本地 localStorage 持久化
```

该项目**不包含大语言模型、长链推理或多 Agent 协作**，所有智能行为由确定性算法驱动。翻译功能通过调用 DeepSeek 外部 API 实现。

## 注意事项

- DeepSeek API Key 需要用户自行在 [platform.deepseek.com](https://platform.deepseek.com) 注册获取，新用户通常有免费额度
- 翻译批处理当前为串行执行，批量翻译大量单词时较慢，可改为 `Promise.all()` 并行化
- 自动构建索引的代码尚未实现，当前需要手动管理单词的添加及复习进度
- `proxy_server.py` 是为旧版百度翻译 API 设计的代理，升级到 DeepSeek 后已不再需要

## 许可

仅供个人学习使用。
