<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import animateScrollTo from 'animated-scroll-to'
import Navbar from './components/Navbar/Navbar.vue';
import NavbarVertical from './components/Navbar/NavbarVertical.vue';
import NavbarMobile from './components/Navbar/NavbarMobile.vue';
import router from '@/router';

const nexScrollTarget = ref(0);
const scrollTarget = ref(0);
const preventScroll = ref(false);
var scrollableSections: HTMLElement[] = [];


const scrollToSection = (index: number) => {
	if(preventScroll.value || index < 0 || index >= scrollableSections.length) {
		return;
	}

	nexScrollTarget.value = index;
	preventScroll.value = true;
	animateScrollTo(scrollableSections[index], {
		speed: 400,
		easing: t => t * (2 - t),
		cancelOnUserAction: false
	}).then(() => {
		scrollTarget.value = index;
		preventScroll.value = false;

		const newRouteName = getSections()[scrollTarget.value].name as string;
		if (router.currentRoute.value.name !== newRouteName) {
			router.push({ name: newRouteName });
		}
	})
}

const isDirectlyOverSection = (el: HTMLElement) => {
	while (el && el !== document.body) {
			if (el.classList.contains('section-page') || el.classList.contains('navbar')) return true;
			// If we hit a scrollable element before the section, return false
			const style = window.getComputedStyle(el);
			const overflowY = style.overflowY;
			const isScroll = overflowY === 'auto' || overflowY === 'scroll';
			const canScroll = el.scrollHeight > el.clientHeight;
			if (isScroll && canScroll) return false;
			el = el.parentElement as HTMLElement;
	}
	return false;
};

const handleWheel = (event: WheelEvent) => {
	// Only handle wheel if mouse is directly over a section (not over a scrollable child)
	if (!isDirectlyOverSection(event.target as HTMLElement)) {
			return;
	}

	event.preventDefault();

	if (preventScroll.value) {
			return;
	}

	let newScrollTarget = scrollTarget.value;
	if (event.deltaY > 0) {
			newScrollTarget += 1;
	} else {
			newScrollTarget -= 1;
	}

	scrollToSection(newScrollTarget);
}


const displayRegularNavbar = computed(() => {
	if(nexScrollTarget.value >= 1 && scrollTarget.value != 0)
		return false;
	if(nexScrollTarget.value === 0)
		return true;
})

onMounted(() => {
	const app = document.querySelector('#app') as HTMLElement
	scrollableSections = Array.from(app.children).filter(child => {
			return child.classList.contains('section-page')
	}) as HTMLElement[]

	// Set initial scroll target based on current route
	const currentRouteName = router.currentRoute.value.name;
	const initialSectionIndex = getSections().findIndex(section => section.name === currentRouteName);
	if (initialSectionIndex !== -1) {
			scrollToSection(initialSectionIndex);
	}

	// Add wheel event listener for section scrolling
	window.addEventListener('wheel', handleWheel, { passive: false })

	// Add wheel event listener to consume scroll on scrollable elements
	window.addEventListener('wheel', (event: WheelEvent) => {
    let el = event.target as HTMLElement | null;
    while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const isScroll = overflowY === 'auto' || overflowY === 'scroll';
        const canScroll = el.scrollHeight > el.clientHeight;
        if (isScroll) {
            if (canScroll) {
                const atTop = el.scrollTop === 0;
                const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
                if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
                    event.preventDefault();
                    return;
                }
                return;
            } else {
                event.preventDefault();
                return;
            }
        }
        el = el.parentElement;
    }
}, { passive: false });
})

watch(
    () => router.currentRoute.value.name,
    (newName) => {
        const sectionIndex = getSections().findIndex(section => section.name === newName);
        if (sectionIndex !== -1 && scrollableSections[sectionIndex]) {
            scrollToSection(sectionIndex);
        }
    }
);

const getSections = () => {
	return router.getRoutes()
		.filter(r => r.components && r.components.default)
		.map(route => ({
			component: route.components?.default,
			name: route.name,
			path: route.path
		}))
}
</script>

<template>
	
	<Transition name="navbar-switch" mode="out-in">
		<component
			:is="displayRegularNavbar ? Navbar : NavbarVertical"
			:key="displayRegularNavbar ? 'navbar' : 'navbar-vertical'"
		/>
	</Transition>
	<NavbarMobile/>

	<div v-for="(section, index) in getSections()" 
		:id="String(section.name).toLowerCase()" :key="index" 
		class="section-page " >

		<component :is="section.component" />
		
	</div>

</template>

<style scoped>
.section-page {
	display: flex;
	align-items: center; /* Changed from stretch to center for vertical alignment */
	justify-content: flex-start;
	width: 100vw;
	height: 100vh; /* Ensure this is 100vh or similar if it's a full page section */
	overflow: hidden;
}

/* Optional: Add this to the parent container if you want to enable native scroll snapping as a fallback */
:root {
	scroll-behavior: smooth;
	/* scroll-snap-type: y mandatory; */
	overflow-y: scroll;
	height: 100vh;
}

.navbar-switch-enter-active, .navbar-switch-leave-active {
	transition: transform 0.2s ease-in-out;
}

.navbar-switch-enter-from {
	transform: translateX(-100%); /* Slide in from the left*/
}

.navbar-switch-leave-to {
	transform: translateX(-100%); /* Slide out to the left */
}

</style>
