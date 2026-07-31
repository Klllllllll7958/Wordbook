// 单词本应用主逻辑
class WordbookApp {
    constructor() {
        // 状态管理
        this.selectedWords = new Set();
        this.wordbook = this.loadWordbook();
        this.articles = this.loadArticles();
        this.currentMemoryIndex = -1;
        this.isShowingMeaning = false;
        this.processedWords = [];

        // 复习页面状态
        this.reviewWords = [];
        this.currentReviewIndex = 0;
        this.reviewedCount = 0;
        
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
        this.prevReviewBtn = document.getElementById('prev-review-btn');
        this.nextReviewBtn = document.getElementById('next-review-btn');
        this.backFromReviewBtn = document.getElementById('back-from-review');
        this.reviewRatings = document.getElementById('review-ratings');
        
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
        this.updateSelectedCount();
        this.setupNavigation();
        this.setupPopStateListener();
    }
    
    // 设置popstate事件监听器，处理返回键导航
    setupPopStateListener() {
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                const page = event.state.page;
                if (page === 'article-detail' || page === 'words' || page === 'settings') {
                    // 从单词学习、单词本或设置页面返回，应该显示文章列表
                    this.currentArticle = null;
                    this.currentWordIndex = 0;
                    this.shuffledWords = [];
                    
                    // 显示文章列表页面，不添加历史记录
                    const navItems = document.querySelectorAll('.nav-item');
                    navItems.forEach(item => {
                        if (item.dataset.page === 'articles') {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                    
                    document.querySelectorAll('.section').forEach(section => {
                        section.classList.add('hidden');
                    });
                    document.getElementById('articles-section').classList.remove('hidden');
                } else if (page === 'articles') {
                    // 从文章列表页面返回，应该让Android系统处理，这样点击两次返回键就会退出应用
                }
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
        this.prevReviewBtn.addEventListener('click', () => this.prevReviewWord());
        this.nextReviewBtn.addEventListener('click', () => this.nextReviewWord());

        // 评分按钮事件
        this.reviewRatings.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();  // 防止冒泡触发卡片翻转
                const rating = parseInt(btn.dataset.rating);
                this.rateCard(rating);
            });
        });
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

