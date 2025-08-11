<template>
		<div ref="scrollContainer" class="scroll-container"
			@mouseenter="onHover(true)"
			@mouseleave="onHover(false)"
		>
			<slot />
		</div>
</template>

<script setup>
import { ref } from 'vue';
import { preventScroll } from './sections_scroll';

const scrollContainer = ref(null);

const onHover = (enable) => {
	preventScroll.value = enable;
  if(enable) {
		window.addEventListener('wheel', onWheel, { passive: false });
	} else {
		window.removeEventListener('wheel', onWheel);
	}
};

const onWheel = (event) => {
  if (scrollContainer.value) {
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