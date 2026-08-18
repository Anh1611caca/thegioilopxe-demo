// 1. Hàm tự động đổ Dòng xe con khi chọn Hãng xe cha
function updateCarModels() {
    var brandSelect = document.getElementById('car-brand');
    var modelSelect = document.getElementById('car-model');

    if (!brandSelect || !modelSelect) return;

    var selectedBrandId = brandSelect.value;

    // Reset ô Dòng xe
    modelSelect.innerHTML = '<option value="">2. Chọn dòng xe</option>';

    if (!selectedBrandId) {
        modelSelect.disabled = true;
        return;
    }

    // Lọc các dòng xe con từ biến allCarModels (đã encode từ PHP ở site-banner.php)
    if (typeof allCarModels !== 'undefined' && Array.isArray(allCarModels)) {
        var childModels = allCarModels.filter(function (item) {
            return String(item.parent) === String(selectedBrandId);
        });

        if (childModels.length > 0) {
            childModels.forEach(function (model) {
                var opt = document.createElement('option');
                opt.value = model.id;
                opt.textContent = model.name;
                modelSelect.appendChild(opt);
            });
            // Mở khóa ô Dòng xe
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
    }
}

// 2. Hàm xử lý khi bấm TÌM KIẾM
function handleCarSearch(event) {
    if (event) event.preventDefault();

    var brandSelect = document.getElementById('car-brand');
    var modelSelect = document.getElementById('car-model');

    var brandVal = brandSelect ? brandSelect.value : '';
    var modelVal = modelSelect ? modelSelect.value : '';

    var activeSelect = (modelVal && modelVal !== '') ? modelSelect : brandSelect;

    if (!activeSelect || !activeSelect.value) {
        alert('Vui lòng chọn Hãng xe hoặc Dòng xe!');
        return false;
    }

    // Lấy tên hiển thị của Option đang chọn
    var selectedText = activeSelect.options[activeSelect.selectedIndex].text.trim();

    // NẾU LÀ VF 5 -> NHẢY THẲNG VÀO FILE LopAdvenza.php
    if (selectedText.toUpperCase() === 'VF 5' || selectedText.toUpperCase() === 'VF5') {
        var path = window.location.pathname;
        var wpFolderIndex = path.indexOf('thegioilopxe-wp');
        var basePath = '';

        if (wpFolderIndex !== -1) {
            basePath = path.substring(0, wpFolderIndex + 'thegioilopxe-wp'.length);
        } else {
            basePath = '/Thegioilopxe/Thegioilopxe/thegioilopxe-wp';
        }

        window.location.href = window.location.origin + basePath + '/wp-content/themes/Thegioilopxe-custom/LopXe/LopAdvenza.php';
        return false;
    }

    // Với các xe khác: Chuyển theo liên kết taxonomy link có sẵn trong allCarModels
    if (typeof allCarModels !== 'undefined' && Array.isArray(allCarModels)) {
        var found = allCarModels.find(function (item) {
            return String(item.id) === String(activeSelect.value);
        });
        if (found && found.link) {
            window.location.href = found.link;
            return false;
        }
    }

    alert('Không tìm thấy link cho dòng xe đã chọn!');
    return false;
}