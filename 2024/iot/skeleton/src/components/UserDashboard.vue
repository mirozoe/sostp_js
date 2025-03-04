<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <p class="navbar-brand m-3 h2">SOSTP IoT Preview</p>
  </nav>
  <div v-if="temp" class="container">
    <div class="row" style="width: 100%">
      <div class="col-6"></div>
      <div class="col-6"></div>
    </div>
    <div class="row" style="width: 100%">
      <div class="col-6"></div>
      <div class="col-6"></div>
    </div>
  </div>
</template>

<script setup>
import { getData } from "../network.js";
import { Data } from "../data.js";

getData().then((data) => {
  console.log(Data.parseData(data));
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
