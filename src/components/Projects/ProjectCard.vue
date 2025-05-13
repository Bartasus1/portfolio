<script setup lang="ts">

	interface Project {
		title:        string;
		image:        string;
		short_description: string;
		description:  string[];
		technologies: Technology[];
		links:        Link[];
	}

	interface Link {
		name: string;
		url:  string;
	}

	interface Technology {
		name: string;
		icon: string;
	}

	defineProps<{
		index: number,
		project: Project
	}>();

</script>

<template>
	<div class="project-card">
		<img :src="project.image" :alt="project.title" class="project-image" />
		<div class="info">
			<h1>
				{{ project.title }}
			</h1>
		</div>
	</div>
</template>


<style scoped>
.project-card {
	width: 20%;
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: white;
	border-radius: 16px;
	overflow: hidden;
}
.project-image {
	display: flex;
	width: 100%;
	height: 80%;
	object-fit: cover;
	filter: brightness(0.8); /* Darken the image */
}
.info {
	display: flex;
	height: 20%;
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
	color: white;

}
</style>