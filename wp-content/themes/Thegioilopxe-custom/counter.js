document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    
    const runCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target'); // Lấy số mục tiêu
            const count = +counter.innerText; // Lấy số hiện tại
            const increment = target / 200; // Tốc độ đếm (chia càng nhỏ đếm càng chậm)

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Chỉ chạy hiệu ứng khi người dùng cuộn đến phần đó
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target); // Chỉ chạy 1 lần duy nhất
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});
