let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8888/api/v1'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://43.143.154.162:3000/api/v1/'
} else {
  BASE_URL = 'http://localhost/api/v1/'
}

export { BASE_URL, TIME_OUT }
