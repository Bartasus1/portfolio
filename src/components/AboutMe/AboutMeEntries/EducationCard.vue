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
		education: Education;
	}>();
</script>


<template>
	<div class="education-card">
		<div class="institution">
			<img :src="education.institution.logo" :alt="education.institution.name" class="institution-logo" />
			<div class="degree">
				<h3 class="education-title">
					{{ education.degree }} at 
					<a :href="education.institution.link" target="_blank" rel="noopener noreferrer" class="external-link"> {{ education.institution.name }}</a>
				</h3>
				<p class="education-details">{{ education.start_date }} - {{ education.end_date }}</p>
			</div>
		</div>
		<span class="divider"></span>
		<ul>
			<li v-for="(skill, skillIndex) in education.skills" :key="`education-skill-${index}-${skillIndex}`">{{ skill }}</li>
		</ul>
	</div>
</template>



<style scoped>
.education-card {
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

.education-title {
	text-wrap: balance;
	margin-top: 0;
	color: white; /* Accent color for titles */

	a {
		color: #f2c53d; /* Accent color for links */
	}
}

.education-details {
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

@media screen and (max-width: 1024px) {

	.divider {
		width: 90%;
		align-self: center;
	}
	
}

</style>