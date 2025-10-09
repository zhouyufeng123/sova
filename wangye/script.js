/**
 * ============================================
 * 产品数据 (模拟数据库)
 * ============================================
 * 包含中文和老挝语的产品信息，用于产品列表页和筛选
 */
const productsData = [
    {
        id: 1,
        name_zh: "经典三人沙发",
        name_lo: "ໂຊຟາ 3 ທີ່ນັ່ງຄລາສສິກ",
        description_zh: "简约设计，舒适耐用，适合各种家居风格。",
        description_lo: "ການອອກແບບແບບງ່າຍດາຍ, ສະດວກສະບາຍແລະທົນທານ, ເໝາະກັບທຸກສະໄຕເຮືອນ.",
        price: 3500000, // LAK
        currency: "LAK",
        color: "米白",
        material: "布艺",
        size: "大",
        image: "./Gemini_Generated_Image_wvit3qwvit3qwvit.png"
    },
    {
        id: 2,
        name_zh: "现代转角沙发",
        name_lo: "ໂຊຟາມຸມທີ່ທັນສະໄໝ",
        description_zh: "大空间设计，完美适配客厅角落。",
        description_lo: "ການອອກແບບພື້ນທີ່ຂະຫນາດໃຫຍ່, ເໝາະສົມກັບມຸມຫ້ອງຮັບແຂກ.",
        price: 10500000,
        currency: "LAK",
        color: "深灰",
        material: "真皮",
        size: "特大",
        image: "./6636-home.png"
    },
    {
        id: 3,
        name_zh: "舒适单人沙发",
        name_lo: "ໂຊຟາດຽວທີ່ສະດວກສະບາຍ",
        description_zh: "紧凑型设计，节省空间的理想选择。",
        description_lo: "ການອອກແບບຂະໜາດກະທັດຮັດ, ເລືອກທີ່ດີທີ່ສຸດສຳຫຼັບການປະຫຍັດພື້ນທີ່.",
        price: 1800000,
        currency: "LAK",
        color: "浅棕",
        material: "布艺",
        size: "小",
        image: "./Gemini_Generated_Image_f2prpef2prpef2pr.png"
    },
    {
        id: 4,
        name_zh: "豪华皮质沙发",
        name_lo: "ໂຊຟາໜັງທີ່ຫຼູຫຼາ",
        description_zh: "高端皮革面料，彰显品味与格调。",
        description_lo: "ວັດສະດຸໜັງຊັ້ນສູງ, ສະແດງລົດຊາດແລະຄວາມສະຫງ່າງາມ.",
        price: 7200000,
        currency: "LAK",
        color: "深棕",
        material: "真皮",
        size: "大",
        image: "./ChatGPT Image 2025年10月4日 15_38_05.png"
    },
    // 添加更多产品...
    {
        id: 5,
        name_zh: "北欧休闲双人沙发",
        name_lo: "ໂຊຟາຄູ່ແບບນໍດິກ",
        description_zh: "现代简约风，适合年轻夫妇的经济型选择。",
        description_lo: "ສໄຕທີ່ທັນສະໄຫມແລະງ່າຍດາຍ, ທາງເລືອກທີ່ປະຫຍັດສໍາລັບຄູ່ຫນຸ່ມ.",
        price: 2990000,
        currency: "LAK",
        color: "蓝色",
        material: "布艺",
        size: "中",
        image: "https://via.placeholder.com/400x300/8B7E74/FFFFFF?text=北欧休闲沙发"
    }
];

/**
 * ============================================
 * 语言切换逻辑
 * ============================================
 */

// 默认语言：中文
let currentLang = 'zh';

// 检查本地存储中的语言设置
if (localStorage.getItem('lang')) {
    currentLang = localStorage.getItem('lang');
}

// 切换语言函数 (绑定到按钮)
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'lo' : 'zh';
    localStorage.setItem('lang', currentLang);
    updateContentLanguage();
}

// 更新页面内容的语言
function updateContentLanguage() {
    const elements = document.querySelectorAll('[data-zh], [data-lo]');
    const langSwitcher = document.getElementById('langSwitcher');

    elements.forEach(element => {
        const key = `data-${currentLang}`;
        if (element.hasAttribute(key)) {
            element.textContent = element.getAttribute(key);
            // 特殊处理 input/textarea 的 placeholder
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = element.getAttribute(key);
            }
        }
    });

    // 更新按钮显示
    if (langSwitcher) {
        langSwitcher.textContent = currentLang === 'zh' ? 'ລາວ' : '中文';
    }
    
    // 还需要特殊更新 <title> 标签
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const key = `data-${currentLang}`;
        if (titleElement.hasAttribute(key)) {
            titleElement.textContent = titleElement.getAttribute(key);
        }
    }
}

