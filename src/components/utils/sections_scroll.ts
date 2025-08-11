import { computed, ref } from "vue";
import router, {getSections} from "@/router";
import animateScrollTo from "animated-scroll-to";

export const scrollContainer = ref(null);
export const scrollTarget = ref(0);
export const nextScrollTarget = ref(0);
export const preventScroll = ref(false);

var scrollableSections: Element[] = [];
export const assignScrollableSections = (sections: Element[]) => {
    scrollableSections = sections;
}

export const scrollSections = (event: WheelEvent) => {

	// Check if we're over a scrollable element
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
	if (!isDirectlyOverSection(event.target as HTMLElement)) {
		return;
	}

	// Prevent default behavior for section scrolling
	event.preventDefault();

	let newScrollTarget = scrollTarget.value;
	if (event.deltaY > 0) {
		newScrollTarget++;
	} else {
		newScrollTarget--;
	}

	scrollToSection(newScrollTarget);
}

export const scrollToSection = (index: number) => {

	if( index < 0 || index >= scrollableSections.length) {
		return;
	}

	nextScrollTarget.value = index;
	animateScrollTo(scrollableSections[index], {
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

const isDirectlyOverSection = (el: HTMLElement) => {
	while (el && el !== document.body) {
		if (el.classList.contains('section-page') || el.classList.contains('navbar')) return true;
		el = el.parentElement as HTMLElement;
	}
	return false;
};