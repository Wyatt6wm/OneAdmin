// 待办清单板块

import Layout from '@/layout'
import TodoDashboard from '@/views/todo/dashboard'
import TodoList from '@/views/todo/list'
import TodoDetail from '@/views/todo/list/components/TodoItem.vue'

export default {
  path: '/todo',
  redirect: '/todo/dashboard',
  name: 'todo',
  component: Layout,
  meta: {
    isMenu: true,
    isBreadcrumb: true,
    title: '待办事项',
    icon: 'el-icon-circle-check'
  },
  children: [
    {
      path: '/todo/dashboard',
      name: 'todoDashboard',
      component: TodoDashboard,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '待办面板',
        icon: 'el-icon-data-analysis'
      }
    },
    {
      path: '/todo/list/work',
      name: 'todoWorkList',
      component: TodoList,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '工作待办',
        icon: 'el-icon-document'
      }
    },
    {
      path: '/todo/list/daily',
      name: 'todoDailyList',
      component: TodoList,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '日常待办',
        icon: 'el-icon-calendar'
      }
    },
    {
      path: '/todo/detail/:category/:uuid',
      name: 'todoDetail',
      component: TodoDetail,
      meta: {
        isBreadcrumb: true,
        title: '待办详情'
      }
    }
  ]
}
