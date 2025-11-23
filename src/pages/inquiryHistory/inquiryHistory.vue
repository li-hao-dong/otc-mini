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
      <view class="inquiryHistoryList" v-for="(item, index) in history" :key="item.inquiryId">
        <view class="fir_row">
          <view class="fir_br">
            <view class="fir_br_center">
              <view>{{ item.underlying }}</view>
              <view style="color: #acacac; padding-top: 2px;">{{ item.underlying_code }}</view>
            </view>
          </view>
          <view class="fir_br">
            股价: <text>{{ item.current_price }}</text>
          </view>
          <view class="fir_br">
            涨幅: <text>{{ item.price_change }}</text>
          </view>
        </view>
        <view class="sec_row">
          <view>询价机构：<text>模拟机构</text></view>
<!--          <view>询价规模：<text>1000万</text></view>-->
        </view>

        <uni-table ref="table" border stripe emptyText="暂无更多数据">
          <uni-tr>
            <uni-th align="center" width="100px">结构</uni-th>
            <uni-th align="center" width="60px">期限</uni-th>
            <uni-th align="center" width="100px">最优报价</uni-th>
            <uni-th align="center" width="100px">报价方</uni-th>
          </uni-tr>
          <uni-tr v-for="(res, key) in structureData[index]" :key="key">
            <uni-td>{{ res.structureName }}</uni-td>
            <uni-td><view v-for="(term, i) in Object.keys(res.terms)" :key="i">{{term}}</view></uni-td>
            <uni-td><view v-for="(term, i) in Object.values(res.terms)" :key="i">{{term.price}}%</view></uni-td>
            <uni-td><view v-for="(term, i) in Object.values(res.terms)" :key="i">{{term.sourceCode}}<uni-icons type="right" size="16" color="#c3c9d3"></uni-icons></view></uni-td>
          </uni-tr>
        </uni-table>

<!--        <view class="thr_row_title">-->
<!--          <view class="sec_row_cont">-->
<!--            <view class="sec_row_tit">结构</view>-->
<!--&lt;!&ndash;            <view class="sec_row_value">{{ res.structureName }}</view>&ndash;&gt;-->
<!--          </view>-->
<!--          <view class="sec_row_cont">-->
<!--            <view class="sec_row_tit">期限</view>-->
<!--&lt;!&ndash;            <view class="sec_row_value">{{res.termName}}</view>&ndash;&gt;-->
<!--          </view>-->
<!--          <view class="sec_row_cont">-->
<!--            <view class="sec_row_tit">最优报价</view>-->
<!--&lt;!&ndash;            <view class="sec_row_value">3.40%</view>&ndash;&gt;-->
<!--          </view>-->
<!--          <view class="sec_row_cont">-->
<!--            <view class="sec_row_tit">报价方</view>-->
<!--&lt;!&ndash;            <view class="sec_row_value">{{ qutote.sourcecode }}<uni-icons type="right" size="16" color="#c3c9d3"></uni-icons></view>&ndash;&gt;-->
<!--          </view>-->
<!--        </view>-->
<!--        <view class="thr_row" v-for="(res, key) in structureData[index]" :key="key">-->
<!--          <view class="sec_row_cont">-->
<!--            <view class="sec_row_value">{{ res.structureName }}</view>-->
<!--          </view>-->
<!--          <view v-for="(term, i) in Object.keys(res.terms)" :key="i" style="display: flex;">-->
<!--            <view class="sec_row_cont">-->
<!--              <view class="sec_row_value">{{term}}</view>-->
<!--            </view>-->
<!--            <view class="sec_row_cont">-->
<!--              <view class="sec_row_value">{{ res.terms[term].price }}%</view>-->
<!--            </view>-->
<!--            <view class="sec_row_cont">-->
<!--              <view class="sec_row_value">{{ res.terms[term].sourceCode }}<uni-icons type="right" size="16" color="#c3c9d3"></uni-icons></view>-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->
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
import {inquiryHistory} from "@/api";
import type {InquiryResp, QuoteResult} from "@/interfaces/inquiry/inquiryQuote";
import {onShow} from "@dcloudio/uni-app";

const store = useStore();
const history = ref<InquiryHistoryResp[]|undefined>([]);
const moreDataStatus = ref<boolean>(!true);
const structureData = ref<any>([]);

onShow(() => {
  console.log("store.miniData1111", store.miniData)
  inquiryHistoryFun()
})

const inquiryHistoryFun = async () => {
  inquiryHistory().then((res:InquiryHistoryResp) => {
    console.log("res.inquiries", res.inquiries);

    res.inquiries!.map((data:InquiryResp) => {
      const filterData: any = {};

      data.inquiry_results.map((item: QuoteResult, index: number) => {
        if(!filterData[item.structure!]){
          filterData[item.structure!] = {
            structure: item.structure,
            structureName: item.structureName,
            terms: {
              [item.termName!]: item.quotes!.length > 0 && item.quotes![0],
            },
            sourceName: item.quotes!.length > 0 && item.quotes![0].sourceName,
            sourceCode: item.quotes!.length > 0 && item.quotes![0].sourceCode,
          };
        }else {
          filterData[item.structure!] = {
            ...filterData[item.structure!],
            terms: {
              ...filterData[item.structure!].terms,
              [item.termName!]: item.quotes!.length > 0 && item.quotes![0],
            },
          };
        }
      })

      structureData.value.push(Object.values(filterData))

    });

    // res.inquiries['filterData'] = filterData
    history.value = res.inquiries;
    console.log("structureData,", structureData.value)


  }).catch((err: Error) => {
    console.log("inquiryHistory err", err);
  });
}


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
.thr_row_title{
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

.uni-table-th {
  font-size: 14px !important;
  font-weight: lighter !important;
}

.uni-table-td {
  font-size: 14px !important;
  vertical-align: middle;
}

  .thr_row{
  border-bottom: none;
  padding-bottom: 0;
}

.sec_row_cont{
  width: calc(100% / 4);
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

.sec_row_tit{
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;
  color: #acacac;
  font-size: 13px;
}

.sec_row_value{
  width: 100%;
  padding-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;

}

.more_data_cont{
  width: 100%;
  padding: 10px 0;
  text-align: center;
}
</style>
