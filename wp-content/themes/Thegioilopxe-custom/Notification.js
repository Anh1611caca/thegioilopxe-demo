if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    document.head.appendChild(viewport);
}

document.querySelectorAll('link[href*="trangchu.css"]').forEach(function (link) {
    const stylesheetUrl = link.href.split('?')[0];
    link.href = stylesheetUrl + '?ver=1.0.4';
});

document.addEventListener("DOMContentLoaded", function () {
    let responseCount = 0;
    let backToTopBtn = document.getElementById("backToTopBtn");
    if (!backToTopBtn) {
        backToTopBtn = document.createElement("button");
        backToTopBtn.id = "backToTopBtn";
        backToTopBtn.type = "button";
        backToTopBtn.title = "Lên đầu trang";
        backToTopBtn.setAttribute("aria-label", "Lên đầu trang");
        backToTopBtn.textContent = "↑";
        document.body.appendChild(backToTopBtn);
    }

    if (!backToTopBtn.dataset.bound) {
        backToTopBtn.dataset.bound = "true";
        window.addEventListener("scroll", function () {
            backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const siteHeader = document.querySelector(".site-header");
    const mainNav = document.querySelector(".main-nav");
    let menuToggle = document.getElementById("menuToggle");

    if (siteHeader && mainNav && !menuToggle) {
        menuToggle = document.createElement("button");
        menuToggle.id = "menuToggle";
        menuToggle.type = "button";
        menuToggle.className = "menu-toggle";
        menuToggle.setAttribute("aria-label", "Mở menu");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        siteHeader.insertBefore(menuToggle, mainNav);
    }

    if (menuToggle && mainNav && !menuToggle.dataset.bound) {
        menuToggle.dataset.bound = "true";

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            const isOpen = mainNav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", function (event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains("active")) {
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const notifBtn = document.getElementById("notifBtn");
    const notifBox = document.getElementById("notifBox");
    const notifBadge = document.getElementById("notifBadge");
    const notifList = document.getElementById("notifList");
    
    // Lấy thẻ form gửi liên hệ (Ảnh 2)
    const contactForm = document.querySelector(".contact-form-box form");

    // 1. Đóng/mở hộp thông báo khi nhấn vào chuông
    if (notifBtn && notifBox) {
        notifBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            notifBox.classList.toggle("active");
        });
    }

    // Bấm ra ngoài màn hình tự đóng hộp thông báo
    document.addEventListener("click", function () {
        if (notifBox) notifBox.classList.remove("active");
    });

    if (notifBox) {
        notifBox.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // 2. Bắt sự kiện khi người dùng bấm nút gửi ở Form
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn chặn trang web tự tải lại

            responseCount++;

            // Lấy thời gian hiện tại (Giờ : Phút)
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${hours}:${minutes}`;

            // Cập nhật số đỏ trên Icon chuông
            notifBadge.innerText = responseCount;
            notifBadge.style.display = "inline-block";

            // Xóa thông báo trống
            const emptyMsg = notifList.querySelector(".empty-msg");
            if (emptyMsg) {
                emptyMsg.remove();
            }

            // Tạo phần tử nội dung phản hồi mới
            const newItem = document.createElement("li");
            newItem.className = "notif-item";
            newItem.innerHTML = `
                <strong>Có 1 phản hồi mới!</strong><br>
                <span>Cập nhật lúc ${timeString}</span>
            `;

            // Thêm phản hồi mới nhất lên trên cùng
            notifList.prepend(newItem);

            // Làm sạch ô nhập liệu sau khi gửi
            contactForm.reset();

            alert("Đã gửi phản hồi thành công!");
        });
    }
});
