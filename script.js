/****************************************************
 * INITIALIZATION
 ****************************************************/
document.addEventListener('DOMContentLoaded', () => {

    /* -------------------- 0. LANGUAGE TOGGLE -------------------- */
    const languageToggle = document.querySelector('.language-toggle');

    // Load saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Initialize toggle button label
    if (languageToggle) {
        languageToggle.textContent = translations[currentLanguage].lang_toggle;

        languageToggle.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'ja' : 'en';
            setLanguage(newLang);
        });
    }

    /* -------------------- 1. MOBILE NAVIGATION -------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('header ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Close menu when selecting a link
    document.querySelectorAll('header ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    /* -------------------- 2. CONTACT FORM -------------------- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.style.color = 'var(--secondary-color)';
            formStatus.textContent = 'Sending...';

            setTimeout(() => {
                console.log('Form Submitted!', {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                });

                formStatus.style.color = '#28a745';
                formStatus.textContent =
                    '✅ Thank you! Your inquiry has been sent. We will be in touch shortly.';
                contactForm.reset();
            }, 1500);
        });
    }

    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const items = document.querySelectorAll('.publication-item');
        const totalItems = items.length;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
    }

}); // END DOMContentLoaded



/****************************************************
 * LANGUAGE SYSTEM
 ****************************************************/
let currentLanguage = 'en';

// Main function to change language
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    updatePageLanguage();
    updateToggleButton();

    // Also update <html lang="">
    document.documentElement.lang = lang;
}

/* Replaces text in ALL elements with data-key attributes */
function updatePageLanguage() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = translations[currentLanguage]?.[key];
        if (translation) {
            el.innerHTML = translation;
        }
    });
}

/* Updates the language toggle button label */
function updateToggleButton() {
    const btn = document.querySelector('.language-toggle');
    if (btn) {
        btn.textContent = translations[currentLanguage].lang_toggle;
    }
}

/* Legacy support: handles elements using data-en/data-ja HTML swapping */
function switchLanguage(lang) {
    document.documentElement.lang = lang;

    // For simple text elements
    document.querySelectorAll('[data-en][data-ja]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // For elements requiring innerHTML handling
    document.querySelectorAll('[data-en-html][data-ja-html]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}
