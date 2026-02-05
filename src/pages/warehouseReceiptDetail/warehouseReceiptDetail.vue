<template>
  <view>
    <!--  待渠道确认1-->
    <pendingChannel v-if="detail?.orderStatus == '待渠道确认'" :detail="detail"></pendingChannel>
    <!--  已报价-待支付2-->
    <quotedWithPaddingPayment v-if="detail?.orderStatus == '已报价' || detail?.orderStatus == '待支付'" :detail="detail" :orderId="orderId" @callback="initDetail"></quotedWithPaddingPayment>
    <!--  已支付3-->
    <paid v-if="detail?.orderStatus == '已支付'" :detail="detail" :orderId="orderId"></paid>
    <!--  支付已确认4-->
    <paymentConfirmed v-if="detail?.orderStatus == '支付已确认'" :detail="detail" :orderId="orderId"></paymentConfirmed>
    <!--  已购买5 可行权-->
    <purchased v-if="detail?.orderStatus == '已购买'" :detail="detail" @callback="initDetail"></purchased>
    <!--  已到期6-->
    <matured v-if="detail?.orderStatus == '已到期'" :detail="detail"></matured>
    <!--  已行权7-->
    <exercised v-if="detail?.orderStatus == '已行权'" :detail="detail"></exercised>
    <!--  已结算8-->
    <settled v-if="detail?.orderStatus == '已结算'" :detail="detail" :orderId="orderId"></settled>
    <!--  已取消9-->
    <cancel v-if="detail?.orderStatus == '已取消'" :detail="detail" :orderId="orderId"></cancel>
  </view>
</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {getUserGroupOrderSuccessOrders, orderDetail} from "@/api";
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import PendingChannel from "@/pages/warehouseReceiptDetail/pendingChannel.vue";
import QuotedWithPaddingPayment from "@/pages/warehouseReceiptDetail/quotedWithPaddingPayment.vue";
import Paid from "@/pages/warehouseReceiptDetail/paid.vue";
import PaymentConfirmed from "@/pages/warehouseReceiptDetail/paymentConfirmed.vue";
import Purchased from "@/pages/warehouseReceiptDetail/purchased.vue";
import Matured from "@/pages/warehouseReceiptDetail/matured.vue";
import Exercised from "@/pages/warehouseReceiptDetail/exercised.vue";
import Settled from "@/pages/warehouseReceiptDetail/settled.vue";
import type {UserGroupOrderDetailResp} from "@/interfaces/groupOrders/getUserGroupOrderDetail";
import {truncToTwo} from "@/utils";
import Cancel from "@/pages/warehouseReceiptDetail/cancel.vue";

enum OrderType {
  GroupOrder = "GROUPORDER",
  Order = "ORDER"
}

const detail = ref<OrderDetail | UserGroupOrderDetailResp | null>(null);
const orderId = ref<string>("");
const orderType = ref<OrderType>();

onLoad((option) => {
  if(option?.groupOrderNo){
    // 获取拼单详情
    orderId.value = option?.groupOrderNo
    orderType.value = OrderType.GroupOrder
    getGroupOrderDetail(option?.groupOrderNo)
  }else if(option?.id){
    // 获取仓单详情
    orderId.value = option?.id
    orderType.value = OrderType.Order
    getDetail(option?.id)
  }
})

const initDetail = () => {
  if(orderType.value === OrderType.GroupOrder && orderId.value){
    // 获取拼单详情
    getGroupOrderDetail(orderId.value)
  }else if(orderType.value === OrderType.Order && orderId.value){
    // 获取仓单详情
    getDetail(orderId.value)
  }
}

// 获取订单详情
const getDetail = (orderId: string) => {
  orderDetail(orderId).then(res => {
    // console.log("订单详情", res)
    detail.value = res
  })
}

// 获取拼单详情
const getGroupOrderDetail = (groupOrderNo: string) => {
  getUserGroupOrderSuccessOrders(groupOrderNo).then(res => {
    // console.log("拼单详情", res)
    detail.value = res
    orderId.value = res.orderNo

  })
}
</script>


<style scoped>
.container {
  min-height: 100dvh;
  background-color: #F7F7F7;
  padding: 10px 0;
}

/* 与 warehouseReceipts 完全统一的卡片样式 */
.card {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 16px auto;
  padding: 5%;
  box-sizing: border-box;
}

/* 与 warehouseReceipts 完全统一的标的信息区域 */
.assetInfo {
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

/* 与 warehouseReceipts 完全统一的数据行样式 */
.rowBorder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
}

.dataText {
  width: 50%;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

.dataText text {
    color: #999999;
}

.valueGreen {
  color: #2ECC71;
}

.linkBlue {
  color: #1E90FF;
}

/* 收款信息卡片样式 */
.payment-card {
  border-radius: 12px;
  padding: 30px 20px 20px;
}

.card-title {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.21em;
  color: #333333;
  margin-bottom: 14px;
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
}

.payment-row .payment-label {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #999999;
}

.payment-row .payment-value {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

/* 上传支付凭证卡片样式 */
.upload-card {
  border-radius: 12px;
  padding: 30px 20px 20px;
}

.upload-area {
  width: 102px;
  height: 98px;
  border: 1px dashed #CCCCCC;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.camera-icon {
  font-size: 24px;
  margin-bottom: 6px;
}

.upload-text {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #AAAAAA;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.upload-tips {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #999999;
}
</style>
