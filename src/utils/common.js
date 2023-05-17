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
