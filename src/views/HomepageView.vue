<template>
	<div class="welcomeImage"></div>
	<div class="headerContainer">
		<div class="welcome">
			<h1 class="myName">Bartłomiej Banaś</h1>
			<span class="separator"></span>
			<h2 class="myProfession">Gameplay & UI Programmer</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.welcomeImage {
	position: fixed;
	top: 0;
	left: 40% !important;
	width: 100% !important;
	height: 100%;
	background: url(@/assets/testImage.jpg);
	background-size: cover;
	background-position: 10% 0%;
	background-repeat: no-repeat;
	background-attachment: fixed;
	z-index: -1;
}
.headerContainer {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	max-height: 100vh;
	overflow: hidden;
	z-index: 10;
	.welcome {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 40%;
		height: 100%;
		padding-left: 2%;
		background-color: #f2c53dff;
		.myName {
			width: 100%;
			font-size: 6.5rem;
			color: white;
			font-weight: 800;
		}
		.separator {
			width: 90%;
			height: 8px;
			border-radius: 4px;
			background-color: #fff;
			margin-top: 40px;
			margin-bottom: 40px;
		}
		.myProfession {
			width: 100%;
			font-size: 6.5rem;
			color: #202020;
			font-weight: 600;
			line-height: 6rem;
		}
	}
}
</style>