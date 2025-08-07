document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-participants');
    const cards = document.querySelectorAll('.chess-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const counter = document.querySelector('.carousel-counter');
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    const totalCards = cards.length;

    function getCardsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function getViewedCount() {
        // Показываем либо текущую позицию + cardsPerView, либо общее количество
        return Math.min(currentIndex + cardsPerView, totalCards);
    }

    function updateCounter() {
        const viewed = getViewedCount();
        counter.textContent = `${viewed}/${totalCards}`;
    }

    function scrollToCard(index) {
        currentIndex = Math.max(0, Math.min(index, totalCards - cardsPerView));
        const scrollPosition = currentIndex * (cards[0].offsetWidth + 20);
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Обновляем после скролла
        setTimeout(updateCounter, 300);
    }

    function handleResize() {
        const oldCardsPerView = cardsPerView;
        cardsPerView = getCardsPerView();
        
        // Корректируем позицию при изменении размера
        if (oldCardsPerView !== cardsPerView) {
            currentIndex = Math.floor(currentIndex * oldCardsPerView / cardsPerView);
            scrollToCard(currentIndex);
        }
    }

    prevBtn.addEventListener('click', () => {
        scrollToCard(currentIndex - cardsPerView);
    });

    nextBtn.addEventListener('click', () => {
        scrollToCard(currentIndex + cardsPerView);
    });

    carousel.addEventListener('scroll', () => {
        // Для ручного скролла определяем текущий индекс
        currentIndex = Math.round(carousel.scrollLeft / (cards[0].offsetWidth + 20));
        updateCounter();
    });

    window.addEventListener('resize', handleResize);

    // Инициализация
    updateCounter();
});