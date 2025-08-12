<template>
	<div>
		<h3> {{ title }}</h3>
		<ul>
			<li v-for="(element, index) in elements" :key="`element-${index}`">{{ element }}</li>
		</ul>
	</div>
</template>

<script setup lang="ts">

defineProps<{
	title: string;
	elements: string[];
}>();

</script>

<style scoped>

h3 {
	width: 100%;
	text-align: center;
}
</style>