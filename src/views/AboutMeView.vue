<script setup lang="ts">
import { ref, watch } from 'vue';
import AboutMeSection from '../components/AboutMeSection.vue';

const activeSection = ref('aboutMe'); // Initial section: 'aboutMe', 'education', 'experience'
const currentSectionData = ref<any>(null); // Stores data for the active section
const isLoading = ref(false);
const error = ref<string | null>(null);

const sectionFileMap: Record<string, string> = {
	aboutMe: 'about_me',
	education: 'education',
	experience: 'experience',
};

interface MarkdownLink {
	text: string;
	url: string | undefined;
}

function parseMarkdownLink(markdown: string | undefined): MarkdownLink {
	if (!markdown) return { text: '', url: undefined };
	const match = markdown.match(/\[(.*?)\]\((.*?)\)/);
	if (match && match[1] && match[2]) {
		return { text: match[1], url: match[2] };
	}
	return { text: markdown, url: undefined };
}

async function loadSectionData(section: string) {
	if (!section) return;

	isLoading.value = true;
	error.value = null;
	currentSectionData.value = null; // Clear previous data to ensure transition sees a change

	const fileName = sectionFileMap[section];
	if (!fileName) {
		error.value = `Invalid section: ${section}`;
		isLoading.value = false;
		return;
	}

	try {
		// Corrected dynamic import path syntax
		const module = await import(`../data/${fileName}.json`);
		currentSectionData.value = module.default || module;
	} catch (e) {
		console.error(`Failed to load data for section ${section}:`, e);
		error.value = `Failed to load content for ${section}.`;
	} finally {
		isLoading.value = false;
	}
}

// Function to be called by AboutMeSection components or click handlers
function setActiveSection(sectionKey: string) {
	activeSection.value = sectionKey;
}

// Watch for changes in activeSection and load data accordingly
// immediate: true ensures it runs on component mount for the initial activeSection
watch(activeSection, (newSection) => {
	loadSectionData(newSection);
}, { immediate: true });
</script>

<template>
	<section class="aboutMe">
		<div class="leftSide">
			<AboutMeSection sectionName="About Me" @click="setActiveSection('aboutMe')" :class="{ active: activeSection === 'aboutMe' }" />
			<AboutMeSection sectionName="Experience" @click="setActiveSection('experience')" :class="{ active: activeSection === 'experience' }" />
			<AboutMeSection sectionName="Education" @click="setActiveSection('education')" :class="{ active: activeSection === 'education' }" />
		</div>
		<div class="rightSide">
			<Transition name="slide" mode="out-in">
				<div :key="activeSection" class="content-wrapper"> {/* Key ensures component re-creation for transition */}
					<div v-if="isLoading" class="loading-state section-content">
						<h2>Loading...</h2>
					</div>
					<div v-else-if="error" class="error-state section-content">
						<h2>Error</h2>
						<p>{{ error }}</p>
					</div>
					<div v-else-if="currentSectionData">
						<!-- About Me Content -->
						<div v-if="activeSection === 'aboutMe'" class="aboutMeInfo section-content">
							<h2>{{ currentSectionData.title }}</h2>
							<p v-for="(paragraph, pIndex) in currentSectionData.description" :key="`desc-${pIndex}`">{{ paragraph }}</p>
							
							<template v-if="currentSectionData.hobbies && currentSectionData.hobbies.length">
								<h3>Hobbies</h3>
								<ul>
									<li v-for="(hobby, hIndex) in currentSectionData.hobbies" :key="`hobby-${hIndex}`">{{ hobby }}</li>
								</ul>
							</template>
							
							<template v-if="currentSectionData.soft_skills && currentSectionData.soft_skills.length">
								<h3>Soft Skills</h3>
								<ul>
									<li v-for="(skill, sIndex) in currentSectionData.soft_skills" :key="`skill-${sIndex}`">{{ skill }}</li>
								</ul>
							</template>
						</div>

						<!-- Education Content -->
						<div v-else-if="activeSection === 'education' && Array.isArray(currentSectionData)" class="EducationInfo section-content">
							<h2>Education</h2>
							<div v-for="(edu, eduIndex) in currentSectionData" :key="`edu-${eduIndex}`" class="education-item item-card">
								<h3 class="item-title">
									{{ edu.degree }} at {{ parseMarkdownLink(edu.institution).text }}
									<a v-if="parseMarkdownLink(edu.institution).url" :href="parseMarkdownLink(edu.institution).url" target="_blank" rel="noopener noreferrer" class="external-link">(Link)</a>
								</h3>
								<p class="item-meta">{{ edu.start_date }} - {{ edu.end_date }}</p>
								<template v-if="edu.skills && edu.skills.length">
									<h4>Skills:</h4>
									<ul>
										<li v-for="(skill, skillIndex) in edu.skills" :key="`edu-skill-${eduIndex}-${skillIndex}`">{{ skill }}</li>
									</ul>
								</template>
							</div>
						</div>

						<!-- Experience Content -->
						<div v-else-if="activeSection === 'experience' && currentSectionData.jobs" class="ExperienceInfo section-content">
							<h2>Experience</h2>
							<div v-for="(job, jobIndex) in currentSectionData.jobs" :key="`job-${jobIndex}`" class="job-item item-card">
								<h3 class="item-title">
									{{ job.title }} at {{ parseMarkdownLink(job.company).text }}
									<a v-if="parseMarkdownLink(job.company).url" :href="parseMarkdownLink(job.company).url" target="_blank" rel="noopener noreferrer" class="external-link">(Link)</a>
								</h3>
								<p class="item-meta">{{ job.location }} | {{ job.start_date }} - {{ job.end_date }}</p>
								<template v-if="job.technologies && job.technologies.length">
									<h4>Technologies:</h4>
									<ul class="tech-list">
										<li v-for="(tech, techIndex) in job.technologies" :key="`job-tech-${jobIndex}-${techIndex}`">
											<img v-if="tech.icon" :src="tech.icon" :alt="tech.name" class="tech-icon" />
											{{ tech.name }}
										</li>
									</ul>
								</template>
								<template v-if="job.responsibilities && job.responsibilities.length">
									<h4>Responsibilities:</h4>
									<ul>
										<li v-for="(resp, respIndex) in job.responsibilities" :key="`job-resp-${jobIndex}-${respIndex}`">{{ resp }}</li>
									</ul>
								</template>
								<template v-else>
									<p><em>Responsibilities for this role are currently not detailed.</em></p>
								</template>
							</div>
						</div>
						<div v-else class="section-content">
							<p>No content available for this section or data format is unexpected.</p>
						</div>
					</div>
					<div v-else class="section-content">
						<p>Select a section to view details, or content is unavailable.</p>
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

	.leftSide {
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
	.rightSide {
		position: relative; /* For absolute positioning of section-content */
		width: 60%; /* Or adjust as needed */
		height: 100%;
		overflow: hidden; /* Crucial for transitions */
		background-color: transparent; /* Original background */
		box-sizing: border-box;
	}
}

