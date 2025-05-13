<template>
	<div class="section-container">
		<h1 class="title">
			Techstack
		</h1>
		<p class="description">
			Here are the technologies I have worked with. The size of the circle represents my proficiency in that technology.
		</p>
		<div class="chart-container" v-html="createChart()">
		</div>
	</div>
</template>

<script setup>
import * as d3 from 'd3';
import data from '@/data/techstack.json';

const createChart = () => svg.node().outerHTML;

const randomRange = () => {
	const min = 550
	const	max = 750
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const width = randomRange();
const height = randomRange();

data.forEach((d) => {
	d.proficiency = Math.pow(d.proficiency, 3); // have to make differences more pronounced
});

const root = d3.pack()
	.size([width, height])
	.padding(30)
	(
		d3.hierarchy({ children: data })
			.sum(d => d.proficiency)
			.sort((a, b) => a.value < b.value)
	);

const svg = d3.create("svg")
	.attr("viewBox", [0, 0, width, height])
	.attr("font-size", 10)
	.attr("font-family", "sans-serif")
	.attr("text-anchor", "middle");
	
const leaf = svg.selectAll("g")
	.data(root.leaves())
	.join("g")
		.attr("transform", d =>  `translate(${d.x },${d.y})`)

leaf.append("circle")
	.attr("id", d => d.data.tech)
	.attr("r", d => d.r)
	.attr("fill-opacity", 0.7)
	.attr("fill", "white");

leaf.append("image")
	.attr("xlink:href", d => d.data.icon)
	.attr("x", d => -d.r/ 2)
	.attr("y", d => -d.r / 2)
	.attr("width", d => d.r)
	.attr("height", d => d.r);

leaf.append("title")
  .text(d => d.data.tech);
    
</script>

<style scoped>
.section-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background-color: #1a202c; /* Dark background */
	padding: 2% 5%;
}

.chart-container {
	display: flex;
	justify-content: center;
  width: 100%;
  height: 100%;
	padding: 2%;
}

.title {
	color: white;
	font-size: 3rem;
	text-align: center;
	padding-top: 5%;
}

.description {
	color: grey;
	font-size: 1.2rem;
	text-align: center;
}
</style>
