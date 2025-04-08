<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import SideBar from "@/components/SideBar.vue";

const router = useRouter()

// 表单数据
const newPost = ref({
  title: '',
  section: 'Winnie',
  content: '',
  UserID: localStorage.getItem("id"),
})

// 版块选项
const sections = ref([
  'Winnie',
  'Tigger',
  'Piglet',
  'Eeyore',
  'Rabbit',
  'Roo',
  'Owl',
  'Lumpy',
])

// 提交状态
const submitting = ref(false)
const generating = ref(false)

// OpenAI 生成内容
const generateContent = async () => {
  if (!newPost.value.title.trim()) return alert('请先输入标题')

  generating.value = true

  try {
    const response = await fetch('/api/ai/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: newPost.value.title,
        section: newPost.value.section
      })
    })

    if (!response.ok) throw new Error('生成失败')
    const data = await response.json()

    newPost.value.content = data.generatedContent
  } catch (error) {
    console.error('生成失败:', error)
    alert('内容生成失败，请手动输入')
  } finally {
    generating.value = false
  }
}

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
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="postTitle"
                    v-model="newPost.title"
                    placeholder="请输入标题（最多50字）"
                    maxlength="50"
                    required
                  >
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="generateContent"
                    :disabled="generating"
                  >
                    <span v-if="generating" class="spinner-border spinner-border-sm"></span>
                    {{ generating ? '生成中...' : 'AI生成' }}
                  </button>
                </div>
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
      <SideBar />
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
