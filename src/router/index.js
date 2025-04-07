import { createRouter, createWebHistory } from 'vue-router'
import IndexView from "@/views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
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
      path: '/profile',
      name: 'profile',

      component: () => import('../views/user/ProfileView.vue'),

    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('@/views/post/PostView.vue'),
      props: (route) => ({
        id: route.params.id,
        page: Number(route.query.page) || 1
      }),
    },
    {
      path: '/Error',
      name: 'Error',

      component: () => import('../views/Error/RouterError.vue'),
    },
    {
      path:'/Section',
      name: 'Section',

      component: () => import('../views/post/SectionView.vue'),
    }
  ],
})

export default router
