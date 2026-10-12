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

const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const closeSupportModal = document.getElementById('close-support-modal');
const supportForm = document.getElementById('support-form');
const supportMessageInput = document.getElementById('support-message-input');
const SUPPORT_WHATSAPP_NUMBER = "201227095092";

const imageSearchBtn = document.getElementById('image-search-btn');
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

// Background Setup
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

// Support System (WhatsApp)
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

// Image Search
function openImageSearchModal() {
    imageSearchModal.style.display = 'flex';
}

if (imageSearchBtn) imageSearchBtn.addEventListener('click', openImageSearchModal);
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
        const query = "صورة بحث";
        performSearch(query);
        imagePreviewContainer.style.display = 'none';
        submitImageSearchBtn.style.display = 'none';
        imageSearchFileInput.value = '';
    });
}

// Downloads System
function getDownloads() {
    return JSON.parse(localStorage.getItem('syf_downloads') || '[]');
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

// Auth Observer
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

// Language System
const translations = {
    ar: { searchPlaceholder: "ابحث في SYF أو أدخل رابطاً...", addShortcut: "إضافة موقع", loginTitle: "إنشاء حساب جديد", loginTitleAlt: "تسجيل الدخول", usernameLabel: "الاسم الثلاثي", namePlaceholder: "أدخل اسمك الثلاثي هنا...", submitSignUp: "إنشاء حساب", submitLogin: "دخول", toggleToLogin: "لديك حساب بالفعل؟ اضغط هنا لتسجيل الدخول", toggleToSignUp: "ليس لديك حساب؟ اضغط هنا لإنشاء حساب جديد", settingsTitle: "الإعدادات", historyTitle: "سجل البحث", changeLangText: "تغيير اللغة", devPageBtn: "المطور", clearHistory: "مسح السجل" },
    en: { searchPlaceholder: "Search SYF or enter URL...", addShortcut: "Add Shortcut", loginTitle: "Create New Account", loginTitleAlt: "Login", usernameLabel: "Full Name", namePlaceholder: "Enter your full name...", submitSignUp: "Sign Up", submitLogin: "Sign In", toggleToLogin: "Already have an account? Click to Login", toggleToSignUp: "Don't have an account? Click to Sign Up", settingsTitle: "Settings", historyTitle: "Search History", changeLangText: "Change Language", devPageBtn: "The Developer", clearHistory: "Clear History" }
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
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
}
applyLanguage(currentLang);

// Login Form Toggle & Submit
if (authToggleMsg) {
    authToggleMsg.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode;
        if (isSignUpMode) {
            modalTitle.innerText = "إنشاء حساب جديد";
            nameGroup.style.display = "flex";
            loginSubmitBtn.innerText = "إنشاء حساب";
            authToggleMsg.innerText = "لديك حساب بالفعل؟ اضغط هنا لتسجيل الدخول";
            usernameInput.required = true;
        } else {
            modalTitle.innerText = "تسجيل الدخول";
            nameGroup.style.display = "none";
            loginSubmitBtn.innerText = "دخول";
            authToggleMsg.innerText = "ليس لديك حساب؟ اضغط هنا لإنشاء حساب جديد";
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
                .then((userCredential) => userCredential.user.updateProfile({ displayName: name }))
                .then(() => { loginModal.style.display = 'none'; loginForm.reset(); })
                .catch((error) => alert("خطأ: " + error.message));
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => { loginModal.style.display = 'none'; loginForm.reset(); })
                .catch((error) => alert("خطأ: " + error.message));
        }
    });
}

// ==========================================
// 9. Internal Search Display (تعرض النتائج داخل المتصفح)
// ==========================================
function performSearch(queryText) {
    const query = queryText || searchInput.value.trim();
    if (query !== '') {
        currentSearchQuery = query;

        if (query.startsWith('http://') || query.startsWith('https://')) {
            window.open(query, '_blank');
            return;
        }

        // إخفاء الرئيسية وإظهار نافذة النتائج الداخلية دون الخروج للمتصفح الخارجي
        mainView.style.display = 'none';
        resultsView.style.display = 'flex';
        if (resultsSearchInput) resultsSearchInput.value = query;

        renderSearchResults(query, currentSearchTab);
    }
}

