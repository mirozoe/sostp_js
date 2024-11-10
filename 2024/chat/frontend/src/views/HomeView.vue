<template>
  <div>
    <img src="../assets/bg.jpg" class="background" :class="{'move': hiddenVal}"/>
    <form class="container login m-2" style="background: rgba(0,0,0,0.3)" :style="{'visibility': hiddenVal}">
      <label for="login" class="row m-1 form-label" style="color: white">Jméno</label>
      <input id="login" type="text" v-model="loginName" class="row m-1 form-control"/>
      <label for="password" class="row m-1 form-label" style="color: white">Heslo</label>
      <input id="password" type="password" v-model="loginPassword" class="row m-1 form-control"/>
      <button type="button" class="row btn btn-primary m-1" @click="login">Přihlásit se</button>
    </form>
    <div v-if="error" class="text-danger error-text">{{ error }}</div>
  </div>
  <div v-if="hiddenVal" class="container">
    <Dashboard class="dashboard" :loginName="loginName" :JWT="JWT" />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import Dashboard from "../components/Dashboard.vue"
  import { BE_URL } from "@/utilities";

  const hiddenVal = ref("")
  const JWT = ref("")
  const error = ref("")
  const loginName = ref("")
  const loginPassword = ref("")

  const login = async () => {
    const resp = await fetch(`${BE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginName.value,
        password: loginPassword.value
      })
    })

    if (resp.ok) {
      resp.json().then( data => JWT.value = data.token )
      hiddenVal.value = "hidden"
      error.value = ""
      document.querySelector("body").style = "overflow-y: auto"
    } else {
      error.value = "Špatné jméno nebo heslo"
      console.log("Error: ", resp.status)
    }
  }

</script>

<style>
div {
  position: relative;
  width: 100%;
}

.background {
  top: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  clip-path: polygon(100% 0%, 0% 0%, 0% 80%, 100% 60%);
}

.login {
  position: absolute;
  left: 50%;
  width: auto;
  transform: translate(-50%, -600%)
}

.error-text {
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;
  border-radius: 0.5em;
  text-align: center;
  z-index: 1000;
  font-weight: bold;
}

.move {
  transform: translate(0px, -800px);
  transition-duration: 1.5s;
  opacity: 0.4;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.dashboard {
  top: -1100px;
  left: 0px;
  animation: fadeIn 2s;
}
</style>
