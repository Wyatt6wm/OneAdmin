import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './public_routes'
import privateRoutes from './private_routes'
import store from '@/store'
import { isTokenTimeout } from '@/utils/token'
import { ElMessage } from 'element-plus'

// ---------- 路由配置 ----------

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes] // 数组合并
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
  if (store.getters.token && !isTokenTimeout()) {
    // 1、若用户已登录（有token），不允许进入/login
    if (to.path === '/login') {
      next('/')
    } else {
      // （登录后或者……）判断用户信息是否已存在，如果不存在，则先获取用户信息
      if (!store.getters.hasProfile) {
        await store.dispatch('common/getProfile')
      }
      next()
    }
  } else {
    if (store.getters.token && isTokenTimeout()) {
      store.dispatch('common/logout')
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
