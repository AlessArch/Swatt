// --- Menu hamburger ---
const hamburger = document.querySelector('.nav__hamburger');
const list = document.querySelector('.nav__list');

hamburger.addEventListener('click', () => {
    const open = list.classList.toggle('nav__list--open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

// --- Dropdown mobile ---
const dropdownItem = document.querySelector('.nav__item--dropdown');
const dropdownLink = dropdownItem.querySelector('.nav__link--dropdown');

dropdownLink.addEventListener('click', (e) => {
    if (window.getComputedStyle(hamburger).display !== 'none') {
        e.preventDefault();
        e.stopPropagation();
        dropdownItem.classList.toggle('nav__item--dropdown--open');
    }
});

// --- Année dynamique dans le footer ---
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
// --- Carousel avis ---
const track = document.querySelector('.avis__track');
const points = document.querySelectorAll('.avis__point');
let courant = 0;
let timer;

function allerA(index) {
    courant = index;
    track.style.transform = `translateX(-${courant * 100}%)`;
    points.forEach((p, i) => {
        p.classList.toggle('avis__point--actif', i === courant);
    });
}

function suivant() {
    allerA((courant + 1) % points.length);
}

// Défilement automatique toutes les 5 secondes
function demarrerTimer() {
    timer = setInterval(suivant, 5000);
}

function arreterTimer() {
    clearInterval(timer);
}

// Clic sur les points
points.forEach((point, i) => {
    point.addEventListener('click', () => {
        arreterTimer();
        allerA(i);
        demarrerTimer();
    });
});

// Pause au survol
track.addEventListener('mouseenter', arreterTimer);
track.addEventListener('mouseleave', demarrerTimer);

demarrerTimer();
// Flèches
const flecheGauche = document.querySelector('.avis__fleche--gauche');
const flecheDroite = document.querySelector('.avis__fleche--droite');

flecheGauche.addEventListener('click', () => {
    arreterTimer();
    allerA((courant - 1 + points.length) % points.length);
    demarrerTimer();
});

flecheDroite.addEventListener('click', () => {
    arreterTimer();
    suivant();
    demarrerTimer();
});
// --- Swipe mobile ---
let touchDepart = null;

track.addEventListener('touchstart', (e) => {
    touchDepart = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
    if (touchDepart === null) return;
    const touchFin = e.changedTouches[0].clientX;
    const diff = touchDepart - touchFin;

    if (Math.abs(diff) > 50) {
        arreterTimer();
        if (diff > 0) {
            suivant();
        } else {
            allerA((courant - 1 + points.length) % points.length);
        }
        demarrerTimer();
    }
    touchDepart = null;
}, { passive: true });