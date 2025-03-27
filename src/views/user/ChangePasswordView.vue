<script setup>
import {ref,onMounted} from "vue";
import NoAccess from "@/views/Error/NoAccess.vue";
import CryptoJS from "crypto-js";
import {  useRouter } from "vue-router";

const router = useRouter();

const access=ref(true);

const userInfo = ref({
  id:"",
  username: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword:"",
});


const submitInfo = ref({
  username: "",
  password: "",
  id:"",
});

const submitChangePassword =  async () => {
  if(userInfo.value.oldPassword==""){
    alert("旧密码未填写");
    return;
  }
  if(userInfo.value.newPassword==""){
    alert("新密码未填写");
    return;
  }
  if(userInfo.value.confirmPassword==""){
    alert("请填写再次输入密码");
    return;
  }
  if(userInfo.value.confirmPassword!=userInfo.value.newPassword){
    alert("请确认两次填写的密码是否一致");
    return;
  }

  if(userInfo.value.newPassword==userInfo.value.oldPassword){
    alert("新旧密码不可以一致");
    return;
  }
  try{
    submitInfo.value.password=CryptoJS.MD5(userInfo.value.newPassword).toString();
    submitInfo.value.username=userInfo.value.username.toString();
    submitInfo.value.id=userInfo.value.id.toString();

    const response = await fetch('api/users/changePassword/', {
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(submitInfo.value)
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message)
    }else{

      alert("更改成功，请重新登录");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      await router.push('/');
      location.reload();
    }
  }catch (error){
    alert(error);
  }

}
onMounted(()=>{
  const username = localStorage.getItem("username");
  if (username != "" && username != null) {

    access.value = true;
    userInfo.value.username = username;
    userInfo.value.id = localStorage.getItem("id");

  } else {

    access.value = false;
  }
})

</script>

<template>
  <div class="container mt-5" v-show="access">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>密码重置</h2>
    </div>

    <!-- Registration Form -->
    <form v-on:submit.prevent="submitChangePassword" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">用户名</label>
        <input type="text" v-model="userInfo.username" class="form-control" id="username" disabled="disabled"  />
        <input type="hidden" v-model="userInfo.id" class="form-control" id="id" disabled="disabled"  />
      </div>


      <div class="mb-3">
        <label for="password" class="form-label">旧密码</label>
        <input type="password" v-model="userInfo.oldPassword" class="form-control" id="oldpassword" placeholder="请输入密码" />
      </div>

      <div class="mb-3">
        <label for="newpassword" class="form-label">新密码</label>
        <input type="password" v-model="userInfo.newPassword" class="form-control" id="newpassword" placeholder="请输入新密码" />
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">再次输入新密码</label>
        <input type="password" v-model="userInfo.confirmPassword" class="form-control" id="confirm-password" placeholder="请再次输入密码" />
      </div>


      <div class="d-grid">
        <button type="submit" class="btn btn-success">重置</button>
      </div>
    </form>

    <!-- Footer -->
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
  <NoAccess v-show="!access"/>
</template>

<style scoped>

</style>
