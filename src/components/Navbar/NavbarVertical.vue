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
	width: 8%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5% 10px;
	background: #1a202c;
	backdrop-filter: blur(6px);
	z-index: 1000;
	box-shadow: 16px 0 16px 0 rgba(18, 17, 22, 0.5);
}

.sections {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	gap: 7rem;
	flex: 3;

	margin-top: 10vh;
	margin-bottom: 100px;

	a {
		text-decoration: none;
		color: #f2c53dff;
		font-size: clamp(1rem, 1vw, 1.2rem);
		font-weight: 500;
		letter-spacing: 1px;
	}
}

.socials {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: flex-end;
	width: 80%;
	flex: 1;
	color: #f2c53dff;
	padding-bottom: 2%;
	padding-top: 10px;
	border-top: 1px solid rgba(242, 197, 61, 0.2);
}

.social-icon {
	width: 28px;
	height: 28px;
	border-radius: 50%;

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