import { computed, ref } from "vue";
import router, {getSections} from "@/router";
import animateScrollTo from "animated-scroll-to";

export const scrollTarget = ref(0);
export const nextScrollTarget = ref(0);
export const preventScroll = ref(false);

const scrollableSections = ref<Element[]>([]);
export const initScroll = (parent: Element) => {
	scrollableSections.value = Array.from(parent.children);
}

export const wheelScroll = (event: WheelEvent) => {
	const isOverScrollableElement = isScrollableElement(event);
	console.log("Is element scrollable: ", isOverScrollableElement);

	if (isOverScrollableElement) {
		return;
	}

	// Something prevents scroll or we're in the middle of sections scroll
	if(preventScroll.value || scrollTarget.value != nextScrollTarget.value) {
		return;
	}

	// Check if we're over a section for section navigation
	if (!isDirectlyOverSection(event)) {
		return;
	}

	// Prevent default behavior for section scrolling
	event.preventDefault();

	scrollSections(event.deltaY > 0 ? 'down' : 'up');

}

const mobileTouch = () => {
    var touchStartY = 0;
    var touchEndY = 0;
    var touchStartX = 0;
    var touchEndX = 0;
    var isHandlingSwipe = false;

    const handleTouchStart = (event: TouchEvent) => {
        touchStartY = event.touches[0].clientY;
        touchStartX = event.touches[0].clientX;
        isHandlingSwipe = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
        // Don't prevent if user is over a scrollable element
        if (isScrollableElementTouch(event)) {
            return;
        }

        // Don't prevent if we're in the middle of sections scroll
        if (preventScroll.value || scrollTarget.value != nextScrollTarget.value) {
            event.preventDefault();
            return;
        }

        // Only prevent if we're over a section AND it's primarily vertical movement
        if (isDirectlyOverSection(event)) {
            const currentY = event.touches[0].clientY;
            const currentX = event.touches[0].clientX;
            const deltaY = Math.abs(currentY - touchStartY);
            const deltaX = Math.abs(currentX - touchStartX);
            
            // Only prevent if vertical movement is greater than horizontal
            if (deltaY > deltaX && deltaY > 10) {
                event.preventDefault();
            }
        }
    };

    const handleTouchEnd = (event: TouchEvent) => {
        touchEndY = event.changedTouches[0].clientY;
        touchEndX = event.changedTouches[0].clientX;
        
        // Only handle swipe if we haven't already and conditions are met
        if (!isHandlingSwipe && shouldHandleSwipe(event)) {
            isHandlingSwipe = true;
            handleSwipe();
        }
    };

    const shouldHandleSwipe = (event: TouchEvent) => {
        // Don't handle if we're in the middle of sections scroll
        if (preventScroll.value || scrollTarget.value != nextScrollTarget.value) {
            return false;
        }

        // Don't handle if over scrollable element
        if (isScrollableElementTouch(event)) {
            return false;
        }

        // Don't handle if not over section
        if (!isDirectlyOverSection(event)) {
            return false;
        }

        const verticalDistance = Math.abs(touchStartY - touchEndY);
        const horizontalDistance = Math.abs(touchStartX - touchEndX);
        
        // Only handle if it's primarily a vertical swipe
        return verticalDistance > horizontalDistance && verticalDistance > 50;
    };

    const handleSwipe = () => {
        const swipeDistance = Math.abs(touchStartY - touchEndY);
        
        if (swipeDistance > 50) {
            // Set prevent scroll to block any momentum
            preventScroll.value = true;
            
            if (touchStartY - touchEndY > 50) {
                scrollSections('down');
            } else if (touchEndY - touchStartY > 50) {
                scrollSections('up');
            }
            
            // Reset prevent scroll after animation completes + buffer
            setTimeout(() => {
                preventScroll.value = false;
            }, 500);
        }
    };

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
}

export const mobile = mobileTouch();

export const scrollSections = (direction: 'up' | 'down') => {
	let newScrollTarget = scrollTarget.value;
	if (direction === 'down') {
		newScrollTarget++;
	} else {
		newScrollTarget--;
	}

	scrollToSection(newScrollTarget);
}

export const scrollToSection = (index: number) => {

	if( index < 0 || index >= scrollableSections.value.length) {
		return;
	}

	nextScrollTarget.value = index;
	animateScrollTo(scrollableSections.value[index], {
		speed: 400,
		easing: (t: number) => t * (2 - t),
		cancelOnUserAction: false
	}).then(() => {
		scrollTarget.value = index;

		const newRouteName = getSections()[scrollTarget.value].name;
		if (router.currentRoute.value.name !== newRouteName) {
			router.push({ name: newRouteName });
		}
	})
}

export const displayRegularNavbar = computed(() => {
	if(nextScrollTarget.value >= 1 && scrollTarget.value != 0)
		return false;
	if(nextScrollTarget.value === 0)
		return true;
})

const isScrollableElement = (event: WheelEvent) => {
	const threshold = 1;
	let el = event.target as HTMLElement;

	while (el && el !== document.body) {
		const style = window.getComputedStyle(el);
		const overflowY = style.overflowY;
		const isScroll = overflowY === 'auto' || overflowY === 'scroll';
		const canScroll = el.scrollHeight > el.clientHeight;
		if (isScroll && canScroll) { 
			const scrollTop = el.scrollTop;
			const deltaY = event.deltaY;

			// If scrolling down and already at bottom, not scrollable
			if (deltaY > 0 && scrollTop + el.clientHeight + threshold >= el.scrollHeight) {
				event.preventDefault();
			}
			// If scrolling up and already at top, not scrollable
			if (deltaY < 0 && scrollTop <= threshold) {
				event.preventDefault();
			}
			return true;
		}
		el = el.parentElement as HTMLElement;
	}
	return false;
};

const isDirectlyOverSection = (event: Event) => {
	var el = event.target as HTMLElement;
	while (el && el !== document.body) {
		if (el.classList.contains('section-page') || el.classList.contains('navbar')) return true;
		el = el.parentElement as HTMLElement;
	}
	return false;
};

// Add this new function for touch events
const isScrollableElementTouch = (event: TouchEvent) => {
    const threshold = 1;
    let el = event.target as HTMLElement;

    while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const overflowX = style.overflowX;
        
        // Check for vertical scrollability
        const isScrollY = overflowY === 'auto' || overflowY === 'scroll';
        const canScrollY = el.scrollHeight > el.clientHeight;
        
        // Check for horizontal scrollability
        const isScrollX = overflowX === 'auto' || overflowX === 'scroll';
        const canScrollX = el.scrollWidth > el.clientWidth;
        
        if ((isScrollY && canScrollY) || (isScrollX && canScrollX)) {
            return true;
        }
        
        el = el.parentElement as HTMLElement;
    }
    return false;
};