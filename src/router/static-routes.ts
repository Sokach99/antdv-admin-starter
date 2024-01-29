import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

// 静态路由
export default [
  {
    path: '/login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {

    path: '/:pathMatch(.*)',
    meta: {
      title: '找不到页面',
    },
    component: () => import('@/pages/exception/404.vue'),
  },
] as RouteRecordRaw[]

// 根路由
export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: '/dashboard',
  component: Layout,
  children: [],
}
