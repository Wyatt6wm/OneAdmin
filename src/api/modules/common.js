import request from '../request'

const COMMON = '/common'
export const getCaptcha = () => {
  return request({
    url: COMMON + '/getCaptcha'
  })
}
