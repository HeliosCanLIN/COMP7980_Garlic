<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const newPost = ref({
  title: '',
  section: '小熊维尼',
  content: '',
  UserID: localStorage.getItem("id"),
})

// 版块选项
const sections = ref([
  '小熊维尼',
  '跳跳虎',
  '玲娜贝儿',
  '星黛露',
  '杰拉多尼',
  '可琦安'
])

// 提交状态
const submitting = ref(false)

// 表单提交
const submitPost = async () => {
  if (!newPost.value.title.trim() || !newPost.value.content.trim()) {
    return alert('标题和内容不能为空')
  }

  submitting.value = true

  try {
    const response = await fetch('/api/posts/createpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newPost.value)
    })

    if (!response.ok) throw new Error('提交失败')

    router.push('/') // 跳转到论坛首页
  } catch (error) {
    console.error('发帖失败:', error)
    alert('发帖失败，请稍后重试')
  } finally {
    submitting.value = false
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
            <li class="breadcrumb-item active" aria-current="page">发表新帖</li>
          </ol>
        </nav>

        <!-- 发帖表单 -->
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-4">发表新主题</h3>

            <form @submit.prevent="submitPost">
              <!-- 标题输入 -->
              <div class="mb-3">
                <label for="postTitle" class="form-label">标题</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  id="postTitle"
                  v-model="newPost.title"
                  placeholder="请输入标题（最多50字）"
                  maxlength="50"
                  required
                >
              </div>

              <!-- 版块选择 -->
              <div class="mb-3">
                <label for="postSection" class="form-label">选择版块</label>
                <select
                  class="form-select"
                  id="postSection"
                  v-model="newPost.section"
                >
                  <option v-for="section in sections" :key="section" :value="section">
                    {{ section }}
                  </option>
                </select>
              </div>

              <!-- 内容输入 -->
              <div class="mb-4">
                <label for="postContent" class="form-label">内容</label>
                <textarea
                  class="form-control"
                  id="postContent"
                  v-model="newPost.content"
                  rows="12"
                  placeholder="请输入内容（支持Markdown语法）"
                  required
                ></textarea>
              </div>

              <!-- 操作按钮 -->
              <div class="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="router.go(-1)"
                >
                  取消
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="submitting"
                >
                  <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                  {{ submitting ? '提交中...' : '发布主题' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- 侧边栏（保持与原页面一致） -->
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
            <h4 class="card-title mb-3">发帖指南</h4>
            <div class="list-group">
              <div class="list-group-item">
                <h6 class="mb-2">• 标题明确</h6>
                <p class="text-muted small mb-0">准确概括内容要点，避免使用模糊表述</p>
              </div>
              <div class="list-group-item">
                <h6 class="mb-2">• 内容规范</h6>
                <p class="text-muted small mb-0">遵守社区规则，禁止发布不当内容</p>
              </div>
              <div class="list-group-item">
                <h6 class="mb-2">• 格式清晰</h6>
                <p class="text-muted small mb-0">合理使用段落和Markdown格式</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control-lg {
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
}

.form-select {
  padding: 0.75rem 2.25rem 0.75rem 1rem;
}

textarea.form-control {
  min-height: 300px;
  line-height: 1.6;
}
</style>
