<template>
	
	<Transition name="navbar-switch" mode="out-in">
		<component
			:is="displayRegularNavbar ? Navbar : NavbarVertical"
			:key="displayRegularNavbar ? 'navbar' : 'navbar-vertical'"
		/>
	</Transition>
	<NavbarMobile/>

	<SectionsScroll>
		<component v-for="(section, index) in getSections()"
			:is="section.component" 
			:id="String(section.name).toLowerCase()" :key="index" 
			class="section-page " 
		/>
	</SectionsScroll>

</template>


<script setup lang="ts">
import SectionsScroll from './components/utils/SectionsScroll.vue';
import Navbar from './components/Navbar/Navbar.vue';
import NavbarVertical from './components/Navbar/NavbarVertical.vue';
import NavbarMobile from './components/Navbar/NavbarMobile.vue';

import { watch } from 'vue';
import router, { getSections} from '@/router';
import { displayRegularNavbar, scrollToSection } from './components/utils/sections_scroll';


watch(
    () => router.currentRoute.value.name,
    (newName) => {
        const sectionIndex = getSections().findIndex(section => section.name === newName);
        if (sectionIndex !== -1) {
            scrollToSection(sectionIndex);
        }
    }
);

</script>


<style scoped>

.section-page {
	display: flex;
	align-items: center; /* Changed from stretch to center for vertical alignment */
	justify-content: flex-start;
	width: 100vw;
	height: 100vh; /* Ensure this is 100vh or similar if it's a full page section */
	overflow: hidden;
}

/* Optional: Add this to the parent container if you want to enable native scroll snapping as a fallback */
:root {
	scroll-behavior: smooth;
	/* scroll-snap-type: y mandatory; */
	overflow-y: scroll;
	height: 100vh;
}

.navbar-switch-enter-active, .navbar-switch-leave-active {
	transition: transform 0.2s ease-in-out;
}

.navbar-switch-enter-from {
	transform: translateX(-100%); /* Slide in from the left*/
}

.navbar-switch-leave-to {
	transform: translateX(-100%); /* Slide out to the left */
}

</style>
