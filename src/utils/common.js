export function generateSimpleUUID() {
  var uuid = generateUUID()
  for (var i = 0; i < 4; i++) uuid = uuid.replace('-', '')
  return uuid
}

/**
 * 生成Random UUID
 *  @returns uuid
 */
export function generateUUID() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.charAt(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.charAt((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
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
