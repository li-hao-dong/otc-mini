<template>
  <view class="container">
    <view class="hitBox">
      <view class="name">{{ store.miniData.name }}</view>
      <view class="inquiryBox" @click="uni.navigateTo({url: '/pages/inquiry/inquiry'})">
        <view class="inquiryTitle">询价</view>
        <view class="inquiryIcon"><uni-icons type="search" size="20" color="#ffffff"></uni-icons></view>
      </view>
    </view>
    <view class="inquiryHistoryBox">
      <view class="inquiryHistoryList" v-for="(_, index) in 3" :key="index">
        <view class="fir_row">
          <view class="fir_br">
            <view class="fir_br_center">
              <view>五粮液</view>
              <view style="color: #acacac; padding-top: 2px;">000858.SZ</view>
            </view>
          </view>
          <view class="fir_br">
            股价: <text>120.78</text>
          </view>
          <view class="fir_br">
            涨幅: <text>-0.02%</text>
          </view>
        </view>
        <view class="sec_row">
          <view>询价机构：<text>模拟机构</text></view>
          <view>询价规模：<text>1000万</text></view>
        </view>
        <view class="thr_row">
          <view class="sec_row_cont">
            <view class="sec_row_tit">结构</view>
            <view class="sec_row_value">平值100</view>
          </view>
          <view class="sec_row_cont">
            <view class="sec_row_tit">期限</view>
            <view class="sec_row_value">1个月</view>
          </view>
          <view class="sec_row_cont">
            <view class="sec_row_tit">最优报价</view>
            <view class="sec_row_value">3.40%</view>
          </view>
          <view class="sec_row_cont">
            <view class="sec_row_tit">报价方</view>
            <view class="sec_row_value">GF<uni-icons type="right" size="16" color="#c3c9d3"></uni-icons></view>
          </view>
        </view>
      </view>
    </view>

    <view class="more_data_cont" v-if="moreDataStatus">加载更多</view>
    <view class="more_data_cont" v-else>没有数据了</view>
  </view>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "@/stores";

import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";

const store = useStore();
const inquiryHistory = ref<InquiryHistoryResp[]>([]);
const moreDataStatus = ref<boolean>(!true);
onMounted(() => {
  console.log("store.miniData1111", store.miniData)
})

</script>

<style>
.hitBox {
  box-sizing: content-box;
  padding: 0 20rpx;
  width: auto;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-primary-bg);
  color: var(--color-primary-text);
}

.inquiryBox{
  display: flex;
  gap: 10rpx;
}

.inquiryHistoryBox{
  width: 95%;
  margin: auto;
  padding-top: 10px;
}

.inquiryHistoryList{
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #cacaca;
}

.fir_row,
.sec_row,
.thr_row{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

.fir_row{
  padding-top: 0;
}

.thr_row{
  border-bottom: none;
  padding-bottom: 0;
}

.fir_br{
  width: calc(100% / 3);
  border-right: 1px solid #eaeaea;
  text-align: center;
}

.fir_br:first-child{
  text-align: left;
  border-right: none;
}

.fir_br:nth-child(2){
  border-left: 1px solid #eaeaea;
}

.fir_br text{
  font-weight: bolder;
  color: blue;
}

.fir_br_center{
  width: fit-content;
  text-align: center;
}

.sec_row text{
  color: #5274f6;
}

.sec_row_cont{
  width: calc(100% / 4);
}

.sec_row_tit{
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;
  color: #acacac;
  font-size: 13px;
}

.sec_row_value{
  padding-top: 10px;
}

.more_data_cont{
  width: 100%;
  padding: 10px 0;
  text-align: center;
}
</style>