// 首次加载页面时执行语言更新
document.addEventListener('DOMContentLoaded', () => {
    updateContentLanguage();

    // ============================================
    // 移动端菜单切换逻辑
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    // ============================================
    // 产品列表页 (products.html) 专属逻辑
    // ============================================
    if (document.getElementById('productList')) {
        renderProductList(productsData);
        // 添加筛选器事件监听
        document.getElementById('filterColor').addEventListener('change', applyFilters);
        document.getElementById('filterSize').addEventListener('change', applyFilters);
        document.getElementById('filterPrice').addEventListener('change', applyFilters);
    }

    // ============================================
    // 产品详情页 (product-detail.html) 专属逻辑
    // ============================================
    if (document.getElementById('productDetailInfo')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        if (productId) {
            renderProductDetail(productId);
        } else {
            console.error("未找到产品ID");
        }
    }

    // ============================================
    // 品类目录交互逻辑
    // ============================================
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const categoryLinks = {
                'sofa': 'products.html?category=sofa',
                'bed': 'products.html?category=bed',
                'dining': 'products.html?category=dining'
            };
            
            if (categoryLinks[category]) {
                window.location.href = categoryLinks[category];
            }
        });

        // 添加鼠标悬停音效反馈（可选）
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});


/**
 * ============================================
 * 辅助函数: 格式化价格 (老挝基普 LAK)
 * ============================================
 */
function formatLAK(amount) {
    // 格式化为老挝语环境的数字字符串
    return new Intl.NumberFormat('lo-LA', {
        style: 'currency',
        currency: 'LAK',
        minimumFractionDigits: 0
    }).format(amount);
}


/**
 * ============================================
 * 产品列表页渲染函数
 * ============================================
 */
