// 单词本应用主逻辑
class WordbookApp {
    constructor() {
        // 状态管理
        this.selectedWords = new Set();
        this.selectedSentences = []; // {startId, endId, colorIndex}
        this.sentenceColorIndex = 0;
        this.isDrawingSentence = false;
        this.sentenceDrawStartId = -1;
        this.sentenceDrawEndId = -1;
        this.wordbook = this.loadWordbook();
        this.sentencebook = this.loadSentences();
        this.articles = this.loadArticles();
        this.currentMemoryIndex = -1;
        this.isShowingMeaning = false;
        this.processedWords = [];

        // 复习页面状态
        this.reviewWords = [];
        this.currentReviewIndex = 0;
        this.reviewedCount = 0;

        // 长句复习页面状态
        this.sentenceReviewWords = [];
        this.sentenceReviewIndex = 0;
        this.sentenceReviewedCount = 0;

        // 滑动手势状态（灵感来自 reactbits.dev CardSwap）
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.swipeCurrentX = 0;
        this.swipeCurrentY = 0;
        this.isSwiping = false;
        this.swipeThreshold = 60; // 触发滑动的最小距离(px)
        
        // 新增：当前正在创建的文章
        this.currentCreatingArticle = null;

        // DOM 元素
        this.articleTitleInput = document.getElementById('article-title-input');
        this.articleInput = document.getElementById('article-input');
        this.processBtn = document.getElementById('process-btn');
        this.wordSelectionSection = document.getElementById('word-selection-section');
        this.backFromWordSelectionBtn = document.getElementById('back-from-word-selection');
        this.wordDisplay = document.getElementById('word-display');
        this.selectedCount = document.getElementById('selected-count');
        this.wordInput = document.getElementById('word-input');
        this.meaningInput = document.getElementById('meaning-input');
        this.addWordBtn = document.getElementById('add-word-btn');
        this.wordbookList = document.getElementById('wordbook-list');
        this.articlesList = document.getElementById('articles-list');
        this.addArticleBtn = document.getElementById('add-article-btn');
        this.articleInputSection = document.getElementById('article-input-section');
        this.wordInputSection = document.getElementById('word-input-section');
        this.backFromArticleInputBtn = document.getElementById('back-from-article-input');
        this.backFromWordInputBtn = document.getElementById('back-from-word-input');
        this.saveArticleBtn = document.getElementById('save-article-btn');
        this.saveWordBtn = document.getElementById('save-word-btn');
        this.finishAddingBtn = document.getElementById('finish-adding-btn');

        // 文章标题输入页面元素
        this.articleTitleSection = document.getElementById('article-title-section');
        this.articleTitleInputModal = document.getElementById('article-title-input-modal');
        this.backFromTitleInputBtn = document.getElementById('back-from-title-input');
        this.saveTitleBtn = document.getElementById('save-title-btn');
        
        // 文章添加相关DOM元素
        this.articleForm = document.getElementById('article-form');
        
        // 文章详情页面元素
        this.articleDetailSection = document.getElementById('article-detail-section');
        this.articleDetailTitle = document.getElementById('article-detail-title');
        this.articleOriginalContent = document.getElementById('article-original-content');
        this.wordFlashcard = document.getElementById('word-flashcard');
        this.flashcardWord = document.getElementById('flashcard-word');
        this.flashcardMeaning = document.getElementById('flashcard-meaning');
        this.prevWordBtn = document.getElementById('prev-word-btn');
        this.nextWordBtn = document.getElementById('next-word-btn');
        this.backToArticlesBtn = document.getElementById('back-to-articles');
        
        // 单词本添加按钮
        this.wordbookAddBtn = document.getElementById('wordbook-add-btn');

        // 复习页面元素
        this.reviewSection = document.getElementById('review-section');
        this.reviewFlashcard = document.getElementById('review-flashcard');
        this.reviewWord = document.getElementById('review-word');
        this.reviewMeaning = document.getElementById('review-meaning');
        this.reviewProgress = document.getElementById('review-progress');
        this.backFromReviewBtn = document.getElementById('back-from-review');
        this.reviewRatings = document.getElementById('review-ratings');
        this.reviewSentenceSection = document.getElementById('review-sentence-section');
        this.reviewSentenceOriginal = document.getElementById('review-sentence-original');
        this.reviewSentenceTranslation = document.getElementById('review-sentence-translation');

        // 长句相关元素
        this.sentenceSection = document.getElementById('sentence-section');
        this.sentenceList = document.getElementById('sentence-list');
        this.sentenceCount = document.getElementById('sentence-count');
        this.sentenceReviewBtn = document.getElementById('sentence-review-btn');
        this.sentenceDetailSection = document.getElementById('sentence-detail-section');
        this.sentenceDetailOriginal = document.getElementById('sentence-detail-original');
        this.sentenceDetailColored = document.getElementById('sentence-detail-colored');
        this.sentenceDetailBreakdown = document.getElementById('sentence-detail-breakdown');
        this.sentenceDetailTree = document.getElementById('sentence-detail-tree');
        this.sentenceDetailTranslation = document.getElementById('sentence-detail-translation');
        this.backFromSentenceDetailBtn = document.getElementById('back-from-sentence-detail');
        this.sentenceReviewSection = document.getElementById('sentence-review-section');
        this.sentenceReviewFlashcard = document.getElementById('sentence-review-flashcard');
        this.sentenceReviewText = document.getElementById('sentence-review-text');
        this.sentenceReviewTranslation = document.getElementById('sentence-review-translation');
        this.sentenceReviewProgress = document.getElementById('sentence-review-progress');
        this.backFromSentenceReviewBtn = document.getElementById('back-from-sentence-review');
        this.sentenceReviewRatings = document.getElementById('sentence-review-ratings');
        this.sentenceReviewAnalysis = document.getElementById('sentence-review-analysis');
        this.sentenceReviewColored = document.getElementById('sentence-review-colored');
        this.sentenceReviewBreakdown = document.getElementById('sentence-review-breakdown');
        this.sentenceReviewTree = document.getElementById('sentence-review-tree');

        // 单词详情页面元素
        this.wordDetailSection = document.getElementById('word-detail-section');
        this.wordDetailCard = document.getElementById('word-detail-card');
        this.wordDetailWord = document.getElementById('word-detail-word');
        this.wordDetailMeaning = document.getElementById('word-detail-meaning');
        this.wordDetailSentenceSection = document.getElementById('word-detail-sentence-section');
        this.wordDetailSentence = document.getElementById('word-detail-sentence');
        this.wordDetailSentenceTranslation = document.getElementById('word-detail-sentence-translation');
        this.backFromWordDetailBtn = document.getElementById('back-from-word-detail');

        // API配置相关DOM元素
        this.apiKeyInput = document.getElementById('apikey-input');
        this.saveApiBtn = document.getElementById('save-api-btn');
        this.clearApiBtn = document.getElementById('clear-api-btn');
        this.apiStatus = document.getElementById('api-status');
        
        // 文章详情状态
        this.currentArticle = null;
        this.currentWordIndex = 0;
        this.shuffledWords = [];

        this.init();
    }

    init() {
        this.loadApiConfig();
        this.bindEvents();
        this.renderArticles();
        this.renderWordbook();
        this.renderSentences();
        this.updateSelectedCount();
        this.setupNavigation();
        this.setupPopStateListener();
        // 设置初始历史状态，否则二级页面返回时 event.state 为 null 会导致直接退出
        history.replaceState({ page: 'articles' }, '', '');
    }
    
