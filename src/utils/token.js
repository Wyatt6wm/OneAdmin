import Storage from './storage'

const TOKEN_EXPIRED_TIME = 'tokenExpiredTime'

// 缓存token过期时间
export function setExpiredTime(expiredTime) {
  Storage.set(TOKEN_EXPIRED_TIME, expiredTime)
}

// 获取token过期时间缓存
export function getExpiredTime() {
  Storage.get(TOKEN_EXPIRED_TIME)
}

// 判断token是否过期
export function isTokenExpired() {
  const current = Date.now()
  const expiredTime = getExpiredTime()
  return current > expiredTime
}
