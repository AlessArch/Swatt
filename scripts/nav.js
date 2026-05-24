const hamburger = document.querySelector('.nav__hamburger');
const liste = document.querySelector('.nav__liste');

hamburger.addEventListener('click', () => {
    const ouvert = liste.classList.toggle('nav__liste--ouverte');
    hamburger.setAttribute('aria-expanded', ouvert);
});