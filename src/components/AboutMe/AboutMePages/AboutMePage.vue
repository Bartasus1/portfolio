<script setup lang="ts">
	import aboutme from "@/data/about_me.json";
</script>

<template>
	<div class="about-me-page">
		<h2 class="title">
			{{ aboutme.title }}
		</h2>
		<span class="separator"></span>
		<p class="description">
			{{ aboutme.description.join(" ") }}
		</p>
		<div class="others">
			<div class="hobbies">
				<h3>Hobbies</h3>
				<ul>
					<li v-for="(hobby, hIndex) in aboutme.hobbies" :key="`hobby-${hIndex}`">{{ hobby }}</li>
				</ul>
			</div>
			<div class="skills">
				<h3>Soft Skills</h3>
				<ul>
					<li v-for="(skill, sIndex) in aboutme.soft_skills" :key="`skill-${sIndex}`">{{ skill }}</li>
				</ul>
			</div>
			<div class="languages">
				<h3>Languages</h3>
				<ul>
					<li v-for="(language, sIndex) in aboutme.languages" :key="`language-${sIndex}`">{{ language.name + ": " + language.level }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>



<style  scoped>
.about-me-page {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow-y: auto;
	padding: 1rem;
	box-sizing: border-box;
	overflow-y: scroll;
}
.title {
	width: 100%;
	font-size: clamp(2rem, 2.8vw, 4rem);
	color: black;
	font-weight: 800;
	text-align: center;
	margin: 0;
}
.separator {
	flex-shrink: 0;
	width: 90%;
	height: 8px;
	border-radius: 4px;
	background-color: #fff;
	margin: 20px 0;
}
.description {
	flex-shrink: 0;
	width: 100%;
	font-size: clamp(1.2rem, 1.6vw, 1.8rem);
	color: black;
	text-align: justify;
	margin: 0;
	padding: 2rem;
}
.others {
	width: 100%;
	padding: 3% 5% 0 5%;
	display: flex;
	justify-content: space-between;
	gap: 5%;
	box-sizing: border-box;
}

.hobbies, .skills, .languages {
	width: auto;
	max-width: 33%;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: black;
	font-size: 1.2rem;
}

h3 {
	font-weight: 500 !important;
}
ul {
	font-weight: normal;
	text-wrap: balance;
}

@media screen and (max-width: 1400px) {

	.description {
		font-size: clamp(1.2rem, 2vw, 1.4rem);
		padding: 10px 2rem;
	}

	.others {
		flex-direction: column;
		gap: 1rem;
		padding: 0.5rem;
		margin-top: 0.5rem;
	}

	.hobbies, .skills, .languages {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		width: 100%;
		font-size: clamp(1rem, 1.6vw, 1.3rem);
		margin: 0;
	}

	ul {
		width: 100%;
	}


	h3 {
		text-align: left;
		font-size: 1.4rem;
		width: 90%;
	}
}

@media screen and (max-width: 1024px) {
	.about-me-page {
		align-items: center !important;
		justify-content: flex-start !important;
	}

	.title {
		font-size: 2rem;
		margin-top: 0.5rem;
	}

	.separator {
		margin: 10px 0;
	}

	.description {
		font-size: clamp(1.1rem, 3vw, 1.2rem);
		padding: 10px 2rem;
	}


}
</style>