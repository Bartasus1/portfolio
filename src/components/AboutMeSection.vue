<script setup lang="ts">
const props = defineProps<{
	sectionName: string,
}>()

function logMessage() {
	console.log(props.sectionName);
}
</script>

<template>
	<div 
		class="aboutMeElement" 
		@click="logMessage()"
	>
		<div class="titleElement">
			<h1>{{ sectionName }}</h1>
		</div>
		<div class="elementSeparator"></div>
		<div class="descriptionElement">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur iure ut odit, fuga, explicabo nemo amet
				recusandae obcaecati repellendus tenetur rerum libero natus perspiciatis laudantium quisquam et assumenda
				voluptates. Nobis.
			</p>
		</div>
	</div>
</template>

<style scoped>
	.aboutMeElement {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		width: 60%;
		color: #202020;
		.titleElement {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			h1 {
				font-size: 4rem;
			}
		}
		.elementSeparator {
			width: 100%;
			height: 2px;
			background-color: #202020;
			margin: 10px 0;
		}
		.descriptionElement {
			font-size: 1.4rem;
		}
	}
</style>