import { createGlobalState, useStorage } from '@vueuse/core'

export const STORAGE_AUTHORIZE_KEY = 'Authorization'

export const useAuthorization = createGlobalState(() => useStorage<null | string>(STORAGE_AUTHORIZE_KEY, null))
