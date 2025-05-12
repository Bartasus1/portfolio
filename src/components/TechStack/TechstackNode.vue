<script setup lang="ts">
	import { computed } from 'vue'; // Import computed for dynamic styles

	interface TechNodeData { // Changed from Technology
		tech: string;
		icon: string;
		proficiency: number; // Assuming 1-5 scale
		radius: number; // Added radius from D3Node
	}

	const props = defineProps<{
		tech: TechNodeData; // Using updated interface
		x: number; // Add x position prop
		y: number; // Add y position prop
	}>();

	// Calculate size based on the radius passed from D3 simulation
	const bubbleSize = computed(() => props.tech.radius * 2); // Diameter is 2 * radius

	const bubbleStyle = computed(() => ({
		width: `${bubbleSize.value}px`,
		height: `${bubbleSize.value}px`,
		left: `${props.x}px`, // Use x prop for left positioning
		top: `${props.y}px`,  // Use y prop for top positioning
	}));

</script>

<template>
	<div class="techstack-bubble" :style="bubbleStyle" :title="tech.tech">
		<img :src="tech.icon" :alt="tech.tech" class="icon" />
	</div>
</template>



<style scoped>
.techstack-bubble {
	position: absolute; /* Added for parent-controlled layout */
	border-radius: 50%;
	background-color: #eee; /* Placeholder background */
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px; /* Add some margin for spacing */
	overflow: hidden;
	box-shadow: 0 2px 5px rgba(0,0,0,0.2);
	transition: transform 0.2s ease-in-out;
}

.techstack-bubble:hover {
	transform: scale(1.1); /* Grow on hover */
}

.icon {
	max-width: 75%; /* Limit icon size - increased from 60% */
	max-height: 75%; /* Limit icon size - increased from 60% */
	display: block;
	object-fit: contain;
}
</style>