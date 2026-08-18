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
