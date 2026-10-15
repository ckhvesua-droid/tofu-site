// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
    });
}

// Подсветка активной ссылки в меню
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('nav__link--active');
    }

// Подсветка активной категории в меню при прокрутке
const menuNavLinks = document.querySelectorAll('.menu-nav__link');
const menuCategories = document.querySelectorAll('.menu-category');

if (menuNavLinks.length && menuCategories.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                menuNavLinks.forEach(link => {
                    link.classList.toggle(
                        'menu-nav__link--active',
                        link.getAttribute('href') === '#' + id
                    );
                });
            }
        });
    }, { rootMargin: '-140px 0px -70% 0px' });

    menuCategories.forEach(cat => observer.observe(cat));
}

// ===== Валидация формы бронирования =====
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
    const showError = (field, message) => {
        field.classList.add('form__input--error');
        const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
        if (errorEl) errorEl.textContent = message;
    };

    const clearError = (field) => {
        field.classList.remove('form__input--error');
        const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
        if (errorEl) errorEl.textContent = '';
    };

    // Очистка ошибки при вводе
    bookingForm.querySelectorAll('.form__input').forEach(field => {
        field.addEventListener('input', () => clearError(field));
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const date = document.getElementById('date');
        const time = document.getElementById('time');
        const guests = document.getElementById('guests');

        // Имя
        if (!name.value.trim() || name.value.trim().length < 2) {
            showError(name, 'Введите имя (минимум 2 символа)');
            valid = false;
        }

        // Телефон
        const phoneClean = phone.value.replace(/\D/g, '');
        if (phoneClean.length < 10) {
            showError(phone, 'Введите корректный номер телефона');
            valid = false;
        }

        // Дата
        if (!date.value) {
            showError(date, 'Выберите дату');
            valid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const chosen = new Date(date.value);
            if (chosen < today) {
                showError(date, 'Дата не может быть в прошлом');
                valid = false;
            }
        }

        // Время
        if (!time.value) {
            showError(time, 'Выберите время');
            valid = false;
        }

        // Гости
        if (!guests.value) {
            showError(guests, 'Укажите количество гостей');
            valid = false;
        }

        if (valid) {
            bookingForm.hidden = true;
            formSuccess.hidden = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ===== Валидация формы обратной связи =====
const feedbackForm = document.getElementById('feedbackForm');
const fbSuccess = document.getElementById('fbSuccess');

if (feedbackForm) {
    const showError = (field, message) => {
        field.classList.add('form__input--error');
        const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
        if (errorEl) errorEl.textContent = message;
    };

    const clearError = (field) => {
        field.classList.remove('form__input--error');
        const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
        if (errorEl) errorEl.textContent = '';
    };

    feedbackForm.querySelectorAll('.form__input').forEach(field => {
        field.addEventListener('input', () => clearError(field));
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('fb-name');
        const contact = document.getElementById('fb-email');
        const message = document.getElementById('fb-message');

        if (!name.value.trim() || name.value.trim().length < 2) {
            showError(name, 'Введите имя');
            valid = false;
        }

        // Проверка: либо email, либо телефон
        const value = contact.value.trim();
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = value.replace(/\D/g, '').length >= 10;
        if (!isEmail && !isPhone) {
            showError(contact, 'Введите корректный email или телефон');
            valid = false;
        }

        if (!message.value.trim() || message.value.trim().length < 5) {
            showError(message, 'Сообщение слишком короткое');
            valid = false;
        }

        if (valid) {
            feedbackForm.hidden = true;
            fbSuccess.hidden = false;
        }
    });
}

});
