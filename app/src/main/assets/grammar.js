// 语法知识库 - 由 tools/export_grammar.js 生成，勿手改
// 来源：C:/Users/jpc79/Documents/obsidian/英语
var GRAMMAR_SECTIONS = [
  {
    "key": "词法总览",
    "title": "词法总览",
    "dir": "词法",
    "summary": "词法是英语语法的\"零件库\"——从**词类划分**到**各词类的形态变化与句法功能**，为句法（组装句子）提供材料。词法 + 句法 = 语法。",
    "content": "# 词法总览 Morphology Overview\n\n> **核心主线：** 词法是英语语法的\"零件库\"——从**词类划分**到**各词类的形态变化与句法功能**，为句法（组装句子）提供材料。词法 + 句法 = 语法。\n\n---\n\n## 词法研究什么\n\n词法研究**单词的分类**（词类）、**词形的变化**（名词复数、动词变形、比较级等）以及**各词类在句中的功能**。\n\n```\n英语语法\n├── 词法（单词层面） ← 本目录\n│   ├── 名词、代词、冠词、数词（名词性词类）\n│   ├── 形容词、副词（修饰性词类）\n│   ├── 动词（句子的\"心脏\"）\n│   └── 介词、连词（连接性词类）\n└── 句法（句子层面） → 句法总览\n```\n\n---\n\n## 词类总表（10 大词类）\n\n| 词类 | 英文 | 作用 | 所在笔记 |\n|:-----|:-----|:-----|:--------|\n| 名词 | Noun | 表示人、物、概念 | 名词 Nouns |\n| 代词 | Pronoun | 代替名词 | 代词 Pronouns |\n| 冠词 | Article | 限定名词 | 冠词 Articles |\n| 数词 | Numeral | 表示数量与顺序 | 数词 Numerals |\n| 形容词 | Adjective | 修饰名词 | 形容词 Adjectives |\n| 副词 | Adverb | 修饰动词/形容词/句子 | 副词 Adverbs |\n| 动词 | Verb | 表示动作或状态 | 动词 Verbs |\n| 介词 | Preposition | 表示名词与其他词的关系 | 介词 Prepositions |\n| 连词 | Conjunction | 连接词/短语/分句 | 连词 Conjunctions |\n| 感叹词 | Interjection | 表达情感 | 本目录内补充 |\n\n---\n\n## 笔记列表\n\n| 编号 | 笔记 | 核心内容 |\n|:----:|:----|:----|\n| 1 | 名词 Nouns | 名词分类、可数性、复数变化、所有格 |\n| 2 | 代词 Pronouns | 人称/物主/反身/指示/不定代词、it 用法 |\n| 3 | 冠词 Articles | a/an、the、零冠词三者的选择规则 |\n| 4 | 数词 Numerals | 基数词、序数词、分数、小数、倍数 |\n| 5 | 形容词 Adjectives | 分类、比较级/最高级、词序、-ed/-ing |\n| 6 | 副词 Adverbs | 分类、位置规则、比较级、程度副词 |\n| 7 | 动词 Verbs | 动词分类、及物/不及物、五种基本形式 |\n| 8 | 介词 Prepositions | 时间/地点/方式介词、易混辨析 |\n| 9 | 连词 Conjunctions | 并列连词、从属连词、关联连词 |\n\n---\n\n## 两条学习路径\n\n### 路径A：按词类逐个攻破（系统学习）\n```\n名词 → 代词 → 冠词 → 数词 → 形容词 → 副词 → 动词 → 介词 → 连词\n```\n按上表顺序，从\"实体词\"到\"连接词\"，循序渐进。\n\n### 路径B：按句法功能反推（最快实用）\n```\n先学动词（句子核心）→ 名词/代词（主语/宾语）→ 介词/连词（连接）→ 修饰词\n```\n配合 句子成分 使用，理解\"每个词类在句中能担任什么成分\"。\n\n---\n\n## 相关章节\n\n- 句法总览 — 词法是为句法服务的\"零件库\"\n- 语法总览 — 词法 + 句法 = 语法全貌\n\n> **下一站：** 进入 句子成分，学习词类如何组装成句子。\n",
    "keywords": [
      "词法总览",
      "词类划分",
      "单词的分类",
      "词形的变化",
      "各词类在句中的功能"
    ]
  },
  {
    "key": "名词",
    "title": "名词",
    "dir": "词法",
    "summary": "名词是句子的\"主角\"（主语/宾语/表语），学习重点 = **分类**（专有/普通、可数/不可数）+ **数**（单复数变化）+ **格**（所有格）。",
    "content": "# 名词 Nouns\n\n> **核心主线：** 名词是句子的\"主角\"（主语/宾语/表语），学习重点 = **分类**（专有/普通、可数/不可数）+ **数**（单复数变化）+ **格**（所有格）。\n\n---\n\n## 一、名词的分类\n\n### 1.1 专有名词 vs 普通名词\n\n| 类型 | 说明 | 例词 |\n|:-----|:-----|:-----|\n| **专有名词** | 特定的人、地、机构等，首字母大写 | China, Tom, Monday, the UN |\n| **普通名词** | 泛指一类人或物 | student, city, idea, water |\n\n### 1.2 普通名词的细分\n\n| 类型 | 说明 | 例词 |\n|:-----|:-----|:-----|\n| **个体名词**（可数） | 单个人/物 | a book, two apples |\n| **集体名词**（可数） | 一群人或物 | a team, the police |\n| **物质名词**（不可数） | 无法分割的物质 | water, rice, air |\n| **抽象名词**（不可数） | 概念、性质、状态 | love, happiness, knowledge |\n\n### 1.3 可数名词 vs 不可数名词 ⭐\n\n**核心判定标准：能否直接数出\"一个、两个\"。**\n\n| 可数名词 | 不可数名词 |\n|:--------|:----------|\n| 有单复数：book → books | 无复数：water ✕ waters |\n| 可加 a/an：a pen | 不加 a/an：a water ✕ |\n| 可加 many：many books | 加 much：much water |\n| 用 few/a few 修饰 | 用 little/a little 修饰 |\n\n> **易错点：** 有些名词\"分身\"——可数与不可数含义不同。如 `a glass（玻璃杯）` vs `glass（玻璃）`，`a paper（报纸）` vs `paper（纸）`。\n\n---\n\n## 二、名词的数（复数变化）\n\n### 2.1 规则复数变化\n\n| 规则 | 变化 | 例词 |\n|:-----|:-----|:-----|\n| 一般情况 | 加 -s | book→books, cat→cats |\n| 以 s/x/ch/sh 结尾 | 加 -es | box→boxes, watch→watches |\n| 辅音字母 + y | 变 y 为 i 加 -es | city→cities, baby→babies |\n| 以 f/fe 结尾 | 变 f/fe 为 v 加 -es | knife→knives, leaf→leaves |\n| 以 o 结尾 | 多数加 -es | tomato→tomatoes, hero→heroes |\n| 以 o 结尾（外来词/缩写） | 加 -s | photo→photos, piano→pianos |\n\n### 2.2 不规则复数\n\n| 变化类型 | 例词 |\n|:--------|:-----|\n| 元音变化 | man→men, woman→women, foot→feet, tooth→teeth, goose→geese |\n| 词尾变化 | child→children, ox→oxen |\n| 单复数同形 | sheep, deer, fish, Chinese, Japanese |\n| 只有复数形式 | trousers, glasses, scissors, clothes |\n\n> **复合名词复数：** `passer-by → passers-by`（变中心词）；`girl-friend → girl-friends`（无中心词则变末尾）。\n\n---\n\n## 三、名词的格（所有格）\n\n### 3.1 三种表示\"所属\"的方式\n\n| 方式 | 适用 | 例词 |\n|:-----|:-----|:-----|\n| **'s 所有格** | 有生命的人/动物 | Tom's bag, the dog's tail |\n| **of 所有格** | 无生命的事物 | the door of the room |\n| **双重所有格** | 强调\"其中之一\" | a friend of my father's |\n\n### 3.2 's 所有格变化规则\n\n| 情况 | 规则 | 例词 |\n|:-----|:-----|:-----|\n| 单数名词 | 加 `'s` | the boy's book |\n| 复数名词 | 加 `'` | the boys' books |\n| 不以 s 结尾的复数 | 加 `'s` | the children's toys |\n| 以 s 结尾的专有名词 | 加 `'` 或 `'s` | James' car / James's car |\n\n> **注意：** 表时间、距离、国家的名词也可用 `'s`：`today's news`，`an hour's walk`。\n\n---\n\n## 四、名词的性\n\n英语名词的\"性\"主要体现在**性别对应的词汇**上（不像法语/德语有语法性别）：\n\n| 阳性 | 阴性 | 中性 |\n|:-----|:-----|:-----|\n| man / boy | woman / girl | table, water |\n| waiter | waitress | idea |\n| actor | actress | book |\n\n---\n\n## 五、常见陷阱\n\n1. **不可数名词量化：** 用 `a piece of / a cup of / a bottle of` 等：`two pieces of paper`，`a cup of tea`。\n2. **以 s 结尾的不可数名词：** `news（消息）、physics（物理）、mathematics（数学）` 虽以 s 结尾但不可数、谓语用单数。\n3. **集合名词主谓一致：** 见 主谓一致。`The police are...`（复数），`The class is...`（整体）vs `The class are...`（成员）。\n\n---\n\n## 相关笔记\n\n- 代词 Pronouns — 名词的\"替身\"\n- 冠词 Articles — 名词的\"帽子\"\n- 数词 Numerals — 表示名词的数量\n- 主谓一致 — 名词单复数决定谓语形式\n",
    "keywords": [
      "名词",
      "分类",
      "专有名词",
      "普通名词",
      "个体名词",
      "集体名词",
      "物质名词",
      "抽象名词",
      "'s 所有格",
      "of 所有格",
      "双重所有格",
      "性别对应的词汇"
    ]
  },
  {
    "key": "代词",
    "title": "代词",
    "dir": "词法",
    "summary": "代词是名词的\"替身\"，学习重点 = **八类代词的分类与变形表**（人称/物主/反身）+ **it 的特殊用法** + **不定代词的辨析**。",
    "content": "# 代词 Pronouns\n\n> **核心主线：** 代词是名词的\"替身\"，学习重点 = **八类代词的分类与变形表**（人称/物主/反身）+ **it 的特殊用法** + **不定代词的辨析**。\n\n---\n\n## 一、代词的分类总表\n\n| 类别 | 作用 | 例词 |\n|:-----|:-----|:-----|\n| 人称代词 | 代替人或物 | I, you, he, she, it, we, they |\n| 物主代词 | 表示所属 | my, your, his, mine, yours |\n| 反身代词 | 表示\"自己\" | myself, yourself, himself |\n| 指示代词 | 指代\"这个/那个\" | this, that, these, those |\n| 不定代词 | 表示不确定的数量/范围 | some, any, no, none, each, both |\n| 疑问代词 | 引导疑问句 | who, whom, whose, what, which |\n| 关系代词 | 引导定语从句 | who, whom, which, that, whose |\n| 相互代词 | 表示\"相互\" | each other, one another |\n\n---\n\n## 二、人称代词、物主代词、反身代词变形表 ⭐\n\n| 人称 | 人称代词主格 | 人称代词宾格 | 物主代词（形容词性） | 物主代词（名词性） | 反身代词 |\n|:-----|:------------|:------------|:-------------------|:-----------------|:---------|\n| 第一人称单数 | I | me | my | mine | myself |\n| 第二人称单数 | you | you | your | yours | yourself |\n| 第三人称单数 | he / she / it | him / her / it | his / her / its | his / hers / its | himself / herself / itself |\n| 第一人称复数 | we | us | our | ours | ourselves |\n| 第二人称复数 | you | you | your | yours | yourselves |\n| 第三人称复数 | they | them | their | theirs | themselves |\n\n### 记忆口诀\n\n> **主格**作主语，**宾格**作宾语；**形容词性物主**后面跟名词，**名词性物主**后面什么都不跟。\n\n- This is **my** book.（形容词性 + 名词）\n- This book is **mine**.（名词性，单独使用）\n\n---\n\n## 三、it 的三大特殊用法 ⭐\n\n| 用法 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **指代** | 指上文提到的物/事 | I like the cat. **It** is cute. |\n| **指时间/天气/距离** | 作形式主语 | **It** is raining. / **It** is 3 p.m. |\n| **形式主语/宾语** | 代替不定式、动名词、从句 | **It** is important to study hard. / I find **it** easy to learn English. |\n\n---\n\n## 四、不定代词辨析\n\n### 4.1 some vs any\n\n| 代词 | 用法 | 例句 |\n|:-----|:-----|:-----|\n| **some** | 肯定句；委婉请求/建议的疑问句 | I have **some** money. / Would you like **some** tea? |\n| **any** | 否定句；一般疑问句；\"任何\" | I don't have **any** money. / Do you have **any** questions? |\n\n### 4.2 each vs every\n\n- **each**：强调\"每一个\"个体，可作主语/宾语/定语。\n- **every**：强调整体，只能作定语（后接单数名词）。\n- Each student has a book.（逐个强调）\n- Every student has a book.（整体概括）\n\n### 4.3 other / the other / another / others\n\n| 代词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **another** | 另一个（泛指，再一个） | I want **another** apple. |\n| **the other** | 另一个（两者中的剩余一个） | One is red, **the other** is blue. |\n| **others** | 其他人/物（泛指，复数） | Some like tea, **others** like coffee. |\n| **the others** | 其余全部 | Two are here, **the others** are gone. |\n\n### 4.4 both / either / neither（两者范围）\n\n| 代词 | 含义 | 谓语 |\n|:-----|:-----|:-----|\n| **both** | 两者都 | 复数 |\n| **either** | 两者中任一 | 单数 |\n| **neither** | 两者都不 | 单数 |\n\n> Both of them **are** students. / Either of the answers **is** right. / Neither answer **is** correct.\n\n---\n\n## 五、指示代词与疑问代词\n\n- **this/that/these/those**：`this/these` 近指，`that/those` 远指；`that/those` 还可替代上文名词避免重复。\n  - The weather in Beijing is colder than **that** in Shanghai.\n- **who/whom/whose/what/which**：作疑问代词；who 作主语，whom 作宾语（口语常被 who 代替）。\n\n---\n\n## 相关笔记\n\n- 名词 Nouns — 代词所代替的对象\n- 定语从句 — 关系代词引导从句\n- 主谓一致 — 代词作主语时的谓语一致\n",
    "keywords": [
      "代词",
      "八类代词的分类与变形表",
      "it 的特殊用法",
      "不定代词的辨析",
      "主格",
      "宾格",
      "形容词性物主",
      "名词性物主",
      "指代",
      "指时间/天气/距离",
      "形式主语/宾语"
    ]
  },
  {
    "key": "冠词",
    "title": "冠词",
    "dir": "词法",
    "summary": "冠词是名词的\"帽子\"，只有三个词：**a / an（不定冠词）、the（定冠词）、零冠词**。学习重点 = 记住**何时用哪顶帽子**。",
    "content": "# 冠词 Articles\n\n> **核心主线：** 冠词是名词的\"帽子\"，只有三个词：**a / an（不定冠词）、the（定冠词）、零冠词**。学习重点 = 记住**何时用哪顶帽子**。\n\n---\n\n## 一、冠词总览\n\n| 冠词 | 含义 | 用法核心 |\n|:-----|:-----|:--------|\n| **a / an** | 一个（泛指） | 用于可数名词单数，表泛指、第一次提到 |\n| **the** | 这个/那个（特指） | 双方都知道、上文提过、独一无二的事物 |\n| **零冠词**（不用冠词） | — | 表泛指、专有名词、习惯搭配等 |\n\n### a vs an 的选择 ⭐\n\n**看音标首音，不是看首字母！**\n\n| 规则 | 例词 |\n|:-----|:-----|\n| 辅音音素开头 → **a** | a **u**niversity, a **h**ouse, a **Euro**pean |\n| 元音音素开头 → **an** | an **h**our, an **h**onest boy, an **A**pple, an **U**mbrella |\n\n> **易错：** `hour / honest` 的 h 不发音 → 用 an；`university / European` 首音是 /j/ 辅音 → 用 a。\n\n---\n\n## 二、不定冠词 a/an 的用法\n\n1. **泛指\"一个\"**：I saw **a** dog.\n2. **首次提到**：There is **a** book on the desk.\n3. **表\"每一\"（与 per 同义）**：twice **a** week.\n4. **表\"某一位\"**：**A** Mr. Smith called you.（一位姓史密斯的人）\n5. **固定搭配**：have **a** cold, make **a** mistake, at **a** loss, in **a** hurry.\n\n---\n\n## 三、定冠词 the 的用法\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 双方都知道的事物 | Open **the** window, please. |\n| 上文已提到 | I saw a dog. **The** dog was black. |\n| 独一无二的事物 | **the** sun, **the** moon, **the** earth |\n| 乐器前 | play **the** piano, play **the** violin |\n| 形容词最高级/序数词前 | **the** best, **the** first |\n| 姓氏复数前（表一家人） | **The** Browns are at home. |\n| 形容词前（表一类人） | **the** rich（富人）, **the** young（年轻人） |\n| 江河海洋山脉前 | **the** Yangtze River, **the** Pacific |\n\n---\n\n## 四、零冠词（不用冠词）的情形\n\n| 情形 | 例词 |\n|:-----|:-----|\n| 表泛指的复数名词 | Books are useful.（泛指书籍） |\n| 表泛指的物质/抽象名词 | Water is important. / Time is money. |\n| 专有名词（人名、国名） | China, Tom, Beijing |\n| 三餐前 | have breakfast / lunch / dinner |\n| 球类、棋类前 | play basketball / play chess |\n| 学科前 | study English / learn math |\n| 季节、月份、星期前（泛指） | in summer, on Monday, in May |\n| 头衔、称呼语 | Professor Wang, Doctor Li |\n| 固定搭配 | by bus, at night, on foot, in bed |\n\n---\n\n## 五、冠词高频陷阱\n\n| 陷阱 | 正确理解 | 例句 |\n|:-----|:--------|:-----|\n| `go to school` vs `go to the school` | 无冠词表\"上学\"（功能），有冠词表\"去那所学校\"（地点） | He goes to **school** every day. / Mom went to **the school** to meet the teacher. |\n| `in hospital` vs `in the hospital` | 前者\"住院\"、后者\"在医院（不一定看病）\" | The patient is in **hospital**. |\n| `at table` vs `at the table` | 前者\"用餐\"、后者\"在桌旁\" | They are at **table**. |\n| 独一无二名词前仍需 the | the sun / the moon / the sky | The sun rises in the east. |\n\n---\n\n## 相关笔记\n\n- 名词 Nouns — 冠词修饰的对象\n- 形容词 Adjectives — 冠词 + 形容词 + 名词 的词序\n- 数词 Numerals — 序数词前用 the\n",
    "keywords": [
      "冠词",
      "何时用哪顶帽子",
      "零冠词",
      "泛指\"一个\"",
      "首次提到",
      "表\"某一位\"",
      "固定搭配"
    ]
  },
  {
    "key": "数词",
    "title": "数词",
    "dir": "词法",
    "summary": "数词分**基数词**（表数量）与**序数词**（表顺序）两大类，加上分数、小数、百分数、倍数的表达。重点 = 变形规则 + 句法功能。",
    "content": "# 数词 Numerals\n\n> **核心主线：** 数词分**基数词**（表数量）与**序数词**（表顺序）两大类，加上分数、小数、百分数、倍数的表达。重点 = 变形规则 + 句法功能。\n\n---\n\n## 一、基数词与序数词\n\n### 1.1 对照表\n\n| 基数词 | 序数词 | 基数词 | 序数词 |\n|:------|:------|:------|:------|\n| one | first (1st) | ten | tenth (10th) |\n| two | second (2nd) | eleven | eleventh (11th) |\n| three | third (3rd) | twelve | twelfth (12th) |\n| four | fourth (4th) | thirteen | thirteenth (13th) |\n| five | fifth (5th) | twenty | twentieth (20th) |\n| six | sixth (6th) | twenty-one | twenty-first (21st) |\n| seven | seventh (7th) | one hundred | hundredth (100th) |\n| eight | eighth (8th) | one thousand | thousandth (1000th) |\n| nine | ninth (9th) | one million | millionth |\n\n### 1.2 变形口诀\n\n> 一二三，**特殊记**（first/second/third）；四以上，**加 th**（fourth）；**五改 ve 为 f**（fifth）；**八去 t**（eighth）；**九去 e**（ninth）；**十二改 ve 为 f**（twelfth）；**整十把 y 改 ie**（twentieth）。\n\n### 1.3 拼写要点\n\n- 十位与个位之间加连字符：`twenty-one`, `thirty-five`\n- 百与十/个之间加 **and**：`two hundred and five`\n- `hundred / thousand / million` 前有具体数字时不加 s：`three hundred`；表示\"数百/数千\"用复数：`hundreds of`, `thousands of`\n\n---\n\n## 二、序数词的句法功能\n\n1. **作定语**：the **first** lesson（第一课）\n2. **表顺序/名次**：He came **second** in the race.\n3. **与 a/an 连用表\"又一\"**：a **second** time（再一次）\n4. **前常加 the**：the third floor（三楼）\n\n---\n\n## 三、分数、小数、百分数\n\n### 3.1 分数\n\n**分子用基数词，分母用序数词；分子 > 1 时分母加 s。**\n\n| 分数 | 读法 |\n|:-----|:-----|\n| 1/2 | one half / a half |\n| 1/3 | one third |\n| 1/4 | one quarter / one fourth |\n| 2/3 | two thirds |\n| 3/4 | three quarters |\n\n> 分子与分母之间可加 `over`：`3/5` → three over five（数学中常见）。\n\n### 3.2 小数\n\n- 小数点读作 **point**，数字逐个读出。\n- `3.14` → three point one four\n- `0.5` → zero point five\n\n### 3.3 百分数\n\n- `%` 读作 **percent**。\n- `50%` → fifty percent\n- 作主语时谓语单复数取决于其后的名词：`Fifty percent of the work is done.` / `Fifty percent of the students are here.`\n\n---\n\n## 四、倍数表达\n\n| 结构 | 例句 |\n|:-----|:-----|\n| **倍数 + as...as** | This room is **twice as large as** that one. |\n| **倍数 + 比较级 + than** | It is **three times larger than** before. |\n| **倍数 + the size/length/height of** | The bridge is **twice the length of** the old one. |\n| **动词 + 倍数** | The population has **doubled**. |\n\n---\n\n## 五、年、月、日与时间的表达\n\n| 内容 | 读法 |\n|:-----|:-----|\n| 年份 2026 | twenty twenty-six / two thousand and twenty-six |\n| 日期 5月1日 | May (the) first / the first of May |\n| 时间 8:30 | eight thirty / half past eight |\n| 时间 8:15 | eight fifteen / a quarter past eight |\n| 时间 8:45 | eight forty-five / a quarter to nine |\n\n> **注意：** 表\"几十年代/岁数\"用复数：`in the 1990s`（在20世纪90年代），`in his thirties`（在他三十几岁时）。\n\n---\n\n## 相关笔记\n\n- 冠词 Articles — 序数词前用 the\n- 名词 Nouns — 数词常修饰名词\n- 主谓一致 — 数词作主语时的谓语一致\n",
    "keywords": [
      "数词",
      "基数词",
      "序数词",
      "特殊记",
      "加 th",
      "五改 ve 为 f",
      "八去 t",
      "九去 e",
      "十二改 ve 为 f",
      "整十把 y 改 ie",
      "作定语",
      "表顺序/名次",
      "前常加 the",
      "倍数 + as...as",
      "动词 + 倍数"
    ]
  },
  {
    "key": "形容词",
    "title": "形容词",
    "dir": "词法",
    "summary": "形容词修饰名词（\"美丽的\"、\"高的\"），学习重点 = **句法功能**（定语/表语/宾补）+ **比较级与最高级变化** + **多个形容词的词序**。",
    "content": "# 形容词 Adjectives\n\n> **核心主线：** 形容词修饰名词（\"美丽的\"、\"高的\"），学习重点 = **句法功能**（定语/表语/宾补）+ **比较级与最高级变化** + **多个形容词的词序**。\n\n---\n\n## 一、形容词的分类\n\n| 分类 | 说明 | 例词 |\n|:-----|:-----|:-----|\n| **性质形容词** | 描述性质/特征 | beautiful, tall, kind |\n| **状态形容词** | 描述暂时状态 | ill, asleep, awake, alive |\n| **表语形容词** | 只能作表语 | afraid, alone, sure, glad |\n\n> **易错：** `ill（病的）` 作定语时用 `sick`（a sick man）；`asleep / awake / afraid / alive` 等一般只作表语，不作前置定语。\n\n---\n\n## 二、形容词的句法功能\n\n| 功能 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **定语** | 修饰名词 | a **beautiful** girl |\n| **表语** | 系动词后 | She is **beautiful**. |\n| **宾语补足语** | 补充说明宾语 | The news made us **happy**. |\n| **状语** | 表伴随/原因 | **Tired**, he went to bed early. |\n\n---\n\n## 三、比较级与最高级 ⭐\n\n### 3.1 变化规则\n\n| 规则 | 原级 | 比较级 | 最高级 |\n|:-----|:-----|:------|:------|\n| 一般单音节加 -er/-est | tall | taller | tallest |\n| 以 e 结尾加 -r/-st | nice | nicer | nicest |\n| 辅音+y 改 y 为 i | happy | happier | happiest |\n| 重读闭音节双写 | big | bigger | biggest |\n| 多音节前加 more/most | beautiful | more beautiful | most beautiful |\n| 不规则变化 | good/well | better | best |\n|  | bad/ill | worse | worst |\n|  | many/much | more | most |\n|  | little | less | least |\n|  | far | farther/further | farthest/furthest |\n\n### 3.2 比较级常用句型\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **A + 比较级 + than + B** | A 比 B 更… | Tom is taller **than** Jim. |\n| **as + 原级 + as** | 和…一样 | She is **as tall as** me. |\n| **not as/so + 原级 + as** | 不如… | He is **not so tall as** me. |\n| **the + 比较级, the + 比较级** | 越…越… | **The more**, **the better**. |\n| **比较级 + and + 比较级** | 越来越… | It's getting **colder and colder**. |\n| **the + 最高级 + of/in** | 在…中最… | the tallest **of** the three / **in** our class |\n\n> **修饰语：** 比较级前可用 `much / even / a lot / a little / far` 修饰：`much better`, `far more important`。\n\n---\n\n## 四、多个形容词的词序 ⭐\n\n**口诀：限定词 → 观点 → 大小 → 形状 → 新旧 → 颜色 → 产地 → 材料 → 用途 + 名词**\n\n| 层级 | 类别 | 例词 |\n|:-----|:-----|:-----|\n| 限定词 | a, the, my, two | a |\n| 观点 | beautiful, nice | beautiful |\n| 大小 | big, small | big |\n| 形状 | round, square | round |\n| 新旧 | old, new | new |\n| 颜色 | red, blue | red |\n| 产地 | Chinese, American | Chinese |\n| 材料 | wooden, silk | wooden |\n| 用途 | writing, sports | writing |\n\n> **例句：** a beautiful big round new red Chinese wooden **writing desk**\n\n---\n\n## 五、-ed 形容词 vs -ing 形容词 ⭐\n\n| 后缀 | 含义 | 例词 |\n|:-----|:-----|:-----|\n| **-ing** | 令人…的（修饰物/事件） | interesting, exciting, boring |\n| **-ed** | 感到…的（修饰人） | interested, excited, bored |\n\n> The movie is **exciting**. I am **excited** about it.（物 → -ing；人 → -ed）\n\n---\n\n## 相关笔记\n\n- 副词 Adverbs — 副词修饰形容词，比较级同类变化\n- 名词 Nouns — 形容词修饰名词\n- 句子成分 — 形容词作表语/宾补\n",
    "keywords": [
      "形容词",
      "句法功能",
      "比较级与最高级变化",
      "多个形容词的词序",
      "性质形容词",
      "状态形容词",
      "表语形容词",
      "定语",
      "表语",
      "宾语补足语",
      "状语",
      "as + 原级 + as"
    ]
  },
  {
    "key": "副词",
    "title": "副词",
    "dir": "词法",
    "summary": "副词修饰**动词、形容词、另一副词或整个句子**，学习重点 = **分类** + **位置规则** + **比较级** + **程度副词的强弱**。",
    "content": "# 副词 Adverbs\n\n> **核心主线：** 副词修饰**动词、形容词、另一副词或整个句子**，学习重点 = **分类** + **位置规则** + **比较级** + **程度副词的强弱**。\n\n---\n\n## 一、副词的分类\n\n| 类别 | 作用 | 例词 |\n|:-----|:-----|:-----|\n| **时间副词** | 表时间 | now, then, yesterday, soon, already |\n| **频率副词** | 表频率 | always, usually, often, sometimes, never |\n| **地点副词** | 表地点 | here, there, home, everywhere |\n| **方式副词** | 表方式 | slowly, carefully, well, hard |\n| **程度副词** | 表程度 | very, quite, rather, too, enough |\n| **疑问副词** | 引导疑问句 | when, where, why, how |\n| **连接副词** | 连接句子/从句 | however, therefore, moreover |\n| **关系副词** | 引导定语从句 | when, where, why |\n\n---\n\n## 二、副词的句法功能\n\n| 功能 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **作状语**（主要） | 修饰动词/形容词/副词/句子 | He runs **fast**. / She is **very** tall. |\n| **作表语** | 表位置/状态 | Is your father **in**? |\n| **作定语** | 修饰名词（后置） | the girl **there** |\n| **作宾补** | 补充宾语 | Let him **in**. |\n\n---\n\n## 三、副词的位置 ⭐\n\n### 3.1 频率副词的位置\n\n**一般位于实义动词之前、be 动词/助动词/情态动词之后。**\n\n- She **often** goes to school by bus.（实义动词前）\n- He is **always** late.（be 后）\n- I have **never** been to London.（助动词后）\n\n### 3.2 方式/程度副词的位置\n\n| 情形 | 位置 | 例句 |\n|:-----|:-----|:-----|\n| 修饰形容词/副词 | 放在其前 | **very** good, **quite** well |\n| 修饰动词 | 动词后或宾语后 | She sings **beautifully**. |\n| enough | 形容词/副词之后 | good **enough** |\n\n### 3.3 多个副词的顺序（方式→地点→时间）\n\n> He worked **hard**（方式）**in the lab**（地点）**yesterday**（时间）.\n\n---\n\n## 四、副词的比较级与最高级\n\n**变化规则与形容词完全一致**（单音节 -er/-est，多音节 more/most，不规则变化）。\n\n| 原级 | 比较级 | 最高级 |\n|:-----|:------|:------|\n| fast | faster | fastest |\n| early | earlier | earliest |\n| carefully | more carefully | most carefully |\n| well | better | best |\n| badly | worse | worst |\n| much | more | most |\n| little | less | least |\n| far | farther/further | farthest/furthest |\n\n> He runs **faster than** me. / She works **most carefully** of all.\n\n---\n\n## 五、易混副词辨析 ⭐\n\n| 辨析 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **hard vs hardly** | hard=努力地/猛烈地；hardly=几乎不 | He works **hard**. / I can **hardly** hear you. |\n| **late vs lately** | late=晚；lately=最近 | He came **late**. / I've been busy **lately**. |\n| **already vs yet** | already=已经（肯定句）；yet=还（否定/疑问句） | I have **already** finished. / Have you finished **yet**? |\n| **too vs also vs either** | too=也（肯定句，句尾）；also=也（句中）；either=也（否定句） | I like it, **too**. / She **also** likes it. / I don't like it, **either**. |\n| **very vs much** | very 修饰原级；much 修饰比较级 | **very** good / **much** better |\n\n---\n\n## 六、程度副词强度排序\n\n```\nnot at all < hardly < a little < somewhat < quite < rather < very < extremely\n（一点也不）   （几乎不）  （一点）   （稍微）  （相当）  （相当/颇） （非常）   （极其）\n```\n\n> 程度副词修饰比较级用：`much / far / even / a lot`，不用 very。\n\n---\n\n## 相关笔记\n\n- 形容词 Adjectives — 副词与形容词的比较级规则相同\n- 介词 Prepositions — 副词与介词的词性辨析（如 in/on 既可作介词又可作副词）\n- 状语从句 — 副词与连接词引导从句的分工\n",
    "keywords": [
      "副词",
      "分类",
      "位置规则",
      "比较级",
      "程度副词的强弱",
      "时间副词",
      "频率副词",
      "地点副词",
      "方式副词",
      "程度副词",
      "疑问副词",
      "连接副词",
      "关系副词",
      "作状语",
      "作表语",
      "作定语",
      "作宾补",
      "变化规则与形容词完全一致"
    ]
  },
  {
    "key": "动词",
    "title": "动词",
    "dir": "词法",
    "summary": "动词是句子的\"心脏\"，学习重点 = **分类**（实义/系/助/情态）+ **及物性**（及物/不及物）+ **五种基本形式**。时态、语态、情态、虚拟语气详见 [[英语/语法/0 语法总览]]。",
    "content": "# 动词 Verbs\n\n> **核心主线：** 动词是句子的\"心脏\"，学习重点 = **分类**（实义/系/助/情态）+ **及物性**（及物/不及物）+ **五种基本形式**。时态、语态、情态、虚拟语气详见 语法总览。\n\n---\n\n## 一、动词的分类\n\n```\n动词\n├── 实义动词（表动作/状态，能独立作谓语）\n│     ├── 及物动词 vt.（后接宾语）\n│     └── 不及物动词 vi.（不接宾语）\n├── 系动词（连接主语和表语）\n├── 助动词（帮助构成时态/语态/否定/疑问）\n└── 情态动词（表能力、允许、义务等）\n```\n\n| 类别 | 作用 | 例词 |\n|:-----|:-----|:-----|\n| **实义动词** | 表实际动作/状态 | run, eat, think, have |\n| **系动词** | 连接主语与表语 | be, become, look, seem, taste |\n| **助动词** | 构成时态/语态/否定/疑问 | be, do, have, will, shall |\n| **情态动词** | 表能力/允许/义务/推测 | can, may, must, should |\n\n---\n\n## 二、及物动词 vs 不及物动词 ⭐\n\n| 类型 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **及物动词 vt.** | 后接宾语 | I **like** music.（like + 宾语 music） |\n| **不及物动词 vi.** | 不接宾语 | He **slept** well.（slept 无宾语） |\n| **接双宾语** | 间接宾语 + 直接宾语 | She **gave** me a book.（me 间接，book 直接） |\n| **接复合宾语** | 宾语 + 宾补 | We **made** him happy.（him + 补语 happy） |\n\n> **易混：** 有些动词既及物又不及物。`He runs.`（vi.）/ `He runs a company.`（vt. 经营）。不及物动词加介词后可接宾语：`look at`, `listen to`, `wait for`。\n\n---\n\n## 三、系动词 ⭐\n\n### 3.1 五大类系动词\n\n| 类别 | 例词 | 例句 |\n|:-----|:-----|:-----|\n| **状态类** | be | She **is** a teacher. |\n| **变化类** | become, get, turn, grow, go | It **gets** cold. / Leaves **turn** yellow. |\n| **感官类** | look, sound, feel, taste, smell | The soup **tastes** good. |\n| **保持类** | keep, stay, remain | Keep **quiet**, please. |\n| **表象类** | seem, appear | He **seems** tired. |\n\n> **注意：** 感官系动词后接**形容词**而非副词：`The music sounds beautiful.`（✕ beautifully）。感官动词也可作实义动词：`I look at the picture carefully.`（实义，用副词）。\n\n---\n\n## 四、动词的五种基本形式\n\n| 形式 | 构成 | 例词 |\n|:-----|:-----|:-----|\n| **原形** | — | do, go, have |\n| **第三人称单数** | 一般加 -s，以 s/x/ch/sh/o 结尾加 -es，辅音+y 改 y 为 ies | does, goes, has, watches, studies |\n| **过去式** | 规则加 -ed；不规则需记忆 | did, went, had, played |\n| **过去分词** | 规则加 -ed；不规则需记忆 | done, gone, had, played |\n| **现在分词/动名词** | 加 -ing | doing, going, having |\n\n### 规则变化速查\n\n| 规则 | 过去式/过去分词 | 现在分词 |\n|:-----|:--------------|:---------|\n| 一般加 -ed / -ing | play → played | play → playing |\n| 以 e 结尾 | love → loved | love → loving（去 e） |\n| 辅音+y 改 y 为 i | study → studied | study → studying（y 不变） |\n| 重读闭音节双写 | stop → stopped | stop → stopping |\n\n> **不规则动词**是高频考点，需分组记忆：`go-went-gone`, `take-took-taken`, `see-saw-seen`, `come-came-come` 等。\n\n---\n\n## 五、动词短语\n\n| 类型 | 结构 | 例词 |\n|:-----|:-----|:-----|\n| **动词 + 介词** | 及物，后接宾语 | look at, wait for, depend on |\n| **动词 + 副词** | 可及物可不及物，宾语是代词时放中间 | turn on（turn it on）, give up |\n| **动词 + 副词 + 介词** | 及物 | look forward to, put up with |\n| **动词 + 名词 + 介词** | 及物 | take part in, pay attention to |\n| **be + 形容词 + 介词** | 表状态 | be interested in, be good at |\n\n---\n\n## 相关笔记\n\n- 时态 Tenses — 动词在不同时间下的形态\n- 被动语态 — 及物动词才有被动语态\n- 情态动词 — 情态动词 + 动词原形\n- 非谓语动词 — 动词的不定式/分词/动名词\n",
    "keywords": [
      "动词",
      "分类",
      "及物性",
      "五种基本形式",
      "实义动词",
      "系动词",
      "助动词",
      "情态动词",
      "及物动词 vt.",
      "不及物动词 vi.",
      "接双宾语",
      "接复合宾语",
      "状态类",
      "变化类",
      "感官类",
      "保持类",
      "表象类",
      "形容词",
      "原形",
      "第三人称单数",
      "过去式",
      "过去分词",
      "现在分词/动名词",
      "不规则动词",
      "动词 + 介词",
      "动词 + 副词",
      "动词 + 副词 + 介词",
      "动词 + 名词 + 介词"
    ]
  },
  {
    "key": "介词",
    "title": "介词",
    "dir": "词法",
    "summary": "介词本身无意义，**\"介词 + 宾语\"构成介词短语**后才有意义，用来表时间、地点、方式、原因等关系。重点 = 分类 + 高频介词用法 + 易混辨析。",
    "content": "# 介词 Prepositions\n\n> **核心主线：** 介词本身无意义，**\"介词 + 宾语\"构成介词短语**后才有意义，用来表时间、地点、方式、原因等关系。重点 = 分类 + 高频介词用法 + 易混辨析。\n\n---\n\n## 一、介词短语的结构与功能\n\n```\n介词 + 宾语（名词/代词/动名词）\n```\n\n- 作**状语**：He arrived **at five**.\n- 作**定语**：the book **on the desk**\n- 作**表语**：The light is **on**.\n- 作**宾补**：I found him **in trouble**.\n\n---\n\n## 二、时间介词：at / on / in ⭐\n\n| 介词 | 用法 | 例词 |\n|:-----|:-----|:-----|\n| **at** | 时刻、时间点、节日前 | at 6 o'clock, at noon, at night, at Christmas |\n| **on** | 具体的某一天、某天早/午/晚 | on Monday, on May 1st, on the morning of May 1st |\n| **in** | 较长时段、月份、年份、季节 | in the morning, in May, in 2026, in summer |\n\n> **口诀：** at 点、on 天、in 段。\n\n**其他时间介词：**\n\n| 介词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **for** | 持续一段时间 | I've lived here **for** ten years. |\n| **since** | 自从（某起点） | I've lived here **since** 2016. |\n| **before / after** | 在…之前/之后 | before class, after school |\n| **by** | 到…为止 | by the end of this month |\n| **during** | 在…期间 | during the summer holiday |\n| **until / till** | 直到… | wait until 8 o'clock |\n\n---\n\n## 三、地点介词：at / on / in / under 等\n\n| 介词 | 用法 | 例句 |\n|:-----|:-----|:-----|\n| **at** | 在某一具体地点/点 | at the door, at the bus stop |\n| **on** | 在…表面上 | on the desk, on the wall |\n| **in** | 在…内部/大范围 | in the room, in China |\n| **under** | 在…正下方 | under the tree |\n| **behind** | 在…后面 | behind the door |\n| **in front of** | 在…前面（外部） | in front of the house |\n| **in the front of** | 在…前部（内部） | in the front of the classroom |\n| **near** | 在…附近 | near the station |\n| **between / among** | 两者之间 / 三者及以上之间 | between A and B / among the students |\n| **above / over** | 在…上方（不一定垂直/垂直上方） | above the door / over the bridge |\n| **below / under** | 在…下方 | below zero / under the table |\n| **across / through** | 横穿（表面）/ 穿过（内部） | across the street / through the tunnel |\n\n---\n\n## 四、方式介词：by / in / with\n\n| 介词 | 用法 | 例句 |\n|:-----|:-----|:-----|\n| **by** | 交通工具、方式 | by bus, by plane, by hand |\n| **in** | 语言、材料、状态 | in English, in ink |\n| **with** | 用工具、伴随 | with a pen, with a smile |\n\n> He goes to work **by** bike. / Write it **in** English. / Cut it **with** a knife.\n\n---\n\n## 五、其他高频介词\n\n| 介词 | 用法 | 例句 |\n|:-----|:-----|:-----|\n| **of** | 所属/部分 | a friend of mine |\n| **for** | 目的/对象 | buy a gift **for** you |\n| **to** | 方向/对象 | give it **to** me |\n| **from** | 来源/分离 | come from China |\n| **about** | 关于 | a book about history |\n| **against** | 反对/靠着 | against the wall |\n| **without** | 没有 | without water |\n| **except / besides** | 除…外（不含）/（含） | Everyone is here **except** Tom.（Tom不在） |\n\n---\n\n## 六、易混介词辨析 ⭐\n\n| 辨析 | 区别 | 例句 |\n|:-----|:-----|:-----|\n| **in the morning** vs **on the morning of...** | 泛指早晨用 in；特指某天早晨用 on | on the morning of May 1st |\n| **be made of** vs **be made from** | 看得出原材料 / 看不出 | made **of** wood（看得出）/ made **from** grapes（看不出） |\n| **arrive at** vs **arrive in** | 小地点 at / 大地点 in | arrive **at** the airport / arrive **in** Beijing |\n| **in time** vs **on time** | 及时（未迟到）/ 按时（准点） | in time to catch the bus / on time for class |\n| **in the end** vs **at the end of** | 最终 / 在…末尾 | in the end, we won / at the end of the year |\n\n---\n\n## 相关笔记\n\n- 副词 Adverbs — 与介词同形的副词（up, down, in, on）\n- 动词 Verbs — 动词 + 介词构成动词短语\n- 句子成分 — 介词短语作状语/定语/表语\n",
    "keywords": [
      "介词",
      "状语",
      "定语",
      "表语",
      "宾补"
    ]
  },
  {
    "key": "连词",
    "title": "连词",
    "dir": "词法",
    "summary": "连词像\"胶水\"，把词、短语或分句连接起来。分**并列连词**（连接并列成分）与**从属连词**（引导从句）。重点 = 分类 + 语义辨析。",
    "content": "# 连词 Conjunctions\n\n> **核心主线：** 连词像\"胶水\"，把词、短语或分句连接起来。分**并列连词**（连接并列成分）与**从属连词**（引导从句）。重点 = 分类 + 语义辨析。\n\n---\n\n## 一、连词的分类总览\n\n```\n连词\n├── 并列连词（连接同等成分/分句）\n│     ├── 表并列：and, both...and, not only...but also\n│     ├── 表转折：but, while, yet\n│     ├── 表选择：or, either...or\n│     └── 表因果：so, for\n└── 从属连词（引导从句）\n      ├── 引导名词性从句：that, whether, if\n      ├── 引导定语从句：who, which, that（关系代词/副词）\n      └── 引导状语从句：when, because, although, if, so that...\n```\n\n---\n\n## 二、并列连词 ⭐\n\n### 2.1 表并列 / 递进\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **and** | 和、而且 | Tom **and** Mary are friends. |\n| **both...and...** | 两者都 | **Both** you **and** I are students.（谓语用复数） |\n| **not only...but also...** | 不但…而且 | He **not only** speaks English **but also** writes it.（谓语就近） |\n| **as well as** | 以及，和 | He plays piano **as well as** guitar. |\n\n### 2.2 表转折\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **but** | 但是 | I like tea, **but** he likes coffee. |\n| **while** | 而、然而（对比） | I study hard **while** he plays all day. |\n| **yet** | 然而（语气较强） | He is poor, **yet** he is happy. |\n\n### 2.3 表选择\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **or** | 或者、否则 | Hurry up, **or** you'll be late. |\n| **either...or...** | 要么…要么 | **Either** you **or** he is wrong.（谓语就近） |\n| **neither...nor...** | 既不…也不 | **Neither** he **nor** I am right.（谓语就近） |\n\n### 2.4 表因果\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **so** | 所以 | It rained, **so** we stayed home. |\n| **for** | 因为（补充说明） | He must be out, **for** the light is off. |\n\n> **注意：** `because` 和 `so` 不能同时使用：`Because it rained, we stayed home.` / `It rained, so we stayed home.`（二选一）\n\n---\n\n## 三、从属连词（引导状语从句）\n\n| 从句类型 | 从属连词 | 例句 |\n|:--------|:--------|:-----|\n| **时间** | when, while, as, before, after, until, since, as soon as | I'll call you **when** I arrive. |\n| **条件** | if, unless, as long as | **If** it rains, we'll stay in. |\n| **原因** | because, since, as | I didn't go **because** I was ill. |\n| **让步** | although, though, even if | **Although** it was late, he kept working. |\n| **目的** | so that, in order that | Speak loudly **so that** everyone can hear. |\n| **结果** | so...that, such...that | He was **so** tired **that** he fell asleep. |\n| **比较** | than, as...as | She is taller **than** I. |\n| **方式** | as, as if | He talks **as if** he knew everything. |\n\n> **注意：** `although` 与 `but` 不能连用：`Although it was late, he kept working.`（✕ Although...but...）\n\n---\n\n## 四、引导名词性从句的连词\n\n| 连词 | 作用 | 例句 |\n|:-----|:-----|:-----|\n| **that** | 无实义，不作成分 | I think **that** he is right. |\n| **whether / if** | \"是否\" | I don't know **whether** he will come. |\n| **特殊疑问词** | 保留疑问含义，作成分 | I wonder **what** he said. |\n\n> 详见 名词性从句。\n\n---\n\n## 五、关联连词的使用规则\n\n| 结构 | 主语一致规则 | 例句 |\n|:-----|:-----------|:-----|\n| **both...and...** | 谓语用**复数** | Both he and I **are** students. |\n| **not only...but also...** | 谓语**就近** | Not only he but also I **am** a student. |\n| **either...or...** | 谓语**就近** | Either you or he **is** wrong. |\n| **neither...nor...** | 谓语**就近** | Neither he nor I **am** right. |\n\n> 更多见 主谓一致。\n\n---\n\n## 相关笔记\n\n- 简单句与并列句 — 并列连词连接分句\n- 名词性从句 — that/whether 引导名词性从句\n- 状语从句 — 从属连词引导状语从句\n- 定语从句 — 关系代词/副词引导定语从句\n",
    "keywords": [
      "连词",
      "并列连词",
      "从属连词",
      "时间",
      "条件",
      "原因",
      "让步",
      "目的",
      "结果",
      "比较",
      "方式",
      "特殊疑问词",
      "复数",
      "就近"
    ]
  },
  {
    "key": "语法总览",
    "title": "语法总览",
    "dir": "语法",
    "summary": "英语语法 = **词法**（词的形态与分类）+ **句法**（句子的结构与组合）。本目录聚焦动词的\"体用\"——**时态、语态、情态、虚拟语气、主谓一致**，是语法中变化最丰富、最易失分的部分。",
    "content": "# 语法总览 Grammar Overview\n\n> **核心主线：** 英语语法 = **词法**（词的形态与分类）+ **句法**（句子的结构与组合）。本目录聚焦动词的\"体用\"——**时态、语态、情态、虚拟语气、主谓一致**，是语法中变化最丰富、最易失分的部分。\n\n---\n\n## 语法体系全景\n\n```\n英语语法\n├── 词法（单词层面） → 词法总览\n│     名词 / 代词 / 冠词 / 数词 / 形容词 / 副词 / 动词 / 介词 / 连词\n│\n├── 句法（句子层面） → 句法总览\n│     句子成分 / 五大句型 / 从句 / 非谓语动词 / 特殊句式\n│\n└── 本目录：动词的时体态气\n       ├── 时态 Tenses（动作发生的时间与状态）\n       ├── 被动语态（主语是动作的承受者）\n       ├── 情态动词（能力/允许/义务/推测）\n       ├── 虚拟语气（与事实相反的假设/愿望）\n       └── 主谓一致（主语决定谓语的形式）\n```\n\n---\n\n## 笔记列表\n\n| 编号 | 笔记 | 核心内容 |\n|:----:|:----|:----|\n| 1 | 时态 Tenses | 16 种时态的构成与用法 |\n| 2 | 被动语态 | 被动语态的构成、时态、特殊用法 |\n| 3 | 情态动词 | can/may/must 等的情态用法与推测 |\n| 4 | 虚拟语气 | 虚拟条件句、虚拟宾语从句等 |\n| 5 | 主谓一致 | 语法/意义/就近三大原则 |\n\n---\n\n## 学习路径\n\n```\n第一步：1 时态（动词的\"时间轴\"）—— 一切的基础\n第二步：2 被动语态（语态转换）\n第三步：3 情态动词 → 4 虚拟语气（情态与假设）\n第四步：5 主谓一致（落笔时的\"校验\"）\n```\n\n> **建议：** 时态与被动语态常结合出题；情态动词与虚拟语气联系紧密；主谓一致贯穿所有句子。\n\n---\n\n## 相关章节\n\n- 动词 Verbs — 动词的五种基本形式是时态/语态的基础\n- 五大基本句型 — 主动变被动的基本场景\n- 状语从句 — 虚拟条件句 if 从句\n\n> **下一站：** 从 时态 Tenses 开始，建立英语的\"时间轴\"。\n",
    "keywords": [
      "语法总览",
      "词法",
      "句法"
    ]
  },
  {
    "key": "时态",
    "title": "时态",
    "dir": "语法",
    "summary": "时态 = **时间**（过去/现在/将来）× **状态**（一般/进行/完成/完成进行）。英语共有 16 种时态，学习重点 = **每种时态的构成** + **标志词** + **易混对比**。",
    "content": "# 时态 Tenses\n\n> **核心主线：** 时态 = **时间**（过去/现在/将来）× **状态**（一般/进行/完成/完成进行）。英语共有 16 种时态，学习重点 = **每种时态的构成** + **标志词** + **易混对比**。\n\n---\n\n## 一、16 种时态总表 ⭐\n\n**以动词 do 为例：**\n\n| 时间 \\ 状态 | 一般 | 进行 | 完成 | 完成进行 |\n|:-----------|:-----|:-----|:-----|:---------|\n| **现在** | do / does | am/is/are doing | have/has done | have/has been doing |\n| **过去** | did | was/were doing | had done | had been doing |\n| **将来** | will do | will be doing | will have done | will have been doing |\n| **过去将来** | would do | would be doing | would have done | would have been doing |\n\n---\n\n## 二、六大核心时态（高频）⭐\n\n### 2.1 一般现在时\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| do / does（三单） | 习惯、真理、客观事实、时刻表 | always, often, usually, every day |\n\n- The earth **goes** around the sun.（客观真理）\n- He **plays** basketball every Sunday.（习惯）\n- The train **leaves** at 8:00.（时刻表用一般现在表将来）\n\n### 2.2 一般过去时\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| did（过去式） | 过去某个时间的动作/状态 | yesterday, last week, ago, in 2020 |\n\n- I **met** him **yesterday**.\n- She **was** ill **last week**.\n\n### 2.3 一般将来时\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| will do / be going to do | 将来要发生的事、打算 | tomorrow, next week, soon, in the future |\n\n- I **will call** you tomorrow.\n- It **is going to rain**.（有迹象）\n\n> **will vs be going to：** 临时决定用 will；早有打算或有迹象用 be going to。\n\n### 2.4 现在进行时\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| am/is/are doing | 此刻正在发生；现阶段正在进行 | now, at present, look, listen |\n\n- Look! They **are playing** football.\n- She **is writing** a book these days.\n\n> **注意：** 表状态/感觉/拥有的动词一般不用进行时：know, like, love, want, have, belong 等。\n\n### 2.5 现在完成时 ⭐\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| have/has done | ① 过去的动作对现在有影响；② 从过去持续到现在 | already, yet, just, ever, never, since, for |\n\n- I **have lost** my key.（影响：现在进不了门）\n- He **has lived** here **for** ten years.（持续）\n- She **has been** to Beijing twice.（经历）\n\n**have gone to vs have been to：**\n\n| 结构 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **have been to** | 去过（已回来） | I **have been to** Beijing. |\n| **have gone to** | 去了（未回来） | He **has gone to** Beijing. |\n| **have been in** | 一直在某地 | She **has been in** Shanghai for 5 years. |\n\n### 2.6 过去进行时\n\n| 构成 | 用法 | 标志词 |\n|:-----|:-----|:-------|\n| was/were doing | 过去某时刻正在发生；与 when/while 连用 | at that time, at 8 last night, when, while |\n\n- I **was watching** TV when he came in.（长动作被短动作打断）\n- **While** I was cooking, he was reading.\n\n---\n\n## 三、完成时与过去时的区分 ⭐（易混）\n\n| 对比 | 现在完成时 | 一般过去时 |\n|:-----|:----------|:----------|\n| 强调 | **对现在的影响/结果** | 过去的动作本身 |\n| 时间状语 | since, for, already, yet（不与过去时间点连用） | yesterday, ago, last week（明确过去时间） |\n| 例句 | I **have seen** the film.（强调我看过，了解内容） | I **saw** the film yesterday.（强调昨天看的动作） |\n\n> **判断口诀：** 句中有明确的过去时间状语 → 用一般过去时；强调\"已发生/已做过/持续到现在\" → 用现在完成时。\n\n---\n\n## 四、其他常用时态\n\n| 时态 | 构成 | 用法 | 例句 |\n|:-----|:-----|:-----|:-----|\n| **过去完成时** | had done | 过去某一时间**之前**已完成 | By 8 p.m., I **had finished** my homework. |\n| **过去将来时** | would do | 从过去看将来 | He said he **would come**. |\n| **将来完成时** | will have done | 将来某时之前已完成 | By 2026, I **will have graduated**. |\n| **现在完成进行时** | have been doing | 从过去持续到现在的动作（强调一直在做） | I **have been learning** English for 3 years. |\n\n---\n\n## 五、时态呼应（从句中的时态）\n\n| 主句时态 | 从句时态 | 例句 |\n|:--------|:--------|:-----|\n| 现在/将来 | 根据需要 | He says he **will go**. |\n| 过去 | 相应的过去时态 | He said he **was busy**. / He said he **had finished**. |\n| 客观真理 | 用一般现在时 | He said the earth **goes** around the sun. |\n\n> 详见 名词性从句 的\"时态呼应\"。\n\n---\n\n## 六、时态选择三步法\n\n```\n第一步：找时间标志词（yesterday → 过去；tomorrow → 将来；since/for → 完成时）\n第二步：判断\"状态\"—— 一般（客观/习惯）？进行（正在）？完成（已发生/持续）？\n第三步：确定主句与从句的呼应关系\n```\n\n---\n\n## 相关笔记\n\n- 动词 Verbs — 动词五种形式是时态的构成基础\n- 被动语态 — 时态 × 语态的组合\n- 名词性从句 — 从句时态呼应\n- 虚拟语气 — 虚拟语气与时态的形式差异\n",
    "keywords": [
      "时态",
      "时间",
      "状态",
      "每种时态的构成",
      "标志词",
      "易混对比",
      "现在",
      "过去",
      "将来",
      "过去将来",
      "对现在的影响/结果",
      "过去完成时",
      "之前",
      "过去将来时",
      "将来完成时",
      "现在完成进行时"
    ]
  },
  {
    "key": "被动语态",
    "title": "被动语态",
    "dir": "语法",
    "summary": "语态分**主动**（主语是动作执行者）与**被动**（主语是动作承受者）。被动语态核心公式：**be + 过去分词**。重点 = 各时态的被动构成 + 主动变被动的规则 + 特殊用法。",
    "content": "# 被动语态 Passive Voice\n\n> **核心主线：** 语态分**主动**（主语是动作执行者）与**被动**（主语是动作承受者）。被动语态核心公式：**be + 过去分词**。重点 = 各时态的被动构成 + 主动变被动的规则 + 特殊用法。\n\n---\n\n## 一、被动语态的构成\n\n```\n被动语态 = be + 过去分词（done）\n\n主语 + be + done + （by + 执行者）\n```\n\n- The window **was broken** (by Tom).\n- English **is spoken** all over the world.\n\n> **注意：** be 动词随主语的人称、数和时态变化；只有**及物动词**才有被动语态（见 动词 Verbs）。\n\n---\n\n## 二、各时态的被动语态 ⭐\n\n| 时态 | 构成 | 例句 |\n|:-----|:-----|:-----|\n| **一般现在时** | am/is/are + done | The room **is cleaned** every day. |\n| **一般过去时** | was/were + done | The room **was cleaned** yesterday. |\n| **一般将来时** | will be + done | The room **will be cleaned** tomorrow. |\n| **现在进行时** | am/is/are being + done | The room **is being cleaned** now. |\n| **过去进行时** | was/were being + done | The room **was being cleaned** at 8. |\n| **现在完成时** | have/has been + done | The room **has been cleaned**. |\n| **过去完成时** | had been + done | The room **had been cleaned** before I came. |\n| **含情态动词** | can/must/should + be + done | The room **must be cleaned**. |\n\n> **记忆：** 只要在 be 的\"时态变形\"后面加上过去分词即可。`be` 的时态变化 = 对应时态中 be 动词的形式。\n\n---\n\n## 三、主动 → 被动 的转换规则\n\n### 3.1 基本步骤\n\n```\n① 宾语 → 主语\n② 谓语动词改为 be + 过去分词（时态不变）\n③ 原主语 → by + 宾语（可省略）\n```\n\n- They **build** houses. → Houses **are built** (by them).\n- He **is watering** the flowers. → The flowers **are being watered** (by him).\n\n### 3.2 双宾语动词的被动\n\n**一个句子有两种被动形式（间接宾语 / 直接宾语作主语）：**\n\n- He **gave me a book**.\n- → I **was given** a book (by him).（常考，更自然）\n- → A book **was given to me** (by him).\n\n### 3.3 复合宾语（宾+宾补）的被动\n\n**宾补保留，变为主语补足语：**\n\n- We **made him monitor**. → He **was made monitor**.\n- They **saw him cross** the street. → He **was seen to cross** the street.（to 还原）\n\n---\n\n## 四、被动语态的特殊用法 ⭐\n\n### 4.1 主动表被动（常见考点）\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 主语 + 及物动词 + 副词（表主语属性） | This book **sells well**. / The pen **writes smoothly**. |\n| need/want/require + doing（= to be done） | The flowers **need watering**. |\n| be worth doing | The film **is worth seeing**. |\n| 系动词（taste/smell/feel/sound） | The cake **tastes** delicious. |\n\n### 4.2 无被动语态的动词\n\n| 类型 | 例词 | 例句 |\n|:-----|:-----|:-----|\n| 不及物动词 | happen, occur, appear, disappear | The accident **happened** yesterday. |\n| 表状态/拥有 | have, own, belong to, fit, suit | The book **belongs to** me. |\n| 系动词 | be, become, look, seem | She **looks** beautiful. |\n\n> **注意：** `happen / belong to / break out / take place` 等没有被动语态。\n\n### 4.3 含情态动词的被动\n\n```\n情态动词 + be + done\n```\n\n- The work **must be finished** before 5.\n- It **can be done** easily.\n\n---\n\n## 五、get 被动式\n\n**`get + done` 表被动的意义，强调动作或突然发生：**\n\n- He **got hurt** in the game.\n- My car **got stolen** last night.\n\n> 口语中常见，正式文体中用 be + done。\n\n---\n\n## 六、主动与被动选择技巧\n\n```\n第一步：判断主语与谓语动词的关系\n        ├── 主语执行动作 → 主动语态\n        └── 主语承受动作 → 被动语态\n第二步：若用被动，找 be 的时态（看时间标志词）\n第三步：是否含情态动词 → 情态动词 + be + done\n第四步：注意特殊动词（无被动、主动表被动）\n```\n\n---\n\n## 相关笔记\n\n- 时态 Tenses — be 动词的时态变化\n- 动词 Verbs — 及物/不及物决定能否被动\n- 五大基本句型 — 双宾语/复合宾语变被动\n- 情态动词 — 情态动词 + be done\n",
    "keywords": [
      "被动语态",
      "语态",
      "被动",
      "主动",
      "be + 过去分词",
      "及物动词",
      "一般现在时",
      "一般过去时",
      "一般将来时",
      "现在进行时",
      "过去进行时",
      "现在完成时",
      "过去完成时",
      "含情态动词"
    ]
  },
  {
    "key": "情态动词",
    "title": "情态动词",
    "dir": "语法",
    "summary": "情态动词本身不表动作，只表**说话人的态度**——能力、允许、义务、建议、推测。核心公式：**情态动词 + 动词原形**。重点 = 基本用法 + **推测用法**（情态动词最难部分）。",
    "content": "# 情态动词 Modal Verbs\n\n> **核心主线：** 情态动词本身不表动作，只表**说话人的态度**——能力、允许、义务、建议、推测。核心公式：**情态动词 + 动词原形**。重点 = 基本用法 + **推测用法**（情态动词最难部分）。\n\n---\n\n## 一、情态动词的特点\n\n1. 后接**动词原形**（✕ can does）\n2. 无人称和数的变化（✕ he cans）\n3. 否定直接加 not（can't, mustn't）\n4. 疑问直接提前（Can you...?）\n\n---\n\n## 二、常见情态动词的基本用法 ⭐\n\n| 情态动词 | 用法 | 例句 |\n|:--------|:-----|:-----|\n| **can / could** | 能力、许可、请求 | I **can** swim. / **Can** I come in? |\n| **may / might** | 许可、祝愿 | **May** I use your pen? / **May** you succeed! |\n| **must** | 必须（主观）、命令 | You **must** finish it today. |\n| **have to** | 不得不（客观） | I **have to** go now.（It's late.） |\n| **shall / should** | 征求建议、应当 | **Shall** we go? / You **should** study hard. |\n| **will / would** | 意愿、请求、习惯 | I **will** help you. / **Would** you like tea? |\n| **need** | 需要 | You **needn't** worry. |\n| **dare** | 敢于 | How **dare** you say that! |\n| **ought to** | 应该 | You **ought to** apologize. |\n\n---\n\n## 三、情态动词的否定与过去式辨析\n\n### 3.1 must 的否定（易错）⭐\n\n| 结构 | 含义 |\n|:-----|:-----|\n| **mustn't** | 禁止（绝对不能做） |\n| **needn't / don't have to** | 不必（没必要做） |\n\n> — Must I finish it now? — No, you **needn't**.（✕ No, you mustn't.——那是\"禁止\"）\n\n### 3.2 情态动词表\"过去\"的规则\n\n| 情形 | 用法 |\n|:-----|:-----|\n| 一般过去 | can→could, may→might, shall→should, will→would |\n| 表\"过去做了\" | 情态动词 + have done（推测/虚拟） |\n\n---\n\n## 四、情态动词的推测用法 ⭐⭐（最难）\n\n**对现在/过去/将来的推测，把握\"可能性大小\"与\"时间\"两个维度。**\n\n### 4.1 对现在的推测\n\n| 结构 | 可能性 | 例句 |\n|:-----|:------|:-----|\n| **must be** | 一定（几乎肯定） | He **must be** at home.（灯亮着） |\n| **may/might be** | 可能 | He **may be** at home. |\n| **can't be** | 不可能（否定推测用 can't，不用 mustn't） | He **can't be** at home.（灯灭了） |\n\n### 4.2 对过去的推测\n\n| 结构 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **must have done** | 过去一定… | He **must have finished** the work. |\n| **may/might have done** | 过去可能… | He **may have lost** his key. |\n| **can't have done** | 过去不可能… | He **can't have gone** abroad. |\n| **should have done** | 本应该做（却没做） | You **should have told** me. |\n| **needn't have done** | 本不必做（却做了） | You **needn't have come**. |\n\n> **推测句型总结：**\n> - 现在：`must / may / might / can't + do`\n> - 过去：`must / may / might / can't + have done`\n> - 进行：`must / may + be doing`\n\n### 4.3 情态动词 + have done 的三种含义\n\n| 含义 | 例词 | 例句 |\n|:-----|:-----|:-----|\n| **推测**（对过去） | must/may/might/can't + have done | He **must have left**. |\n| **虚拟/后悔**（与事实相反） | should/ought to/needn't + have done | I **should have studied** harder. |\n| **本可能**（未实现） | could have done | We **could have won** the game. |\n\n---\n\n## 五、情态动词表\"请求与允许\"的礼貌程度\n\n```\nCan I...? < Could I...? < May I...? < Might I...?\n（最直接）            （较委婉）      （更委婉）    （最正式）\n```\n\n- **Can** I borrow your pen?（口语常见）\n- **Could** you help me?（委婉请求）\n- **May** I come in?（正式礼貌）\n\n---\n\n## 六、易混辨析\n\n| 辨析 | 区别 | 例句 |\n|:-----|:-----|:-----|\n| **must vs have to** | 主观\"必须\" / 客观\"不得不\" | I **must** study. / I **have to** go now. |\n| **can vs be able to** | 泛指能力 / 特定情况下的能力（可配合各种时态） | He **can** swim. / I **was able to** escape. |\n| **should vs ought to** | 二者基本同义，ought to 语气稍强 | You **should / ought to** see a doctor. |\n| **will vs would** | would 更委婉；表过去习惯 | I **would** often play here as a child. |\n\n---\n\n## 七、情态动词的固定句型\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **can't...too/enough** | 再…也不为过 | You **can't be too** careful. |\n| **may well** | 很可能 | He **may well** be right. |\n| **may as well** | 不妨，还是…为好 | We **may as well** stay home. |\n| **would rather** | 宁愿 | I **would rather** stay. |\n| **had better** | 最好 | You **had better** go now. |\n\n---\n\n## 相关笔记\n\n- 虚拟语气 — 情态动词 + have done 用于虚拟\n- 时态 Tenses — 情态动词 + 动词原形构成将来/推测\n- 被动语态 — 情态动词 + be done\n- 动词 Verbs — 情态动词属于动词的一类\n",
    "keywords": [
      "情态动词",
      "动词",
      "情态",
      "说话人的态度",
      "情态动词 + 动词原形",
      "推测用法",
      "动词原形",
      "推测",
      "虚拟/后悔",
      "本可能"
    ]
  },
  {
    "key": "虚拟语气",
    "title": "虚拟语气",
    "dir": "语法",
    "summary": "虚拟语气表示**与事实相反的假设、愿望、建议**——不是真实发生的事。核心 = **时态\"倒退一步\"**（现在→过去、过去→过去完成）。重点 = 虚拟条件句的三种类型 + 常见虚拟结构。",
    "content": "# 虚拟语气 Subjunctive Mood\n\n> **核心主线：** 虚拟语气表示**与事实相反的假设、愿望、建议**——不是真实发生的事。核心 = **时态\"倒退一步\"**（现在→过去、过去→过去完成）。重点 = 虚拟条件句的三种类型 + 常见虚拟结构。\n\n---\n\n## 一、虚拟语气的核心思想\n\n```\n真实条件句：If it rains, I'll stay home.（可能下雨 → 用陈述语气）\n虚拟条件句：If I were you, I would go.（我不可能是你 → 虚拟语气）\n```\n\n> **核心规则：** 虚拟语气中动词\"倒退一个时态\"——把时间轴往回拨。\n\n---\n\n## 二、虚拟条件句的三种类型 ⭐⭐（最重要）\n\n### 2.1 与现在事实相反\n\n| 从句（if） | 主句 |\n|:----------|:-----|\n| **did / were** | **would/could/might + do** |\n\n- **If I were** you, I **would study** harder.（我现实不是你）\n- **If it rained** now, we **would stay** home.\n\n### 2.2 与过去事实相反\n\n| 从句（if） | 主句 |\n|:----------|:-----|\n| **had done** | **would/could/might + have done** |\n\n- **If I had known** the truth, I **would have told** you.（我当时不知道）\n- **If you had come** earlier, you **would have met** him.\n\n### 2.3 与将来事实相反\n\n| 从句（if） | 主句 |\n|:----------|:-----|\n| **did / were to do / should do** | **would/could/might + do** |\n\n- **If I were to go** tomorrow, I would tell you.\n- **If he should come**, I would ask him.\n\n### 2.4 三种类型总表\n\n| 时间 | if 从句谓语 | 主句谓语 |\n|:-----|:----------|:--------|\n| 现在 | did / were | would + do |\n| 过去 | had done | would + have done |\n| 将来 | did / were to do / should do | would + do |\n\n---\n\n## 三、虚拟条件句的变形 ⭐\n\n### 3.1 省略 if 的倒装\n\n**从句中有 were / had / should 时，可省略 if，把这些词提前：**\n\n- **If I were** you → **Were I** you\n- **If I had known** → **Had I** known\n- **If he should come** → **Should he** come\n\n> **例句：** **Had I known** the truth, I would have told you.（= If I had known...）\n\n### 3.2 错综时间虚拟\n\n**从句与主句所指时间不同，各自按自己的时间倒退：**\n\n- **If I had** studied hard **in the past**, I **would be** a doctor **now**.（过去条件 → 现在结果）\n\n### 3.3 含蓄条件（无 if 从句）\n\n| 方式 | 例句 |\n|:-----|:-----|\n| **without / but for**（要不是） | **Without** your help, I couldn't have succeeded. |\n| **otherwise / or** | I was busy, **otherwise** I would have come. |\n\n---\n\n## 四、wish 的虚拟 ⭐\n\n**wish + 宾语从句（虚拟）**\n\n| 时间 | 从句谓语 | 例句 |\n|:-----|:--------|:-----|\n| 与现在相反 | did / were | I wish I **were** a bird. |\n| 与过去相反 | had done | I wish I **had studied** harder. |\n| 与将来相反 | would/could do | I wish it **would stop** raining. |\n\n> **记忆：** wish 后面的从句同样\"时态倒退一步\"。\n\n---\n\n## 五、名词性从句中的虚拟（should + 动词原形）⭐\n\n### 5.1 表\"建议/要求/命令\"的动词后\n\n| 动词 | 例句 |\n|:-----|:-----|\n| **suggest / advise**（建议） | I suggest that he **(should) go** at once. |\n| **demand / require**（要求） | They require that everyone **(should) attend**. |\n| **order / command**（命令） | He ordered that the work **(should) begin**. |\n| **insist**（坚持） | She insisted that he **(should) stay**. |\n\n> **口诀：** 一坚持（insist）、二命令（order, command）、三建议（suggest, advise, propose）、四要求（demand, require, request, ask）。从句谓语用 **should + 动词原形**（should 可省略）。\n\n### 5.2 表语/同位语从句中（名词：suggestion, advice, order...）\n\n- My **suggestion** is that he **(should) take** a rest.\n- The **order** that we **(should) leave** was given.\n\n### 5.3 it is + 形容词 + that 从句\n\n| 形容词 | 例句 |\n|:-------|:-----|\n| necessary, important, natural, strange, essential | It is necessary that he **(should) be** present. |\n\n---\n\n## 六、固定虚拟句型\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **would rather + 过去式** | 宁愿（虚拟） | I **would rather you came** tomorrow. |\n| **It's (high) time + 过去式 / should do** | 该做…了 | It's time we **went** home. |\n| **as if / as though + 虚拟** | 好像（虚拟） | He talks **as if he knew** everything. |\n| **if only** | 要是…就好了 | **If only I had** more time! |\n| **would like / had hoped + to have done** | 原希望… | I had hoped **to have met** you. |\n\n---\n\n## 七、虚拟语气判断技巧\n\n```\n第一步：判断是否\"与事实相反/愿望/建议\"\n        ├── 真实可能 → 陈述语气（正常时态）\n        └── 不可能/假设/建议 → 虚拟语气\n第二步：确定时间（现在/过去/将来）→ 时态倒退一步\n第三步：动词类别\n        ① 条件句 → 按三种类型\n        ② wish/if only → 从句倒退\n        ③ suggest/order 等 → should + 原形\n        ④ 固定句型 → 记固定搭配\n```\n\n---\n\n## 相关笔记\n\n- 时态 Tenses — 虚拟语气是时态的\"倒退应用\"\n- 情态动词 — would/could/might/should 在虚拟中的作用\n- 状语从句 — if 条件句的真实与虚拟\n- 名词性从句 — suggest/wish 后的宾语从句虚拟\n",
    "keywords": [
      "虚拟语气",
      "语气",
      "虚拟",
      "时态\"倒退一步\""
    ]
  },
  {
    "key": "主谓一致",
    "title": "主谓一致",
    "dir": "语法",
    "summary": "主谓一致 = **谓语动词在人称和数上必须与主语一致**。三大原则：**语法一致**（形式决定）、**意义一致**（含义决定）、**就近原则**（距离决定）。做题时先判断\"主语是谁、单数还是复数\"。",
    "content": "# 主谓一致 Subject-Verb Agreement\n\n> **核心主线：** 主谓一致 = **谓语动词在人称和数上必须与主语一致**。三大原则：**语法一致**（形式决定）、**意义一致**（含义决定）、**就近原则**（距离决定）。做题时先判断\"主语是谁、单数还是复数\"。\n\n---\n\n## 一、三大原则总览 ⭐\n\n| 原则 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **语法一致** | 主语单数→谓语单数；复数→复数 | **He is** a student. / **They are** students. |\n| **意义一致** | 按主语的意义而非形式 | **The police are** coming.（警察，复数意义） |\n| **就近原则** | 谓语与最近的名词一致 | There **is** a pen and two books. / Either you or he **is** wrong. |\n\n---\n\n## 二、语法一致：常考主语形式\n\n### 2.1 不定代词作主语\n\n| 主语 | 谓语 | 例词 |\n|:-----|:-----|:-----|\n| **单数**：everyone, somebody, nobody, everything, each, either, neither | 单数 | **Everyone is** here. / **Each** of them **has** a book. |\n| **复数**：both, few, many, several | 复数 | **Both of** them **are** students. |\n| **all / some / none** | 看所指名词 | **All is** quiet.（不可数）/ **All are** here.（人） |\n\n### 2.2 特殊形式的名词\n\n| 主语 | 谓语 | 例句 |\n|:-----|:-----|:-----|\n| 以 s 结尾的不可数名词（news, physics, maths, politics） | 单数 | **Physics is** my favorite subject. |\n| 成对出现的名词（trousers, glasses, scissors, shoes） | 复数（用 a pair of 则单数） | **My glasses are** new. / **This pair of shoes is** nice. |\n| 集合名词（family, class, team, group） | 整体→单数；成员→复数 | **The class is** big. / **The class are** having a discussion. |\n| people, police, cattle | 复数 | **The police are** looking for him. |\n\n---\n\n## 三、就近原则的三种结构 ⭐（高频）\n\n| 结构 | 例句 |\n|:-----|:-----|\n| **There be + 并列主语** | There **is** a pen and two books on the desk. |\n| **either...or...** | Either you or he **is** wrong. |\n| **neither...nor...** | Neither he nor I **am** right. |\n| **not only...but also...** | Not only he but also I **am** a student. |\n\n> **口诀：** 就近原则三兄弟 —— There be、either...or、neither...nor、not only...but also。谓语跟**最近**的名词走。\n\n---\n\n## 四、距离/插入语不影响主谓一致 ⭐\n\n**谓语与真正的主语一致，不受插入语（as well as, together with, along with, except, but, besides）影响。**\n\n- The teacher **as well as** the students **is** going.（谓语跟 the teacher）\n- Tom, **together with** his friends, **has** gone.\n\n> **技巧：** 遇到 as well as / with / together with，把插入部分\"括起来\"划掉，剩下的名词就是真正主语。\n\n---\n\n## 五、数量词作主语\n\n| 结构 | 谓语 | 例句 |\n|:-----|:-----|:-----|\n| **a number of + 复数** | 复数（许多） | **A number of students are** here. |\n| **the number of + 复数** | 单数（…的数量） | **The number of students is** 50. |\n| **a lot of / plenty of / half of + 名词** | 看名词 | Half of the **work is** done. / Half of the **students are** here. |\n| **百分数/分数 + of + 名词** | 看名词 | 60% of the **water is** polluted. / 60% of the **students are** boys. |\n| **时间/距离/金钱**（作为整体） | 单数 | **Ten years is** a long time. / **Five dollars is** enough. |\n| **the rest / the majority of** | 看名词 | The rest of the **money is** in the bank. |\n\n---\n\n## 六、其他易错点\n\n| 情形 | 谓语 | 例句 |\n|:-----|:-----|:-----|\n| **不定式/动名词/从句作主语** | 单数 | **To learn English is** important. / **Swimming is** fun. |\n| **and 连接的并列主语** | 复数 | **Tom and Mary are** friends. |\n| **and 连接同一事物/整体** | 单数 | **Bread and butter is** my breakfast.（黄油面包片） |\n| **the + 形容词**（表一类人） | 复数 | **The rich are** not always happy. |\n| **each/every/no + 单数 + and + 单数** | 单数 | **Every boy and girl is** here. |\n| **one of + 复数 + 定语从句** | 单数（先行词看 the only） | He is one of the students who **study** hard. / He is **the only one** who **studies** hard. |\n\n---\n\n## 七、解题步骤\n\n```\n第一步：找到真正的主语（划掉 as well as / with 等插入语）\n第二步：判断主语的数\n        ├── 特殊名词（news, police, family...）→ 查特殊规则\n        ├── 就近原则结构 → 看最近的名词\n        └── 一般名词/代词 → 单数复数直接判断\n第三步：选择谓语动词形式（is/are, has/have, do/does）\n```\n\n---\n\n## 相关笔记\n\n- 名词 Nouns — 可数/不可数、集合名词\n- 代词 Pronouns — 不定代词的单复数\n- 连词 Conjunctions — 就近原则的并列连词\n- 时态 Tenses — 谓语动词时态中的三单变化\n",
    "keywords": [
      "主谓一致",
      "语法一致",
      "意义一致",
      "就近原则",
      "单数",
      "复数",
      "最近",
      "时间/距离/金钱",
      "and 连接的并列主语",
      "the + 形容词"
    ]
  },
  {
    "key": "句法总览",
    "title": "句法总览",
    "dir": "句法",
    "summary": "句法研究**如何用词组成句子**——从**句子成分**到**五大基本句型**，再到**简单句 → 并列句 → 复合句**，最后攻克**从句与非谓语动词**两大难点。",
    "content": "# 句法总览 Syntax Overview\n\n> **核心主线：** 句法研究**如何用词组成句子**——从**句子成分**到**五大基本句型**，再到**简单句 → 并列句 → 复合句**，最后攻克**从句与非谓语动词**两大难点。\n\n---\n\n## 句法体系全景\n\n```\n句子成分（主/谓/宾/表/定/状/补）\n        │\n        ▼\n五大基本句型（S+V, S+V+O, ...）\n        │\n        ▼\n┌────────────────────────────────┐\n│ 简单句（一套主谓）                │\n│ 并列句（and/but/or 连接多套主谓）│\n│ 复合句（主句 + 从句）            │\n│  ├── 名词性从句（主语/宾语/表语） │\n│  ├── 定语从句（修饰名词）        │\n│  └── 状语从句（修饰动词/句子）   │\n└────────────────────────────────┘\n        │\n        ▼\n特殊句式（倒装/强调/反义疑问/祈使/感叹/省略）\n        │\n        ▼\n固定句型（It.../so...that/too...to 等速查）\n```\n\n---\n\n## 笔记列表\n\n| 编号 | 笔记 | 核心内容 |\n|:----:|:----|:----|\n| 1 | 句子成分 | 七大句子成分的识别与功能 |\n| 2 | 五大基本句型 | 英语句子的五种基本结构 |\n| 3 | 简单句与并列句 | 简单句、并列句、There be 句型 |\n| 4 | 名词性从句 | 主语/宾语/表语/同位语从句 |\n| 5 | 定语从句 | 关系代词/副词、限制性与非限制性 |\n| 6 | 状语从句 | 时间/条件/原因/让步等九类 |\n| 7 | 非谓语动词 | 不定式、动名词、分词 |\n| 8 | 特殊句式 | 倒装、强调、反义疑问、祈使、感叹、省略 |\n| 9 | 固定句型 | 高频固定句型的速查汇总 |\n\n---\n\n## 两条学习路径\n\n### 路径A：自下而上（系统学习）\n```\n1 句子成分 → 2 五大句型 → 3 简单句与并列句 → 4/5/6 三大从句 → 7 非谓语动词 → 8 特殊句式 → 9 固定句型\n```\n\n### 路径B：从难点突破（应试提分）\n```\n5 定语从句 → 4 名词性从句 → 6 状语从句（从句三件套）\n→ 7 非谓语动词 → 8 特殊句式 → 9 固定句型\n```\n\n---\n\n## 相关章节\n\n- 词法总览 — 词法提供\"零件\"，句法负责\"组装\"\n- 语法总览 — 词法 + 句法 = 语法全貌\n\n> **下一站：** 从 句子成分 开始，认识句子的骨架。\n",
    "keywords": [
      "句法总览",
      "如何用词组成句子",
      "句子成分",
      "五大基本句型",
      "从句与非谓语动词"
    ]
  },
  {
    "key": "句子成分",
    "title": "句子成分",
    "dir": "句法",
    "summary": "句子成分是\"句子的骨架\"——**主语**（谁）→ **谓语**（做什么/是什么）→ **宾语/表语**（承受者/补充说明）→ **定语/状语/补语**（修饰与补充）。识别成分是分析一切长难句的基础。",
    "content": "# 句子成分 Sentence Elements\n\n> **核心主线：** 句子成分是\"句子的骨架\"——**主语**（谁）→ **谓语**（做什么/是什么）→ **宾语/表语**（承受者/补充说明）→ **定语/状语/补语**（修饰与补充）。识别成分是分析一切长难句的基础。\n\n---\n\n## 一、七大句子成分总表\n\n| 成分 | 说明 | 常由哪些词担任 |\n|:-----|:-----|:-------------|\n| **主语** | 句子的主体（谁/什么） | 名词、代词、不定式、动名词、从句 |\n| **谓语** | 主语的动作/状态（做什么） | 动词（含时态/语态） |\n| **宾语** | 动作的承受者 | 名词、代词、不定式、动名词、从句 |\n| **表语** | 系动词后说明主语 | 名词、形容词、介词短语、从句 |\n| **定语** | 修饰名词/代词 | 形容词、名词、代词、介词短语、从句 |\n| **状语** | 修饰动词/形容词/副词/句子 | 副词、介词短语、不定式、从句 |\n| **补语** | 补充说明宾语/主语 | 名词、形容词、不定式、分词 |\n\n---\n\n## 二、主语 Subject\n\n**谓语陈述的对象，一般位于句首。**\n\n- **名词**：**The sun** rises in the east.\n- **代词**：**She** is a doctor.\n- **不定式**：**To learn English** is important.\n- **动名词**：**Swimming** is good for health.\n- **从句**：**What he said** is true.（主语从句，见 名词性从句）\n\n---\n\n## 三、谓语 Predicate ⭐\n\n**说明主语的动作或状态，是句子的核心。**\n\n- **实义动词**：He **runs** fast.\n- **系动词 + 表语**：She **is** beautiful.\n- **情态动词 + 动词原形**：I **can swim**.\n- **助动词 + 动词**：He **has finished** the work.\n\n> **注意：** 谓语动词必须与主语在人称和数上一致（见 主谓一致）。一个简单句**只能有一套谓语**，多余的动词要变成非谓语（见 非谓语动词）。\n\n---\n\n## 四、宾语 Object\n\n**动作的承受者，位于及物动词或介词之后。**\n\n- 直接宾语：I bought **a book**.\n- 间接宾语（人）+ 直接宾语（物）：She gave **me** **a gift**.\n- 介词宾语：He listens to **music**.\n- 宾语从句：I know **that he is right**.\n\n---\n\n## 五、表语 Predicative\n\n**系动词（be/become/look/feel...）之后的成分，说明主语是什么或怎么样。**\n\n| 形式 | 例句 |\n|:-----|:-----|\n| 名词 | He is **a teacher**. |\n| 形容词 | The flower is **red**. |\n| 介词短语 | She is **in good health**. |\n| 不定式 | My dream is **to be a doctor**. |\n| 表语从句 | The reason is **that he was ill**. |\n\n---\n\n## 六、定语 Attribute\n\n**修饰名词或代词，可前置或后置。**\n\n| 形式 | 位置 | 例句 |\n|:-----|:-----|:-----|\n| 形容词 | 前置 | a **beautiful** girl |\n| 名词 | 前置 | a **history** book |\n| 代词 | 前置 | **my** book, **this** pen |\n| 介词短语 | 后置 | the book **on the desk** |\n| 不定式 | 后置 | something **to eat** |\n| 定语从句 | 后置 | the man **who is standing there** |\n\n---\n\n## 七、状语 Adverbial\n\n**修饰动词、形容词、副词或整个句子，表时间、地点、原因、方式、程度、目的等。**\n\n- **时间**：He came **yesterday**.\n- **地点**：She lives **in Beijing**.\n- **方式**：He works **carefully**.\n- **原因**：He stayed home **because of the rain**.\n- **目的**：I study **to pass the exam**.\n- **条件**：**If it rains**, we'll stay in.\n\n---\n\n## 八、补语 Complement\n\n**补充说明宾语或主语，使意义完整。**\n\n| 类型 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| **宾语补足语** | 补充宾语 | We made him **happy**. / I saw him **crossing the street**. |\n| **主语补足语** | 补充主语（常出现在被动语态） | He was made **happy**. |\n\n> **注意区分：** 表语是系动词后的成分（说明主语），补语是\"宾语/主语 + 动作\"外的补充成分（使主谓宾意义完整）。\n\n---\n\n## 九、成分判断口诀\n\n> 主谓宾表定状补，**主**在句首**谓**中心；\n> 动词之后**宾语**跟，**系动词后表语**存；\n> 名词之前**定语**立，动词前后**状语**行；\n> 宾语后面**补语**补，七大成分要分清。\n\n---\n\n## 相关笔记\n\n- 五大基本句型 — 由成分构成的基本结构\n- 动词 Verbs — 及物/不及物决定是否有宾语\n- 名词性从句 — 名词性从句作主语/宾语/表语\n- 非谓语动词 — 不定式/分词/动名词作各种成分\n",
    "keywords": [
      "句子成分",
      "成分",
      "主语",
      "谓语",
      "宾语/表语",
      "定语/状语/补语",
      "宾语",
      "表语",
      "定语",
      "状语",
      "补语",
      "名词",
      "代词",
      "不定式",
      "动名词",
      "从句",
      "实义动词",
      "系动词 + 表语",
      "情态动词 + 动词原形",
      "助动词 + 动词",
      "只能有一套谓语",
      "时间",
      "地点",
      "方式",
      "原因",
      "目的",
      "条件",
      "宾语补足语",
      "主语补足语",
      "系动词后表语"
    ]
  },
  {
    "key": "五大基本句型",
    "title": "五大基本句型",
    "dir": "句法",
    "summary": "所有英语句子（无论多长）都可归结为**五种基本句型**。抓住句型 = 抓住句子的主干，长难句也能化繁为简。",
    "content": "# 五大基本句型 Five Basic Sentence Patterns\n\n> **核心主线：** 所有英语句子（无论多长）都可归结为**五种基本句型**。抓住句型 = 抓住句子的主干，长难句也能化繁为简。\n\n---\n\n## 一、五大句型总表 ⭐\n\n| 编号 | 句型 | 结构 | 例句 |\n|:----:|:-----|:-----|:-----|\n| ① | 主 + 谓 | **S + V** | Birds **fly**. |\n| ② | 主 + 谓 + 宾 | **S + V + O** | I **like** music. |\n| ③ | 主 + 系 + 表 | **S + V + P** | She **is** a teacher. |\n| ④ | 主 + 谓 + 间宾 + 直宾 | **S + V + IO + DO** | He **gave** me a book. |\n| ⑤ | 主 + 谓 + 宾 + 宾补 | **S + V + O + OC** | We **made** him happy. |\n\n> **记忆提示：** 英语动词决定句型。学会了动词的用法，就学会了句型的用法（\"动词决定句型\"）。\n\n---\n\n## 二、句型① 主 + 谓（S + V）\n\n**不及物动词作谓语，句意完整。**\n\n- The sun **rises**.\n- He **works** hard.（状语 hard 不是宾语）\n- She **left** early.\n\n> 判断技巧：动词后面不能接宾语的就是不及物动词，构成 S+V。\n\n---\n\n## 三、句型② 主 + 谓 + 宾（S + V + O）\n\n**及物动词后接宾语，动作有承受者。**\n\n- I **bought** a book.\n- She **speaks** English well.\n- He **loves** music.\n\n> 宾语可以由名词、代词、不定式、动名词或从句充当。\n\n---\n\n## 四、句型③ 主 + 系 + 表（S + V + P）\n\n**系动词不表示动作，只起连接作用，后接表语说明主语。**\n\n| 系动词类别 | 例词 | 例句 |\n|:---------|:-----|:-----|\n| 状态 | be | He **is** a student. |\n| 变化 | become, get, turn, grow | The leaves **turn** yellow. |\n| 感官 | look, sound, feel, taste, smell | The cake **tastes** delicious. |\n| 保持 | keep, stay, remain | Please **keep** quiet. |\n| 表象 | seem, appear | It **seems** easy. |\n\n> **易错：** 感官系动词后接形容词（not 副词）：`It sounds good.`（✕ sounds well）\n\n---\n\n## 五、句型④ 主 + 谓 + 间宾 + 直宾（S + V + IO + DO）\n\n**谓语动词后接两个宾语：间接宾语（人）+ 直接宾语（物）。**\n\n| 结构 | 例句 |\n|:-----|:-----|\n| 动词 + 人 + 物 | She **gave me a book**. |\n| 动词 + 物 + to + 人 | She **gave a book to me**. |\n| 动词 + 物 + for + 人 | He **bought a gift for me**. |\n\n**常见双宾语动词：**\n\n| 接 to | 接 for |\n|:------|:------|\n| give, pass, show, send, lend, tell, teach | buy, make, get, find, cook, draw, sing |\n\n> He **passed** the salt **to** me. / Mom **made** a cake **for** me.\n\n---\n\n## 六、句型⑤ 主 + 谓 + 宾 + 宾补（S + V + O + OC）\n\n**宾语后需补语补充说明，否则意义不完整。**\n\n| 宾补形式 | 例句 |\n|:---------|:-----|\n| 名词 | We elected him **monitor**. |\n| 形容词 | The news made me **happy**. |\n| 不定式 | I asked him **to help me**. |\n| 分词 | I saw him **crossing** the street. |\n| 介词短语 | He found the house **in ruins**. |\n\n**常用动词：** make, keep, find, get, see, hear, watch, let, have, ask, tell, want...\n\n> **注意：** 使役/感官动词后接省略 to 的不定式：`I saw him cross the street.` / `Let me go.`（主动）；变为被动时 to 要回来：`He was seen **to** cross the street.`\n\n---\n\n## 七、句型之间的转换\n\n| 转换 | 例句 |\n|:-----|:-----|\n| 主动 → 被动 | He gave me a book. → I **was given** a book (by him). |\n| 复合句 → 简单句 | I know **that he is right**. → I know **him to be right**. |\n\n> 被动语态规则见 被动语态；从句简化见 非谓语动词。\n\n---\n\n## 相关笔记\n\n- 句子成分 — 各成分的定义是句型识别的基础\n- 动词 Verbs — 动词的及物性决定句型\n- 被动语态 — 四种带宾语句型都可变被动\n- 简单句与并列句 — 五大句型即简单句\n",
    "keywords": [
      "五大基本句型",
      "句型",
      "五种基本句型"
    ]
  },
  {
    "key": "简单句与并列句",
    "title": "简单句与并列句",
    "dir": "句法",
    "summary": "按句子结构，英语句子分三类——**简单句**（一套主谓）、**并列句**（并列连词连接多套主谓）、**复合句**（主句 + 从句）。本篇覆盖前两类 + There be 句型。",
    "content": "# 简单句与并列句 Simple & Compound Sentences\n\n> **核心主线：** 按句子结构，英语句子分三类——**简单句**（一套主谓）、**并列句**（并列连词连接多套主谓）、**复合句**（主句 + 从句）。本篇覆盖前两类 + There be 句型。\n\n---\n\n## 一、句子结构分类\n\n```\n按结构分\n├── 简单句：一套主谓结构\n│     I like music.\n├── 并列句：并列连词 + 两套以上主谓\n│     I like music, but he likes sports.\n└── 复合句：主句 + 从句\n      I know that he likes music.  → 名词性从句\n```\n\n---\n\n## 二、简单句 Simple Sentence\n\n**只有一套主谓结构的句子。**\n\n| 类型 | 例句 |\n|:-----|:-----|\n| 主 + 谓 | The sun **rises**. |\n| 主 + 谓 + 宾 | She **speaks** English. |\n| 主 + 系 + 表 | He **is** a teacher. |\n| 主 + 谓 + 间宾 + 直宾 | She **gave** me a book. |\n| 主 + 谓 + 宾 + 宾补 | We **made** him happy. |\n\n> 详见 五大基本句型。简单句的变式包括：**祈使句**（Read it.）、**感叹句**（How beautiful it is!）、**疑问句**（Do you like it?）、**There be 句型**。\n\n---\n\n## 三、There be 句型 ⭐\n\n**表\"某地/某时有某物\"，是英语特有的倒装结构。**\n\n```\nThere be + 名词 + 地点/时间状语\n```\n\n- There **is** a book **on the desk**.\n- There **are** many students **in the classroom**.\n- There **was** a meeting **yesterday**.\n\n### 3.1 就近原则 ⭐\n\n**当 be 后出现多个并列名词时，be 与最近的名词一致。**\n\n- There **is** a pen and two books on the desk.（最近 a pen → is）\n- There **are** two books and a pen on the desk.（最近 two books → are）\n\n### 3.2 常用变体\n\n| 变体 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| there be + 情态动词 | 表\"可能有/会有\" | There **must be** a mistake. |\n| there be + 不定式 | 表\"将有\" | There is going to **be** a party. |\n| There's nothing/No... | 表\"没有\" | There **is nothing** in the box. |\n\n> **区别：** `have` 表\"拥有\"（主语拥有），`There be` 表\"存在\"：`I have a book.`（我有一本书）/ `There is a book on the desk.`（桌上有一本书）。\n\n---\n\n## 四、并列句 Compound Sentence ⭐\n\n**用并列连词把两个或以上的简单句连在一起，各分句地位平等。**\n\n```\n简单句 + 并列连词 + 简单句\n```\n\n### 4.1 四类并列关系\n\n| 关系 | 连词 | 例句 |\n|:-----|:-----|:-----|\n| **并列/递进** | and, not only...but also | I like tea, **and** he likes coffee. |\n| **转折** | but, while, yet | I like tea, **but** he likes coffee. |\n| **选择** | or, either...or | Hurry up, **or** you'll miss the bus. |\n| **因果** | so, for | It rained, **so** we stayed home. |\n\n### 4.2 并列句的三种连接方式\n\n| 方式 | 例句 |\n|:-----|:-----|\n| **逗号 + 并列连词** | I was tired, **so** I went to bed early. |\n| **分号（;）** | I was tired; I went to bed early. |\n| **分号 + 连接副词** | I was tired; **therefore**, I went to bed early. |\n\n> 常用连接副词：however（然而）、therefore（因此）、otherwise（否则）、besides（此外）。\n\n### 4.3 易错点\n\n1. **两个连词不能连用**：`Although he is young, he is wise.`（✕ Although..., but...）\n2. **逗号不能单独连接两个分句**（无连词 → 用分号或改为复合句）。\n\n---\n\n## 五、祈使句与感叹句\n\n| 类型 | 结构 | 例句 |\n|:-----|:-----|:-----|\n| **祈使句**（肯定） | 动词原形开头 | **Open** the door, please. |\n| **祈使句**（否定） | Don't + 动词原形 | **Don't** be late. |\n| **感叹句**（What） | What + (a/an) + 形容词 + 名词 + 主谓！ | **What** a beautiful girl (she is)! |\n| **感叹句**（How） | How + 形容词/副词 + 主谓！ | **How** beautiful (she is)! |\n\n> **口诀：** 感叹句看中心词——名词用 What，形容词/副词用 How。`What a smart boy!` / `How smart the boy is!`\n\n---\n\n## 相关笔记\n\n- 连词 Conjunctions — 并列连词详解\n- 五大基本句型 — 简单句的五大结构\n- 名词性从句 — 简单句升级为复合句\n- 特殊句式 — 倒装、强调等特殊句型\n",
    "keywords": [
      "简单句与并列句",
      "并列",
      "简单句",
      "并列句",
      "复合句",
      "祈使句",
      "感叹句",
      "疑问句",
      "There be 句型",
      "并列/递进",
      "转折",
      "选择",
      "因果",
      "逗号 + 并列连词",
      "分号（;）",
      "分号 + 连接副词",
      "两个连词不能连用",
      "逗号不能单独连接两个分句"
    ]
  },
  {
    "key": "名词性从句",
    "title": "名词性从句",
    "dir": "句法",
    "summary": "从句在整个句中担任**名词的角色**（主语/宾语/表语/同位语）时就是名词性从句。四兄弟：**主语从句、宾语从句、表语从句、同位语从句**。关键 = 引导词的选用。",
    "content": "# 名词性从句 Noun Clauses\n\n> **核心主线：** 从句在整个句中担任**名词的角色**（主语/宾语/表语/同位语）时就是名词性从句。四兄弟：**主语从句、宾语从句、表语从句、同位语从句**。关键 = 引导词的选用。\n\n---\n\n## 一、名词性从句家族\n\n```\n名词性从句\n├── 主语从句：作主语     That he is right is true.\n├── 宾语从句：作宾语     I know that he is right.\n├── 表语从句：作表语     The truth is that he is right.\n└── 同位语从句：作同位语  The fact that he is right is clear.\n```\n\n| 从句类型 | 位置 | 例句 |\n|:--------|:-----|:-----|\n| **主语从句** | 句首（或 it 作形式主语） | **What he said** is true. / **It** is true **that he said so**. |\n| **宾语从句** | 及物动词/介词后 | I think **that he is right**. |\n| **表语从句** | 系动词后 | The reason is **that he was ill**. |\n| **同位语从句** | 抽象名词后 | The news **that he won** excited us. |\n\n---\n\n## 二、引导词三兄弟 ⭐\n\n| 引导词 | 作用 | 是否作成分 |\n|:------|:-----|:----------|\n| **that** | 无实义，仅连接 | 不作成分（可省略：宾语从句中） |\n| **whether / if** | \"是否\" | 不作成分 |\n| **疑问词**（what, who, which, when, where, why, how） | 保留疑问含义 | **作成分**（主语/宾语/状语等） |\n\n### 2.1 that 的省略规则\n\n| 位置 | 可否省略 | 例句 |\n|:-----|:--------|:-----|\n| 宾语从句 | ✅ 可省略 | I think **(that)** he is right. |\n| 主语从句 | ❌ 不可省略 | **That** he is right is true. |\n| 表语从句 | ❌ 不可省略 | The problem is **that** we have no time. |\n| 同位语从句 | ❌ 不可省略 | The fact **that** he came helped us. |\n\n### 2.2 whether vs if\n\n| 用法 | whether | if |\n|:-----|:--------|:---|\n| 宾语从句 | ✅ | ✅（口语常用） |\n| 主语从句（句首） | ✅ | ❌ |\n| 表语从句 | ✅ | ❌ |\n| 介词后 | ✅ | ❌ |\n| 后接 or not | ✅（whether or not） | ❌ |\n| 不定式前 | ✅（whether to go） | ❌ |\n\n> **口诀：** 介词后、句首、or not、不定式 —— 只用 whether。\n\n---\n\n## 三、宾语从句的三个要点 ⭐\n\n### 3.1 语序：宾语从句用陈述语序\n\n- Do you know **where he lives**?（✕ where does he live）\n- I don't know **what he said**.\n\n### 3.2 时态呼应\n\n| 主句时态 | 从句时态 | 例句 |\n|:--------|:--------|:-----|\n| 现在/将来时 | 根据实际需要 | He says **he will come**. |\n| 过去时 | 相应的过去时态 | He said **he was busy**. |\n| 客观真理 | 一律用一般现在时 | The teacher said the earth **goes** around the sun. |\n\n### 3.3 否定转移\n\n**think / believe / suppose / expect + 宾语从句，否定主句的谓语。**\n\n- I **don't** think **he is right**.（✕ I think he isn't right.）\n- I don't believe **she will come**.\n\n---\n\n## 四、主语从句与形式主语 it\n\n**为避免头重脚轻，用 it 作形式主语，把真正的主语从句放到后面。**\n\n- **It** is important **that we study English**.\n- **It** is known **that he is a good teacher**.\n\n> 常见结构：`It + be + 形容词/名词 + that从句`；`It + 不及物动词(seems/appears/happens) + that从句`。\n\n---\n\n## 五、同位语从句 vs 定语从句 ⭐（易混）\n\n| 对比 | 同位语从句 | 定语从句 |\n|:-----|:----------|:--------|\n| 先行词 | 抽象名词（fact, news, idea, belief, hope） | 任何名词/代词 |\n| that 的作用 | 只连接，**不作成分**，不省略 | **作成分**（主语/宾语），作宾语可省略 |\n| 从句性质 | 说明名词的**内容** | 修饰、限定名词 |\n| 例句 | The news **that he won** is true.（他赢了这个消息） | The news **that he told** me is true.（他告诉我的消息） |\n\n---\n\n## 六、技巧：从句成分分析法\n\n```\n第一步：找到从句引导词\n第二步：去掉引导词后，从句是否缺成分？\n        ├── 缺主语/宾语 → 用 what/which/who（作成分）\n        └── 不缺成分 → 用 that（不作成分）或 whether（是否）\n第三步：根据\"是否\"语义选择 whether/if\n```\n\n> What he said = \"他所说的\"（said 缺宾语）；That he said it = \"他说过这件事\"（不缺成分）。\n\n---\n\n## 相关笔记\n\n- 句子成分 — 主语/宾语/表语的识别\n- 五大基本句型 — 从句在句型中占据名词位置\n- 定语从句 — 与同位语从句对比区分\n- 连词 Conjunctions — 从属连词 that/whether/if\n",
    "keywords": [
      "名词性从句",
      "从句",
      "名词",
      "名词的角色",
      "主语从句",
      "宾语从句",
      "表语从句",
      "同位语从句",
      "疑问词",
      "内容"
    ]
  },
  {
    "key": "定语从句",
    "title": "定语从句",
    "dir": "句法",
    "summary": "定语从句是**修饰名词/代词的句子**（相当于一个长的形容词）。关键三要素：**先行词**（被修饰的词）+ **关系词**（连接词）+ **关系词在从句中作什么成分**。",
    "content": "# 定语从句 Attributive Clauses\n\n> **核心主线：** 定语从句是**修饰名词/代词的句子**（相当于一个长的形容词）。关键三要素：**先行词**（被修饰的词）+ **关系词**（连接词）+ **关系词在从句中作什么成分**。\n\n---\n\n## 一、定语从句的结构\n\n```\n先行词 + 关系词 + 从句（缺先行词的成分）\n```\n\n- The man **who is standing there** is my teacher.\n- 先行词 = man；关系词 = who（在从句中作主语）；从句 = is standing there\n\n---\n\n## 二、关系词的选择 ⭐\n\n### 2.1 关系代词\n\n| 先行词 | 作主语 | 作宾语 | 作定语 |\n|:------|:------|:------|:------|\n| 人 | **who / that** | **who / whom / that**（可省略） | **whose** |\n| 物 | **which / that** | **which / that**（可省略） | **whose / of which** |\n\n- The girl **who** is singing is my sister.（who 作主语）\n- The book **(that/which)** I bought is interesting.（作宾语，可省略）\n- The boy **whose** father is a doctor is my friend.（whose 作定语）\n\n### 2.2 关系副词\n\n| 关系副词 | 相当于 | 先行词 | 例句 |\n|:--------|:------|:------|:-----|\n| **when** | in/on/at + which | 时间（day, year, time） | the day **when** we met |\n| **where** | in/on/at + which | 地点（place, room） | the school **where** I studied |\n| **why** | for which | 原因（reason） | the reason **why** he left |\n\n> **注意：** 关系副词在从句中作**状语**，而关系代词作**主语/宾语**——这是区分的关键。\n\n---\n\n## 三、只用 that 的场合 ⭐\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 先行词是不定代词（all, everything, nothing, much） | Tell me **all that** you know. |\n| 先行词被 the very / the only 修饰 | This is **the very book that** I want. |\n| 先行词被最高级/序数词修饰 | This is **the best film that** I have seen. |\n| 先行词既有人又有物 | I like the people **and things that** are here. |\n\n---\n\n## 四、只用 which 的场合\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 非限制性定语从句 | He passed the exam, **which** made us happy. |\n| 介词 + 关系词 | This is the room **in which** we live. |\n| 先行词为整个句子 | She was late again, **which** annoyed the boss. |\n\n---\n\n## 五、限制性 vs 非限制性定语从句 ⭐\n\n| 对比 | 限制性 | 非限制性 |\n|:-----|:------|:--------|\n| 作用 | 修饰限定（去掉后句意不完整） | 补充说明（去掉后句意仍完整） |\n| 逗号 | **无**逗号 | **有**逗号 |\n| 关系词 | who/whom/which/that/whose | **不用 that**，不用 who 可作宾省略 |\n| 翻译 | 定语：\"…的\" | 并列/补充：\"…，而…\" / \"…，这件事…\" |\n\n- My brother **who lives in Beijing** is a doctor.（限制性：我有多个兄弟，特指在北京的那个）\n- My brother, **who lives in Beijing**, is a doctor.（非限制性：我只有一个兄弟，补充说明他住在北京）\n\n---\n\n## 六、介词 + 关系代词\n\n```\n介词 + which（物）/ whom（人）\n```\n\n- This is the house **in which** Lu Xun once lived.\n- The man **to whom** you spoke is our teacher.\n\n**介词的选择三原则：**\n\n1. 根据从句中动词/形容词的搭配：`talk about` → the topic **about which** we talked\n2. 根据先行词的搭配：`at the speed` → the speed **at which**\n3. **关系代词 that 前不能直接放介词**：✕ in that → 用 in which / where\n\n> **化简：** `in which` 表地点可换 `where`；`on which` 表时间可换 `when`；`for which` 表原因可换 `why`。\n\n---\n\n## 七、that 与 which 均可省略的判断\n\n关系代词**作宾语**时可以省略：\n\n- The book **(that/which)** I read yesterday is good.（作 read 的宾语 → 可省略）\n- The book **that** is on the desk is mine.（作主语 → 不可省略）\n\n---\n\n## 八、常见易错点\n\n1. **先行词被 as 修饰**：`the same...as`, `such...as`（as 作关系代词）\n   - This is **the same watch as** I lost.\n2. **the way 后接从句**：`the way (in which / that)` 表方式。\n3. **分隔定语从句**：先行词与从句之间被其他成分隔开，要能识别。\n\n---\n\n## 相关笔记\n\n- 名词性从句 — that 在名词性从句中不作成分，在定语从句中作成分\n- 连词 Conjunctions — 关系代词/副词是特殊的连词\n- 状语从句 — when/where 也可引导状语从句\n- 代词 Pronouns — 关系代词 wh- 系列与人称代词同源\n",
    "keywords": [
      "定语从句",
      "从句",
      "定语",
      "修饰名词/代词的句子",
      "先行词",
      "关系词",
      "关系词在从句中作什么成分",
      "状语",
      "主语/宾语",
      "不用 that",
      "作宾语",
      "先行词被 as 修饰",
      "the way 后接从句",
      "分隔定语从句"
    ]
  },
  {
    "key": "状语从句",
    "title": "状语从句",
    "dir": "句法",
    "summary": "状语从句在句中作**状语**（修饰动词、形容词、副词或整个句子），按意义分**九大类**。核心 = 从属连词的选用与时态规则。",
    "content": "# 状语从句 Adverbial Clauses\n\n> **核心主线：** 状语从句在句中作**状语**（修饰动词、形容词、副词或整个句子），按意义分**九大类**。核心 = 从属连词的选用与时态规则。\n\n---\n\n## 一、九类状语从句总表 ⭐\n\n| 类型 | 常用连词 | 例句 |\n|:-----|:---------|:-----|\n| **时间** | when, while, as, before, after, until, since, as soon as | I'll call you **when** I arrive. |\n| **条件** | if, unless, as long as | **If** it rains, we'll stay in. |\n| **原因** | because, since, as, now that | I stayed home **because** it rained. |\n| **目的** | so that, in order that | Speak up **so that** all can hear. |\n| **结果** | so...that, such...that | He was **so** tired **that** he slept. |\n| **让步** | although, though, even if, no matter + 疑问词 | **Although** it was late, he kept on. |\n| **比较** | than, as...as | She is taller **than** I am. |\n| **方式** | as, as if, as though | He talks **as if** he knew everything. |\n| **地点** | where, wherever | Put it **where** you found it. |\n\n---\n\n## 二、时间状语从句 ⭐\n\n### 2.1 主将从现\n\n**主句用一般将来时，时间/条件状语从句用一般现在时表将来。**\n\n- I will tell you **when** he **comes**.（✕ when he will come）\n- **As soon as** I **get** home, I'll call you.\n\n### 2.2 when / while / as 的区分\n\n| 连词 | 用法 | 例句 |\n|:-----|:-----|:-----|\n| **when** | 时间点/时间段，\"这时\" | When I got home, it was dark. / I was reading **when** he came. |\n| **while** | 时间段，从句用进行时；表\"而\" | **While** I was cooking, he watched TV. |\n| **as** | 同时进行；\"随着\" | **As** time goes by, we grow up. |\n\n### 2.3 until / since / before\n\n- **until**：主句动词为延续性动词用肯定（wait until...）；为瞬间动词用否定（not...until 直到…才）。\n  - I waited **until** he came.（等：延续）\n  - He **didn't** leave **until** I arrived.（直到我到达他才离开）\n- **since**：主句用现在完成时，从句用一般过去时。\n  - I have lived here **since** I was born.\n- **before**：表\"在…之前\"，注意时态搭配。\n  - She had studied English **before** she went to college.\n\n---\n\n## 三、条件状语从句\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **if** | 如果 | If it is fine tomorrow, we'll go hiking. |\n| **unless** | 除非（= if...not） | You'll fail **unless** you study hard. |\n| **as long as** | 只要 | **As long as** you work hard, you'll succeed. |\n\n> **注意：** 条件从句同样遵循\"主将从现\"。\n\n---\n\n## 四、原因状语从句\n\n| 连词 | 语气 | 例句 |\n|:-----|:-----|:-----|\n| **because** | 最强（直接原因），回答 why | I was absent **because** I was ill. |\n| **since** | 次之（既然，双方已知原因） | **Since** you're here, let's start. |\n| **as** | 较弱（附带说明） | **As** it was late, I went home. |\n| **now that** | 既然（新情况） | **Now that** everyone is here, let's begin. |\n\n> **注意：** `because` 不与 `so` 连用；`because of` 是介词短语，后接名词（✕ because of it rained）。\n\n---\n\n## 五、目的状语从句 vs 结果状语从句\n\n| 类型 | 连词 | 特征 | 例句 |\n|:-----|:-----|:-----|:-----|\n| **目的** | so that, in order that | 表\"为了\"，常含 can/could/may | I got up early **so that** I could catch the bus. |\n| **结果** | so...that, such...that | 表\"如此…以至于\"，that 后是结果 | He ran **so** fast **that** I couldn't catch him. |\n\n**so...that vs such...that 的区分：**\n\n| 结构 | 例句 |\n|:-----|:-----|\n| **so + 形容词/副词 + that** | It is **so** hot **that** we can't go out. |\n| **such + (a/an) + 名词 + that** | It is **such** a hot day **that** we can't go out. |\n| **such + 不可数/复数名词 + that** | They are **such** good books **that** everyone likes them. |\n\n---\n\n## 六、让步状语从句\n\n| 连词 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **although / though** | 虽然 | **Although** it rained, we still went out. |\n| **even if / even though** | 即使 | **Even if** I fail, I'll try again. |\n| **no matter + 疑问词** | 无论… | **No matter what** you do, do it well. |\n| **疑问词 + ever** | 无论…（= no matter + 疑问词） | **Whatever** you say, I won't change my mind. |\n| **while** | 尽管（句首） | **While** he is young, he is very wise. |\n\n> **注意：** `although` 不与 `but` 连用；`although` + 从句 = `despite/in spite of` + 名词。\n\n---\n\n## 七、比较 / 方式 / 地点状语从句\n\n- **比较**：`as...as`, `than`；倍数的表达见 数词 Numerals。\n  - He is **as tall as** his father.\n- **方式**：`as`, `as if / as though`（虚拟语气见 虚拟语气）。\n  - Do **as** I tell you. / He looks **as if** he were ill.\n- **地点**：`where`, `wherever`。\n  - Go **where** you like.\n\n---\n\n## 八、状语从句的简化\n\n**当从句主语与主句主语一致时，状语从句可简化为分词/不定式短语。**\n\n- **Because** he was tired, he stopped. → **Being tired**, he stopped.\n- **If** you are given more time, you can do better. → **Given** more time, you can do better.\n\n> 详见 非谓语动词。\n\n---\n\n## 相关笔记\n\n- 连词 Conjunctions — 从属连词详解\n- 定语从句 — when/where 在定语从句 vs 状语从句中的区分\n- 虚拟语气 — if 虚拟条件句\n- 非谓语动词 — 状语从句的简化\n",
    "keywords": [
      "状语从句",
      "从句",
      "状语",
      "九大类",
      "时间",
      "条件",
      "原因",
      "目的",
      "结果",
      "让步",
      "比较",
      "方式",
      "地点",
      "疑问词 + ever"
    ]
  },
  {
    "key": "非谓语动词",
    "title": "非谓语动词",
    "dir": "句法",
    "summary": "一个简单句只有**一个谓语**，多余的动词必须\"降级\"成**非谓语动词**——**不定式、动名词、分词**。非谓语动词不能单独作谓语，但仍保留动词的某些特征（可带宾语、状语、有语态）。",
    "content": "# 非谓语动词 Non-finite Verbs\n\n> **核心主线：** 一个简单句只有**一个谓语**，多余的动词必须\"降级\"成**非谓语动词**——**不定式、动名词、分词**。非谓语动词不能单独作谓语，但仍保留动词的某些特征（可带宾语、状语、有语态）。\n\n---\n\n## 一、为什么需要非谓语动词\n\n```\n一个简单句只能有一个谓语：\n✕ I want to go home and rest.  （两个动词都是谓语？错）\n✅ I want to go home and rest.  （want 是谓语，to go/rest 是非谓语）\n✕ Seeing the teacher, he walked up.  （seeing 不是谓语）\n```\n\n> **核心规则：** 句中已有谓语动词，其余动词要么被连词连接构成并列句，要么变成非谓语动词（不定式/动名词/分词）。\n\n---\n\n## 二、三大非谓语动词总览 ⭐\n\n| 形式 | 构成 | 句法功能 | 侧重点 |\n|:-----|:-----|:--------|:------|\n| **不定式** | to + 动词原形 | 主语/宾语/表语/定语/状语/宾补 | 目的、将来、具体某一次 |\n| **动名词** | 动词 + -ing | 主语/宾语/表语/定语 | 习惯、抽象、一般情况 |\n| **分词** | 现在分词 -ing / 过去分词 -ed | 表语/定语/状语/宾补 | 主动进行 / 被动完成 |\n\n---\n\n## 三、不定式 Infinitive\n\n### 3.1 句法功能\n\n| 功能 | 例句 |\n|:-----|:-----|\n| 作主语 | **To learn English** is important. |\n| 作宾语 | I want **to go** home. |\n| 作表语 | My dream is **to be** a teacher. |\n| 作定语 | I have something **to say**. |\n| 作状语（目的/结果） | He came **to help** me. |\n| 作宾补 | I asked him **to help** me. |\n\n### 3.2 不定式作宾语：接 to do 的常用动词\n\n| 类别 | 动词 |\n|:-----|:-----|\n| 表意愿/打算 | want, hope, wish, decide, plan, would like |\n| 表请求/命令 | ask, tell, order, invite |\n| 表努力/试图 | try, manage, attempt, learn |\n\n### 3.3 省略 to 的场合\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 使役动词 | Let / make / have + 宾语 + **do** |\n| 感官动词 | see / hear / watch / feel + 宾语 + **do** |\n| 固定句型 | had better do, would rather do, why not do |\n\n> **被动语态中 to 要还原：** `He made me do it.` → `I was made **to** do it.`\n\n---\n\n## 四、动名词 Gerund\n\n### 4.1 作主语与宾语\n\n| 功能 | 例句 |\n|:-----|:-----|\n| 作主语 | **Swimming** is good for health. |\n| 作宾语 | I enjoy **reading**. |\n| 作介词宾语 | He is good at **playing** chess. |\n| 作表语 | My hobby is **collecting** stamps. |\n\n### 4.2 接动名词的常用动词 ⭐\n\n| 类别 | 动词 |\n|:-----|:-----|\n| 表喜欢/厌恶 | enjoy, finish, mind, avoid, keep, practice |\n| 表建议/考虑 | suggest, consider, imagine |\n| 表习惯 | be used to, be busy, can't help, feel like |\n| 固定搭配 | look forward to, pay attention to, devote...to |\n\n> **口诀：** 喜欢(enjoy)完成(finish)介意(mind)，避免(avoid)保持(keep)练习(practice)，建议(suggest)考虑(consider)想象(imagine)，习惯(be used to)忙于(be busy)忍不住(can't help)。\n\n---\n\n## 五、动名词 vs 不定式作宾语的辨析 ⭐\n\n| 动词 | 接 to do | 接 doing | 意义变化 |\n|:-----|:--------|:---------|:--------|\n| **remember** | 记得**去做**（未做） | 记得**做过**（已做） | Remember to lock the door. / I remember locking the door. |\n| **forget** | 忘记**去做** | 忘记**做过** | Don't forget to call me. / I forgot telling him. |\n| **stop** | 停下来**去做** | 停止**做** | Stop to rest.（停下休息）/ Stop talking.（别说了） |\n| **try** | 努力**去做** | 尝试**做** | Try to work harder. / Try pressing the button. |\n| **regret** | 遗憾**要去做** | 后悔**做了** | I regret to say... / I regret saying that. |\n\n---\n\n## 六、分词 Participle\n\n### 6.1 现在分词 vs 过去分词 ⭐\n\n| 对比 | 现在分词 (-ing) | 过去分词 (-ed) |\n|:-----|:---------------|:--------------|\n| 语态 | **主动** | **被动** |\n| 时间 | 正在进行 | 已经完成 |\n| 例词 | the **running** boy（奔跑的男孩） | the **broken** window（被打破的窗） |\n| 作表语 | The story is **interesting**. | I am **interested** in the story. |\n\n### 6.2 分词的句法功能\n\n| 功能 | 现在分词 | 过去分词 |\n|:-----|:---------|:---------|\n| 作定语 | a **sleeping** baby | a **written** letter |\n| 作状语 | **Hearing** the news, he cried.（主动伴随） | **Given** more time, I can do better.（被动条件） |\n| 作宾补 | I saw him **crossing** the street. | I had my hair **cut**. |\n\n### 6.3 独立主格结构\n\n**分词有自己的逻辑主语时，构成独立主格结构：**\n\n- **Weather permitting**, we'll go outing.（天气允许的话）\n- **Time permitting**, we'll discuss more.\n\n---\n\n## 七、非谓语动词的否定与语态\n\n| 形式 | 例词 |\n|:-----|:-----|\n| 否定 | **not** to do / **not** doing |\n| 一般被动 | to be done / being done |\n| 完成式 | to have done / having done |\n\n- **Not knowing** what to do, he asked for help.\n- The bridge **to be built** next year will be very long.\n\n---\n\n## 八、判断技巧\n\n```\n第一步：看句中是否已有谓语动词\n        ├── 没有 → 用谓语动词（此时态）\n        └── 已有 → 其他动词用非谓语\n第二步：判断逻辑主语\n        ├── 主语（主动关系）→ -ing / to do\n        └── 受动关系 → -ed / to be done\n第三步：判断功能\n        目的/将来 → 不定式；习惯/抽象 → 动名词；伴随/状态 → 分词\n```\n\n---\n\n## 相关笔记\n\n- 动词 Verbs — 动词的五种基本形式\n- 句子成分 — 非谓语动词作各种成分\n- 五大基本句型 — 宾补（to do/doing/done）\n- 时态 Tenses — 谓语动词的时态与非谓语区分\n",
    "keywords": [
      "非谓语动词",
      "动词",
      "非谓语",
      "一个谓语",
      "不定式",
      "动名词",
      "分词",
      "去做",
      "做过",
      "要去做",
      "做了",
      "主动",
      "被动"
    ]
  },
  {
    "key": "特殊句式",
    "title": "特殊句式",
    "dir": "句法",
    "summary": "六大特殊句式——**倒装**（语序变化）、**强调**（突出重点）、**反义疑问句**（确认信息）、**祈使句**（请求命令）、**感叹句**（抒发情感）、**省略**（精简表达）。它们是写作与阅读中的\"加分点\"与\"难点\"。",
    "content": "# 特殊句式 Special Sentence Patterns\n\n> **核心主线：** 六大特殊句式——**倒装**（语序变化）、**强调**（突出重点）、**反义疑问句**（确认信息）、**祈使句**（请求命令）、**感叹句**（抒发情感）、**省略**（精简表达）。它们是写作与阅读中的\"加分点\"与\"难点\"。\n\n---\n\n## 一、倒装句 Inversion\n\n**谓语动词全部或部分提到主语之前。分全倒装与部分倒装。**\n\n### 1.1 全部倒装（谓语完全在主语前）\n\n| 触发条件 | 例句 |\n|:--------|:-----|\n| **here / there / now / then** 开头的方位副词 | **Here comes** the bus. |\n| **in / out / up / down / away** 等方位副词开头 | **Out rushed** the children. |\n| **表语或状语前置**（介词短语开头） | **In front of the house** stands a tall tree. |\n\n> **注意：** 主语是**代词**时不倒装：`Here he comes.`（✕ Here comes he）\n\n### 1.2 部分倒装（助动词/情态动词/be 提前）\n\n| 触发条件 | 例句 |\n|:--------|:-----|\n| **否定词开头**（never, seldom, hardly, little, not only, no sooner） | **Never have** I seen such a sight. |\n| **Only + 状语** 开头 | **Only then did** I realize my mistake. |\n| **so / neither / nor** 表\"也/也不\" | I like it. **So do** I. / I can't swim. **Neither can** he. |\n| **not only...but also** 连接句子 | **Not only did** he come, but also he stayed. |\n| **虚拟条件句省略 if** | **Had** I known, I would have come. |\n\n### 1.3 so 引导倒装的三个区分\n\n| 结构 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **So + 助动词 + 主语** | \"……也一样\"（另一人） | I like tea. **So does** he. |\n| **So + 主语 + 助动词** | \"确实如此\"（同一人，表赞同） | — It's cold. — **So it is**. |\n| **So...that 倒装** | \"如此…以至于\" | **So tired was** he that he fell asleep. |\n\n---\n\n## 二、强调句 Emphasis\n\n**强调句突出句中的某一成分，结构为 `It is/was...that`。**\n\n### 2.1 基本结构\n\n```\nIt is/was + 被强调部分 + that/who + 其余部分\n```\n\n- I met Tom in the park yesterday.（原句）\n- **It was** I **that/who** met Tom in the park yesterday.（强调主语）\n- **It was** Tom **that** I met in the park yesterday.（强调宾语）\n- **It was** in the park **that** I met Tom yesterday.（强调地点状语）\n- **It was** yesterday **that** I met Tom in the park.（强调时间状语）\n\n### 2.2 规则要点\n\n| 要点 | 说明 | 例句 |\n|:-----|:-----|:-----|\n| 指人 | 用 that / who | It was Tom **that** I met. |\n| 指物 | 用 that（不用 which） | It was a book **that** I bought. |\n| 强调状语 | 只能用 **that** | It was in the park **that**...（✕ where） |\n| 被强调部分是原句成分 | 去掉 It is...that 后仍是完整句 | 验证技巧：去掉框架，句子成立 |\n\n> **验证技巧：** 去掉 `It is/was...that` 后如果仍是完整句子，就是强调句；否则是主语从句（见 名词性从句）。\n\n### 2.3 与主语从句的区分\n\n- **It was yesterday that** I met him.（强调句：去掉框架 → I met him yesterday. ✅）\n- **It is true that** he came.（主语从句：去掉框架 → true he came. ✕）\n\n### 2.4 强调谓语动词\n\n**强调谓语动词时用 `do / does / did + 动词原形`（不是 It is...that）：**\n\n- I **do** believe you.（我真的相信你）\n- He **does** work hard.（他确实很努力）\n- She **did** come yesterday.（她昨天确实来了）\n\n> **注意：** 强调谓语只能用 do/does/did 提前，且只用于**肯定句**的一般现在/过去时。\n\n---\n\n## 三、反义疑问句 Tag Questions ⭐\n\n**在陈述句后加一个简短问句，用来征求对方确认。核心规则：前肯后否、前否后肯。**\n\n### 3.1 基本结构\n\n```\n肯定陈述句 + 否定疑问？ → Yes/No 回答\n否定陈述句 + 肯定疑问？ → Yes/No 回答\n```\n\n- You like tea, **don't you**?\n- He isn't a student, **is he**?\n\n**疑问部分助动词的选择：** 与陈述句谓语保持**时态一致**，用 be / do / have / 情态动词。\n\n| 陈述句谓语 | 疑问部分 | 例句 |\n|:----------|:--------|:-----|\n| be 动词 | 用 be | She is a doctor, **isn't she**? |\n| 实义动词 | 用 do/does/did | They went home, **didn't they**? |\n| 助动词 have/has/had | 用 have/has/had | You have finished, **haven't you**? |\n| 情态动词 | 用情态动词 | He can swim, **can't he**? |\n| there be | 用 be there | There is a book, **isn't there**? |\n\n### 3.2 特殊情形 ⭐\n\n| 情形 | 疑问部分 | 例句 |\n|:-----|:--------|:-----|\n| 陈述句含否定词（never, hardly, seldom, little, few, nothing, nobody, neither） | **肯定**疑问（视为否定句） | He never smokes, **does he**? |\n| **I am...** | **aren't I**（无 amn't） | I am late, **aren't I**? |\n| **Let's...**（包括对方） | **shall we**? | Let's go, **shall we**? |\n| **Let us...**（不包括对方） | **will you**? | Let us go, **will you**? |\n| **祈使句**（请求/命令） | **will you**? | Open the door, **will you**? |\n| 肯定祈使（邀请） | **won't you**? | Come in, **won't you**? |\n| **must** 表\"必须\" | **mustn't**? | You must go now, **mustn't you**? |\n| **must** 表\"有必要\"（needn't） | **needn't**? | I must finish now, **needn't I**? |\n| **must be** 表推测\"一定\" | **isn't/aren't**?（按 be 变） | He must be tired, **isn't he**? |\n| **must have done** 表对过去推测 | **didn't / haven't**? | He must have left, **didn't he**? |\n\n### 3.3 反义疑问句的回答 ⭐\n\n**按事实回答：事实肯定用 yes，事实否定用 no。前否后肯时注意翻译。**\n\n- — You aren't a student, **are you**? — **No**, I'm not.（不，我不是。→ 事实否定用 No）\n- — You aren't a student, **are you**? — **Yes**, I am.（不，我是。→ 事实肯定用 Yes）\n\n> **翻译陷阱：** 前否后肯时，`Yes` 译\"不\"，`No` 译\"是\"。\n\n---\n\n## 四、祈使句 Imperative\n\n**表示请求、命令、建议、叮嘱，主语 you 通常省略，动词用原形。**\n\n### 4.1 基本结构\n\n| 类型 | 结构 | 例句 |\n|:-----|:-----|:-----|\n| **肯定祈使** | 动词原形开头 | **Open** the door, please. |\n| **否定祈使** | Don't / Never + 动词原形 | **Don't** be late. / **Never** give up. |\n| **强调祈使** | Do + 动词原形 | **Do** be careful! |\n| **礼貌祈使** | Please + 动词原形（或句尾） | **Please** sit down. / Sit down, **please**. |\n| **Let 祈使** | Let + 宾语 + 动词原形 | **Let** me help you. / **Let's** go. |\n\n### 4.2 Let's vs Let us\n\n| 结构 | 含义 | 反义疑问部分 |\n|:-----|:-----|:------------|\n| **Let's** | 咱们（包括听话人） | **shall we**? |\n| **Let us** | 让我们（不包括听话人，请求允许） | **will you**? |\n\n- **Let's** play football, **shall we**?\n- **Let us** leave now, **will you**?\n\n### 4.3 禁止类祈使\n\n| 结构 | 例句 |\n|:-----|:-----|\n| No + 名词/动名词 | **No smoking!** / **No parking!** |\n| No + 名词 | **No photos!** |\n\n### 4.4 祈使句的反义疑问\n\n| 类型 | 疑问部分 | 例句 |\n|:-----|:--------|:-----|\n| 请求/命令 | **will you**? | Close the window, **will you**? |\n| 邀请（肯定） | **won't you**? | Have a cup of tea, **won't you**? |\n| Let's | **shall we**? | Let's start, **shall we**? |\n| Let us | **will you**? | Let us try, **will you**? |\n\n---\n\n## 五、感叹句 Exclamatory\n\n**表示强烈的感情（惊喜、赞美、愤怒等），有 What 与 How 两种引导。**\n\n### 5.1 基本结构 ⭐\n\n| 引导 | 结构 | 例句 |\n|:-----|:-----|:-----|\n| **What** | What + (a/an) + 形容词 + 名词 + (主谓)! | **What** a clever boy he is! |\n| **What** | What + 形容词 + 不可数/复数名词 + (主谓)! | **What** fine weather it is! / **What** clever boys they are! |\n| **How** | How + 形容词/副词 + (主谓)! | **How** clever (he is)! / **How** fast he runs! |\n| **How** | How + 形容词 + a/an + 名词 + 主谓! | **How** clever a boy he is! |\n\n### 5.2 选择口诀\n\n> **看中心词：** 名词用 **What**，形容词/副词用 **How**。\n> What + (a/an) + 形容词 + **名词**；How + **形容词/副词**。\n\n| 中心词 | 结构 | 例句 |\n|:-------|:-----|:-----|\n| 名词（单数可数） | What a/an + adj. + n.! | What a beautiful girl! |\n| 名词（不可数/复数） | What + adj. + n.! | What good news! |\n| 形容词/副词 | How + adj./adv.! | How beautiful! |\n\n### 5.3 省略形式与改写\n\n**感叹句可省略主语和谓语：**\n\n- What a clever boy (he is)!\n- How beautiful (the flower is)!\n\n**感叹句 ↔ 强调句互换：**\n\n- **What** a clever boy he is! = **How** clever a boy he is!\n- What a lovely day! = How lovely the day is!\n\n### 5.4 易错点\n\n1. **单数可数名词前必须有 a/an：** What a nice day!（✕ What nice day!）\n2. **How 后不直接跟名词：** How clever boy! ✕ → What a clever boy!\n3. **不可数/复数名词前不加 a/an：** What good news!（✕ What a good news!）\n\n---\n\n## 六、省略句式 Ellipsis\n\n**为避免重复，在意义清楚的前提下省略句中某些成分。**\n\n### 6.1 常见的省略\n\n| 省略内容 | 例句 |\n|:--------|:-----|\n| 省略主语 | (You) Come in, please. |\n| 省略谓语/系动词 | (Are) You ready? / I'm taller than he (is). |\n| 省略宾语 | He asked me to help, and I did (help him). |\n| 不定式省略（保留 to） | — Would you like to go? — Yes, I'd like **to**. |\n| 宾语从句中 that | I know (that) he is right. |\n| 时间/条件/让步从句中 it is/主语+be | When (it is) heated, water becomes steam. |\n\n### 6.2 so / not 代替上文\n\n- — Do you think he will win? — I think **so** / I think **not**.\n- 替代动词：`so do I`, `so it is`（见倒装部分）。\n\n### 6.3 口语中的省略\n\n| 情形 | 例句 |\n|:-----|:-----|\n| 感叹/应答 | (I'm) Sorry! / (That's) All right. |\n| 疑问省略 | (Are you) Ready? / (Have you) Finished? |\n\n---\n\n## 相关笔记\n\n- 简单句与并列句 — 祈使句、感叹句的基础句型\n- 名词性从句 — 强调句与主语从句的区分\n- 虚拟语气 — 虚拟条件句省略 if 的倒装\n- 情态动词 — must 表推测时反义疑问句的变化\n",
    "keywords": [
      "特殊句式",
      "倒装",
      "强调",
      "反义疑问句",
      "祈使句",
      "感叹句",
      "省略",
      "表语或状语前置",
      "代词",
      "否定词开头",
      "Only + 状语",
      "虚拟条件句省略 if",
      "So...that 倒装",
      "肯定句",
      "时态一致",
      "肯定",
      "肯定祈使",
      "否定祈使",
      "强调祈使",
      "礼貌祈使",
      "Let 祈使",
      "名词",
      "形容词/副词"
    ]
  },
  {
    "key": "固定句型",
    "title": "固定句型",
    "dir": "句法",
    "summary": "固定句型是英语中**约定俗成的句式模板**——记住结构直接套用。它们散落在各章节（从句、非谓语、特殊句式……），本笔记将其**汇总为速查手册**。",
    "content": "# 固定句型 Fixed Sentence Patterns\n\n> **核心主线：** 固定句型是英语中**约定俗成的句式模板**——记住结构直接套用。它们散落在各章节（从句、非谓语、特殊句式……），本笔记将其**汇总为速查手册**。\n\n---\n\n## 一、It 开头的固定句型 ⭐\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **It takes/took sb. + 时间 + to do sth.** | 花某人时间做某事 | **It took** me two hours **to finish** the work. |\n| **It is + adj. + for sb. + to do sth.** | 对某人来说做…是…的 | **It is important for us to learn** English. |\n| **It is + adj. + of sb. + to do sth.** | 某人做…是…的（评价人品） | **It is kind of you to help** me. |\n| **It is + adj. + that 从句** | …是…的 | **It is necessary that** we (should) act at once. |\n| **It is said/reported/thought that...** | 据说/据报道/据认为 | **It is said that** he is very rich. |\n| **It is (high) time (that) sb. did/should do** | 该做…了 | **It's time we went** home. |\n| **It is no use/good doing sth.** | 做…没用/没好处 | **It is no use crying** over spilt milk. |\n| **It seems/appears that...** | 似乎… | **It seems that** he is tired. |\n| **It happens that...** | 碰巧… | **It happened that** I met him. |\n| **It was not until...that...** | 直到…才 | **It was not until** yesterday **that** I knew it. |\n\n> **for vs of：** `for sb.` 表\"对某人而言\"（客观评价，与人的品质无关）；`of sb.` 表\"某人做了…真…\"（评价人的品质，形容词常为 kind, nice, clever, silly）。\n\n---\n\n## 二、时间 / 条件类固定句型\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **not...until** | 直到…才（主句用瞬间动词） | He **didn't leave until** I came. |\n| **It was not until...that...** | 直到…才（强调结构） | It was not until dark **that** he came back. |\n| **as soon as** | 一…就 | **As soon as** I get home, I'll call you. |\n| **hardly...when / no sooner...than** | 一…就（主句用过去完成时 + 倒装） | **Hardly had** I got home **when** it rained. |\n| **each time / every time + 从句** | 每当 | **Every time** I see him, he is smiling. |\n| **主将从现** | 主句将来时，时间/条件从句用一般现在 | If it **rains** tomorrow, we **will stay** home. |\n\n---\n\n## 三、比较 / 程度类固定句型 ⭐\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **so + adj./adv. + that 从句** | 如此…以至于 | He is **so tired that** he can't walk. |\n| **such + (a/an) + n. + that 从句** | 如此…以至于 | It is **such a heavy box that** I can't carry it. |\n| **too + adj./adv. + to do** | 太…而不能 | The box is **too heavy to** carry. |\n| **adj./adv. + enough + to do** | 足够…可以 | He is **old enough to** go to school. |\n| **as + adj./adv. + as** | 和…一样 | She is **as tall as** her mother. |\n| **not as/so + adj./adv. + as** | 不如… | He is **not so tall as** I. |\n| **the + 比较级, the + 比较级** | 越…越… | **The more** you read, **the more** you learn. |\n| **比较级 + and + 比较级** | 越来越… | It's getting **colder and colder**. |\n| **as + adj./adv. + as possible** | 尽可能… | Come **as early as possible**. |\n\n> **注意：** `too...to` 与 `so...that`（否定）可互换：The box is too heavy to carry. = The box is so heavy that I can't carry it.\n\n---\n\n## 四、并列 / 选择类固定句型\n\n| 句型 | 谓语一致 | 例句 |\n|:-----|:--------|:-----|\n| **both...and...** | 复数 | **Both** Tom **and** Jim **are** students. |\n| **either...or...** | 就近 | **Either** you **or** he **is** wrong. |\n| **neither...nor...** | 就近 | **Neither** he **nor** I **am** right. |\n| **not only...but also...** | 就近 | **Not only** he **but also** I **am** a student. |\n| **not...but...** | 就近 | He is **not** a teacher **but** a student. |\n| **would rather do...than do...** | — | I **would rather stay than go**. |\n| **prefer to do...rather than do...** | — | I **prefer to walk rather than take** a bus. |\n| **prefer doing...to doing...** | — | I **prefer reading to watching** TV. |\n\n---\n\n## 五、动词类固定句型 ⭐\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **spend + 时间/金钱 + (in) doing sth.** | 花时间/钱做某事 | He **spent two hours (in) doing** homework. |\n| **spend + 金钱 + on sth.** | 花钱买… | She **spent 100 yuan on** the dress. |\n| **It takes sb. + 时间 + to do sth.** | 花某人时间做 | **It took** him three days **to finish** it. |\n| **make/have/let sb. do sth.** | 让某人做某事 | He **made me wait** for an hour. |\n| **get/have sth. done** | 使某事被做 | I'll **have my hair cut**. |\n| **used to do** | 过去常常做（现在不做了） | I **used to play** basketball. |\n| **be used to doing** | 习惯于做 | He **is used to getting** up early. |\n| **be used to do** | 被用来做（被动） | Wood **is used to make** paper. |\n| **be busy (in) doing** | 忙于做 | She **is busy preparing** for the exam. |\n| **have difficulty/trouble (in) doing** | 做…有困难 | I **have difficulty learning** English. |\n| **can't help doing** | 忍不住做 | I **can't help laughing**. |\n| **look forward to doing** | 期待做 | I **look forward to seeing** you. |\n| **be worth doing** | 值得做 | The film **is worth seeing**. |\n| **feel like doing** | 想要做 | I **feel like going** out. |\n| **keep/stop/prevent sb. from doing** | 阻止某人做 | Nothing can **stop me from going**. |\n\n> **to 后接 doing 的固定短语：** look forward to, be used to, pay attention to, devote...to, get down to, be/get accustomed to —— 这里的 to 是**介词**，后接动名词。\n\n---\n\n## 六、其他高频固定句型\n\n| 句型 | 含义 | 例句 |\n|:-----|:-----|:-----|\n| **There be + 名词 + 地点/时间** | 某地/某时有… | **There is** a book on the desk. |\n| **so + 助动词 + 主语** | …也一样 | I like tea. **So does** he. |\n| **neither/nor + 助动词 + 主语** | …也不 | I can't swim. **Neither can** he. |\n| **What/How + 感叹句** | 多么… | What a lovely day! / How lovely! |\n| **It's up to sb. to do sth.** | 由某人决定做… | **It's up to you to decide**. |\n| **by the time + 从句** | 到…为止 | **By the time** you come, I'll have finished. |\n| **the way + (in which) + 从句** | …的方式 | I like **the way (in which) he talks**. |\n| **so far** | 到目前为止（常配现在完成时） | **So far**, I have read three books. |\n| **in order to / so as to do** | 为了 | He got up early **in order to catch** the bus. |\n| **have been to vs have gone to** | 去过/去了（未回） | I have been to Beijing. / He has gone to Beijing. |\n\n---\n\n## 七、速查索引（按想表达的含义）\n\n| 想表达 | 用句型 |\n|:-------|:-------|\n| 花时间/金钱 | spend...doing / It takes sb. time to do |\n| 一…就 | as soon as / hardly...when / no sooner...than |\n| 直到…才 | not...until / It was not until...that |\n| 如此…以至于 | so...that / such...that |\n| 太…而不能 | too...to |\n| 越…越 | the + 比较级, the + 比较级 |\n| 让/使某人做 | make/have/let sb. do |\n| 习惯于 | be used to doing / be accustomed to doing |\n| 据说/据报道 | It is said/reported that... |\n| 值得做 | be worth doing |\n\n---\n\n## 相关笔记\n\n- 五大基本句型 — 固定句型的基础骨架\n- 状语从句 — so...that、as soon as、until 等句型来源\n- 非谓语动词 — 固定句型中 to do / doing 的选择\n- 主谓一致 — 并列固定句型的谓语一致\n- 特殊句式 — There be、感叹句、so do I 等句型\n",
    "keywords": [
      "固定句型",
      "句型",
      "约定俗成的句式模板",
      "汇总为速查手册",
      "主将从现",
      "介词"
    ]
  }
];

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
    var result = parts.join('\n\n');
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
