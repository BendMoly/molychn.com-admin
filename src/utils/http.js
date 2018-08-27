'use strict'

import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getCookie } from '@/utils/auth'

const auth = {
  username: 'molychn',
  password: 'lincanyue'
}
const baseURL = 'http://127.0.0.1:12580/admin/v1'
const reject = (err) => {
  return Promise.reject(err)
}

axios.defaults.baseURL = baseURL
axios.defaults.auth = auth
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'

axios.interceptors.request.use(config => {
  let token = getCookie('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
}, err => {
  Message.error({message: `请求错误，${err}`})
  return reject(err)
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response) {
    if (err.response.status && err.response.status === 401) {
      Message.error({message: '权限受限，请重新登录'})
      router.replace({path: '/login'})
    } else {
      return reject(err.response)
    }
  }
})

export default {
  get: (url, params) => {
    return axios({
      url,
      method: 'GET',
      params
    }).then(res => {
      return res
    }).catch(err => {
      return reject(err)
    })
  },
  post: (url, data) => {
    return axios({
      url,
      method: 'POST',
      data
    }).then(res => {
      return res
    }).catch(err => {
      return reject(err)
    })
  },
  put: (url, data) => {
    return axios({
      method: 'PUT',
      url,
      data
    }).then(res => {
      // console.log(res)
      return res
    }).catch(err => {
      // console.log(err)
      return reject(err)
    })
  },
  delete: (url) => {
    return axios({
      method: 'DELETE',
      url
    }).then(res => {
      return res
    }).catch(err => {
      return reject(err)
    })
  }
}
