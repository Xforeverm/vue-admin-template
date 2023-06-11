import request from '@/utils/request'

export function loginverify(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}
