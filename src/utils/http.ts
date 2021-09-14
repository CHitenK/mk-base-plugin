import axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: sessionStorage.getItem('http-url') || '', // api的base_url
  timeout: 20000 // 请求超时 20s
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.status === 0) {
      return response.data
    }
    ElMessage.error(response.data.statusText)
    return Promise.reject()
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default service
