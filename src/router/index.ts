// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/main',
    redirect: '/main/home',
  },
  {
    path: '/',
    redirect: '/main/home',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '@/views/main/Main.vue'),
        children: [
          {
            path: '/main/home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/home/Home.vue'),
          },
          {
            path: '/main/topic/:uid',
            component: () => import(/* webpackChunkName: "topic" */ '@/views/topic/Topic.vue')
          },
          {
            path: '/main/profile',
            component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/Profile.vue')
          }
        ]
      },
    ],
  },
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "topic" */ '@/components/HelloWorld.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
