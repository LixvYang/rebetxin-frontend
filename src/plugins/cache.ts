import Cookies from 'js-cookie'

class LocalCache {
  setCache(key: string, value: any) {
    Cookies.set(key, value)
  }

  getCache(key: string) {
    return Cookies.get(key)
  }

  deleteCache(key: string) {
    Cookies.remove(key)
  }
}

export default new LocalCache()
