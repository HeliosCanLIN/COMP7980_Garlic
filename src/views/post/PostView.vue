<script setup>
import {ref, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const fetchPost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (!response.ok) throw new Error('post not found');
  return response.json();
};

const fetchComments = async (postId, page = 1, pageSize = 10) => {
  const response = await fetch(
    `/api/posts/${postId}/comments?page=${page}&pageSize=${pageSize}`
  )
  if (!response.ok) {
    throw new Error(`加载评论失败: ${response.statusText}`)
  }
  return response.json();
}

const loading = ref({
  post: false,
  comments: false
})

const error = ref({});

const newComment = ref({
  content: '',
  replyTo: null, // 回复目标：null为主贴，数字为评论ID
  replyingToUser: null // 被回复的用户名
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
      "time": "626天前",
      "CreatedAt": "2023-07-20 10:30",
      "Content": "测试回复",
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
    loading.value.post = true
    post.value = await fetchPost(route.params.id)
  } catch (err) {
    handleError(err)
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


// 初始化加载
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadPost()
      loadComments(comments.value.currentPage)
    }
  },
  {immediate: true}
)

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

// 获取回复目标用户名
const getReplyTarget = (commentId) => {
  const target = comments.value.find(c => c.id === commentId)
  return target ? target.user : '未知用户'
}

// 处理回复按钮点击
const handleReply = (commentId, username) => {
  newComment.value.replyTo = commentId
  newComment.value.replyingToUser = username
  activeReplyId.value = commentId
  // 滚动到回复框
  document.querySelector('#comment-form')?.scrollIntoView({behavior: 'smooth'})
}

// 取消回复
const cancelReply = () => {
  newComment.value = {
    content: '',
    replyTo: null,
    replyingToUser: null
  }
  activeReplyId.value = null
}

// 提交评论
const submitComment = async () => {
  if (!newComment.value.content.trim()) return

  try {
    const commentData = {
      id: Date.now(),
      user: '当前用户', // 实际应从用户系统获取
      time: '刚刚',
      content: newComment.value.content,
      likes: 0,
      replyTo: newComment.value.replyTo
    }

    // 实际应调用API提交
    comments.value.unshift(commentData)

    // 更新主贴评论数
    post.value.comments++

    cancelReply()
  } catch (error) {
    console.error('提交评论失败:', error)
  }
}

</script>

<template>
  <div class="container mt-3">
    <div class="row g-4">
      <!-- 主内容区 -->
      <div class="col-md-8">
        <!-- 面包屑导航 -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">论坛首页</a></li>
            <li class="breadcrumb-item"><a href="#">科技板块</a></li>
            <li class="breadcrumb-item active" aria-current="page">当前帖子</li>
          </ol>
        </nav>

        <!-- 帖子主体 -->
        <article class="card mb-4" v-if="!loading.post">
          <div class="card-body">
            <h1 class="mb-3">{{ post.Title }}</h1>
            <div class="d-flex gap-2 text-muted mb-3">
              <span>作者：{{ post.Author }}</span>
              <span>•</span>
              <span>浏览：{{ post.Views }}</span>
              <span>•</span>
              <span>评论：{{ post.Comments }}</span>
            </div>
            <hr>
            <div class="post-body">
              {{ post.Content }}
            </div>
          </div>
        </article>

        <div v-if="loading.post" class="text-center my-3">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
        </div>

        <!-- 评论列表 -->
        <section class="mb-4" v-if="!loading.comments">
          <h3 class="mb-3">评论（{{ comments.total }}）</h3>
          <div v-for="comment in comments.data" :key="comment.id" class="card mb-3">
            <div class="card-body">
              <div class="d-flex gap-3">
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <h5 class="mb-0">{{ comment.UserName }}</h5>
                    <small class="text-muted">{{ comment.time }}</small>
                    <span class="badge bg-success ms-auto">+{{ comment.Likes }}</span>
                  </div>
                  <!-- 显示回复对象 -->
                  <div v-if="comment.replyTo" class="text-muted mb-2 small">
                    回复 @{{ getReplyTarget(comment.replyTo) }}
                  </div>
                  <p class="mb-2">{{ comment.Content }}</p>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary"
                            @click="handleReply(comment.CommentID, comment.UserName)">回复
                    </button>
                    <button class="btn btn-sm btn-outline-secondary">点赞</button>
                    <button class="btn btn-sm btn-outline-danger">没有</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div v-if="loading.comments" class="text-center my-3">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
        </div>

        <!-- 分页 -->
        <nav v-if="comments.totalPages > 1" aria-label="评论分页">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: comments.currentPage === 1 }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(comments.currentPage - 1)">上一页</a>
            </li>

            <template v-for="page in visiblePages" :key="page">
              <li class="page-item" :class="{ active: page === comments.currentPage }">
                <a class="page-link" href="#" @click.prevent="handlePageChange(page)">{{ page }}</a>
              </li>
            </template>

            <li class="page-item"
                :class="{ disabled: comments.currentPage === comments.totalPages }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(comments.currentPage + 1)">下一页</a>
            </li>
          </ul>
        </nav>

        <!-- 回复框 -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-3">
              {{ newComment.replyingToUser ? `回复 @${newComment.replyingToUser}` : '发表回复' }}
              <button v-if="newComment.replyingToUser" class="btn btn-danger" @click="cancelReply">
                取消
              </button>
            </h4>
            <textarea v-model="newComment.content" class="form-control mb-3" rows="4"
                      placeholder="请输入您的回复内容..."></textarea>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" @click="submitComment">发送</button>
              <button class="btn btn-outline-secondary">预览</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title mb-3">版块导航</h4>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action active">科技前沿</a>
              <a href="#" class="list-group-item list-group-item-action">数码产品</a>
              <a href="#" class="list-group-item list-group-item-action">软件开发</a>
            </div>

            <hr class="my-3">

            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action">我的帖子</a>
              <a href="#" class="list-group-item list-group-item-action">消息通知</a>
              <a href="#" class="list-group-item list-group-item-action">论坛帮助</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-3">热门话题</h4>
            <div class="list-group">
              <a href="#"
                 class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                量子计算机新突破
                <span class="badge bg-primary rounded-pill">128</span>
              </a>
              <a href="#"
                 class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                自动驾驶安全讨论
                <span class="badge bg-primary rounded-pill">96</span>
              </a>
              <a href="#"
                 class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                元宇宙未来发展
                <span class="badge bg-primary rounded-pill">75</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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
