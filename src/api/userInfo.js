import request from '@/utils/request'

const api_name = '/admin/user'

export default {
  // 用户列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  lock(userId, status) {
    return request({
      url: `${api_name}/lock/${userId}/${status}`,
      method: 'get'
    })
  },
  show(userId) {
    return request({
      url: `${api_name}/show/${userId}`,
      method: 'get'
    })
  },
  approval(id, authStatus) {
    return request({
      url: `${api_name}/approval/${id}/${authStatus}`,
      method: 'get'
    })
  }
}