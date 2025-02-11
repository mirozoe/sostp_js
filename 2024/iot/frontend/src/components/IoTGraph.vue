<template>
  <div class="mt-3 bg-light">
    <h3 class="text-center">
      {{ props.name }} [{{ props.data.getData()[0].unit }}]
    </h3>
    <div ref="graph" class="m-3"></div>
  </div>
</template>

<script setup>
import * as d3 from "d3";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const props = defineProps(["name", "data"]);
const graph = ref(null);

const margin = { top: 20, right: 10, bottom: 20, left: 20 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
  .create("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3
  .scaleTime()
  .domain([
    dayjs
      .unix(Math.min(...props.data.getData().map((v) => v.timestamp)))
      .toDate(),
    dayjs
      .unix(Math.max(...props.data.getData().map((v) => v.timestamp)))
      .toDate(),
  ])
  .range([0 + margin.left, width]);

const y = d3
  .scaleLinear()
  .domain([
    Math.max(...props.data.getData().map((v) => v.value)) + margin.top,
    0,
  ])
  .range([0, height - margin.bottom - margin.top]);

svg
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

svg
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top + margin.bottom})`)
  .call(d3.axisLeft(y));

const line = d3
  .line()
  .x((d) => x(dayjs.unix(d.timestamp).toDate()))
  .y((d) => y(d.value));

svg
  .append("path")
  .datum(props.data.getData().map((v) => dayjs.unix(v.timestamp).toDate()))
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", line(props.data.getData()));

onMounted(() => {
  graph.value.appendChild(svg.node());
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
