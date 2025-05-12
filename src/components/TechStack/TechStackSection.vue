<script setup lang="ts">
import JavaTile from './Tiles/JavaTile.vue';
import CSharpTile from './Tiles/CSharpTile.vue';
import CppTile from './Tiles/CppTile.vue';
import PythonTile from './Tiles/PythonTile.vue';
import Ue5Tile from './Tiles/UE5Tile.vue';
</script>

<template>
	<div class="tech-stack-section">
		<div class="grid-container">
			<java-tile class="grid-item" />
			<c-sharp-tile class="grid-item" />
			<cpp-tile class="grid-item" />
			<python-tile class="grid-item" />
			<ue5-tile class="grid-item full-width" />
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
	grid-template-columns: repeat(2, 1fr); /* Changed to 2 columns */
	grid-template-rows: auto auto auto; /* For three distinct rows of content */
	gap: 20px;
	width: 100%;
	max-width: 1200px; /* Max width for the grid */
	height: 100%;
	max-height: 800px; /* Max height for the grid */
}


.grid-item {
	background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent dark background */
	color: white;
	padding: 20px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	overflow: hidden; /* Ensures content fits */
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
