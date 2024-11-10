<template>
  <div class="row">
    <div class="col-3" id="side">
      <h5 class="mb-5">Přihlášení uživatelé</h5>
      <div v-for="user in users" :key="user.name" class="row clearfix">
        <a @click="chatWith(user)">{{ user.name }}<span class="badge text-bg-secondary" v-if="newMessages(user.name)?.length"> {{ newMessages(user.name)?.length }}</span></a>
      </div>
    </div>
    <div class="col">
      <div class="container">
        <div class="row text-end">
          <div class="col-10"></div>
          <div class="col">
            <i class="bi bi-person-circle h3"></i>
            <p>{{ props.loginName }}</p>
          </div>
        </div>
        <Chat v-if="usersInChat" :usersInChat="usersInChat" :socket="socket" :cancel="cancel" v-model="incomingMsgs" />
        <Intro v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Intro from "./Intro.vue"
  import Chat from "./Chat.vue"
  import io from "socket.io-client"
  import { ref, watchEffect } from "vue"
  import { BE_URL } from "@/utilities"

  const props = defineProps(["loginName", "JWT"])

  let users = ref([])
  let usersInChat = ref(null)
  let incomingMsgs = ref([])
  let usersMsgs = ref([])

  const socket = io(BE_URL)

  const chatWith = (user) => {
    if (usersInChat.value) {
      usersInChat.value.push(user)
    } else {
      usersInChat.value = [user]
    }
  }

  const newMessages = userName => {
    let userMsgs = []
    const userObj = users.value.filter( usr => usr.name === userName )
    if (userObj.length) {
      const msgs = incomingMsgs.value.filter( usr => usr.from === userObj[0].id )
      if (msgs.length) {
        userMsgs = msgs.map( msg => msg.msg )
        usersMsgs.value = msgs
      }
    }
    return userMsgs
  }

  const cancel = () => {
    usersInChat.value = null
    usersMsgs.value = []
  }

  socket.on("active_users", (u) => {
    users.value = u.filter( user => user.id !== socket.id )
  })

  socket.on("private_chat", (msg) => {
    incomingMsgs.value.push(msg)
    console.log(incomingMsgs.value)
  })

  watchEffect(async () => {
    await socket.emit("login", { name: props.loginName })
  });
</script>
