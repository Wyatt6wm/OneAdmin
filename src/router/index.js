import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    // redirect: '/profile', // 路径/重定向到/profile
    component: Layout,
    children: [
      {
        path: '/profile',
        // component: Profile,
        meta: {
          isMenu: true,
          isBreadcrumb: true,
          title: '个人主页',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404'
        // component: Err404
      },
      {
        path: '/401'
        // component: Err401
      }
    ]
  },
  {
    path: '/user',
    // redirect: '/user/manage',
    component: Layout,
    meta: {
      isMenu: true,
      isBreadcrumb: true,
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        // component: UaerManage,
        meta: {
          isMenu: true,
          isBreadcrumb: true,
          title: '用户管理'
        },
        children: [
          {
            path: '/user/role',
            // component: RoleList,
            meta: {
              isMenu: true,
              isBreadcrumb: true,
              title: '角色列表'
            }
          },
          {
            path: '/user/permission',
            // component: PermissionList,
            meta: {
              isMenu: true,
              isBreadcrumb: true,
              title: '权限列表'
            }
          }
        ]
      },
      {
        path: '/user/info/:id', // 动态ID
        // component: UserInfo,
        meta: {
          isBreadcrumb: true,
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        // component: Import,
        meta: {
          isBreadcrumb: true,
          title: 'excelImport'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
