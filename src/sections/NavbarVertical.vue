<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { RouteRecordNormalized } from 'vue-router';
import socials from '@/data/socials.json';
import router from '@/router';

console.log('[Debug] NavbarVertical.vue script setup executed');

interface Section {
  name: string | symbol | undefined | null;
  path: string;
}

const props = defineProps<{
  sections: Section[];
  currentSectionIndex: number;
}>();

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
const currentSectionName = computed(() => {
	const currentRoute = router.currentRoute.value;
	return currentRoute.name;
});
</script>

<template>
  <div class="mobile-nav">
    <button class="hamburger" @click="toggleMenu" :class="{ 'is-active': isOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <nav class="navbar-vertical" :class="{ 'is-open': isOpen }">
      <ul class="nav-links">
				<li v-for="(route, index) in router.getRoutes()" :class="{ active: route.name === currentSectionName }">
					<RouterLink :key="index" :to="{ name: route.name }" @click="toggleMenu()">
						{{ String(route.name) }}
					</RouterLink>
				</li>
      </ul>
      
      <div class="socials">
        <a v-for="(social, index) in socials" :key="index" :href="social.link" target="_blank" rel="noopener noreferrer" class="social-icon">
          <img :src="social.icon" :alt="social.name" />
        </a>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .mobile-nav {
    display: block;
  }
}

.hamburger {
  position: fixed;
  top: 2.5%;
  left: 1%;
  z-index: 1001;
  background: #1a202c;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s ease;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #f2c53dff;
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.navbar-vertical {
  position: fixed;
  left: -100%;
  top: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #1a202c;
  padding: 80px 20px 20px;
  z-index: 1000;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.navbar-vertical.is-open {
  left: 0;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-links li a {
  text-decoration: none;
  color: #f2c53dff;
  font-size: 1.2rem;
  display: block;
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links li.active a {
  background-color: #f2c53dff;
  color: #1a202c;
  font-weight: bold;
}

.nav-links li a:hover {
  background-color: #2d3748;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 20px 0;
  border-top: 1px solid rgba(242, 197, 61, 0.2);
}

.social-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.social-icon img {
  width: 100%;
  height: 100%;
  filter: invert(92%) sepia(53%) saturate(5944%) hue-rotate(322deg) brightness(96%) contrast(98%);
}
</style>
