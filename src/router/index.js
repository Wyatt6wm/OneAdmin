import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './public_routes'
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
        await store.dispatch('userLogin/getRoles')
      }

      // 如果还没有用户权限则查询服务器
      if (!store.getters.hasAuths) {
        await store.dispatch('userLogin/getAuths')
      }

      // 如果还没有用户信息则查询服务器
      if (!store.getters.hasProfile && !store.getters.gettingProfile) {
        store.dispatch('userLogin/getProfile')
      }

      // 如果路由表未准备好则更新路由表
      if (!store.getters.routesPrepared) {
        const dynamicRoutes = getDynamicRoutes(store.getters.auths)
        dynamicRoutes.forEach((route) => {
          router.addRoute(route)
        })
        await store.dispatch('common/setRoutesPreparedTrue')
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

export default router
