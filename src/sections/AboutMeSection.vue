<script setup lang="ts">
	import { ref } from 'vue';
	import AboutMeExpander from '@/components/AboutMe/AboutMeExpander.vue';
	import AboutMePage from "@/components/AboutMe/AboutMePages/AboutMePage.vue";
	import ExperiencePage from '@/components/AboutMe/AboutMePages/ExperiencePage.vue';
	import EducationPage from '@/components/AboutMe/AboutMePages/EducationPage.vue';

	const sectionIndex = ref(-1); 
	
	function setActiveSection(index: number) {
		sectionIndex.value = index;
	}

	const sections = [
		{
			name: 'About Me',
			quote: 'Nosce te ipsum', // know thyself
			component: AboutMePage,
		},
		{
			name: 'Experience',
			quote: 'Per aspera ad astra', // through hardships to the stars
			component: ExperiencePage,
		},
		{
			name: 'Education',
			quote: 'Sapere aude', // dare to know
			component: EducationPage,
		},
	];

</script>

<template>
	<div class="sidebar">
			<AboutMeExpander v-for="(section, index) in sections" :key="index"
				:name="section.name" 
				:quote="section.quote" 
				:class="{ active: sectionIndex === index }" 
				@click="setActiveSection(index)" 
			/>
	</div>	
	<div class="content">
		<Transition name="slide" mode="out-in">
			<div v-if="sectionIndex != -1" :key="sectionIndex" class="content-wrapper">
				<component :is="sections[sectionIndex].component" class="section-content"/>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly; /* Distributes items evenly */
	width: 40%; /* Or adjust as needed */
	height: 100%;
	padding-left: 2%; /* Original padding */
	padding-top: 5%; /* Added padding for better spacing */
	padding-bottom: 5%; /* Added padding for better spacing */
	background-color: #f2c53d; /* Original background */
	box-sizing: border-box;
}
.content {
	position: relative; /* For absolute positioning of section-content */
	width: 60%; /* Or adjust as needed */
	height: 100%;
	overflow: hidden; /* Crucial for transitions */
	background-color: transparent; /* Original background */
	box-sizing: border-box;
}

.content-wrapper {
	width: 100%;
	height: 100%;
	position: relative;
}

.section-content {
	position: absolute;
	width: 100%;
	height: 100%;
	padding: 5% 10% 5% 2%;
	background-color: #f2c53d; /* Consider making this dynamic or more neutral */
	box-sizing: border-box; /* Ensures padding doesn't overflow */
	overflow-y: auto; /* Allow scrolling for long content */
}


/* Slide transition */
.slide-enter-active, .slide-leave-active {
	transition: transform 0.5s ease;
}

.slide-enter-from {
	transform: translateX(-100%); /* Slide in from left */
}

.slide-leave-to {
	transform: translateX(100%); /* Slide out to right */
}

.slide-enter-to, .slide-leave-from {
	transform: translateX(0);
}

.headerContainer, .aboutMe {
	scroll-snap-align: start;
	height: 100vh; /* Ensure this is intended and consistent */
	overflow: hidden; /* Keep this, it's important for the layout */
}
</style>
