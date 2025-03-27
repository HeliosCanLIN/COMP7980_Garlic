<script setup>
import {ref,onMounted} from "vue";

const username = ref('');

onMounted(()=>{
  username.value=localStorage.getItem('username');
})
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
  </div>
</div>
</template>

<style scoped>
.col-5th{
  width: 20%;
}
</style>
