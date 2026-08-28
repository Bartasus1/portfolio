<template>
		<div ref="scrollContainer" class="scroll-container"
			@mouseenter="onHover(true)"
			@mouseleave="onHover(false)"
		>
			<slot />
		</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { preventScroll } from './sections_scroll';

const scrollContainer = ref<HTMLElement>();

const onHover = (enable: boolean) => {
	preventScroll.value = enable;
  if(enable) {
		window.addEventListener('wheel', onWheel, { passive: false });
	} else {
		window.removeEventListener('wheel', onWheel);
	}
};

const onWheel = (event: WheelEvent) => {
  if (scrollContainer.value && event.deltaX != 0) {
    event.preventDefault();
    scrollContainer.value.scrollLeft += event.deltaY;
  }
};

</script>

<style scoped>
.scroll-container {
	overflow-x: auto;
	overflow-y: hidden;
}
</style>