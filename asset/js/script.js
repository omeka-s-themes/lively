const livelyScripts = () => {

    const body = document.body;
    const mainHeader = document.querySelector('.main-header');
    const mainHeaderTopBar = document.querySelector('.main-header__top-bar');
    const mainHeaderMainBar = document.querySelector('.main-header__main-bar');
    const mainSearchButton = document.querySelector('.main-search-button');
    const mainHeaderSearch = document.querySelector('.main-header-search');
    const menuDrawer = document.getElementById('menu-drawer');
    const userBar = document.getElementById('user-bar');

    // Resize Events

    let userBarHeight = 0;
    let timeout = false;
    const delay = 250;

    onResize();

    function onResize() {
        getUserBarHeight();
        refreshBodyPaddingTop();
    }

    window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = setTimeout(onResize, delay);
    });

    function refreshBodyPaddingTop() {
        body.style.paddingTop = mainHeader.offsetHeight + 'px';
    }

    function getUserBarHeight() {
        if (userBar) {
            userBarHeight = userBar.offsetHeight;
        }
    }

    // Scrolling Events

    let lastKnownScrollPosition = 0;
    let ticking = false;
    let scrollDirection = 'up';

    onScroll();

    function onScroll(scrollPos) {
        if(scrollPos > 60 && scrollDirection == 'down') {
            mainHeader.style.top = - (userBarHeight + mainHeaderTopBar.offsetHeight) + 'px';
            menuDrawer.style.top = mainHeaderMainBar.offsetHeight + 'px';
        } else {
            mainHeader.style.top = 0;
            menuDrawer.style.top = mainHeader.offsetHeight + 'px';
        }
    }

    document.addEventListener('scroll', (event) => {
        scrollDirection = Math.max(lastKnownScrollPosition, window.scrollY) == lastKnownScrollPosition ? 'up': 'down';
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });

    // Annotations tooltip position

    const annotationBtns = document.querySelectorAll('.annotation-btn');

    annotationBtns.forEach((annotationBtn) => {
        const annotationTooltip = annotationBtn.querySelector('.annotation-tooltip');
        const annotationTooltipWrapper = annotationTooltip.querySelector('.annotation-tooltip__wrapper');

        const eventList = ['click', 'mouseover'];
        eventList.forEach((event) => {
            annotationBtn.addEventListener(event, setAnnotationTooltipPos);
        });

        function setAnnotationTooltipPos() {
            const annotationBtnOffset = annotationBtn.getBoundingClientRect();
            const { top, left } = annotationBtnOffset;
            const distanceToRightEdge = window.innerWidth - (left + annotationBtn.offsetWidth);
            
            if (distanceToRightEdge < (annotationTooltipWrapper.offsetWidth + 15)) {
                annotationTooltip.style.left = (distanceToRightEdge - annotationTooltipWrapper.offsetWidth - 15) + 'px';
            } else {
                annotationTooltip.style.left = '0px';
            }

            if ((top - mainHeader.offsetHeight - mainHeader.offsetTop) < (annotationTooltipWrapper.offsetHeight + 15)) {
                annotationTooltip.style.bottom = (- annotationTooltipWrapper.offsetHeight - 20) + 'px';
                annotationTooltipWrapper.classList.add('below-button');
            } else {
                annotationTooltip.style.bottom = '10px';
                annotationTooltipWrapper.classList.remove('below-button');

                if (annotationTooltip.style.left == '0px') {
                    annotationTooltip.style.bottom = '5px';
                }
            }
        }
    });
    
    // Main Header Search
    mainSearchButton.addEventListener('click', onMainSearchButtonClick);

    function onMainSearchButtonClick() {
        mainHeaderSearch.classList.toggle('visible');
        if (mainHeaderSearch.classList.contains('visible')) {
            document.addEventListener('click', onDocumentClick, true);
        } else {
            document.removeEventListener('click', onDocumentClick, true);
        }
    }

    function onDocumentClick(e) {
        if (!mainHeaderSearch.contains(e.target)){
            mainHeaderSearch.classList.remove('visible');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', livelyScripts);
} else {
    livelyScripts();
}
