import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/datas',
    method: 'get',
    params 
  })
}

export function exportList(params){
  return request({
    url: '/data/export',
    method: 'get',
    params
  })
}
