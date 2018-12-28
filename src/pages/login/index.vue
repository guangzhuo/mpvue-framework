<template>
  <div class="login">
    <van-button v-if="canIUse" open-type="getUserInfo" size="small" round type="primary" @getuserinfo="getuserBtn">登陆授权</van-button>
    <div v-else>请升级微信版本</div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        list: ['scope.userInfo', 'scope.userLocation', 'scope.address', 'scope.invoiceTitle', 'scope.werun', 'scope.record', 'scope.writePhotosAlbum', 'scope.camera']
      }
    },
    onLoad () {
      var list = this.list
      // for循环遍历
      /* for (var i = 0; i < list.length; i++) {
        var str = list[i]
        // 调用授权方法
        this.checkauth(str)
      } */
    },
    methods: {
      // 授权方法
      checkauth (str) {
        wx.getSetting({
          success: (response) => {
            if (!response.authSetting[str]) {
              wx.authorize({
                scope: str,
                success: () => {
                  console.log('授权成功')
                }
              })
            }
          }
        })
      },
      getuserBtn (data) {
        console.log(data)
        console.log(data.target.userInfo)
        if (data.target.userInfo) {
          wx.switchTab({
            url: '/pages/index'
          })
        }
        /* this.$router.push({
          path: '/pages/index'
        }) */
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
