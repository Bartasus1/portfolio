<script setup lang="ts">
	import { ref } from 'vue';
	import AboutMeSection from '@/components/AboutMe/AboutMeSection.vue';
	import AboutMePage from "@/components/AboutMe/AboutMePages/AboutMePage.vue";
	import ExperiencePage from '@/components/AboutMe/AboutMePages/ExperiencePage.vue';
	import EducationPage from '@/components/AboutMe/AboutMePages/EducationPage.vue';

	const activeSection = ref(''); // Initial section: 'aboutMe', 'education', 'experience'

	// Function to be called by AboutMeSection components or click handlers
	function setActiveSection(sectionKey: string) {
		activeSection.value = sectionKey;
	}

</script>

<template>
	<section class="aboutMe">
		<div class="sidebar">
			<AboutMeSection name="About Me" description="Nosce te ipsum, temet nosce" @click="setActiveSection('aboutMe')" :class="{ active: activeSection === 'aboutMe' }" />
			<AboutMeSection name="Experience" description="Per aspera ad astra" @click="setActiveSection('experience')" :class="{ active: activeSection === 'experience' }" />
			<AboutMeSection name="Education" description="Sapere aude" @click="setActiveSection('education')" :class="{ active: activeSection === 'education' }" />
		</div>
		<div class="content">
			<Transition name="slide" mode="out-in">
				<!-- This wrapper is necessary for the transition to work properly -->
				<div :key="activeSection" class="content-wrapper">
						<!-- About Me Content -->
						<div v-if="activeSection === 'aboutMe'" class="aboutMeInfo section-content">
							<AboutMePage/>
						</div>
						<!-- Experience Content -->
						<div v-else-if="activeSection === 'experience'" class="ExperienceInfo section-content">
							<ExperiencePage/>
						</div>
						<!-- Education Content -->
						<div v-else-if="activeSection === 'education'" class="EducationInfo section-content">
							<EducationPage/>
						</div>
				</div>
			</Transition>
		</div>
	</section>
</template>

<style scoped>
.aboutMe {
	display: flex;
	align-items: center; /* Changed from stretch to center for vertical alignment */
	justify-content: flex-start;
	width: 100%;
	height: 100%; /* Ensure this is 100vh or similar if it's a full page section */
	max-height: 100vh; /* Or a fixed height if preferred */
	overflow: hidden;
}
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
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 5% 10% 5% 0;
	background-color: #f2c53d; /* Consider making this dynamic or more neutral */
	color: white;
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
