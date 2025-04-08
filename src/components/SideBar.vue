<script setup>
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const section = ref(route.query.section || 'Winnie');

const title = ref(route.query.title || 'Winnie the Pooh');

const loading = ref(false);

const posts = ref([]);

const showDetail = async (_id) => {
  await router.replace('/post/' + _id);
}

onMounted(async () => {
  loading.value = true;
  const response = await fetch('/api/posts/getHotLists', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({})
  });
  if (!response.ok) throw new Error('post not found');

  posts.value = await response.json();
})

</script>

<template>
  <div class="col-md-4">
    <div class="card mb-2">
      <div class="card-body">
        <h4 class="card-title mb-3">Section Navigation</h4>
        <div class="list-group">
          <a href="/profile" class="list-group-item list-group-item-action">My Profile</a>
          <a href="/ChangePassword" class="list-group-item list-group-item-action">Setting</a>
          <a href="#" class="list-group-item list-group-item-action">Forum Help</a>
        </div>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">

        <h4 class="card-title mb-3">Hot Topics</h4>
        <div class="list-group" v-for="post in posts" :key="post._id">
          <a @click.prevent="showDetail(post.PostID)"
             class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            {{ post.Title }}
            <span class="badge bg-primary rounded-pill">{{ post.Views }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <h4 class="card-title mb-3">Community Guidelines</h4>
        <div class="list-group">
          <div class="list-group-item">
            <h6 class="mb-2">• Clear Titles</h6>
            <p class="text-muted small mb-0">Accurately summarize the main points, avoid vague expressions</p>
          </div>
          <div class="list-group-item">
            <h6 class="mb-2">• Content Standards</h6>
            <p class="text-muted small mb-0">Follow community rules, no inappropriate content allowed</p>
          </div>
          <div class="list-group-item">
            <h6 class="mb-2">• Clear Formatting</h6>
            <p class="text-muted small mb-0">Use paragraphs and Markdown formatting appropriately</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
