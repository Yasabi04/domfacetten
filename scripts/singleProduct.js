document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.smallProduct');
    const carousel = document.querySelector('.productCaroussel'); // Fixed selector
    
    if (!carousel) {
        console.error('Carousel element not found');
        return;
    }
    
    if (productCards.length === 0) {
        console.error('No product cards found');
        return;
    }

    let currentIndex = 0;
    console.log('Found products:', productCards.length);

    function updateCarousel() {
        if (!productCards[0]) return;
        const cardWidth = productCards[0].offsetWidth;
        const offset = -currentIndex * (cardWidth + 16); // Add margin
        carousel.style.transform = `translateX(${offset}px)`;
        console.log('Moving to index:', currentIndex, 'offset:', offset);
    }

    const leftArrow = document.querySelector('.leftArrow');
    const rightArrow = document.querySelector('.rightArrow');

    leftArrow?.addEventListener('click', () => {
        console.log('Left click');
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow?.addEventListener('click', () => {
        console.log('Right click');
        if (currentIndex < productCards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();
});


// Remove the arrows when the screen width is below 768px
document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.leftArrow');
    const rightArrow = document.querySelector('.rightArrow');

    if (!leftArrow || !rightArrow) {
        console.error('Arrows not found');
        return;
    }

    function updateArrows() {
        if (window.innerWidth < 768) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'flex';
            rightArrow.style.display = 'flex';
        }
    }

    updateArrows();
    window.addEventListener('resize', updateArrows);
});

