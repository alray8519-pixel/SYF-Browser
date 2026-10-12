<!DOCTYPE html>
<html lang="ar" dir="rtl" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYF Browser</title>
    <!-- App Favicon -->
    <link rel="icon" type="image/png" href="favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Top Navigation Bar -->
    <div class="top-bar">
        <div class="top-bar-start">
            <div id="user-badge-container">
                <div id="user-avatar-btn" class="user-avatar-wrapper" style="display: none;">
                    <img id="top-user-avatar" src="" alt="User Avatar">
                </div>
            </div>
        </div>

        <div class="top-bar-end">
            <!-- زر الدعم الفني عبر واتساب -->
            <button class="icon-btn" id="support-btn" title="الدعم الفني عبر واتساب">
                <i class="fa-brands fa-whatsapp"></i>
            </button>

            <!-- زر التنزيلات -->
            <button class="icon-btn" id="top-downloads-btn" title="التنزيلات">
                <i class="fa-solid fa-download"></i>
            </button>

            <button class="icon-btn" id="bg-btn" title="تغيير الخلفية">
                <i class="fa-solid fa-image"></i>
            </button>
            <button class="icon-btn" id="settings-btn" title="الإعدادات">
                <i class="fa-solid fa-gear"></i>
            </button>
            <input type="file" id="bg-file-input" accept="image/*" style="display: none;">
        </div>
    </div>

    <!-- Main Home View -->
    <div id="main-view">
        <div class="logo" id="home-logo">
            <span class="char-s">S</span><span class="char-y">Y</span><span class="char-f">F</span>
        </div>

        <!-- Search Box -->
        <div class="search-box">
            <input type="text" class="search-input" id="search-input" placeholder="ابحث في SYF أو أدخل رابطاً...">
            <div class="search-actions">
                <i class="fa-solid fa-camera action-btn" id="image-search-btn" title="البحث باستخدام صورة"></i>
                <i class="fa-solid fa-magnifying-glass action-btn" id="search-btn" title="بحث"></i>
            </div>
        </div>

        <!-- Shortcuts -->
        <div class="shortcuts-container" id="shortcuts-grid">
            <a href="https://www.youtube.com" class="shortcut-item youtube">
                <div class="shortcut-icon"><i class="fa-brands fa-youtube"></i></div>
                <span class="shortcut-label">يوتيوب</span>
            </a>
            <a href="https://www.instagram.com" class="shortcut-item instagram">
                <div class="shortcut-icon"><i class="fa-brands fa-instagram"></i></div>
                <span class="shortcut-label">إنستغرام</span>
            </a>
            <a href="https://www.facebook.com" class="shortcut-item facebook">
                <div class="shortcut-icon"><i class="fa-brands fa-facebook-f"></i></div>
                <span class="shortcut-label">فيسبوك</span>
            </a>
            <a href="https://www.netflix.com" class="shortcut-item netflix">
                <div class="shortcut-icon"><i class="fa-solid fa-film"></i></div>
                <span class="shortcut-label">نتفليكس</span>
            </a>
            <div class="shortcut-item add-shortcut" id="add-shortcut-btn">
                <div class="shortcut-icon add-icon"><i class="fa-solid fa-plus"></i></div>
                <span class="shortcut-label">إضافة موقع</span>
            </div>
        </div>
    </div>

    <!-- Browser Results View (يعرض جوجل بالكامل داخل متصفحك) -->
    <div id="results-view" style="display: none; width: 100%; height: 100vh; position: absolute; top: 0; left: 0; flex-direction: column; background: #fff; z-index: 50;">
        <div style="display: flex; align-items: center; padding: 10px 20px; background: #f1f3f4; border-bottom: 1px solid #dadce0; gap: 15px;">
            <button id="back-to-home-btn" class="icon-btn" style="background: #fff; color: #333;" title="الرئيسية">
                <i class="fa-solid fa-house"></i>
            </button>
            <span style="font-weight: bold; color: #4285f4; font-size: 1.2rem;">SYF Browser - Google Search</span>
        </div>
        <!-- iframe يعرض نتائج جوجل الرسمية الحقيقية داخل موقعك -->
        <iframe id="google-results-iframe" src="" style="width: 100%; height: calc(100vh - 60px); border: none;"></iframe>
    </div>

    <!-- Image Search Modal -->
    <div class="modal" id="image-search-modal">
        <div class="modal-content" style="text-align: center;">
            <span class="close-btn" id="close-image-search-modal">&times;</span>
            <h2>البحث باستخدام صورة</h2>
            <p style="color: #666; font-size: 0.9rem; margin: 15px 0;">اختر صورة للبحث عنها في Google.</p>
            <input type="file" id="image-search-file-input" accept="image/*" style="display: none;">
            <button id="select-image-btn" class="submit-btn" style="background: #f1f3f4; color: #333; margin-bottom: 10px;">اختر صورة</button>
        </div>
    </div>

    <!-- Downloads Modal -->
    <div class="modal" id="downloads-modal">
        <div class="modal-content">
            <span class="close-btn" id="close-downloads-modal">&times;</span>
            <div class="history-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h2>التنزيلات</h2>
                <button class="clear-btn" id="clear-downloads-btn" style="background: #ea4335; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">مسح السجل</button>
            </div>
            <ul id="downloads-list" style="list-style: none; padding: 0; max-height: 300px; overflow-y: auto;"></ul>
        </div>
    </div>

    <!-- Add Shortcut Modal -->
    <div class="modal" id="shortcut-modal">
        <div class="modal-content">
            <span class="close-btn" id="close-shortcut-modal">&times;</span>
            <h2 style="margin-bottom: 20px; text-align: center;">إضافة اختصار جديد</h2>
            <form id="shortcut-form">
                <div class="form-group"><label>اسم الموقع</label><input type="text" id="shortcut-title" required placeholder="مثال: جوجل"></div>
                <div class="form-group"><label>رابط الموقع (URL)</label><input type="url" id="shortcut-url" required placeholder="https://example.com"></div>
                <button type="submit" class="submit-btn">حفظ الاختصار</button>
            </form>
        </div>
    </div>

    <!-- Support Modal (WhatsApp) -->
    <div class="modal" id="support-modal">
        <div class="modal-content" style="text-align: center;">
            <span class="close-btn" id="close-support-modal">&times;</span>
            <div style="font-size: 3rem; color: #25d366; margin-bottom: 10px;"><i class="fa-brands fa-whatsapp"></i></div>
            <h2 style="margin-bottom: 10px;">الدعم الفني عبر واتساب</h2>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;">الرد خلال 24 ساعة.</p>
            <form id="support-form">
                <div class="form-group" style="text-align: right;"><textarea id="support-message-input" placeholder="اكتب استفسارك هنا..." style="width: 100%; height: 110px; padding: 12px; border-radius: 12px; border: 1px solid #dadce0; resize: none;"></textarea></div>
                <button type="submit" class="submit-btn" style="background-color: #25d366;"><i class="fa-brands fa-whatsapp"></i> إرسال عبر واتساب</button>
            </form>
        </div>
    </div>

    <!-- Login Modal -->
    <div class="modal force-modal" id="login-modal" style="display: flex;">
        <div class="modal-content">
            <h2 id="modal-title" style="margin-bottom: 20px; text-align: center;">إنشاء حساب جديد</h2>
            <form id="login-form">
                <div class="form-group" id="name-group"><label>الاسم الثلاثي</label><input type="text" id="username-input" autocomplete="name" placeholder="أدخل اسمك الثلاثي..."></div>
                <div class="form-group"><label>البريد الإلكتروني</label><input type="email" id="email-input" required autocomplete="username" placeholder="name@example.com"></div>
                <div class="form-group"><label>كلمة السر</label><input type="password" id="password-input" required autocomplete="current-password" placeholder="••••••••"></div>
                <button type="submit" class="submit-btn" id="login-submit-btn" style="margin-top: 15px;">إنشاء حساب</button>
                <p id="auth-toggle-msg" style="text-align: center; margin-top: 12px; cursor: pointer; color: #1a73e8; font-size: 0.85rem; font-weight: bold;">لديك حساب بالفعل؟ تسجیل الدخول</p>
            </form>
        </div>
    </div>

    <!-- Profile Modal -->
    <div class="modal" id="profile-modal">
        <div class="modal-content profile-card" style="text-align: center;">
            <span class="close-btn" id="close-profile-modal">&times;</span>
            <img id="card-user-avatar" src="" alt="Avatar" class="large-avatar" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px;">
            <h3 id="card-user-name" style="margin-bottom: 15px;"></h3>
            <button id="logout-btn" class="logout-action-btn" style="background: #ea4335; color: #fff; border: none; padding: 10px; width: 100%; border-radius: 6px; cursor: pointer;">تسجيل الخروج</button>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal" id="settings-modal">
        <div class="modal-content">
            <span class="close-btn" id="close-settings-modal">&times;</span>
            <h2 style="margin-bottom: 20px;">الإعدادات</h2>
            <div class="settings-options" style="display: flex; flex-direction: column; gap: 10px;">
                <button class="settings-option-btn" id="downloads-btn" style="padding: 12px; cursor: pointer;">التنزيلات</button>
                <button class="settings-option-btn" id="lang-toggle-btn" style="padding: 12px; cursor: pointer;">تغيير اللغة (<span id="lang-indicator">EN</span>)</button>
                <button class="settings-option-btn" id="show-dev-btn" style="padding: 12px; cursor: pointer;">المطور</button>
                <button class="settings-option-btn" id="admin-monitor-btn" style="display: none; padding: 12px; background: #e8f0fe; color: #1a73e8; cursor: pointer;">مراقبة عمليات البحث</button>
            </div>
        </div>
    </div>

    <!-- Admin Monitor Modal -->
    <div class="modal" id="admin-monitor-modal">
        <div class="modal-content" style="max-width: 600px;">
            <span class="close-btn" id="close-admin-monitor-modal">&times;</span>
            <h2 style="margin-bottom: 15px; color: #1a73e8;">مراقبة عمليات البحث</h2>
            <ul id="admin-searches-list" style="list-style: none; padding: 0; max-height: 350px; overflow-y: auto;"></ul>
        </div>
    </div>

    <!-- Developer Modal -->
    <div class="modal" id="dev-modal">
        <div class="modal-content" style="text-align: center;">
            <span class="close-btn" id="close-dev-modal">&times;</span>
            <h2>المطور</h2>
            <p style="margin: 15px 0;">يوسف أبو الحجاج صالح - مصر - قنا</p>
            <a href="https://www.youtube.com/@YYT_1" target="_blank" style="color: #ff0000; font-weight: bold;">زيارة القناة (@YYT_1)</a>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
    <script src="script.js"></script>
</body>
</html>
