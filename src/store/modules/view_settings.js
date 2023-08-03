// 页面界面显示设置

import Storage from '@/utils/storage'

const SIDEBAR_OPENED = 'sidebarOpened'
const VIEW_TAG_LIST = 'viewTagList'

export default {
  namespaced: true,

  state: {
    sidebarOpened: Storage.get(SIDEBAR_OPENED) == null ? true : Storage.get(SIDEBAR_OPENED),
    viewTagList: Storage.get(VIEW_TAG_LIST) || []
  },

  mutations: {
    // 切换菜单栏伸缩状态
    changeSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 添加新的页面标签数据到缓存中的页面标签列表中
    addViewTagList(state, tag) {
      const isFind = state.viewTagList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.viewTagList.push(tag)
      }
    },
    // 删除一个或多个标签
    removeViewTags(state, payload) {
      const mode = payload.mode
      const index = payload.index
      if (mode === 'index') {
        state.viewTagList.splice(index, 1)
      } else if (mode === 'all') {
        let viewTagIndex = -1
        for (let i = 0; i < state.viewTagList.length; i++) {
          // 如果主页重定向的页面改了，这里的路径也要改
          if (state.viewTagList[i].fullPath === '/profile') {
            viewTagIndex = i
            break
          }
        }
        if (viewTagIndex === -1) {
          state.viewTagList = []
        } else {
          state.viewTagList.splice(viewTagIndex + 1, state.viewTagList.length - viewTagIndex + 1)
          state.viewTagList.splice(0, viewTagIndex)
        }
      } else if (mode === 'other') {
        state.viewTagList.splice(index + 1, state.viewTagList.length - index + 1)
        state.viewTagList.splice(0, index)
      } else if (mode === 'right') {
        state.viewTagList.splice(index + 1, state.viewTagList.length - index + 1)
      }
    },
    // 退出登录时清除state
    clearStateOnLogout(state) {
      state.sidebarOpened = true
      state.viewTagList = []
    }
  },

  actions: {
    /**
     * 切换菜单栏伸缩状态
     */
    changeSidebarOpened(context) {
      context.commit('changeSidebarOpened')
      Storage.set(SIDEBAR_OPENED, context.state.sidebarOpened) // 记住菜单展开/收起状态
    },

    /**
     * 添加新的页面标签数据到缓存中的页面标签列表中
     * @param {*} context
     * @param {fullPath, meta, name, params, path, query, title} tag
     */
    addViewTagList(context, tag) {
      context.commit('addViewTagList', tag)
      Storage.set(VIEW_TAG_LIST, context.state.viewTagList)
    },

    /**
     * 删除一个或多个页面标签
     * @param {*} context
     * @param {mode: 'other'||'right'||'index', index} payload 参数对象，包含mode和index（可选）属性
     */
    removeViewTags(context, payload) {
      context.commit('removeViewTags', payload)
      Storage.set(VIEW_TAG_LIST, context.state.viewTagList)
    },

    /**
     * 根据路由路径删除页面标签
     * @param {*} context
     * @param {*} fullPath
     */
    async removeViewTagByFullPath(context, fullPath) {
      for (let i = 0; i < context.state.viewTagList.length; i++) {
        if (fullPath === context.state.viewTagList[i].fullPath) {
          context.commit('removeViewTags', { mode: 'index', index: i })
          break
        }
      }
      Storage.set(VIEW_TAG_LIST, context.state.viewTagList)
    }
  }
}
