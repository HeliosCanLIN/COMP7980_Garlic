<script setup>

</script>

<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">我们是谁？</h1>
      <h2>我们是Garlic Enjoyer。一个老鼠游乐园的粉丝论坛。</h2>
      <img src="@/assets/winnie.png" style="width: 150px"/>
    </div>
    <hr style="border-top: 2px dashed #6c757d;">

    <div class="text-center mb-4">
      <h1 class="display-4">我们可以干什么？</h1>
      <h2>您可以在我们的论坛畅所欲言。可以和朋友们交流蒜的品尝方式。坦克怎么开。亦或是畅谈老鼠游乐园哪个项目最好玩。总之就是想说什么说什么。</h2>
      <img src="@/assets/garlic.svg" alt="" style="width: 150px"/>
    </div>
    <hr style="border-top: 2px dashed #6c757d;">

    <div class="text-center mb-4">
      <h1 class="display-4">我们由什么技术构建的？</h1>
      <h2>我们构建于Vue.js Express.js以及MongoDB。</h2>
      <div>
        <img class="logo" src="@/assets/vue.svg" alt="" />
        <img class="logo" src="@/assets/expressjs.png" alt="" />
        <img class="logo" src="@/assets/mongodb.png" alt="" />
      </div>
    </div>
    <div class="text-center mb-4">
      <h2>欢迎注册体验</h2>
    </div>
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
</template>

<style scoped>
.logo{
  width: 200px;
  margin: 20px;
}
</style>
