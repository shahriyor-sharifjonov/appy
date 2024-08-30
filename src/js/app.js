import * as functions from "./modules/functions.js";

functions.isWebp();

// import Swiper, { Navigation, Pagination } from 'swiper';

// const swiper = new Swiper();


import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

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
const headerLinks = document.querySelectorAll(".close");

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


function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';

let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.querySelector('.fixed').appendChild(cursor);
document.querySelector('.fixed').appendChild(cursorF);

// Set initial opacity to 0
cursor.style.opacity = 0;
cursorF.style.opacity = 0;

if ('ontouchstart' in window) {
  cursor.style.opacity = 0;
  cursorF.style.opacity = 0;
} else {
  cursor.style.setProperty('--size', size + 'px');
  cursorF.style.setProperty('--size', sizeF + 'px');
}

window.addEventListener('mousemove', function (e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - size / 2 + 'px';
  cursor.style.top = e.clientY - size / 2 + 'px';
  
  // Show cursor on mouse move
  cursor.style.opacity = 1;
  cursorF.style.opacity = 1;
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF / 2 + 'px';
  cursorF.style.left = cursorX - sizeF / 2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, { scale: 4.5 });
  gsap.to(cursorF, { scale: .4 });
  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
  cursor.style.opacity = 1;  // Ensure cursor is visible on interaction
  cursorF.style.opacity = 1;
}

function mousehover(e) {
  gsap.to(cursor, { scale: 3 });
  gsap.to(cursorF, { scale: .3 });
  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
  cursor.style.opacity = 1;  // Ensure cursor is visible on hover
  cursorF.style.opacity = 1;
}

function mouseup(e) {
  gsap.to(cursor, { scale: 1 });
  gsap.to(cursorF, { scale: 1 });
  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
      clicked = false;
      startY = null;
      endY = null;
  }
  // Hide cursor after a delay
  setTimeout(() => {
      if (!clicked) {
          cursor.style.opacity = 0;
          cursorF.style.opacity = 0;
      }
  }, 500); // Adjust delay as needed
}

document.querySelectorAll('.btn:not(disabled)').forEach(el => {
  el.addEventListener('mouseover', mousehover);
  el.addEventListener('mouseleave', mouseup);
});
document.querySelectorAll('.hover').forEach(el => {
  el.addEventListener('mouseover', mousehover);
  el.addEventListener('mouseleave', mouseup);
});
window.onload = function () {
  document.querySelectorAll('.swiper-pagination-bullet').forEach(el => {
      el.addEventListener('mouseover', mousehover);
      el.addEventListener('mouseleave', mouseup);
  });
}
document.querySelectorAll('.floor__tab-item').forEach(el => {
  el.addEventListener('mouseover', mousehover);
  el.addEventListener('mouseleave', mouseup);
});
document.querySelectorAll('.gotoblock').forEach(el => {
  el.addEventListener('mouseover', mousehover);
  el.addEventListener('mouseleave', mouseup);
});
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function (e) {
  if (clicked) {
      endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);




import barba from '@barba/core';

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('ul.transition li', {duration: .5, scaleY: 1, transformOrigin: "bottom left", stagger: .2})
  tl.to('ul.transition li', {duration: .5, scaleY: 0, transformOrigin: "bottom left", stagger: .1, delay: .3})
}

function contentAnimation(){
  var tl = gsap.timeline();
  tl.from(".intro__title .line span", .6, {y: 120, ease: "power1.out", delay: 1, skewY: 17, stagger: {amount: 0}}, "-=1.1")
  tl.from('.intro__desc', {duration: .3, translateY: 10, opacity: 0})
  tl.from('.intro__btn', {duration: .3, translateY: 10, opacity: 0})
  tl.to('.intro__img', {opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}, "-=.5") 
}

function setMenuLinks() {
  const links = document.querySelectorAll('.link');
  const location = window.location.pathname;
  links.forEach(link => {
    const linkHref = '/' + link.getAttribute('href');
    if(linkHref == location){
      link.classList.add('active');
      link.setAttribute('href', '#!');
    }else{
      link.classList.remove('active');
      const dataHref = link.getAttribute('data-href');
      link.setAttribute('href', dataHref);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
      setMenuLinks();
  }, 200);
})



function delay(n) {
  n = n || 2000;
  return new Promise(done => {
      setTimeout(() => {
          done();
      }, n);
  });
}


barba.init({
  sync: true,
  transitions: [{
    async leave(data) {
      const done = this.async();
      pageTransition();
      setMenuLinks();
      await delay(1500);
      done();
    },
    async enter(data) {
      contentAnimation();
    },
    async once(data) {
      contentAnimation();
    },
  }]
});


(function gsapMatchMedia() {
  ScrollTrigger.matchMedia({
    all: function () {
      const stats = gsap.timeline({
        scrollTrigger: {
          trigger: ".stat__item-content",
          start: "top 90%",
          markers: false,
          scrub: false,
        },
      });
      stats.from(".stat__item-content svg rect", {duration: .3, scaleY: 0, transformOrigin: "bottom", stagger: .1})
      
      const people = gsap.timeline({
        scrollTrigger: {
          trigger: ".stat__item-title.people",
          start: "top 90%",
          markers: false,
          scrub: false,
        },
      });
      people.from(".stat__item-title.people .item", {delay: .5, duration: .3, opacity: 0, stagger: .1})
    },
    "(min-width: 576px)": function () {
      const item = gsap.timeline({
        scrollTrigger: {
          trigger: ".stat__item",
          start: "top 90%",
          markers: false,
          scrub: false,
        },
      });
      item.from(".stat__item", {duration: .3, opacity: 0, y: 20, stagger: .1})
    },
    "(max-width: 576px)": function () {
      gsap.utils.toArray(".stat__item").forEach(el => {
        const item = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            markers: false,
            scrub: false,
          },
        });
        item.to(el, {duration: .3, opacity: 1, y: 0, stagger: .1})
      })
    },
  });
})();