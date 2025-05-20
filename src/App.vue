<script setup lang="ts">
import { onMounted } from 'vue'
import animateScrollTo from 'animated-scroll-to'
import Navbar from './sections/Navbar.vue';
import NavbarVertical from './sections/NavbarVertical.vue';
import router from '@/router';

var prevScrollTarget = 0;
var scrollTarget = 0;
var scrollableSections: HTMLElement[] = [];
var preventScroll = false;

const handleWheel = (event: WheelEvent) => {
	event.preventDefault()
	console.log('[Debug] handleWheel triggered');
	
	//TODO: Enable scroll prevention when pushing to production
	// if (preventScroll) {
	// 	return;
	// }

	console.log('[Debug] event.deltaY:', event.deltaY);
	prevScrollTarget = scrollTarget;
	let newScrollTarget = scrollTarget;

	if (event.deltaY > 0) {
		newScrollTarget += 1;
	} else {
		newScrollTarget -= 1;
	}
	console.log('[Debug] scrollTarget before clamp:', newScrollTarget);
	console.log('[Debug] scrollableSections.length:', scrollableSections.length);

	scrollTarget = Math.min(Math.max(newScrollTarget, 0), scrollableSections.length - 1);
	console.log('[Debug] scrollTarget after clamp:', scrollTarget);
	console.log('[Debug] prevScrollTarget:', prevScrollTarget);

	if(prevScrollTarget === scrollTarget) {
		console.log('[Debug] scrollTarget did not change, returning.');
		return;
	}

	preventScroll = true;
	animateScrollTo(scrollableSections[scrollTarget], {
		speed: 400,
		easing: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // Custom easing function
		cancelOnUserAction: false
	}).then(() => {
		preventScroll = false;
		const newRouteName = getSections()[scrollTarget].name as string;
		if (router.currentRoute.value.name !== newRouteName) {
			router.push({ name: newRouteName });
		}
	})
}

onMounted(() => {
	const app = document.querySelector('#app') as HTMLElement
	scrollableSections = Array.from(app.children).filter(child => {
		return child.classList.contains('section-page')
	}) as HTMLElement[]
	console.log('[Debug] Number of scrollable sections detected:', scrollableSections.length);
	console.log('[Debug] Sections from getSections():', JSON.stringify(getSections(), null, 2));
	
	// Set initial scroll target based on current route
	const currentRouteName = router.currentRoute.value.name;
	const initialSectionIndex = getSections().findIndex(section => section.name === currentRouteName);
	if (initialSectionIndex !== -1) {
		scrollTarget = initialSectionIndex;
	}
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })

	// Scroll to the initial section
	animateScrollTo(scrollableSections[scrollTarget], {
		speed: 400,
		easing: t => t * (2 - t), // Custom easing function
	}).then(() => {
		// Ensure the URL is correct on initial load if not already matching
		const currentSectionName = getSections()[scrollTarget].name as string;
		if (router.currentRoute.value.name !== currentSectionName) {
			router.push({ name: currentSectionName });
		}
	})
})

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
	<!-- <Transition name="navbar-switch" mode="out-in"> -->
		<Navbar />
		<NavbarVertical :sections="getSections()" :currentSectionIndex="scrollTarget" />
	<!-- </Transition> -->
	<!-- <RouterView /> -->
	<div 
		v-for="(section, index) in getSections()" 
		:key="index" 
		:id="String(section.name).toLowerCase()" 
		class="section-page" >

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
