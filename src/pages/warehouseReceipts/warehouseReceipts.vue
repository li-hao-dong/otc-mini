<template>
  <view class="container wrPage">
    <view class="topBar">
      <text class="topText">模拟机构</text>
      <text class="topText">录入 +</text>
    </view>

    <view class="segTabs">
      <view class="segItem" style="width: 100%;" v-for="(item, index) in orderType" :key="index" @click="orderTypeKey = index">
        <text :class="`${orderTypeKey === index ? 'segActive' : 'segText'}`" >
          {{item}} 
          <text>({{ index + 1 }})</text>
        </text>
        
        <view v-show="orderTypeKey === index" class="segUnderline"></view>
      </view>
    </view>

    <view class="segTabs">
      <view class="segItem" style="width: 100%;" v-for="(item, index) in orderUpOrDown" :key="index" >
        <text :class="`${orderUpOrDownKey === index ? 'segActive' : 'segText'}`" >{{item}}</text>
        <view v-show="orderUpOrDownKey === index" class="segUnderline"></view>
      </view>
    </view>

    <view class="card sumCard">
      <view class="sumRow">
        <view class="sumCol">
          <view class="sumMain">
            <view class="sumLabel">名义本金</view>
            <view class="sumValueRed">{{ordersSummary?.nominalAmount}}万</view>
          </view>
          <view class="sumMain">
            <view class="sumLabel">期权费</view>
            <view class="sumValueRed">{{ordersSummary?.optionFee}}元</view>
          </view>
        </view>
        <view class="sumCol">
           <view class="sumSub">
            <view class="subLabel">预计回款</view>
            <view class="subValueBlue">{{ordersSummary?.estimatedPayout}}元</view>
          </view>
         
          <view class="sumSub">
            <view class="subLabel">预计盈亏</view>
            <view class="subValueGreen">{{ordersSummary?.estimatedProfit}}元</view>
          </view>
          <view class="sumSub">
            <view class="subLabel">盈亏比例</view>
            <view class="subValueGreen">{{ordersSummary?.profitRate ? ordersSummary.profitRate * 100 : 0}}%</view>
          </view>
        </view>
      </view>
    </view>

    <view class="card" v-for="order in orderList" :key="order.orderId">
      <view class="assetInfo">
        <view>
          <view class="assetName">{{order?.underlyingAssetName}}</view>
          <view class="assetCode">{{order?.underlyingAssetCode}}</view>
        </view>
        <view class="row priceRow">
          <view class="para"><text class="label">股价：</text></view>
          <view class="para"><text class="valueRed">{{order?.underlyingPrice}}</text></view>
        </view>
        <view class="row changeRow">
          <text class="label">涨幅：{{order?.priceChange}}</text>
        </view>
      </view>

      <view class="rowBorder">
        <text class="dataText">开仓时间：{{order?.startDate}}</text>
        <text class="dataText">到期时间：{{order?.maturityDate}}</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期权代码：{{order?.optionCode}}</text>
        <text class="dataText">名义本金：{{order?.nominalAmount}}万</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期限：{{order?.termName}}</text>
        <text class="dataText">剩余天数：{{order?.daysToExpiry}}天</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">开仓价格：{{order?.underlyingPrice}}元</text>
        <text class="dataText">行权价格：{{order?.strikePrice}}元</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">预计回款：<text class="linkBlue">{{order?.estimatedPayout ? order.estimatedPayout : '-'}}元</text></text>
        <text class="dataText">预计盈亏：<text class="valueGreen">{{order?.estimatedProfit}}元</text></text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期权费：{{order?.upstreamFee || order?.optionFee}}元</text>
        <text class="dataText">盈亏比例：<text class="valueGreen">{{order?.profitRate ? order.profitRate * 100 : 0}}%</text></text>
      </view>
      <view class="rowBorder">
        <text class="dataText">交易商：{{order?.sourceShortName}}</text>
        <text class="dataText">期权费率：{{order?.optionFeeRate ? order.optionFeeRate * 100 : 0}}%</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">手续费：{{order?.transactionFee}}元</text>
      </view>

      <!-- <view class="actions">
        <text class="actionLink">设置目标价</text>
        <text class="actionLink">设置到期提醒</text>
        <view class="outlineBtn" role="button" tabindex="0"><text class="outlineText">行权</text></view>
      </view> -->
    </view>

    <view v-if="store.user.token">
      <view class="more_data_cont" v-if="moreDataStatus" @click="moreData">加载更多</view>
      <view class="more_data_cont" v-else>没有数据了</view>
    </view>
    <view class="hint" v-else>
      <view class="hint_sign">您还未登录，请先登录！</view>
      <button class="to_sign" @click="uni.switchTab({url: '/pages/user/user'})">去登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { getUserOrderInfo } from "@/api"
