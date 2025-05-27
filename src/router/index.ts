  import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
