<template>
	<div ref="scrollContainer" class="sections-scroll">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { scrollSections, assignScrollableSections } from './sections_scroll';

const scrollContainer = ref(null);
var scrollableSections: Element[] = [];

	
const onWheel = (event: WheelEvent) => {
  if (scrollContainer.value) {
		scrollSections(event);
  }
};


onMounted(() => {
	window.addEventListener('wheel', onWheel, { passive: false });

	scrollableSections = Array.from(document.querySelectorAll('.section-page'));
	assignScrollableSections(scrollableSections);
});
</script>

<style scoped>
.sections-scroll {
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
}
</style>
