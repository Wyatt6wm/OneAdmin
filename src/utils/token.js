import { TOKEN_TIMESTAMP, TOKEN_TIMEOUT } from '@/constant'
import { setStorageItem, getStorageItem } from './storage'

// 获取token生成时间戳
export function getTokenTimestamp() {
  return getStorageItem(TOKEN_TIMESTAMP)
}

// 缓存token生成时间戳
export function setTokenTimestamp() {
  setStorageItem(TOKEN_TIMESTAMP, Date.now())
}

// 判断token是否超时
export function isTokenTimeout() {
  const currentTime = Date.now()
  const timestamp = getTokenTimestamp()
  return currentTime - timestamp > TOKEN_TIMEOUT
}
