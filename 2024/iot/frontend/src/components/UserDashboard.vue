<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <p class="navbar-brand m-3 h2">SOSTP IoT Preview</p>
  </nav>
  <div v-if="temp" class="container">
    <div class="row" style="width: 100%">
      <div class="col-6">
        <IoTGraph name="Teplota" :data="temp" />
      </div>
      <div class="col-6">
        <IoTGraph name="Osvětlení" :data="light" />
      </div>
    </div>
    <div class="row" style="width: 100%">
      <div class="col-6">
        <IoTGraph name="Orientace" :data="compass" />
      </div>
      <div class="col-6">
        <IoTGraph name="Hladina zvuku" :data="sound" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IoTGraph from "./IoTGraph.vue";
import { readData } from "../network";
import { LightData, TempData, CompassData, SoundData } from "../data";

const temp = ref("");
const light = ref("");
const compass = ref("");
const sound = ref("");

readData().then((data) => {
  const rawData = data;
  temp.value = new TempData(rawData);
  light.value = new LightData(rawData);
  compass.value = new CompassData(rawData);
  sound.value = new SoundData(rawData);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
