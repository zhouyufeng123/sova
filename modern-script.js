// ============================
// 现代家具电商网站 JavaScript
// 双语支持与交互功能
// ============================

// 语言状态管理
let currentLanguage = 'zh'; // 默认中文

// 语言切换功能
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'lo' : 'zh';
    updateLanguage();
    updateLanguageButton();
}

// 更新页面语言
function updateLanguage() {
    // 更新所有带有 data-zh 和 data-lo 属性的元素
    const elements = document.querySelectorAll('[data-zh], [data-lo]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const loText = element.getAttribute('data-lo');
        
        if (zhText && loText) {
            element.textContent = currentLanguage === 'zh' ? zhText : loText;
        }
        
        // 处理输入框的占位符
        if (element.hasAttribute('placeholder')) {
            const zhPlaceholder = element.getAttribute('data-zh-placeholder');
            const loPlaceholder = element.getAttribute('data-lo-placeholder');
            
            if (zhPlaceholder && loPlaceholder) {
                element.placeholder = currentLanguage === 'zh' ? zhPlaceholder : loPlaceholder;
            }
        }
        
        // 处理按钮值
        if (element.type === 'submit' || element.type === 'button') {
            const zhValue = element.getAttribute('data-zh-value');
            const loValue = element.getAttribute('data-lo-value');
            
            if (zhValue && loValue) {
                element.value = currentLanguage === 'zh' ? zhValue : loValue; 
            }
        }
    });
    
    // 更新页面标题
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const zhTitle = titleElement.getAttribute('data-zh');
        const loTitle = titleElement.getAttribute('data-lo');
        
        if (zhTitle && loTitle) {
            titleElement.textContent = currentLanguage === 'zh' ? zhTitle : loTitle;
        }
    }
    
    // 更新页面语言属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'lo';
}

// 更新语言切换按钮
function updateLanguageButton() {
    const floatingLangButton = document.getElementById('floatingLangSwitcher');
    if (floatingLangButton) {
        floatingLangButton.textContent = currentLanguage === 'zh' ? 'ລາວ' : '中文';
    }
}

// 轮播图功能
function initSlider() {
    const slider = document.getElementById('mainSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // 事件监听
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);
    
    // 鼠标悬停时暂停轮播
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            
            // 更新菜单图标
            const isActive = navbarMenu.classList.contains('active');
            menuToggle.textContent = isActive ? '✕' : '☰';
        });
    }
}

