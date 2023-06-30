// 公开路由表（不需要权限的路由，每个用户都可以看见，看见的内容都一样）

import Login from '@/views/login'
import Layout from '@/layout'
import Profile from '@/views/profile'
import Err404 from '@/views/error-page/404'
import Err401 from '@/views/error-page/401'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/profile', // 路径/重定向到/profile
    component: Layout,
    children: [
      {
        path: '/profile',
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
        component: Err404,
        meta: {
          public: true
        }
      },
      {
        path: '/401',
        component: Err401,
        meta: {
          public: true
        }
      }
    ]
  }
]
