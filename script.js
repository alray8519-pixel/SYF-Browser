// ==========================================
// 1. Firebase Configuration & Initialization
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAk6UmlYdek_I7Jq5ZdRNVPJoyMmUArQeY",
    authDomain: "syf-browser.firebaseapp.com",
    projectId: "syf-browser",
    storageBucket: "syf-browser.firebasestorage.app",
    messagingSenderId: "458736540441",
    appId: "1:458736540441:web:2e7da0fbfec1e17f2b8388"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// البريد الإلكتروني المخصص للآدمن
const DEVELOPER_EMAIL = "admin@syfbrowser.com";

// ==========================================
// 2. DOM Elements Selection
// ==========================================
const mainView = document.getElementById('main-view');
const resultsView = document.getElementById('results-view');
const resultsContent = document.getElementById('results-content');
const resultsSearchInput = document.getElementById('results-search-input');
const resultsSearchBtn = document.getElementById('results-search-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const resultsHomeLogo = document.getElementById('results-home-logo');

const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const modalTitle = document.getElementById('modal-title');
const nameGroup = document.getElementById('name-group');
const usernameInput = document.getElementById('username-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const authToggleMsg = document.getElementById('auth-toggle-msg');

const userAvatarBtn = document.getElementById('user-avatar-btn');
const topUserAvatar = document.getElementById('top-user-avatar');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const cardUserAvatar = document.getElementById('card-user-avatar');
const cardUserName = document.getElementById('card-user-name');
const logoutBtn = document.getElementById('logout-btn');

const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsModal = document.getElementById('close-settings-modal');

const bgBtn = document.getElementById('bg-btn');
const bgFileInput = document.getElementById('bg-file-input');

const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeHistoryModal = document.getElementById('close-history-modal');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

const topDownloadsBtn = document.getElementById('top-downloads-btn');
const downloadsBtn = document.getElementById('downloads-btn');
const downloadsModal = document.getElementById('downloads-modal');
const closeDownloadsModal = document.getElementById('close-downloads-modal');
const downloadsList = document.getElementById('downloads-list');
const clearDownloadsBtn = document.getElementById('clear-downloads-btn');

const showDevBtn = document.getElementById('show-dev-btn');
const devModal = document.getElementById('dev-modal');
const closeDevModal = document.getElementById('close-dev-modal');

const adminMonitorBtn = document.getElementById('admin-monitor-btn');
const adminMonitorModal = document.getElementById('admin-monitor-modal');
const closeAdminMonitorModal = document.getElementById('close-admin-monitor-modal');
const adminSearchesList = document.getElementById('admin-searches-list');

const langToggleBtn = document.getElementById('lang-toggle-btn');
const langIndicator = document.getElementById('lang-indicator');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const addShortcutBtn = document.getElementById('add-shortcut-btn');
const shortcutModal = document.getElementById('shortcut-modal');
const closeShortcutModal = document.getElementById('close-shortcut-modal');
const shortcutForm = document.getElementById('shortcut-form');
const shortcutTitle = document.getElementById('shortcut-title');
const shortcutUrl = document.getElementById('shortcut-url');
const shortcutsGrid = document.getElementById('shortcuts-grid');

// الدعم الفني عبر واتساب (الرقم المحدث)
const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const closeSupportModal = document.getElementById('close-support-modal');
const supportForm = document.getElementById('support-form');
const supportMessageInput = document.getElementById('support-message-input');
const SUPPORT_WHATSAPP_NUMBER = "201227095092";

// عناصر البحث باستخدام صورة
const imageSearchBtn = document.getElementById('image-search-btn');
const resultsImageSearchBtn = document.getElementById('results-image-search-btn');
const imageSearchModal = document.getElementById('image-search-modal');
const closeImageSearchModal = document.getElementById('close-image-search-modal');
const selectImageBtn = document.getElementById('select-image-btn');
const imageSearchFileInput = document.getElementById('image-search-file-input');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imageSearchPreview = document.getElementById('image-search-preview');
const submitImageSearchBtn = document.getElementById('submit-image-search-btn');

let isSignUpMode = true;
let currentLang = localStorage.getItem('syf_lang') || 'ar';
let currentUserData = null;
let currentSearchTab = 'all';
let currentSearchQuery = '';

// ==========================================
// 3. Background & Shortcuts Setup
// ==========================================
const savedBg = localStorage.getItem('syf_custom_bg');
if (savedBg) {
    document.body.style.backgroundImage = `url('${savedBg}')`;
}

if (bgBtn && bgFileInput) {
    bgBtn.addEventListener('click', () => bgFileInput.click());
    bgFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                const bgUrl = evt.target.result;
                document.body.style.backgroundImage = `url('${bgUrl}')`;
                localStorage.setItem('syf_custom_bg', bgUrl);
            };
            reader.readAsDataURL(file);
        }
    });
}

