<script setup lang="ts">
	import data from "@/data/education.json";
	import EducationCard from '@/components/AboutMe/AboutMeEntries/EducationCard.vue';
</script>

<template>
	<div>
		<div class="education">
			<EducationCard
				v-for="(edu, index) in data.sort((a, b) => a.start_date < b.start_date ? 1 : -1)"
				:key="`edu-${index}`"
				:index=index
				:edu="edu"
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
	overflow: scroll;
}
</style>