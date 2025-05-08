<script setup> // lang="ts"
import { ref, onMounted, onUnmounted } from 'vue'
import HomepageView from './views/HomepageView.vue';
import AboutMeView from './views/AboutMeView.vue';

// const activeSection = ref('')
// const isScrolling = ref(false)
// const currentSection = ref(0)
// const sections = ref<HTMLElement[]>([])

// const handleSectionClick = (section: string) => {
// 	if (activeSection.value === section) {
// 		activeSection.value = ''
// 	} else {
// 		activeSection.value = section
// 	}
// }

// const scrollToSection = (index: number) => {
// 	if (index < 0 || index >= sections.value.length || isScrolling.value) return
	
// 	isScrolling.value = true
// 	currentSection.value = index
	
// 	sections.value[index].scrollIntoView({
// 		behavior: 'smooth',
// 		block: 'start'
// 	})
	
// 	// Reset scrolling flag after animation completes
// 	setTimeout(() => {
// 		isScrolling.value = false
// 	}, 1000) // Adjust timing based on your scroll animation duration
// }

// const handleWheel = (event: WheelEvent) => {
// 	event.preventDefault()
	
// 	if (isScrolling.value) return
	
// 	if (event.deltaY > 0) {
// 		// Scrolling down
// 		scrollToSection(currentSection.value + 1)
// 	} else {
// 		// Scrolling up
// 		scrollToSection(currentSection.value - 1)
// 	}
// }

// onMounted(() => {
// 	// Get all sections
// 	sections.value = [
// 		document.querySelector('.headerContainer') as HTMLElement,
// 		document.querySelector('.aboutMe') as HTMLElement
// 	]
	
// 	// Add wheel event listener
// 	window.addEventListener('wheel', handleWheel, { passive: false })
// })

// onUnmounted(() => {
// 	// Clean up event listener
// 	window.removeEventListener('wheel', handleWheel)
// })
</script>

<template>
	<HomepageView />
	<AboutMeView />
</template>

<style scoped>
/* Optional: Add this to the parent container if you want to enable native scroll snapping as a fallback */
:root {
	scroll-behavior: smooth;
	scroll-snap-type: y mandatory;
	overflow-y: scroll;
	height: 100vh;
}
</style>
