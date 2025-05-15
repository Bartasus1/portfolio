<script setup lang="ts">
	import data from "@/data/experience.json";
	import ExperienceCard from '@/components/AboutMe/AboutMeEntries/ExperienceCard.vue';
</script>

<template>
	<div class="experience">
		<div class="jobs">
			<ExperienceCard
				v-for="(job, index) in data.jobs"
				:key="`job-${index}`"
				:index=index
				:job="job"
			/>
		</div>
	</div>
</template>

<style scoped>
.jobs {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
	width: 100%;
	height: 100%;
	overflow: scroll;
}
</style>