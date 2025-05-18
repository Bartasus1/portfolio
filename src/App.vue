<script setup lang="ts">
import { onMounted } from 'vue'
import animateScrollTo from 'animated-scroll-to'
import Navbar from './sections/Navbar.vue';
import router from '@/router';
import { RouterView } from 'vue-router';

var prevScrollTarget = 0;
var scrollTarget = 0;
var scrollableSections: HTMLElement[] = [];
var preventScroll = false;

const handleWheel = (event: WheelEvent) => {
	event.preventDefault()
	
	//TODO: Enable scroll prevention when pushing to production
	// if (preventScroll) {
	// 	return;
	// }

	
	prevScrollTarget = scrollTarget;

	if (event.deltaY > 0) {
		scrollTarget += 1;
	} else {
		scrollTarget -= 1;
	}
	scrollTarget = Math.min(Math.max(scrollTarget, 0), scrollableSections.length - 1);
	if(prevScrollTarget === scrollTarget) {
		return;
	}

	preventScroll = true;
	animateScrollTo(scrollableSections[scrollTarget], {
		speed: 400,
		easing: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // Custom easing function
		cancelOnUserAction: false
	}).then(() => {
		preventScroll = false;
	})
}

onMounted(() => {
	// Get all sections
	const app = document.querySelector('#app') as HTMLElement
	scrollableSections = Array.from(app.children).filter(child => {
		return child.classList.contains('section-page')
	}) as HTMLElement[]
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })
		animateScrollTo(scrollableSections[scrollTarget], {
		speed: 400,
		easing: t => t * (2 - t), // Custom easing function
	})
})

const getSections = () => {
	return router.getRoutes()
		.filter(r => r.components && r.components.default)
		.map(route => ({
			component: route.components?.default,
			name: route.name
		}))
}
</script>

<template>
	<Navbar />
	<!-- <RouterView /> -->
	<div 
		v-for="(section, index) in getSections()" 
		:key="index" 
		:id="String(section.name)" 
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
</style>
