<script setup>
import {ref, watch, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const fetchPost = async (id) => {
  const response = await fetch(`/api/posts/${id}`);
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

  const {data, total} = await response.json()

  return {
    data,
    total
  }
}

const loading = ref({
  post: false,
  comments: false
})

const error = ref(null);

const post = ref({
  title: '【讨论】大家如何看待最新的人工智能发展？',
  author: '科技爱好者',
  date: '2023-07-20 10:30',
  content: `近年来，人工智能技术突飞猛进...`,
  views: 2456,
  comments: 18
})

const comments = ref([
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  {
    id: 1,
    user: 'AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: '从技术角度来说...',
    likes: 12
  },
  // 更多评论...
])

const pagination = ref({
  currentPage: parseInt(route.query.page) || 1, // 从路由参数初始化
  totalPages: 4,
  pageSize: 5
})

// 加载帖子内容
const loadPost = async () => {
  try {
    loading.value.post = true
    post.value = await fetchPost(route.params.id)
  } catch (err) {
    handleError(err)
  } finally {
    // loading.value.post = false
    //演示数据
  }
}

// 加载评论
const loadComments = async (page = pagination.value.currentPage) => {
  try {
    loading.value.comments = true
    const { data, total } = await fetchComments(
      route.params.id,
      page,
      pagination.value.pageSize
    )

    comments.value = data
    pagination.value.totalPages = Math.ceil(total / pagination.value.pageSize)

    // 确保当前页不超过总页数
    if (page > pagination.value.totalPages) {
      pagination.value.currentPage = pagination.value.totalPages
      return handlePageChange(pagination.value.totalPages)
    }
  } catch (err) {
    handleError(err)
  } finally {
    loading.value.comments = false
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
  if (newPage < 1 || newPage > pagination.value.totalPages) return

  // 更新路由参数
  router.push({
    query: { ...route.query, page: newPage }
  })

  // 立即更新当前页
  pagination.value.currentPage = newPage
}

// 生成页码范围（显示当前页前后2页）
const visiblePages = computed(() => {
  const current = pagination.value.currentPage
  const total = pagination.value.totalPages
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
      // loadComments(pagination.value.currentPage)
    }
  },
  {immediate: true}
)

// 监听页码变化
watch(
  () => route.query.page,
  (newPage) => {
    const page = parseInt(newPage) || 1
    if (page !== pagination.value.currentPage) {
      pagination.value.currentPage = page
      loadComments(page)
    }
  },
  { immediate: true }
)
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
        <article class="card mb-4">
          <div class="card-body">
            <h1 class="mb-3">{{ post.title }}</h1>
            <div class="d-flex gap-2 text-muted mb-3">
              <span>作者：{{ post.author }}</span>
              <span>•</span>
              <span>{{ post.date }}</span>
              <span>•</span>
              <span>浏览：{{ post.views }}</span>
              <span>•</span>
              <span>评论：{{ post.comments }}</span>
            </div>
            <hr>
            <div class="post-body">
              {{ post.content }}
            </div>
          </div>
        </article>

        <!-- 评论列表 -->
        <section class="mb-4">
          <h3 class="mb-3">评论（{{ comments.length }}）</h3>
          <div v-for="comment in comments" :key="comment.id" class="card mb-3">
            <div class="card-body">
              <div class="d-flex gap-3">
                <img :src="comment.avatar" class="rounded-circle" width="40" height="40" alt="头像">
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <h5 class="mb-0">{{ comment.user }}</h5>
                    <small class="text-muted">{{ comment.time }}</small>
                    <span class="badge bg-success ms-auto">+{{ comment.likes }}</span>
                  </div>
                  <p class="mb-2">{{ comment.content }}</p>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">回复</button>
                    <button class="btn btn-sm btn-outline-secondary">点赞</button>
                    <button class="btn btn-sm btn-outline-danger">举报</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 分页 -->
        <nav v-if="pagination.totalPages > 1" aria-label="评论分页">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(pagination.currentPage - 1)">上一页</a>
            </li>

            <template v-for="page in visiblePages" :key="page">
              <li class="page-item" :class="{ active: page === pagination.currentPage }">
                <a class="page-link" href="#" @click.prevent="handlePageChange(page)">{{ page }}</a>
              </li>
            </template>

            <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.totalPages }">
              <a class="page-link" href="#"
                 @click.prevent="handlePageChange(pagination.currentPage + 1)">下一页</a>
            </li>
          </ul>
        </nav>

        <!-- 回复框 -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-3">发表回复</h4>
            <textarea v-model="newComment" class="form-control mb-3" rows="4"
                      placeholder="请输入您的回复内容..."></textarea>
            <div class="d-flex gap-2">
              <button class="btn btn-primary">提交回复</button>
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

      <!-- 加载状态 -->
      <div v-if="loading.comments" class="text-center my-3">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">加载中...</span>
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
