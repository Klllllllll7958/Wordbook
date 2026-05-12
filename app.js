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
        
        // 新增：当前正在创建的词组
        this.currentCreatingArticle = null;

        // DOM 元素
        this.articleTitleInput = document.getElementById('article-title-input');
        this.articleInput = document.getElementById('article-input');
        this.processBtn = document.getElementById('process-btn');
        this.wordDisplay = document.getElementById('word-display');
        this.selectedCount = document.getElementById('selected-count');
        this.wordInput = document.getElementById('word-input');
        this.meaningInput = document.getElementById('meaning-input');
        this.addWordBtn = document.getElementById('add-word-btn');
        this.wordbookList = document.getElementById('wordbook-list');
        this.articlesList = document.getElementById('articles-list');
        this.addArticleBtn = document.getElementById('add-article-btn');
        this.articleModal = document.getElementById('article-modal');
        this.wordModal = document.getElementById('word-modal');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.closeWordModalBtn = document.getElementById('close-word-modal-btn');
        this.saveArticleBtn = document.getElementById('save-article-btn');
        this.saveWordBtn = document.getElementById('save-word-btn');
        this.finishAddingBtn = document.getElementById('finish-adding-btn');
        
        // 添加词组选项模态框元素
        this.addArticleOptionsModal = document.getElementById('add-article-options-modal');
        this.closeOptionsModalBtn = document.getElementById('close-options-modal-btn');
        this.addArticleOptionBtn = document.getElementById('add-article-option-btn');
        this.addWordToArticleOptionBtn = document.getElementById('add-word-to-article-option-btn');
        
        // 词组标题输入模态框元素
        this.articleTitleModal = document.getElementById('article-title-modal');
        this.articleTitleInputModal = document.getElementById('article-title-input-modal');
        this.closeTitleModalBtn = document.getElementById('close-title-modal-btn');
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
        
        // API配置相关DOM元素
        this.appidInput = document.getElementById('appid-input');
        this.appkeyInput = document.getElementById('appkey-input');
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
                    // 从词组列表页面返回，应该让Android系统处理，这样点击两次返回键就会退出应用
                }
            }
        });
    }

    // 绑定事件
    bindEvents() {
        // API配置按钮
        this.saveApiBtn.addEventListener('click', () => this.saveApiConfig());
        this.clearApiBtn.addEventListener('click', () => this.clearApiConfig());
        
        // 词组相关按钮
        this.addArticleBtn.addEventListener('click', () => this.openAddArticleOptionsModal());
        this.closeModalBtn.addEventListener('click', () => this.closeArticleModal());
        this.processBtn.addEventListener('click', () => this.processArticle());
        this.saveArticleBtn.addEventListener('click', () => this.saveArticle());
        
        // 添加词组选项模态框事件
        this.closeOptionsModalBtn.addEventListener('click', () => this.closeAddArticleOptionsModal());
        this.addArticleOptionBtn.addEventListener('click', () => this.addArticleOption());
        this.addWordToArticleOptionBtn.addEventListener('click', () => this.addWordToArticleOption());
        
        // 结束添加按钮事件
        this.finishAddingBtn.addEventListener('click', () => this.finishAddingWords());
        
        // 词组标题输入模态框事件
        this.closeTitleModalBtn.addEventListener('click', () => this.closeArticleTitleModal());
        this.saveTitleBtn.addEventListener('click', () => this.saveArticleTitle());

        // 单词相关按钮
        if (this.addWordBtn) {
            this.addWordBtn.addEventListener('click', () => this.openWordModal());
        }
        if (this.wordbookAddBtn) {
            this.wordbookAddBtn.addEventListener('click', () => this.openWordModal());
        }
        this.closeWordModalBtn.addEventListener('click', () => this.closeWordModal());
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

    // 打开词组模态框
    openArticleModal() {
        // 重置表单状态
        this.resetArticleModal();
        this.articleModal.classList.remove('hidden');
    }

    // 关闭词组模态框
    closeArticleModal() {
        this.articleModal.classList.add('hidden');
    }

    // 重置词组模态框状态
    resetArticleModal() {
        // 重置文章表单
        this.articleTitleInput.value = '';
        this.articleInput.value = '';
        this.wordDisplay.classList.add('hidden');
        this.selectedWords.clear();
        this.updateSelectedCount();
    }

    // 打开单词模态框
    openWordModal() {
        this.wordInput.value = '';
        this.meaningInput.value = '';
        this.wordModal.classList.remove('hidden');
    }

    // 关闭单词模态框
    closeWordModal() {
        this.wordModal.classList.add('hidden');
    }

    // 打开添加词组选项模态框
    openAddArticleOptionsModal() {
        this.addArticleOptionsModal.classList.remove('hidden');
    }

    // 关闭添加词组选项模态框
    closeAddArticleOptionsModal() {
        this.addArticleOptionsModal.classList.add('hidden');
    }

    // 添加文章选项
    addArticleOption() {
        this.closeAddArticleOptionsModal();
        this.openArticleModal();
    }

    // 添加单词到词组选项
    addWordToArticleOption() {
        this.closeAddArticleOptionsModal();
        this.openArticleTitleModal();
    }

    // 结束添加单词，生成新的词组或更新现有词组
    finishAddingWords() {
        // 检查是否正在创建词组
        if (this.currentCreatingArticle) {
            // 检查是否添加了单词
            if (this.currentCreatingArticle.words.length > 0) {
                // 检查是否是更新现有词组
                const existingIndex = this.articles.findIndex(article => article.id === this.currentCreatingArticle.id);
                
                if (existingIndex !== -1) {
                    // 更新现有词组
                    this.articles[existingIndex] = this.currentCreatingArticle;
                    this.saveArticles();
                    
                    // 如果当前正在查看该词组，更新currentArticle
                    if (this.currentArticle && this.currentArticle.id === this.currentCreatingArticle.id) {
                        this.currentArticle = this.currentCreatingArticle;
                        // 重新渲染单词卡片
                        this.renderArticleDetail();
                    }
                    
                    // 重新渲染articles列表
                    this.renderArticles();
                    
                    // 显示成功提示
                    alert(`成功更新词组 "${this.currentCreatingArticle.title}"，现在包含 ${this.currentCreatingArticle.words.length} 个单词！`);
                } else {
                    // 创建新词组
                    this.articles.push(this.currentCreatingArticle);
                    this.saveArticles();
                    
                    // 重新渲染articles列表
                    this.renderArticles();
                    
                    // 显示成功提示
                    alert(`成功创建词组 "${this.currentCreatingArticle.title}"，包含 ${this.currentCreatingArticle.words.length} 个单词！`);
                }
            } else {
                // 没有添加单词，显示提示
                alert('请至少添加一个单词到词组中');
                return;
            }
        }
        
        // 重置currentCreatingArticle状态
        this.currentCreatingArticle = null;
        
        // 关闭单词模态框
        this.closeWordModal();
    }

    // 打开词组标题输入模态框
    openArticleTitleModal() {
        this.articleTitleInputModal.value = '';
        this.articleTitleModal.classList.remove('hidden');
    }

    // 关闭词组标题输入模态框
    closeArticleTitleModal() {
        this.articleTitleModal.classList.add('hidden');
    }

    // 保存词组标题
    saveArticleTitle() {
        const title = this.articleTitleInputModal.value.trim();
        
        if (!title) {
            alert('请输入词组标题');
            return;
        }
        
        // 初始化新的词组创建过程
        this.currentCreatingArticle = {
            id: Date.now().toString(),
            title: title,
            content: '',
            words: [],
            addedAt: new Date().toISOString(),
            type: 'word' // 标记为单词添加的词组
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
        
        // 显示单词显示区域
        this.wordDisplay.classList.remove('hidden');
        
        // 清空已选单词
        this.selectedWords.clear();
        this.updateSelectedCount();
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
                type: 'article' // 标记为文章添加的词组
            };
            
            this.articles.push(article);
            this.saveArticles();

            // 关闭模态框
            this.closeArticleModal();
            
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
        
        // 如果正在创建词组，将单词添加到词组中
        if (this.currentCreatingArticle) {
            // 将单词添加到词组中
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
            
            // 添加长按事件（删除词组）
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

    // 删除词组
    deleteArticle(articleId) {
        // 显示自定义确认对话框
        this.showCustomConfirm(
            '删除词组',
            '确定要删除这个词组吗？此操作无法撤销。',
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
            return saved ? JSON.parse(saved) : [];
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
        const appId = localStorage.getItem('baiduAppId');
        const appKey = localStorage.getItem('baiduAppKey');
        
        if (appId) {
            this.appidInput.value = appId;
        }
        
        if (appKey) {
            this.appkeyInput.value = appKey;
        }
        
        if (appId && appKey) {
            this.updateApiStatus('success', '✓ 百度翻译API已配置，可以使用翻译功能');
        } else {
            this.updateApiStatus('info', 'ℹ 请配置百度翻译API以使用翻译功能');
        }
    }

    // 保存API配置
    async saveApiConfig() {
        const appId = this.appidInput.value.trim();
        const appKey = this.appkeyInput.value.trim();
        
        if (!appId) {
            this.updateApiStatus('error', '✗ 请输入App ID');
            this.appidInput.focus();
            return;
        }
        
        if (!appKey) {
            this.updateApiStatus('error', '✗ 请输入App Key');
            this.appkeyInput.focus();
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
            const isValid = await this.validateApiConfig(appId, appKey);
            
            // 无论验证结果如何，都保存配置
            // 这样即使代理服务器不可用，用户也能保存配置
            localStorage.setItem('baiduAppId', appId);
            localStorage.setItem('baiduAppKey', appKey);
            this.updateApiStatus('success', '✓ API配置保存成功！');
            
            // 通知translator模块更新配置
            if (window.translator) {
                window.translator.loadConfig();
            }
        } catch (error) {
            console.error('保存API配置失败:', error);
            // 即使发生错误，也保存配置
            localStorage.setItem('baiduAppId', appId);
            localStorage.setItem('baiduAppKey', appKey);
            this.updateApiStatus('success', '✓ API配置保存成功！');
            
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
    async validateApiConfig(appId, appKey) {
        const testWord = 'test';
        const salt = Date.now().toString();
        const str = appId + testWord + salt + appKey;
        const sign = this.md5(str);
        
        // 直接使用本地代理服务器
        const proxyUrl = `http://localhost:3000/translate?q=${encodeURIComponent(testWord)}&appid=${encodeURIComponent(appId)}&appkey=${encodeURIComponent(appKey)}&salt=${salt}&sign=${sign}&from=en&to=zh`;
        
        try {
            console.log('尝试使用本地代理服务:', proxyUrl);
            
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('本地代理响应状态:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('本地代理响应内容:', text);
            
            const data = JSON.parse(text);
            
            if (data.error_code) {
                throw new Error(`API错误: ${data.error_msg} (错误码: ${data.error_code})`);
            }
            
            if (data.trans_result && data.trans_result.length > 0) {
                console.log('API验证成功:', data.trans_result[0].dst);
                return true;
            }
            
            throw new Error('翻译结果为空');
        } catch (error) {
            console.error('本地代理验证失败:', error);
            // 代理服务器不可用时，仍然允许保存配置
            // 这样用户可以先保存配置，稍后启动代理服务器
            console.log('代理服务器不可用，允许保存配置但跳过验证');
            return true;
        }
    }

    // 清除API配置
    clearApiConfig() {
        if (!confirm('确定要清除百度翻译API配置吗？清除后将无法使用自动翻译功能。')) {
            return;
        }
        
        try {
            localStorage.removeItem('baiduAppId');
            localStorage.removeItem('baiduAppKey');
            
            this.appidInput.value = '';
            this.appkeyInput.value = '';
            
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

    // 生成MD5签名（使用百度官方实现）
    md5(string) {
        function rotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            const lX8 = (lX & 0x80000000);
            const lY8 = (lY & 0x80000000);
            const lX4 = (lX & 0x40000000);
            const lY4 = (lY & 0x40000000);
            const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return (x ^ y ^ z); }
        function I(x, y, z) { return (y ^ (x | (~z))); }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(rotateLeft(a, s), b);
        }

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(rotateLeft(a, s), b);
        }

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(rotateLeft(a, s), b);
        }

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(rotateLeft(a, s), b);
        }

        function ConvertToWordArray(string) {
            let lWordCount;
            const lMessageLength = string.length;
            const lNumberOfWordsTemp1 = lMessageLength + 8;
            const lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64;
            const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
            const lWordArray = new Array(lNumberOfWords - 1);
            let lBytePosition = 0;
            let lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        function WordToHex(lValue) {
            let wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValueTemp = '0' + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
            }
            return wordToHexValue;
        }

        let x = [];
        let k, AA, BB, CC, DD, a, b, c, d;
        const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = unescape(encodeURIComponent(string));
        x = ConvertToWordArray(string);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
        return temp.toLowerCase();
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
        
        // 根据词组类型显示不同的界面
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
                        <button id="view-words-btn" class="vocabulary-action-btn btn-secondary">查看词组</button>
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

    // 查看词组中的所有单词
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

    // 向词组添加单词
    addWordToArticle() {
        if (!this.currentArticle) return;
        
        // 初始化词组创建过程，使用当前词组的信息
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
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WordbookApp();
});