    // 设置popstate事件监听器，处理返回键导航
    setupPopStateListener() {
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                // 清除二级页面状态
                this.currentArticle = null;
                this.currentWordIndex = 0;
                this.shuffledWords = [];
                this.reviewWords = [];
                this.sentenceReviewWords = [];

                // 隐藏所有二级页面
                this.reviewSection.classList.add('hidden');
                this.sentenceReviewSection.classList.add('hidden');
                this.sentenceDetailSection.classList.add('hidden');
                this.articleDetailSection.classList.add('hidden');
                this.wordDetailSection.classList.add('hidden');
                this.wordInputSection.classList.add('hidden');
                this.articleInputSection.classList.add('hidden');
                this.articleTitleSection.classList.add('hidden');
                this.wordSelectionSection.classList.add('hidden');

                // 恢复历史状态中保存的页面
                this.showPage(event.state.page);
            }
            // event.state 为 null 时不做处理，让 Android 系统处理返回（退出应用）
        });
    }

    // 显示指定页面，不添加历史记录（供 popstate 回调使用）
    showPage(page) {
        var sectionMap = {
            'articles': 'articles-section',
            'words': 'wordbook-section',
            'sentences': 'sentence-section',
            'settings': 'settings-section'
        };

        document.querySelectorAll('.section').forEach(function(s) { s.classList.add('hidden'); });
        document.querySelector('.footer').classList.remove('hidden');

        var sectionId = sectionMap[page];
        if (sectionId) {
            document.getElementById(sectionId).classList.remove('hidden');
        }

        // 更新底部导航高亮
        var navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            if (item.dataset.page === page) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 绑定事件
    bindEvents() {
        // API配置按钮
        this.saveApiBtn.addEventListener('click', () => this.saveApiConfig());
        this.clearApiBtn.addEventListener('click', () => this.clearApiConfig());
        
        // 文章相关按钮
        this.addArticleBtn.addEventListener('click', () => this.openArticleModal());
        this.backFromArticleInputBtn.addEventListener('click', () => this.closeArticleModal());
        this.processBtn.addEventListener('click', () => this.processArticle());
        this.saveArticleBtn.addEventListener('click', () => this.saveArticle());
        this.backFromWordSelectionBtn.addEventListener('click', () => this.backFromWordSelection());
        
        // 结束添加按钮事件
        this.finishAddingBtn.addEventListener('click', () => this.finishAddingWords());
        
        // 文章标题输入页面事件
        this.backFromTitleInputBtn.addEventListener('click', () => this.closeArticleTitleModal());
        this.saveTitleBtn.addEventListener('click', () => this.saveArticleTitle());

        // 单词相关按钮
        if (this.addWordBtn) {
            this.addWordBtn.addEventListener('click', () => this.openWordModal());
        }
        if (this.wordbookAddBtn) {
            this.wordbookAddBtn.addEventListener('click', () => this.startReview());
        }
        this.backFromWordInputBtn.addEventListener('click', () => this.closeWordModal());
        this.saveWordBtn.addEventListener('click', () => this.saveWord());

        // 单词输入框回车事件（自动翻译）
        this.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.translateAndFill();
            }
        });

        // 释义输入框回车事件
        this.meaningInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.saveWord();
            }
        });

        // 文章详情页面事件
        this.backToArticlesBtn.addEventListener('click', () => this.backToArticles());
        this.wordFlashcard.addEventListener('click', () => this.toggleFlashcard());
        this.prevWordBtn.addEventListener('click', () => this.prevWord());
        this.nextWordBtn.addEventListener('click', () => this.nextWord());

        // 复习页面事件
        this.backFromReviewBtn.addEventListener('click', () => this.backFromReview());
        this.reviewFlashcard.addEventListener('click', () => this.toggleReviewFlashcard());

        // 复习卡片滑动手势 — 向左滑=下一个，向右滑=上一个（灵感来自 reactbits.dev CardSwap）
        this.setupReviewSwipe();

        // 评分按钮事件
        this.reviewRatings.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();  // 防止冒泡触发卡片翻转
                const rating = parseInt(btn.dataset.rating);
                this.rateCard(rating);
            });
        });

        // 长句相关事件
        this.sentenceReviewBtn.addEventListener('click', () => this.startSentenceReview());
        this.backFromSentenceDetailBtn.addEventListener('click', () => this.closeSentenceDetail());
        this.backFromSentenceReviewBtn.addEventListener('click', () => this.backFromSentenceReview());
        this.sentenceReviewFlashcard.addEventListener('click', () => this.toggleSentenceReviewFlashcard());

        // 单词详情返回按钮
        this.backFromWordDetailBtn.addEventListener('click', () => this.closeWordDetail());
        this.sentenceReviewRatings.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rating = parseInt(btn.dataset.rating);
                this.rateSentenceCard(rating);
            });
        });

        // 长句复习滑动手势
        this.setupSentenceReviewSwipe();

    }

    // 设置底部导航
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.switchPage(page);
            });
        });
    }

    // 打开文章输入页面
    openArticleModal() {
        // 重置表单状态
        this.resetArticleModal();
        // 隐藏所有section和footer
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        // 显示文章输入页面
        this.articleInputSection.classList.remove('hidden');
    }

    // 关闭文章输入页面（返回文章列表）
    closeArticleModal() {
        this.articleInputSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        this.showPage('articles');
    }

    // 重置文章输入表单
    resetArticleModal() {
        this.articleTitleInput.value = '';
        this.articleInput.value = '';
        this.selectedWords.clear();
        this.updateSelectedCount();
    }

    // 打开单词输入页面
    openWordModal() {
        this.wordInput.value = '';
        this.meaningInput.value = '';
        // 隐藏所有section和footer
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        // 显示单词输入页面
        this.wordInputSection.classList.remove('hidden');
    }

    // 关闭单词输入页面（返回文章列表）
    closeWordModal() {
        this.wordInputSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        this.showPage('articles');
    }

    // 打开添加文章选项模态框
    // 结束添加单词，生成新的文章或更新现有文章
    finishAddingWords() {
        // 检查是否正在创建文章
        if (this.currentCreatingArticle) {
            // 检查是否添加了单词
            if (this.currentCreatingArticle.words.length > 0) {
                // 检查是否是更新现有文章
                const existingIndex = this.articles.findIndex(article => article.id === this.currentCreatingArticle.id);
                
                if (existingIndex !== -1) {
                    // 更新现有文章
                    this.articles[existingIndex] = this.currentCreatingArticle;
                    this.saveArticles();
                    
                    // 如果当前正在查看该文章，更新currentArticle
                    if (this.currentArticle && this.currentArticle.id === this.currentCreatingArticle.id) {
                        this.currentArticle = this.currentCreatingArticle;
                        // 重新渲染单词卡片
                        this.renderArticleDetail();
                    }
                    
                    // 重新渲染articles列表
                    this.renderArticles();
                    
                    // 显示成功提示
                    alert(`成功更新文章 "${this.currentCreatingArticle.title}"，现在包含 ${this.currentCreatingArticle.words.length} 个单词！`);
                } else {
                    // 创建新文章
                    this.articles.push(this.currentCreatingArticle);
                    this.saveArticles();
                    
                    // 重新渲染articles列表
                    this.renderArticles();
                    
                    // 显示成功提示
                    alert(`成功创建文章 "${this.currentCreatingArticle.title}"，包含 ${this.currentCreatingArticle.words.length} 个单词！`);
                }
            } else {
                // 没有添加单词，显示提示
                alert('请至少添加一个单词到文章中');
                return;
            }
        }
        
        // 重置currentCreatingArticle状态
        this.currentCreatingArticle = null;
        
        // 关闭单词模态框
        this.closeWordModal();
    }

    // 打开文章标题输入页面
    openArticleTitleModal() {
        this.articleTitleInputModal.value = '';
        // 隐藏所有section和footer
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        // 显示文章标题输入页面
        this.articleTitleSection.classList.remove('hidden');
    }

    // 关闭文章标题输入页面（返回文章列表）
    closeArticleTitleModal() {
        this.articleTitleSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        this.showPage('articles');
    }

    // 保存文章标题
    saveArticleTitle() {
        const title = this.articleTitleInputModal.value.trim();
        
        if (!title) {
            alert('请输入文章标题');
            return;
        }
        
        // 初始化新的文章创建过程
        this.currentCreatingArticle = {
            id: Date.now().toString(),
            title: title,
            content: '',
            words: [],
            addedAt: new Date().toISOString(),
            type: 'word' // 标记为单词添加的文章
        };
        
        this.closeArticleTitleModal();
        this.openWordModal();
    }

    // 处理文章
    processArticle() {
        const article = this.articleInput.value.trim();
        if (!article) {
            alert('请输入文章内容');
            return;
        }

        // 分割文章为单词
        this.processedWords = this.splitIntoWords(article);

        // 渲染单词
        this.renderWords();

        // 清空已选单词和长句
        this.selectedWords.clear();
        this.selectedSentences = [];
        this.sentenceColorIndex = 0;
        this.updateSelectedCount();

        // 跳转到单词选择页面
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        this.wordSelectionSection.classList.remove('hidden');
    }

    // 从单词选择页面返回文章列表
    backFromWordSelection() {
        this.wordSelectionSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        this.showPage('articles');
    }

    // 将文章分割为单词
    splitIntoWords(text) {
        // 使用正则表达式分割，保留单词和标点符号
        const tokens = text.match(/[a-zA-Z]+|[^a-zA-Z\s]+|\s+/g) || [];
        
        return tokens.map((token, index) => ({
            id: index,
            text: token,
            isWord: /^[a-zA-Z]+$/.test(token)
        }));
    }

    // 渲染单词（支持点按选单词 + 长按拖选句子）
    renderWords() {
        var self = this;
        this.wordDisplay.innerHTML = '';

        this.processedWords.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.text;
            span.dataset.id = item.id;
            if (item.isWord) {
                span.className = 'word';
                span.dataset.word = item.text.toLowerCase();
                if (this.selectedWords.has(item.text.toLowerCase())) {
                    span.classList.add('selected');
                }
            } else {
                span.className = 'token';
            }

            // 短按（<500ms）选单词
            var pressTimer;
            var pressStartTime;
            var touchJustEnded = false;  // 防止移动端 touch → 合成 mouse 事件导致双击发

            span.addEventListener('mousedown', function(e) {
                if (touchJustEnded) return;
                pressStartTime = Date.now();
                pressTimer = setTimeout(function() {
                    // 长按触发 → 开始划线
                    self.startSentenceDraw(parseInt(span.dataset.id));
                }, 500);
            });

            span.addEventListener('mouseup', function(e) {
                if (touchJustEnded) return;
                clearTimeout(pressTimer);
                if (self.isDrawingSentence) {
                    self.endSentenceDraw();
                } else if (Date.now() - pressStartTime < 500) {
                    // 短按 → 选单词
                    self.toggleWordSelection(span, item.text);
                }
            });

            span.addEventListener('mouseleave', function() {
                clearTimeout(pressTimer);
            });

            // 触摸事件
            span.addEventListener('touchstart', function(e) {
                touchJustEnded = false;
                pressStartTime = Date.now();
                pressTimer = setTimeout(function() {
                    self.startSentenceDraw(parseInt(span.dataset.id));
                }, 500);
            }, { passive: true });

            span.addEventListener('touchend', function(e) {
                clearTimeout(pressTimer);
                touchJustEnded = true;
                setTimeout(function() { touchJustEnded = false; }, 500);
                if (self.isDrawingSentence) {
                    self.endSentenceDraw();
                } else if (Date.now() - pressStartTime < 500) {
                    self.toggleWordSelection(span, item.text);
                }
            });

            span.addEventListener('touchcancel', function() {
                clearTimeout(pressTimer);
                touchJustEnded = true;
                setTimeout(function() { touchJustEnded = false; }, 500);
            });

            this.wordDisplay.appendChild(span);
        });

        // 全局移动事件 — 划线时跟踪手指/鼠标
        this.wordDisplay.onmousemove = function(e) {
            if (self.isDrawingSentence) {
                self.updateSentenceDraw(e);
            }
        };
        this.wordDisplay.ontouchmove = function(e) {
            if (self.isDrawingSentence) {
                self.updateSentenceDraw(e.touches[0]);
                e.preventDefault();
            }
        };

        // 全局松开事件 — 划线时在 wordDisplay 区域外松手也能正常结束
        if (!this._globalDrawEndHandlersSet) {
            this._globalDrawEndHandlersSet = true;
            document.addEventListener('mouseup', function(e) {
                if (self.isDrawingSentence) self.endSentenceDraw();
            });
            document.addEventListener('touchend', function(e) {
                if (self.isDrawingSentence) self.endSentenceDraw();
            });
        }

        // 恢复已保存的长句颜色
        this.renderSentenceUnderlines();
    }

    // 切换单词选中状态
    toggleWordSelection(element, word) {
        const lowerWord = word.toLowerCase();

        if (this.selectedWords.has(lowerWord)) {
            this.selectedWords.delete(lowerWord);
        } else {
            this.selectedWords.add(lowerWord);
        }

        // 联动文章中所有同词 span 的高亮状态
        var self = this;
        var allSpans = this.wordDisplay.querySelectorAll('[data-word="' + lowerWord + '"]');
        allSpans.forEach(function(span) {
            if (self.selectedWords.has(lowerWord)) {
                span.classList.add('selected');
            } else {
                span.classList.remove('selected');
            }
        });

        this.updateSelectedCount();
    }

    // 更新选中计数
    updateSelectedCount() {
        this.selectedCount.textContent = this.selectedWords.size;
    }

    // 保存文章和单词
    async saveArticle() {
        const title = this.articleTitleInput.value.trim();
        const content = this.articleInput.value.trim();
        
        if (!title) {
            alert('请输入文章标题');
            return;
        }
        
        if (!content) {
            alert('请输入文章内容');
            return;
        }

        const wordsToAdd = Array.from(this.selectedWords);
        
        if (wordsToAdd.length === 0) {
            alert('请选择要添加的单词');
            return;
        }

        // 显示加载提示
        this.saveArticleBtn.textContent = '正在保存...';
        this.saveArticleBtn.disabled = true;

        try {
            // 尝试新方法：一次调用完成单词翻译+句子定位+句子翻译
            let translations;
            try {
                translations = await translator.translateWordsWithSentences(
                    this.articleInput.value, wordsToAdd
                );
            } catch (error) {
                console.warn('句子提取翻译失败，回退到仅翻译单词:', error.message);
                translations = await translator.translateBatch(wordsToAdd);
                translations = translations.map(t => ({ ...t, sentence: '', sentenceTranslation: '' }));
            }

            // 添加到单词本
            translations.forEach(({ word, meaning, sentence, sentenceTranslation }) => {
                this.addWordToWordbook(word, meaning, sentence, sentenceTranslation);
            });

            // 处理选中的长句
            let sentenceCount = 0;
            if (this.selectedSentences.length > 0) {
                for (const sent of this.selectedSentences) {
                    try {
                        const sentenceText = this.processedWords
                            .slice(sent.startId, sent.endId + 1)
                            .map(t => t.text)
                            .join('');
                        const analysis = await translator.analyzeSentence(sentenceText);
                        const entry = {
                            id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5),
                            sentence: sentenceText,
                            translation: analysis.translation,
                            segments: analysis.segments,
                            breakdown: analysis.breakdown,
                            source: title,
                            addedAt: new Date().toISOString()
                        };
                        FSRS.initCard(entry);
                        this.sentencebook.push(entry);
                        sentenceCount++;
                    } catch (err) {
                        console.warn('句子分析失败:', sentenceText.substring(0, 50), err.message);
                    }
                }
                if (sentenceCount > 0) {
                    this.saveSentences();
                    this.renderSentences();
                }
            }

            // 保存文章
            const article = {
                id: Date.now().toString(),
                title: title,
                content: content,
                words: wordsToAdd,
                addedAt: new Date().toISOString(),
                type: 'article'
            };

            this.articles.push(article);
            this.saveArticles();

            // 关闭页面，返回文章列表
            this.wordSelectionSection.classList.add('hidden');
            this.articleInputSection.classList.add('hidden');
            document.querySelector('.footer').classList.remove('hidden');
            this.showPage('articles');

            this.renderArticles();
            this.renderWordbook();

            var msg = `成功保存文章和 ${translations.length} 个单词`;
            if (sentenceCount > 0) {
                msg += `，${sentenceCount} 条长句`;
            }
            alert(msg + '！');
        } catch (error) {
            console.error('保存失败:', error);
            alert('保存失败，请重试');
        } finally {
            this.saveArticleBtn.textContent = '保存';
            this.saveArticleBtn.disabled = false;
        }
    }

    // 保存单词
    async saveWord() {
        const word = this.wordInput.value.trim();
        const meaning = this.meaningInput.value.trim();

        if (!word) {
            alert('请输入单词');
            return;
        }

        if (!meaning) {
            // 尝试自动翻译
            try {
                const result = await translator.translate(word);
                this.meaningInput.value = result.meaning;
                this.meaningInput.focus();
                return;
            } catch (error) {
                alert('请输入释义');
                return;
            }
        }

        this.addWordToWordbook(word, meaning);
        
        // 如果正在创建文章，将单词添加到文章中
        if (this.currentCreatingArticle) {
            // 将单词添加到文章中
            this.currentCreatingArticle.words.push(word);
            
            // 清空输入框，方便继续添加单词
            this.wordInput.value = '';
            this.meaningInput.value = '';
            this.wordInput.focus();
        } else {
            // 关闭模态框
            this.closeWordModal();
        }
        
        // 重新渲染
        this.renderWordbook();
    }

    // 翻译并填充释义
    async translateAndFill() {
        const word = this.wordInput.value.trim();
        if (!word) return;

        this.meaningInput.placeholder = '正在翻译...';
        
        try {
            const result = await translator.translate(word);
            this.meaningInput.value = result.meaning;
            this.meaningInput.focus();
        } catch (error) {
            console.error('翻译失败:', error);
            this.meaningInput.placeholder = '翻译失败，请手动输入';
        }
    }

    // 添加单词到单词本
    addWordToWordbook(word, meaning, sentence, sentenceTranslation) {
        const lowerWord = word.toLowerCase();

        // 检查是否已存在
        const existingIndex = this.wordbook.findIndex(item => item.word.toLowerCase() === lowerWord);

        if (existingIndex !== -1) {
            // 更新现有单词
            this.wordbook[existingIndex].meaning = meaning;
            if (sentence) {
                this.wordbook[existingIndex].sentence = sentence;
            }
            if (sentenceTranslation) {
                this.wordbook[existingIndex].sentenceTranslation = sentenceTranslation;
            }
        } else {
            // 添加新单词
            const entry = {
                word: word,
                meaning: meaning,
                addedAt: new Date().toISOString(),
                mastery: 0 // 掌握程度：0-100
            };
            if (sentence) {
                entry.sentence = sentence;
            }
            if (sentenceTranslation) {
                entry.sentenceTranslation = sentenceTranslation;
            }
            this.wordbook.push(entry);
        }

        this.saveWordbook();
    }

    // 从单词本删除单词
    deleteWord(word) {
        // 显示自定义确认对话框
        this.showCustomConfirm(
            '删除单词',
            `确定要删除单词 "${word}" 吗？此操作无法撤销。`,
            () => {
                // 确认删除
                const lowerWord = word.toLowerCase();
                this.wordbook = this.wordbook.filter(item => item.word.toLowerCase() !== lowerWord);
                this.saveWordbook();
                this.renderWordbook();
            }
        );
    }

    // 渲染文章列表
    renderArticles() {
        if (this.articles.length === 0) {
            this.articlesList.innerHTML = '<div class="empty-state">还没有文章，请添加文章</div>';
            return;
        }

        this.articlesList.innerHTML = '';
        
        this.articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            articleCard.dataset.articleId = article.id;

            const excerpt = article.content.substring(0, 100) + (article.content.length > 100 ? '...' : '');

            // 统计该文章的长句数量
            const sentenceCount = this.sentencebook.filter(
                s => s.source === article.title
            ).length;

            articleCard.innerHTML = `
                <div class="article-card-header">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-stats">
                        <span class="article-words">${article.words.length} 个单词</span>
                        ${sentenceCount > 0 ? `<span class="article-sentences">${sentenceCount} 个长句</span>` : ''}
                        <span class="article-date">${new Date(article.addedAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <p class="article-excerpt">${excerpt}</p>
            `;
            
            // 添加点击事件
            articleCard.addEventListener('click', () => this.openArticleDetail(article));
            
            // 添加长按事件（删除文章）
            let longPressTimer;
            articleCard.addEventListener('mousedown', (e) => {
                // 添加长按动画类
                articleCard.classList.add('long-press');
                longPressTimer = setTimeout(() => {
                    this.deleteArticle(article.id);
                }, 500); // 500ms长按触发
            });
            
            articleCard.addEventListener('mouseup', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    articleCard.classList.remove('long-press');
                }, 100);
            });
            
            articleCard.addEventListener('mouseleave', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    articleCard.classList.remove('long-press');
                }, 100);
            });
            
            // 触摸设备的长按事件
            articleCard.addEventListener('touchstart', (e) => {
                // 添加长按动画类
                articleCard.classList.add('long-press');
                longPressTimer = setTimeout(() => {
                    this.deleteArticle(article.id);
                }, 500);
            });
            
            articleCard.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    articleCard.classList.remove('long-press');
                }, 100);
            });
            
            articleCard.addEventListener('touchcancel', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    articleCard.classList.remove('long-press');
                }, 100);
            });
            
            this.articlesList.appendChild(articleCard);
        });
    }

    // 删除文章
    deleteArticle(articleId) {
        // 显示自定义确认对话框
        this.showCustomConfirm(
            '删除文章',
            '确定要删除这篇文章吗？此操作无法撤销。',
            () => {
                // 确认删除
                this.articles = this.articles.filter(article => article.id !== articleId);
                this.saveArticles();
                this.renderArticles();
            }
        );
    }

    // 显示自定义确认对话框
    showCustomConfirm(title, message, onConfirm) {
        // 创建确认对话框元素
        const confirmElement = document.createElement('div');
        confirmElement.className = 'custom-confirm';
        confirmElement.innerHTML = `
            <div class="custom-confirm-content">
                <h3 class="custom-confirm-title">${title}</h3>
                <p class="custom-confirm-message">${message}</p>
                <div class="custom-confirm-actions">
                    <button class="custom-confirm-btn cancel">取消</button>
                    <button class="custom-confirm-btn confirm">确认</button>
                </div>
            </div>
        `;
        
        // 添加到文档
        document.body.appendChild(confirmElement);
        
        // 绑定事件
        const cancelBtn = confirmElement.querySelector('.cancel');
        const confirmBtn = confirmElement.querySelector('.confirm');
        
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(confirmElement);
        });
        
        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(confirmElement);
            if (onConfirm) {
                onConfirm();
            }
        });
        
        // 点击背景关闭
        confirmElement.addEventListener('click', (e) => {
            if (e.target === confirmElement) {
                document.body.removeChild(confirmElement);
            }
        });
        
        // 按ESC键关闭
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(confirmElement)) {
                    document.body.removeChild(confirmElement);
                }
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // 渲染单词本列表
    renderWordbook() {
        // 更新单词本计数
        const wordbookCount = document.getElementById('wordbook-count');
        if (wordbookCount) {
            wordbookCount.textContent = `共有${this.wordbook.length}张卡片`;
        }

        if (this.wordbook.length === 0) {
            this.wordbookList.innerHTML = '<div class="empty-state" style="padding: 40px 20px; text-align: center;">单词本为空，请添加单词</div>';
            return;
        }

        this.wordbookList.innerHTML = '';
        
        // 按照首字母排序
        const sortedWordbook = [...this.wordbook].sort((a, b) => 
            a.word.toLowerCase().localeCompare(b.word.toLowerCase())
        );
        
        sortedWordbook.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'wordbook-list-item';
            
            listItem.innerHTML = `
                <div class="word">${item.word}</div>
                <div class="meaning">${item.meaning}</div>
            `;
            
            // 添加点击事件，可用于编辑或查看详情
            listItem.addEventListener('click', () => this.openWordDetail(item.word));
            
            // 添加长按事件（删除单词）
            let longPressTimer;
            listItem.addEventListener('mousedown', (e) => {
                // 添加长按动画类
                listItem.classList.add('long-press');
                longPressTimer = setTimeout(() => {
                    this.deleteWord(item.word);
                }, 500); // 500ms长按触发
            });
            
            listItem.addEventListener('mouseup', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    listItem.classList.remove('long-press');
                }, 100);
            });
            
            listItem.addEventListener('mouseleave', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    listItem.classList.remove('long-press');
                }, 100);
            });
            
            // 触摸设备的长按事件
            listItem.addEventListener('touchstart', (e) => {
                // 添加长按动画类
                listItem.classList.add('long-press');
                longPressTimer = setTimeout(() => {
                    this.deleteWord(item.word);
                }, 500);
            });
            
            listItem.addEventListener('touchend', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    listItem.classList.remove('long-press');
                }, 100);
            });
            
            listItem.addEventListener('touchcancel', () => {
                clearTimeout(longPressTimer);
                // 移除长按动画类
                setTimeout(() => {
                    listItem.classList.remove('long-press');
                }, 100);
            });
            
            this.wordbookList.appendChild(listItem);
        });
    }

    // 打开单词详情页
    openWordDetail(word) {
        var wordInfo = this.wordbook.find(function(item) {
            return item.word.toLowerCase() === word.toLowerCase();
        });
        if (!wordInfo) return;

        this.wordDetailWord.textContent = wordInfo.word;
        this.wordDetailMeaning.textContent = wordInfo.meaning;

        // 例句
        if (wordInfo.sentence) {
            this.wordDetailSentence.innerHTML = this.renderHighlightedText(wordInfo.sentence);
            this.wordDetailSentenceTranslation.innerHTML = this.renderHighlightedText(
                wordInfo.sentenceTranslation || ''
            );
            this.wordDetailSentenceSection.classList.remove('hidden');
        } else {
            this.wordDetailSentenceSection.classList.add('hidden');
        }

        // 显示详情页
        document.querySelectorAll('.section').forEach(function(s) { s.classList.add('hidden'); });
        document.querySelector('.footer').classList.add('hidden');
        this.wordDetailSection.classList.remove('hidden');
        history.pushState({ page: 'word-detail' }, '', '');
    }

    // 关闭单词详情页
    closeWordDetail() {
        this.wordDetailSection.classList.add('hidden');
        history.back();
    }

    // 编辑单词（保留，供其他场景使用）
    editWord(word) {
        const existingWord = this.wordbook.find(item => item.word === word);
        if (existingWord) {
            this.wordInput.value = existingWord.word;
            this.meaningInput.value = existingWord.meaning;
            this.openWordModal();
        }
    }



    // 从本地存储加载单词本
    loadWordbook() {
        try {
            const saved = localStorage.getItem('wordbook');
            const wordbook = saved ? JSON.parse(saved) : [];
            // 向后兼容：为旧卡片初始化 FSRS 字段
            wordbook.forEach(card => FSRS.initCard(card));
            return wordbook;
        } catch (error) {
            console.error('加载单词本失败:', error);
            return [];
        }
    }

    // 保存单词本到本地存储
    saveWordbook() {
        try {
            localStorage.setItem('wordbook', JSON.stringify(this.wordbook));
        } catch (error) {
            console.error('保存单词本失败:', error);
        }
    }

    // 从本地存储加载文章
    loadArticles() {
        try {
            const saved = localStorage.getItem('articles');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('加载文章失败:', error);
            return [];
        }
    }

    // 保存文章到本地存储
    saveArticles() {
        try {
            localStorage.setItem('articles', JSON.stringify(this.articles));
        } catch (error) {
            console.error('保存文章失败:', error);
        }
    }

    // 加载长句本
    loadSentences() {
        try {
            const saved = localStorage.getItem('sentencebook');
            const sentencebook = saved ? JSON.parse(saved) : [];
            sentencebook.forEach(item => FSRS.initCard(item));
            return sentencebook;
        } catch (error) {
            console.error('加载长句本失败:', error);
            return [];
        }
    }

    // 保存长句本
    saveSentences() {
        try {
            localStorage.setItem('sentencebook', JSON.stringify(this.sentencebook));
        } catch (error) {
            console.error('保存长句本失败:', error);
        }
    }

    // 加载API配置
    loadApiConfig() {
        const apiKey = localStorage.getItem('deepseekApiKey') || '';

        if (apiKey) {
            this.apiKeyInput.value = apiKey;
        }

        if (apiKey) {
            this.updateApiStatus('success', '✓ DeepSeek API已配置，可以使用AI智能翻译功能');
        } else {
            this.updateApiStatus('info', 'ℹ 请配置DeepSeek API密钥以使用翻译功能');
        }
    }

    // 保存API配置
    async saveApiConfig() {
        const apiKey = this.apiKeyInput.value.trim();

        if (!apiKey) {
            this.updateApiStatus('error', '✗ 请输入API Key');
            this.apiKeyInput.focus();
            return;
        }

        // 显示保存中状态
        this.saveApiBtn.disabled = true;
        this.saveApiBtn.innerHTML = `
            <svg class="loading-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            保存中...
        `;

        try {
            // 验证API配置是否有效
            const isValid = await this.validateApiConfig(apiKey);

            // 无论验证结果如何，都保存配置
            localStorage.setItem('deepseekApiKey', apiKey);
            this.updateApiStatus('success', '✓ API密钥保存成功！');

            // 通知translator模块更新配置
            if (window.translator) {
                window.translator.loadConfig();
            }
        } catch (error) {
            console.error('保存API配置失败:', error);
            // 即使发生错误，也保存配置
            localStorage.setItem('deepseekApiKey', apiKey);
            this.updateApiStatus('success', '✓ API密钥保存成功！');

            // 通知translator模块更新配置
            if (window.translator) {
                window.translator.loadConfig();
            }
        } finally {
            // 恢复按钮状态
            this.saveApiBtn.disabled = false;
            this.saveApiBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="17 21 17 13 7 13 7 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="7 3 7 8 15 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                保存配置
            `;
        }
    }

    // 验证API配置
    async validateApiConfig(apiKey) {
        try {
            console.log('验证DeepSeek API密钥...');

            const response = await fetch('https://api.deepseek.com/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'user', content: 'hi' }
                    ],
                    max_tokens: 5
                })
            });

            console.log('DeepSeek验证响应状态:', response.status);

            if (response.ok) {
                console.log('API验证成功');
                return true;
            }

            const errorData = await response.json().catch(() => ({}));
            if (response.status === 401) {
                throw new Error('API密钥无效，请检查后重试');
            }
            throw new Error(`API验证失败: HTTP ${response.status}`);
        } catch (error) {
            console.error('API验证失败:', error);
            // 允许保存配置，即使验证失败
            console.log('验证失败但允许保存配置');
            return true;
        }
    }

    // 清除API配置
    clearApiConfig() {
        if (!confirm('确定要清除DeepSeek API配置吗？清除后将无法使用自动翻译功能。')) {
            return;
        }

        try {
            localStorage.removeItem('deepseekApiKey');

            this.apiKeyInput.value = '';

            this.updateApiStatus('info', 'ℹ API配置已清除，请重新配置以使用翻译功能');

            // 通知translator模块清除配置
            if (window.translator) {
                window.translator.loadConfig();
            }
        } catch (error) {
            console.error('清除API配置失败:', error);
            this.updateApiStatus('error', '✗ 清除失败，请重试');
        }
    }

    // 更新API状态显示
    updateApiStatus(type, message) {
        this.apiStatus.textContent = message;
        this.apiStatus.className = 'api-status ' + type;
        
        // 根据状态类型添加动画效果
        this.apiStatus.style.animation = 'none';
        this.apiStatus.offsetHeight; // 触发重绘
        this.apiStatus.style.animation = type === 'success' ? 'statusSuccess 0.5s ease-out' : 
                                       type === 'error' ? 'statusError 0.5s ease-out' : 
                                       'statusInfo 0.5s ease-out';
    }

    // 打开文章详情页面
    openArticleDetail(article) {
        this.currentArticle = article;
        this.currentWordIndex = 0;

        // 使用Fisher-Yates洗牌算法完全随机打乱单词顺序
        this.shuffledWords = [...article.words];
        for (let i = this.shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledWords[i], this.shuffledWords[j]] = [this.shuffledWords[j], this.shuffledWords[i]];
        }

        // 对于有原文的文章（type !== 'word'），隐藏翻转卡片和导航按钮，只显示原文
        var cardContainer = document.querySelector('#article-detail-section .vocabulary-card-container');
        var navContainer = document.querySelector('#article-detail-section .vocabulary-navigation');
        if (article.type !== 'word') {
            if (cardContainer) cardContainer.classList.add('hidden');
            if (navContainer) navContainer.classList.add('hidden');
        } else {
            if (cardContainer) cardContainer.classList.remove('hidden');
            if (navContainer) navContainer.classList.remove('hidden');
        }

        // 渲染文章详情
        this.renderArticleDetail();

        // 显示文章详情页面
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        this.articleDetailSection.classList.remove('hidden');

        // 添加历史记录，以便返回键能正确工作
        history.pushState({ page: 'article-detail' }, '', '');
    }

    // 返回文章列表
    backToArticles() {
        this.currentArticle = null;
        this.currentWordIndex = 0;
        this.shuffledWords = [];
        history.back();
    }

    // 切换页面
    switchPage(page) {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = {
            'home': ['articles-section'],
            'articles': ['articles-section'],
            'words': ['wordbook-section'],
            'sentences': ['sentence-section'],
            'settings': ['settings-section']
        };

        // 更新导航状态
        navItems.forEach(item => {
            if (item.dataset.page === page) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 隐藏所有区域
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // 显示对应页面区域
        if (sections[page]) {
            sections[page].forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.classList.remove('hidden');
                }
            });
        }
        
        // 主 tab 切换不累积历史记录，用 replaceState
        if (page === 'articles' || page === 'words' || page === 'sentences' || page === 'settings') {
            history.replaceState({ page: page }, '', '');
        }
    }

    // 渲染文章详情
    renderArticleDetail() {
        if (!this.currentArticle) return;

        // 设置文章标题
        this.articleDetailTitle.textContent = this.currentArticle.title;

        // 重新初始化shuffledWords数组，确保包含新添加的单词
        this.shuffledWords = [...this.currentArticle.words];
        for (let i = this.shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledWords[i], this.shuffledWords[j]] = [this.shuffledWords[j], this.shuffledWords[i]];
        }

        // 获取原文区域和操作区域（限定在文章详情区域）
        const vocabularyArticle = document.querySelector('#article-detail-section .vocabulary-article');
        const vocabularyActions = document.querySelector('#article-detail-section .vocabulary-actions');

        // 根据文章类型显示不同的界面
        if (this.currentArticle.type === 'word') {
            // 隐藏原文区域
            if (vocabularyArticle) {
                vocabularyArticle.classList.add('hidden');
            }

            // 显示操作按钮
            if (!vocabularyActions) {
                var navContainer = document.querySelector('#article-detail-section .vocabulary-navigation');
                if (navContainer) {
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'vocabulary-actions';
                    actionsDiv.innerHTML = `
                        <button id="view-words-btn" class="vocabulary-action-btn btn-secondary">查看文章</button>
                        <button id="add-word-to-article-btn" class="vocabulary-action-btn btn-primary">添加单词</button>
                    `;
                    navContainer.insertAdjacentElement('afterend', actionsDiv);

                    // 添加按钮事件
                    document.getElementById('view-words-btn').addEventListener('click', () => this.viewArticleWords());
                    document.getElementById('add-word-to-article-btn').addEventListener('click', () => this.addWordToArticle());
                }
            }

            // 渲染单词卡片
            this.renderWordCard();
        } else {
            // 显示原文区域，使用新的高亮方法同时高亮单词和长难句
            if (vocabularyArticle) {
                vocabularyArticle.classList.remove('hidden');
                // 获取该文章关联的长句
                var articleTitle = this.currentArticle.title;
                var articleSentences = this.sentencebook.filter(function(s) {
                    return s.source === articleTitle;
                });
                // 使用新的高亮方法：同时高亮单词和长难句
                this.articleOriginalContent.innerHTML = this.highlightContent(
                    this.currentArticle.content,
                    this.currentArticle.words,
                    articleSentences
                );

                // 在文章标题下显示单词和长句统计
                var existingStats = vocabularyArticle.querySelector('.article-stats-row');
                if (existingStats) existingStats.remove();
                var statsRow = document.createElement('div');
                statsRow.className = 'article-stats-row';
                statsRow.innerHTML = '<span class="article-stat-word">📚 ' + this.currentArticle.words.length + ' 个单词</span>' +
                    (articleSentences.length > 0 ? '<span class="article-stat-sentence">📐 ' + articleSentences.length + ' 个长句</span>' : '');
                var articleTitleEl = vocabularyArticle.querySelector('.vocabulary-article-title');
                if (articleTitleEl) {
                    articleTitleEl.insertAdjacentElement('afterend', statsRow);
                }
            }

            // 隐藏操作按钮
            if (vocabularyActions) {
                vocabularyActions.remove();
            }
        }
    }

    // 高亮文章中的单词和长难句
    // sentences: 该文章关联的长句数组（从sentencebook中筛选）
    highlightContent(content, words, sentences) {
        if (!content) return '';

        // 按长度降序排序（长句和单词都要从长到短处理，避免短文本误匹配长文本）
        var sortedSentences = (sentences || []).slice().sort(function(a, b) {
            return b.sentence.length - a.sentence.length;
        });
        var sortedWords = (words || []).slice().sort(function(a, b) {
            return b.length - a.length;
        });

        // 辅助函数：对文本中的单词做高亮
        var self = this;
        function highlightWordsInText(text) {
            var result = text;
            sortedWords.forEach(function(word) {
                var escapedWord = self.escapeHtml(word);
                var escapedForRegex = escapedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var regex = new RegExp('\\b' + escapedForRegex + '\\b', 'gi');
                result = result.replace(regex, '<span class="highlighted-word">$&</span>');
            });
            return result;
        }

        // 策略：先用唯一占位符替换长难句，高亮剩余文本中的单词，再还原长难句（长难句内的单词也做高亮）
        var result = this.escapeHtml(content);
        var placeholderMap = []; // [{placeholder, escapedAndHighlighted}]

        sortedSentences.forEach(function(sent, i) {
            var escapedSentence = this.escapeHtml(sent.sentence);
            var idx = result.indexOf(escapedSentence);
            if (idx !== -1) {
                var placeholder = '__SENTENCE_PLACEHOLDER_' + i + '__';
                result = result.split(escapedSentence).join(placeholder);
                // 对长难句内部的单词也做高亮，然后整句用下划线标记
                placeholderMap.push({
                    placeholder: placeholder,
                    escaped: highlightWordsInText(escapedSentence)
                });
            }
        }, this);

        // 在占位符保护下高亮单词（处理不在长难句内的文本）
        result = highlightWordsInText(result);

        // 还原长难句占位符为高亮span（内部单词已高亮 + 整句下划线）
        placeholderMap.forEach(function(item) {
            result = result.split(item.placeholder).join(
                '<span class="highlighted-sentence">' + item.escaped + '</span>'
            );
        });

        return result;
    }

    // 将 **text** 标记转换为高亮HTML标签（用于句子中的单词高亮）
    renderHighlightedText(text) {
        if (!text) return '';
        // 先转义整个文本，再将 **...** 转换为高亮标签
        const escaped = this.escapeHtml(text);
        return escaped.replace(/\*\*(.+?)\*\*/g, '<span class="sentence-highlight">$1</span>');
    }

    // 渲染单词卡片
    renderWordCard() {
        if (!this.currentArticle || this.shuffledWords.length === 0) return;
        
        const currentWord = this.shuffledWords[this.currentWordIndex];
        const wordInfo = this.wordbook.find(item => item.word.toLowerCase() === currentWord.toLowerCase());
        
        this.flashcardWord.textContent = currentWord;
        this.flashcardMeaning.textContent = wordInfo ? wordInfo.meaning : '无释义';
        
        // 重置卡片状态
        this.wordFlashcard.classList.remove('show-meaning');
    }

    // 切换单词卡片显示
    toggleFlashcard() {
        this.wordFlashcard.classList.toggle('show-meaning');
    }

    // 查看文章中的所有单词
    viewArticleWords() {
        if (!this.currentArticle) return;
        
        // 创建单词列表模态框
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${this.currentArticle.title} - 单词列表</h3>
                    <button class="close-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="words-list">
                        ${this.currentArticle.words.map(word => {
                            const wordInfo = this.wordbook.find(item => item.word.toLowerCase() === word.toLowerCase());
                            return `
                                <div class="word-item">
                                    <span class="word-text">${word}</span>
                                    <span class="word-meaning">${wordInfo ? wordInfo.meaning : '无释义'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // 添加到文档
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // 向文章添加单词
    addWordToArticle() {
        if (!this.currentArticle) return;
        
        // 初始化文章创建过程，使用当前文章的信息
        this.currentCreatingArticle = {
            id: this.currentArticle.id,
            title: this.currentArticle.title,
            content: this.currentArticle.content,
            words: [...this.currentArticle.words],
            addedAt: this.currentArticle.addedAt,
            type: this.currentArticle.type
        };
        
        // 打开单词模态框
        this.openWordModal();
    }

    // 显示上一个单词
    prevWord() {
        if (this.shuffledWords.length === 0) return;
        
        this.currentWordIndex = (this.currentWordIndex - 1 + this.shuffledWords.length) % this.shuffledWords.length;
        this.renderArticleDetail();
    }

    // 显示下一个单词
    nextWord() {
        if (this.shuffledWords.length === 0) return;

        this.currentWordIndex = (this.currentWordIndex + 1) % this.shuffledWords.length;
        this.renderArticleDetail();
    }

    // ========== 复习页面方法 ==========

    // 开始复习
    startReview() {
        if (this.wordbook.length === 0) {
            alert('单词本为空，请先添加单词');
            return;
        }

        // 确保所有卡片都有 FSRS 字段
        this.wordbook.forEach(card => FSRS.initCard(card));

        // 筛选到期需要复习的单词
        this.reviewWords = this.wordbook.filter(card => FSRS.isDue(card));

        if (this.reviewWords.length === 0) {
            alert('暂无需要复习的单词，所有单词都还在记忆周期内。\n请稍后再来复习！');
            return;
        }

        // 按紧迫度排序：R 越小（越可能忘记）越靠前
        this.reviewWords.sort((a, b) => {
            return FSRS.getRetrievability(a) - FSRS.getRetrievability(b);
        });

        this.currentReviewIndex = 0;
        this.reviewedCount = 0;

        // 隐藏所有section和footer，显示复习页面
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        this.reviewSection.classList.remove('hidden');

        // 渲染第一张卡片
        this.renderReviewCard();
    }

    // 返回单词本列表
    backFromReview() {
        this.reviewWords = [];
        this.currentReviewIndex = 0;
        this.reviewedCount = 0;
        history.back();
    }

    // 渲染复习卡片
    renderReviewCard() {
        if (this.reviewWords.length === 0) return;

        const currentItem = this.reviewWords[this.currentReviewIndex];
        const wordInfo = this.wordbook.find(
            item => item.word.toLowerCase() === currentItem.word.toLowerCase()
        );

        this.reviewWord.textContent = currentItem.word;
        this.reviewMeaning.textContent = wordInfo ? wordInfo.meaning : '无释义';

        // 设置句子内容（如果有的话），但保持隐藏，翻卡后才显示
        if (wordInfo && wordInfo.sentence) {
            this.reviewSentenceOriginal.innerHTML = this.renderHighlightedText(wordInfo.sentence);
            this.reviewSentenceTranslation.innerHTML = this.renderHighlightedText(
                wordInfo.sentenceTranslation || ''
            );
        } else {
            this.reviewSentenceOriginal.innerHTML = '';
            this.reviewSentenceTranslation.innerHTML = '';
        }

        // 更新进度文字：已复习数 / 总数
        this.reviewProgress.textContent =
            `${this.reviewedCount + 1} / ${this.reviewWords.length + this.reviewedCount}`;

        // 重置卡片为隐藏释义状态
        this.reviewFlashcard.classList.remove('show-meaning');
        this.reviewRatings.classList.add('hidden');
        this.reviewSentenceSection.classList.add('hidden');
    }

    // 翻转复习卡片（同时显示/隐藏评分按钮和句子区域）
    toggleReviewFlashcard() {
        var isShowing = this.reviewFlashcard.classList.toggle('show-meaning');
        if (isShowing) {
            this.reviewRatings.classList.remove('hidden');
            if (this.reviewSentenceOriginal.innerHTML.trim()) {
                this.reviewSentenceSection.classList.remove('hidden');
            }
        } else {
            this.reviewRatings.classList.add('hidden');
            this.reviewSentenceSection.classList.add('hidden');
        }
    }

    // 评分处理
    rateCard(rating) {
        if (this.reviewWords.length === 0) return;

        var currentItem = this.reviewWords[this.currentReviewIndex];

        // 在 wordbook 中找到对应卡片并更新
        var card = this.wordbook.find(
            item => item.word.toLowerCase() === currentItem.word.toLowerCase()
        );
        if (card) {
            FSRS.schedule(card, rating, new Date());
        }

        // 如果点了"忘记"，把卡片重新加入队列尾部（同次会话再复习一次）
        if (rating === 1) {
            this.reviewWords.push(currentItem);
        } else {
            this.reviewedCount++;
        }

        // 从当前队列移除已评分的卡片
        this.reviewWords.splice(this.currentReviewIndex, 1);

        // 保存更新后的单词本
        this.saveWordbook();

        // 显示下一张卡片或完成
        if (this.reviewWords.length === 0) {
            this.showReviewComplete();
        } else {
            // 如果当前索引超出范围，回到开头
            if (this.currentReviewIndex >= this.reviewWords.length) {
                this.currentReviewIndex = 0;
            }
            this.renderReviewCard();
        }
    }

    // 复习完成
    showReviewComplete() {
        this.reviewFlashcard.classList.remove('show-meaning');
        this.reviewRatings.classList.add('hidden');

        if (this.reviewedCount === 0) {
            // 所有卡片都点了"忘记"
            this.reviewWord.textContent = '继续加油';
            this.reviewMeaning.textContent = '所有卡片都需要再复习，请稍后重试';
        } else {
            this.reviewWord.textContent = '复习完成！';
            this.reviewMeaning.textContent =
                '本次成功复习 ' + this.reviewedCount + ' 个单词';
        }
        this.reviewProgress.textContent = '复习完成';
    }

    // ========== 复习卡片滑动手势（灵感来自 reactbits.dev CardSwap） ==========

    setupReviewSwipe() {
        var self = this;
        var card = this.reviewFlashcard;

        // 触摸事件（移动端）
        card.addEventListener('touchstart', function(e) { self._handleSwipeStart(e, e.touches[0]); }, { passive: false });
        card.addEventListener('touchmove', function(e) { self._handleSwipeMove(e, e.touches[0]); }, { passive: false });
        card.addEventListener('touchend', function(e) { self._handleSwipeEnd(e); });

        // 鼠标事件（桌面端）
        card.addEventListener('mousedown', function(e) { self._handleSwipeStart(e, e); });
        card.addEventListener('mousemove', function(e) { self._handleSwipeMove(e, e); });
        card.addEventListener('mouseup', function(e) { self._handleSwipeEnd(e); });
        card.addEventListener('mouseleave', function(e) { self._handleSwipeEnd(e); });
    }

    _handleSwipeStart(e, point) {
        // 评分按钮区域不触发滑动
        if (e.target.closest('.rating-btn')) return;

        // 只有在复习页面显示时才处理
        if (this.reviewSection.classList.contains('hidden')) return;

        // 复习完成状态不处理滑动
        if (this.reviewProgress.textContent === '复习完成') return;

        this.swipeStartX = point.clientX;
        this.swipeStartY = point.clientY;
        this.swipeCurrentX = point.clientX;
        this.swipeCurrentY = point.clientY;
        this.isSwiping = true;

        // 让卡片跟随手指（取消过渡动画）
        this.reviewFlashcard.classList.add('swiping');
    }

    _handleSwipeMove(e, point) {
        if (!this.isSwiping) return;

        this.swipeCurrentX = point.clientX;
        this.swipeCurrentY = point.clientY;

        var deltaX = this.swipeCurrentX - this.swipeStartX;
        var deltaY = this.swipeCurrentY - this.swipeStartY;

        // 如果垂直移动更大，取消滑动（让页面滚动）
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            this._resetSwipe();
            return;
        }

        // 阻止默认行为防止页面滚动
        if (Math.abs(deltaX) > 10) {
            e.preventDefault();
        }

        // 卡片跟随手指移动（带阻尼）
        var dampedX = deltaX * 0.6;
        this.reviewFlashcard.style.transform = 'translateX(' + dampedX + 'px)';
        this.reviewFlashcard.style.opacity = Math.max(0.4, 1 - Math.abs(deltaX) / 400);
    }

    _handleSwipeEnd(e) {
        if (!this.isSwiping) return;

        var deltaX = this.swipeCurrentX - this.swipeStartX;
        this.isSwiping = false;

        // 重置样式
        this.reviewFlashcard.classList.remove('swiping');
        this.reviewFlashcard.style.transform = '';
        this.reviewFlashcard.style.opacity = '';

        // 判断是否为有效滑动
        if (Math.abs(deltaX) >= this.swipeThreshold) {
            if (deltaX < 0) {
                // 向左滑 = 下一个单词
                this._animateSwipeToNext();
            } else {
                // 向右滑 = 上一个单词
                this._animateSwipeToPrev();
            }
        }
    }

    _resetSwipe() {
        this.isSwiping = false;
        this.reviewFlashcard.classList.remove('swiping');
        this.reviewFlashcard.style.transform = '';
        this.reviewFlashcard.style.opacity = '';
    }

    _animateSwipeToNext() {
        if (this.reviewWords.length === 0) return;

        var self = this;
        var card = this.reviewFlashcard;

        // 1. 卡片向左滑出
        card.classList.add('swipe-out-left');

        // 2. 动画结束后更新内容并从右侧滑入
        card.addEventListener('animationend', function handler() {
            card.removeEventListener('animationend', handler);
            card.classList.remove('swipe-out-left');

            // 更新索引和内容
            if (self.reviewProgress.textContent === '复习完成') {
                self.backFromReview();
                return;
            }

            self.currentReviewIndex = (self.currentReviewIndex + 1) % self.reviewWords.length;
            self.renderReviewCard();

            // 3. 卡片从右侧滑入
            card.classList.add('swipe-in-from-right');
            card.addEventListener('animationend', function handler2() {
                card.removeEventListener('animationend', handler2);
                card.classList.remove('swipe-in-from-right');
            });
        });
    }

    _animateSwipeToPrev() {
        if (this.reviewWords.length === 0) return;

        var self = this;
        var card = this.reviewFlashcard;

        // 1. 卡片向右滑出
        card.classList.add('swipe-out-right');

        // 2. 动画结束后更新内容并从左侧滑入
        card.addEventListener('animationend', function handler() {
            card.removeEventListener('animationend', handler);
            card.classList.remove('swipe-out-right');

            // 更新索引和内容
            self.currentReviewIndex = (self.currentReviewIndex - 1 + self.reviewWords.length) % self.reviewWords.length;
            self.renderReviewCard();

            // 3. 卡片从左侧滑入
            card.classList.add('swipe-in-from-left');
            card.addEventListener('animationend', function handler2() {
                card.removeEventListener('animationend', handler2);
                card.classList.remove('swipe-in-from-left');
            });
        });
    }

    // ========== 长句复习滑动手势 ==========

    setupSentenceReviewSwipe() {
        var self = this;
        var card = this.sentenceReviewFlashcard;

        card.addEventListener('touchstart', function(e) { self._handleSentenceSwipeStart(e, e.touches[0]); }, { passive: false });
        card.addEventListener('touchmove', function(e) { self._handleSentenceSwipeMove(e, e.touches[0]); }, { passive: false });
        card.addEventListener('touchend', function(e) { self._handleSentenceSwipeEnd(e); });

        card.addEventListener('mousedown', function(e) { self._handleSentenceSwipeStart(e, e); });
        card.addEventListener('mousemove', function(e) { self._handleSentenceSwipeMove(e, e); });
        card.addEventListener('mouseup', function(e) { self._handleSentenceSwipeEnd(e); });
        card.addEventListener('mouseleave', function(e) { self._handleSentenceSwipeEnd(e); });
    }

    _handleSentenceSwipeStart(e, point) {
        if (e.target.closest('.rating-btn')) return;
        if (this.sentenceReviewSection.classList.contains('hidden')) return;
        if (this.sentenceReviewProgress.textContent === '复习完成') return;

        this.swipeStartX = point.clientX;
        this.swipeStartY = point.clientY;
        this.swipeCurrentX = point.clientX;
        this.swipeCurrentY = point.clientY;
        this.isSwiping = true;
        this.sentenceReviewFlashcard.classList.add('swiping');
    }

    _handleSentenceSwipeMove(e, point) {
        if (!this.isSwiping) return;
        this.swipeCurrentX = point.clientX;
        this.swipeCurrentY = point.clientY;
        var deltaX = this.swipeCurrentX - this.swipeStartX;
        var deltaY = this.swipeCurrentY - this.swipeStartY;
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) { this._resetSentenceSwipe(); return; }
        if (Math.abs(deltaX) > 10) { e.preventDefault(); }
        var dampedX = deltaX * 0.6;
        this.sentenceReviewFlashcard.style.transform = 'translateX(' + dampedX + 'px)';
        this.sentenceReviewFlashcard.style.opacity = Math.max(0.4, 1 - Math.abs(deltaX) / 400);
    }

    _handleSentenceSwipeEnd(e) {
        if (!this.isSwiping) return;
        var deltaX = this.swipeCurrentX - this.swipeStartX;
        this.isSwiping = false;
        this.sentenceReviewFlashcard.classList.remove('swiping');
        this.sentenceReviewFlashcard.style.transform = '';
        this.sentenceReviewFlashcard.style.opacity = '';
        if (Math.abs(deltaX) >= this.swipeThreshold) {
            if (deltaX < 0) { this._animateSentenceSwipeToNext(); }
            else { this._animateSentenceSwipeToPrev(); }
        }
    }

    _resetSentenceSwipe() {
        this.isSwiping = false;
        this.sentenceReviewFlashcard.classList.remove('swiping');
        this.sentenceReviewFlashcard.style.transform = '';
        this.sentenceReviewFlashcard.style.opacity = '';
    }

    _animateSentenceSwipeToNext() {
        if (this.sentenceReviewWords.length === 0) return;
        var self = this;
        var card = this.sentenceReviewFlashcard;
        card.classList.add('swipe-out-left');
        card.addEventListener('animationend', function handler() {
            card.removeEventListener('animationend', handler);
            card.classList.remove('swipe-out-left');
            if (self.sentenceReviewProgress.textContent === '复习完成') { self.backFromSentenceReview(); return; }
            self.sentenceReviewIndex = (self.sentenceReviewIndex + 1) % self.sentenceReviewWords.length;
            self.renderSentenceReviewCard();
            card.classList.add('swipe-in-from-right');
            card.addEventListener('animationend', function handler2() { card.removeEventListener('animationend', handler2); card.classList.remove('swipe-in-from-right'); });
        });
    }

    _animateSentenceSwipeToPrev() {
        if (this.sentenceReviewWords.length === 0) return;
        var self = this;
        var card = this.sentenceReviewFlashcard;
        card.classList.add('swipe-out-right');
        card.addEventListener('animationend', function handler() {
            card.removeEventListener('animationend', handler);
            card.classList.remove('swipe-out-right');
            self.sentenceReviewIndex = (self.sentenceReviewIndex - 1 + self.sentenceReviewWords.length) % self.sentenceReviewWords.length;
            self.renderSentenceReviewCard();
            card.classList.add('swipe-in-from-left');
            card.addEventListener('animationend', function handler2() { card.removeEventListener('animationend', handler2); card.classList.remove('swipe-in-from-left'); });
        });
    }

    // ========== 长句本功能 ==========

    // 渲染长句列表
    renderSentences() {
        this.sentenceCount.textContent = `共有${this.sentencebook.length}条长句`;

        if (this.sentencebook.length === 0) {
            this.sentenceList.innerHTML = '<div class="empty-state">📐<br>暂无长句<br><span style="font-size:14px;">在添加文章时长按拖选句子来收藏</span></div>';
            return;
        }

        const sorted = [...this.sentencebook].sort((a, b) =>
            new Date(b.addedAt) - new Date(a.addedAt)
        );

        this.sentenceList.innerHTML = '';
        sorted.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'sentence-list-item';
            listItem.innerHTML = `
                <div class="sentence-text">${this.escapeHtml(item.sentence)}</div>
                <div class="sentence-source">${this.escapeHtml(item.source || '')}</div>
            `;

            listItem.addEventListener('click', () => this.openSentenceDetail(item));

            let longPressTimer;
            listItem.addEventListener('mousedown', () => {
                listItem.classList.add('long-press');
                longPressTimer = setTimeout(() => this.deleteSentence(item.id), 500);
            });
            listItem.addEventListener('mouseup', () => { clearTimeout(longPressTimer); setTimeout(() => listItem.classList.remove('long-press'), 100); });
            listItem.addEventListener('mouseleave', () => { clearTimeout(longPressTimer); setTimeout(() => listItem.classList.remove('long-press'), 100); });
            listItem.addEventListener('touchstart', () => {
                listItem.classList.add('long-press');
                longPressTimer = setTimeout(() => this.deleteSentence(item.id), 500);
            });
            listItem.addEventListener('touchend', () => { clearTimeout(longPressTimer); setTimeout(() => listItem.classList.remove('long-press'), 100); });
            listItem.addEventListener('touchcancel', () => { clearTimeout(longPressTimer); setTimeout(() => listItem.classList.remove('long-press'), 100); });

            this.sentenceList.appendChild(listItem);
        });
    }

    // 删除长句
    deleteSentence(id) {
        this.showCustomConfirm('删除长句', '确定要删除这条长句吗？此操作无法撤销。', () => {
            this.sentencebook = this.sentencebook.filter(item => item.id !== id);
            this.saveSentences();
            this.renderSentences();
        });
    }

    // 打开长句详情
    openSentenceDetail(item) {
        this.sentenceDetailOriginal.textContent = item.sentence;
        this.sentenceDetailColored.innerHTML = item.segments && item.segments.length > 0
            ? this.renderSegmentsToHtml(item.segments)
            : '<p style="color:#999;">暂无结构分析</p>';
        this.sentenceDetailBreakdown.innerHTML = this.renderBreakdownToHtml(item.breakdown || '暂无拆解');
        this.sentenceDetailTree.innerHTML = this.renderTreeFromBreakdown(item.breakdown || '');
        this.sentenceDetailTranslation.textContent = item.translation || '暂无翻译';

        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        this.sentenceDetailSection.classList.remove('hidden');
        history.pushState({ page: 'sentence-detail' }, '', '');
    }

    // 关闭长句详情
    closeSentenceDetail() {
        this.sentenceDetailSection.classList.add('hidden');
        history.back();
    }

    // 将 segments 数组渲染为彩色标注 HTML
    renderSegmentsToHtml(segments) {
        if (!segments || segments.length === 0) return '';
        return '<div style="white-space:normal;word-wrap:break-word;overflow-wrap:anywhere;word-break:normal;">' +
            segments.map(seg => {
                const typeClass = seg.type ? `type-${seg.type}` : '';
                const title = this.escapeHtml(seg.role ? `${seg.type} — ${seg.role}` : (seg.type || ''));
                return `<span class="sentence-segment ${typeClass}" title="${title}">${this.escapeHtml(seg.text)}</span>`;
            }).join(' ') +
            '</div>';
    }

    // 将 breakdown 文本渲染为 HTML（保留换行和 emoji，去掉树状图部分）
    renderBreakdownToHtml(breakdown) {
        if (!breakdown) return '<p style="color:#999;">暂无拆解</p>';
        // 截断树状图部分（从 🌳 开始），避免重复
        var treeIdx = breakdown.indexOf('🌳');
        var text = treeIdx !== -1 ? breakdown.substring(0, treeIdx).trim() : breakdown;
        if (!text) return '<p style="color:#999;">暂无拆解</p>';
        const escaped = this.escapeHtml(text);
        const withBreaks = escaped.replace(/\n/g, '<br>');
        return `<div style="white-space:pre-wrap;line-height:1.8;word-wrap:break-word;overflow-wrap:break-word;word-break:normal;">${withBreaks}</div>`;
    }

    // 从 breakdown 中提取树状图部分
    renderTreeFromBreakdown(breakdown) {
        if (!breakdown) return '<p style="color:#999;">暂无树状图</p>';
        const treeIdx = breakdown.indexOf('🌳');
        if (treeIdx === -1) return '<p style="color:#999;">暂无树状图</p>';
        const treeText = breakdown.substring(treeIdx);
        const escaped = this.escapeHtml(treeText);
        return `<div style="font-family:'Courier New',monospace;font-size:13px;white-space:pre;line-height:1.6;overflow-x:auto;word-wrap:normal;">${escaped.replace(/\n/g, '<br>')}</div>`;
    }

    // ========== 长句划线选择 ==========

    // 开始划线（长按单词触发）
    startSentenceDraw(tokenId) {
        // 检查该 token 是否已在某个划线句子中 → 取消该句
        var existingIndex = this.selectedSentences.findIndex(function(s) {
            return tokenId >= s.startId && tokenId <= s.endId;
        });
        if (existingIndex !== -1) {
            this.selectedSentences.splice(existingIndex, 1);
            this.isDrawingSentence = false;
            this.sentenceDrawStartId = -1;
            this.renderAllTokenStyles();
            return;
        }

        this.isDrawingSentence = true;
        this.sentenceDrawStartId = tokenId;
        this.sentenceDrawEndId = tokenId;
        this.renderAllTokenStyles();
    }

    // 划线中移动
    updateSentenceDraw(point) {
        if (!this.isDrawingSentence) return;
        var el = document.elementFromPoint(point.clientX, point.clientY);
        if (!el || !el.dataset || el.dataset.id === undefined) return;
        if (!this.wordDisplay.contains(el)) return;

        var tokenId = parseInt(el.dataset.id);
        var newStartId = Math.min(this.sentenceDrawStartId, tokenId);
        var newEndId = Math.max(this.sentenceDrawStartId, tokenId);

        if (newStartId !== this.sentenceDrawStartId || newEndId !== this.sentenceDrawEndId) {
            // 不能跨越已有划线的句子
            var hasConflict = false;
            for (var i = 0; i < this.selectedSentences.length; i++) {
                var s = this.selectedSentences[i];
                if (!(newEndId < s.startId || newStartId > s.endId)) {
                    hasConflict = true;
                    break;
                }
            }
            if (hasConflict) return;

            this.sentenceDrawStartId = newStartId;
            this.sentenceDrawEndId = newEndId;
            this.renderAllTokenStyles();
        }
    }

    // 结束划线
    endSentenceDraw() {
        if (!this.isDrawingSentence) return;
        this.isDrawingSentence = false;

        if (this.sentenceDrawEndId !== this.sentenceDrawStartId) {
            // 保存划线句子
            this.selectedSentences.push({
                startId: this.sentenceDrawStartId,
                endId: this.sentenceDrawEndId,
                colorIndex: this.sentenceColorIndex
            });
            this.sentenceColorIndex = (this.sentenceColorIndex + 1) % 5;
        }
        this.sentenceDrawStartId = -1;
        this.sentenceDrawEndId = -1;
        this.renderAllTokenStyles();
    }

    // 应用所有样式（单词选中 + 划线预览 + 已保存划线）
    renderAllTokenStyles() {
        var self = this;
        var tokens = this.wordDisplay.querySelectorAll('[data-id]');
        tokens.forEach(function(tok) {
            var id = parseInt(tok.dataset.id);

            // 重置所有划线样式
            tok.classList.remove('drawing');
            for (var c = 0; c < 5; c++) {
                tok.classList.remove('sentence-color-' + c);
            }

            // 当前正在画的预览
            if (self.isDrawingSentence && id >= self.sentenceDrawStartId && id <= self.sentenceDrawEndId) {
                tok.classList.add('drawing');
            }

            // 已保存的划线
            for (var i = 0; i < self.selectedSentences.length; i++) {
                var s = self.selectedSentences[i];
                if (id >= s.startId && id <= s.endId) {
                    tok.classList.add('sentence-color-' + s.colorIndex);
                }
            }
        });
    }

    // 已保存划线的样式渲染
    renderSentenceUnderlines() {
        this.renderAllTokenStyles();
    }

    // ========== 长句复习 ==========

    // 开始长句复习
    startSentenceReview() {
        if (this.sentencebook.length === 0) {
            alert('长句本为空，请先添加长句');
            return;
        }

        this.sentencebook.forEach(item => FSRS.initCard(item));
        this.sentenceReviewWords = this.sentencebook.filter(item => FSRS.isDue(item));

        if (this.sentenceReviewWords.length === 0) {
            alert('暂无需要复习的长句，请稍后再来！');
            return;
        }

        this.sentenceReviewWords.sort((a, b) =>
            FSRS.getRetrievability(a) - FSRS.getRetrievability(b)
        );

        this.sentenceReviewIndex = 0;
        this.sentenceReviewedCount = 0;

        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        document.querySelector('.footer').classList.add('hidden');
        this.sentenceReviewSection.classList.remove('hidden');
        this.renderSentenceReviewCard();
    }

    // 渲染长句复习卡片
    renderSentenceReviewCard() {
        if (this.sentenceReviewWords.length === 0) return;

        const currentItem = this.sentenceReviewWords[this.sentenceReviewIndex];

        this.sentenceReviewText.textContent = currentItem.sentence;
        this.sentenceReviewTranslation.textContent = currentItem.translation || '无翻译';

        // 预设分析内容（保持隐藏，翻卡后显示）
        this.sentenceReviewColored.innerHTML = currentItem.segments && currentItem.segments.length > 0
            ? this.renderSegmentsToHtml(currentItem.segments)
            : '';
        this.sentenceReviewBreakdown.innerHTML = this.renderBreakdownToHtml(currentItem.breakdown || '');
        this.sentenceReviewTree.innerHTML = this.renderTreeFromBreakdown(currentItem.breakdown || '');

        this.sentenceReviewProgress.textContent =
            `${this.sentenceReviewedCount + 1} / ${this.sentenceReviewWords.length + this.sentenceReviewedCount}`;

        // 重置为正面
        this.sentenceReviewFlashcard.classList.remove('show-meaning');
        this.sentenceReviewRatings.classList.add('hidden');
        this.sentenceReviewAnalysis.classList.add('hidden');
    }

    // 翻转长句复习卡片
    toggleSentenceReviewFlashcard() {
        var isShowing = this.sentenceReviewFlashcard.classList.toggle('show-meaning');
        if (isShowing) {
            this.sentenceReviewRatings.classList.remove('hidden');
            this.sentenceReviewAnalysis.classList.remove('hidden');
        } else {
            this.sentenceReviewRatings.classList.add('hidden');
            this.sentenceReviewAnalysis.classList.add('hidden');
        }
    }

    // 长句评分
    rateSentenceCard(rating) {
        if (this.sentenceReviewWords.length === 0) return;

        var currentItem = this.sentenceReviewWords[this.sentenceReviewIndex];
        var card = this.sentencebook.find(item => item.id === currentItem.id);
        if (card) {
            FSRS.schedule(card, rating, new Date());
        }

        if (rating === 1) {
            this.sentenceReviewWords.push(currentItem);
        } else {
            this.sentenceReviewedCount++;
        }

        this.sentenceReviewWords.splice(this.sentenceReviewIndex, 1);
        this.saveSentences();

        if (this.sentenceReviewWords.length === 0) {
            this.showSentenceReviewComplete();
        } else {
            if (this.sentenceReviewIndex >= this.sentenceReviewWords.length) {
                this.sentenceReviewIndex = 0;
            }
            this.renderSentenceReviewCard();
        }
    }

    // 长句复习完成
    showSentenceReviewComplete() {
        this.sentenceReviewFlashcard.classList.remove('show-meaning');
        this.sentenceReviewRatings.classList.add('hidden');
        this.sentenceReviewAnalysis.classList.add('hidden');

        if (this.sentenceReviewedCount === 0) {
            this.sentenceReviewText.textContent = '继续加油';
            this.sentenceReviewTranslation.textContent = '所有长句都需要再复习，请稍后重试';
        } else {
            this.sentenceReviewText.textContent = '复习完成！';
            this.sentenceReviewTranslation.textContent = '本次成功复习 ' + this.sentenceReviewedCount + ' 条长句';
        }
        this.sentenceReviewProgress.textContent = '复习完成';
    }

    // 退出长句复习
    backFromSentenceReview() {
        this.sentenceReviewWords = [];
        this.sentenceReviewIndex = 0;
        this.sentenceReviewedCount = 0;
        history.back();
    }

    // 处理 Android 系统返回键，返回字符串告知 Android 当前状态
    onBackPressed() {
        try {
            // 优先关闭当前可见的二级页面 / 模态框
            if (!this.reviewSection.classList.contains('hidden')) {
                this.backFromReview();
                return 'modal';
            }
            if (!this.sentenceReviewSection.classList.contains('hidden')) {
                this.backFromSentenceReview();
                return 'modal';
            }
            if (!this.sentenceDetailSection.classList.contains('hidden')) {
                this.closeSentenceDetail();
                return 'modal';
            }
            if (!this.articleDetailSection.classList.contains('hidden')) {
                this.backToArticles();
                return 'modal';
            }
            if (!this.wordSelectionSection.classList.contains('hidden')) {
                this.backFromWordSelection();
                return 'modal';
            }
            if (!this.wordDetailSection.classList.contains('hidden')) {
                this.closeWordDetail();
                return 'modal';
            }
            if (!this.wordInputSection.classList.contains('hidden')) {
                this.closeWordModal();
                return 'modal';
            }
            if (!this.articleInputSection.classList.contains('hidden')) {
                this.closeArticleModal();
                return 'modal';
            }
            if (!this.articleTitleSection.classList.contains('hidden')) {
                this.closeArticleTitleModal();
                return 'modal';
            }

            // 没有弹出层 → 检查 JS 历史记录
            if (window.history.length > 1) {
                window.history.back();
                return 'history';
            }

            // 已在根页面 → 交给 Android 处理双击退出
            return 'root';
        } catch (e) {
            return 'error';
        }
    }

    // HTML 转义
    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WordbookApp();
});
