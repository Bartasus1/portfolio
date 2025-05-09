<script setup lang="ts">
	defineProps<{
		name: string;
		description: string;
	}>()
</script>

<template>
	<div class="section">
		<div class="title">
			<h1>{{ name }}</h1>
		</div>
		<div class="separator"></div>
		<div class="description">
			<p>
				{{ description }}
			</p>
		</div>
	</div>
</template>

<style scoped>
.section {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 60%;
	color: #202020;
	cursor: pointer;
	transition: transform 0.3s ease, background-color 0.3s ease; /* Added background-color transition */
	padding: 10px 15px; /* Added padding for better click area and appearance */
	border-radius: 5px; /* Optional: for rounded corners */
	margin-bottom: 5px; /* Optional: for spacing between items */
}
.section:hover {
	transform: translateX(10px);
	background-color: rgba(255, 255, 255, 0.05); /* Subtle hover effect */
}
.section.active { 
	transform: translateX(20px); 
	background-color: rgba(255, 255, 255, 0.2); 
	font-weight: bold; 
}

.title {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.separator {
	width: 100%;
	height: 2px;
	background-color: #202020;
	margin: 5px 0;
}
.description {
	font-size: 1.4rem;
	font-style: italic; /* Added cursive font style */
}

h1 {
	font-size: 4rem;
}
	
</style>