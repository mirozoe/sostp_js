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
        <IoTGraph name="Orientace" :data="heading" />
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
import { Data, LightData, TempData, HeadingData, SoundData } from "../data";

const temp = ref("");
const light = ref("");
const heading = ref("");
const sound = ref("");


readData().then((data) => {
  const [lightData, headingData, tempData, soundData] = Data.parseData(data)
  temp.value = Data.sortData( tempData )
  light.value = Data.sortData( lightData )
  heading.value = Data.sortData( headingData )
  sound.value = Data.sortData( soundData )
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
