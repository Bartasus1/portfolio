<script setup lang="ts">
	import ProjectCard from '@/components/Projects/ProjectCard.vue';
	import ProjectOverlay from '@/components/Projects/ProjectOverlay.vue';
	import data from '@/data/projects.json';
	import { ref } from 'vue';

	interface Project {
		title: string;
		image: string;
		short_description: string;
		description: string[];
		focus_points: string[];
		technologies: Technology[];
		links: Link[];
	}

	interface Link {
		name: string;
		url: string;
		icon: string;
	}

	interface Technology {
		name: string;
		icon: string;
	}

	enum Filter {
		ALL = 'ALL',
		PERSONAL = 'PERSONAL',
		WORK = 'WORK',
		OPEN_SOURCE = 'OPEN_SOURCE',
	}

	const filter = ref(Filter.ALL);
	const selectedProject = ref<Project | null>(null);
	const isOverlayVisible = ref(false);

	const filteredData = () => {
		return filter.value === Filter.ALL ? data : data.filter(project => project.scope === filter.value);
	}

	const showProjectDetails = (project: Project) => {
		selectedProject.value = project;
		isOverlayVisible.value = true;
	};

	const closeOverlay = () => {
		isOverlayVisible.value = false;
		selectedProject.value = null;
	};
</script>


<template>
	<div class="projects-section">
		<h2 class="title">
			Projects
		</h2>
		<div class="filters">
			<!-- <div class="filter-button" @click="filter = Filter.ALL">All</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.PERSONAL">Personal</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.WORK">Work</div> -->
			<!-- <div class="filter-button" @click="filter = Filter.OPEN_SOURCE">Open Source</div> -->
		</div>
		<div class="projects">
			<ProjectCard 
				v-for="(project, index) in filteredData()"
				:key="index"
				:index="index"
				:project="project"
				class="project-item"
				@showDetails="showProjectDetails"
			/>
		</div>

		<ProjectOverlay
			:isVisible="isOverlayVisible"
			:project="selectedProject"
			@close="closeOverlay"
		/>
	</div>
</template>


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
	font-size: 3rem;
	color: white;
	font-weight: 400;
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
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 50px; 
	padding: 40px;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;
}

.project-item {
	height: 90%;
	scroll-snap-align: start;
}

/* Add responsive styles */
@media screen and (max-width: 1024px) {
	.projects-section {
		height: 100vh;
		padding: 4% 0;
	}

	.title {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.filters {
		width: 90%;
		flex-wrap: wrap;
		padding: 10px;
	}

	.projects {
		flex-direction: row;
		justify-content: flex-start;
		overflow-x: auto;
		overflow-y: hidden;
		gap: 30px;
		padding: 20px;
	}

	.project-item {
		min-height: 400px;
		width: 90%;
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
	}

	.title {
		font-size: 3rem;
	}

	.project-item {
		min-height: 400px;
		width: 90%;
	}
}
</style>