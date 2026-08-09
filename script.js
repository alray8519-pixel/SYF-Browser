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

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// ==========================================
// 2. DOM Elements Selection
// ==========================================
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

const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeHistoryModal = document.getElementById('close-history-modal');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

const showDevBtn = document.getElementById('show-dev-btn');
const devModal = document.getElementById('dev-modal');
const closeDevModal = document.getElementById('close-dev-modal');

const langToggleBtn = document.getElementById('lang-toggle-btn');
const langIndicator = document.getElementById('lang-indicator');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

let isSignUpMode = true;
let currentLang = localStorage.getItem('syf_lang') || 'ar';

// ==========================================
// 3. Language Translations Dictionary
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

    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // Update dynamic modal titles
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

// Language toggle event
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(newLang);
    });
}

// Initial Language Apply
applyLanguage(currentLang);

// ==========================================
// 4. Auth Mode Toggle (Signup vs Login)
// ==========================================
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

// ==========================================
// 5. Form Submission (Firebase Auth)
// ==========================================
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
// 6. Auth State Observer
// ==========================================
auth.onAuthStateChanged((user) => {
    if (user) {
        loginModal.style.display = 'none';
        userAvatarBtn.style.display = 'block';
        
        const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email) + "&background=1a73e8&color=fff";
        const photoURL = user.photoURL || defaultAvatar;

        topUserAvatar.src = photoURL;
        cardUserAvatar.src = photoURL;
        cardUserName.innerText = user.displayName || user.email;
    } else {
        loginModal.style.display = 'flex';
        userAvatarBtn.style.display = 'none';
    }
});

// ==========================================
// 7. Search & History Management
// ==========================================
function getHistory() {
    return JSON.parse(localStorage.getItem('syf_search_history') || '[]');
}

function saveSearchQuery(query) {
    let history = getHistory();
    history.unshift({ query: query, timestamp: new Date().toLocaleString() });
    localStorage.setItem('syf_search_history', JSON.stringify(history));
}

function renderHistory() {
    if (!historyList) return;
    const history = getHistory();
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = `<li style="text-align: center; color: #888; padding: 15px;">${translations[currentLang].noHistory}</li>`;
        return;
    }

    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;";
        li.innerHTML = `
            <span><i class="fa-solid fa-clock-rotate-left" style="margin-left: 8px; margin-right: 8px; color: #666;"></i> ${item.query}</span>
            <small style="color: #999; font-size: 0.75rem;">${item.timestamp}</small>
        `;
        li.addEventListener('click', () => {
            searchInput.value = item.query;
            historyModal.style.display = 'none';
            performSearch();
        });
        historyList.appendChild(li);
    });
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        localStorage.removeItem('syf_search_history');
        renderHistory();
    });
}

function performSearch() {
    const query = searchInput.value.trim();
    if (query !== '') {
        saveSearchQuery(query);
        if (query.startsWith('http://') || query.startsWith('https://')) {
            window.location.href = query;
        } else {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
}

if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// ==========================================
// 8. Modals UI Controls
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

// Close modals when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && !e.target.classList.contains('force-modal')) {
        e.target.style.display = 'none';
    }
});
