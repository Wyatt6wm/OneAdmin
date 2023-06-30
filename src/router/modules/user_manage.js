// 用户管理模块

import Layout from '@/layout'
import AuthManage from '@/views/user/auth-manage'

export default {
  path: '/user',
  redirect: '/user/user-manage',
  name: 'user',
  component: Layout,
  meta: {
    isMenu: true,
    isBreadcrumb: true,
    title: '用户管理',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/user-manage',
      name: 'userManage',
      // component: ,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '用户管理',
        icon: 'personnel-manage'
      }
    },
    {
      path: '/user/role-manage',
      name: 'roleManage',
      // component: ,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '角色管理',
        icon: 'role'
      }
    },
    {
      path: '/user/auth-manage',
      name: 'authManage',
      component: AuthManage,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '权限管理',
        icon: 'permission'
      }
    }
  ]
}
