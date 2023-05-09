// service统一出口
import cache from '@/plugins/cache'
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// import localCache from '@/utils/cache/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = cache.getCache('_betxin_token')
      if (token) {
        config.headers!.Authorization = `${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hyRequest
