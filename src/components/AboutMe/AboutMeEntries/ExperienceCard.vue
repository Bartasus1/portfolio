<script setup lang="ts">
import { computed } from 'vue';

interface Company {
	name: string;
	link: string;
}

interface Technology {
	name: string;
	icon: string;
}

interface Job {
	title: string;
	company: Company;
	location: string;
	start_date: string;
	end_date: string;
	technologies: Technology[];
	responsibilities: string[];
}

defineProps<{
	index: number;
	job: Job;
}>();
</script>

<template>
	<div class="job-card">
		<h3 class="job-title">
			{{ job.title }} at 
			<a :href="job.company.link" target="_blank" rel="noopener noreferrer" class="external-link">{{job.company.name}}</a>
		</h3>
		<p class="job-details">
			{{ job.location }}  
			<span class="details-divider"> | </span>  
			{{ job.start_date }} - {{ job.end_date }}
		</p>
			<ul class="tech-list">
				<li v-for="(tech, techIndex) in job.technologies" :key="`job-tech-${index}-${techIndex}`">
					<img v-if="tech.icon" :src="tech.icon" class="tech-icon" />
					{{ tech.name }}
				</li>
			</ul>
			<div class="responsibilities">
				<ul>
					<li v-for="(resp, respIndex) in job.responsibilities" :key="`job-resp-${index}-${respIndex}`">
						{{ resp }}
					</li>
				</ul>
			</div>
	</div>
</template>



<style scoped>
.job-card {
	width: 80%;
	background-color:#1a202c;
	color: #e0e0e0;
	/* opacity: 0.9; */
	padding: 1.2rem;
	padding-left: 1.5rem;
	border-radius: 16px;
}

.job-title {
	margin-top: 0;
	color: white; /* Accent color for titles */

	a {
		color: #f2c53d; /* Accent color for links */
	}
}

.job-details {
	font-size: 0.9em;

	margin-bottom: 0.5rem;
}


ul {
	list-style-type: disc;
	padding-left: 20px;
}
li {
	margin-bottom: 0.5rem;
}

.tech-list {
	list-style-type: none;
	padding-left: 0;
	margin: 12px 0 10px 0;
}
.tech-list li {
	display: inline-flex; /* Align icon and text */
	align-items: center; /* Vertically center icon and text */
	background-color: rgba(255, 255, 255, 0.3);
	padding: 0.3rem 0.6rem;
	border-radius: 4px;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 0.9em;
}

.tech-icon {
	width: 18px;
	height: 18px;
	margin-right: 8px; /* Increased margin for better spacing */
	vertical-align: middle; /* Better alignment with text */
}

.details-divider {
	color: #e0e0e0;
	font-weight: bold;
	margin: 0 5px; /* Added margin for spacing */
}
</style>