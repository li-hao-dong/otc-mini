<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, getUserOrderInfo, orderDetail} from "@/api";
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import type { BankAccountInfoResp } from "@/interfaces/bankData";

const detail = ref<OrderDetail | null>(null);
const paymentVoucherImage = ref<string>('');
const bankReceiptInfoData = ref<BankAccountInfoResp>();

onLoad((option) =>{
  console.log("option", option)
  getDetail(option?.id)
  getBankReceiptInfo(option?.id)
})

const getDetail = (orderId: string) => {
  orderDetail(orderId).then(res => {
    console.log("订单详情", res)
    detail.value = res
  })
}

const getBankReceiptInfo = (orderId: string) => {
  bankReceiptInfo(orderId).then(res => {
    console.log("银行收款信息", res)
    bankReceiptInfoData.value = res;
  })
}


// 格式化日期
const formatDate = (date: Date | null | undefined) => {
  if (!date) return 'xxxxx';
  const d = new Date(date);
  return d.toISOString().split('T')[0].replace(/-/g, '');
}

// 格式化金额
const formatAmount = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return '0';
  return `${amount.toFixed(2)}元`;
}

// 上传支付凭证
const uploadPaymentVoucher = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths;
      if (tempFilePaths && tempFilePaths.length > 0) {
        paymentVoucherImage.value = tempFilePaths[0];
        // TODO: 上传到服务器
        console.log('选择的图片:', tempFilePaths[0]);
      }
    },
    fail: (err) => {
      console.error('选择图片失败:', err);
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      });
    }
  });
}
</script>

<template>
  <view class="container">
    <!-- 仓单详情卡片 -->
    <view class="card">
      <!-- 标的信息区域 -->
      <view class="assetInfo">
        <view>
          <view class="assetName">{{ detail?.underlyingAssetName}}</view>
          <view class="assetCode">{{ detail?.underlyingAssetCode }}</view>
        </view>
        <view class="row priceRow">
          <view class="para"><text class="label">股价：</text></view>
          <view class="para"><text class="valueRed">{{ detail?.underlyingPrice}}</text></view>
        </view>
        <view class="row changeRow">
          <text class="label">涨幅：{{ detail?.priceChange}}</text>
        </view>
      </view>

      <!-- 详细信息列表 -->
      <view class="rowBorder">
        <text class="dataText"><text>开仓时间：</text>{{ formatDate(detail?.startDate) }}</text>
        <text class="dataText"><text>到期时间：</text>{{ formatDate(detail?.maturityDate) }}</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>期权代码：</text>{{ detail?.optionCode}}</text>
        <text class="dataText"><text>名义本金：</text>{{ detail?.nominalAmount ? (detail.nominalAmount / 10000).toFixed(0) : 0 }}万</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>期限：</text>{{ detail?.termName }}</text>
        <text class="dataText"><text>剩余天数：</text>{{ detail?.daysToExpiry }}天</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>开仓价格：</text>{{ formatAmount(detail?.underlyingPrice) }}</text>
        <text class="dataText"><text>行权价格：</text>{{ formatAmount(detail?.strikePrice) }}</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>预计回款：</text>{{ formatAmount(detail?.estimatedPayout) }}</text>
        <text class="dataText"><text>预计盈亏：</text>{{ formatAmount(detail?.estimatedProfit) }}</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>期权费：</text>{{ formatAmount(detail?.optionFee) }}</text>
        <text class="dataText"><text>盈亏比例：</text>{{ detail?.profitRate ? (detail.profitRate * 100).toFixed(2) : 0 }}%</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>交易商：</text>{{ detail?.sourceName }}</text>
        <text class="dataText"><text>期权费率：</text>{{ detail?.optionFee && detail?.nominalAmount ? ((detail.optionFee / detail.nominalAmount) * 100).toFixed(2) : 0 }}%</text>
      </view>

      <view class="rowBorder">
        <text class="dataText"><text>通道费：</text>{{ formatAmount(detail?.transactionFee) }}</text>
      </view>
    </view>

    <!-- 收款信息卡片 -->
    <view class="card payment-card">
      <view class="card-title">收款信息</view>

      <view class="payment-info">
        <view class="payment-row">
          <text class="payment-label">收款银行名称</text>
          <text class="payment-value">{{ bankReceiptInfoData?.bankName }}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">收款银行账号</text>
          <text class="payment-value">{{ bankReceiptInfoData?.bankAccount }}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">收款账户名称</text>
          <text class="payment-value">{{ bankReceiptInfoData?.customerName }}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">开户支行</text>
          <text class="payment-value">{{bankReceiptInfoData?.branchName}}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">应付金额</text>
          <text class="payment-value">{{ formatAmount(bankReceiptInfoData?.paymentAmount) }}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">支付截止时间</text>
          <text class="payment-value">{{bankReceiptInfoData?.deadline}}</text>
        </view>
        <view class="payment-row">
          <text class="payment-label">转账备注</text>
          <text class="payment-value">{{bankReceiptInfoData?.notes}}</text>
        </view>
      </view>
    </view>

    <!-- 上传支付凭证卡片 -->
    <view class="card upload-card">
      <view class="card-title">上传支付凭证</view>

      <view class="upload-area" @tap="uploadPaymentVoucher">
        <view v-if="!paymentVoucherImage" class="upload-placeholder">
          <view class="camera-icon">📷</view>
          <text class="upload-text">添加图片</text>
        </view>
        <image v-else :src="paymentVoucherImage" class="uploaded-image" mode="aspectFit" />
      </view>

      <view class="upload-tips">
        <text>特别提示：上传的图片大小控制在 1M 以内，超出请压缩或者裁剪。</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.container {
  min-height: 100vh;
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
