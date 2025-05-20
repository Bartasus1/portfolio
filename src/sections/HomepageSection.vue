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
		padding-top: 15%;
		background-color: #f2c53dff;
		.myName {
			width: 100%;
			font-size: 7rem;
			color: white;
			font-weight: 1000;
		}
		.separator {
			width: 90%;
			height: 8px;
			border-radius: 4px;
			background-color: #fff;
			margin-bottom: 20px;
		}
		.myProfession {
			width: 100%;
			font-size: 4rem;
			color: #1a202c;
			font-weight: 600;
			line-height: 6rem;
		}
	}
}

@media screen and (max-width: 1024px) {
	.welcomeImage {
		left: 0 !important;
		background-position: center;
	}
	
	.headerContainer {
		flex-direction: column;
		height: 100vh;
		
		.welcome {
			width: 100%;
			height: 50%;
			padding: 2rem;
			padding-top: 5%;
			align-items: center;
			text-align: center;
			
			.myName {
				font-size: 4rem;
			}
			
			.separator {
				width: 60%;
			}
			
			.myProfession {
				font-size: 2.5rem;
				line-height: 3rem;
			}
		}
	}
}
</style>