/* Ensure AboutMeSection components are clickable and styled */
.aboutMeElement { /* Assuming AboutMeSection renders an element with this class or similar */
	cursor: pointer;
	transition: transform 0.3s ease, background-color 0.3s ease; /* Added background-color transition */
	padding: 10px 15px; /* Added padding for better click area and appearance */
	border-radius: 5px; /* Optional: for rounded corners */
	margin-bottom: 10px; /* Optional: for spacing between items */
}

.aboutMeElement:hover {
	transform: translateX(10px);
	background-color: rgba(255, 255, 255, 0.05); /* Subtle hover effect */
}

.aboutMeElement.active { /* Style for the active section button */
	transform: translateX(20px); /* Original active transform */
	background-color: rgba(255, 255, 255, 0.2); /* Make active state more prominent */
	font-weight: bold; /* Emphasize active text */
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
	background-color: #f2c53d; /* Consider making this dynamic or more neutral */
	color: white;
	padding: 2rem;
	box-sizing: border-box; /* Ensures padding doesn't overflow */
	overflow-y: auto; /* Allow scrolling for long content */
}

.loading-state h2, .error-state h2 {
	text-align: center;
	margin-top: 20%;
}
.error-state p {
	text-align: center;
	color: #ffdddd;
}

/* Styles for items within sections for better readability */
.item-card {
	background-color: rgba(0,0,0,0.1);
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 8px;
}

.item-title {
	margin-top: 0;
	color: #f2c53d; /* Accent color for titles */
}

.item-meta {
	font-size: 0.9em;
	color: #e0e0e0;
	margin-bottom: 0.5rem;
}

.external-link {
	color: #87CEFA; /* Light Sky Blue for links */
	text-decoration: none;
	font-size: 0.9em;
}
.external-link:hover {
	text-decoration: underline;
}

ul {
	list-style-type: disc;
	padding-left: 20px;
}
li {
	margin-bottom: 0.5rem;
}

.tech-list {
	list-style-type: none;
	padding-left: 0;
}
.tech-list li {
	display: inline-flex; /* Align icon and text */
	align-items: center; /* Vertically center icon and text */
	background-color: rgba(255,255,255,0.1);
	padding: 0.3rem 0.6rem;
	border-radius: 4px;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 0.9em;
}

.tech-icon {
	width: 16px;
	height: 16px;
	margin-right: 8px; /* Increased margin for better spacing */
	vertical-align: middle; /* Better alignment with text */
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.5s ease;
}

.slide-enter-from {
	transform: translateX(-100%); /* Slide in from left */
}

.slide-leave-to {
	transform: translateX(100%); /* Slide out to right */
}

.slide-enter-to,
.slide-leave-from {
	transform: translateX(0);
}

.headerContainer, /* This might be from another component or global style */
.aboutMe {
	scroll-snap-align: start;
	height: 100vh; /* Ensure this is intended and consistent */
	overflow: hidden; /* Keep this, it's important for the layout */
}
</style>
