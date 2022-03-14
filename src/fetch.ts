import { createFetch } from '@vueuse/core'

// https://8h5orqmwk0.execute-api.ap-northeast-1.amazonaws.com/dev/search/%E5%8A%89

export const fetch = createFetch({
  baseUrl: 'https://8h5orqmwk0.execute-api.ap-northeast-1.amazonaws.com/dev',
  // options: {
  //   async beforeFetch({ options }) {
  //     const myToken = await getMyToken()
  //     options.headers.Authorization = `Bearer ${myToken}`

  //     return { options }
  //   },
  // },
  fetchOptions: {
    mode: 'cors',
  },
})