// 产品筛选功能
function initProductFilters() {
    const filterColor = document.getElementById('filterColor');
    const filterSize = document.getElementById('filterSize');
    const filterPrice = document.getElementById('filterPrice');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const resetNoResultsBtn = document.getElementById('resetNoResults');
    const productList = document.getElementById('productList');
    const loadingState = document.getElementById('loadingState');
    const noResults = document.getElementById('noResults');
    const filterResults = document.getElementById('filterResults');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!filterColor || !filterSize || !filterPrice || !productList) return;
    
    // 产品数据
    const products = [
        {
            id: 1,
            name: '经典三人沙发',
            nameLo: 'ໂຊຟາ 3 ທີ່ນັ່ງຄລາສສິກ',
            description: '简约设计，舒适耐用，适合各种家居风格',
            descriptionLo: 'ການອອກແບບແບບງ່າຍດາຍ, ສະດວກສະບາຍແລະທົນທານ, ເໝາະກັບທຸກສະໄຕເຮືອນ',
            price: '3,500,000 LAK',
            color: '米白',
            size: '大',
            priceRange: '3000001-5000000',
            image: './Gemini_Generated_Image_wvit3qwvit3qwvit.png',
            tags: ['热销', '新品']
        },
        {
            id: 2,
            name: '现代转角沙发',
            nameLo: 'ໂຊຟາມຸມທີ່ທັນສະໄໝ',
            description: '大空间设计，完美适配客厅角落',
            descriptionLo: 'ການອອກແບບພື້ນທີ່ຂະຫນາດໃຫຍ່, ເໝາະສົມກັບມຸມຫ້ອງຮັບແຂກ',
            price: '5,800,000 LAK',
            color: '深灰',
            size: '特大',
            priceRange: '5000001-7000000',
            image: './ChatGPT Image 2025年10月4日 15_09_21.png',
            tags: ['L型', '多功能']
        },
        {
            id: 3,
            name: '舒适单人沙发',
            nameLo: 'ໂຊຟາດຽວທີ່ສະດວກສະບາຍ',
            description: '紧凑型设计，节省空间的理想选择',
            descriptionLo: 'ການອອກແບບຂະໜາດກະທັດຮັດ, ເລືອກທີ່ດີທີ່ສຸດສຳຫຼັບການປະຫຍັດພື້ນທີ່',
            price: '1,800,000 LAK',
            color: '浅棕',
            size: '小',
            priceRange: '0-3000000',
            image: './Gemini_Generated_Image_f2prpef2prpef2pr.png',
            tags: ['小巧', '移动方便']
        },
        {
            id: 4,
            name: '豪华皮质沙发',
            nameLo: 'ໂຊຟາໜັງທີ່ຫຼູຫຼາ',
            description: '高端皮革面料，彰显品味与格调',
            descriptionLo: 'ວັດສະດຸໜັງຊັ້ນສູງ, ສະແດງລົດຊາດແລະຄວາມສະຫງ່າງາມ',
            price: '7,200,000 LAK',
            color: '深棕',
            size: '大',
            priceRange: '7000001-99999999',
            image: './ChatGPT Image 2025年10月4日 15_38_05.png',
            tags: ['真皮', '豪华']
        },
        {
            id: 5,
            name: '布艺双人沙发',
            nameLo: 'ໂຊຟາຄູ່ຜ້າ',
            description: '柔软布艺，温馨舒适的家居选择',
            descriptionLo: 'ຜ້າອ່ອນນຸ່ມ, ທີ່ເລືອກທີ່ອົບອຸ່ນສຳລັບເຮືອນ',
            price: '2,500,000 LAK',
            color: '蓝色',
            size: '中',
            priceRange: '3000001-5000000',
            image: './image/sofa-placeholder.png',
            tags: ['布艺', '温馨']
        },
        {
            id: 6,
            name: '简约单人椅',
            nameLo: 'ເກົ້າອີ້ງດຽວງ່າຍດາຍ',
            description: '现代简约设计，适合小空间',
            descriptionLo: 'ການອອກແບບທັນສະໄໝງ່າຍດາຍ, ເໝາະສຳລັບພື້ນທີ່ນ້ອຍ',
            price: '1,200,000 LAK',
            color: '米白',
            size: '小',
            priceRange: '0-3000000',
            image: './image/sofa-placeholder.png',
            tags: ['简约', '小户型']
        }
    ];
    
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...products];
    
    // 显示加载状态
    function showLoading() {
        loadingState.classList.remove('hidden');
        productList.classList.add('loading');
        noResults.classList.add('hidden');
        loadMoreContainer.classList.add('hidden');
    }
    
    // 隐藏加载状态
    function hideLoading() {
        loadingState.classList.add('hidden');
        productList.classList.remove('loading');
    }
    
    // 显示无结果状态
    function showNoResults() {
        noResults.classList.remove('hidden');
        productList.classList.add('hidden');
        loadMoreContainer.classList.add('hidden');
    }
    
    // 隐藏无结果状态
    function hideNoResults() {
        noResults.classList.add('hidden');
        productList.classList.remove('hidden');
    }
    
    // 更新筛选结果统计
    function updateResultsCount(count) {
        if (filterResults) {
            const totalProducts = products.length;
            if (count === totalProducts) {
                filterResults.innerHTML = `<span data-zh="显示所有 ${totalProducts} 个产品" data-lo="ສະແດງຜະລິດຕະພັນທັງໝົດ ${totalProducts} ລາຍການ">显示所有 ${totalProducts} 个产品</span>`;
            } else {
                filterResults.innerHTML = `<span data-zh="找到 ${count} 个产品 (共 ${totalProducts} 个)" data-lo="ພົບ ${count} ຜະລິດຕະພັນ (ທັງໝົດ ${totalProducts} ລາຍການ)">找到 ${count} 个产品 (共 ${totalProducts} 个)</span>`;
            }
        }
    }
    
    // 筛选产品
    function filterProducts() {
        const colorValue = filterColor.value;
        const sizeValue = filterSize.value;
        const priceValue = filterPrice.value;
        
        showLoading();
        
        // 模拟网络延迟
        setTimeout(() => {
            filteredProducts = products.filter(product => {
                const colorMatch = colorValue === 'all' || product.color === colorValue;
                const sizeMatch = sizeValue === 'all' || product.size === sizeValue;
                const priceMatch = priceValue === 'all' || product.priceRange === priceValue;
                
                return colorMatch && sizeMatch && priceMatch;
            });
            
            currentPage = 1;
            displayProducts();
            hideLoading();
            
            // 更新结果统计
            updateResultsCount(filteredProducts.length);
            
            // 显示/隐藏无结果状态
            if (filteredProducts.length === 0) {
                showNoResults();
            } else {
                hideNoResults();
            }
            
            // 显示/隐藏加载更多按钮
            if (filteredProducts.length > productsPerPage) {
                loadMoreContainer.classList.remove('hidden');
            } else {
                loadMoreContainer.classList.add('hidden');
            }
        }, 500);
    }
    
    // 重置筛选
    function resetFilters() {
        filterColor.value = 'all';
        filterSize.value = 'all';
        filterPrice.value = 'all';
        filteredProducts = [...products];
        currentPage = 1;
        displayProducts();
        updateResultsCount(products.length);
        hideNoResults();
        loadMoreContainer.classList.add('hidden');
    }
    
    // 显示产品
    function displayProducts() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(0, endIndex);
        
        productList.innerHTML = productsToShow.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    ${product.tags && product.tags.length > 0 ? `
                        <div class="product-tags">
                            ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    <h3 class="product-title" data-zh="${product.name}" data-lo="${product.nameLo}">${product.name}</h3>
                    <p class="product-description" data-zh="${product.description}" data-lo="${product.descriptionLo}">${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-primary" data-zh="查看详情" data-lo="ເບິ່ງລາຍລະອຽດ">查看详情</a>
                </div>
            </div>
        `).join('');
        
        // 更新语言显示
        updateLanguage();
        
        // 更新加载更多按钮状态
        if (endIndex >= filteredProducts.length) {
            loadMoreContainer.classList.add('hidden');
        } else {
            loadMoreContainer.classList.remove('hidden');
        }
    }
    
    // 加载更多产品
    function loadMoreProducts() {
        currentPage++;
        displayProducts();
    }
    
    // 事件监听
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterProducts);
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
    
    if (resetNoResultsBtn) {
        resetNoResultsBtn.addEventListener('click', resetFilters);
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // 初始加载
    showLoading();
    setTimeout(() => {
        displayProducts();
        hideLoading();
        updateResultsCount(products.length);
    }, 1000);
}

