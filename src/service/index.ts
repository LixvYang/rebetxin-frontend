// service统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// import localCache from '@/utils/cache/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  interceptors: {
    // requestInterceptor: (config) => {
      // // 携带token的拦截
      // const _mixin_twitter = localCache.getCache('_mixin_twitter')
      // if (_mixin_twitter) {
      //   config.headers!.Authorization = `Bearer ${_mixin_twitter}`
      // }
      // return config
    // },
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
