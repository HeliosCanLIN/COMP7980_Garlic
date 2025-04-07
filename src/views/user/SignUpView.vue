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

const submitData=ref({
  username: "",
  password: "",
})

const submitSignup = async () => {
  if(register.value.username==""){
    alert("Username not filled in");
    return;
  }
  if(register.value.password==""){
    alert("Password not filled in");
    return;
  }
  if(register.value.confirmPassword==""){
    alert("Re-enter confirm password");
    return;
  }
  if(register.value.confirmPassword!=register.value.password){
    alert("Make sure you enter the same password twice");
    return;

  }
  try{
    submitData.value.password=CryptoJS.MD5(register.value.password).toString();
    submitData.value.username=register.value.username.toString();

    const response = await fetch('api/users/register/', {
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(submitData.value)
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message)
    }else{
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("username",data.username);
      alert("Success!");
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
      <h2>Sign up</h2>
    </div>

    <!-- Registration Form -->
    <form v-on:submit.prevent="submitSignup" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">USERNAME</label>
        <input type="text" v-model="register.username" class="form-control" id="username" placeholder="Please input the username" />
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">PASSWORD</label>
        <input type="password" v-model="register.password" class="form-control" id="password" placeholder="Please input your password" />
      </div>

      <!-- Re-enter Password Input -->
      <div class="mb-3">
        <label for="confirm-password" class="form-label">RE-PASSWORD</label>
        <input type="password" v-model="register.confirmPassword" class="form-control" id="confirm-password" placeholder="Please input your password again" />
      </div>

      <!-- Register Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-success">Sign up</button>
      </div>
    </form>

    <!-- Login Link -->
    <div class="text-center mt-3">
      <router-link to="/SignIn">Already have a account?</router-link>
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
