function scrollBrands(direction) {
  const container = document.getElementById('brandContainer');
  if (!container) return;

  const scrollAmount = 300; // Khoảng cách cuộn mỗi lần bấm
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  // 1. Nếu đang ở CUỐI cùng mà bấm TIẾN (1) -> Lặp lại về ĐẦU
  if (direction === 1 && container.scrollLeft >= maxScrollLeft - 10) {
    container.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
  // 2. Nếu đang ở ĐẦU tiên mà bấm LÙI (-1) -> Lặp lại sang CUỐI
  else if (direction === -1 && container.scrollLeft <= 10) {
    container.scrollTo({
      left: maxScrollLeft,
      behavior: 'smooth'
    });
  }
  // 3. Cuộn bình thường
  else {
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
}
