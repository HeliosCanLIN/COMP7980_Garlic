<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from "vue-router";
const route = useRoute();
const router = useRouter();



const section =ref(route.query.section || 'Winnie') ;

const title=ref(route.query.title || '小熊维尼');



const loading = ref(false);

const posts = ref([]);

const showDetail = async (_id)=>{
    await router.replace('/post/'+_id);
}

onMounted(async ()=>{
  loading.value=true;
  const response = await fetch('/api/posts/getLists/',{
    method:'POST',
    headers:{"Content-Type":"application/json",'Authorization': `Bearer ${localStorage.getItem('token')}`},
    body:JSON.stringify({section:section.value})
  });
  if (!response.ok) throw new Error('post not found');

  posts.value=await response.json();

})


</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">{{title}}-Post Lists</h1>
    <div >
      <div v-if="posts.length === 0" class="text-center">
        <p>No Posts.</p>
      </div>
      <div class="row">
        <div class="col-md-12" v-for="post in posts" :key="post._id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ post.Title }}</h5>
              <button class="btn btn-secondary btn-sm" @click.prevent="showDetail(post.PostID)">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <div class="text-center mb-4">
      <button class="btn btn-info" >New Post</button>
    </div>
  </footer>
</template>


<style scoped>

</style>
