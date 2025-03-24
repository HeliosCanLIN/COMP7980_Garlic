<script setup>

</script>
<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>注册</h2>
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

      <!-- Re-enter Password Input -->
      <div class="mb-3">
        <label for="confirm-password" class="form-label">再次输入密码</label>
        <input type="password" class="form-control" id="confirm-password" placeholder="请再次输入密码" />
      </div>

      <!-- Register Button -->
      <div class="d-grid">
        <button type="submit" class="btn btn-success">注册</button>
      </div>
    </form>

    <!-- Login Link -->
    <div class="text-center mt-3">
      <a href="#" class="text-decoration-none">已有账号?</a>
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
