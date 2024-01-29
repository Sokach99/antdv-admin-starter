import { createRouter, createWebHashHistory } from 'vue-router'
import staticRoutes from './static-routes'

const router = createRouter({
  routes: [
    ...staticRoutes,
  ],
  history: createWebHashHistory(),
})

export default router
