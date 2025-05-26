<template>
	<div class="homepage">
		<div class="headerContainer">
			<div class="welcome">
				<h1 class="myName">Bartłomiej Banaś</h1>
				<span class="separator"></span>
				<h2 class="myProfession">Gameplay & UI Programmer</h2>
			</div>
		</div>
		<img src="/images/profile_picture.jpg" class="welcomeImage">
	</div>
</template>

<script setup lang="ts"></script>

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
	z-index: -1;
	background-color: #1a202c;
	object-fit: cover;
}
.headerContainer {
	display: flex;
	align-items: flex-end;
	height: 100%;
	width: 40%;
	padding: 1%;
	padding-right: 2%;
	padding-bottom: 10%;
	overflow: hidden;
	background-color: #f2c53dff;
}

.welcome {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: auto;
}

.myName {
	font-size: clamp(2.5rem, 4vw, 7rem);
	color: white;
	font-weight: 1000;
}
.separator {
	width: 90%;
	height: 8px;
	border-radius: 4px;
	background-color: #fff;
	/* margin-top: 10px; */
	margin-bottom: clamp(0, 20px, 20px);
	flex-shrink: 0;
}
.myProfession {
	font-size: clamp(1.5rem, 2.5vw, 4rem);
	color: #1a202c;
	font-weight: 600;
	line-height: clamp(3.5rem, 6vw, 6rem);
}



@media screen and (max-width: 1024px) {
	.homepage {
		display: flex;
		flex-direction: column !important;
		justify-content: flex-end;
	}

	.welcomeImage {
		position: fixed;
		top: 0;
		right: 0;
		height: 60%;
		width: 100%;
		z-index: -1;
	}

	.headerContainer {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 40vh;
		width: 100%;
		top: 0;
		padding: 1rem;
		padding-bottom: 15%;
	}
	.welcome {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-top: 0;
	}
	
	.separator {
		width: 90%;

	}
}

@media screen and (max-width: 400px) {

	.separator {
		height: 4px;
	}
}
</style>
