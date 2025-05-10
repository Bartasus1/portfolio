<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import animateScrollTo from 'animated-scroll-to';
import HomepageView from './views/HomepageView.vue';
import AboutMeView from './views/AboutMeView.vue';

var prevScrollTarget = 0;
var scrollTarget = 0;
var sections: HTMLElement[] = [];

const views = [
	HomepageView,
	AboutMeView
]

const handleWheel = (event: WheelEvent) => {
	event.preventDefault()

	prevScrollTarget = scrollTarget;

	if (event.deltaY > 0) {
		scrollTarget += 1;
	} else {
		scrollTarget -= 1;
	}
	scrollTarget = Math.min(Math.max(scrollTarget, 0), sections.length - 1);
	if(prevScrollTarget === scrollTarget) {
		return;
	}

	animateScrollTo(sections[scrollTarget], {
		speed: 400,
		easing: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // Custom easing function
		cancelOnUserAction: false
	})
}

onMounted(() => {
	// Get all sections
	const app = document.querySelector('#app') as HTMLElement
	sections = Array.from(app.children).filter(child => {
		return child.classList.contains('view-section')
	}) as HTMLElement[]
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })
		animateScrollTo(sections[scrollTarget], {
		speed: 400,
		easing: t => t * (2 - t), // Custom easing function
	})
})

// onUnmounted(() => {
// 	// Clean up event listener
// 	window.removeEventListener('wheel', handleWheel)
// })
</script>

<template>
	<div v-for="(view, index) in views" :key="index" :class="`view-section view-section-${index}`">
		<component :is="view" />
	</div>
</template>

<style scoped>
.view-section {
	display: flex;
	align-items: center; /* Changed from stretch to center for vertical alignment */
	justify-content: flex-start;
	width: 100%;
	height: 100%; /* Ensure this is 100vh or similar if it's a full page section */
	max-height: 100vh; /* Or a fixed height if preferred */
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
