// 公开路由表（不需要权限的路由，每个用户都可以看见，看见的内容都一样）

import Login from '@/views/login'
import Layout from '@/layout'
import Profile from '@/views/profile'
import Err404 from '@/views/error-page/404'
import Err401 from '@/views/error-page/401'

export const publicRouteNames = ['login', 'index', 'profile', 'err404', 'err401']

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/profile', // 路径/重定向到/profile
    name: 'index',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
          public: true,
          isMenu: true,
          isBreadcrumb: true,
          title: '个人主页',
          icon: 'el-icon-house'
        }
      },
      {
        path: '/404',
        name: 'err404',
        component: Err404,
        meta: {
          public: true
        }
      },
      {
        path: '/401',
        name: 'err401',
        component: Err401,
        meta: {
          public: true
        }
      }
    ]
  }
]
