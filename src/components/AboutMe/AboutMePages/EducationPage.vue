<script setup lang="ts">
	import education from "@/data/education.json";
	import EducationCard from '@/components/AboutMe/AboutMeEntries/EducationCard.vue';
</script>

<template>
	<div>
		<div class="education">
			<EducationCard
				v-for="(education, index) in education.sort((a, b) => a.start_date < b.start_date ? 1 : -1)"
				:index=index
				:education="education"
			/>
		</div>
	</div>
</template>

<style scoped>
.education {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 40px;
	width: 100%;
	height: 100%;

}

@media screen and (max-width: 1024px) {
	.education {
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		gap: 15px;
		overflow-y: scroll;
	}
}
</style>