function openModal() {
  var modal = document.getElementById("imageModal");
  var mainImg = document.getElementById("myProductImg"); // ID này phải trùng với id của <img>
  var modalImg = document.getElementById("imgExpanded");

  if (modal && mainImg && modalImg) {
    modal.style.display = "flex";
    modalImg.src = mainImg.src; // Lấy link ảnh từ myProductImg gán sang modal
  }
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}
