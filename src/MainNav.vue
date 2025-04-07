<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import IndexView from "@/views/IndexView.vue";

const router = useRouter();

const UserLogined = ref(false);
const UserName = ref("");

const logOut = async function (){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  await router.push('/');
  location.reload();
}

onMounted(async () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (username != "" && username != null) {
    UserLogined.value = true;
    UserName.value = username;
    const response=await fetch('/api/test/auth',{
      headers:{
        "authorization": `Bearer ${token}`
      }
    });
    console.log(response.ok);
    if(!response.ok){
      UserLogined.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      await router.replace({
        path:'/Error',
        query:{errorMessage:"您的登录状态已过期，请重新登录"}
      });
    }
  } else {
    UserLogined.value = false;
  }
});

const goSection1=async ()=>{
  await router.replace({
    path:'/Section',
    query:{section:"XJP"}
  });
}
const goSection2=async ()=>{
  await router.replace({
    path:'/Section',
    query:{section:"Tech"}
  });
}
const goSection3=async ()=>{
  await router.replace({
    path:'/Section',
    query:{section:"Living"}
  });
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- 左侧 Logo -->
    <a class="navbar-brand" href="/">Garlic Enjoyer</a>

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
          <a class="nav-link" @click="goSection1">小熊维尼</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goSection2">跳跳虎</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="goSection3">玲娜贝尔</a>
        </li>
      </ul>

      <!-- 右侧按钮 -->
      <div class="d-flex" v-if="!UserLogined">
        <RouterLink to="/SignIn">
          <button class="btn btn-outline-light me-2"> SIGN IN </button>
        </RouterLink>
        <RouterLink to="/SignUp">
          <button class="btn btn-success"> SIGN UP</button>
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
          <RouterLink to="/profile"><li><a class="dropdown-item" >Profile</a></li></RouterLink>
          <RouterLink to="/ChangePassword"><li><a class="dropdown-item" >ChangePassword</a></li></RouterLink>

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
