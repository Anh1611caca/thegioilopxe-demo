// 1. Tắt cơ chế tự khôi phục vị trí cuộn cũ của trình duyệt
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Hàm thực hiện cuộn mượt xuống mục liên hệ
function cuonXuongLienHe() {
    const target = document.getElementById("lien-he");
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// 2. Tải trang từ Trang chủ sang (Chờ trang & hình ảnh nạp xong 100%)
window.addEventListener("load", function () {
    if (window.location.search.includes("scroll=lien-he") || window.location.hash === "#lien-he") {
        setTimeout(cuonXuongLienHe, 200);
    }
});

// 3. Bắt sự kiện click cho CẢ NÚT "Tư vấn ngay" và "Gửi phản hồi tại đây"
document.addEventListener("DOMContentLoaded", function () {
    // Tìm tất cả các nút/link liên hệ
    const nutLienHe = document.querySelectorAll("#btnTuVan, .feedback-link");

    nutLienHe.forEach(function (element) {
        element.addEventListener("click", function (e) {
            const target = document.getElementById("lien-he");
            // Nếu đang đứng sẵn ở trang contact.html thì cuộn mượt tại chỗ
            if (target) {
                e.preventDefault();
                cuonXuongLienHe();
            }
        });
    });
});