// 产品详情页加载
function loadProductDetail() {
    const productDetailInfo = document.getElementById('productDetailInfo');
    const productDetailImage = document.getElementById('productDetailImage');
    
    if (!productDetailInfo || !productDetailImage) return;
    
    // 从URL获取产品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // 模拟产品数据
    const products = {
        '1': {
            name: '经典三人沙发',
            nameLo: 'ໂຊຟາ 3 ທີ່ນັ່ງຄລາສສິກ',
            description: '简约设计，舒适耐用，适合各种家居风格',
            descriptionLo: 'ການອອກແບບແບບງ່າຍດາຍ, ສະດວກສະບາຍແລະທົນທານ, ເໝາະກັບທຸກສະໄຕເຮືອນ',
            price: '3,500,000 LAK',
            features: ['高密度海绵填充', '实木框架', '可拆洗布套', '环保材料'],
            featuresLo: ['ການອັດຕື່ມຟອງຄວາມຫນາແຫນ້ນສູງ', 'ໂຄງສ້າງເຄື່ອງເຮືອນໄມ້', 'ຜ້າຫຸ້ມສາມາດຖອດອອກລ້າງໄດ້', 'ວັດສະດຸເປັນມິດກັບສິ່ງແວດລ້ອມ'],
            image: './Gemini_Generated_Image_wvit3qwvit3qwvit.png'
        },
        '2': {
            name: '现代转角沙发',
            nameLo: 'ໂຊຟາມຸມທີ່ທັນສະໄໝ',
            description: '大空间设计，完美适配客厅角落',
            descriptionLo: 'ການອອກແບບພື້ນທີ່ຂະຫນາດໃຫຍ່, ເໝາະສົມກັບມຸມຫ້ອງຮັບແຂກ',
            price: '5,800,000 LAK',
            features: ['L型设计', '多功能储物', '优质皮革', '人体工学支撑'],
            featuresLo: ['ການອອກແບບຮູບຊົງ L', 'ການເກັບຮັກສາຫຼາຍຫນ້າທີ່', 'ໜັງຄຸນນະພາບສູງ', 'ການສະຫນັບສະຫນູນຮ່າງກາຍມະນຸດ'],
            image: './ChatGPT Image 2025年10月4日 15_09_21.png'
        },
        '3': {
            name: '舒适单人沙发',
            nameLo: 'ໂຊຟາດຽວທີ່ສະດວກສະບາຍ',
            description: '紧凑型设计，节省空间的理想选择',
            descriptionLo: 'ການອອກແບບຂະໜາດກະທັດຮັດ, ເລືອກທີ່ດີທີ່ສຸດສຳຫຼັບການປະຫຍັດພື້ນທີ່',
            price: '1,800,000 LAK',
            features: ['小巧精致', '移动方便', '多种颜色可选', '适合小户型'],
            featuresLo: ['ນ້ອຍແລະສວຍງາມ', 'ງ່າຍຕໍ່ການຍ້າຍ', 'ມີຫຼາຍສີໃຫ້ເລືອກ', 'ເໝາະສຳລັບເຮືອນຂະໜາດນ້ອຍ'],
            image: './Gemini_Generated_Image_f2prpef2prpef2pr.png'
        },
        '4': {
            name: '豪华皮质沙发',
            nameLo: 'ໂຊຟາໜັງທີ່ຫຼູຫຼາ',
            description: '高端皮革面料，彰显品味与格调',
            descriptionLo: 'ວັດສະດຸໜັງຊັ້ນສູງ, ສະແດງລົດຊາດແລະຄວາມສະຫງ່າງາມ',
            price: '7,200,000 LAK',
            features: ['进口头层牛皮', '手工缝制', '豪华舒适', '长久耐用'],
            featuresLo: ['ໜັງງົວຊັ້ນທຳອິດນຳເຂົ້າ', 'ການຫຍິບມື', 'ຄວາມສະດວກສະບາຍຫຼູຫຼາ', 'ທົນທານໄດ້ດົນ'],
            image: './ChatGPT Image 2025年10月4日 15_38_05.png'
        }
    };
    
    const product = products[productId] || products['1'];
    
    // 更新产品图片
    if (productDetailImage) {
        productDetailImage.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        `;
    }
    
    // 更新产品信息
    if (productDetailInfo) {
        productDetailInfo.innerHTML = `
            <h1 data-zh="${product.name}" data-lo="${product.nameLo}">${product.name}</h1>
            <p class="product-detail-description" data-zh="${product.description}" data-lo="${product.descriptionLo}">${product.description}</p>
            <div class="product-detail-price">${product.price}</div>
            
            <h3 data-zh="产品特点" data-lo="ຄຸນລັກສະນະຜະລິດຕະພັນ">产品特点</h3>
            <ul class="product-features">
                ${product.features.map((feature, index) => `
                    <li data-zh="${feature}" data-lo="${product.featuresLo[index]}">${feature}</li>
                `).join('')}
            </ul>
            
            <div class="btn-group mt-2">
                <a href="contact.html" class="btn btn-primary" data-zh="立即咨询" data-lo="ສອບຖາມດຽວນີ້">立即咨询</a>
                <a href="products.html" class="btn btn-secondary" data-zh="查看更多产品" data-lo="ເບິ່ງຜະລິດຕະພັນເພີ່ມເຕີມ">查看更多产品</a>
            </div>
        `;
    }
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#E74C3C';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert(currentLanguage === 'zh' ? '请填写所有必填字段' : 'ກະລຸນາຕື່ມຂໍ້ມູນທັງຫມົດທີ່ຕ້ອງການ');
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initSlider();
    initProductFilters();
    loadProductDetail();
    initSmoothScroll();
    initFormValidation();
    
    // 更新语言显示
    updateLanguage();
    updateLanguageButton();
    
    // 添加加载动画
    document.body.classList.add('loaded');
});

// 性能优化：图片懒加载
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// 导出函数供全局使用
window.toggleLanguage = toggleLanguage;
