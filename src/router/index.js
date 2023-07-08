import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes, { publicRouteNames } from './public_routes'
import store from '@/store'
import { isTokenExpired } from '@/utils/token'
import { ElMessage } from 'element-plus'
import { getDynamicRoutes, checkRouteAuth } from '@/utils/routes'

// ---------- 路由配置 ----------

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

// ---------- 路由权限控制 ----------

// 白名单（用户未登录时也能有权限进入的页面）
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到那里去
 * @param {*} from 从哪里来
 * @param {*} next 是否要去？
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token && !isTokenExpired()) {
    // 1、若用户已登录（有token），不允许进入/login
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果还没有用户角色则查询服务器
      if (!store.getters.hasRoles) {
        await store.dispatch('userLogin/getRolesOfUser')
      }

      // 如果还没有用户权限则查询服务器
      if (!store.getters.hasAuths) {
        await store.dispatch('userLogin/getAuthsOfUser')
        await store.dispatch('common/setRoutesPreparedFalse')
      }

      // 如果还没有用户信息则查询服务器
      if (!store.getters.hasProfile && !store.getters.gettingProfile) {
        store.dispatch('userLogin/getProfile')
      }

      // 如果路由表未准备好则更新路由表
      if (!store.getters.routesPrepared) {
        console.log('Update routes.')
        const dynamicRoutes = getDynamicRoutes(store.getters.auths)
        dynamicRoutes.forEach((route) => {
          if (!router.hasRoute(route.name)) {
            router.addRoute(route)
          }
        })
        store.dispatch('common/setRoutesPreparedTrue')
        // 添加完动态路由之后，需要再进行一次主动跳转
        return next(to.path)
      }

      // 检查用户是否有权限访问当前的非公共路由
      if (!to.meta.public) {
        if (!checkRouteAuth(store.getters.auths, to.name)) {
          return next('/401')
        }
      }

      next()
    }
  } else {
    if (store.getters.token && isTokenExpired()) {
      store.dispatch('userLogin/logout')
      ElMessage.error('登录超时')
    }
    // 2、若用户未登录（无token或token超时），只能进入/login或其他白名单里面的页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

/**
 * 初始化路由表，只加载公共路由，防止切换用户后路由表未更新
 */
export const initRoutes = () => {
  console.log('initRoutes()')
  const currRoutes = router.getRoutes()
  if (currRoutes) {
    currRoutes.forEach((item) => {
      if (router.hasRoute(item.name) && !publicRouteNames.includes(item.name)) {
        router.removeRoute(item.name)
      }
    })
  }
  // 最后加上不匹配场景的路由
  router.addRoute({
    path: '/:catchAll(.*)',
    redirect: '/404',
    name: 'notMatch'
  })
}

export default router
