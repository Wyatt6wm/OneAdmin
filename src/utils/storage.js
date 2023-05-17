// LocalStorage缓存工具函数

// 存储数据
export const setStorageItem = (key, value) => {
  // value有两种情况：
  // 1、基本数据类型
  // 2、复杂数据类型（要进行转换）
  if (typeof value === 'object') {
    value = JSON.stringify(value) // 将复杂数据类型（数组、对象）转化为JSON字符串进行存储
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getStorageItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data) // 将JSON字符串默认按复杂数据类型解析（默认当成复杂数据类型）
  } catch (err) {
    return data
  }
}

// 删除某个数据
export const removeStorageItem = (key) => {
  window.localStorage.removeItem(key)
}

// 删除所有数据
export const removeAllStorageItem = (key) => {
  window.localStorage.clear()
}
