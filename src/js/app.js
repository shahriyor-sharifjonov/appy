import * as functions from "./modules/functions.js";

functions.isWebp();

// import Swiper, { Navigation, Pagination } from 'swiper';

// const swiper = new Swiper();

if(document.querySelector('.header__lang-btn')){
    const btn = document.querySelector('.header__lang-btn');
    btn.addEventListener('click', () => {
        btn.classList.toggle('active')
    })

    const items = document.querySelectorAll('.header__lang-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            btn.classList.remove('active')
        })
    })
}

const headerButton = document.querySelector(".header__button");
const headerMenu = document.querySelector(".header__menu");
const headerLinks = document.querySelectorAll(".header__link");

let menuOpened = false;
const menuToggle = () => {
  menuOpened = !menuOpened;
  headerButton.classList.toggle("open");
  headerMenu.classList.toggle("open");
};

headerButton.onclick = menuToggle;


window.onclick = (e) => {
  if (
    menuOpened &&
    !e.composedPath().includes(headerButton) &&
    !e.composedPath().includes(headerMenu)
  )
    menuToggle();
};

headerLinks.forEach(el => {
  el.addEventListener('click', () => {
    menuToggle()
  })
})