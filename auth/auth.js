$(function () {

    const $loginForm = $('#loginForm');
    const $registerForm = $('#registerForm');
    const $switchToRegister = $('#switchToRegister');
    const $switchToLogin = $('#switchToLogin');
    const $loginFormElement = $('#login-form');
    const $registerFormElement = $('#register-form');

    // ========================
    // CHUYỂN FORM
    // ========================
    function showRegister() {
        $loginForm.addClass('d-none');
        $registerForm.removeClass('d-none');
    }

    function showLogin() {
        $registerForm.addClass('d-none');
        $loginForm.removeClass('d-none');
    }

    $switchToRegister.on('click', function (e) {
        e.preventDefault();
        showRegister();
    });

    $switchToLogin.on('click', function (e) {
        e.preventDefault();
        showLogin();
    });

    // ========================
    // LẤY DANH SÁCH USER
    // ========================
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // ========================
    // XỬ LÝ ĐĂNG KÝ
    // ========================
    $registerFormElement.on('submit', function (e) {
        e.preventDefault();

        const username = $('#registerUsername').val().trim();
        const email = $('#registerEmail').val().trim();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            showNoticeModal({
                type: 'error',
                title: 'Mật khẩu không khớp',
                message: 'Mật khẩu và xác nhận mật khẩu không giống nhau. Vui lòng nhập lại.'
            });
            return;
        }

        let users = getUsers();
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            showNoticeModal({
                type: 'error',
                title: 'Tài khoản đã tồn tại',
                message: 'Email này đã được đăng ký trước đó. Vui lòng đăng nhập hoặc dùng email khác.'
            });
            return;
        }

        users.push({
            username: username,
            email: email,
            password: password,
            balance: 0,
            joinedAt: new Date().toLocaleDateString('vi-VN'),
            locked: false
        });

        saveUsers(users);

        $registerFormElement[0].reset();
        showSuccessEffect('Đăng ký thành công!', 'Mời bạn đăng nhập để bắt đầu mua sắm.', function () {
            showLogin();
        });
    });

    // ========================
    // XỬ LÝ ĐĂNG NHẬP
    // ========================
    $loginFormElement.on('submit', function (e) {
        e.preventDefault();

        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val();

        let users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            showNoticeModal({
                type: 'error',
                title: 'Không tìm thấy tài khoản',
                message: 'Email này chưa được đăng ký. Vui lòng kiểm tra lại hoặc tạo tài khoản mới.'
            });
            return;
        }

        if (user.password !== password) {
            showNoticeModal({
                type: 'error',
                title: 'Sai mật khẩu',
                message: 'Mật khẩu bạn nhập chưa chính xác. Vui lòng thử lại.'
            });
            return;
        }

        if (user.locked) {
            showNoticeModal({
                type: 'error',
                title: 'Tài khoản đã bị khoá',
                message: 'Tài khoản của bạn đã bị khoá. Vui lòng liên hệ CSKH để được hỗ trợ.'
            });
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.username || email.split('@')[0]);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userBalance', typeof user.balance === 'number' ? user.balance : 0);

        showSuccessEffect('Đăng nhập thành công!', 'Đang chuyển hướng về trang chủ...', function () {
            window.location.href = '../index.html';
        }, 1300);
    });

    // ========================
    // HIỆU ỨNG THÀNH CÔNG (dùng chung cho đăng ký & đăng nhập)
    // ========================
    function showSuccessEffect(title, subtitle, callback, delay) {
        delay = delay || 1400;
        let $overlay = $('#success-overlay');

        if (!$overlay.length) {
            $overlay = $('<div>', { id: 'success-overlay', class: 'success-overlay' }).html(`
                <div class="success-card">
                    <div class="success-check-circle">
                        <svg viewBox="0 0 52 52" class="success-check-svg">
                            <circle class="success-check-circle-bg" cx="26" cy="26" r="24" fill="none"></circle>
                            <path class="success-check-mark" fill="none" d="M14 27l7 7 17-17"></path>
                        </svg>
                    </div>
                    <h3 class="success-title"></h3>
                    <p class="success-sub"></p>
                </div>`);
            $('body').append($overlay);
        }

        $overlay.find('.success-title').text(title || '');
        $overlay.find('.success-sub').text(subtitle || '');

        $overlay.removeClass('show hide');
        void $overlay[0].offsetWidth; // buộc trình duyệt tính lại để chạy lại animation
        $overlay.addClass('show');

        setTimeout(function () {
            $overlay.removeClass('show').addClass('hide');
            setTimeout(function () {
                $overlay.removeClass('hide');
                if (typeof callback === 'function') callback();
            }, 350);
        }, delay);
    }

});
