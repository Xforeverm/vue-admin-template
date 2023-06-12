import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/datas',
    method: 'get',
    params 
  })
}

export function exportExcel(params){
  return request({
    url: '/data/export',
    method: 'post',
    params,
    responseType: 'blob'
  })
}
