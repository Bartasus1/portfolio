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
	background: url(/images/profile_picture.jpg);
	background-size: 100%;
	background-repeat: no-repeat;
	z-index: -1;
}
.headerContainer {
	position: relative;
	top: 50%;
	display: flex;
	justify-content: center;
	height: 100%;
	width: 40%;
	padding: 1%;
	padding-right: 2%;
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

@media screen and (max-width: 1024px) {
	.homepage {
		display: flex;
		flex-direction: column !important;
		justify-content: flex-end;
	}
	.welcomeImage {
		width: 100%;
		background-size: 140% 60%;
		background-position: top;
	}

	.headerContainer {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 40vh;
		width: 100%;
		top: 0;
		padding: 1rem;
	}
	.welcome {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-top: 5%;
		.myName {
			font-size: 3rem;
		}

		.separator {
			width: 90%;
		}

		.myProfession {
			font-size: 2rem;
			line-height: 3rem;
		}
	}
}
</style>
