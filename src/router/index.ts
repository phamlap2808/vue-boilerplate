  import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'
import DashboardLayout from '@/layouts/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      layout: DashboardLayout,
    },
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
    meta: {
      layout: 'default',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
