// Cấu hình phân trang
const itemsPerPage = 14;
let currentPage = 1;

function displayProducts() {
  const products = document.querySelectorAll('.product-grid-container .product-item-card');
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // Tính chỉ số sản phẩm cần hiển thị
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Ẩn/Hiện sản phẩm
  products.forEach((product, index) => {
    if (index >= startIndex && index < endIndex) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });

  // Cập nhật trạng thái nút Prev/Next
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = (currentPage === 1);
  if (nextBtn) nextBtn.disabled = (currentPage === totalPages || totalPages === 0);

  // Vẽ lại các nút số trang
  renderPageNumbers(totalPages);
  
  // Cập nhật văn bản hiển thị kết quả (VD: Hiển thị 1–9 trong 28 kết quả)
  const resultCountText = document.querySelector('.result-count');
  if (resultCountText) {
    const currentCountStart = totalProducts > 0 ? startIndex + 1 : 0;
    const currentCountEnd = Math.min(endIndex, totalProducts);
    resultCountText.textContent = `Hiển thị ${currentCountStart}–${currentCountEnd} trong ${totalProducts} kết quả`;
  }
}

function renderPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById('pageNumbers');
  if (!pageNumbersContainer) return;
  
  pageNumbersContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.classList.add('page-num');
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }
    pageBtn.textContent = i;
    pageBtn.onclick = function () {
      currentPage = i;
      displayProducts();
      scrollToTop();
    };
    pageNumbersContainer.appendChild(pageBtn);
  }
}

function changePage(step) {
  currentPage += step;
  displayProducts();
  scrollToTop();
}

// Cuộn mượt lên đầu danh sách sản phẩm khi chuyển trang
function scrollToTop() {
  const categoryHeader = document.querySelector('.category-header');
  if (categoryHeader) {
    categoryHeader.scrollIntoView({ behavior: 'smooth' });
  }
}

// Chạy lần đầu khi tải xong DOM
document.addEventListener('DOMContentLoaded', function () {
  displayProducts();
});
