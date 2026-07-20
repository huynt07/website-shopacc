/* =========================================================
   SHOPACCGAME.VN — TRANG QUẢN TRỊ (ADMIN)
   ---------------------------------------------------------
   LƯU Ý QUAN TRỌNG:
   Toàn bộ site này là frontend demo (không có backend/server
   thật), mọi dữ liệu (đơn hàng, người dùng, số dư...) được lưu
   trong localStorage CỦA TỪNG TRÌNH DUYỆT. Vì vậy trang quản trị
   này chỉ thấy được dữ liệu phát sinh trên CÙNG một trình duyệt
   (vd: admin và khách test trên cùng máy/cùng Chrome).
   Để có trang quản trị thật quản lý được khách hàng ở mọi nơi,
   bạn cần có backend + database thật (Node/PHP + MySQL/Mongo...).
   ========================================================= */

const ADMIN_PASSCODE = "admin123"; // TODO: đổi mã này, và tốt nhất nên thay bằng đăng nhập backend thật khi lên production

/* ---------- AUTH GATE (demo, KHÔNG an toàn cho production) ---------- */
function isAdminLoggedIn() {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
}

function requireAdminAuth() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'login.html';
    }
}

function adminLogout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'login.html';
}

/* ---------- DỮ LIỆU: ĐƠN HÀNG ----------
   (getOrders / saveOrders / pushAdminOrder được định nghĩa dùng chung
   trong common/js/script.js để trang mua hàng cũng ghi được vào đây) */

/* ---------- DỮ LIỆU: NGƯỜI DÙNG ---------- */
function getAdminUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
function saveAdminUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

/* ---------- DEMO DATA (để xem giao diện có dữ liệu mẫu) ---------- */
function seedDemoData() {
    const demoUsers = [
        { username: 'nguyenvana', email: 'nguyenvana@gmail.com', password: '123456', balance: 250000, joinedAt: '2026-06-02', locked: false },
        { username: 'thao_gaming', email: 'thao.gaming@gmail.com', password: '123456', balance: 0, joinedAt: '2026-06-10', locked: false },
        { username: 'minhquan99', email: 'minhquan99@gmail.com', password: '123456', balance: 1500000, joinedAt: '2026-06-18', locked: true },
        { username: 'lethilan', email: 'lethilan@gmail.com', password: '123456', balance: 320000, joinedAt: '2026-07-01', locked: false }
    ];
    const demoOrders = [
        { id: 'DH00219034', buyerEmail: 'nguyenvana@gmail.com', buyerName: 'nguyenvana', productName: 'Acc Liên Quân - Full 68 Tướng, 120 Skin', price: 850000, date: '05/07/2026', status: 'Hoàn tất', account: 'aB3dK9pQ', password: '481029' },
        { id: 'DH00219035', buyerEmail: 'thao.gaming@gmail.com', buyerName: 'thao_gaming', productName: 'Acc Free Fire 0đ - Level 20, Sẵn Kim Cương Vụn', price: 0, date: '07/07/2026', status: 'Hoàn tất', account: 'khonglammadoicoan', password: 'thiandaubuoiancuc' },
        { id: 'DH00219036', buyerEmail: 'minhquan99@gmail.com', buyerName: 'minhquan99', productName: 'Acc Valorant - Rank Immortal, Full Genesis', price: 1450000, date: '10/07/2026', status: 'Đang xử lý', account: 'Xk29LmZp', password: '739284' },
        { id: 'DH00219037', buyerEmail: 'lethilan@gmail.com', buyerName: 'lethilan', productName: 'Túi Mù 99K', price: 99000, date: '12/07/2026', status: 'Đã huỷ', account: '—', password: '—' },
        { id: 'DH00219038', buyerEmail: 'nguyenvana@gmail.com', buyerName: 'nguyenvana', productName: 'Acc PUBG Mobile - Conqueror, Kho Skin Súng & Xe', price: 980000, date: '13/07/2026', status: 'Hoàn tất', account: 'Qw12eRty', password: '582910' }
    ];

    const existingUsers = getAdminUsers();
    const existingEmails = existingUsers.map(u => u.email);
    const mergedUsers = existingUsers.concat(demoUsers.filter(u => !existingEmails.includes(u.email)));
    saveAdminUsers(mergedUsers);

    const existingOrders = getOrders();
    const existingIds = existingOrders.map(o => o.id);
    const mergedOrders = existingOrders.concat(demoOrders.filter(o => !existingIds.includes(o.id)));
    saveOrders(mergedOrders);
}

function clearAllAdminData() {
    localStorage.removeItem('orders');
    localStorage.removeItem('users');
}

/* ---------- SIDEBAR (render giống nhau trên mọi trang admin) ---------- */
function renderAdminSidebar(activePage) {
    const items = [
        { key: 'dashboard', href: 'index.html', icon: 'fa-gauge-high', label: 'Tổng quan' },
        { key: 'orders', href: 'orders.html', icon: 'fa-receipt', label: 'Quản lý đơn hàng' },
        { key: 'users', href: 'users.html', icon: 'fa-users', label: 'Quản lý người dùng' }
    ];
    const navHtml = items.map(function (it) {
        return `<a href="${it.href}" class="${it.key === activePage ? 'active' : ''}"><i class="fa-solid ${it.icon}"></i>${it.label}</a>`;
    }).join('');

    return `
    <aside class="admin-sidebar" id="admin-sidebar">
        <div class="admin-brand">SHOPACCGAME<span>.VN</span><small>ADMIN PANEL</small></div>
        <nav class="admin-nav">${navHtml}</nav>
        <div class="admin-sidebar-foot">
            <a href="../index.html"><i class="fa-solid fa-arrow-left"></i>Về trang chủ</a>
            <a href="#" id="admin-logout-link"><i class="fa-solid fa-right-from-bracket"></i>Đăng xuất</a>
        </div>
    </aside>`;
}

function initAdminLayout(activePage) {
    requireAdminAuth();
    $('#admin-sidebar-mount').html(renderAdminSidebar(activePage));
    $('#admin-logout-link').on('click', function (e) {
        e.preventDefault();
        adminLogout();
    });
    $('#admin-toggle-btn').on('click', function () {
        $('#admin-sidebar').toggleClass('show');
    });
}

function formatVNDAdmin(number) {
    return Number(number || 0).toLocaleString('vi-VN') + '₫';
}

function escapeHtmlAdmin(str) {
    return $('<div>').text(str == null ? '' : str).html();
}
