<script setup lang="ts">
	import TechstackNode from '@/components/TechStack/TechstackNode.vue';
	import data from '@/data/techstack.json';

</script>

<template>
	<div class="tech-stack-section">
		<div class="grid-container">
			<TechstackNode 
				v-for="(tech, index) in data.sort((a, b) => b.proficiency - a.proficiency)"
				:key="index"
				:index="index"
				:tech="tech"
				class="grid-item"
			/>
		</div>
	</div>
</template>

<style scoped>
.tech-stack-section {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #1a202c; /* Dark background, adjust as needed */
	padding: 20px;
	box-sizing: border-box;
}

.grid-container {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(4, 1fr); 
	gap: 15px;
	width: 100%;
	height: 100%;
}


.grid-item {
	background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent dark background */
	color: white;
	padding: 20px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.grid-item.full-width {
	grid-column: 1 / -1; /* Span across all columns */
	min-height: 200px; /* Ensure the full-width bottom tile is taller */
}

/* Responsive adjustments */
@media (max-width: 900px) {
	.grid-container {
		grid-template-columns: repeat(2, 1fr); /* Base layout is already 2 columns, so this is fine */
		/* grid-template-rows will adapt, or can be explicitly set if needed */
	}
	/* Removed old specific nth-child overrides for 900px as they are no longer suitable */
}

@media (max-width: 600px) {
	.grid-container {
		grid-template-columns: 1fr; /* Single column */
		max-height: none; /* Allow content to determine height */
		height: auto;
		grid-template-rows: auto; /* Reset to implicit rows, will be overridden by specific item placements below */
	}

	/* Override base placements for single column layout */
	.grid-container > :nth-child(1) { grid-column: 1 / -1; grid-row: 1; }
	.grid-container > :nth-child(2) { grid-column: 1 / -1; grid-row: 2; }
	.grid-container > :nth-child(3) { grid-column: 1 / -1; grid-row: 3; }
	.grid-container > :nth-child(4) { grid-column: 1 / -1; grid-row: 4; }
	.grid-container > :nth-child(5) { grid-column: 1 / -1; grid-row: 5; }

	.grid-item,
	.grid-item.full-width {
		grid-column: 1 / -1 !important; /* Ensure all items take full width, overriding more specific col assignments if any */
	}
	.tech-stack-section {
		height: auto; /* Adjust height for scrolling if content overflows */
		padding: 10px;
	}
}
</style>
