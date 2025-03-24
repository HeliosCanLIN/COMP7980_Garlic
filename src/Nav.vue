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
      <div class="d-flex">
        <RouterLink to="/SignIn">
        <button class="btn btn-outline-light me-2"> 登录</button>
        </RouterLink>
        <RouterLink to="/SignUp">
        <button class="btn btn-success">注册</button>
        </RouterLink>
      </div>
    </div>
  </nav>
  <RouterView/>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
/* 可加入额外样式调整 */
</style>
