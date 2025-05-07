<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('')
const isScrolling = ref(false)
const currentSection = ref(0)
const sections = ref<HTMLElement[]>([])

const handleSectionClick = (section: string) => {
	if (activeSection.value === section) {
		activeSection.value = ''
	} else {
		activeSection.value = section
	}
}

const scrollToSection = (index: number) => {
	if (index < 0 || index >= sections.value.length || isScrolling.value) return
	
	isScrolling.value = true
	currentSection.value = index
	
	sections.value[index].scrollIntoView({
		behavior: 'smooth',
		block: 'start'
	})
	
	// Reset scrolling flag after animation completes
	setTimeout(() => {
		isScrolling.value = false
	}, 1000) // Adjust timing based on your scroll animation duration
}

const handleWheel = (event: WheelEvent) => {
	event.preventDefault()
	
	if (isScrolling.value) return
	
	if (event.deltaY > 0) {
		// Scrolling down
		scrollToSection(currentSection.value + 1)
	} else {
		// Scrolling up
		scrollToSection(currentSection.value - 1)
	}
}

onMounted(() => {
	// Get all sections
	sections.value = [
		document.querySelector('.headerContainer') as HTMLElement,
		document.querySelector('.aboutMe') as HTMLElement
	]
	
	// Add wheel event listener
	window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
	// Clean up event listener
	window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
	<div class="welcomeImage"></div>
	<div class="headerContainer">
		<div class="welcome">
			<h1 class="myName">Bartłomiej Banaś</h1>
			<span class="separator"></span>
			<h2 class="myProfession">Gameplay & UI Programmer</h2>
		</div>
	</div>
	<section class="aboutMe">
		<div class="leftSide">
			<div 
				class="aboutMeElement" 
				:class="{ active: activeSection === 'aboutMe' }"
				@click="handleSectionClick('aboutMe')"
			>
				<div class="titleElement">
					<h1>About me</h1>
				</div>
				<div class="elementSeparator"></div>
				<div class="descriptionElement">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur iure ut odit, fuga, explicabo nemo amet
						recusandae obcaecati repellendus tenetur rerum libero natus perspiciatis laudantium quisquam et assumenda
						voluptates. Nobis.
					</p>
				</div>
			</div>
			<div 
				class="aboutMeElement"
				:class="{ active: activeSection === 'education' }"
				@click="handleSectionClick('education')"
			>
				<div class="titleElement">
					<h1>Education</h1>
				</div>
				<div class="elementSeparator"></div>
				<div class="descriptionElement">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur iure ut odit, fuga, explicabo nemo amet
						recusandae obcaecati repellendus tenetur rerum libero natus perspiciatis laudantium quisquam et assumenda
						voluptates. Nobis.
					</p>
				</div>
			</div>
			<div 
				class="aboutMeElement"
				:class="{ active: activeSection === 'experience' }"
				@click="handleSectionClick('experience')"
			>
				<div class="titleElement">
					<h1>Experience</h1>
				</div>
				<div class="elementSeparator"></div>
				<div class="descriptionElement">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur iure ut odit, fuga, explicabo nemo amet
						recusandae obcaecati repellendus tenetur rerum libero natus perspiciatis laudantium quisquam et assumenda
						voluptates. Nobis.
					</p>
				</div>
			</div>
		</div>
		<div class="rightSide">
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
		</div>
	</section>
</template>

<style scoped>
.welcomeImage {
	position: fixed;
	top: 0;
	left: 40% !important;
	width: 100% !important;
	height: 100%;
	background: url(@/assets/testImage.jpg);
	background-size: cover;
	background-position: 10% 0%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	z-index: -1;
}
.headerContainer {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	max-height: 100vh;
	overflow: hidden;
	z-index: 10;
	.welcome {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 40%;
		height: 100%;
		padding-left: 2%;
		background-color: #f2c53dff;
		.myName {
			width: 100%;
			font-size: 6.5rem;
			color: white;
			font-weight: 800;
		}
		.separator {
			width: 90%;
			height: 8px;
			border-radius: 4px;
			background-color: #fff;
			margin-top: 40px;
			margin-bottom: 40px;
		}
		.myProfession {
			width: 100%;
			font-size: 6.5rem;
			color: #202020;
			font-weight: 600;
			line-height: 6rem;
		}
	}
}
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
		.aboutMeElement {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			width: 60%;
			color: #202020;
			.titleElement {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				h1 {
					font-size: 4rem;
				}
			}
			.elementSeparator {
				width: 100%;
				height: 2px;
				background-color: #202020;
				margin: 10px 0;
			}
			.descriptionElement {
				font-size: 1.4rem;
			}
		}
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

/* Optional: Add this to the parent container if you want to enable native scroll snapping as a fallback */
:root {
	scroll-behavior: smooth;
	scroll-snap-type: y mandatory;
	overflow-y: scroll;
	height: 100vh;
}
</style>
