<script setup lang="ts">
import AboutMeSection from '../components/AboutMeSection.vue'
</script>

<template>
	<section class="aboutMe">
		<div class="leftSide">
			<AboutMeSection sectionName="About Me"/>
			<AboutMeSection sectionName="Experience"/>
			<AboutMeSection sectionName="Education"/>
		</div>
		<!-- <div class="rightSide">
			<Transition name="slide">
				<div v-if="activeSection === 'aboutMe'" class="aboutMeInfo section-content">
					<h2>About Me Content</h2>
					<p>Your about me content goes here...</p>
				</div>
			</Transition>
			<Transition name="slide">
				<div v-if="activeSection === 'education'" class="EducationInfo section-content">
					<h2>Education Content</h2>
					<p>Your education content goes here...</p>
				</div>
			</Transition>
			<Transition name="slide">
				<div v-if="activeSection === 'experience'" class="ExperienceInfo section-content">
					<h2>Experience Content</h2>
					<p>Your experience content goes here...</p>
				</div>
			</Transition>
		</div> -->
	</section>
</template>



<style scoped>
.aboutMe {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	max-height: 100vh;
	overflow: hidden;

	.leftSide {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		width: 40%;
		height: 100%;
		padding-left: 2%;
		background-color: #f2c53d;
	}
	.rightSide {
		position: relative;
		width: 60%;
		height: 100%;
		overflow: hidden;
		background-color: transparent;
	}
}

.aboutMeElement {
	cursor: pointer;
	transition: transform 0.3s ease;
}

.aboutMeElement:hover {
	transform: translateX(10px);
}

.aboutMeElement.active {
	transform: translateX(20px);
	background-color: rgba(255, 255, 255, 0.1);
}

.section-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #4CAF50;
	color: white;
	padding: 2rem;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.5s ease;
}

.slide-enter-from {
	transform: translateX(-100%);
}

.slide-leave-to {
	transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
	transform: translateX(0);
}

.headerContainer,
.aboutMe {
	scroll-snap-align: start;
	height: 100vh;
	overflow: hidden;
}
</style>