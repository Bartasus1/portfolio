<template>
	<div class="section-container">
		<h1 class="title">
			Techstack
		</h1>
		<div class="chart-container" v-html="chart">
		</div>
	</div>
</template>

<script setup>
import * as d3 from 'd3';
import data from '@/data/techstack.json';

const randomRange = () => {
	let min = 550
	let	max = 750
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

leaf.append("clipPath")
		.attr("id", d => d.data.tech)

leaf.append("image")
	.attr("xlink:href", d => d.data.icon)
	.attr("x", d => -d.r/ 2)
	.attr("y", d => -d.r / 2)
	.attr("width", d => d.r)
	.attr("height", d => d.r);

// leaf.append("text")
// 	.attr("clip-path", d => d.clipUid)
// 	.selectAll("tspan")
// 	.data(d => d.data.tech.split(/(?=[A-Z][a-z])|\s+/g))
// 	.join("tspan")
// 		.attr("x", 0)
// 		.attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
// 		.text(d => d);

leaf.append("title")
  .text(d => d.data.tech);

const chart = svg.node().outerHTML;
    
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
</style>
