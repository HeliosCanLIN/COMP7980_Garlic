<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from "@/components/SideBar.vue";

const router = useRouter()

// Form data
const newPost = ref({
  title: '',
  section: 'Winnie',
  content: '',
  UserID: localStorage.getItem("id"),
})

// Section options
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

// Submission status
const submitting = ref(false)
const generating = ref(false)

// OpenAI content generation
const generateContent = async () => {
  if (!newPost.value.title.trim()) return alert('Please enter a title first.')

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

    if (!response.ok) throw new Error('Generation failed.')
    const data = await response.json()

    newPost.value.content = data.generatedContent
  } catch (error) {
    console.error('Generation failed:', error)
    alert('Content generation failed, please enter manually.')
  } finally {
    generating.value = false
  }
}

// Form submission
const submitPost = async () => {
  if (!newPost.value.title.trim() || !newPost.value.content.trim()) {
    return alert('Title and content cannot be empty.')
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

    if (!response.ok) throw new Error('Submission failed.')

    router.push('/') // Redirect to forum homepage
  } catch (error) {
    console.error('Post failed:', error)
    alert('Post failed, please try again later.')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="container mt-3">
    <div class="row g-4">
      <!-- Main content area -->
      <div class="col-md-8">
        <!-- Breadcrumb navigation -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Forum Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Create New Post</li>
          </ol>
        </nav>

        <!-- Post creation form -->
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-4">Create New Topic</h3>

            <form @submit.prevent="submitPost">
              <!-- Title input -->
              <div class="mb-3">
                <label for="postTitle" class="form-label">Title</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="postTitle"
                    v-model="newPost.title"
                    placeholder="Enter title (up to 50 characters)"
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
                    {{ generating ? 'Generating...' : 'Generate with AI' }}
                  </button>
                </div>
              </div>

              <!-- Section selection -->
              <div class="mb-3">
                <label for="postSection" class="form-label">Select Section</label>
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

              <!-- Content input -->
              <div class="mb-4">
                <label for="postContent" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="postContent"
                  v-model="newPost.content"
                  rows="12"
                  placeholder="Enter content (supports Markdown syntax)"
                  required
                ></textarea>
              </div>

              <!-- Action buttons -->
              <div class="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="router.go(-1)"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="submitting"
                >
                  <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                  {{ submitting ? 'Submitting...' : 'Post Topic' }}
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
