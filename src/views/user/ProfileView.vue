<script setup>
import {ref,onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const username = ref('');

onMounted(()=>{
  username.value=localStorage.getItem('username');
})

const deleteAccount =async () => {
  let id=localStorage.getItem("id");
  let token=localStorage.getItem("token");
  const response=await fetch('/api/users/deleteAcc/',{
    method:'POST',
    headers:{"Content-Type":"application/json",  "authorization": `Bearer ${token}`},
    body:JSON.stringify({id:id})
  })

  if(response.ok){
    alert("Delete successfully.See ya")
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    await router.push('/');
    location.reload();
  }else{
    alert("Account delete failed, please try later");
  }
}
</script>

<template>
<div class="container mt-5">
  <div class="text-center mb-4">
    <h1 class="display-4">{{username}}</h1>
    <h2>个人资料</h2>
  </div>
  <div class="row">
      <div class="col-5th">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">发帖数</h5>
              <div class="card">
                <p class="card-text">1</p>
              </div>
          </div>
        </div>
      </div>
    <div class="col-5th">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">回帖数</h5>
          <div class="card">
            <p class="card-text">2</p>
          </div>
        </div>
      </div>
    </div><div class="col-5th">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">获赞数</h5>
        <div class="card">
          <p class="card-text">3</p>
        </div>
      </div>
    </div>
  </div><div class="col-5th">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">获踩数</h5>
        <div class="card">
          <p class="card-text">4</p>
        </div>
      </div>
    </div>
  </div><div class="col-5th">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">点赞数</h5>
        <div class="card">
          <p class="card-text">5</p>
        </div>
      </div>
    </div>
  </div>
    <div class="text-center" style="margin: 20px">
      <button class="btn btn-danger" @click="deleteAccount" >DELETE ACCOUNT</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.col-5th{
  width: 20%;
}
</style>
