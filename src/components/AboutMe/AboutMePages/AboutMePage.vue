<script setup lang="ts">
	import data from "@/data/about_me.json";
</script>

<template>
	<div class="about-me-page">
		<h2 class="title">
			{{ data.title }}
		</h2>
		<span class="separator"></span>
		<p class="description">
			{{ data.description.join(" ") }}
		</p>
		<div class="others">
			<div class="hobbies">
				<h3>Hobbies</h3>
				<ul>
					<li v-for="(hobby, hIndex) in data.hobbies" :key="`hobby-${hIndex}`">{{ hobby }}</li>
				</ul>
			</div>
			<div class="skills">
				<h3>Soft Skills</h3>
				<ul>
					<li v-for="(skill, sIndex) in data.soft_skills" :key="`skill-${sIndex}`">{{ skill }}</li>
				</ul>
			</div>
			<div class="languages">
				<h3>Languages</h3>
				<ul>
					<li v-for="(language, sIndex) in data.languages" :key="`language-${sIndex}`">{{ language.name + ": " + language.level }}</li>
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
	justify-content: center;
	align-items: center;
	background-color: #f2c53d;
}
.title {
	width: 100%;
	font-size: 4.5rem;
	color: black;
	font-weight: 800;
	text-align: center;
}
.separator {
	flex-shrink: 0;
	width: 90%;
	height: 8px;
	border-radius: 4px;
	background-color: #fff;
	margin-top: 40px;
	margin-bottom: 40px;
}
.description {
	flex-shrink: 0;
	padding: 1%;
	width: 100%;
	font-size: 1.8rem;
	color: black;
	text-align: justify;
}
.others {
	width: 100%;
	padding: 3% 5% 0 5%;
	display: flex;
	justify-content: space-between;
	gap: 5%;
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

</style>