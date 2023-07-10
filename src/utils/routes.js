import privateRoutes from '@/router/private_routes'

/**
 * 获取动态路由表
 * @param {*} context
 */
export const getDynamicRoutes = (auths) => {
  console.log('getDynamicRoutes()')
  const dynamicRoutes = []

  // 根据用户的页面权限添加私有路由
  auths.forEach((auth) => {
    // 页面显示权限标识符格式：view:viewName
    const regexp = /^view:.*$/
    if (regexp.test(auth)) {
      // 通过一级私有路由配置的name属性筛选，因此需要保证name的唯一性和一致性
      dynamicRoutes.push(
        ...privateRoutes.filter((route) => {
          return route.name === auth.substring(5)
        })
      )
    }
  })

  // 最后添加一条：不匹配路由表中的任一路由则跳转到404
  dynamicRoutes.push({
    path: '/:catchAll(.*)',
    redirect: '/404',
    name: 'notMatch'
  })

  return dynamicRoutes
}

/**
 * 检查用户是否有权权限访问某个页面路由
 * @param {*} auths
 * @param {*} routeName
 * @returns
 */
export const checkRouteAuth = (auths, routeName) => {
  console.log('checkRouteAuth()')
  let result = false
  // 页面显示权限标识符格式：view:viewName
  const regexp = /^view:.*$/
  auths.forEach((auth) => {
    if (regexp.test(auth)) {
      if (routeName === auth.substring(5)) {
        result = true
      }
    }
  })
  return result
}

/**
 * 获取用户权限里定义的页面路由名称列表
 * @param {*} auths
 * @returns
 */
export const getAuthRouteNames = (auths) => {
  console.log('getAuthRouteNames()')
  const names = []
  // 页面显示权限标识符格式：view:viewName
  const regexp = /^view:.*$/
  auths.forEach((auth) => {
    if (regexp.test(auth)) {
      names.push(auth.substring(5))
    }
  })
  return names
}
