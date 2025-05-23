<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import animateScrollTo from 'animated-scroll-to'
import Navbar from './components/Navbar/Navbar.vue';
import NavbarVertical from './components/Navbar/NavbarVertical.vue';
import NavbarMobile from './components/Navbar/NavbarMobile.vue';
import router from '@/router';

const scrollTarget = ref(0);
const horizontalNavbar = ref(true); 
const preventScroll = ref(false);
var scrollableSections: HTMLElement[] = [];


const scrollToSection = (index: number) => {
	if(preventScroll.value || index < 0 || index >= scrollableSections.length) {
		return;
	}

	preventScroll.value = true;
	animateScrollTo(scrollableSections[index], {
		speed: 400,
		easing: t => t * (2 - t),
		cancelOnUserAction: false
	}).then(() => {
		scrollTarget.value = index;
		preventScroll.value = false;
		horizontalNavbar.value = scrollTarget.value === 0 ? true : false;

		const newRouteName = getSections()[scrollTarget.value].name as string;
		if (router.currentRoute.value.name !== newRouteName) {
			router.push({ name: newRouteName });
		}
	})
}

const handleWheel = (event: WheelEvent) => {
	event.preventDefault()

	if(preventScroll.value) {
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
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })
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
	
	<Navbar v-if="horizontalNavbar" />
	<NavbarVertical v-else />
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

/* Navbar transitions - Temporarily commented out or remove if not needed without Transition component
.navbar-switch-enter-active,
.navbar-switch-leave-active {
	transition-property: opacity, transform;
	transition-duration: 0.5s;
	transition-timing-function: ease-in-out;
}

.navbar.navbar-switch-enter-from,
.navbar.navbar-switch-leave-to {
	opacity: 0;
	transform: translateY(-20px); 
}

.navbar.navbar-switch-enter-to,
.navbar.navbar-switch-leave-from {
	opacity: 1;
	transform: translateY(0);
}

.navbar-vertical.navbar-switch-enter-from {
	opacity: 0;
	transform: translateX(-100%);
}

.navbar-vertical.navbar-switch-enter-to {
	opacity: 1;
	transform: translateX(0);
}

.navbar-vertical.navbar-switch-leave-from {
	opacity: 1;
	transform: translateX(0);
}

.navbar-vertical.navbar-switch-leave-to {
	opacity: 0;
	transform: translateX(-100%);
}
*/
</style>
