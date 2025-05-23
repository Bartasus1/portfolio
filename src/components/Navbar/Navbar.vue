<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import socials from '@/data/socials.json';
	import router from '@/router';

</script>

<template>
	<nav class="navbar">
		<nav class="sections">
			<RouterLink
				v-for="(route, index) in router.getRoutes()"
				:key="index"
				:to="{ name: route.name }"
			>
				{{ String(route.name) }}
			</RouterLink>
		</nav>
		<div class="socials">
			<a v-for="(social, index) in socials" :key="index" :href="social.link" target="_blank" rel="noopener noreferrer" class="social-icon">
				<img :src="social.icon" :alt="social.name" />
			</a>
		</div>
	</nav>
</template>

<style scoped>
.navbar {
	position: fixed;
	top: 0;
	left: 0;
	margin: 1%;
	margin-top: 2.5%;
	width: 38%;
	height: 64px;
	padding: 0 2%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background: #1a202c;
	backdrop-filter: blur(6px);
	z-index: 1000;
	border-radius: 16px;
}


.sections {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex: 3;
	height: 70%;

	a {
		text-decoration: none;
		color: #f2c53dff;
		font-size: clamp(1rem, 1vw, 1.2rem);
		font-weight: 500;
		letter-spacing: 1px;
		margin-right: auto;
	}
}

.socials {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: space-around;
	height: 70%;
	color: #f2c53dff;
}

.social-icon {
	width: 28px;
	height: 28px;
	border-radius: 50%;
	margin-left: auto;

	img {
		width: 100%;
		height: 100%;
		/* https://isotropic.co/tool/hex-color-to-css-filter/  =>  #f2c53d */
		filter: invert(92%) sepia(53%) saturate(5944%) hue-rotate(322deg) brightness(96%) contrast(98%);

	}
}


@media (max-width: 1400px) {
	.navbar {
		display: none;
	}
}

</style>