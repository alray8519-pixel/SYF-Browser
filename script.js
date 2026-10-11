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

// الأدمن المحدد
const ADMIN_EMAIL = "admin@syfbrowser.com";

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

const bgBtn = document.getElementById('bg-btn');
const bgFileInput = document.getElementById('bg-file-input');

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
const micBtn = document.getElementById('mic-btn');

// Shortcuts
const addShortcutBtn = document.getElementById('add-shortcut-btn');
const shortcutModal = document.getElementById('shortcut-modal');
const closeShortcutModal = document.getElementById('close-shortcut-modal');
const shortcutForm = document.getElementById('shortcut-form');
const shortcutTitle = document.getElementById('shortcut-title');
const shortcutUrl = document.getElementById('shortcut-url');
const shortcutsGrid = document.getElementById('shortcuts-grid');

// Support System
const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const closeSupportModal = document.getElementById('close-support-modal');
const supportForm = document.getElementById('support-form');
const supportNameInput = document.getElementById('support-name-input');
const supportEmailInput = document.getElementById('support-email-input');
const supportMessageInput = document.getElementById('support-message-input');

// Admin Panel
const adminPanelBtn = document.getElementById('admin-panel-btn');
const adminModal = document.getElementById('admin-modal');
const closeAdminModal = document.getElementById('close-admin-modal');
const adminMessagesList = document.getElementById('admin-messages-list');

let isSignUpMode = true;
let currentLang = localStorage.getItem('syf_lang') || 'ar';
let currentUserData = null;

// ==========================================
// 3. Saved Custom Background Loading
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

// ==========================================
// 4. Voice Search (Microphone)
// ==========================================
if (micBtn) {
    micBtn.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
            micBtn.style.color = '#ea4335';
            recognition.start();

            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                searchInput.value = transcript;
                micBtn.style.color = '#5f6368';
                performSearch();
            };

            recognition.onerror = () => {
                micBtn.style.color = '#5f6368';
                alert(currentLang === 'ar' ? 'تعذر التعرف على الصوت' : 'Voice recognition failed');
            };

            recognition.onend = () => {
                micBtn.style.color = '#5f6368';
            };
        } else {
            alert(currentLang === 'ar' ? 'البحث الصوتي غير مدعوم في هذا المتصفح' : 'Voice search not supported');
        }
    });
}

// ==========================================
// 5. Custom Shortcuts Management
// ==========================================
function getCustomShortcuts() {
    return JSON.parse(localStorage.getItem('syf_custom_shortcuts') || '[]');
}

function renderShortcuts() {
    const customList = getCustomShortcuts();
    document.querySelectorAll('.custom-shortcut-item').forEach(el => el.remove());

    customList.forEach(item => {
        const a = document.createElement('a');
        a.href = item.url;
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
// 6. Support System & Admin Panel
// ==========================================
if (supportBtn) {
    supportBtn.addEventListener('click', () => {
        if (currentUserData) {
            supportNameInput.value = currentUserData.displayName || '';
            supportEmailInput.value = currentUserData.email || '';
        }
        supportModal.style.display = 'flex';
    });
}
if (closeSupportModal) closeSupportModal.addEventListener('click', () => supportModal.style.display = 'none');

if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = supportNameInput.value.trim();
        const email = supportEmailInput.value.trim();
        const message = supportMessageInput.value.trim();

        const supportMessages = JSON.parse(localStorage.getItem('syf_support_messages') || '[]');
        supportMessages.push({
            name,
            email,
            message,
            timestamp: new Date().toLocaleString()
        });

        localStorage.setItem('syf_support_messages', JSON.stringify(supportMessages));
        alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح وسيتواصل مع الدعم الفني قريباً.' : 'Message sent successfully!');
        
        supportModal.style.display = 'none';
        supportForm.reset();
    });
}

function renderAdminMessages() {
    if (!adminMessagesList) return;
    const messages = JSON.parse(localStorage.getItem('syf_support_messages') || '[]');
    adminMessagesList.innerHTML = '';

    if (messages.length === 0) {
        adminMessagesList.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">لا توجد رسائل دعم فني حالياً.</p>';
        return;
    }

    messages.forEach((msg, idx) => {
        const div = document.createElement('div');
        div.style.cssText = "background: #f8f9fa; border: 1px solid #dadce0; border-radius: 10px; padding: 12px; margin-bottom: 12px;";
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 6px;">
                <span>${msg.name} (${msg.email})</span>
                <small style="color: #888;">${msg.timestamp}</small>
            </div>
            <p style="color: #333; font-size: 0.95rem; white-space: pre-wrap;">${msg.message}</p>
        `;
        adminMessagesList.appendChild(div);
    });
}

if (adminPanelBtn) {
    adminPanelBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
        renderAdminMessages();
        adminModal.style.display = 'flex';
    });
}
if (closeAdminModal) closeAdminModal.addEventListener('click', () => adminModal.style.display = 'none');

// ==========================================
// 7. Auth State Observer & Admin Permissions
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

        // التحقق مما إذا كان المستخدم هو الأدمن
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
            adminPanelBtn.style.display = 'flex';
        } else {
            adminPanelBtn.style.display = 'none';
        }
    } else {
        loginModal.style.display = 'flex';
        userAvatarBtn.style.display = 'none';
        adminPanelBtn.style.display = 'none';
    }
});

// ==========================================
// 8. Language Translations & Logic
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

// Auth Mode Toggle
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

// Form Submission (Firebase Auth)
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
// 9. Search & History
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

    history.forEach((item) => {
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

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && !e.target.classList.contains('force-modal')) {
        e.target.style.display = 'none';
    }
});
