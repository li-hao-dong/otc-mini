<template>
  <view>
    <view class="container-box">
      <view class="hot_sectors_th">
        <view>序号</view>
        <view>名称/代码</view>
        <view>涨幅</view>
        <view>换手率</view>
      </view>
      <view v-if="hotSectors && hotSectors.length > 0">
        <view class="hot_sectors_td" v-for="(item,n) in hotSectors" :key="n" @click="uni.navigateTo({url: `/pages/inquiry/inquiry?name=${item.名称}`})">
          <view :class="`regular ordinal ${calcOrdinalBg(item.序号)}`">{{item.序号}}</view>
          <view>
            <view>{{item.名称}}</view>
            <view class="stext">{{item.代码}}</view>
          </view>
          <view :class="`${item.涨跌幅.toFixed(2) > 0 ? 'red':'green'}`">{{item.涨跌幅 >0 ? '+':''}}{{ item.涨跌幅.toFixed(2) }}%</view>
          <view>{{item.换手率}}%</view>
        </view>
      </view>
      <view v-else class="noData">
        暂无数据
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {onLoad} from "@dcloudio/uni-app";
  import {getConstituents} from "@/api";
  import {ref} from "vue";
  import type {constituents} from "@/interfaces/constituents";

  const hotSectors = ref<constituents[]>()

  onLoad((option)=>{
    // option.board_type
    // option.symbol
    console.log("board_type", option?.board_type)
    console.log("board_type", option?.symbol)
    if(option?.board_type && option?.symbol){
      getConstituentss(option?.board_type, option?.symbol)
    }
  })

  const getConstituentss = (board_type: string, symbol: string) => {
    uni.showLoading({title: '加载中…'})
    getConstituents(board_type, symbol).then(res => {
      console.log("获取模块成分", res)
      hotSectors.value = res;
      uni.hideLoading()
    }).catch(err => {
      console.log("获取模块成分 error", err)
      uni.hideLoading()
    })
  }

  function calcOrdinalBg(n){
    if(n === 1){
      return 'bg_gold'
    }else if(n === 2){
      return 'bg_silver'
    }else if(n === 3){
      return 'bg_bronze'
    }else{
      return ''
    }
  }
</script>

<style lang="scss" scoped>
.container-box{
  width: 90%;
  margin: auto;
  .noData{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hot_sectors_th{
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr 3fr 2fr 2fr;
    color: #807d7e;

    & view:nth-child(1),
    & view:nth-child(2){
      text-align: left;
    }

    & view:nth-child(3),
    & view:nth-child(4){
      text-align: right;
    }
  }
  .hot_sectors_td{
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr 3fr 2fr 2fr;
    align-items: center;
    box-sizing: border-box;
    padding: 4px 0;

    & view:nth-child(1),
    & view:nth-child(2){
      text-align: left;
    }

    & view:nth-child(3),
    & view:nth-child(4){
      text-align: right;
    }

    .regular {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: normal;
      background: #FFFFFF;
    }

    .bg_gold{
      background: #fb2736;
      color: #FFFFFF;
    }
    .bg_silver{
      background: #fe6718;
      color: #FFFFFF;
    }
    .bg_bronze{
      background: #f7950d;
      color: #FFFFFF;
    }

    .stext{
      font-size: 12px;
    }

    .red{
      color: #fc363b;
    }
    .green{
      color: #1fab63;
    }
  }
}

</style>
