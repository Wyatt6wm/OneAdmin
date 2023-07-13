// 待办清单板块

import Layout from '@/layout'
import TodoList from '@/views/todo/todo-list'
import TodoDetail from '@/views/todo/todo-list/components/TodoItem.vue'

export default {
  path: '/todo',
  redirect: '/todo/todo-list',
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
      path: '/todo/todo-list',
      name: 'todoList',
      component: TodoList,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: '待办清单',
        icon: 'el-icon-tickets'
      }
    },
    {
      path: '/todo/todo-detail/:itemId',
      name: 'todoDetail',
      component: TodoDetail,
      meta: {
        isBreadcrumb: true,
        title: '待办详情'
      }
    },
    {
      path: '/todo/page3',
      name: 'todoPage3',
      // component: Dashboard,
      meta: {
        isMenu: true,
        isBreadcrumb: true,
        title: 'todoPage3',
        icon: 'el-icon-circle-check'
      }
    }
  ]
}
