<script setup>
import {ref, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import SideBar from "@/components/SideBar.vue";

const route = useRoute()
const router = useRouter()

const postOK = ref(false)
const postNotFound = ref(false)
const postDeleted = ref(false)
const loading = ref({ post: false, comments: false })
const error = ref({})
const userId = ref(localStorage.getItem('id')); // 获取当前用户ID

const fetchPost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
  if (!response.ok) {                // 响应非 200 时处理错误
    const errorData = await response.json(); // 解析错误信息
    throw new Error(errorData.error); // 抛出后端返回的具体错误描述
  }
  return response.json();
};

const fetchComments = async (postId, page = 1, pageSize = 10) => {
  const response = await fetch(
    `/api/posts/${postId}/comments?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }
  )
  if (!response.ok) {
    throw new Error(`加载评论失败: ${response.statusText}`)
  }
  return response.json();
}

const newComment = ref({
  Content: '',
  replyTo: null, // 回复目标：null为主贴，数字为评论ID
  replyToUserID: null, // 被回复的用户名
  UserID: localStorage.getItem("id"),
})

const activeReplyId = ref(null) // 当前正在回复的评论ID

const post = ref({
  PostID: 1,
  AuthorID: 10000,
  Title: "测试标题",
  Content: "测试内容",
  Author: "测试工程师",
  CreatedAt: "2023-07-20 10:30",
  Section: "小熊维尼",
  Views: 2456,
  Comments: 20
})

const comments = ref({
  "data": [
    {
      "CommentID": 1,
      "PostID": 1,
      "UserID": 1,
      "UserName": "测试工程师",
      "time": "刚刚",
      "CreatedAt": "2023-07-20 10:30",
      "Content": "测试内容",
      "Likes": 34,
      "id": "1"
    }
  ],
  "total": parseInt(route.query.page) || 1,
  "currentPage": 1,
  "totalPages": 1
})

// 加载帖子内容
const loadPost = async () => {
  try {
    postOK.value = false
    postNotFound.value = false
    postDeleted.value = false
    loading.value.post = true
    post.value = await fetchPost(route.params.id)
    postOK.value = true
  } catch (err) {
    postOK.value = false
    if (err.message === 'post not found') {
      postNotFound.value = true
    } else if (err.message === 'post deleted') {
      postDeleted.value = true
    } else {
      handleError(err)
    }
  } finally {
    loading.value.post = false
  }
}

// 加载评论
const loadComments = async (page = comments.value.currentPage) => {
  try {
    loading.value.comments = true

    comments.value = await fetchComments(
      route.params.id,
      page,
      5
    )

  } catch (err) {
    handleError(err)
  } finally {
    loading.value.comments = false
    //演示数据
  }
}

// 错误处理
const handleError = (error) => {
  error.value = {
    message: error.message,
    code: error.code || 500
  }
}

// 页码改变处理器
const handlePageChange = (newPage) => {
  if (newPage < 1 || newPage > comments.value.totalPages) return

  // 更新路由参数
  router.push({
    query: {...route.query, page: newPage}
  })

  // 立即更新当前页
  comments.value.currentPage = newPage
}

// 生成页码范围（显示当前页前后2页）
const visiblePages = computed(() => {
  const current = comments.value.currentPage
  const total = comments.value.totalPages
  const range = 2 // 显示前后2页
  const pages = []

  let start = Math.max(1, current - range)
  let end = Math.min(total, current + range)

  // 确保显示足够的页码数
  if (current - 1 < range) {
    end = Math.min(total, end + (range - (current - 1)))
  }
  if (total - current < range) {
    start = Math.max(1, start - (range - (total - current)))
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 处理回复按钮点击
const handleReply = (commentId, userId, userName) => {
  newComment.value.UserName = userName
  newComment.value.replyTo = commentId
  newComment.value.replyToUserID = userId
  activeReplyId.value = commentId
  // 滚动到回复框
  document.querySelector('#comment-form')?.scrollIntoView({behavior: 'smooth'})
}

// 取消回复
const cancelReply = () => {
  newComment.value = {
    Content: '',
    replyTo: null,
    replyToUser: null,
    UserID: localStorage.getItem("id"),
  }
  activeReplyId.value = null
}

// 提交评论
const submitComment = async () => {
  if (!newComment.value.Content.trim()) return

  try {
    console.log(newComment.value)
    const response = await fetch(`/api/posts/${route.params.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newComment.value)
    })

    if (!response.ok) throw new Error('提交失败')

    // 重新加载评论列表（简单实现）
    await loadComments(comments.value.currentPage)

    // 清空表单
    cancelReply()

  } catch (error) {
    console.error('提交评论失败:', error)
  }
}

// 点赞
const like = async (PostID, CommentID, Type) => {
  try {
    const response = await fetch(`/api/like/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        UserID: localStorage.getItem('id'),
        PostID: PostID,
        CommentID: CommentID,
        Type: Type,
      })
    })

    if (!response.ok) throw new Error('点赞失败')

    // 重新加载评论列表（简单实现）
    if (Type == 'Post') {
      await loadPost()
    }
    if (Type == 'Comment') {
      await loadComments(comments.value.currentPage)
    }

  } catch (error) {
    console.error('点赞失败:', error)
  }
}

//删帖
const deletePost = async (PostID) => {
  try {
    const response = await fetch(`/api/posts/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        PostID: PostID,
      })
    })
    if (!response.ok) throw new Error('删除失败')
    window.location.reload()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

