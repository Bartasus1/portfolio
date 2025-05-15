<script setup lang="ts">

	interface Institution {
		name: string;
		link: string;
		logo: string;
	}

	interface Education {
		degree: string;
		institution: Institution;
		start_date: string;
		end_date: string;
		skills?: string[];
	}

	defineProps<{
		index: number;
		edu: Education;
	}>();
</script>


<template>
	<div class="edu-card">
		<div class="institution">
			<img :src="edu.institution.logo" :alt="edu.institution.name" class="institution-logo" />
			<div class="degree">
				<h3 class="edu-title">
					{{ edu.degree }} at 
					<a :href="edu.institution.link" target="_blank" rel="noopener noreferrer" class="external-link"> {{ edu.institution.name }}</a>
				</h3>
				<p class="edu-details">{{ edu.start_date }} - {{ edu.end_date }}</p>
			</div>
		</div>
		<span class="divider"></span>
		<ul>
			<li v-for="(skill, skillIndex) in edu.skills" :key="`edu-skill-${index}-${skillIndex}`">{{ skill }}</li>
		</ul>
	</div>
</template>



<style scoped>
.edu-card {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	width: 80%;
	background-color: #1a202c;
	color: #e0e0e0;
	padding: 1.5rem;
	border-radius: 16px;
}

.institution {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem; /* Space between logo and text */
}

.institution-logo {
	width: 50px;
	height: 60px;
	object-fit: contain;
	border-radius: 50%;
}

.degree {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.edu-title {
	margin-top: 0;
	color: white; /* Accent color for titles */

	a {
		color: #f2c53d; /* Accent color for links */
	}
}

.edu-details {
	font-size: 0.9em;
}


ul {
	list-style-type: disc;
	padding-left: 20px;
	margin-top: 10px;
}
li {
	margin-bottom: 0.5rem;
}

.divider{
	display: flex;
	width: 80%;
	height: 4px;
	padding: 0 5%;
	border-radius: 4px;
	background-color: #fff;
}

</style>