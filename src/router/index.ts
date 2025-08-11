import { createRouter, createWebHistory } from 'vue-router'
import HomepageSection from '@/sections/HomepageSection.vue';
import AboutMeSection from '@/sections/AboutMeSection.vue';
import TechStackSection from '@/sections/TechStackSection.vue';
import ProjectsSection from '@/sections/ProjectsSection.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Homepage',
			component: HomepageSection
		},
		{
			path: '/about',
			name: 'AboutMe',
			component: AboutMeSection
		},
		{
			path: '/techstack',
			name: 'TechStack',
			component: TechStackSection
		},
		{
			path: '/projects',
			name: 'Projects',
			component: ProjectsSection
		}
	]
})

export const getSections = () => {
	return router.getRoutes()
		.filter(r => r.components && r.components.default)
		.map(route => ({
			component: route.components?.default,
			name: route.name,
			path: route.path
		}))
}

export default router
