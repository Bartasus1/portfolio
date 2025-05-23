<script setup lang="ts">
	interface Project {
		title:        string;
		image:        string;
		short_description: string;
		focus_points:  string[];
		description:  string[];
		technologies: Technology[];
		links:        Link[];
	}

	interface Link {
		name: string;
		url:  string;
		icon: string;
	}

	interface Technology {
		name: string;
		icon: string;
	}

	const props = defineProps<{
		isVisible: boolean,
		project: Project | null
	}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>

<template>
    <div v-if="isVisible" class="overlay" @click="emit('close')">
        <button class="closeButton" @click="emit('close')">×</button>
        <div class="overlayContent" @click.stop>
            <div class="overlayLeft">
                <div class="titleLinksRow">
                    <h1 class="projectTitle">{{ project?.title }}</h1>
                    <div class="links">
											<a v-for="link in project?.links" 
													:key="link.name" 
													:href="link.url" 
													target="_blank" 
													class="linkItem">
													<img :src="link.icon" :alt="link.name" class="linkIcon" />
													{{ link.name }}
											</a>
                    </div>
                </div>
								<span class="separator"></span>
                <div class="projectInfo">
									<div class="description">
										{{ project?.description.join(' ') }}
									</div>
									<div class="focusPoints">
										<ul>
											<li v-for="(point, index) in project?.focus_points" :key="index">
												{{ point }}
											</li>
										</ul>
									</div>
									<div class="technologies">
										<div class="techList">
											<div v-for="tech in project?.technologies" :key="tech.name" class="techItem">
												<img :src="tech.icon" :alt="tech.name" class="techIcon" />
												<span>{{ tech.name }}</span>
											</div>
										</div>
									</div>
                </div>
            </div>
            <div class="overlayRight">
                <img :src="project?.image" :alt="project?.title" class="projectImage" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.closeButton {
	position: fixed;
	top: 2rem;
	right: 2rem;
	background-color: white;
	border: none;
	color: #ff4444;
	font-size: 2.5rem;
	cursor: pointer;
	padding: 0.5rem;
	z-index: 1001;
	transition: all 0.2s ease;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1;
}

.closeButton:hover {
	transform: scale(1.1);
	background-color: #ff4444;
	color: white;
}

.separator {
	width: 100%;
	height: 4px;
	border-radius: 4px;
	background-color: #fff;
	/* margin-top: 10px; */
	margin-bottom: clamp(0, 20px, 20px);
	flex-shrink: 0;
}

.overlayContent {
	background-color: #1a1a1a;
	border-radius: 16px;
	padding: 0;
	width: 70vw;
	min-width: 70vw;
	min-height: 80vh;
	height: 80vh;
	max-width: 1200px;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
	display: flex;
	flex-direction: row;
}

.overlayLeft {
	background: #f3c94c;
	width: 50%;
	padding: 10% 5rem;
	display: flex;
	flex-direction: column;
	border-top-left-radius: 16px;
	border-bottom-left-radius: 16px;
	overflow-y: scroll;
}

.titleLinksRow {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.5rem;
	margin-bottom: 1.5rem;
}

.projectTitle {
	color: #222;
	font-size: 2.2rem;
	font-weight: 700;
	line-height: 1;
	display: flex;
}

.links {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 0;
}

.overlayRight {
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: transparent;
	border-top-right-radius: 16px;
	border-bottom-right-radius: 16px;
	overflow: hidden;
}

.projectImage {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 0 16px 16px 0;
	max-height: 90vh;
}

.projectInfo {
	color: #222;
}

.description {
	padding: 2rem 1rem;
	font-size: 1.3rem;
	font-weight: 450;
	line-height: 1.6;
}

.focusPoints li {
	padding: 0.5rem 1rem;
	border-radius: 8px;
	margin-bottom: 0.5rem;
	font-size: 1.2rem;
	font-weight: 420;
	line-height: 1.4;
}

.technologies{
	margin-top: 10%;
}

.techList, .linkList {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-top: 0.5rem;
}

.techItem, .linkItem {
	display: flex;
	align-items: center;
	gap: 1rem;
	background-color: #ffe082;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	text-decoration: none;
	color: #222;
	font-weight: 500;
}


.techIcon, .linkIcon {
	width: 24px;
	height: 24px;
}

h2 {
	color: #222;
	margin-bottom: 1rem;
}

/* Responsive styles */
@media (max-width: 900px) {
	.projectTitle {
		width: 100%;
	}

	.overlayContent {
		flex-direction: column;
		width: 95%;
		min-width: unset;
	}
	.overlayLeft, .overlayRight {
		width: 100%;
		border-radius: 0;
	}
	.overlayLeft {
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		border-bottom-left-radius: 0;
		padding: 2rem 1rem;
	}
	.overlayRight {
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		border-top-right-radius: 0;
		min-height: 200px;
	}
	.projectImage {
		border-radius: 0 0 16px 16px;
		max-height: 300px;
	}
}
</style>