function getCustomShortcuts() {
    return JSON.parse(localStorage.getItem('syf_custom_shortcuts') || '[]');
}

function renderShortcuts() {
    const customList = getCustomShortcuts();
    document.querySelectorAll('.custom-shortcut-item').forEach(el => el.remove());

    customList.forEach(item => {
        const a = document.createElement('a');
        a.href = item.url;
        a.target = '_blank';
        a.className = 'shortcut-item custom-shortcut-item';
        a.innerHTML = `
            <div class="shortcut-icon"><i class="fa-solid fa-globe"></i></div>
            <span class="shortcut-label">${item.title}</span>
        `;
        shortcutsGrid.insertBefore(a, addShortcutBtn);
    });
}

renderShortcuts();

if (addShortcutBtn) addShortcutBtn.addEventListener('click', () => shortcutModal.style.display = 'flex');
if (closeShortcutModal) closeShortcutModal.addEventListener('click', () => shortcutModal.style.display = 'none');

if (shortcutForm) {
    shortcutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = shortcutTitle.value.trim();
        let url = shortcutUrl.value.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        const shortcuts = getCustomShortcuts();
        shortcuts.push({ title, url });
        localStorage.setItem('syf_custom_shortcuts', JSON.stringify(shortcuts));
        renderShortcuts();

        shortcutModal.style.display = 'none';
        shortcutForm.reset();
    });
}

// ==========================================
// 4. Support System (WhatsApp)
// ==========================================
if (supportBtn) {
    supportBtn.addEventListener('click', () => supportModal.style.display = 'flex');
}
if (closeSupportModal) closeSupportModal.addEventListener('click', () => supportModal.style.display = 'none');

if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = supportMessageInput ? supportMessageInput.value.trim() : '';
        let fullMessage = "مرحباً، أحتاج إلى مساعدة في متصفح SYF Browser.";
        
        if (currentUserData && currentUserData.displayName) {
            fullMessage += `\nالاسم: ${currentUserData.displayName}`;
        }
        if (messageText !== '') {
            fullMessage += `\nالرسالة: ${messageText}`;
        }

        const whatsappUrl = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappUrl, '_blank');
        supportModal.style.display = 'none';
        supportForm.reset();
    });
}

// ==========================================
// 5. Image Search System
// ==========================================
function openImageSearchModal() {
    imageSearchModal.style.display = 'flex';
}

if (imageSearchBtn) imageSearchBtn.addEventListener('click', openImageSearchModal);
if (resultsImageSearchBtn) resultsImageSearchBtn.addEventListener('click', openImageSearchModal);
if (closeImageSearchModal) closeImageSearchModal.addEventListener('click', () => imageSearchModal.style.display = 'none');

