import request from '@/utils/request'

export function getDetails(params) {
    return request({
        url: '/details',
        method: 'GET',
        params,
    })
}