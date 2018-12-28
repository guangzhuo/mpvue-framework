<template>
  <div class="container">

    <!--地理位置-->
    <div class="mapInfo">
      <div class="iconMap"></div>
      <span class="inforesed">杭州数字娱乐产业园</span>
      <van-icon name="arrow" size="14px" custom-style="vertical-align: middle"/>
    </div>

    <!--筛选-->
    <div class="screen">
      <div class="sType">
        <span class="ft_scr">距离优先</span>
      </div>
      <div class="sType">
        <span class="ft_scr">价格优先</span>
      </div>
      <div class="sType" @click="arrowDown">
        <span class="">筛选</span>
        <van-icon :name="isShowScreen === true? 'arrow-up': 'arrow-down'" size="14px" custom-class="arrowDown"/>
      </div>

      <!--二级筛选-->
      <div class="showScreen" v-show="isShowScreen">
        <div class="listSre" v-for="(item,index) in listSre" :key="index">
          <div class="titInfo">{{item.type}}</div>
          <div class="selectBtn">
            <van-button size="small" round disabled type="default">不限</van-button>
            <van-button open-type="getUserInfo" size="small" round type="default" @getuserinfo="getuserBtn">默认按钮</van-button>
            <van-button open-type='getPhoneNumber' size="small" round type="default" @getphonenumber="getPhone">默认按钮</van-button>
          </div>
        </div>

        <div class="BtnWrap">
          <div class="resetBtn">重置</div>
          <div class="lineclum"></div>
          <div class="okBtn">确定</div>
        </div>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card @getListData="listData"></card>
      </div>
    </div>

    <!--<form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>-->
    <div  @click="godemo" class="counter">去往Vuex示例页面</div>
    <div class="one">
      <div class="two1">123</div>
      <div class="two2">123</div>
    </div>
    <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">
      获取用户信息
    </button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapState, mapMutations } from 'vuex'
import { SET_OPEN_ID } from '../../store/mutation-types'

export default {
  data () {
    return {
      motto: '',
      userInfo: {},
      isShowScreen: false, // 显示筛选
      scrollHeight: 0, // 高度
      page: 1, // 页码
      listSre: [
        {
          type: '营业状态'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'openId'
    ])
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    console.log(this.$router)
    console.log(this.$fly)
  },
  onLoad () {
    var that = this
    // 查看是否授权
    /* wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success (res) {
              // 从数据库获取用户信息
              // that.queryUsreInfo()
              // 用户已经授权过
              // wx.switchTab({
              //   url: ''
              // })
            }
          })
        } else {
          that.$router.push({
            path: '/pages/login/index'
          })
        }
      }
    }) */

    wx.getSystemInfo({
      success: function (res) {
        that.scrollHeight = res.windowHeight
      }
    })
    // loadMore(that);

    /* 地理位置 */
    wx.getSetting({
      success: (response) => {
        if (!response.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              console.log('授权成功')
              wx.getLocation({
                success: (data) => {
                  console.log(data)
                }
              })
            }
          })
        }
      }
    })
  },
  /* 上拉底部刷新更多 */
  onReachBottom () {
    let that = this
    console.log('2222')
    // 显示加载图标'
    wx.showLoading({
      title: '玩命加载中'
    })
    // 页数+1
    let page = this.page + 1
    // 隐藏加载框
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },
  methods: {
    ...mapMutations({
      setOpenId: 'SET_OPEN_ID'
    }),

    arrowDown () {
      this.isShowScreen = !this.isShowScreen
    },

    listData (id) {
      console.log(id)
    },

    godemo () {
      console.log(this.$router)
      /* this.$router.push({
        'path': '/pages/news/list'
      }) */
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    onGotUserInfo (info) {
      console.log(info)
    },
    getuserBtn (e) {
      console.log(e)
      console.log('11')
    },
    getPhone (e) {
      console.log(e)
    }

  },

  components: {
    card
  }
}
</script>

<style lang="scss" scoped>
  .two1{width:100%;background: red;height:10px;}
  .two2{width:70rpx;background: black;height:10px;}
.mapInfo{
  margin-bottom: 6px;
  .iconMap{
    width: 10px;
    height:15px;
    background: red;
    margin: 0 6px;
    display: inline-block;
    vertical-align: middle;
  }
  .inforesed{
    font-size: 14px;
    vertical-align: middle;
  }
}

  .screen{
    position: relative;
    border-bottom: 1rpx solid #999;
    font-size: 12px;
    text-align: left;
    .sType{
      padding:6px 0px 6px 10px;
      display: inline-block;
    }

    .ft_scr{
      padding-right:10px;
      border-right: 1rpx solid #999;
    }
    /*二级搜索*/
    .showScreen{
      position: absolute;
      left:0;
      right:0;
      background: aliceblue;
      z-index: 2;
      border-bottom: 1px solid #999;
      .listSre{
        padding: 10px;
      }
      .titInfo{
        padding-bottom: 10px;
      }
      .BtnWrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .resetBtn, .okBtn{
        width:50%;
        text-align: center;
        height:36px;
        line-height: 36px;
        background: white;
      }
      .lineclum{
        position: absolute;
        left:0;
        right: 0;
        margin:auto;
        width:1px;
        height:26px;
        background:gray;
      }
    }



  }

</style>
<style lang="scss">
  .screen{
    .arrowDown{
      padding-left:5px;
      vertical-align: middle
    }
  }
</style>
