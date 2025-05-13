<script setup lang="ts">
	import data from "@/data/education.json";
	import EducationCard from '@/components/AboutMe/AboutMeEntries/EducationCard.vue';
</script>

<template>
	<div>
		<div class="education">
			<EducationCard
				v-for="(edu, index) in data"
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
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>