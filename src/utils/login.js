import wx from 'wx'
import { loginByCode } from '../api/weAppAuth' // 登录接口

/**
 * 登录
 * @returns {Promise<any>}
 */
export function weAppLogin () {
  return new Promise((resolve, reject) => {
    // 先调用 wx.login 获取到 code
    wx.login({
      success: (res) => {
        wx.getUserInfo({
          lang: 'zh_CN',
          success: ({rawData, signature, encryptedData, iv, userInfo}) => {
            let data = {
              code: res.code,
              rawData,
              signature,
              encryptedData,
              iv,
              userInfo
            }
            // console.log(JSON.stringify(data))
            this.$fly.post('/login').then(res => {
              // 该为我们后端的逻辑 若code > 0为登录成功，其他情况皆为异常 （视自身情况而定）
              if (res.status === 200) {
                // 保存用户信息相关操作
                wx.setStorageSync('tonken', res.token)
                resolve(res)
              } else {
                reject(res)
              }
            }).catch(err => {
              reject(err)
            })
          },
          // 若获取不到用户信息 （最大可能是用户授权不允许，也有可能是网络请求失败，但该情况很少）
          fail: (err) => {
            reject(err)
          }
        })
      }
    })
  })
}
