<template>
  <div>
    <img src="../assets/bg.jpg" class="background" :class="{ move: success }" />
    <form class="container login m-2" style="background: rgba(0,0,0,0.3)" :style="{ visibility: success }" >
      <label for="login" class="row m-1 form-label" style="color: white">Jméno</label>
      <input id="login" type="text" class="row m-1 form-control" v-model="login" />
      <label for="password" class="row m-1 form-label" style="color: white">Heslo</label>
      <input id="password" type="password"  class="row m-1 form-control" v-model="pass" />
      <button type="button" class="row btn btn-primary m-1" @click="auth" >Přihlásit se</button>
    </form>
    <div class="text-danger error-text" v-if="error">{{ error }}</div>
  </div>
  <div class="container" v-if="success">
    <Dashboard class="dashboard" :login="login" />
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import Dashboard from "../components/Dashboard.vue"


  const login = ref("")
  const pass = ref("")
  const error = ref("")
  const success = ref("")

  const auth = async () => {
    const result = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: login.value,
        password: pass.value
      })
    })

    if (result.status === 200) {
//      const body = await result.json()
      result.json().then( function(json) {
        success.value = "hidden"
      })
    } else {
      error.value = "Jméno nebo heslo jsou nesprávné"
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
