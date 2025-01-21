<template>
  <div class="row">
    <div class="col-3" id="side">
      <h5 class="mb-5">Přihlášení uživatelé</h5>
      <div class="row clearfix">
        <a ><span class="badge text-bg-secondary" > </span></a>
      </div>
    </div>
    <div class="col">
      <div class="container">
        <div class="row text-end">
          <div class="col-10"></div>
          <div class="col">
            <i class="bi bi-person-circle h3"></i>
            <p>{{ props.login }}</p>
          </div>
        </div>
        <Chat v-if="userInChat" />
        <Intro />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue'
  import Chat from './Chat.vue'
  import Intro from './Intro.vue'
  import io from "socket.io-client"

  const props = defineProps(["login"])
  const socket = io("http://localhost:3000")

  const userInChat = ref("")
  const users = ref([])
  const incomingMsgs = ref([])

  socket.on("active_users", (u) => {
    users.value = u.filter( user => user.id !== socket.id )
  })

  socket.on("private_chat", (msg) => {
    incomingMsgs.value.push(msg)
    console.log(incomingMsgs.value)
  })

  watchEffect(async () => {
    await socket.emit("login", { name: props.login })
  });
</script>
