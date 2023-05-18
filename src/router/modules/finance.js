// 财务管理板块

import Layout from '@/layout'
import Dashboard from '@/views/finance/dashboard'
import Journal from '@/views/finance/journal'
import Salary from '@/views/finance/salary'
import Assets from '@/views/finance/assets'
import Settings from '@/views/finance/settings'

export default {
  path: '/finance',
  redirect: '/finance/dashboard',
  component: Layout,
  meta: {
    isMenu: true,
    isBreadcrumb: true,
    title: '财务管理',
    icon: 'el-icon-coin'
  },
  children: [
    {
      path: '/finance/dashboard',
      component: Dashboard,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '数据看板'
      }
    },
    {
      path: '/finance/journal',
      component: Journal,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '收支流水'
      }
    },
    {
      path: '/finance/salary',
      component: Salary,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '工资福利'
      }
    },
    {
      path: '/finance/assets',
      component: Assets,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '资产管理'
      }
    },
    {
      path: '/finance/settings',
      component: Settings,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '参数设置'
      }
    }
  ]
}
