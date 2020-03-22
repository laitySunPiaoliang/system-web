import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(listQuery) {
  return request({
    url: '/user/getList',
    method: 'get',
    params: { listQuery }
  })
}

export function createUser(data) {
  return request({
    url: '/user/addUser',
    method: 'put',
    data
  })
}