function renderProductList(products) {
    const listContainer = document.getElementById('productList');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // 清空现有内容

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const priceDisplay = formatLAK(product.price);
        
        // 使用模板字符串创建卡片HTML
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name_zh}" class="product-image">
            <div class="product-info">
                <h3 class="product-title" data-zh="${product.name_zh}" data-lo="${product.name_lo}">${currentLang === 'zh' ? product.name_zh : product.name_lo}</h3>
                <p class="product-description" data-zh="${product.description_zh}" data-lo="${product.description_lo}">${currentLang === 'zh' ? product.description_zh : product.description_lo}</p>
                <div class="product-price">${priceDisplay}</div>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary" data-zh="查看详情" data-lo="ເບິ່ງລາຍລະອຽດ">${currentLang === 'zh' ? '查看详情' : 'ເບິ່ງລາຍລະອຽດ'}</a>
            </div>
        `;
        listContainer.appendChild(productCard);
    });

    // 渲染完成后，重新应用语言切换，以确保新生成的元素的 data 属性被激活
    updateContentLanguage(); 
}


/**
 * ============================================
 * 产品筛选逻辑
 * ============================================
 */
function applyFilters() {
    const color = document.getElementById('filterColor').value;
    const size = document.getElementById('filterSize').value;
    const priceRange = document.getElementById('filterPrice').value;

    const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    
    const filteredProducts = productsData.filter(product => {
        // 颜色筛选
        const colorMatch = color === 'all' || product.color === color;
        // 尺寸筛选
        const sizeMatch = size === 'all' || product.size === size;
        // 价格筛选
        const priceMatch = priceRange === 'all' || (product.price >= minPrice && product.price <= maxPrice);

        return colorMatch && sizeMatch && priceMatch;
    });

    renderProductList(filteredProducts);
}


/**
 * ============================================
 * 产品详情页渲染函数
 * ============================================
 */
function renderProductDetail(id) {
    const product = productsData.find(p => p.id === id);
    const container = document.getElementById('productDetailInfo');
    const imageContainer = document.getElementById('productDetailImage');

    if (!product || !container || !imageContainer) {
        // 在这里可以添加 "产品未找到" 的提示
        container.innerHTML = `<h1 data-zh="产品未找到" data-lo="ບໍ່ພົບຜະລິດຕະພັນ">产品未找到</h1>`;
        updateContentLanguage();
        return;
    }

    const priceDisplay = formatLAK(product.price);

    imageContainer.innerHTML = `<img src="${product.image.replace('400x300', '600x450')}" alt="${product.name_zh}" class="product-detail-image">`;

    // 假设产品特点
    const features_zh = [
        `材质：${product.material}`,
        `颜色：${product.color}`,
        `尺寸：${product.size} (可定制)`,
        '可拆洗设计，方便清洁',
        '高密度海绵，提供完美支撑'
    ];
    const features_lo = [
        `ວັດສະດຸ: ${product.material === '真皮' ? 'ໜັງແທ້' : 'ຜ້າ'}`, // 简单翻译
        `ສີ: ${product.color}`,
        `ຂະໜາດ: ${product.size === '大' ? 'ໃຫຍ່' : product.size === '中' ? 'ກາງ' : 'ນ້ອຍ'} (ສັ່ງໄດ້)`,
        'ການອອກແບບທີ່ສາມາດຖອດອອກໄດ້ເພື່ອຄວາມສະອາດ',
        'ຟອງນ້ໍາຄວາມຫນາແຫນ້ນສູງ, ສະຫນອງການສະຫນັບສະຫນູນທີ່ສົມບູນແບບ'
    ];
    
    const featuresList_zh = features_zh.map(f => `<li>${f}</li>`).join('');
    const featuresList_lo = features_lo.map(f => `<li>${f}</li>`).join('');


    container.innerHTML = `
        <h1 data-zh="${product.name_zh}" data-lo="${product.name_lo}">${currentLang === 'zh' ? product.name_zh : product.name_lo}</h1>
        <p class="product-detail-price">${priceDisplay}</p>
        <p data-zh="${product.description_zh}" data-lo="${product.description_lo}" class="mb-2">${currentLang === 'zh' ? product.description_zh : product.name_lo}</p>

        <h3 class="mt-2 mb-1" data-zh="产品特点" data-lo="ຄຸນນະສົມບັດຜະລິດຕະພັນ">产品特点</h3>
        <ul class="product-features" data-zh-content="${featuresList_zh}" data-lo-content="${featuresList_lo}">
            ${currentLang === 'zh' ? featuresList_zh : featuresList_lo}
        </ul>

        <h3 class="mt-3 mb-1" data-zh="引导到店" data-lo="ການນໍາທາງໄປຮ້ານ">引导到店</h3>
        <p data-zh="喜欢这款沙发？欢迎前往我们的万象实体店亲身试坐体验！" data-lo="ມັກໂຊຟານີ້ບໍ? ຍິນດີຕ້ອນຮັບມາຮ້ານຂອງພວກເຮົາໃນວຽງຈັນເພື່ອທົດລອງນັ່ງດ້ວຍຕົວເອງ!"></p>
        <a href="contact.html" class="btn btn-primary mt-1" data-zh="预约到店体验" data-lo="ນັດໝາຍມາຮ້ານ">预约到店体验</a>
    `;

    // 更新详情页所有元素
    updateContentLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    let currentSlide = 0; // 当前显示的 slide 索引
    let slideInterval; // 用于存储自动轮播的 interval ID

    if (slides.length === 0) return; // 如果没有 slide，则停止执行

    // 1. 显示指定索引的 slide
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // 移除所有 slide 的 active 类
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 给当前 slide 添加 active 类使其显示
        slides[currentSlide].classList.add('active');
    }

    // 2. 自动切换到下一张图片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 3. 启动自动轮播
    function startSlider() {
        // 每 5000 毫秒（5秒）切换一次
        slideInterval = setInterval(nextSlide, 5000); 
    }

    // 4. 停止自动轮播 (用于鼠标悬停等情况，此处暂不实现，仅提供功能)
    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // 5. 监听手动控制按钮
    prevButton.addEventListener('click', () => {
        pauseSlider(); // 手动切换时先暂停自动播放
        showSlide(currentSlide - 1);
        startSlider(); // 切换后重新启动自动播放
    });

    nextButton.addEventListener('click', () => {
        pauseSlider();
        showSlide(currentSlide + 1);
        startSlider();
    });

    // 初始化：显示第一张图片并启动自动轮播
    showSlide(currentSlide);
    startSlider();


    // --- 保留多语言切换逻辑 (如果您的 script.js 中有的话) ---

    const langSwitcher = document.getElementById('langSwitcher');
    const allTranslatableElements = document.querySelectorAll('[data-zh]');
    let currentLang = 'zh'; // 默认语言

    function updateLanguage() {
        const targetLang = currentLang === 'zh' ? 'lo' : 'zh';
        
        allTranslatableElements.forEach(el => {
            const translation = el.getAttribute(`data-${targetLang}`);
            if (translation) {
                el.textContent = translation;
            }
        });
        
        // 更新页面标题和描述
        const titleElement = document.querySelector('title');
        titleElement.textContent = titleElement.getAttribute(`data-${targetLang}`);
        
        // 更新切换按钮的显示文本
        langSwitcher.textContent = targetLang === 'zh' ? 'ລາວ' : '中文';
        
        currentLang = targetLang;
    }

    window.toggleLanguage = function() {
        updateLanguage();
    }
    
    // 首次加载时，确保切换按钮显示正确的初始语言
    // (例如，如果当前页面是中文，按钮应该显示'ລາວ')
    if (currentLang === 'zh') {
        langSwitcher.textContent = 'ລາວ';
    }
});
