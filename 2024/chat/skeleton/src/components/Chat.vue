<template>
  <div class="row text-center mtb-3">
    <h3>Chat s {{ props.userInChat.name }}</h3>
  </div>
  <div class="row">
    <div class="col">
      <div v-for="msg in msgs" class="card m-2">
        <span  class="bg-primary-subtle p-1">{{ msg }}</span>
        <span class="bg-light p-1"></span>
      </div>
    </div>
  </div>
  <div class="row text-center mt-3">
    <div class="col">
      <input type="text" class="form-control" v-model="outcomeMsg" >
    </div>
    <div class="col-1 mx-2">
      <button type="button" class="btn btn-primary" @click="send" >Odeslat</button>
    </div>
    <div class="col-1 mx-2">
      <button type="button" class="btn btn-primary" @click="props.cancel">Storno</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps(["userInChat", "socket", "cancel"])
  const outcomeMsg = ref("")
  const msgs = ref([])

  const send = () => {
    props.socket.emit("private_chat", { msg: outcomeMsg.value, to: props.userInChat.id, from: props.socket.id })
    msgs.value.push(outcomeMsg.value)
    outcomeMsg.value = ""
  }
</script>
