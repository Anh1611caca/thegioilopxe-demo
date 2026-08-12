

const dataOTo = {
  "honda": ["City", "CR-V", "Civic", "HR-V", "BR-V", "Accord", "Khác..."],
  "toyota": ["Vios", "Corolla Cross", "Camry", "Fortuner", "Veloz Cross", "Raize", "Yaris Cross", "Khác..."],
  "ford": ["Ranger", "Everest", "Territory", "Ranger Raptor", "Explorer", "Khác..."],
  "mazda": ["Mazda 3", "CX-5", "CX-8", "Mazda 2", "CX-30", "Khác..."],
  "mitsubishi": ["Xpander", "Xforce", "Attrage", "Outlander", "Triton", "Pajero Sport", "Khác..."],
  "hyundai": ["Accent", "Creta", "Tucson", "Santa Fe", "Grand i10", "Custin", "Palisade", "Khác..."],
  "suzuki": ["XL7", "Ertiga", "Swift", "Jimny", "Khác..."],
  "vinfast": ["VF 3", "VF 5", "VF e34", "VF 6", "VF 7", "VF 8", "VF 9", "Khác..."],
  "isuzu": ["D-Max", "mu-X", "Khác..."],
  "lexus": ["RX 350", "NX 350h", "LX 600", "ES 250", "Khác..."],
  "kia": ["Seltos", "Sonet", "Carnival", "K3", "Sorento", "Sportage", "Khác..."],
  "khác...": ["Tất cả phiên bản", "Tiêu chuẩn", "Cao cấp", "Khác..."]
};

// 1. Mở khóa Hãng xe khi chọn Dòng xe
function enableOtherFields() {
  const dongXe = document.getElementById("select-dong-xe").value;
  const selectHang = document.getElementById("select-hang");
  const selectPhienBan = document.getElementById("select-phien-ban");

  if (dongXe !== "") {
    if (selectHang) selectHang.disabled = false;

    // Reset ô Hãng xe
    selectHang.innerHTML = '<option value="" selected disabled>2. Chọn hãng xe</option>';
    let dataCurrent = (dongXe === "xe-may") ? dataXeMay : dataOTo;

    Object.keys(dataCurrent).forEach(function(key) {
      let option = document.createElement("option");
      option.value = key;
      option.text = key.charAt(0).toUpperCase() + key.slice(1);
      selectHang.appendChild(option);
    });

    // Reset ô Phiên bản
    if (selectPhienBan) {
      selectPhienBan.innerHTML = '<option value="" selected disabled>3. Chọn phiên bản (Nếu Có)</option>';
      selectPhienBan.disabled = true;
    }
  }
}

// 2. Mở khóa Phiên bản khi chọn Hãng xe
function updatePhienBan() {
  const dongXe = document.getElementById("select-dong-xe").value;
  const hangXe = document.getElementById("select-hang").value;
  const selectPhienBan = document.getElementById("select-phien-ban");

  if (hangXe !== "" && selectPhienBan) {
    selectPhienBan.disabled = false;
    selectPhienBan.innerHTML = '<option value="" selected disabled>3. Chọn phiên bản (Nếu Có)</option>';

    let dataCurrent = (dongXe === "xe-may") ? dataXeMay : dataOTo;
    let listPhienBan = dataCurrent[hangXe] || ["Tất cả phiên bản", "Tiêu chuẩn", "Cao cấp", "Khác..."];

    listPhienBan.forEach(function(pb) {
      let option = document.createElement("option");
      option.value = pb.toLowerCase();
      option.text = pb;
      selectPhienBan.appendChild(option);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('.featured-grid');
  const cards = document.querySelectorAll('.featured-card');
  
  if (!grid || cards.length === 0) return;

  let currentIndex = 0;
  
  // Tính số lượng card hiển thị cùng lúc (mặc định trên PC là 3)
  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function slideNext() {
  // Lấy danh sách thẻ card hiện tại trong DOM
  const cards = grid.querySelectorAll('.featured-card');
  if (cards.length <= 3) return; // Nếu có 3 thẻ hoặc ít hơn thì không cần trượt

  const firstCard = cards[0]; // Khai báo thẻ đầu tiên
  const cardWidth = firstCard.offsetWidth;
  const gap = 12; // Khớp chính xác với gap: 12px trong CSS của bạn
  const moveAmount = cardWidth + gap;

  // 1. Chỉ dùng marginLeft để trượt mượt thẻ đầu tiên sang bên trái
  firstCard.style.transition = 'margin-left 0.6s ease-in-out';
  firstCard.style.marginLeft = `-${moveAmount}px`;

  // 2. Sau khi trượt xong (600ms), đưa thẻ đầu xuống cuối và reset margin
  setTimeout(() => {
    firstCard.style.transition = 'none';
    firstCard.style.marginLeft = '0px';
    grid.appendChild(firstCard); // Đẩy phần tử xuống cuối danh sách DOM
  }, 600);
}

  // Cứ mỗi 2.5 giây (2500ms) sẽ tự động trượt qua card mới
  let autoSlide = setInterval(slideNext, 2500);

  // Tạm dừng khi di chuột vào và chạy lại khi rê chuột ra ngoài
  grid.addEventListener('mouseenter', () => clearInterval(autoSlide));
  grid.addEventListener('mouseleave', () => {
    autoSlide = setInterval(slideNext, 2500);
  });
});
