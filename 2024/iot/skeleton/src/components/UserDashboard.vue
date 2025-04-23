<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <p class="navbar-brand m-3 h2">SOSTP IoT Preview</p>
  </nav>
  <div v-if="temp" class="container">
    <div class="row" style="width: 100%">
      <div class="col-6">
        <IoTGraph name="Temperature" :data="temp" />
      </div>
      <div class="col-6">
        <IoTGraph name="Heading" :data="heading" />
      </div>
    </div>
    <div class="row" style="width: 100%">
      <div class="col-6">
        <IoTGraph name="Light" :data="light" />
      </div>
      <div class="col-6">
        <IoTGraph name="Sound" :data="sound" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getData } from "../network.js";
import { Data } from "../data.js";

import { ref } from "vue";
import IoTGraph from "./IoTGraph.vue";

const temp = ref(null);
const heading = ref(null);
const light = ref(null);
const sound = ref(null);

getData().then((data) => {
  const [t, h, l, s] = Data.parseData(data);
  temp.value = t;
  heading.value = h;
  light.value = l;
  sound.value = s;
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
