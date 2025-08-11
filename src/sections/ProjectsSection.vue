<template>
	<div class="projects-section">
		<h2 class="title">
			Projects
		</h2>
		<!-- <div class="filters"> -->
			<!-- <div class="filter-button" @click="filter = Filter.ALL">All</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.PERSONAL">Personal</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.WORK">Work</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.OPEN_SOURCE">Open Source</div> -->
		<!-- </div> -->
		<HorizontalScroll class="projects">
				<ProjectCard class="project-item"
					v-for="(project, index) in filteredData()"
					:project="project"
					:key="index"
					@click="showProjectDetails(project)"
				/>
		</HorizontalScroll>

		<ProjectOverlay v-if="toggleOverlay" :project="selectedProject" @close="closeOverlay" />

	</div>
</template>


<script setup lang="ts">
	import ProjectCard from '@/components/Projects/ProjectCard.vue';
	import ProjectOverlay from '@/components/Projects/ProjectOverlay.vue';
	import HorizontalScroll from '@/components/utils/HorizontalScroll.vue';
	import data from '@/data/projects.json';
	import { ref } from 'vue';
	import type { Project } from '@/components/Projects/types';

	enum Filter {
		ALL = 'ALL',
		PERSONAL = 'PERSONAL',
		WORK = 'WORK',
		OPEN_SOURCE = 'OPEN_SOURCE',
	}

	const filter = ref(Filter.ALL);
	const selectedProject = ref<Project | null>(null);
	const toggleOverlay = ref(false);

	const filteredData = () => {
		return filter.value === Filter.ALL ? data : data.filter(project => project.scope === filter.value);
	}

	const showProjectDetails = (project: Project) => {
		selectedProject.value = project;
		toggleOverlay.value = true;
	};

	const closeOverlay = () => {
		toggleOverlay.value = false;
		selectedProject.value = null;
	};
</script>


<style scoped>
.projects-section {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #1a202c; 
	padding: 2% 0;
	padding-left: 10%;
}

.title {
	width: 100%;
	font-size: 2.5rem;
	color: white;
	text-align: center;
}

.filters {
	width: 80%;
	display: none;
	justify-content: center;
	align-items: center;
	gap: 20px; 
	padding: 20px;
}

.filter-button {
	background-color: #2d3748;
	color: white;
	font-size: 1.2rem;
	padding: 10px 20px;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.filter-button:active {
	background-color: #4a5568;
}

.projects {
	width: 100%;
	height: 100%;
	margin: 2%;
	padding-right: 40px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	flex-grow: 1;
	align-items: center;
	justify-content: space-around;
	gap: 50px;
	-webkit-overflow-scrolling: touch;
}

.project-item {
	height: 90%;
	margin-bottom: 20px;
	scroll-snap-align: center;
}

@media screen and (max-width: 1400px) {
	.projects-section {
		height: 100vh;
		padding: 2% 2%;
	}

}

/* Add responsive styles */
@media screen and (max-width: 1024px) {

	.title {
		margin-top: 5%;
	}
	.filters {
		width: 90%;
		flex-wrap: wrap;
		padding: 10px;
	}

	.projects {
		justify-content: flex-start;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 30px;
		padding: 20px;
	}

	.project-item {
		min-height: 400px;
		max-width: 90%;
	}
}

/* Additional breakpoint for very small devices */
@media screen and (max-width: 480px) {
	.projects {
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 30px;
		padding: 15px;
		padding-left: 6%;
	}

	.project-item {
		width: 80%;
	}
}
</style>