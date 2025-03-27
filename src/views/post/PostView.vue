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

const error = ref({});

const newComment = ref({
  content: '',
  replyTo: null, // 回复目标：null为主贴，数字为评论ID
  replyingToUser: null // 被回复的用户名
})

const activeReplyId = ref(null) // 当前正在回复的评论ID

const post = ref({
  title: '【讨论】大家如何看待最新的人工智能发展？',
  author: '科技观察者',
  date: '2023-07-20 10:30',
  content: `近年来，人工智能技术突飞猛进，特别是在自然语言处理和计算机视觉领域取得了突破性进展。以GPT-4为代表的大模型展现了惊人的文本生成能力，而自动驾驶技术也在逐步走向商业化应用。然而，随之而来的伦理问题和社会影响也引发了广泛讨论。例如，AI在取代传统工作岗位的同时，是否创造了新的就业机会？医疗诊断中AI的准确性能否完全替代人类医生？这些问题的答案或许将决定AI技术的未来发展走向。`,
  views: 2456,
  comments: 20
})

const comments = ref([
  {
    id: 1,
    user: '算法工程师',
    avatar: 'https://via.placeholder.com/40',
    time: '2小时前',
    content: '当前Transformer架构的优化空间越来越小，混合专家系统(MoE)可能是下一代大模型的突破口',
    likes: 34
  },
  {
    id: 2,
    user: '教育科技从业者',
    avatar: 'https://via.placeholder.com/40',
    time: '1小时前',
    content: 'AI自适应学习系统已经能实现85%的个性化教学，但情感交互仍是机器难以跨越的鸿沟',
    likes: 28
  },
  {
    id: 3,
    user: '医疗AI研究员',
    avatar: 'https://via.placeholder.com/40',
    time: '50分钟前',
    content: '我们的医学影像诊断AI在乳腺癌检测上的准确率已达96%，但临床落地仍面临法规障碍',
    likes: 41
  },
  {
    id: 4,
    user: '伦理学者',
    avatar: 'https://via.placeholder.com/40',
    time: '45分钟前',
    content: '亟需建立AI伦理审查制度，深度伪造技术带来的社会风险正在指数级增长',
    likes: 55
  },
  {
    id: 5,
    user: '创业者小王',
    avatar: 'https://via.placeholder.com/40',
    time: '40分钟前',
    content: 'AI客服系统帮我们节省了60%的人力成本，但客户对完全机器应答的接受度只有70%左右',
    likes: 19
  },
  {
    id: 6,
    user: '法律顾问',
    avatar: 'https://via.placeholder.com/40',
    time: '35分钟前',
    content: 'AI生成内容的著作权归属问题将成为未来五年知识产权领域的主要争议点',
    likes: 27
  },
  {
    id: 7,
    user: 'UX设计师',
    avatar: 'https://via.placeholder.com/40',
    time: '30分钟前',
    content: 'AI辅助设计工具大大提升了原型制作速度，但创意独特性的评判标准需要重新定义',
    likes: 15
  },
  {
    id: 8,
    user: '金融分析师',
    avatar: 'https://via.placeholder.com/40',
    time: '25分钟前',
    content: '量化交易AI已经能处理百万级市场变量，但黑天鹅事件的预测仍是难题',
    likes: 33
  },
  {
    id: 9,
    user: '自动驾驶测试员',
    avatar: 'https://via.placeholder.com/40',
    time: '20分钟前',
    content: 'L4级自动驾驶在高速公路场景已趋成熟，但复杂城市路况的突发处理仍需改进',
    likes: 47
  },
  {
    id: 10,
    user: 'AI艺术创作者',
    avatar: 'https://via.placeholder.com/40',
    time: '15分钟前',
    content: 'Stable Diffusion等工具正在重塑创作流程，但算法偏见导致的文化单一化值得警惕',
    likes: 62
  },
  {
    id: 11,
    user: '人力资源总监',
    avatar: 'https://via.placeholder.com/40',
    time: '12分钟前',
    content: 'AI面试官的使用率三年增长400%，但我们发现它对非语言沟通的评估仍有局限',
    likes: 23
  },
  {
    id: 12,
    user: '农业科技专家',
    avatar: 'https://via.placeholder.com/40',
    time: '10分钟前',
    content: '智能温室系统使作物产量提升30%，但初期投入成本仍是推广的主要障碍',
    likes: 18
  },
  {
    id: 13,
    user: '语言学教授',
    avatar: 'https://via.placeholder.com/40',
    time: '8分钟前',
    content: '大语言模型正在改变语言演化进程，网络流行语的产生速度比过去快了5倍',
    likes: 29
  },
  {
    id: 14,
    user: '制造业经理',
    avatar: 'https://via.placeholder.com/40',
    time: '5分钟前',
    content: '工业质检AI将产品缺陷检测时间从2小时缩短到5分钟，但设备联网的安全风险需要重视',
    likes: 37
  },
  {
    id: 15,
    user: '心理咨询师',
    avatar: 'https://via.placeholder.com/40',
    time: '3分钟前',
    content: 'AI心理疏导机器人在抑郁倾向早期识别准确率达82%，但情感共鸣能力仍无法替代人类',
    likes: 44
  }
])

const pagination = ref({
  currentPage: parseInt(route.query.page) || 1, // 从路由参数初始化
  totalPages: 3,
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
  document.querySelector('#comment-form')?.scrollIntoView({ behavior: 'smooth' })
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
      avatar: 'https://via.placeholder.com/40',
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
                  <!-- 显示回复对象 -->
                  <div v-if="comment.replyTo" class="text-muted mb-2 small">
                    回复 @{{ getReplyTarget(comment.replyTo) }}
                  </div>
                  <p class="mb-2">{{ comment.content }}</p>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary" @click="handleReply(comment.id, comment.user)">回复</button>
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
            <h4 class="card-title mb-3">{{ newComment.replyingToUser ? `回复 @${newComment.replyingToUser}` : '发表回复' }}
              <button v-if="newComment.replyingToUser" class="btn btn-danger" @click="cancelReply">取消</button>
            </h4>
            <textarea v-model="newComment.content" class="form-control mb-3" rows="4" placeholder="请输入您的回复内容..."></textarea>
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
