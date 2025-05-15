<script setup lang="ts">
	import ProjectCard from '@/components/Projects/ProjectCard.vue';
	import data from '@/data/projects.json';
	import { ref } from 'vue';

	enum Filter {
		ALL = 'ALL',
		PERSONAL = 'PERSONAL',
		WORK = 'WORK',
		OPEN_SOURCE = 'OPEN_SOURCE',
	}

	const filter = ref(Filter.ALL);

	const filteredData = () => {
		return filter.value === Filter.ALL ? data : data.filter(project => project.scope === filter.value);
	}

</script>


<template>
	<div class="projects-section">
		<h2 class="title">
			Projects
		</h2>
		<div class="filters">
			<div class="filter-button" @click="filter = Filter.ALL">All</div>
			<div class="filter-button" @click="filter = Filter.PERSONAL">Personal</div>
			<div class="filter-button" @click="filter = Filter.WORK">Work</div>
			<!-- <div class="filter-button" @click="filter = Filter.OPEN_SOURCE">Open Source</div> -->
		</div>
		<div class="projects">
			<ProjectCard 
				v-for="(project, index) in filteredData()"
				:key="index"
				:index="index"
				:project="project"
				class="project-item"
			/>
		</div>
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
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px; 
	padding: 20px;
}

.filter-button {
	background-color: #2d3748; /* Dark background */
	color: white;
	font-size: 1.2rem;
	padding: 10px 20px;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.filter-button:active {
	background-color: #4a5568; /* Darker background on click */
}

.projects {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 50px; 
	padding: 40px;
}

.project-item {
	height: 90%;
}
</style>