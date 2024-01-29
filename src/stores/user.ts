import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type { UserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // const token = useAuthorization()
  const userInfo = shallowRef < UserInfo > ()

  const userLogin = async () => {
  }

  const userLogout = async () => {

  }

  const getUserInfo = async () => {

  }

  const generateDynamicRoutes = async () => {

  }

  return {
    userLogin,
    userLogout,
    userInfo,
    getUserInfo,
    generateDynamicRoutes,
  }
})
