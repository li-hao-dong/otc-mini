<script setup lang="ts">
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, orderDetail} from "@/api";
import type {BankAccountInfoResp} from "@/interfaces/bankData";

const voucher = ref<string | string[]>()
const detail = ref<OrderDetail | null>(null);
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

const upImage = () => {
  uni.chooseMedia({
    count: 1, // 可选数量
    mediaType: ['image'], // 仅选择图片
    success(res) {
      console.log("res", res)
      const tempFiles = res.tempFiles; // 获取临时文件路径
      voucher.value = tempFiles[0].tempFilePath;
      // 后续上传逻辑
      // uni.uploadFile({
      //   url: 'YOUR_SERVER_URL',
      //   filePath: tempFiles[0].tempFilePath,
      //   name: 'file',
      //   success(uploadRes) {
      //     console.log(uploadRes.data);
      //   }
      // });
    }
  });
}
</script>

<template>
  <!--  OrderStatus::Paid => "已支付",-->
  <view class="container">
    <!-- 订单状态 -->
    <view class="card">
      <view class="fir_title" style="color: #2ECC71;">｛｛detail.orderStatus｝｝</view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">
          我们已确认收到您的汇款，产品将按约定条款进行后续处理（建仓 / 持有 / 到期结算等）。
        </view>
      </view>
      <view class="row">
        <view class="row_cont"><text>本次实付金额：</text>¥ {{ detail.paymentAmount }}</view>
      </view>
    </view>

    <!-- 产品信息 -->
    <view class="card">
      <view class="fir_title">产品信息</view>
      <view class="row">
        <view class="row_cont">{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单号：</text>{{detail.orderNo}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>下单时间：</text>{{ detail.createdTime }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单类型：</text>个股场外期权(写死？)</view>
      </view>
    </view>

    <!-- 费用明细 -->
    <view class="card">
      <view class="fir_title">费用明细</view>
      <view class="row">
        <view class="row_cont"><text>名义本金：</text>¥ {{ detail.nominalAmount }}</view>
        <view class="row_cont"><text>期权费率：</text>{{ detail.optionFeeRate }}%</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>期权费：</text>¥ {{ detail.optionFee }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>手续费：</text>¥ {{ detail.transactionFee }}</view>
      </view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
      </view>
      <view class="row">
        <view class="row_cont"><text>合计应付：</text>¥ {{ detail.optionFee + detail.transactionFee }}</view>
      </view>
    </view>

    <!-- 支付信息 -->
    <view class="card">
      <view class="fir_title">支付信息</view>
      <view class="row">
        <view class="row_cont"><text>支付状态：</text>已确认（写死？）</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>实际支付金额：</text>¥ {{detail.paymentAmount}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付时间：</text>
          {{ detail.paymentTime }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>汇款银行：</text>
          {{ bankReceiptInfoData.bankName }}(无)</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>汇款账号：</text>{{bankReceiptInfoData.bankAccount}}(无)</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>转账备注：</text>
          {{ bankReceiptInfoData.notes }}(无)</view>
      </view>
    </view>

    <!-- 收款信息 -->
    <view class="card">
      <view class="fir_title">收款信息</view>
      <view class="row">
        <view class="row_cont"><text>收款户名：</text>
          {{ bankReceiptInfoData.accountName }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>收款银行：</text>{{ bankReceiptInfoData.bankName }} {{ bankReceiptInfoData.branchName }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>银行账号：</text>{{ bankReceiptInfoData.bankAccount }}</view>
      </view>
    </view>

    <!-- 支付凭证 -->
    <view class="card">
      <view class="fir_title">支付凭证</view>
      <view class="upload-card">
        <view class="upload-area">
          <view v-if="voucher"  class="upload-placeholder">
            <img :src="voucher" alt="" srcset="" />
          </view>
          <view v-else class="upload-placeholder" @click="upImage">
            <view class="camera-icon">📷</view>
            <text class="upload-text">支付凭证图片</text>
          </view>
        </view>
        <view class="row">
          <view class="row_cont" style="color: #5E8ED6; font-size: 13px;">[ 放大查看 ]</view>
        </view>
      </view>
    </view>

    <!-- 风险提示 -->
    <view class="card">
      <view class="fir_title">风险提示</view>
      <view class="upload-tips">
        <text>风险提示：场外个股期权属于高风险复杂金融产品，可能发生全部投资本金损失。
          请确认已充分阅读并理解产品说明及风险揭示书，仅使用自有闲散资金参与投资。</text>
      </view>
      <view class="row" style="margin-top: 10px;">
        <view class="row_cont" style="color: #5E8ED6; font-size: 12px;">查看《产品说明书》</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color: #5E8ED6; font-size: 12px;">查看《风险揭示书》</view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="submit">
      联系客服
    </view>
  </view>
</template>

<style scoped lang="scss">
.card{
  width: 90%;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid silver;

  .fir_title{
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .row{
    padding: 2px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .row_cont{
      white-space: nowrap;

      text{
        color: #999999;
      }
    }
  }
}

.submit{
  margin: auto;
  margin-top: 20px;
  width: 95%;
  text-align: center;
  background: var(--color-primary-bg);
  line-height: 50px;
  border-radius: 15px;
  box-sizing: border-box;
  color: #FFFFFF;
}

/* 上传支付凭证卡片样式 */
.upload-card {
  border-radius: 12px;
  padding: 15px 0;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  overflow: hidden;
}

.upload-placeholder img,
.upload-placeholder image{
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
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

.upload-tips {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #999999;
}
</style>
