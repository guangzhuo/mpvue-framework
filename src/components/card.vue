<template>
  <ul class="indexCard">
    <li class="cardList" @click="clickIndex('1')" v-for="(item,index) in cardList" :key="index">
      <div class="poIcon"></div>
      <div class="leftImg" >
        <!--<img src="" class="leftImg" alt="">-->
      </div>
      <div class="rightWrap">
        <h3 class="title">皇家游泳馆[翡翠店]</h3>
        <h4 class="smallTitle">黄龙/高新文教区，距离我3.0km</h4>
        <div class="timeMoney">
          <span class="monery">¥20/时</span>
          <span class="experience">起<span class="placeWin"></span>已有100+人体验</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cardList: {
      type: Array,
      default: [1, 2, 3, 4, 5, 6]
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickIndex (data) {
      console.log(data)
      this.$emit('getListData', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .indexCard{
    padding:5px 10px;
  }
.cardList{
  display: flex;
  justify-content: space-between;
  position: relative;
  .leftImg{
    width:134px;
    height: 170px;
    border-radius: 6px;
    background: #999;
  }
  .poIcon{
    position: absolute;
    right:10px;
    top:-6px;
    width: 20px;
    height:20px;
    background: red;
    z-index: 2;

  }
  .rightWrap{
    width:211px;
    text-align: left;
    border-bottom: 1px solid #999;

    .title{
      font-size: 12px;
      padding: 6px 0px;

    }
    .smallTitle{
      font-size: 10px;
      color:#666;
    }
    .timeMoney{
      font-size: 14px;
      margin-top:9px;
      .monery{
        color:#259b24;
      }
      .placeWin{
        width:10px;
        display: inline-block;
      }
      .experience{
        color:#666;
      }
    }

  }
}
</style>
