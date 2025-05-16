<script setup lang="ts">
	import socials from '@/data/socials.json';
	import router from '@/router';

</script>

<template>
	<nav class="navbar">
		<div class="sections">
			<div v-for="(route, index) in router.getRoutes()" :key="index">
				<a :href="`/${route.path}`"> {{ route.name }}</a>
			</div>
		</div>
		<div class="socials">
			<a v-for="(social, index) in socials" :key="index" :href="social.link" target="_blank" rel="noopener noreferrer">
				<img :src="social.icon" :alt="social.name" class="social-icon" />
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
	width: 38%;
	height: 64px;
	padding: 0 2%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #1a202c;
	backdrop-filter: blur(6px);
	z-index: 1000;
	border-radius: 16px;
}

.sections {
	display: flex;
	gap: 3rem;
}

a {
	text-decoration: none;
	color: #f2c53dff;
	font-size: 1.2rem;
	font-weight: 500;
	letter-spacing: 1px;
}

.socials {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-right: 5%;
}

.social-icon {
	width: 28px;
	height: 28px;
	/* https://isotropic.co/tool/hex-color-to-css-filter/  =>  #f2c53d */
	filter: invert(92%) sepia(53%) saturate(5944%) hue-rotate(322deg) brightness(96%) contrast(98%);
	border-radius: 50%;
}

/* .social-icon:hover {
	transform: scale(1.12) rotate(-6deg);
	filter: grayscale(0%) brightness(1.1) drop-shadow(0 2px 8px #0002);
} */
</style>