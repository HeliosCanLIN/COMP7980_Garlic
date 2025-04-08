<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";

const router = useRouter();

const userInfo = ref({
  username: "",
  password: "",
});

const userInfoSubmit = ref({
  username: "",
  password: "",
});

const login = async () => {
  if (userInfo.value.username === "") {
    alert("Username is required.");
    return;
  }
  if (userInfo.value.password === "") {
    alert("Password is required.");
    return;
  }

  try {
    userInfoSubmit.value.password = CryptoJS.MD5(userInfo.value.password).toString();
    userInfoSubmit.value.username = userInfo.value.username.toString();
    const response = await fetch('api/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfoSubmit.value),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      alert("Welcome Home");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.id);
      await router.push('/');
      location.reload();
    }
  } catch (error) {
    alert(error);
  }
}

onMounted(async () => {
  var id = localStorage.getItem("id");
  if (id != null) {
    await router.push('/');
  }
})
</script>

<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>Log in</h2>
    </div>

    <!-- Login Form -->
    <form v-on:submit.prevent="login" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" v-model="userInfo.username" class="form-control" id="username" placeholder="Enter username" />
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="userInfo.password" class="form-control" id="password" placeholder="Enter password" />
      </div>

      <!-- Login Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-success">Log in</button>
      </div>
    </form>

    <!-- Footer -->
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
</template>

<style scoped>
/* Add additional styles here if needed */
</style>
