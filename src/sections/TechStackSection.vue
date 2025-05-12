<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watch } from 'vue';
	import TechstackNode from '@/components/TechStack/TechstackNode.vue';
	import data from '@/data/techstack.json';
	import { forceSimulation, forceCollide, type SimulationNodeDatum, type Simulation } from 'd3-force';

	interface TechData {
		tech: string;
		icon: string;
		proficiency: number;
	}

	interface D3Node extends TechData, SimulationNodeDatum {
		radius: number;
		x?: number;
		y?: number;
		vx?: number;
		vy?: number;
	}

	const sortedData: TechData[] = data.sort((a, b) => b.proficiency - a.proficiency);

	// --- Refs for state management ---
	const containerRef = ref<HTMLElement | null>(null);
	const isVisible = ref(false); // Track viewport visibility
	const spawnedNodes = ref<D3Node[]>([]); // Nodes currently on screen
	const bubblePositions = ref<Array<{ x: number; y: number }>>([]); // Positions for template binding
	const allSpawned = ref(false); // Flag: all bubbles appeared?
	const isAttracting = ref(false); // Flag: central force active?
	const targetBlackHoleStrength = ref(0.2); // Final strength, as suggested
	const currentBlackHoleStrength = ref(0); // Dynamic strength

	// --- Refs for simulation and dimensions ---
	let simulation: Simulation<D3Node, undefined> | null = null;
	let centerX: number = 0;
	let centerY: number = 0;
	let containerWidth: number = 0;
	let containerHeight: number = 0;
	let observer: IntersectionObserver | null = null;
	let rafId: number | null = null; // For animation frame cleanup

	// --- Constants ---
	const spawnInterval = 50; // ms between each bubble spawn
	const attractionDelay = 500; // ms pause before attraction starts
	const forceIncreaseDuration = 2000; // ms to reach full black hole strength

	// --- Functions ---
	const calculateBubbleDiameter = (proficiency: number): number => {
		return 60 + (proficiency - 1) * 25; // Increased base size and scaling
	};

	// Custom force for gravitational pull towards center
	function blackHoleForce(alpha: number) {
		// Only apply force if attraction phase has started
		if (!simulation || !isAttracting.value) return;
		
		const nodes = spawnedNodes.value;
		for (const node of nodes) {
			if (node.x !== undefined && node.y !== undefined) {
				const dx = centerX - node.x; // Vector towards center X
				const dy = centerY - node.y; // Vector towards center Y
				
				// Use the *current* dynamic strength
				node.vx = (node.vx ?? 0) + dx * currentBlackHoleStrength.value * alpha;
				node.vy = (node.vy ?? 0) + dy * currentBlackHoleStrength.value * alpha;
			}
		}
	}

	// Function to gradually increase black hole strength
	function startForceIncrease() {
		let startTime: number | null = null;

		function step(timestamp: number) {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / forceIncreaseDuration, 1);
			currentBlackHoleStrength.value = progress * targetBlackHoleStrength.value;

			if (progress < 1) {
				rafId = requestAnimationFrame(step);
			} else {
				rafId = null; // Animation finished
			}
		}
		if (rafId) cancelAnimationFrame(rafId); // Cancel previous frame if any
		rafId = requestAnimationFrame(step);
	}

	// Function to start the attraction phase after a delay
	function triggerAttractionPhase() {
		setTimeout(() => {
			if (!isVisible.value) return; // Don't start if scrolled out of view
			console.log("Starting attraction phase...");
			isAttracting.value = true;
			if (simulation) {
				simulation.alpha(0.3).restart(); // Reheat the simulation
			}
			startForceIncrease();
		}, attractionDelay);
	}

	// Function to spawn bubbles one by one
	function startSpawning() {
		if (!containerRef.value || spawnedNodes.value.length > 0) return; // Only run once
		console.log("Starting spawning...");

		let spawnIndex = 0;

		function spawnNext() {
			if (!isVisible.value) return; // Stop if scrolled out of view
			
			if (spawnIndex >= sortedData.length) {
				console.log("All bubbles spawned.");
				allSpawned.value = true;
				triggerAttractionPhase();
				return;
			}
			
			const tech = sortedData[spawnIndex];
			const radius = calculateBubbleDiameter(tech.proficiency) / 2;

			// Calculate spawn position based on radius (bigger = closer to center)
			// Assuming max proficiency leads to max radius calculated by the function.
			// Let's find the max proficiency to calculate max radius, or use a fixed reasonable max.
			// Max proficiency = 5 => Max Diameter = 60 + (5 - 1) * 25 = 160 => Max Radius = 80.
			const maxPossibleRadius = 80; // Calculated based on max proficiency = 5
			const spawnDistanceOffset = 50; // Randomness added to distance
			const distance = Math.max(0, maxPossibleRadius - radius) + Math.random() * spawnDistanceOffset; // Ensure distance >= 0
			const angle = Math.random() * 2 * Math.PI; // Random angle

			const spawnX = centerX + Math.cos(angle) * distance;
			const spawnY = centerY + Math.sin(angle) * distance;

			const newNode: D3Node = {
				...tech,
				radius: radius,
				x: spawnX,
				y: spawnY,
				vx: 0,
				vy: 0,
			};

			spawnedNodes.value.push(newNode);
			simulation?.nodes(spawnedNodes.value); // Update simulation nodes
			simulation?.alpha(0.1).restart(); // Give simulation a small nudge

			spawnIndex++;
			setTimeout(spawnNext, spawnInterval);
		}

		// Initialize simulation if not already done
		if (!simulation) {
			simulation = forceSimulation(spawnedNodes.value) // Start with current nodes
				.force('blackHole', blackHoleForce) // Will only act when isAttracting=true
				.force('collide', forceCollide<D3Node>().radius((d: D3Node) => d.radius + 2).iterations(2))
				.on('tick', () => {
					// NaN Check (simplified)
					let hasNaN = false;
					spawnedNodes.value.forEach(node => {
						if (isNaN(node.x ?? NaN) || isNaN(node.y ?? NaN)) {
							hasNaN = true;
							node.x = centerX; node.y = centerY; node.vx = 0; node.vy = 0;
						}
					});
					if (hasNaN) console.warn("NaN detected, resetting node.");

					// Update positions for Vue template
					bubblePositions.value = spawnedNodes.value.map(node => ({
						x: (node.x ?? centerX) - node.radius,
						y: (node.y ?? centerY) - node.radius
					}));
				});
		}

		spawnNext(); // Start the spawning chain
	}


	// --- Lifecycle Hooks ---
	onMounted(() => {
		const containerElement = containerRef.value;
		if (!containerElement) return;

		// Setup Intersection Observer
		observer = new IntersectionObserver(
			([entry]) => {
				isVisible.value = entry.isIntersecting;
				if (entry.isIntersecting) {
					console.log("Component became visible.");
					// Get dimensions and start spawning *only if dimensions are valid*
					requestAnimationFrame(() => { // Ensure layout is calculated
						if (!containerRef.value) return;
						containerWidth = containerElement.offsetWidth;
						containerHeight = containerElement.offsetHeight;
						centerX = containerWidth / 2;
						centerY = containerHeight / 2;
						
						if (containerWidth > 0 && containerHeight > 0) {
							startSpawning();
						} else {
							console.warn("Container dimensions not ready on visibility.");
							// Consider adding a resize listener or retry mechanism if needed
						}
					});
				} else {
					console.log("Component scrolled out of view.");
					// Optional: Stop simulation or reset state if needed when not visible
					// simulation?.stop(); 
					// if (rafId) cancelAnimationFrame(rafId);
					// spawnedNodes.value = []; // Reset if you want them to respawn on re-entry
					// isAttracting.value = false;
					// allSpawned.value = false;
					// currentBlackHoleStrength.value = 0;
				}
			},
			{ threshold: 0.1 } // Trigger when 10% is visible
		);
		observer.observe(containerElement);
	});

	onUnmounted(() => {
		simulation?.stop();
		if (observer && containerRef.value) {
			observer.unobserve(containerRef.value);
		}
		if (rafId) {
			cancelAnimationFrame(rafId); // Cleanup animation frame
		}
		observer = null;
		simulation = null;
	});

</script>

<template>
	<div class="tech-stack-section">
		<div class="bubbles-container" ref="containerRef">
			<!-- Iterate over spawnedNodes -->
			<TechstackNode 
				v-for="(node, index) in spawnedNodes" 
				:key="node.tech" 
				:tech="node" 
				:x="bubblePositions[index]?.x ?? centerX - node.radius" 
				:y="bubblePositions[index]?.y ?? centerY - node.radius" 
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
	overflow: hidden; /* Hide parts of bubbles that might go outside */
}

.bubbles-container {
	position: relative; /* Needed for absolute positioning of children */
	width: 90%; /* Adjust size as needed */
	height: 90%; /* Adjust size as needed */
	max-width: 1000px; /* Keep max width */
	max-height: 800px; /* Add max height */
	border-radius: 10px; /* Optional: visual cue for container */
	/* Remove flex/grid styles if any were inherited */
}

/* Adjust media query */
@media (max-width: 768px) {
	.bubbles-container {
		width: 95%;
		height: 95%;
	}
}
</style>
