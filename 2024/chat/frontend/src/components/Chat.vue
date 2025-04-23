<<template>
  <div class="row text-center mtb-3">
    <h3>Chat s {{ users }}</h3>
  </div>
  <div class="row">
    <div class="col">
      <div v-for="message in msgs" class="card m-2">
        <span v-if="message.from !== props.socket.id" class="bg-primary-subtle p-1">{{ message.msg }}</span>
        <span v-else class="bg-light p-1">{{ message.msg }}</span>
      </div>
    </div>
  </div>
  <div class="row text-center mt-3">
    <div class="col">
      <input id="message" type="text" class="form-control" v-model="msg">
    </div>
    <div class="col-1 mx-2">
      <button id="send" type="button" class="btn btn-primary" @click="send">Odeslat</button>
    </div>
    <div class="col-1 mx-2">
      <button id="cancel" type="button" class="btn btn-primary" @click="props.cancel">Storno</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue"

  const props = defineProps(["usersInChat", "socket", "cancel"])
  const msgs = defineModel()

  let msg = ref("")
  //let messages = ref(props.msgs ?? [])
  console.log(msgs.value)
  const users = props.usersInChat.map( user => user.name ).join(", ")

  const send = () => {
    props.usersInChat.forEach( async user => {
      await props.socket.emit("private_chat", { msg: msg.value, to: user.id, from: props.socket.id } )
      //messages.value.push({ msg: msg.value, id: props.socket.id })
      //const temp = [...model]
      //temp.push({msg: msg.value, to: user.id, from: props.socket.id})
      //emits("update:msgs", temp)
      msgs.value.push({msg: msg.value, to: user.id, from: props.socket.id})
      msg.value = ""
    })
  }

</script>
