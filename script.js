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

const showDevBtn = document.getElementById('show-dev-btn');
const devModal = document.getElementById('dev-modal');
const closeDevModal = document.getElementById('close-dev-modal');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

let isSignUpMode = true;

// ==========================================
// 3. Auth Mode Toggle (Signup vs Login)
// ==========================================
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

// ==========================================
// 4. Form Submission (Firebase Auth)
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
                    return userCredential.user.updateProfile({
                        displayName: name
                    });
                })
                .then(() => {
                    loginModal.style.display = 'none';
                    loginForm.reset();
                })
                .catch((error) => {
                    alert("خطأ في إنشاء الحساب: " + error.message);
                });
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    loginModal.style.display = 'none';
                    loginForm.reset();
                })
                .catch((error) => {
                    alert("خطأ في تسجيل الدخول: " + error.message);
                });
        }
    });
}

// ==========================================
// 5. Auth State Observer
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
// 6. Modals UI Controls
// ==========================================
if (userAvatarBtn) userAvatarBtn.addEventListener('click', () => profileModal.style.display = 'flex');
if (closeProfileModal) closeProfileModal.addEventListener('click', () => profileModal.style.display = 'none');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            profileModal.style.display = 'none';
        });
    });
}

if (settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.style.display = 'flex');
if (closeSettingsModal) closeSettingsModal.addEventListener('click', () => settingsModal.style.display = 'none');

if (historyBtn) {
    historyBtn.addEventListener('click', () => {
        settingsModal.style.display = 'none';
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

// ==========================================
// 7. Search Logic
// ==========================================
function performSearch() {
    const query = searchInput.value.trim();
    if (query !== '') {
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
