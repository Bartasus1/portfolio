<script setup lang="ts">
	import data from "@/data/experience.json";
	import JobExperienceCard from '@/components/AboutMe/AboutMeEntries/JobExperienceCard.vue';
</script>

<template>
	<div class="experience">
		<h2 class="title">
			Experience
		</h2>
		<div class="jobs">
			<JobExperienceCard
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
	align-items: center;
	width: 100%;
	height: 100%;
	margin-top: 5%;
}
</style>