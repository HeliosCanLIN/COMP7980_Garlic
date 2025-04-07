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
    alert("Old password not filled in");
    return;
  }
  if(userInfo.value.newPassword==""){
    alert("New password not filled in");
    return;
  }
  if(userInfo.value.confirmPassword==""){
    alert("Please fill in the re-entry password");
    return;
  }
  if(userInfo.value.confirmPassword!=userInfo.value.newPassword){
    alert("Please make sure that the passwords you fill in twice are the same");
    return;
  }

  if(userInfo.value.newPassword==userInfo.value.oldPassword){
    alert("Old and new passwords cannot be the same");
    return;
  }
  try{
    submitInfo.value.password=CryptoJS.MD5(userInfo.value.newPassword).toString();
    submitInfo.value.username=userInfo.value.username.toString();
    submitInfo.value.id=userInfo.value.id.toString();
    const token=localStorage.getItem("token");
    const response = await fetch('api/users/changePassword/', {
      method:'POST',
      headers:{"Content-Type":"application/json",  "authorization": `Bearer ${token}`},
      body:JSON.stringify(submitInfo.value)
    });
    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message)
    }else{

      alert("Changed successfully, please log in again");
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
      <h2>Password Reset</h2>
    </div>

    <!-- Registration Form -->
    <form v-on:submit.prevent="submitChangePassword" class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">USERNAME</label>
        <input type="text" v-model="userInfo.username" class="form-control" id="username" disabled="disabled"  />
        <input type="hidden" v-model="userInfo.id" class="form-control" id="id" disabled="disabled"  />
      </div>


      <div class="mb-3">
        <label for="password" class="form-label">Old Password</label>
        <input type="password" v-model="userInfo.oldPassword" class="form-control" id="oldpassword" placeholder="Please enter your password" />
      </div>

      <div class="mb-3">
        <label for="newpassword" class="form-label">New Password</label>
        <input type="password" v-model="userInfo.newPassword" class="form-control" id="newpassword" placeholder="Please enter your new password" />
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Re-enter the new password</label>
        <input type="password" v-model="userInfo.confirmPassword" class="form-control" id="confirm-password" placeholder="Please enter your new password again" />
      </div>


      <div class="d-grid">
        <button type="submit" class="btn btn-success">Reset</button>
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
