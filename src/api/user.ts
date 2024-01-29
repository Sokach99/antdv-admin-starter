import request from '@/utils/request'

export interface UserInfo {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

export interface UserLoginParams {
  username: string
  password: string
}

export interface UserLoginRes {
  token: string
}

export function userLoginApi(data: UserLoginParams) {
  return request.post('/api/v1/auth/login', data)
}

export function userLogoutApi() {
  return request.post('/api/v1/auth/logout')
}

export function currentUserApi() {
  return request.get('/api/v1/auth/current')
}
