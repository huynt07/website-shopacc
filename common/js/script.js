$(function () {
    const $authLinkContainer = $('#auth-link-container');
    const $authLink = $('#auth-link');

    if (!$authLinkContainer.length || !$authLink.length) return;

    // 1. Kiểm tra trạng thái đăng nhập từ localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userBalance = Number(localStorage.getItem('userBalance')) || 0;

    if (isLoggedIn && userName) {
        // Đã đăng nhập: hiển thị avatar + tên tài khoản + số dư, kèm dropdown đăng xuất
        $authLinkContainer.addClass('dropdown');
        $authLink
            .addClass('nav-link user-badge dropdown-toggle')
            .attr({
                href: '#',
                role: 'button',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false'
            })
            .removeClass('active')
            .html(`
                <span class="user-badge-avatar"><i class="fa-solid fa-user-ninja"></i></span>
                <span class="user-badge-info">
                    <span class="user-badge-name">${escapeHtml(userName)}</span>
                    <span class="user-badge-balance">Số dư: ${formatCurrency(userBalance)}</span>
                </span>
            `);

        if (!$('#logout-btn').length) {
            const $menu = $('<ul>', { class: 'dropdown-menu dropdown-menu-end user-badge-menu' })
                .html('<li><a class="dropdown-item" href="#" id="logout-btn"><i class="fa-solid fa-right-from-bracket me-2"></i>Đăng xuất</a></li>');
            $authLinkContainer.append($menu);
        }

        $('#logout-btn').on('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userBalance');
            showToast('Bạn đã đăng xuất.');
            setTimeout(() => window.location.reload(), 600);
        });

    } else {
        // Chưa đăng nhập: giữ nguyên href gốc trong HTML của từng trang
        $authLink
            .removeClass('user-badge dropdown-toggle')
            .removeAttr('data-bs-toggle')
            .html('<i class="fa-solid fa-user me-1"></i>Đăng nhập/Đăng ký');
    }
});

/* Định dạng số tiền kiểu 1.000.000 đ */
function formatCurrency(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + ' đ';
}

/* Chống lỗi hiển thị khi tên chứa ký tự đặc biệt */
function escapeHtml(str) {
    return $('<div>').text(str).html();
}

/* Toast thông báo nhỏ dùng chung toàn site */
function showToast(message) {
    let $toast = $('#mini-toast');
    if (!$toast.length) {
        $toast = $('<div>', { id: 'mini-toast', class: 'toast-mini' });
        $('body').append($toast);
    }
    $toast.text(message).addClass('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => $toast.removeClass('show'), 2200);
}

/* =========================================================
   ĐƠN HÀNG (dùng chung: trang mua hàng ghi vào, trang admin đọc/sửa ra)
   Toàn bộ lưu trong localStorage của trình duyệt (xem ghi chú
   trong admin/admin.js về giới hạn của cách lưu trữ này).
   ========================================================= */
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}
function pushAdminOrder(order) {
    const orders = getOrders();
    orders.push(Object.assign({
        id: 'DH' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10),
        status: 'Hoàn tất'
    }, order));
    saveOrders(orders);
}

/* Modal thông báo hiện GIỮA MÀN HÌNH, dùng chung toàn site
   (lỗi đăng nhập, số dư không đủ, cảnh báo quan trọng...).
   type: 'error' (mặc định) hoặc 'warning'. */
