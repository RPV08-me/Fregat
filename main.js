document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    const sections = document.querySelectorAll('.hello, .about, .privilege, .catalog, .feedback');
    sections.forEach(section => {
        observer.observe(section);
    });

    const aboutContainer = document.querySelector('.aboutimg');
    const aboutDots = document.querySelectorAll('#aboutIndicators .dot');
    if (aboutContainer && aboutDots.length) {
        aboutContainer.addEventListener('scroll', function() {
            const scrollLeft = this.scrollLeft;
            const firstImg = this.querySelector('img');
            if (!firstImg) return;
            const itemWidth = firstImg.offsetWidth + 30;
            const index = Math.round(scrollLeft / itemWidth);
            
            aboutDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
        aboutDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const firstImg = aboutContainer.querySelector('img');
                if (!firstImg) return;
                const itemWidth = firstImg.offsetWidth + 30;
                aboutContainer.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });
            });
        });
    }

    const catalogContainer = document.querySelector('.cataloglinks');
    const catalogDots = document.querySelectorAll('#catalogIndicators .dot');
    if (catalogContainer && catalogDots.length) {
        catalogContainer.addEventListener('scroll', function() {
            const scrollLeft = this.scrollLeft;
            const itemWidth = 280 + 50;
            const index = Math.round(scrollLeft / itemWidth);
            
            catalogDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
        catalogDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const itemWidth = 280 + 50;
                catalogContainer.scrollTo({
                    left: index * itemWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
        }, 200);
    });

    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('feedbackName');
            const textInput = document.getElementById('feedbackText');
            const name = nameInput ? nameInput.value.trim() : '';
            const text = textInput ? textInput.value.trim() : '';
            
            if (!name || !text) {
                showNotification('Пожалуйста, заполните все поля!');
                return;
            }
            
            if (nameInput) nameInput.value = '';
            if (textInput) textInput.value = '';
            closeFeedbackModal();
            showNotification('Спасибо за ваш отзыв! Он отправлен менеджеру на обработку.', 'success');
        });
    }

    const searchInput = document.querySelector('.searchinp');
    const searchBtn = document.querySelector('.searchbtn');
    
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    resultsDiv.id = 'searchResults';
    const searchContainer = document.querySelector('.search');
    if (searchContainer) {
        searchContainer.appendChild(resultsDiv);
    }

    const data = [
        { title: 'О нас', url: '#about', desc: 'Информация о компании' },
        { title: 'Каталог', url: '#catalog', desc: 'Сувениры, стенды, полиграфия' },
        { title: 'Отзывы', url: '#feedback', desc: 'Отзывы клиентов' },
        { title: 'Контакты', url: '#contact', desc: 'Наши контакты' },
        { title: 'Сувенирная продукция', url: 'suv.html', desc: 'Вымпелы, кепки, кубки' },
        { title: 'Стенды и вывески', url: 'rec.html', desc: 'Стенды, вывески, банеры' },
        { title: 'Полиграфия', url: 'pol.html', desc: 'Журналы, визитки' }
    ];

    function search(query) {
        const container = document.getElementById('searchResults');
        if (!container) return;
        const q = query.trim().toLowerCase();
        if (!q) { container.classList.remove('active'); return; }
        
        const results = data.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.desc.toLowerCase().includes(q)
        );
        
        container.innerHTML = results.length ? 
            results.map(item => {
                const idx = item.title.toLowerCase().indexOf(q);
                const titleHTML = idx > -1 ? 
                    item.title.slice(0, idx) + `<span class="highlight">${item.title.slice(idx, idx + q.length)}</span>` + item.title.slice(idx + q.length) :
                    item.title;
                return `<div class="result-item"><a href="${item.url}"><div>${titleHTML}</div><div class="desc">${item.desc}</div></a></div>`;
            }).join('') :
            '<div class="no-results">Ничего не найдено</div>';
        
        container.classList.add('active');
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => search(searchInput.value));
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                const container = document.getElementById('searchResults');
                if (container) container.classList.remove('active');
            }, 200);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const first = document.querySelector('.search-results .result-item a');
                if (first) window.location.href = first.getAttribute('href');
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchInput && searchInput.value.trim()) {
                const first = document.querySelector('.search-results .result-item a');
                if (first) window.location.href = first.getAttribute('href');
            }
        });
    }

    document.addEventListener('click', (e) => {
        const container = document.getElementById('searchResults');
        if (container && !e.target.closest('.search')) {
            container.classList.remove('active');
        }
    });
});

function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target === modal) {
        closeFeedbackModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFeedbackModal();
    }
});

function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    if (!notification || !text) return;
    
    text.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    clearTimeout(window.notificationTimeout);
    window.notificationTimeout = setTimeout(() => {
        closeNotification();
    }, 4000);
}

function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}