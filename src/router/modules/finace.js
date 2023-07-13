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
  name: 'finance',
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
      name: 'financeDashboard',
      component: Dashboard,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '数据看板',
        icon: 'el-icon-circle-check'
      }
    },
    {
      path: '/finance/journal',
      name: 'financeJournal',
      component: Journal,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '收支记账',
        icon: 'el-icon-circle-check'
      }
    },
    {
      path: '/finance/salary',
      name: 'financeSalary',
      component: Salary,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '工资福利',
        icon: 'el-icon-circle-check'
      }
    },
    {
      path: '/finance/assets',
      name: 'financeAssets',
      component: Assets,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '资产管理',
        icon: 'el-icon-circle-check'
      }
    },
    {
      path: '/finance/settings',
      name: 'financeSettings',
      component: Settings,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '参数设置',
        icon: 'el-icon-circle-check'
      }
    }
  ]
}