function showNoticeModal(options) {
    options = options || {};
    const title = options.title || 'Thông báo';
    const message = options.message || '';
    const type = options.type || 'error';
    const buttonText = options.buttonText || 'Đã hiểu';
    const onClose = typeof options.onClose === 'function' ? options.onClose : null;

    let $overlay = $('#notice-overlay');
    if (!$overlay.length) {
        $overlay = $('<div>', { id: 'notice-overlay', class: 'notice-overlay' }).html(`
            <div class="notice-card">
                <div class="notice-icon"><i class="fa-solid"></i></div>
                <h3 class="notice-title"></h3>
                <p class="notice-message"></p>
                <button type="button" class="notice-btn"></button>
            </div>`);
        $('body').append($overlay);
    }

    const $icon = $overlay.find('.notice-icon');
    $icon.removeClass('is-error is-warning').addClass(type === 'warning' ? 'is-warning' : 'is-error');
    $icon.find('i').attr('class', type === 'warning' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-xmark');

    $overlay.find('.notice-title').text(title);
    $overlay.find('.notice-message').text(message);
    $overlay.find('.notice-btn').text(buttonText);

    function close() {
        $overlay.removeClass('show');
        if (onClose) onClose();
    }

    $overlay.find('.notice-btn').off('click').on('click', close);
    $overlay.off('click').on('click', function (e) {
        if (e.target === $overlay[0]) close();
    });

    $overlay.addClass('show');
}

/* =========================================================
   LIGHTBOX PHÓNG TO / THU NHỎ ẢNH
   Áp dụng cho bất kỳ ảnh nào nằm trong phần tử có class
   "zoomable-img" (vd: ảnh gallery ở trang chi tiết acc).
   ========================================================= */
function openImageLightbox(src, alt) {
    let $overlay = $('#img-lightbox-overlay');
    if (!$overlay.length) {
        $overlay = $('<div>', { id: 'img-lightbox-overlay', class: 'img-lightbox-overlay' }).html(`
            <div class="img-lightbox-toolbar">
                <button type="button" class="lightbox-btn" id="lightbox-zoom-out" title="Thu nhỏ"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
                <button type="button" class="lightbox-btn" id="lightbox-zoom-in" title="Phóng to"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
                <button type="button" class="lightbox-btn" id="lightbox-zoom-reset" title="Đặt lại"><i class="fa-solid fa-arrows-rotate"></i></button>
                <button type="button" class="lightbox-btn lightbox-close" id="lightbox-close" title="Đóng"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="img-lightbox-stage">
                <img id="lightbox-img" src="" alt="">
            </div>`);
        $('body').append($overlay);
    }

    let scale = 1;
    const $img = $overlay.find('#lightbox-img');
    $img.attr({ src: src, alt: alt || '' }).css('transform', 'scale(1)');

    function applyScale() {
        $img.css('transform', 'scale(' + scale + ')');
    }

    $overlay.find('#lightbox-zoom-in').off('click').on('click', function () {
        scale = Math.min(scale + 0.25, 3);
        applyScale();
    });
    $overlay.find('#lightbox-zoom-out').off('click').on('click', function () {
        scale = Math.max(scale - 0.25, 0.5);
        applyScale();
    });
    $overlay.find('#lightbox-zoom-reset').off('click').on('click', function () {
        scale = 1;
        applyScale();
    });

    function close() {
        $overlay.removeClass('show');
        $('body').removeClass('lightbox-open');
    }
    $overlay.find('#lightbox-close').off('click').on('click', close);
    $overlay.off('click.lightboxbg').on('click.lightboxbg', function (e) {
        if (e.target === $overlay[0] || $(e.target).hasClass('img-lightbox-stage')) close();
    });

    // Cuộn chuột để phóng to / thu nhỏ
    $img.off('wheel').on('wheel', function (e) {
        e.preventDefault();
        const delta = e.originalEvent.deltaY;
        scale = delta < 0 ? Math.min(scale + 0.15, 3) : Math.max(scale - 0.15, 0.5);
        applyScale();
    });

    // Bấm đúp để phóng to nhanh / trả về cỡ gốc
    $img.off('dblclick').on('dblclick', function () {
        scale = scale === 1 ? 2 : 1;
        applyScale();
    });

    // Phím tắt: Esc để đóng, +/- để zoom
    $(document).off('keydown.lightbox').on('keydown.lightbox', function (e) {
        if (!$overlay.hasClass('show')) return;
        if (e.key === 'Escape') close();
        if (e.key === '+' || e.key === '=') { scale = Math.min(scale + 0.25, 3); applyScale(); }
        if (e.key === '-') { scale = Math.max(scale - 0.25, 0.5); applyScale(); }
    });

    $overlay.addClass('show');
    $('body').addClass('lightbox-open');
}

$(function () {
    // Gắn sự kiện click cho mọi ảnh nằm trong phần tử ".zoomable-img"
    $(document).on('click', '.zoomable-img img', function () {
        openImageLightbox($(this).attr('src'), $(this).attr('alt'));
    });
});

/* =========================================================
   POPUP THÔNG BÁO KHI VÀO WEB (hiển thị trên mọi trang)
   - Chỉnh nội dung/số Zalo/đường link QR ở WELCOME_POPUP_CONFIG bên dưới.
   - Nút "Đóng": không hiện lại trong phiên làm việc hiện tại (tab đang mở).
   - Nút "Đóng 1 giờ": không hiện lại trong vòng 1 giờ, kể cả mở tab/trang khác.
   ========================================================= */
const WELCOME_POPUP_CONFIG = {
    enabled: true,
    title: "THÔNG TIN QUAN TRỌNG",
    notices: [
        "Hiện tại shop chỉ có 1 kênh chính thức duy nhất, mọi người lưu ý tránh bị giả mạo nha.",
        "Shop hỗ trợ tìm acc theo yêu cầu, liên hệ Zalo để được tư vấn nhanh nhất."
    ],
    // TODO: thay bằng số Zalo thật của shop
    zaloNumbers: ["0123 456 789"],
    // TODO: thay bằng link Zalo thật (vd: https://zalo.me/0123456789) để QR trỏ đúng
    zaloLink: "https://zalo.me/0123456789"
};

function getWelcomePopupQrUrl() {
    return "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(WELCOME_POPUP_CONFIG.zaloLink);
}

function shouldShowWelcomePopup() {
    if (!WELCOME_POPUP_CONFIG.enabled) return false;
    const hideUntil = Number(localStorage.getItem('welcomePopupHideUntil')) || 0;
    if (Date.now() < hideUntil) return false;
    if (sessionStorage.getItem('welcomePopupClosed') === '1') return false;
    return true;
}

function showWelcomePopup() {
    let $overlay = $('#welcome-overlay');
    if (!$overlay.length) {
        const noticesHtml = WELCOME_POPUP_CONFIG.notices.map(function (n) {
            return `<div class="welcome-note"><i class="fa-solid fa-circle-info"></i><span>${n}</span></div>`;
        }).join('');

        const phonesHtml = WELCOME_POPUP_CONFIG.zaloNumbers.map(function (p) {
            return `<span class="phone-num">${p}</span>`;
        }).join('');

        $overlay = $('<div>', { id: 'welcome-overlay', class: 'welcome-overlay' }).html(`
            <div class="welcome-card">
                <div class="welcome-head">
                    <h5>Thông báo mới</h5>
                    <button type="button" class="welcome-close-x" id="welcome-close-x"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="welcome-body">
                    <div class="welcome-title">${WELCOME_POPUP_CONFIG.title}</div>
                    ${noticesHtml}
                    <div class="welcome-contact">
                        <div class="welcome-contact-info">
                            <p>Liên hệ Zalo để được hỗ trợ nhanh nhất (CSKH)</p>
                            ${phonesHtml}
                        </div>
                        <div class="welcome-qr">
                            <img src="${getWelcomePopupQrUrl()}" alt="QR Zalo">
                        </div>
                    </div>
                </div>
                <div class="welcome-actions">
                    <button type="button" class="welcome-btn-close" id="welcome-btn-close">Đóng</button>
                    <button type="button" class="welcome-btn-hour" id="welcome-btn-hour">Đóng 1 giờ</button>
                </div>
            </div>`);
        $('body').append($overlay);
    }

    function close() {
        $overlay.removeClass('show');
        sessionStorage.setItem('welcomePopupClosed', '1');
    }
    function closeOneHour() {
        localStorage.setItem('welcomePopupHideUntil', Date.now() + 60 * 60 * 1000);
        $overlay.removeClass('show');
    }

    $overlay.find('#welcome-close-x, #welcome-btn-close').off('click').on('click', close);
    $overlay.find('#welcome-btn-hour').off('click').on('click', closeOneHour);
    $overlay.off('click.welcomebg').on('click.welcomebg', function (e) {
        if (e.target === $overlay[0]) close();
    });

    $overlay.addClass('show');
}

$(function () {
    if ($('body').hasClass('admin-body')) return; // Không hiện popup thông báo ở khu vực quản trị
    if (shouldShowWelcomePopup()) {
        setTimeout(showWelcomePopup, 400);
    }
});
