/**
 * Created by 郑广卓.
 */
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
fly.config.baseURL = '' // 请求的地址配置
fly.config.timeout = 5000 // 超时时间

fly.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()// 导航条加载动画
  if (wx.getStorageSync('token')) { // 检查本地缓存是否有token存在没有则重新获取
    request.headers = {// 设置请求头
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync('token'),
      'X-Tag': 'flyio'
    }
    return request
  }
  /* else {
    fly.lock()// 锁住请求
    return app.Load().then(res => { // 重新获取token
      request.timeout = 5000,
      request.headers = {// 设置请求头
        'content-type': 'application/json',
        'cld.stats.page_entry': wx.getStorageSync('scene'),
        'version': app.globalData.version,
        'token': wx.getStorageSync('token')
      }
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      fly.unlock()// 解锁请求

    })
  } */
  return request// 继续之前的请求
})

fly.interceptors.response.use(
  (response) => {
    wx.hideNavigationBarLoading()// 导航条加载动画
    const res = response.data
    if (res.status === 0 && (res.errCode === 401 || res.errCode === 403)) {
      // 跳转到登录页面
      wx.redirectTo({
        url: '跳首页地址'
      })
    }

    return response// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    if (err.status === 0) {
      return '网络连接异常'
    } else if (err.status === 1) {
      return '网络连接超时'
    } else if (err.status === 401) {
      return '用户未登录'
    } else {
      if (err.response.data.message) {
        return err.response.data.message
      } else {
        return '请求数据失败,请稍后再试'
      }
    }
    // Do something with response error
  }
)

export default fly
