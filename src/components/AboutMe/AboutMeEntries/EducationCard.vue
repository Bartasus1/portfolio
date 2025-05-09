<script setup lang="ts">

	interface Institution {
		name: string;
		link: string;
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
		<h3 class="edu-title">
			{{ edu.degree }} at 
			<a :href="edu.institution.link" target="_blank" rel="noopener noreferrer" class="external-link"> {{ edu.institution.name }}</a>
		</h3>
		<p class="edu-details">{{ edu.start_date }} - {{ edu.end_date }}</p>
		<template v-if="edu.skills && edu.skills.length">
			<h4>Skills:</h4>
			<ul>
				<li v-for="(skill, skillIndex) in edu.skills" :key="`edu-skill-${index}-${skillIndex}`">{{ skill }}</li>
			</ul>
		</template>
	</div>
</template>



<style scoped>
.edu-card {
	width: 100%;
	background-color: rgba(0,0,0,0.1);
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 8px;
}

.edu-title {
	margin-top: 0;
	color: black; /* Accent color for titles */
}

.edu-details {
	font-size: 0.9em;
	color: #e0e0e0;
	margin-bottom: 0.5rem;
}


ul {
	list-style-type: disc;
	padding-left: 20px;
}
li {
	margin-bottom: 0.5rem;
}

</style>