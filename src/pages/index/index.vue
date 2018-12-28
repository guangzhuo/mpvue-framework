<template>
  <div class="APP_INDEX">

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

      <!--二级筛选 isShowScreen-->
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
        <card @getListData="listData"></card>
    </div>

    <div class="codeWrap">
      <div class="codeTitle">皇家游泳馆[翡翠店]</div>
      <div class="codeTime">有效期：2018-12-15至2018-12-23</div>
      <div class="goCode">
        <van-button plain round size="small" custom-class="codeBtn" type="primary">扫码入场</van-button>
      </div>
    </div>
    <!--<div  @click="godemo" class="counter">去往Vuex示例页面</div>-->
  </div>
</template>

<script>
import card from '@/components/card'
import { mapState, mapMutations } from 'vuex'
import { SET_OPEN_ID } from '../../store/mutation-types'

export default {
  data () {
    return {
      // userInfo: {},
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
    // this.getUserInfo()
    console.log(this.$router)
    console.log(this.$fly)
  },
  onLoad () {
    /* this.$fly.get('https://suggest.taobao.com/sug', {
      code: 'utf-8',
      q: '卫衣',
      callback: 'cb'
    }).then(data => {
      console.log(data)
    }) */

    var that = this
    console.log(this.$store)
    // 查看是否授权
    wx.getSetting({
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
    })

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
      z-index: 3;
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

  .codeWrap{
    position: fixed;
    z-index: 10;
    bottom:0;
    height: 50px;
    left:10px;
    right:10px;
    background: rgba(0,0,0,.5);
    border-radius: 10px;
    font-size: 13px;
    padding:6px 3px 0px 10px;
    .codeTitle{
      color:white;
    }
    .goCode{
      position: absolute;
      right: 6px;
      top:15px;

    }
  }
</style>
<style lang="scss">
  .APP_INDEX{
    .screen{
      .arrowDown{
        padding-left:5px;
        vertical-align: middle
      }
    }
    .codeBtn{
      border:.5px solid white;
      background: transparent;
      color:#fff !important;
    }
  }

</style>