loadPost()
loadComments(comments.value.currentPage)

// // 初始化加载
// watch(
//   () => route.params.id,
//   (newId) => {
//     if (newId) {
//       loadPost()
//       if (postOK.value){
//         loadComments(comments.value.currentPage)
//       }
//     }
//   },
//   {immediate: true}
// )

// 监听页码变化
watch(
  () => route.query.page,
  (newPage) => {
    const page = parseInt(newPage) || 1
    if (page !== comments.value.currentPage) {
      comments.value.currentPage = page
      loadComments(page)
    }
  },
  {immediate: true}
)
</script>

<template>
  <div class="container mt-3">
    <div class="row g-4" v-if="postOK">
      <!-- Main Content -->
      <div class="col-md-8">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Forum Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              <a :href="`/Section?section=${post.Section}`">{{ post.Section }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ post.Title }}</li>
          </ol>
        </nav>

        <!-- Post Body -->
        <article class="card mb-4" v-if="!loading.post">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-2">
              <h1 class="mb-3">{{ post.Title }}</h1>
              <button class="btn btn-sm btn-outline-secondary badge bg-success ms-auto"
                      @click="like(post.PostID, null,'Post')">
                Like +{{ post.Likes || 0 }}
              </button>
            </div>
            <div class="d-flex gap-2 text-muted mb-3">
              <span>Author: {{ post.Author }}</span>
              <span>•</span>
              <span>Views: {{ post.Views }}</span>
              <span>•</span>
              <span>Comments: {{ post.Comments }}</span>
              <button v-if="post.AuthorID === userId"
                      class="btn btn-sm btn-outline-danger ms-auto"
                      @click="deletePost(post.PostID)">
                Delete
              </button>
            </div>
            <hr>
            <div class="post-body">
              {{ post.Content }}
            </div>
          </div>
        </article>

        <div v-if="loading.post" class="text-center my-3">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- Comments Section -->
        <section class="mb-4" v-if="!loading.comments">
          <h3 class="mb-3">Comments ({{ comments.total }})</h3>
          <div v-for="comment in comments.data" :key="comment.id" class="card mb-3">
            <div class="card-body">
              <div class="d-flex gap-3">
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <h5 class="mb-0">{{ comment.UserName }}</h5>
                    <small class="text-muted">{{ comment.time }}</small>
                    <span class="badge bg-success ms-auto">+{{ comment.Likes }}</span>
                  </div>
                  <div v-if="comment.ReplyToUserID != null" class="text-muted mb-2 small">
                    Reply to @{{ comment.ReplyToUserName }}
                  </div>
                  <p class="mb-2">{{ comment.Content }}</p>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary"
                            @click="handleReply(comment.CommentID, comment.UserID,comment.UserName)">
                      Reply
                    </button>
                    <button class="btn btn-sm btn-outline-secondary"
                            @click="like(comment.PostID,comment.CommentID,'Comment')">
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div v-if="loading.comments" class="text-center my-3">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <!-- Pagination -->
        <nav v-if="comments.totalPages > 1" aria-label="Comments pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: comments.currentPage === 1 }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(comments.currentPage - 1)">Previous</a>
            </li>

            <template v-for="page in visiblePages" :key="page">
              <li class="page-item" :class="{ active: page === comments.currentPage }">
                <a class="page-link" href="#" @click.prevent="handlePageChange(page)">{{ page }}</a>
              </li>
            </template>

            <li class="page-item"
                :class="{ disabled: comments.currentPage === comments.totalPages }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(comments.currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>

        <!-- Comment Form -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-3">
              {{ newComment.UserName ? `Reply to @${newComment.UserName}` : 'Post a Reply' }}
              <button v-if="newComment.replyToUser" class="btn btn-danger" @click="cancelReply">
                Cancel
              </button>
            </h4>
            <textarea v-model="newComment.Content" class="form-control mb-3" rows="4"
                      placeholder="Please enter your reply..."></textarea>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" @click="submitComment">Submit</button>
              <button class="btn btn-outline-secondary">Preview</button>
            </div>
          </div>
        </div>
      </div>

      <SideBar/>

    </div>
    <div v-if="postNotFound" class="col-12 d-flex justify-content-center align-items-center"
         style="height: 70vh;">
      <h3 class="text-muted">Invalid post ID</h3>
    </div>
    <div v-if="postDeleted" class="col-12 d-flex justify-content-center align-items-center"
         style="height: 70vh;">
      <h3 class="text-muted">Post has been deleted</h3>
    </div>
  </div>
</template>


<style scoped>
.post-body {
  line-height: 1.8;
  font-size: 1.1rem;
}

.breadcrumb {
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
}

.comment-card {
  transition: box-shadow 0.2s;
}

.comment-card:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
