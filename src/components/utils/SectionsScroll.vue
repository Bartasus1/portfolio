<template>
	<div ref="scrollContainer" class="sections-scroll">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initScroll, wheelScroll, mobile } from './sections_scroll';

const scrollContainer = ref<HTMLElement>();

onMounted(() => {
	if(scrollContainer.value) {
		initScroll(scrollContainer.value);
		window.addEventListener('wheel', wheelScroll, { passive: false });
		window.addEventListener('touchstart', mobile.handleTouchStart);
		window.addEventListener('touchmove', mobile.handleTouchMove, { passive: false });
		window.addEventListener('touchend', mobile.handleTouchEnd);
	}
});
</script>

<style scoped>
.sections-scroll {
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
}
</style>
