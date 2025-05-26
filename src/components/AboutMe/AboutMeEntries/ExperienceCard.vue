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

const props = defineProps<{
	index: number; 
	job: Job;
}>();


const calculateDuration = computed(() => {
	let startDate: Date, endDate: Date;

	if (props.job.start_date.toLowerCase() === 'present') {
		startDate = new Date();
	} else {
		const [startMonth, startYear] = props.job.start_date.split('.').map(Number);
		startDate = new Date(startYear, startMonth - 1);
	}

	if (!props.job.end_date || props.job.end_date.toLowerCase() === 'present') {
		endDate = new Date();
	} else {
		const [endMonth, endYear] = props.job.end_date.split('.').map(Number);
		endDate = new Date(endYear, endMonth - 1);
	}

	const months =
		(endDate.getFullYear() - startDate.getFullYear()) * 12 +
		(endDate.getMonth() - startDate.getMonth());

	if (months >= 12) {
		const years = Math.floor(months / 12);
		const remMonths = months % 12;
		const yearText = `${years} ${years === 1 ? 'year' : 'years'}`;
		return remMonths > 0 ? `${yearText} ${remMonths} months` : `${yearText}`;
	}
	return `${months} months`;
});
</script>

<template>
	<div class="job-card">
		<h3 class="job-title">
			{{ job.title }} at 
			<a :href="job.company.link" target="_blank" rel="noopener noreferrer" class="external-link">{{job.company.name}}</a>
		</h3>
		<p class="job-details">
			{{ job.location }}  
			<span class="details-divider"> &nbsp | &nbsp </span>  
			<span class="date"> 
				{{ job.start_date }} - {{ job.end_date }} 
				<span class="details-divider"> &nbsp&nbsp </span>  
				( {{calculateDuration }} )
			</span>
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

.date {
	display: inline-block;
	text-wrap: nowrap;
}


ul {
	list-style-type: disc;
	padding-left: 20px;
}
li {
	margin-bottom: 0.5rem;
	text-wrap: balance;
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

@media screen and (max-width: 600px) {
	.job-title, .job-details {
		text-wrap: balance;
	}

	.date {
		display: block;
		text-wrap: nowrap;
	}

	.details-divider {
		visibility: hidden;
	}
}
</style>