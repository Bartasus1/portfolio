<script setup lang="ts">

	interface Technology {
		tech: string;
		icon: string;
		proficiency: number;
	}

	const props = defineProps<{
		tech: Technology;
	}>();

	const headerNumber = 6 - props.tech.proficiency;
</script>

<template>
	<div class="techstack-node">
		<div class="icon-wrapper">
			<img :src="tech.icon" :alt="tech.tech" class="icon" />
		</div>
		<component :is="'h' + headerNumber">
			{{ tech.tech }}
		</component>
	</div>
</template>



<style scoped>

</style>