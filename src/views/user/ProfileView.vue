<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const username = ref('');
const postCount = ref(0);
const commentCount = ref(0);
const likeCount = ref(0);
const beLiked = ref(0);
const options = ref({labels: ['Likes', 'Liked by']});
const optionsPost = ref({labels: ['Post', 'Comments']});
const series = ref({});
const seriesPost = ref({});
const pieTitle=ref("Distribution of Likes");

onMounted(async () => {
  username.value = localStorage.getItem('username');
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const response = await fetch('/api/users/userStat', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({id: id})
  });
  if (!response.ok) {
    await router.push("/");
  } else {
    const data = await response.json();
    postCount.value = data.postCount;
    commentCount.value = data.commentCount;
    likeCount.value = data.likeCount;
    beLiked.value = data.beLiked;
    series.value = [likeCount.value, beLiked.value];
    seriesPost.value = [postCount.value, commentCount.value];
    console.log(series);
    console.log(series.value);
  }
})

const deleteAccount = async () => {
  let id = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  const response = await fetch('/api/users/deleteAcc/', {
    method: 'POST',
    headers: {"Content-Type": "application/json", "authorization": `Bearer ${token}`},
    body: JSON.stringify({id: id})
  })

  if (response.ok) {
    alert("Delete successfully.See ya")
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    await router.push('/');
    location.reload();
  } else {
    alert("Account delete failed, please try later");
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="text-center mb-4">
      <h1 class="display-4">{{ username }}</h1>
      <h2>Profile</h2>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">发帖数</h5>
            <div class="card">
              <p class="card-text">{{ postCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">回帖数</h5>
            <div class="card">
              <p class="card-text">{{ commentCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">获赞数</h5>
            <div class="card">
              <p class="card-text">{{ beLiked }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">点赞数</h5>
            <div class="card">
              <p class="card-text">{{ likeCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" style="margin: 20px">
        <button class="btn btn-danger" @click="deleteAccount">DELETE ACCOUNT</button>
      </div>
    </div>
    <div class="row">
      <div id="chart" class="text-center" style="display: flex;justify-content: center;">
        <apexchart type="donut" :options="options" :series="series" :title="pieTitle" style="width: 250px" />
        <apexchart type="donut" :options="optionsPost" :series="seriesPost" :title="pieTitle" style="width: 250px" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