    // 切换页面
    switchPage(page) {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = {
            'home': ['articles-section'],
            'articles': ['articles-section'],
            'words': ['wordbook-section'],
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
        this.switchPage('articles');
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
        this.switchPage('articles');
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
        this.switchPage('articles');
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

        // 清空已选单词
        this.selectedWords.clear();
        this.updateSelectedCount();

        // 跳转到单词选择页面
        document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
        this.wordSelectionSection.classList.remove('hidden');
    }

    // 从单词选择页面返回文章输入页面
    backFromWordSelection() {
        this.wordSelectionSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        // 回到文章列表
        this.switchPage('articles');
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

    // 渲染单词
    renderWords() {
        this.wordDisplay.innerHTML = '';
        
        this.processedWords.forEach(item => {
            if (item.isWord) {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.textContent = item.text;
                wordSpan.dataset.word = item.text.toLowerCase();
                wordSpan.dataset.id = item.id;
                
                wordSpan.addEventListener('click', () => this.toggleWordSelection(wordSpan, item.text));
                
                this.wordDisplay.appendChild(wordSpan);
            } else if (/^\s+$/.test(item.text)) {
                // 空白字符
                this.wordDisplay.appendChild(document.createTextNode(item.text));
            } else {
                // 标点符号
                this.wordDisplay.appendChild(document.createTextNode(item.text));
            }
        });
    }

    // 切换单词选中状态
    toggleWordSelection(element, word) {
        const lowerWord = word.toLowerCase();
        
        if (this.selectedWords.has(lowerWord)) {
            this.selectedWords.delete(lowerWord);
            element.classList.remove('selected');
        } else {
            this.selectedWords.add(lowerWord);
            element.classList.add('selected');
        }
        
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
            // 批量翻译单词
            const translations = await translator.translateBatch(wordsToAdd);
            
            // 添加到单词本
            translations.forEach(({ word, meaning }) => {
                this.addWordToWordbook(word, meaning);
            });

            // 保存文章
            const article = {
                id: Date.now().toString(),
                title: title,
                content: content,
                words: wordsToAdd,
                addedAt: new Date().toISOString(),
                type: 'article' // 标记为文章添加的文章
            };
            
            this.articles.push(article);
            this.saveArticles();

            // 关闭页面，返回文章列表
            this.wordSelectionSection.classList.add('hidden');
            this.articleInputSection.classList.add('hidden');
            document.querySelector('.footer').classList.remove('hidden');
            this.switchPage('articles');
            
            // 重新渲染
            this.renderArticles();
            this.renderWordbook();
            
            alert(`成功保存文章和 ${translations.length} 个单词！`);
        } catch (error) {
            console.error('保存失败:', error);
            alert('保存失败，请重试');
        } finally {
            this.saveArticleBtn.textContent = '保存文章和单词';
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
    addWordToWordbook(word, meaning) {
        const lowerWord = word.toLowerCase();
        
        // 检查是否已存在
        const existingIndex = this.wordbook.findIndex(item => item.word.toLowerCase() === lowerWord);
        
        if (existingIndex !== -1) {
            // 更新现有单词
            this.wordbook[existingIndex].meaning = meaning;
        } else {
            // 添加新单词
            this.wordbook.push({
                word: word,
                meaning: meaning,
                addedAt: new Date().toISOString(),
                mastery: 0 // 掌握程度：0-100
            });
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
            
            articleCard.innerHTML = `
                <div class="article-card-header">
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-stats">
                        <span class="article-words">${article.words.length} 个单词</span>
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
            listItem.addEventListener('click', () => this.editWord(item.word));
            
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

    // 编辑单词
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
        
        // 显示文章列表页面
        this.switchPage('articles');
    }

    // 切换页面
    switchPage(page) {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = {
            'home': ['articles-section'],
            'articles': ['articles-section'],
            'words': ['wordbook-section'],
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
        
        // 添加历史记录，以便返回键能正确工作
        if (page === 'articles' || page === 'words' || page === 'settings') {
            history.pushState({ page: page }, '', '');
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
        
        // 获取原文区域和操作区域
        const vocabularyArticle = document.querySelector('.vocabulary-article');
        const vocabularyActions = document.querySelector('.vocabulary-actions');
        
        // 根据文章类型显示不同的界面
        if (this.currentArticle.type === 'word') {
            // 隐藏原文区域
            if (vocabularyArticle) {
                vocabularyArticle.classList.add('hidden');
            }
            
            // 显示操作按钮
            if (!vocabularyActions) {
                const navContainer = document.querySelector('.vocabulary-navigation');
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
        } else {
            // 显示原文区域
            if (vocabularyArticle) {
                vocabularyArticle.classList.remove('hidden');
                // 渲染文章原文，高亮选中的单词
                this.articleOriginalContent.innerHTML = this.highlightWords(this.currentArticle.content, this.currentArticle.words);
            }
            
            // 隐藏操作按钮
            if (vocabularyActions) {
                vocabularyActions.remove();
            }
        }
        
        // 渲染单词卡片
        this.renderWordCard();
    }

    // 高亮文章中的单词
    highlightWords(content, words) {
        let result = content;
        
        // 按单词长度降序排序，避免短单词匹配长单词的一部分
        const sortedWords = [...words].sort((a, b) => b.length - a.length);
        
        sortedWords.forEach(word => {
            // 转义正则表达式中的特殊字符
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // 使用正则表达式匹配整个单词
            const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
            result = result.replace(regex, '<span class="highlighted-word">$&</span>');
        });
        
        return result;
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

        this.reviewSection.classList.add('hidden');
        document.querySelector('.footer').classList.remove('hidden');
        this.switchPage('words');
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

        // 更新进度文字：已复习数 / 总数
        this.reviewProgress.textContent =
            `${this.reviewedCount + 1} / ${this.reviewWords.length + this.reviewedCount}`;

        // 重置卡片为隐藏释义状态
        this.reviewFlashcard.classList.remove('show-meaning');
        this.reviewRatings.classList.add('hidden');

        // 恢复导航按钮状态（可能被 showReviewComplete 修改过）
        this.prevReviewBtn.style.display = '';
        this.nextReviewBtn.querySelector('span').textContent = '下一个';
        this.nextReviewBtn.querySelector('svg').style.display = '';
    }

    // 翻转复习卡片（同时显示/隐藏评分按钮）
    toggleReviewFlashcard() {
        var isShowing = this.reviewFlashcard.classList.toggle('show-meaning');
        if (isShowing) {
            this.reviewRatings.classList.remove('hidden');
        } else {
            this.reviewRatings.classList.add('hidden');
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
            this.reviewProgress.textContent = '复习完成';

            // 隐藏导航按钮
            this.prevReviewBtn.style.display = 'none';
            this.nextReviewBtn.style.display = 'none';
        } else {
            this.reviewWord.textContent = '复习完成！';
            this.reviewMeaning.textContent =
                '本次成功复习 ' + this.reviewedCount + ' 个单词';
            this.reviewProgress.textContent = '复习完成';

            // 把导航按钮改成返回按钮
            this.prevReviewBtn.style.display = 'none';
            this.nextReviewBtn.querySelector('span').textContent = '返回';
            this.nextReviewBtn.querySelector('svg').style.display = 'none';
        }
    }

    // 上一个复习单词
    prevReviewWord() {
        if (this.reviewWords.length === 0) return;

        this.currentReviewIndex = (this.currentReviewIndex - 1 + this.reviewWords.length) % this.reviewWords.length;
        this.renderReviewCard();
    }

    // 下一个复习单词
    nextReviewWord() {
        if (this.reviewWords.length === 0) return;

        // 如果是"复习完成"状态，nextReviewBtn 变成了返回按钮
        if (this.reviewProgress.textContent === '复习完成') {
            this.prevReviewBtn.style.display = '';
            this.nextReviewBtn.querySelector('span').textContent = '下一个';
            this.nextReviewBtn.querySelector('svg').style.display = '';
            this.backFromReview();
            return;
        }

        this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviewWords.length;
        this.renderReviewCard();
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WordbookApp();
});
