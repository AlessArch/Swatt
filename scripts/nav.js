const hamburger = document.querySelector('.nav__hamburger');
const list = document.querySelector('.nav__list');

hamburger.addEventListener('click', () => {
    const open = list.classList.toggle('nav__list--open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});