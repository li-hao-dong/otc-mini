
<template>
  <view class="container">
    <view class="hot_sectors">
      <view class="hot_sectors_th">
        <view>排名</view>
        <view>板块名称</view>
        <view>涨幅</view>
        <view>换手率</view>
      </view>
      <view v-if="hotSectors && hotSectors.length > 0">
        <view class="hot_sectors_td" v-for="(item,n) in hotSectors" :key="n" @click="toPlateDetail(item)">
          <view :class="`regular ordinal ${calcOrdinalBg(item.排名)}`">{{item.排名}}</view>
          <view>
            <view>{{item.板块名称}}</view>
            <view class="stext">{{item.板块代码}}</view>
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
import {ref} from "vue";
import type {industryStruct} from "@/interfaces/industry";
import type {conceptStruct} from "@/interfaces/concept";
import {getConcept, getIndices, getIndustry} from "@/api";
import {onLoad} from "@dcloudio/uni-app";

const hotSectors = ref<industryStruct[] | conceptStruct[]>([])
const boardType = ref()

onLoad((option) => {
  if (option?.type == 'concepts'){
    boardType.value = 'concept'
    getConcepts()
  }else if(option?.type == 'industries'){
    boardType.value = 'industry'
    getIndustries()
  }
})

const getConcepts = () => {
  uni.showLoading({title: "加载中…"})
  getConcept(50).then(res => {
    hotSectors.value = res
    uni.hideLoading()
  }).catch(err => {
    console.log("getConcepts err.", err)
    uni.hideLoading()
  })
}

const getIndustries = () => {
  uni.showLoading({title: "加载中…"})
  getIndustry(50).then(res => {
    // console.log("res", res)
    hotSectors.value = res
    uni.hideLoading()
  }).catch(err => {
    console.log("getIndustries err.", err)
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

const toPlateDetail = (item: industryStruct|conceptStruct) => {
  uni.navigateTo({url: `/pages/plateComposition/plateComposition?board_type=${boardType.value}&symbol=${item.板块代码}`})
}
</script>

<style lang="scss" scoped>
.hot_sectors{
  width: 90%;
  margin: auto;
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
  .noData{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
