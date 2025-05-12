<script setup lang="ts">
	import ProjectCard from '@/components/Projects/ProjectCard.vue';
	import data from '@/data/projects.json';
</script>
<template>
	<div class="projects-section">
		<ProjectCard 
			v-for="(project, index) in data"
			:key="index"
			:index="index"
			:project="project"
			class="project-item"
		/>
	</div>
</template>


<style scoped>
.projects-section {
	width: 100vw;
	height: 100vh;
	display: flex;
	gap: 50px; 
	justify-content: center;
	align-items: center;
	background-color: #1a202c; /* Dark background, adjust as needed */
	padding: 20px;
	box-sizing: border-box;
}
</style>