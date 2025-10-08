document.addEventListener('DOMContentLoaded', () => {
    // --- TEMPLATE ДЛЯ HEADER ---
    const headerTemplate = `
        <div class="container mx-auto flex justify-between items-center">
            <a href="index.html" class="flex items-center gap-3">
                <img src="../images/makeurdaylogo.png" alt="Logo" class="h-10 w-10 md:h-12 md:w-12 object-contain">
                <span class="text-2xl font-bold tracking-wider main-gradient-text">MakeYourDay</span>
            </a>
            <div class="flex items-center gap-2 md:gap-4">
                 <a href="leaderboard.html" class="hidden md:flex items-center gap-2 glass-card-footer px-3 py-2 rounded-lg hover:bg-slate-700/80 transition-colors" data-key="leaderboardsBtn">
                    <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                    <span class="text-sm">Leaderboards</span>
                </a>
                <div id="auth-buttons" class="hidden items-center gap-2">
                    <a href="auth.html?mode=login" class="px-4 py-2 text-sm font-medium hover:text-pink-400 transition-colors" data-key="loginBtn">Войти</a>
                    <a href="auth.html?mode=register" class="shine-button bg-pink-600 text-white font-bold py-2 px-5 rounded-full text-sm transition-all duration-300 hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-600/50" data-key="registerBtn">Регистрация</a>
                </div>
                <div id="user-profile" class="hidden items-center gap-3 glass-card-footer p-2 rounded-lg">
                    <a href="account.html" class="flex items-center gap-2 text-right p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                        <div>
                            <span id="profile-username" class="font-bold text-white block text-sm">Username</span>
                            <span id="profile-plan" class="text-xs uppercase font-bold bg-clip-text text-transparent premium-gradient-text">Free Plan</span>
                        </div>
                        <img id="profile-avatar-icon" src="../images/default-avatar.png" class="w-8 h-8 rounded-full object-cover border-2 border-slate-600">
                    </a>
                    <button id="logout-btn" title="Выйти" class="p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                        <i data-lucide="log-out" class="w-5 h-5 text-slate-400 hover:text-white transition-colors"></i>
                    </button>
                </div>
                <div id="theme-switcher-container" class="relative hidden">
                     <button id="theme-switcher-btn" class="glass-card-footer p-2 rounded-lg hover:bg-slate-700/80 transition-colors" title="Сменить тему">
                        <i data-lucide="palette" class="w-5 h-5"></i>
                     </button>
                </div>
                <div id="lang-selector" class="relative">
                    <button id="lang-button" class="flex items-center gap-2 glass-card-footer px-3 py-2 rounded-lg hover:bg-slate-700/80 transition-colors">
                        <i data-lucide="globe" class="w-5 h-5"></i>
                        <span id="current-lang-text" class="text-sm">RU</span>
                        <i data-lucide="chevron-down" id="lang-chevron" class="w-4 h-4 transition-transform duration-300"></i>
                    </button>
                    <div id="lang-dropdown" class="absolute top-full right-0 mt-2 w-32 glass-card-footer rounded-lg overflow-hidden hidden transition-all duration-300 transform origin-top-right scale-95 opacity-0 z-30">
                        <a href="#" class="lang-option block px-4 py-2 text-sm text-white hover:bg-slate-700/80" data-lang="ru">Русский</a>
                        <a href="#" class="lang-option block px-4 py-2 text-sm text-white hover:bg-slate-700/80" data-lang="en">English</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- DATABASE ---
    const quotes = {
        free: {
            motivation: [
                { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
                { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
                { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
                { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
            ],
            life: [
                { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
                { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
                { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
                { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
                { quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" }
            ],
            success: [
                { quote: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
                { quote: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
                { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
                { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
                { quote: "Success is not in what you have, but who you are.", author: "Bo Bennett" }
            ]
        },
        premium: {
            wisdom: [
                { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
                { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
                { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
                { quote: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" }
            ],
            leadership: [
                { quote: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
                { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { quote: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", author: "Ronald Reagan" }
            ],
            ai_wisdom: [
                { quote: "The currency of the future is not data, but the wisdom to interpret it correctly.", author: "AI Oracle" },
                { quote: "Logic is the framework, but creativity is the spark that illuminates the unknown.", author: "AI Oracle" },
                { quote: "Empathy, a human trait, is the most complex algorithm an AI strives to understand.", author: "AI Oracle" },
                { quote: "In the symphony of existence, every data point has its note to play.", author: "AI Oracle" }
            ]
        }
    };

    // --- ИИ ДЛЯ DAILY SPARK ---
    const sparkTemplates = {
        creative: [
            "Нарисуй что-то, что представляет твое текущее настроение",
            "Напиши короткое стихотворение о чем-то, что тебя вдохновляет",
            "Создай коллаж из фотографий, которые вызывают у тебя радость",
            "Придумай метафору для своего сегодняшнего дня"
        ],
        health: [
            "Сделай 10 приседаний прямо сейчас",
            "Выпей стакан воды и почувствуй, как организм говорит 'спасибо'",
            "Сделай 5-минутную растяжку, даже если ты за компьютером",
            "Пройдись по комнате, представляя, что ты идешь по пляжу"
        ],
        learning: [
            "Посмотри 5-минутное образовательное видео на тему, которую не знаешь",
            "Прочитай статью о чем-то совершенно новом для тебя",
            "Изучи три интересных факта о космосе",
            "Узнай что-то новое о культуре другой страны"
        ],
        mindfulness: [
            "Закрой глаза на 60 секунд и сосредоточься только на своем дыхании",
            "Опиши 5 вещей, которые ты видишь, 4 которые слышишь, 3 которые чувствуешь",
            "Поблагодари мысленно трех людей, которые сделали твой день лучше",
            "Представь свой идеальный день через 5 лет в деталях"
        ],
        social: [
            "Сделай комплимент незнакомцу в социальной сети",
            "Напиши сообщение другу, с которым давно не общался",
            "Поделись чем-то вдохновляющим в своих соцсетях",
            "Позвони родственнику и просто спроси, как его дела"
        ]
    };

    // --- ЦВЕТА ДЛЯ ЦИТАТ ---
    const quoteColors = [
        'quote-color-red', 'quote-color-blue', 'quote-color-green', 
        'quote-color-purple', 'quote-color-orange', 'quote-color-pink', 
        'quote-color-teal', 'quote-color-amber'
    ];

    // --- TRANSLATIONS ---
    const translations = { 
        ru: { 
            title: "Сделай Свой День - Мотивационные Цитаты", 
            subtitle: "Ваша дневная доза вдохновения", 
            initialQuote: "Нажмите кнопку ниже, чтобы получить свою первую цитату!", 
            initialAuthor: "— Автор", 
            getQuoteBtn: "Получить Цитату", 
            loginPrompt: '<a href="auth.html?mode=login" class="underline hover:text-white">Войдите</a>, чтобы получать больше цитат.', 
            limitReached: "Вы достигли дневного лимита. Возвращайтесь через:", 
            getMoreQuotes: "Получить больше цитат", 
            footerFollow: "Подписывайтесь на нас", 
            leaderboardsBtn: "Таблицы лидеров", 
            loginBtn: "Войти", 
            registerBtn: "Регистрация", 
            logoutBtnTitle: "Выйти", 
            subHeaderTitle: "Выберите Ваш План", 
            subHeaderSubtitle: "Откройте полную силу ежедневного вдохновения.", 
            planFreeTitle: "Базовый", 
            planFreePrice: "Бесплатно", 
            planFreeDesc: "Начните свой путь с основ.", 
            planFreeFeat1: "3 случайные цитаты в день", 
            planFreeFeat2: "Стандартные категории", 
            planFreeFeat3: "Только текстовые цитаты", 
            planPremiumTitle: "Премиум", 
            planPremiumDesc: "Для тех, кто хочет больше мотивации.", 
            planPremiumFeat1: "До 20 цитат в день", 
            planPremiumFeat2: "5+ эксклюзивных категорий", 
            planPremiumFeat3: "Красивые цитаты с изображениями", 
            planPremiumFeat4: "Скачиваемые изображения", 
            planPremiumFeat5: "Сохраняйте любимые цитаты", 
            planVipTitle: "VIP", 
            planVipDesc: "Ультимативный персонализированный опыт.", 
            planVipFeat1: "Все из Премиум", 
            planVipFeat2: "Персонализированные цитаты на основе ИИ", 
            planVipFeat3: "Создавайте свои коллекции", 
            planVipFeat4: "Эксклюзивные темы", 
            subscribeBtn: "Подписаться", 
            currentPlanBtn: "Ваш План", 
            backToQuotes: "← Назад к цитатам", 
            authTitleLogin: "Вход в Аккаунт", 
            authTitleRegister: "Создать Аккаунт", 
            authSubtitleLogin: "С возвращением!", 
            authSubtitleRegister: "Присоединяйся к нам!", 
            authNicknameLabel: "Никнейм", 
            authPasswordLabel: "Пароль", 
            authSubmitLogin: "Войти", 
            authSubmitRegister: "Зарегистрироваться", 
            authToggleToRegister: "Нет аккаунта? <a href=\"auth.html?mode=register\" class=\"font-medium text-pink-400 hover:text-pink-300\">Зарегистрироваться</a>", 
            authToggleToLogin: "Уже есть аккаунт? <a href=\"auth.html?mode=login\" class=\"font-medium text-pink-400 hover:text-pink-300\">Войти</a>", 
            accountTitle: "Личный Кабинет", 
            welcomeMessage: "Добро пожаловать, ", 
            profileHeader: "Профиль", 
            nicknameLabel: "Никнейм:", 
            planLabel: "План:", 
            changePlanBtn: "Сменить План", 
            saveProfileBtn: "Сохранить", 
            statsHeader: "Статистика", 
            quotesViewedLabel: "Просмотрено цитат:", 
            rateProjectHeader: "Оцените Проект", 
            rateProjectText: "Нам важно ваше мнение!", 
            rateProjectBtn: "Оценить", 
            favoritesHeader: "Избранные Цитаты", 
            viewAllBtn: "Смотреть все", 
            favoritesPageTitle: "Избранные Цитаты", 
            favoritesPageSubtitle: "Твоя личная коллекция вдохновения", 
            leaderboardTitle: "Таблицы Лидеров", 
            leaderboardSubtitle: "Посмотрите, кто лидирует в чартах вдохновения.", 
            liveLeaderboardTitle: "Сейчас онлайн", 
            quoteLeaderboardTitle: "Топ-100 по цитатам", 
            loading: "Загрузка...", 
            feedbackTitle: "Оцените Приложение", 
            feedbackSubtitle: "Ваш отзыв поможет нам стать лучше.", 
            feedbackSubmitBtn: "Отправить Оценку", 
            feedbackSending: "Отправка...", 
            feedbackThanks: "Спасибо за вашу оценку!", 
            feedbackError: "Ошибка отправки. Попробуйте позже.", 
            feedbackSelectRating: "Пожалуйста, выберите оценку.", 
            noFavoritesMsg1: "Ты еще не сохранил ни одной цитаты.", 
            noFavoritesMsg2: 'Нажми на иконку <a href="index.html" class="underline text-pink-400 hover:text-pink-300">❤️ на главной странице</a>, чтобы добавить.', 
            sparkTitle: "Искра Дня", 
            sparkDoneBtn: "Сделано!", 
            sparkCompleted: "только что выполнил(а) Искру Дня!",
            aiSparkTitles: {
                creative: "🎨 Творческая искра",
                health: "💪 Здоровая привычка", 
                learning: "📚 Минутка знаний",
                mindfulness: "🧘 Осознанность",
                social: "👥 Социальное действие"
            }
        }, 
        en: { 
            title: "Make Your Day - Motivational Quotes", 
            subtitle: "Your daily dose of inspiration", 
            initialQuote: "Click the button below to get your first quote!", 
            initialAuthor: "— Author", 
            getQuoteBtn: "Get Your Quote", 
            loginPrompt: '<a href="auth.html?mode=login" class="underline hover:text-white">Log in</a> to get more quotes.', 
            limitReached: "You have reached your daily limit. Come back in:", 
            getMoreQuotes: "Get more quotes", 
            footerFollow: "Follow Us", 
            leaderboardsBtn: "Leaderboards", 
            loginBtn: "Login", 
            registerBtn: "Register", 
            logoutBtnTitle: "Logout", 
            subHeaderTitle: "Choose Your Plan", 
            subHeaderSubtitle: "Unlock the full power of daily inspiration.", 
            planFreeTitle: "Basic", 
            planFreePrice: "Free", 
            planFreeDesc: "Start your journey with the essentials.", 
            planFreeFeat1: "3 random quotes per day", 
            planFreeFeat2: "Standard categories", 
            planFreeFeat3: "Text-only quotes", 
            planPremiumTitle: "Premium", 
            planPremiumDesc: "For those who want more motivation.", 
            planPremiumFeat1: "Up to 20 quotes per day", 
            planPremiumFeat2: "5+ exclusive categories", 
            planPremiumFeat3: "Beautiful image quotes", 
            planPremiumFeat4: "Downloadable images", 
            planPremiumFeat5: "Save favorite quotes", 
            planVipTitle: "VIP", 
            planVipDesc: "The ultimate personalized experience.", 
            planVipFeat1: "Everything in Premium", 
            planVipFeat2: "AI-powered personalized quotes", 
            planVipFeat3: "Create your own collections", 
            planVipFeat4: "Exclusive themes", 
            subscribeBtn: "Subscribe", 
            currentPlanBtn: "Current Plan", 
            backToQuotes: "← Back to quotes", 
            authTitleLogin: "Login to Your Account", 
            authTitleRegister: "Create an Account", 
            authSubtitleLogin: "Welcome back!", 
            authSubtitleRegister: "Join us!", 
            authNicknameLabel: "Nickname", 
            authPasswordLabel: "Password", 
            authSubmitLogin: "Login", 
            authSubmitRegister: "Register", 
            authToggleToRegister: "No account? <a href=\"auth.html?mode=register\" class=\"font-medium text-pink-400 hover:text-pink-300\">Register</a>", 
            authToggleToLogin: "Already have an account? <a href=\"auth.html?mode=login\" class=\"font-medium text-pink-400 hover:text-pink-300\">Login</a>", 
            accountTitle: "Personal Account", 
            welcomeMessage: "Welcome, ", 
            profileHeader: "Profile", 
            nicknameLabel: "Nickname:", 
            planLabel: "Plan:", 
            changePlanBtn: "Change Plan", 
            saveProfileBtn: "Save Profile", 
            statsHeader: "Statistics", 
            quotesViewedLabel: "Quotes viewed:", 
            rateProjectHeader: "Rate the Project", 
            rateProjectText: "Your opinion is important to us!", 
            rateProjectBtn: "Rate", 
            favoritesHeader: "Favorite Quotes", 
            viewAllBtn: "View All", 
            favoritesPageTitle: "Favorite Quotes", 
            favoritesPageSubtitle: "Your personal collection of inspiration", 
            leaderboardTitle: "Leaderboards", 
            leaderboardSubtitle: "See who's leading the inspiration charts.", 
            liveLeaderboardTitle: "Live Leaderboard", 
            quoteLeaderboardTitle: "Top 100 Quote Readers", 
            loading: "Loading...", 
            feedbackTitle: "Rate Our App", 
            feedbackSubtitle: "Your feedback helps us improve.", 
            feedbackSubmitBtn: "Submit Rating", 
            feedbackSending: "Sending...", 
            feedbackThanks: "Thanks for your rating!", 
            feedbackError: "Submission error. Please try again.", 
            feedbackSelectRating: "Please select a rating.", 
            noFavoritesMsg1: "You haven't saved any quotes yet.", 
            noFavoritesMsg2: 'Click the <a href="index.html" class="underline text-pink-400 hover:text-pink-300">❤️ icon on the main page</a> to add one.', 
            sparkTitle: "Daily Spark", 
            sparkDoneBtn: "Done!", 
            sparkCompleted: "just completed the Daily Spark!",
            aiSparkTitles: {
                creative: "🎨 Creative Spark",
                health: "💪 Healthy Habit",
                learning: "📚 Learning Moment", 
                mindfulness: "🧘 Mindfulness",
                social: "👥 Social Action"
            }
        }, 
    };

    // --- APP STATE & DOM ELEMENTS ---
    let currentUser = null;
    let currentQuote = {};
    let countdownInterval;
    let usedQuotes = new Set(); // Для отслеживания использованных цитат
    const PLAN_LIMITS = { free: 3, premium: 20, vip: Infinity, guest: 3 };
    const THEMES = ['default', 'cyberpunk'];
    let musicState = { playing: false, currentTime: 0 };

    // --- USER & DATA MANAGEMENT ---
    function getUsersDB() { return JSON.parse(localStorage.getItem('makeYourDayUsers')) || {}; }
    function saveUsersDB(db) { localStorage.setItem('makeYourDayUsers', JSON.stringify(db)); }
    
    function getCurrentUser() {
        const username = localStorage.getItem('makeYourDayCurrentUser');
        if (!username) return null;
        const usersDB = getUsersDB();
        const user = usersDB[username];
        if (user) {
            user.favorites = user.favorites || [];
            user.theme = user.theme || 'default';
            user.lang = user.lang || 'ru';
            user.quotesViewed = user.quotesViewed || 0;
            user.usage = user.usage || { date: new Date().toISOString().split('T')[0], count: 0 };
            user.avatar = user.avatar || '../images/default-avatar.png';
            user.bio = user.bio || '';
            user.lastSparkDate = user.lastSparkDate || null;
        }
        return user ? { username, ...user } : null;
    }
    
    function saveCurrentUser() {
        if (!currentUser) return;
        const usersDB = getUsersDB();
        if (usersDB[currentUser.username]) {
             usersDB[currentUser.username] = { 
                password: currentUser.password, 
                plan: currentUser.plan, 
                lang: currentUser.lang, 
                favorites: currentUser.favorites, 
                theme: currentUser.theme, 
                avatar: currentUser.avatar, 
                bio: currentUser.bio, 
                quotesViewed: currentUser.quotesViewed, 
                usage: currentUser.usage, 
                createdAt: currentUser.createdAt, 
                lastSparkDate: currentUser.lastSparkDate
            };
            saveUsersDB(usersDB);
        }
    }

    // --- ICON MANAGEMENT ---
    function initializeIcons() { if (window.lucide) { lucide.createIcons(); } }

    // --- МУЗЫКА МЕЖДУ СТРАНИЦАМИ ---
    function setupGlobalMusic() {
        const savedMusicState = localStorage.getItem('makeYourDayMusicState');
        if (savedMusicState) {
            musicState = JSON.parse(savedMusicState);
        }

        const musicToggleBtn = document.getElementById('music-toggle-btn');
        const lofiAudio = document.getElementById('lofi-audio');
        
        if (musicToggleBtn && lofiAudio) {
            // Восстанавливаем состояние музыки
            if (musicState.playing) {
                lofiAudio.currentTime = musicState.currentTime;
                lofiAudio.play().catch(e => console.log("Music autoplay blocked"));
                musicToggleBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
                musicToggleBtn.classList.add('playing');
            }

            musicToggleBtn.addEventListener('click', () => {
                const isPlaying = !lofiAudio.paused;
                if (isPlaying) {
                    lofiAudio.pause();
                    musicToggleBtn.innerHTML = '<i data-lucide="play" class="w-6 h-6"></i>';
                    musicToggleBtn.classList.remove('playing');
                    musicState.playing = false;
                } else {
                    lofiAudio.play().catch(error => {
                        console.log("Для автозапуска музыки нужно сначала кликнуть на странице.");
                    });
                    musicToggleBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
                    musicToggleBtn.classList.add('playing');
                    musicState.playing = true;
                }
                localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
                lucide.createIcons();
            });

            // Сохраняем текущее время каждые 5 секунд
            setInterval(() => {
                if (!lofiAudio.paused) {
                    musicState.currentTime = lofiAudio.currentTime;
                    localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
                }
            }, 5000);

            // Для разблокировки автовоспроизведения
            document.body.addEventListener('click', () => {
                if (lofiAudio.paused && musicState.playing) {
                    lofiAudio.play().catch(e => {});
                }
            }, { once: true });
        }
    }

    // --- UI & THEME ---
    function renderHeader() {
        const headerContainer = document.getElementById('main-header');
        if (!headerContainer) return;
        headerContainer.innerHTML = headerTemplate;
        
        const authButtons = headerContainer.querySelector('#auth-buttons');
        const userProfile = headerContainer.querySelector('#user-profile');
        
        if (currentUser) {
            userProfile.classList.remove('hidden');
            userProfile.classList.add('flex');
            userProfile.querySelector('#profile-username').textContent = currentUser.username;
            userProfile.querySelector('#profile-plan').textContent = `${currentUser.plan} Plan`;
            userProfile.querySelector('#profile-avatar-icon').src = currentUser.avatar;

            userProfile.querySelector('#logout-btn').addEventListener('click', () => {
                localStorage.removeItem('makeYourDayCurrentUser');
                window.location.href = 'index.html';
            });
            
            if (currentUser.plan === 'vip') {
                const themeSwitcher = headerContainer.querySelector('#theme-switcher-container');
                if(themeSwitcher) {
                    themeSwitcher.classList.remove('hidden');
                    themeSwitcher.querySelector('#theme-switcher-btn').addEventListener('click', toggleTheme);
                }
            }
        } else {
            authButtons.classList.remove('hidden');
            authButtons.classList.add('flex');
        }
        attachLangSwitcherListeners(headerContainer);
    }

    function applyTheme(theme) {
        document.body.className = 'bg-slate-900 text-white overflow-x-hidden';
        if (theme && theme !== 'default') { document.body.classList.add(`theme-${theme}`); }
    }
    
    function toggleTheme() {
        if (!currentUser || currentUser.plan !== 'vip') return;
        const currentThemeIndex = THEMES.indexOf(currentUser.theme || 'default');
        const nextThemeIndex = (currentThemeIndex + 1) % THEMES.length;
        currentUser.theme = THEMES[nextThemeIndex];
        applyTheme(currentUser.theme);
        saveCurrentUser();
    }

    function setLanguage(lang) {
        const langPack = translations[lang] || translations['ru'];
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (langPack[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if(el.type === 'submit' || el.type === 'button') el.value = langPack[key];
                    else el.placeholder = langPack[key];
                } else { el.innerHTML = langPack[key]; }
            }
        });
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) currentLangText.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;
        if (currentUser) { currentUser.lang = lang; saveCurrentUser(); }
        displayDailySpark();
    }

    function attachLangSwitcherListeners(container) {
        const langButton = container.querySelector('#lang-button');
        const langDropdown = container.querySelector('#lang-dropdown');
        if(!langButton || !langDropdown) return;
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = langDropdown.classList.contains('hidden');
             if (isHidden) {
                langDropdown.classList.remove('hidden');
                setTimeout(() => { langDropdown.classList.remove('opacity-0', 'scale-95'); }, 10);
            } else {
                 langDropdown.classList.add('opacity-0', 'scale-95');
                 setTimeout(() => langDropdown.classList.add('hidden'), 300);
            }
        });
        container.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                setLanguage(e.target.dataset.lang);
                langDropdown.classList.add('opacity-0', 'scale-95');
                setTimeout(() => langDropdown.classList.add('hidden'), 300);
            });
        });
        document.addEventListener('click', (e) => {
            if (langDropdown && !langDropdown.classList.contains('hidden') && !langButton.contains(e.target) && !langDropdown.contains(e.target)) {
                 langDropdown.classList.add('opacity-0', 'scale-95');
                 setTimeout(() => langDropdown.classList.add('hidden'), 300);
            }
        });
    }

    // --- РАЗНОЦВЕТНЫЕ ЦИТАТЫ ---
    function getRandomColorClass() {
        return quoteColors[Math.floor(Math.random() * quoteColors.length)];
    }

    function applyRandomQuoteColor() {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        const colorClass = getRandomColorClass();
        
        if (quoteText) {
            quoteText.classList.remove(...quoteColors);
            quoteText.classList.add(colorClass, 'quote-color-transition');
        }
        if (quoteAuthor) {
            quoteAuthor.classList.remove(...quoteColors);
            quoteAuthor.classList.add(colorClass, 'quote-color-transition');
        }
    }

    // --- SUBSCRIPTION, USAGE, QUOTE LOGIC ---
    function handleSubscription(newPlan) {
        if (!currentUser) return;
        currentUser.plan = newPlan;
        currentUser.usage = { date: new Date().toISOString().split('T')[0], count: 0 };
        saveCurrentUser();
        alert(`Поздравляем! Вы успешно перешли на план ${newPlan.toUpperCase()}!`);
        window.location.href = 'account.html';
    }

    function checkUsage() {
        if (!currentUser) {
            const guestUsage = JSON.parse(localStorage.getItem('guestUsage')) || { date: new Date().toISOString().split('T')[0], count: 0 };
            const today = new Date().toISOString().split('T')[0];
            if (guestUsage.date !== today) {
                guestUsage.date = today;
                guestUsage.count = 0;
                localStorage.setItem('guestUsage', JSON.stringify(guestUsage));
            }
            return guestUsage;
        }
        const today = new Date().toISOString().split('T')[0];
        if (!currentUser.usage || currentUser.usage.date !== today) {
            currentUser.usage = { date: today, count: 0 };
            saveCurrentUser();
        }
        return currentUser.usage;
    }

    function updateUsage() {
        const usage = checkUsage();
        usage.count++;
        if (currentUser) {
            currentUser.quotesViewed = (currentUser.quotesViewed || 0) + 1;
            currentUser.usage = usage;
            saveCurrentUser();
        } else {
            localStorage.setItem('guestUsage', JSON.stringify(usage));
        }
    }

    function isLimitReached() {
        const plan = currentUser ? currentUser.plan : 'guest';
        const limit = PLAN_LIMITS[plan];
        return checkUsage().count >= limit;
    }

    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        const countdownTimer = document.getElementById('countdown-timer');
        if (!countdownTimer) return;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        function updateTimer() {
            const msLeft = tomorrow - new Date();
            if (msLeft <= 0) {
                countdownTimer.textContent = "00:00:00";
                clearInterval(countdownInterval);
                updateButtonState();
                return;
            }
            const hours = Math.floor(msLeft / 3600000);
            const minutes = Math.floor((msLeft % 3600000) / 60000);
            const seconds = Math.floor((msLeft % 60000) / 1000);
            countdownTimer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function updateButtonState() {
        const btn = document.getElementById('new-quote-btn');
        const limitMsg = document.getElementById('limit-message');
        const loginPrmpt = document.getElementById('login-prompt');
        if (!btn) return;
        if (isLimitReached()) {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            if (currentUser) {
                if (limitMsg) limitMsg.classList.remove('hidden');
                startCountdown();
            } else {
                if (loginPrmpt) loginPrmpt.classList.remove('hidden');
                btn.classList.add('hidden');
            }
        } else {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed', 'hidden');
            if (limitMsg) limitMsg.classList.add('hidden');
            if (loginPrmpt) loginPrmpt.classList.add('hidden');
            if (countdownInterval) clearInterval(countdownInterval);
        }
    }

    // --- УЛУЧШЕННАЯ ГЕНЕРАЦИЯ ЦИТАТ БЕЗ ПОВТОРОВ ---
    function getNewQuote() {
        const plan = currentUser ? currentUser.plan : 'guest';
        let categories = { ...quotes.free };
        if (['premium', 'vip'].includes(plan)) { 
            categories = { ...categories, ...quotes.premium }; 
        }
        
        const allQuotes = Object.values(categories).flat();
        
        // Фильтруем использованные цитаты
        const availableQuotes = allQuotes.filter(quote => !usedQuotes.has(quote.quote));
        
        // Если все цитаты использованы, очищаем историю
        if (availableQuotes.length === 0) {
            usedQuotes.clear();
            return allQuotes[Math.floor(Math.random() * allQuotes.length)];
        }
        
        const newQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        usedQuotes.add(newQuote.quote);
        return newQuote;
    }

    function displayNewQuote() {
        if (isLimitReached()) { 
            updateButtonState(); 
            return; 
        }
        
        updateUsage();
        currentQuote = getNewQuote();
        const quoteCardInner = document.getElementById('quote-card-inner');
        
        if (quoteCardInner) quoteCardInner.classList.add('is-flipping');
        
        setTimeout(() => {
            document.getElementById('quote-text').textContent = currentQuote.quote;
            document.getElementById('quote-author').textContent = `— ${currentQuote.author}`;
            
            applyRandomQuoteColor(); // Применяем случайный цвет
            
            if (currentUser) updateFavoriteButtonUI();
            updateQuoteCardBackground();
            
            if (quoteCardInner) quoteCardInner.classList.remove('is-flipping');
            updateButtonState();
        }, 350);
    }

    function updateQuoteCardBackground() {
        const card = document.getElementById('quote-card');
        if (!card) return;
        let overlay = card.querySelector('.image-quote-overlay');
        if (currentUser && ['premium', 'vip'].includes(currentUser.plan)) {
            card.style.backgroundImage = `url(https://picsum.photos/1200/675?random=${Date.now()})`;
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'image-quote-overlay';
                card.prepend(overlay);
            }
        } else {
            card.style.backgroundImage = '';
            if (overlay) overlay.remove();
        }
    }

    function downloadQuoteAsImage() {
        const canvas = document.getElementById('quote-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const { quote, author } = currentQuote;
        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else { line = testLine; }
            }
            context.fillText(line, x, y);
        }
        const card = document.getElementById('quote-card');
        const hasImageBg = card.style.backgroundImage && card.style.backgroundImage !== 'none';
        if (hasImageBg) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = card.style.backgroundImage.slice(5, -2);
            img.onload = () => { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); drawTextAndDownload(); };
            img.onerror = () => { drawGradientBackground(); drawTextAndDownload(); };
        } else {
            drawGradientBackground();
            drawTextAndDownload();
        }
        function drawGradientBackground() {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#1e1b4b');
            gradient.addColorStop(1, '#4c1d95');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        function drawTextAndDownload() {
            ctx.fillStyle = 'rgba(10, 2, 20, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 52px Inter, sans-serif';
            ctx.fillStyle = '#ffffff';
            wrapText(ctx, `"${quote}"`, canvas.width / 2, canvas.height / 2 - 50, canvas.width - 150, 65);
            ctx.font = 'italic 40px "Playfair Display", serif';
            ctx.fillStyle = '#f472b6';
            ctx.fillText(`— ${author}`, canvas.width / 2, canvas.height / 2 + 150);
            ctx.font = '24px Inter, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText('MakeYourDay', canvas.width / 2, canvas.height - 40);
            const link = document.createElement('a');
            link.download = `makeyourday-quote.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    }

    function toggleFavorite() {
        if (!currentUser || !currentQuote || !currentQuote.quote) return;
        const index = currentUser.favorites.findIndex(f => f.quote === currentQuote.quote);
        if (index > -1) { currentUser.favorites.splice(index, 1); } else { currentUser.favorites.push({...currentQuote}); }
        saveCurrentUser();
        updateFavoriteButtonUI();
    }

    function updateFavoriteButtonUI() {
        const favBtn = document.getElementById('favorite-quote-btn');
        if (!favBtn || !currentUser || !currentQuote || !currentQuote.quote) return;
        const isFav = currentUser.favorites.some(f => f.quote === currentQuote.quote);
        favBtn.classList.toggle('is-favorite', isFav);
    }

    function renderFavorites(limit = Infinity) {
        const container = document.getElementById('favorites-container');
        const noFavsMsg = document.getElementById('no-favorites-message');
        if (!container || !currentUser) return;
        container.innerHTML = '';
        const favoritesToRender = currentUser.favorites.slice().reverse().slice(0, limit);
        if (favoritesToRender.length === 0) {
            if (noFavsMsg) {
                const lang = currentUser.lang || 'ru';
                noFavsMsg.innerHTML = `<p>${translations[lang].noFavoritesMsg1}</p><p>${translations[lang].noFavoritesMsg2}</p>`;
                noFavsMsg.classList.remove('hidden');
            }
            return;
        }
        if (noFavsMsg) noFavsMsg.classList.add('hidden');
        favoritesToRender.forEach((fav) => {
            const originalIndex = currentUser.favorites.findIndex(item => item.quote === fav.quote);
            const card = document.createElement('div');
            card.className = 'favorite-card glass-card p-4 relative';
            card.innerHTML = `<blockquote class="text-lg mb-4">"${fav.quote}"</blockquote><footer class="text-right font-bold" style="color: var(--accent-brass);">— ${fav.author}</footer><button class="remove-fav-btn absolute top-3 right-3 text-slate-400 hover:text-red-400" data-index="${originalIndex}"><i data-lucide="trash-2" class="w-4 h-4"></i></button>`;
            container.appendChild(card);
        });
        container.querySelectorAll('.remove-fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.currentTarget.dataset.index, 10);
                currentUser.favorites.splice(indexToRemove, 1);
                saveCurrentUser();
                renderFavorites(limit);
            });
        });
        add3DTiltEffect();
        initializeIcons();
    }

    function renderQuoteLeaderboard() {
        const container = document.getElementById('quote-leaderboard');
        if (!container) return;
        const usersDB = getUsersDB();
        const sortedUsers = Object.entries(usersDB).map(([username, data]) => ({ username, ...data })).sort((a, b) => (b.quotesViewed || 0) - (a.quotesViewed || 0)).slice(0, 100);
        container.innerHTML = sortedUsers.map((user, index) => `<div class="leaderboard-item rank-${index + 1}"><span class="leaderboard-rank">#${index + 1}</span><img src="${user.avatar || '../images/default-avatar.png'}" class="leaderboard-avatar"><div class="leaderboard-info"><div class="leaderboard-name">${user.username}</div><p class="leaderboard-bio">${user.bio || 'No bio yet.'}</p></div><span class="leaderboard-score">${user.quotesViewed || 0}</span></div>`).join('');
    }

    function renderLiveLeaderboard() {
        const container = document.getElementById('live-leaderboard');
        if (!container) return;
        const usersDB = getUsersDB();
        const allUsernames = Object.keys(usersDB);
        if (allUsernames.length === 0) { container.innerHTML = `<p class="text-slate-400">No users online right now.</p>`; return; }
        const onlineCount = Math.min(allUsernames.length, Math.floor(Math.random() * 8) + 3);
        const onlineUsers = allUsernames.sort(() => 0.5 - Math.random()).slice(0, onlineCount);
        container.innerHTML = onlineUsers.map(username => { const user = usersDB[username]; return `<div class="leaderboard-item"><img src="${user.avatar || '../images/default-avatar.png'}" class="leaderboard-avatar w-10 h-10"><div class="leaderboard-info"><div class="leaderboard-name">${username}</div><p class="leaderboard-bio text-green-400 text-xs">is currently reading...</p></div></div>`; }).join('');
    }

    // --- УЛУЧШЕННАЯ DAILY SPARK С ИИ ---
    function generateAISpark() {
        const lang = currentUser?.lang || 'ru';
        const categories = Object.keys(sparkTemplates);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const templates = sparkTemplates[randomCategory];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        return {
            text: randomTemplate,
            category: randomCategory,
            title: translations[lang].aiSparkTitles[randomCategory]
        };
    }

    function displayDailySpark() {
        const sparkSection = document.getElementById('daily-spark-section');
        const sparkChallenge = document.getElementById('spark-challenge');
        const sparkTitle = document.querySelector('#daily-spark-section h2');
        const sparkDoneBtn = document.getElementById('spark-done-btn');
        
        if (!sparkSection || !currentUser) {
            if (sparkSection) sparkSection.classList.add('hidden');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (currentUser.lastSparkDate === today) {
            sparkSection.classList.add('hidden');
            return;
        }

        sparkSection.classList.remove('hidden');
        const spark = generateAISpark();
        
        if (sparkTitle) {
            sparkTitle.innerHTML = `<i data-lucide="sparkles" class="w-6 h-6"></i> <span>${spark.title}</span>`;
        }
        if (sparkChallenge) {
            sparkChallenge.textContent = spark.text;
            // Добавляем класс категории для стилизации
            sparkChallenge.className = `text-slate-300 mb-6 min-h-[50px] spark-category-${spark.category}`;
        }

        if (sparkDoneBtn) {
            sparkDoneBtn.disabled = false;
            sparkDoneBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }

        lucide.createIcons();
    }

    function handleSparkCompletion() {
        if (!currentUser) return;
        const today = new Date().toISOString().split('T')[0];
        currentUser.lastSparkDate = today;
        saveCurrentUser();
        const sparkDoneBtn = document.getElementById('spark-done-btn');
        if (sparkDoneBtn) {
            sparkDoneBtn.disabled = true;
            sparkDoneBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        showLiveFeedNotification();
    }

    // --- LIVE FEED LOGIC ---
    function showLiveFeedNotification() {
        const liveFeedContainer = document.getElementById('live-feed');
        if (!liveFeedContainer || !currentUser) return;
        const lang = currentUser.lang || 'ru';
        const completionText = translations[lang].sparkCompleted;
        const item = document.createElement('div');
        item.className = 'live-feed-item';
        item.innerHTML = `
            <img src="${currentUser.avatar || '../images/default-avatar.png'}" alt="avatar">
            <p><strong class="font-bold">${currentUser.username}</strong> ${completionText}</p>
            <i data-lucide="sparkles" class="spark-icon"></i>
        `;
        liveFeedContainer.prepend(item);
        lucide.createIcons();
        setTimeout(() => { item.remove(); }, 5000);
    }
    
    // --- 3D TILT EFFECT ---
    function add3DTiltEffect() {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -15;
                const rotateY = (x / width - 0.5) * 15;
                card.style.setProperty('--rotateX', `${rotateX}deg`);
                card.style.setProperty('--rotateY', `${rotateY}deg`);
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotateX', '0deg');
                card.style.setProperty('--rotateY', '0deg');
            });
        });
    }

    // --- INITIALIZATION ---
    function init() {
        currentUser = getCurrentUser();
        window.currentUser = currentUser;
        window.translations = translations;
        
        renderHeader();
        
        const userLang = currentUser?.lang || (navigator.language || 'ru').split('-')[0];
        setLanguage(userLang);
        
        applyTheme(currentUser?.theme || 'default');
        
        // Загружаем историю использованных цитат
        const savedUsedQuotes = localStorage.getItem('makeYourDayUsedQuotes');
        if (savedUsedQuotes) {
            usedQuotes = new Set(JSON.parse(savedUsedQuotes));
        }

        const pagePath = window.location.pathname;

        // Инициализация музыки на всех страницах
        setupGlobalMusic();

        if (pagePath.includes('index.html') || pagePath.endsWith('/')) {
            document.getElementById('new-quote-btn')?.addEventListener('click', displayNewQuote);
            document.getElementById('spark-done-btn')?.addEventListener('click', handleSparkCompletion);
            displayDailySpark();
            
            if (currentUser) {
                const actionsContainer = document.getElementById('quote-actions-container');
                if (actionsContainer) actionsContainer.classList.remove('hidden');
                
                const favBtn = document.getElementById('favorite-quote-btn');
                if (favBtn) { 
                    favBtn.classList.remove('hidden'); 
                    favBtn.addEventListener('click', toggleFavorite); 
                }
                
                const dlBtn = document.getElementById('download-quote-btn');
                if (dlBtn && ['premium', 'vip'].includes(currentUser.plan)) {
                    dlBtn.classList.remove('hidden');
                    dlBtn.addEventListener('click', downloadQuoteAsImage);
                }
            }
            updateButtonState();
        }

        if (pagePath.includes('account.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            document.getElementById('welcome-message').textContent = `${translations[userLang].welcomeMessage}${currentUser.username}!`;
            document.getElementById('user-nickname').textContent = currentUser.username;
            document.getElementById('user-plan').textContent = currentUser.plan;
            document.getElementById('quotes-viewed').textContent = currentUser.quotesViewed || 0;
            const avatarImg = document.getElementById('profile-avatar');
            const bioText = document.getElementById('user-bio');
            avatarImg.src = currentUser.avatar;
            bioText.value = currentUser.bio;
            document.getElementById('avatar-upload').addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => { avatarImg.src = event.target.result; };
                    reader.readAsDataURL(file);
                }
            });
            document.getElementById('save-profile-btn').addEventListener('click', () => {
                currentUser.avatar = avatarImg.src;
                currentUser.bio = bioText.value;
                saveCurrentUser();
                alert('Profile saved!');
                renderHeader();
            });
            renderFavorites(4);
        }
        
        if (pagePath.includes('subscribe.html')) {
             if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
             document.querySelectorAll('.subscribe-btn').forEach(button => {
                const plan = button.dataset.plan;
                if (plan === currentUser.plan) {
                    const card = document.getElementById(`plan-${plan}`);
                    card.classList.add('plan-highlight-border');
                    button.textContent = translations[userLang].currentPlanBtn;
                    button.disabled = true;
                    button.classList.add('opacity-60', 'cursor-not-allowed');
                }
                button.addEventListener('click', () => handleSubscription(plan));
             });
        }

        if (pagePath.includes('favorites.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            renderFavorites();
        }

        if (pagePath.includes('leaderboard.html')) {
            if (!currentUser) { window.location.href = 'auth.html?mode=login'; return; }
            renderQuoteLeaderboard();
            renderLiveLeaderboard();
            setInterval(renderLiveLeaderboard, 7000);
        }

        if (pagePath.includes('auth.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const mode = urlParams.get('mode') || 'register';
            const keyMap = {
                login: { title: 'authTitleLogin', subtitle: 'authSubtitleLogin', submit: 'authSubmitLogin', toggle: 'authToggleToRegister' },
                register: { title: 'authTitleRegister', subtitle: 'authSubtitleRegister', submit: 'authSubmitRegister', toggle: 'authToggleToLogin' }
            };
            const keys = keyMap[mode];
            document.getElementById('form-title').dataset.key = keys.title;
            document.getElementById('form-subtitle').dataset.key = keys.subtitle;
            document.getElementById('submit-btn').dataset.key = keys.submit;
            document.getElementById('toggle-mode').dataset.key = keys.toggle;
            document.querySelector('label[for="nickname"]').dataset.key = 'authNicknameLabel';
            document.querySelector('label[for="password"]').dataset.key = 'authPasswordLabel';
            setLanguage(userLang);
        }
        
        initializeIcons();
        add3DTiltEffect();

        // Сохраняем историю цитат при закрытии страницы
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('makeYourDayUsedQuotes', JSON.stringify([...usedQuotes]));
            localStorage.setItem('makeYourDayMusicState', JSON.stringify(musicState));
        });
    }

    init();
});