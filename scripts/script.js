

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

window.addEventListener('resize', () => {
    updateNavArrows();
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
active_word=document.querySelector(`.word.active`)
all_words=["creativity","usability","logic"]
async function typewrite(texts) {
    while (1){
        for (text of texts){
            for (let i=0;i <=text.length;i++ ){
                await sleep(200);
                active_word.innerText=(text.slice(0,i))
            }
            await sleep(1000);
            for (let i=0;i <=text.length;i++ ){
                await sleep(200)

                active_word.innerText=(text.slice(0, (text.length)-i))
            }
            await sleep(500)
        }
    }
}

typewrite(all_words)
