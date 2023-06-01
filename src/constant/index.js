const env = 'dev'

// ---------- 应用运行有关常量 ----------
export const GATEWAY =
  env === 'run' ? 'http://basic-gateway:8000/' : 'http://localhost:8000/'
export const MOCK_ACTIVE = env === 'dev'

// ---------- token有关常量 ----------
export const TOKEN = 'token'
export const TOKEN_EXPIRED_TIME = 'tokenExpiredTime'

// ---------- 权限有关 ----------
export const PERMISSION = 'permission'

// ---------- 组件有关 ----------
export const SIDEBAR_OPENED = 'sidebarOpened'
export const VIEW_TAG_LIST = 'viewTagList'