import { onLoad } from "@dcloudio/uni-app"
import type { OrdersSummary, OrderSummary, Pagination } from "@/interfaces/orders"
import { useStore } from "@/stores"
import { failToast } from "@/utils/toast/toast"


const store = useStore()
const orderTypeKey = ref<number>(0)
const orderType = ref<string[]>(['持仓中', '已结算'])
const orderUpOrDownKey = ref<number>(0)
// const orderUpOrDown = ref<string[]>(['香草', '雪球'])
const orderUpOrDown = ref<string[]>(['香草'])
const page = ref<number>(1)
const size = ref<number>(10)
const status = ref<string>('')
const orderList = ref<OrderSummary[]>([])
const ordersSummary = ref<OrdersSummary>()
const pagination = ref<Pagination>()
const moreDataStatus = ref<boolean>(true);

onLoad(() => {
  getUserOrder()
})

watch(() => orderTypeKey.value, () => {
  status.value = orderTypeKey.value === 0 ? '' : 'SETTLED'
  resetData()
  getUserOrder()
})

const resetData = () => {
  orderList.value = []
  page.value = 1
  orderList.value = []
  pagination.value = undefined
  ordersSummary.value = undefined
}

const moreData = () => {
    if(!moreDataStatus.value) return failToast("没有更多数据了");
    page.value += 1;
    getUserOrder()
}

const getUserOrder = () => {
  getUserOrderInfo(page.value, size.value, status.value).then(res => {
    moreDataStatus.value = res.pagination?.total_pages! >= page.value;
    if(orderList.value!.length > 0){
      orderList.value = orderList.value?.concat(res.orders!)
    }else {
      orderList.value = res.orders || [];
    }
    pagination.value = res.pagination
    ordersSummary.value = res.ordersSummary
  })
}

</script>

<style>
.wrPage {
  /* background-color: #F7F7F7; */
}

.topBar {
  background-color: var(--color-primary-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 2.5%;
  box-sizing: content-box;
}

.topText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  line-height: 1.21em;
  color: #FFFFFF;
}

.segTabs {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0 5px 0;
}

.segItem {
  width: 50%;
  text-align: center;
}

.segActive {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  /* line-height: 1.21em; */
  padding: 10px 0 ;
  color:var(--color-primary-bg);
}

.segText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  /* line-height: 1.21em; */
  color: #999999;
}

/* .segUnderline { width: 50%; height: 2px;  background-color: #E8473A; margin-top: 6px; } */
.segActive::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: 0;
  margin: auto;
  width: 50%;
  height: 2px;
  background-color: var(--color-primary-bg);
}

.sumCard {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.sumRow {
  width: 100%;
}

.sumCol {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  /* gap: 8px; */
  flex: 1;
}

.sumMain {
  width: 50%;
  text-align: center;
}

.sumLabel {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  padding: 8px 0;
  color: #333333;
}

.sumValueRed {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
  text-align: center;
}

/* .sumSub {
  display: flex;
  align-items: center;
  gap: 8px;
} */

.subLabel {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  padding: 8px 0;
  color: #333333;
}

.subValueBlue {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #1E90FF;
  text-align: center;
}

.subValueGreen {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #2ECC71;
  text-align: center;
}

.card {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 16px auto;
  padding: 5%;
  box-sizing: border-box;
}

.assetInfo{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.row {
  display: flex;
}

.para {
  display: flex;
  align-items: center;
  gap: 6px;
}

.assetName {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.21em;
  color: #000000;
}

.assetCode {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  /* line-height: 1.21em; */
  color: #999999;
  padding-top: 5px;
}

.label {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

.valueRed {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
}

.changeRow {
  padding: 6px 0 8px;
}

.rowBorder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  /* border-top: 1px solid #EEEEEE; */
}

.dataText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

.valueGreen {
  color: #2ECC71;
}

.linkBlue {
  color: #1E90FF;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 8px;
}

.actionLink {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #5E8ED6;
}

.outlineBtn {
  border: 1px solid #E8473A;
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outlineText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
}

.more_data_cont{
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

.hint{
  width: 100%;
  margin-top: 50%;
  margin-left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
}

.hint_sign{
  text-align: center;
}

.to_sign{
  width: fit-content;
  border-radius: 10px;
  outline: unset;
  border: unset;
  background: var(--color-primary-bg);
  color: white;
  font-size: 14px;
  margin-top: 15px;
}

.to_sign:after{
  content: '';
  border: unset;
}
</style>
