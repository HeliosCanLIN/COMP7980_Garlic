<script setup>
import {ref, onMounted} from "vue";

const UserLogined = ref(false);
const UserName = ref("");

const logOut = function (){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.reload();
}

onMounted(() => {
  const username = localStorage.getItem("username");
  if (username != "" && username != null) {
    UserLogined.value = true;
    UserName.value = username;
  } else {
    UserLogined.value = false;
  }
});

</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- 左侧 Logo -->
    <a class="navbar-brand" href="#">Garlic Enjoyer</a>

    <!-- 响应式折叠按钮 -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- 中间导航菜单 -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">小熊维尼</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">跳跳虎</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">玲娜贝尔</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">星黛露</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">杰拉多尼</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">可琦安</a>
        </li>
      </ul>

      <!-- 右侧按钮 -->
      <div class="d-flex" v-if="!UserLogined">
        <RouterLink to="/SignIn">
          <button class="btn btn-outline-light me-2"> 登录</button>
        </RouterLink>
        <RouterLink to="/SignUp">
          <button class="btn btn-success">注册</button>
        </RouterLink>
      </div>
      <div v-else class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          id="dropdownMenuButton"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{UserName}}
        </button>

        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Grades</a></li>
          <li><a class="dropdown-item text-danger"  @click="logOut">Log out</a></li>
        </ul>
      </div>

    </div>
  </nav>
  <RouterView :key="$route.fullPath"/>
</template>


<style scoped>
.dropdown-item {
  display: block;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

</style>
