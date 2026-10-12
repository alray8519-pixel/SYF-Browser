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

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

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

const downloadsBtn = document.getElementById('downloads-btn');
const topDownloadsBtn = document.getElementById('top-downloads-btn');
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

const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const closeSupportModal = document.getElementById('close-support-modal');
const supportForm = document.getElementById('support-form');
const supportMessageInput = document.getElementById('support-message-input');
const SUPPORT_WHATSAPP_NUMBER = "201227095092";

const addShortcutBtn = document.getElementById('add-shortcut-btn');
const shortcutModal = document.getElementById('shortcut-modal');
const closeShortcutModal = document.getElementById('close-shortcut-modal');
const shortcutForm = document.getElementById('shortcut-form');
const shortcutTitle = document.getElementById('shortcut-title');
const shortcutUrl = document.getElementById('shortcut-url');

const imageSearchBtn = document.getElementById('image-search-btn');
const imageSearchModal = document.getElementById('image-search-modal');
const closeImageSearchModal = document.getElementById('close-image-search-modal');
const selectImageBtn = document.getElementById('select-image-btn');
const imageSearchFileInput = document.getElementById('image-search-file-input');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imageSearchPreview = document.getElementById('image-search-preview');
const submitImageSearchBtn = document.getElementById('submit-image-search-btn');

let isSignUpMode = true;
let currentUserData = null;

// الخلفية
const savedBg = localStorage.getItem('syf_custom_bg');
if (savedBg) document.body.style.backgroundImage = `url('${savedBg}')`;

if (bgBtn && bgFileInput) {
    bgBtn.addEventListener('click', () => bgFileInput.click());
    bgFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                document.body.style.backgroundImage = `url('${evt.target.result}')`;
                localStorage.setItem('syf_custom_bg', evt.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

// الدعم الفني
if (supportBtn) supportBtn.addEventListener('click', () => supportModal.style.display = 'flex');
if (closeSupportModal) closeSupportModal.addEventListener('click', () => supportModal.style.display = 'none');

if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = supportMessageInput ? supportMessageInput.value.trim() : '';
        let fullMsg = "مرحباً، أحتاج مساعدة في متصفح SYF.";
        if (currentUserData && currentUserData.displayName) fullMsg += `\nالاسم: ${currentUserData.displayName}`;
        if (msg) fullMsg += `\nالرسالة: ${msg}`;
        window.open(`https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMsg)}`, '_blank');
        supportModal.style.display = 'none';
        supportForm.reset();
    });
}

// الاختصارات
if (addShortcutBtn) addShortcutBtn.addEventListener('click', () => shortcutModal.style.display = 'flex');
if (closeShortcutModal) closeShortcutModal.addEventListener('click', () => shortcutModal.style.display = 'none');

if (shortcutForm) {
    shortcutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = shortcutTitle.value.trim();
        let url = shortcutUrl.value.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
        const shortcuts = JSON.parse(localStorage.getItem('syf_custom_shortcuts') || '[]');
        shortcuts.push({ title, url });
        localStorage.setItem('syf_custom_shortcuts', JSON.stringify(shortcuts));
        shortcutModal.style.display = 'none';
        shortcutForm.reset();
    });
}

// البحث باستخدام صورة
if (imageSearchBtn) imageSearchBtn.addEventListener('click', () => imageSearchModal.style.display = 'flex');
if (closeImageSearchModal) closeImageSearchModal.addEventListener('click', () => imageSearchModal.style.display = 'none');

if (selectImageBtn && imageSearchFileInput) {
    selectImageBtn.addEventListener('click', () => imageSearchFileInput.click());
    imageSearchFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
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
        window.open(`https://images.google.com/`, '_blank');
        imagePreviewContainer.style.display = 'none';
        submitImageSearchBtn.style.display = 'none';
        imageSearchFileInput.value = '';
    });
}

// التنزيلات
function getDownloads() { return JSON.parse(localStorage.getItem('syf_downloads') || '[]'); }
function renderDownloads() {
    if (!downloadsList) return;
    const downloads = getDownloads();
    downloadsList.innerHTML = downloads.length === 0 ? `<li style="text-align: center; color: #888; padding: 20px;">لا توجد تنزيلات</li>` : '';
    downloads.forEach(item => {
        const li = document.createElement('li');
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;";
        li.innerHTML = `<span>${item.name}</span><a href="${item.url}" download target="_blank" style="color: #34a853;">فتح</a>`;
        downloadsList.appendChild(li);
    });
}
if (topDownloadsBtn) topDownloadsBtn.addEventListener('click', () => { renderDownloads(); downloadsModal.style.display = 'flex'; });
if (downloadsBtn) downloadsBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; renderDownloads(); downloadsModal.style.display = 'flex'; });
if (closeDownloadsModal) closeDownloadsModal.addEventListener('click', () => downloadsModal.style.display = 'none');
if (clearDownloadsBtn) clearDownloadsBtn.addEventListener('click', () => { localStorage.removeItem('syf_downloads'); renderDownloads(); });

// المصادقة
auth.onAuthStateChanged((user) => {
    currentUserData = user;
    if (user) {
        loginModal.style.display = 'none';
        userAvatarBtn.style.display = 'block';
        const avatar = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=1a73e8&color=fff`;
        topUserAvatar.src = avatar;
        cardUserAvatar.src = avatar;
        cardUserName.innerText = user.displayName || user.email;
        if (adminMonitorBtn) adminMonitorBtn.style.display = user.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase() ? "block" : "none";
    } else {
        loginModal.style.display = 'flex';
        userAvatarBtn.style.display = 'none';
        if (adminMonitorBtn) adminMonitorBtn.style.display = "none";
    }
});

// تبديل تسجيل الدخول
if (authToggleMsg) {
    authToggleMsg.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode;
        if (isSignUpMode) {
            modalTitle.innerText = "إنشاء حساب جديد";
            nameGroup.style.display = "flex";
            loginSubmitBtn.innerText = "إنشاء حساب";
            authToggleMsg.innerText = "لديك حساب بالفعل؟ تسجيل الدخول";
            usernameInput.required = true;
        } else {
            modalTitle.innerText = "تسجيل الدخول";
            nameGroup.style.display = "none";
            loginSubmitBtn.innerText = "دخول";
            authToggleMsg.innerText = "ليس لديك حساب؟ انشئ حساب جديد";
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

// البحث
function performSearch(queryText) {
    const query = queryText || searchInput.value.trim();
    if (query !== '') {
        if (currentUserData) {
            db.collection("user_searches").add({
                userEmail: currentUserData.email,
                userName: currentUserData.displayName || "مستخدم",
                query: query,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(() => {});
        }

        if (query.startsWith('http://') || query.startsWith('https://')) {
            window.open(query, '_blank');
            return;
        }

        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
}

if (searchBtn) searchBtn.addEventListener('click', () => performSearch());
if (searchInput) searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

// أزرار التحكم والـ Modals
if (userAvatarBtn) userAvatarBtn.addEventListener('click', () => profileModal.style.display = 'flex');
if (closeProfileModal) closeProfileModal.addEventListener('click', () => profileModal.style.display = 'none');
if (logoutBtn) logoutBtn.addEventListener('click', () => auth.signOut().then(() => profileModal.style.display = 'none'));
if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
if (closeSettingsModal) closeSettingsModal.addEventListener('click', () => settingsModal.style.display = 'none');
if (showDevBtn) showDevBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; devModal.style.display = 'flex'; });
if (closeDevModal) closeDevModal.addEventListener('click', () => devModal.style.display = 'none');

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && !e.target.classList.contains('force-modal')) e.target.style.display = 'none';
});