if (selectImageBtn && imageSearchFileInput) {
    selectImageBtn.addEventListener('click', () => imageSearchFileInput.click());
    
    imageSearchFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                imageSearchPreview.src = evt.target.result;
                imagePreviewContainer.style.display = 'block';
                submitImageSearchBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

if (submitImageSearchBtn) {
    submitImageSearchBtn.addEventListener('click', () => {
        imageSearchModal.style.display = 'none';
        const query = "نتائج البحث بالصورة المحملة";
        saveSearchQuery(query);
        currentSearchQuery = query;
        currentSearchTab = 'images';

        mainView.style.display = 'none';
        resultsView.style.display = 'flex';
        if (resultsSearchInput) resultsSearchInput.value = "بحث عن طريق الصورة";

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const imgTabBtn = document.querySelector('.tab-btn[data-tab="images"]');
        if (imgTabBtn) imgTabBtn.classList.add('active');

        renderSearchResults(query, 'images');
        
        imagePreviewContainer.style.display = 'none';
        submitImageSearchBtn.style.display = 'none';
        imageSearchFileInput.value = '';
    });
}

// ==========================================
// 6. Downloads Management System
// ==========================================
function getDownloads() {
    return JSON.parse(localStorage.getItem('syf_downloads') || '[]');
}

function addDownloadItem(name, url) {
    let downloads = getDownloads();
    downloads.unshift({
        name: name,
        url: url,
        size: "ملف عالي الجودة",
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('syf_downloads', JSON.stringify(downloads));
}

function renderDownloads() {
    if (!downloadsList) return;
    const downloads = getDownloads();
    downloadsList.innerHTML = '';

    if (downloads.length === 0) {
        downloadsList.innerHTML = `<li style="text-align: center; color: #888; padding: 20px;">لا توجد أي تنزيلات حالياً.</li>`;
        return;
    }

    downloads.forEach((item) => {
        const li = document.createElement('li');
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #eee;";
        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-file-image" style="color: #1a73e8; font-size: 1.2rem;"></i>
                <div>
                    <strong style="display: block; font-size: 0.95rem; color: #333;">${item.name}</strong>
                    <small style="color: #888; font-size: 0.75rem;">${item.size} - ${item.date}</small>
                </div>
            </div>
            <a href="${item.url}" download target="_blank" style="color: #34a853; text-decoration: none; font-weight: bold; font-size: 0.85rem;"><i class="fa-solid fa-download"></i> فتح</a>
        `;
        downloadsList.appendChild(li);
    });
}

if (topDownloadsBtn) {
    topDownloadsBtn.addEventListener('click', () => {
        renderDownloads();
        downloadsModal.style.display = 'flex';
    });
}

if (downloadsBtn) {
    downloadsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        renderDownloads();
        downloadsModal.style.display = 'flex';
    });
}

if (closeDownloadsModal) closeDownloadsModal.addEventListener('click', () => downloadsModal.style.display = 'none');

if (clearDownloadsBtn) {
    clearDownloadsBtn.addEventListener('click', () => {
        localStorage.removeItem('syf_downloads');
        renderDownloads();
    });
}

// ==========================================
// 7. Auth Observer & Admin Rights
// ==========================================
auth.onAuthStateChanged((user) => {
    currentUserData = user;
    if (user) {
        loginModal.style.display = 'none';
        userAvatarBtn.style.display = 'block';
        
        const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email) + "&background=1a73e8&color=fff";
        const photoURL = user.photoURL || defaultAvatar;

        topUserAvatar.src = photoURL;
        cardUserAvatar.src = photoURL;
        cardUserName.innerText = user.displayName || user.email;

        if (user.email && user.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase()) {
            if (adminMonitorBtn) adminMonitorBtn.style.display = "flex";
        } else {
            if (adminMonitorBtn) adminMonitorBtn.style.display = "none";
        }
    } else {
        loginModal.style.display = 'flex';
        userAvatarBtn.style.display = 'none';
        if (adminMonitorBtn) adminMonitorBtn.style.display = "none";
    }
});

// ==========================================
// 8. Language Management
// ==========================================
const translations = {
    ar: {
        searchPlaceholder: "ابحث في SYF أو أدخل رابطاً...",
        addShortcut: "إضافة موقع",
        loginTitle: "إنشاء حساب جديد",
        loginTitleAlt: "تسجيل الدخول",
        usernameLabel: "الاسم الثلاثي",
        namePlaceholder: "أدخل اسمك الثلاثي هنا...",
        submitSignUp: "إنشاء حساب",
        submitLogin: "دخول",
        toggleToLogin: "لديك حساب بالفعل؟ اضغط هنا لتسجيل الدخول",
        toggleToSignUp: "ليس لديك حساب؟ اضغط هنا لإنشاء حساب جديد",
        addShortcutTitle: "إضافة اختصار جديد",
        siteNameLabel: "اسم الموقع",
        siteUrlLabel: "رابط الموقع (URL)",
        saveBtn: "حفظ الاختصار",
        settingsTitle: "الإعدادات",
        historyTitle: "سجل البحث",
        changeLangText: "تغيير اللغة",
        devPageBtn: "المطور",
        clearHistory: "مسح السجل",
        devTitle: "المطور",
        devName: "المطور:",
        devLocation: "الموقع:",
        visitYoutube: "زيارة القناة (@YYT_1)",
        noHistory: "لا يوجد سجل بحث حتى الآن."
    },
    en: {
        searchPlaceholder: "Search SYF or enter URL...",
        addShortcut: "Add Shortcut",
        loginTitle: "Create New Account",
        loginTitleAlt: "Login",
        usernameLabel: "Full Name",
        namePlaceholder: "Enter your full name...",
        submitSignUp: "Sign Up",
        submitLogin: "Sign In",
        toggleToLogin: "Already have an account? Click to Login",
        toggleToSignUp: "Don't have an account? Click to Sign Up",
        addShortcutTitle: "Add New Shortcut",
        siteNameLabel: "Site Name",
        siteUrlLabel: "Site URL",
        saveBtn: "Save Shortcut",
        settingsTitle: "Settings",
        historyTitle: "Search History",
        changeLangText: "Change Language",
        devPageBtn: "The Developer",
        clearHistory: "Clear History",
        devTitle: "Developer Info",
        devName: "Developer:",
        devLocation: "Location:",
        visitYoutube: "Visit Channel (@YYT_1)",
        noHistory: "No search history yet."
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('syf_lang', lang);
    const htmlRoot = document.getElementById('html-root');
    
    if (htmlRoot) {
        htmlRoot.setAttribute('lang', lang);
        htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }

    if (langIndicator) langIndicator.innerText = lang === 'ar' ? 'EN' : 'AR';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    if (modalTitle) {
        modalTitle.innerText = isSignUpMode ? translations[lang].loginTitle : translations[lang].loginTitleAlt;
    }
    if (loginSubmitBtn) {
        loginSubmitBtn.innerText = isSignUpMode ? translations[lang].submitSignUp : translations[lang].submitLogin;
    }
    if (authToggleMsg) {
        authToggleMsg.innerText = isSignUpMode ? translations[lang].toggleToLogin : translations[lang].toggleToSignUp;
    }
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(newLang);
    });
}

applyLanguage(currentLang);

if (authToggleMsg) {
    authToggleMsg.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode;
        if (isSignUpMode) {
            modalTitle.innerText = translations[currentLang].loginTitle;
            nameGroup.style.display = "flex";
            loginSubmitBtn.innerText = translations[currentLang].submitSignUp;
            authToggleMsg.innerText = translations[currentLang].toggleToLogin;
            usernameInput.required = true;
        } else {
            modalTitle.innerText = translations[currentLang].loginTitleAlt;
            nameGroup.style.display = "none";
            loginSubmitBtn.innerText = translations[currentLang].submitLogin;
            authToggleMsg.innerText = translations[currentLang].toggleToSignUp;
            usernameInput.required = false;
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const name = usernameInput.value.trim();

        if (isSignUpMode) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    return userCredential.user.updateProfile({ displayName: name });
                })
                .then(() => {
                    loginModal.style.display = 'none';
                    loginForm.reset();
                })
                .catch((error) => {
                    alert((currentLang === 'ar' ? "خطأ: " : "Error: ") + error.message);
                });
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    loginModal.style.display = 'none';
                    loginForm.reset();
                })
                .catch((error) => {
                    alert((currentLang === 'ar' ? "خطأ: " : "Error: ") + error.message);
                });
        }
    });
}

// ==========================================
// 9. Smart Search Engine
// ==========================================
function getHistory() {
    return JSON.parse(localStorage.getItem('syf_search_history') || '[]');
}

function saveSearchQuery(query) {
    let history = getHistory();
    const timestampStr = new Date().toLocaleString();
    history.unshift({ query: query, timestamp: timestampStr });
    localStorage.setItem('syf_search_history', JSON.stringify(history));

    if (currentUserData) {
        db.collection("user_searches").add({
            userEmail: currentUserData.email,
            userName: currentUserData.displayName || "مستخدم مجهول",
            query: query,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => console.log("Error saving live search:", err));
    }
}

function performSearch(queryText) {
    const query = queryText || searchInput.value.trim();
    if (query !== '') {
        saveSearchQuery(query);
        currentSearchQuery = query;

        if (query.startsWith('http://') || query.startsWith('https://')) {
            window.open(query, '_blank');
            return;
        }

        mainView.style.display = 'none';
        resultsView.style.display = 'flex';
        if (resultsSearchInput) resultsSearchInput.value = query;

        renderSearchResults(query, currentSearchTab);
    }
}

function renderSearchResults(query, tab) {
    if (!resultsContent) return;
    resultsContent.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: #1a73e8;"></i><p style="margin-top: 10px;">جاري جلب النتائج لـ "${query}"...</p></div>`;

    setTimeout(() => {
        resultsContent.innerHTML = '';

        if (tab === 'all') {
            const platforms = [
                { name: "Wikipedia (الموسوعة الحرة)", url: `https://ar.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}` },
                { name: "YouTube (فيديوهات وحلقات)", url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}` },
                { name: "GitHub (أكواد ومشاريع برمجية)", url: `https://github.com/search?q=${encodeURIComponent(query)}` },
                { name: "Stack Overflow (أسئلة وحلول برمجية)", url: `https://stackoverflow.com/search?q=${encodeURIComponent(query)}` },
                { name: "Medium (مقالات وتقارير تقنية)", url: `https://medium.com/search?q=${encodeURIComponent(query)}` },
                { name: "Reddit (مجتمعات ونقاشات عالمية)", url: `https://www.reddit.com/search/?q=${encodeURIComponent(query)}` },
                { name: "DuckDuckGo (محرك البحث الآمن)", url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}` },
                { name: "Pinterest (أفكار وصور إبداعية)", url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}` }
            ];

            for (let i = 1; i <= 30; i++) {
                const p = platforms[(i - 1) % platforms.length];
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <a href="${p.url}" target="_blank">(${i}) ${query} - عبر ${p.name}</a>
                    <p>استكشف نتائج حقيقية ومباشرة تتعلق بموضوع "${query}" من خلال منصة ${p.name}. انقر لفتح الموقع وتصفح التفاصيل كاملة في تبويب جديد.</p>
                `;
                resultsContent.appendChild(card);
            }
        } else if (tab === 'images') {
            const grid = document.createElement('div');
            grid.className = 'images-grid';

            for (let i = 1; i <= 40; i++) {
                const imgCard = document.createElement('div');
                imgCard.className = 'image-card';
                
                const cleanQuery = encodeURIComponent(query);
                const imgUrl = `https://source.unsplash.com/featured/800x600/?${cleanQuery}&sig=${i}`;
                const thumbUrl = `https://source.unsplash.com/featured/300x200/?${cleanQuery}&sig=${i}`;

                imgCard.innerHTML = `
                    <img src="${thumbUrl}" alt="${query}" style="cursor: pointer; background: #e0e0e0; object-fit: cover;" class="clickable-image" data-img="${imgUrl}" data-title="${query} - صورة (${i})" onerror="this.src='https://picsum.photos/seed/${cleanQuery+i}/300/200'">
                    <p>${query} (${i})</p>
                `;
                grid.appendChild(imgCard);
            }
            resultsContent.appendChild(grid);

            document.querySelectorAll('.clickable-image').forEach(img => {
                img.addEventListener('click', (e) => {
                    const imgSrc = e.target.getAttribute('data-img');
                    const imgTitle = e.target.getAttribute('data-title');
                    openImageViewer(imgSrc, imgTitle);
                });
            });

        } else if (tab === 'videos') {
            for (let i = 1; i <= 20; i++) {
                const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' part ' + i)}`;
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <a href="${videoUrl}" target="_blank"><i class="fa-brands fa-youtube" style="color: red; margin-left: 8px;"></i> مشاهدة فيديو مرئي رقم (${i}) عن: ${query}</a>
                    <p>انقر لفتح مقطع فيديو مباشر على يوتيوب يعرض تفاصيل وشروحات حول ${query}.</p>
                `;
                resultsContent.appendChild(card);
            }
        }
    }, 200);
}

function openImageViewer(url, title) {
    let viewerModal = document.getElementById('image-viewer-modal');
    if (!viewerModal) {
        viewerModal = document.createElement('div');
        viewerModal.id = 'image-viewer-modal';
        viewerModal.className = 'modal';
        viewerModal.innerHTML = `
            <div class="modal-content" style="text-align: center; max-width: 500px;">
                <span class="close-btn" id="close-image-viewer">&times;</span>
                <h3 id="viewer-title" style="margin-bottom: 15px; font-size: 1.1rem; color: #333;"></h3>
                <img id="viewer-img" src="" alt="Zoomed Image" style="width: 100%; max-height: 320px; object-fit: contain; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button id="viewer-download-btn" class="submit-btn" style="background: #34a853; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa-solid fa-download"></i> تنزيل الصورة
                    </button>
                    <button id="viewer-share-btn" class="submit-btn" style="background: #4285f4; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa-solid fa-share-nodes"></i> مشاركة
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(viewerModal);

        document.getElementById('close-image-viewer').addEventListener('click', () => {
            viewerModal.style.display = 'none';
        });
    }

    document.getElementById('viewer-title').innerText = title;
    document.getElementById('viewer-img').src = url;
    viewerModal.style.display = 'flex';

    const dlBtn = document.getElementById('viewer-download-btn');
    dlBtn.onclick = () => {
        addDownloadItem(title, url);
        alert("تمت إضافة الصورة إلى قائمة التنزيلات بنجاح!");
        viewerModal.style.display = 'none';
    };

    const shareBtn = document.getElementById('viewer-share-btn');
    shareBtn.onclick = () => {
        if (navigator.share) {
            navigator.share({ title: title, url: url }).catch(() => {});
        } else {
            navigator.clipboard.writeText(url);
            alert("تم نسخ رابط الصورة!");
        }
    };
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSearchTab = btn.getAttribute('data-tab');
        if (currentSearchQuery) {
            renderSearchResults(currentSearchQuery, currentSearchTab);
        }
    });
});

if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
        resultsView.style.display = 'none';
        mainView.style.display = 'flex';
    });
}
if (resultsHomeLogo) {
    resultsHomeLogo.addEventListener('click', () => {
        resultsView.style.display = 'none';
        mainView.style.display = 'flex';
    });
}

if (searchBtn) searchBtn.addEventListener('click', () => performSearch());
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

if (resultsSearchBtn) {
    resultsSearchBtn.addEventListener('click', () => {
        const q = resultsSearchInput.value.trim();
        if (q) performSearch(q);
    });
}
if (resultsSearchInput) {
    resultsSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const q = resultsSearchInput.value.trim();
            if (q) performSearch(q);
        }
    });
}

function loadAdminMonitorData() {
    if (!adminSearchesList) return;
    adminSearchesList.innerHTML = `<li style="text-align: center; color: #888; padding: 15px;">جاري جلب بيانات بحث المستخدمين...</li>`;

    db.collection("user_searches")
        .orderBy("timestamp", "desc")
        .limit(50)
        .get()
        .then((snapshot) => {
            adminSearchesList.innerHTML = '';
            if (snapshot.empty) {
                adminSearchesList.innerHTML = `<li style="text-align: center; color: #888; padding: 15px;">لا توجد عمليات بحث مسجلة حتى الآن.</li>`;
                return;
            }

            snapshot.forEach((doc) => {
                const data = doc.data();
                const timeStr = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'الآن';
                const li = document.createElement('li');
                li.style.cssText = "padding: 10px 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;";
                li.innerHTML = `
                    <div>
                        <strong style="color: #1a73e8; display: block; font-size: 0.9rem;">${data.userName} (${data.userEmail})</strong>
                        <span style="color: #333; font-size: 1rem;">بحث عن: <strong>${data.query}</strong></span>
                    </div>
                    <small style="color: #888; font-size: 0.75rem;">${timeStr}</small>
                `;
                adminSearchesList.appendChild(li);
            });
        })
        .catch((error) => {
            adminSearchesList.innerHTML = `<li style="text-align: center; color: #ea4335; padding: 15px;">خطأ في جلب البيانات: ${error.message}</li>`;
        });
}

// ==========================================
// 10. Modals UI Controls
// ==========================================
if (userAvatarBtn) userAvatarBtn.addEventListener('click', () => profileModal.style.display = 'flex');
if (closeProfileModal) closeProfileModal.addEventListener('click', () => profileModal.style.display = 'none');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => profileModal.style.display = 'none');
    });
}

if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
if (closeSettingsModal) closeSettingsModal.addEventListener('click', () => settingsModal.style.display = 'none');

if (historyBtn) {
    historyBtn.queries;
    historyBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        renderHistory();
        historyModal.style.display = 'flex';
    });
}
if (closeHistoryModal) closeHistoryModal.addEventListener('click', () => historyModal.style.display = 'none');

if (showDevBtn) {
    showDevBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        devModal.style.display = 'flex';
    });
}
if (closeDevModal) closeDevModal.addEventListener('click', () => devModal.style.display = 'none');

if (adminMonitorBtn) {
    adminMonitorBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        loadAdminMonitorData();
        adminMonitorModal.style.display = 'flex';
    });
}
if (closeAdminMonitorModal) closeAdminMonitorModal.addEventListener('click', () => adminMonitorModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && !e.target.classList.contains('force-modal')) {
        e.target.style.display = 'none';
    }
});
