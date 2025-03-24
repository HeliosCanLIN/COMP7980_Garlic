<script setup>
import {ref} from "vue";
import {  useRouter } from "vue-router";
import CryptoJS from 'crypto-js';


const router = useRouter();

const register = ref({
  username:"",
  password:"",
  confirmPassword:""
})

const submitSignup = async () => {
  if(register.value.username==""){
    alert("用户名未填写");
    return;
  }
  if(register.value.password==""){
    alert("密码未填写");
    return;
  }
  if(register.value.confirmPassword==""){
    alert("请填写再次输入密码");
    return;
  }
  if(register.value.confirmPassword!=register.value.password){
    alert("请确认两次填写的密码是否一致");
    return;

  }
  try{
    register.value.password=CryptoJS.MD5(register.value.password).toString();
    register.value.confirmPassword=CryptoJS.MD5(register.value.confirmPassword).toString();
    const response = await fetch('api/users/register/', {
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(register.value)
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message)
    }else{
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("username",data.username);
      alert("注册成功");
      await router.push('/SignIn');
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
      <h2>注册</h2>
    </div>

    <!-- Registration Form -->
    <form v-on:submit.prevent="submitSignup" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">用户名</label>
        <input type="text" v-model="register.username" class="form-control" id="username" placeholder="请输入用户名" />
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">密码</label>
        <input type="password" v-model="register.password" class="form-control" id="password" placeholder="请输入密码" />
      </div>

      <!-- Re-enter Password Input -->
      <div class="mb-3">
        <label for="confirm-password" class="form-label">再次输入密码</label>
        <input type="password" v-model="register.confirmPassword" class="form-control" id="confirm-password" placeholder="请再次输入密码" />
      </div>

      <!-- Register Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-success">注册</button>
      </div>
    </form>

    <!-- Login Link -->
    <div class="text-center mt-3">
      <router-link to="/SignIn">已有账号?</router-link>
    </div>

    <!-- Footer -->
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
</template>



<style scoped>
/* 可加入额外样式定制 */
</style>
