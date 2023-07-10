export const requestLog = (config) => {
  const url = config.baseURL + config.url
  console.group('Request:', '[', config.method.toUpperCase(), ']', url)
  // 防泄漏敏感信息
  // if (config.headers.token) {
  //   console.log('token: ', config.headers.token)
  // }
  // 防泄漏敏感信息
  // if (config.data) {
  //   console.log('form: ', config.data)
  // }
  console.groupEnd()
}

export const requestErr = (err) => {
  const url = err.config.baseURL + err.config.url
  console.group('Request error:', '[', err.config.method.toUpperCase(), ']', url)
  console.log('请求发送失败')
  console.groupEnd()
}

export const responseLog = (config, res) => {
  const url = config.baseURL + config.url
  console.group('Response: ' + url)
  if (res && res.traceId) {
    console.log('traceId: ', res.traceId)
  }
  if (res && res.succ != null) {
    console.log('succ: ', res.succ)
  }
  if (res && res.mesg) {
    console.log('mesg: ', res.mesg)
  }
  if (res && res.data) {
    console.log('data: ', res.data)
  }
  console.groupEnd()
}

export const responseErr = (err, mesg) => {
  const url = err.config.baseURL + err.config.url
  console.group('Response error:', '[', err.response.status, ']', url)
  console.log('message:', mesg)
  console.log('error:', err)
  console.groupEnd()
}
