<template>
	<div class="homepage">
		<div class="headerContainer">
			<div class="welcome">
				<h1 class="myName">Bartłomiej Banaś</h1>
				<span class="separator"></span>
				<h2 class="myProfession">Gameplay & UI Programmer</h2>
			</div>
		</div>
		<div class="welcomeImage"></div>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.homepage {
	display: flex;
	flex-direction: row;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.welcomeImage {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	width: 60%;
	background: url(@/assets/profile_picture.jpg);
	background-size: 100%;
	background-repeat: no-repeat;
	z-index: -1;
}
.headerContainer {
	width: 40%;
	height: 100%;
	padding: 1%;
	overflow: hidden;
	background-color: #f2c53dff;
}

.welcome {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	height: auto;
	position: relative;
	top: 50%;
}

.myName {
	font-size: 7rem;
	color: white;
	font-weight: 1000;
}
.separator {
	width: 90%;
	height: 8px;
	border-radius: 4px;
	background-color: #fff;
	/* margin-top: 10px; */
	margin-bottom: 20px;
}
.myProfession {
	font-size: 4rem;
	color: #1a202c;
	font-weight: 600;
	line-height: 6rem;
}
</style>