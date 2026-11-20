let complexityValue = 0;
let isCalculated = false;

function changeComplexity(change) {
    const valueElement = document.getElementById('complexityValue');
    complexityValue = Math.max(0, complexityValue + change);
    valueElement.textContent = complexityValue;
    isCalculated = false;
    const totalElement = document.getElementById('totalPrice');
    totalElement.textContent = '0 руб';
    totalElement.style.color = 'rgba(255, 255, 255, 0.5)';
}

function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
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
    notification.classList.remove('show');
}

function calculateTotal() {
    const typeSelect = document.getElementById('calcType');
    const complexitySelect = document.getElementById('calcComplexity');
    const totalElement = document.getElementById('totalPrice');
    
    if (typeSelect.value === '1000' && typeSelect.options[typeSelect.selectedIndex].text === 'Вид') {
        showNotification('Пожалуйста, выберите вид работы');
        return;
    }
    
    if (complexitySelect.value === '1' && complexitySelect.options[complexitySelect.selectedIndex].text === 'Сложность дизайна') {
        showNotification('Пожалуйста, выберите сложность дизайна');
        return;
    }
    
    if (complexityValue <= 0) {
        showNotification('Пожалуйста, выберите количество (больше 0)');
        return;
    }
    
    const basePrice = parseInt(typeSelect.value) || 0;
    const complexityMultiplier = parseFloat(complexitySelect.value) || 1;
    
    const total = basePrice * complexityMultiplier * complexityValue;
    totalElement.textContent = total + ' руб';
    totalElement.style.color = 'white';
    isCalculated = true;
    
    showNotification('Расчет выполнен успешно!', 'success');
}

function orderSubmit() {
    const totalElement = document.getElementById('totalPrice');
    if (!isCalculated || totalElement.textContent === '0 руб') {
        showNotification('Пожалуйста, сначала рассчитайте стоимость');
        return;
    }
    openOrderModal();
}

document.getElementById('calcType').addEventListener('change', function() {
    if (isCalculated) {
        isCalculated = false;
        const totalElement = document.getElementById('totalPrice');
        totalElement.textContent = '0 руб';
        totalElement.style.color = 'rgba(255, 255, 255, 0.5)';
    }
});

document.getElementById('calcComplexity').addEventListener('change', function() {
    if (isCalculated) {
        isCalculated = false;
        const totalElement = document.getElementById('totalPrice');
        totalElement.textContent = '0 руб';
        totalElement.style.color = 'rgba(255, 255, 255, 0.5)';
    }
});

const modalOverlay = document.getElementById('modalOverlay');
const modalOrder = document.getElementById('modalOrder');
const modalSuccess = document.getElementById('modalSuccess');
const orderForm = document.getElementById('orderForm');

function openOrderModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (orderForm) {
        orderForm.reset();
        document.querySelectorAll('.modalfield').forEach(field => {
            field.classList.remove('error');
        });
    }
}

function openSuccessModal() {
    if (modalSuccess) {
        modalSuccess.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    if (modalSuccess) {
        modalSuccess.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    window.location.href = 'main.html#feedback';
}

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.modalfield').forEach(field => {
            field.classList.remove('error');
        });
        
        const surname = document.getElementById('surname').value.trim();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        let hasError = false;
        
        if (!surname) {
            document.getElementById('surname').closest('.modalfield').classList.add('error');
            hasError = true;
        }
        
        if (!name) {
            document.getElementById('name').closest('.modalfield').classList.add('error');
            hasError = true;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            document.getElementById('email').closest('.modalfield').classList.add('error');
            hasError = true;
        }
        
        const phoneClean = phone.replace(/[^0-9+]/g, '');
        if (!phone || phoneClean.length < 10) {
            document.getElementById('phone').closest('.modalfield').classList.add('error');
            hasError = true;
        }
        
        if (hasError) {
            showNotification('Пожалуйста, заполните все поля корректно');
            return;
        }
        
        closeOrderModal();
        setTimeout(() => {
            openSuccessModal();
        }, 300);
        
        setTimeout(() => {
            closeSuccessModal();
        }, 5000);
    });
}

document.querySelectorAll('.modalfield input').forEach(input => {
    input.addEventListener('input', function() {
        const field = this.closest('.modalfield');
        if (field.classList.contains('error')) {
            field.classList.remove('error');
        }
    });
});

if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeOrderModal();
        }
    });
}

if (modalSuccess) {
    modalSuccess.addEventListener('click', function(e) {
        if (e.target === modalSuccess) {
            closeSuccessModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.searchinp');
    const searchBtn = document.querySelector('.searchbtn');
    
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'search-results';
    resultsDiv.id = 'searchResults';
    document.querySelector('.search').appendChild(resultsDiv);

    const data = [
        { title: 'О нас', url: 'main.html#about', desc: 'Информация о компании' },
        { title: 'Каталог', url: 'main.html#catalog', desc: 'Сувениры, стенды, полиграфия' },
        { title: 'Отзывы', url: '#main.htmlfeedback', desc: 'Отзывы клиентов' },
        { title: 'Контакты', url: 'main.html#contact', desc: 'Наши контакты' },
        { title: 'Сувенирная продукция', url: 'suv.html', desc: 'Вымпелы, кепки, кубки' },
        { title: 'Стенды и вывески', url: 'rec.html', desc: 'Стенды, вывески, банеры' },
        { title: 'Полиграфия', url: 'pol.html', desc: 'Журналы, визитки' }
    ];

    function search(query) {
        const container = document.getElementById('searchResults');
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
        searchInput.addEventListener('blur', () => setTimeout(() => document.getElementById('searchResults').classList.remove('active'), 200));
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
        if (container && !e.target.closest('.search')) container.classList.remove('active');
    });
});