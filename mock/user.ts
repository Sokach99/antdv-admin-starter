import type { MockMethod } from 'vite-plugin-mock'

export default [{
  url: '/api/v1/test',
  method: 'post',
  response: () => {
    return {
      code: 0,
      message: 'ok',
      data: {
        id: 1,
        name: 'vben',
        age: 18,
      },
    }
  },
}] as MockMethod[]
