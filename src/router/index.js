import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/SignUp',
      name: 'SignUp',

      component: () => import('../views/user/SignUpView.vue'),
    },
    {
      path: '/SignIn',
      name: 'SignIn',

      component: () => import('../views/user/SignInView.vue'),
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',

      component: () => import('../views/user/ChangePasswordView.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('@/views/post/PostView.vue'),
      props: (route) => ({
        id: route.params.id,
        page: Number(route.query.page) || 1
      }),
    }
  ],
})

export default router
