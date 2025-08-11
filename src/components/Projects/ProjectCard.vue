<template>
	<div class="project-card">
		<img :src="project.image" :alt="project.title" class="project-image" />
		<div class="info">
			<h1>
				{{ project.title }}
			</h1>
			<p class="description">
				{{ project.short_description }}
			</p>
		</div>
	</div>
</template>


<script setup lang="ts">
import type { Project } from './types';

defineProps<{
	project: Project
}>();

</script>

<style scoped>
.project-card {
	aspect-ratio: 6.5 / 10;
	display: flex;
	flex-shrink: 0;
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20%;
	width: 100%;
	padding: 17% 2%;
	background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
	color: white;
	overflow: hidden;
}

.info > h1 {
	text-align: center;
	/* text-wrap: nowrap; */
	font-size: clamp(1.7rem, 1vw + 1vh, 1.8rem);
}

.description {
	flex-shrink: 0;
	text-wrap: balance;
	color: #e0e0e0;
	text-align: center;
	padding: 10px;
	font-size: clamp(0.8rem, 1vw + 1vh, 1rem);
}

@media screen and (max-width: 1400px) {
	.info > h1 {
		font-size: clamp(1.35rem, 1vw + 1vh, 1.8rem);
	}

	.description { 
		font-size: clamp(0.5rem, 1vw + 1vh, 0.9rem);
	}
}

@media screen and (max-width: 500px) {
	.project-card {
		min-width: 90%;
	}

	.description { 
		font-size: clamp(1rem, 1vw + 1vh, 1.1rem);
	}
}

</style>