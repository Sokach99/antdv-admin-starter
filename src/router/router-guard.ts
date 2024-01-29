import { AxiosError } from 'axios'
import NProgress from 'nprogress'
import router from '@/router'
import { setRouteEmitter } from '@/utils/route-listener'
import { useAuthorization } from '@/hooks/authorization'
import { useUserStore } from '@/stores/user'

const allowList = ['/login', '/error', '/401', '/404', '/403']
const loginPath = '/login'

router.beforeEach(async (to, _, next) => {
  NProgress.start()
  setRouteEmitter(to)
  // 获取
  const userStore = useUserStore()
  const token = useAuthorization()
  if (!token.value) {
    //  如果token不存在就跳转到登录页面
    if (!allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      next({
        path: loginPath,
        query: {
          redirect: encodeURIComponent(to.fullPath),
        },
      })
      return
    }
  }
  else {
    if (!userStore.userInfo && !allowList.includes(to.path) && !to.path.startsWith('/redirect')) {
      try {
        // 获取用户信息
        await userStore.getUserInfo()
        // 获取路由菜单的信息
        // const currentRoute = await userStore.generateDynamicRoutes()
        // router.addRoute([])
        next({
          ...to,
          replace: true,
        })
        return
      }
      catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          // 跳转到error页面
          next({
            path: '/401',
          })
        }
      }
    }
    else {
      // 如果当前是登录页面就跳转到首页
      if (to.path === loginPath) {
        next({
          path: '/',
        })
        return
      }
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
