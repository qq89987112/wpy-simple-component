import wepy from 'wepy'

export let config = {
  baseURL: ''
}

export default {
  get(url, query = {}) {
    return new Promise((resolve, reject) => {
      // query = Object.entries(query).map((item) => {
      //   return `${item[0]}=${item[1]}`
      // }).join('&')
      wepy.request({
        data: query,
        url: `${config.baseURL}${url}`,
        success(d) {
          resolve(d.data)
        },
        fail(d) {
          reject(d)
        }
      })
    })
  },
  post(url, query) {
    return new Promise((resolve, reject) => {
      wepy.request({
        data: query,
        url: `${config.baseURL}${url}`,
        method: 'POST',
        success(d) {
          resolve(d.data)
        },
        fail(d) {
          reject(d)
        }
      })
    })
  }
}
