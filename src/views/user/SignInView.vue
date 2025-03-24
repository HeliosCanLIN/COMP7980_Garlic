<script setup>

</script>
<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>登录</h2>
    </div>

    <!-- Registration Form -->
    <form class="mx-auto" style="max-width: 400px;">
      <!-- Username Input -->
      <div class="mb-3">
        <label for="username" class="form-label">用户名</label>
        <input type="text" class="form-control" id="username" placeholder="请输入用户名" />
      </div>

      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">密码</label>
        <input type="password" class="form-control" id="password" placeholder="请输入密码" />
      </div>

      <!-- Register Button -->
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
