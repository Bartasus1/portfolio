<script setup lang="ts">
	defineProps<{
		name: string;
		quote: string;
	}>()
</script>

<template>
	<div class="expander">
			<h1 class="title">{{ name }}</h1>
		<div class="separator"></div>
			<p class="quote">
				{{ quote }}
			</p>
	</div>
</template>

<style scoped>
.expander {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 60%;
	color: #202020;
	cursor: pointer;
	transition: transform 0.3s ease, background-color 0.3s ease;
	padding: 10px 15px;
	border-radius: 5px;
	margin-bottom: 5px;
}

.expander:hover {
	transform: translateX(10px);
	background-color: rgba(255, 255, 255, 0.05);
}

.expander.active { 
	transform: translateX(20px); 
	background-color: rgba(255, 255, 255, 0.2); 
	font-weight: bold; 
}

.title {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: clamp(1rem, 2vw + 2vh, 4.5rem);
}

.separator {
	width: 100%;
	height: 2px;
	background-color: #202020;
	margin: 5px 0;
	flex-shrink: 0
}

.quote {
	font-size: clamp(0.9rem, 1vw + 1vh, 2rem);
	font-style: italic;
}

@media screen and (max-width: 1024px) {
	.expander {
		width: 33%;
		height: 100%;
		align-items: center;
		justify-content: flex-start;
		text-align: center;
		padding: 10px;
		margin: 0;
	}

	.title {
		font-size: clamp(1rem, 1vw + 2vh, 4.5rem);
		text-wrap: nowrap;
	}

	.quote {
		font-size: clamp(0.9rem, 1vw + 0.5vh, 2rem);
		text-wrap: balance;
	}
		
	.expander:hover {
		transform: translateY(-3px);
	}

	.expander.active {
		transform: translateY(-3px);
	}

	.separator {
		width: 90%;
		margin: 3px 0;
	}
}

@media screen and (max-width: 400px) {
	.title {
		font-size: 1.3rem;
	}
}

</style>