<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import animateScrollTo from 'animated-scroll-to';
import HomepageSection from './sections/HomepageSection.vue';
import AboutMeSection from './sections/AboutMeSection.vue';
import TechStackSection from './sections/TechStackSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';

var prevScrollTarget = 0;
var scrollTarget = 0;
var sections: HTMLElement[] = [];

const sectionPages = [
	HomepageSection,
	AboutMeSection,
	TechStackSection,
	ProjectsSection
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
		return child.classList.contains('section-page')
	}) as HTMLElement[]
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })
		animateScrollTo(sections[scrollTarget], {
		speed: 400,
		easing: t => t * (2 - t), // Custom easing function
	})

	/* PRE-FETCH IMPORTANT THINGS FROM PUBLIC FOLDER*/
	// experience.jobs.forEach((job) => {
	// 	const tech = job.technologies;
	// 	tech.forEach((t) => {
	// 		if (t.icon) {
	// 			const img = new Image();
	// 			img.src = t.icon;
	// 		}
	// 	})
	// })
	// projects.forEach((project) => {
	// 	const img = new Image();
	// 	img.src = project.image;
	// 	const tech = project.technologies;
	// 	tech.forEach((t) => {
	// 		if (t.icon) {
	// 			const img = new Image();
	// 			img.src = t.icon;
	// 		}
	// 	})
	// })
})

// onUnmounted(() => {
// 	// Clean up event listener
// 	window.removeEventListener('wheel', handleWheel)
// })
</script>

<template>
	<div v-for="(section, index) in sectionPages" :key="index" class="section-page">
		<component :is="section" />
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
