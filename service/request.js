import {
  BASE_URL,
  TIMEOUT
} from './config'
class HYRequest {
  request(url, method, params) {
    return new Promise((reslove, reject) => {
      wx.request({
        url: BASE_URL + url,
        timeout: TIMEOUT,
        method: method,
        data: params,
        success: (res) => reslove(res.data),
        fail: reject
      })
    })
  }

  post(url, params) {
    return this.request(url, 'POST', params)
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

}
export default new HYRequest()