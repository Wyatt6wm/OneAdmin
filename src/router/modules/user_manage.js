// 用户管理模块

import Layout from '@/layout'

export default {
  path: '/user',
  redirect: '/user/manage',
  name: 'userManage',
  component: Layout,
  meta: {
    isMenu: true,
    isBreadcrumb: true,
    title: '用户管理',
    icon: 'el-icon-user'
  }
}
