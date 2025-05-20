<script setup lang="ts">
	import experience from "@/data/experience.json";
	import ExperienceCard from '@/components/AboutMe/AboutMeEntries/ExperienceCard.vue';
</script>

<template>
	<div class="experience">
		<div class="jobs">
			<ExperienceCard
				v-for="(job, index) in experience.jobs"
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

}

@media screen and (max-width: 1024px) {
	.jobs {
		padding: 0rem;
		gap: 15px;
		justify-content: flex-start;
		align-items: center;
		overflow-y: scroll;
	}
}
</style>