import { ElMessage } from 'element-plus'

/**
 * 功能待开发提示
 */
export function comingSoon() {
  ElMessage.info('此功能正在开发中......')
}

/**
 * 判断数据是否为空值（null/undefined/{}/[]）
 * @param {*} data
 * @returns true-空；false-非空
 */
export function isEmpty(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

const viewTagException = ['/login', '/404', '/401']

/**
 * 根据路由路径判断是否应该显示为页面标签
 * @param {*} path 路由路径
 * @returns true-应该显示为页面标签；false-不应该显示为页面标签
 */
export function isViewTag(path) {
  return !viewTagException.includes(path)
}

/**
 * 查找路径为path的ViewTag在列表中的下标
 * @param {*} viewTagList
 * @param {*} path
 * @returens 下标
 */
export function getViewTagIndexByPath(viewTagList, path) {
  let viewTagIndex = -1
  for (let i = 0; i < viewTagList.length; i++) {
    if (viewTagList[i].fullPath === path) {
      viewTagIndex = i
      break
    }
  }
  return viewTagIndex
}
