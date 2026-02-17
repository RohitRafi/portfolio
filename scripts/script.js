// Word flip animation
const words = document.querySelectorAll('.word');
let currentIndex = 0;

function cycleWords() {
    words[currentIndex].classList.remove('active');
    words[currentIndex].classList.add('exit');
    currentIndex = (currentIndex + 1) % words.length;
    setTimeout(() => {
        words.forEach(word => word.classList.remove('exit'));
        words[currentIndex].classList.add('active');
    }, 100);
}

// Navigation scroll arrows
let scrollInterval;

function updateNavArrows() {
    const nav = document.querySelector('nav');
    if (!nav || window.innerWidth > 768) {
        const arrows = document.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => arrow.remove());
        return;
    }

    const maxScroll = nav.scrollWidth - nav.clientWidth;
    
    if (maxScroll <= 0) {
        const arrows = document.querySelectorAll('.nav-arrow');
        arrows.forEach(arrow => arrow.remove());
        return;
    }

    let leftArrow = document.querySelector('.nav-arrow.left');
    let rightArrow = document.querySelector('.nav-arrow.right');

    if (!leftArrow) {
        leftArrow = document.createElement('div');
        leftArrow.className = 'nav-arrow left';
        leftArrow.innerHTML = '←';
        nav.parentElement.appendChild(leftArrow);
        
        leftArrow.addEventListener('click', () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                nav.scrollLeft -= 7;
                if (nav.scrollLeft <= 0) clearInterval(scrollInterval);
            }, 10);
        });
    }

    if (!rightArrow) {
        rightArrow = document.createElement('div');
        rightArrow.className = 'nav-arrow right';
        rightArrow.innerHTML = '→';
        nav.parentElement.appendChild(rightArrow);
        
        rightArrow.addEventListener('click', () => {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                nav.scrollLeft += 7;
                const maxScroll = nav.scrollWidth - nav.clientWidth;
                if (nav.scrollLeft >= maxScroll) clearInterval(scrollInterval);
            }, 10);
        });
    }
    
    if (nav.scrollLeft > 5) {
        leftArrow.classList.add('show');
    } else {
        leftArrow.classList.remove('show');
    }

    if (nav.scrollLeft < maxScroll - 5) {
        rightArrow.classList.add('show');
    } else {
        rightArrow.classList.remove('show');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setInterval(cycleWords, 1000);
    
    const nav = document.querySelector('nav');
    if (nav && window.innerWidth <= 768) {
        updateNavArrows();
        nav.addEventListener('scroll', updateNavArrows);
    }
});

window.addEventListener('resize', () => {
    updateNavArrows();
});
