<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from "vue-router";
const route = useRoute();

const section = route.query.section || 'XJP';


const loading = ref(false);

const posts = ref([]);



onMounted(async ()=>{
  loading.value=true;
  const response = await fetch('/api/posts/getLists/',{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({section:section})
  });
  if (!response.ok) throw new Error('post not found');

  posts.value=await response.json();

})


</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">帖子列表</h1>
    <div >
      <div v-if="posts.length === 0" class="text-center">
        <p>暂无帖子。</p>
      </div>
      <div class="row">
        <div class="col-md-12" v-for="post in posts" :key="post._id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ post.Title }}</h5>
              <button class="btn btn-primary btn-sm">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
