<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from "vue-router";
import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const router = useRouter();

const section = ref(route.query.section || 'Winnie');
const loading = ref(false);
const posts = ref([]);

const showDetail = async (_id) => {
  await router.replace('/post/' + _id);
}

const createNewPost = async () => {
  await router.replace('/createpost')
}

onMounted(async () => {

  const id=localStorage.getItem("id");
  if(id==null){
    await router.replace({
      path:'/Error',
      query:{errorMessage:"Please log in first"}
    });
  }

  loading.value = true;
  const response = await fetch('/api/posts/getLists/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({section: section.value})
  });
  if (!response.ok) throw new Error('Post not found');
  posts.value = await response.json();
  loading.value = false;
})
</script>

<template>
  <div class="container mt-3">
    <div class="row g-4">
      <!-- Main Content -->
      <div class="col-md-8">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Forum Home</a></li>
            <li class="breadcrumb-item active" aria-current="page"><a
              :href="`/Section?section=${section}`">{{ section }}</a></li>
          </ol>
        </nav>

        <!-- Section Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">{{ section }}</h2>
          <button class="btn btn-primary" @click="createNewPost()">New Post</button>
        </div>

        <!-- Posts List -->
        <div class="card" v-if="!loading">
          <div class="card-body p-0">
            <div v-if="posts.length === 0" class="text-center p-4">
              <p class="text-muted">No posts yet. Be the first to share your thoughts!</p>
            </div>


            <div v-for="post in posts" :key="post._id" class="post-item border-bottom p-4">
              <div class="d-flex justify-content-between align-items-start">
                <div class="flex-grow-1">
                  <h5 class="post-title mb-2">
                    <a href="javascript:void(0)" @click="showDetail(post.PostID)"
                       class="text-decoration-none">
                      {{ post.Title }}
                    </a>
                  </h5>
                  <div class="text-muted small">
                    <span>Posted on: {{
                        new Date(post.CreatedAt).toLocaleDateString('en-US')
                      }}</span>
                  </div>
                </div>
                <button class="btn btn-outline-secondary btn-sm"
                        @click="showDetail(post.PostID)">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="text-center my-3">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <SideBar/>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain unchanged */
.post-item {
  transition: background-color 0.2s;
}

.post-item:hover {
  background-color: #f8f9fa;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--bs-body-color);
}

.post-title a:hover {
  color: var(--bs-primary);
}

.btn-outline-secondary {
  min-width: 90px;
}
</style>
