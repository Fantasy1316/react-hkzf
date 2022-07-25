import axios from 'axios'
import { Toast } from 'antd-mobile'

const service = axios.create({
  baseURL: 'http://172.16.0.112:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  (config) => {
    Toast.show({
      icon: 'loading',
      duration: 0
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios 请求拦截器
service.interceptors.response.use((res) => {
  Toast.clear()
  const { status } = res.data

  switch (status) {
    case 200:
      return res.data

    default:
      Toast.show({
        content: '网络拥挤，请稍后重试～'
      })
  }
})

const Requset = (method, url, args) => {
  const data = {
    method,
    url
  }

  if (method === 'get') {
    data.params = args
  } else {
    data.data = args
  }

  return service(data)
}

export default Requset
