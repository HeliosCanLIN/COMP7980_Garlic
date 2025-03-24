<script setup>
import {ref} from "vue";
import {  useRouter } from "vue-router";
import CryptoJS from "crypto-js";

const router = useRouter();

const userInfo = ref({
  username:"",
  password:"",
})

const login = async () => {
  if(userInfo.value.username==""){
    alert("用户名未填写");
    return;
  }
  if(userInfo.value.password==""){
    alert("密码未填写");
    return;
  }

  try{
    userInfo.value.password=CryptoJS.MD5(userInfo.value.password).toString();
    const response = await fetch('api/users/login', {
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(userInfo.value)
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message)
    }else{
      alert("Welcome Home")
      localStorage.setItem("token", data.token);
      localStorage.setItem("username",data.username);
      await router.push('/');
      location.reload();
    }
  }catch (error){
    alert(error);
  }
}
</script>
<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>登录</h2>
    </div>

    <!-- Registration Form -->
    <form v-on:submit.prevent="login" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">用户名</label>
        <input type="text" v-model="userInfo.username" class="form-control" id="username" placeholder="请输入用户名" />
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">密码</label>
        <input type="password" v-model="userInfo.password" class="form-control" id="password" placeholder="请输入密码" />
      </div>

      <!-- userInfo Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-success">登录</button>
      </div>
    </form>


    <!-- Footer -->
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
</template>



<style scoped>
/* 可加入额外样式定制 */
</style>