function renderSearchResults(query, tab) {
    if (!resultsContent) return;
    resultsContent.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: #1a73e8;"></i><p style="margin-top: 10px;">جاري جلب نتائج البحث لـ "${query}"...</p></div>`;

    setTimeout(() => {
        resultsContent.innerHTML = '';
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        if (tab === 'all') {
            const mainCard = document.createElement('div');
            mainCard.className = 'result-card';
            mainCard.style.border = "2px solid #4285f4";
            mainCard.innerHTML = `
                <a href="${googleSearchUrl}" target="_blank"><i class="fa-brands fa-google" style="color: #4285f4; margin-left: 8px;"></i> عرض نتائج Google الكاملة لـ: ${query}</a>
                <p>انقر هنا لفتح نتائج Google الرسمية مباشرة وتصفح كافة المواقع والمقالات المتعلقة ببحثك.</p>
            `;
            resultsContent.appendChild(mainCard);

            for (let i = 1; i <= 10; i++) {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <a href="${googleSearchUrl}" target="_blank">رابط بحث رقم (${i}) عن: ${query}</a>
                    <p>نتيجة بحث مطابقة وموثوقة من مصادر الإنترنت المرتبطة بـ "${query}".</p>
                `;
                resultsContent.appendChild(card);
            }
        } else if (tab === 'images') {
            const grid = document.createElement('div');
            grid.className = 'images-grid';
            for (let i = 1; i <= 20; i++) {
                const card = document.createElement('div');
                card.className = 'image-card';
                const cleanQuery = encodeURIComponent(query);
                const imgUrl = `https://picsum.photos/seed/${cleanQuery+i}/800/600`;
                card.innerHTML = `
                    <img src="${imgUrl}" alt="${query}" style="cursor: pointer; height: 140px; width: 100%; object-fit: cover;">
                    <p>صورة بحث (${i})</p>
                `;
                grid.appendChild(card);
            }
            resultsContent.appendChild(grid);
        } else if (tab === 'videos') {
            for (let i = 1; i <= 10; i++) {
                const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' part ' + i)}`;
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <a href="${videoUrl}" target="_blank"><i class="fa-brands fa-youtube" style="color: red; margin-left: 8px;"></i> فيديو مقترح (${i}) عن: ${query}</a>
                    <p>شرح مرئي وفيديو مباشر مرتبط بموضوع البحث.</p>
                `;
                resultsContent.appendChild(card);
            }
        }
    }, 200);
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

// Admin Monitor & Modals
function loadAdminMonitorData() {
    if (!adminSearchesList) return;
    adminSearchesList.innerHTML = `<li style="text-align: center; color: #888; padding: 15px;">جاري جلب البيانات...</li>`;
    db.collection("user_searches").orderBy("timestamp", "desc").limit(50).get().then((snapshot) => {
        adminSearchesList.innerHTML = '';
        if (snapshot.empty) {
            adminSearchesList.innerHTML = `<li style="text-align: center; color: #888; padding: 15px;">لا توجد عمليات بحث مسجلة.</li>`;
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
    });
}

if (userAvatarBtn) userAvatarBtn.addEventListener('click', () => profileModal.style.display = 'flex');
if (closeProfileModal) closeProfileModal.addEventListener('click', () => profileModal.style.display = 'none');
if (logoutBtn) logoutBtn.addEventListener('click', () => auth.signOut().then(() => profileModal.style.display = 'none'));
if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
if (closeSettingsModal) closeSettingsModal.addEventListener('click', () => settingsModal.style.display = 'none');
if (historyBtn) historyBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; historyModal.style.display = 'flex'; });
if (closeHistoryModal) closeHistoryModal.addEventListener('click', () => historyModal.style.display = 'none');
if (showDevBtn) showDevBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; devModal.style.display = 'flex'; });
if (closeDevModal) closeDevModal.addEventListener('click', () => devModal.style.display = 'none');
if (adminMonitorBtn) adminMonitorBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; loadAdminMonitorData(); adminMonitorModal.style.display = 'flex'; });
if (closeAdminMonitorModal) closeAdminMonitorModal.addEventListener('click', () => adminMonitorModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && !e.target.classList.contains('force-modal')) {
        e.target.style.display = 'none';
    }
});
