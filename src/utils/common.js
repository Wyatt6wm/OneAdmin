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
