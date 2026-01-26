<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, BASE_URL, getImage, orderDetail, paymentProofInfo} from "@/api";
import type {BankAccountInfoResp} from "@/interfaces/bankData";
import {useStore} from "@/stores";
import {formatLocalTime, truncToTwo} from "@/utils";
import type {UserGroupOrderDetailResp} from "@/interfaces/groupOrders/getUserGroupOrderDetail";

const voucher = ref<string>()
// const detail = ref<OrderDetail | null>(null);
const bankReceiptInfoData = ref<BankAccountInfoResp>();
const remitData = reactive({
  bankAccount: null,
  bankName: null,
  paymentAmount: 0,
  paymentTime: null,
  uploadTime: null,
  voucherUrl: null
})
const props = defineProps<{orderId: string, detail: OrderDetail | UserGroupOrderDetailResp}>();

// onLoad((option) =>{
//   console.log("option", option)
//   getDetail(option?.id)
//   // getBankReceiptInfo(option?.id)
//   getPaymentProofInfo(option?.id)
// })

// watch(() => props.detail, (newVal) => {
//   if(newVal){
//     detail.value = newVal;
//   }
// })

watchEffect(() => {
  downloadImage(props.detail?.paymentVoucherUrl || "")
})


const getDetail = (orderId: string) => {
  orderDetail(orderId).then(res => {
    // console.log("订单详情", res)
    detail.value = res
    uni.downloadFile({
      url: `${BASE_URL}${res.paymentVoucherUrl}`,
      header:{
        'Authorization': `Bearer ${useStore().user.token}`
      },
      success: res => {
        // console.log("下载支付凭证结果", res)
        if(res.statusCode === 200){
          voucher.value = res.tempFilePath;
        }
      }
    })
  })
}

function downloadImage(url: string) {
  if (!url) {
    return;
  }
  uni.downloadFile({
    url: `${BASE_URL}${url}`,
    header:{
      'Authorization': `Bearer ${useStore().user.token}`
    },
    success: res => {
      // console.log("下载支付凭证结果", res)
      if(res.statusCode === 200){
        voucher.value = res.tempFilePath;
      }
    }
  })
}

const getBankReceiptInfo = (orderId: string) => {
  bankReceiptInfo(orderId).then(res => {
    // console.log("银行收款信息", res)
    bankReceiptInfoData.value = res;
  })
}

const getPaymentProofInfo = (orderId:string) => {
  paymentProofInfo(orderId).then(res => {
    // console.log("支付凭证信息", res)
    // voucher.value = res.paymentVoucherUrl;
    remitData.bankAccount = res.bankAccount;
    remitData.bankName = res.bankName;
    remitData.paymentAmount = res.paymentAmount;
    remitData.paymentTime = res.paymentTime;
    remitData.uploadTime = res.uploadTime;
    remitData.voucherUrl = res.voucherUrl;
  })
}

const previewImage = () =>  {
  uni.previewImage({
    current: voucher.value, // 当前预览的图片链接
    urls: [voucher.value],  // 预览列表（单图仅需自身）
    indicator: "number", // 显示数字指示器
    success: (res) => {
      // console.log("预览成功", res);
    },
    fail: (err) => {
      console.error("预览失败", err);
    }
  });
}

watch(() => props.orderId, (newVal) => {
  if(newVal){
    // getDetail(newVal)
    // getBankReceiptInfo(newVal)
    getPaymentProofInfo(newVal)
  }
}, {immediate: true})
</script>

<template>
  <!--  OrderStatus::Paid => "已支付",-->
  <view class="container">
    <!-- 订单状态 -->
    <view class="card">
      <view class="fir_title">订单状态</view>
      <view class="fir_title" style="color: #2ECC71;">{{detail.orderStatus}}</view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">
          我们已接收您的支付凭证，正在核对银行到账情况。资金尚未最终确认，请以“支付已确认”状态为准。
        </view>
      </view>
      <view class="row">
        <view class="row_cont"><text>本次实付金额：</text>¥ {{ truncToTwo(detail.paymentAmount) }}</view>
      </view>
    </view>

    <!-- 产品信息 -->
    <view class="card">
      <view class="fir_title">产品信息</view>
      <view class="row">
        <view class="row_cont">{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType.toUpperCase() === "CALL" ? '看涨':'看跌'}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单号：</text>{{detail.orderNo}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>下单时间：</text>{{ formatLocalTime(new Date(detail.createdTime)) }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单类型：</text>{{detail.optionType}}</view>
      </view>
    </view>

    <!-- 费用明细 -->
    <view class="card">
      <view class="fir_title">费用明细</view>
      <view class="row">
        <view class="row_cont"><text>名义本金：</text>¥ {{ truncToTwo(detail.nominalAmount) }}</view>
        <view class="row_cont"><text>期权费率：</text>{{ truncToTwo(detail.optionFeeRate * 100) }}%</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>期权费：</text>¥ {{ truncToTwo(detail.optionFee) }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>通道费：</text>¥ {{ truncToTwo(detail.transactionFee) }}</view>
      </view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
      </view>
      <view class="row">
        <view class="row_cont"><text>合计应付：</text>¥ {{ truncToTwo(Number(detail.optionFee) + Number(detail.transactionFee)) }}</view>
      </view>
    </view>

    <!-- 支付信息 -->
    <view class="card">
      <view class="fir_title">支付信息</view>
      <view class="row">
        <view class="row_cont"><text>支付状态：</text>{{detail?.orderStatus}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>实际支付金额：</text>¥ {{truncToTwo(remitData.paymentAmount)}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付时间：</text>
          {{ formatLocalTime(new Date(remitData.paymentTime)) }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>汇款银行：</text>
          {{ remitData.bankName ? remitData.bankName : '(无)' }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>汇款账号：</text>{{remitData.bankAccount ? remitData.bankAccount:'(无)'}}</view>
      </view>
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>转账备注：</text>-->
<!--          {{ remitData.notes ? remitData.notes: '(无)' }}</view>-->
<!--      </view>-->
    </view>

    <!-- 收款信息 -->
<!--    <view class="card">-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款户名：</text>-->
<!--          {{ bankReceiptInfoData.accountName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款银行：</text>{{ bankReceiptInfoData.bankName }} {{ bankReceiptInfoData.branchName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>银行账号：</text>{{ bankReceiptInfoData.bankAccount }}</view>-->
<!--      </view>-->
<!--    </view>-->

    <!-- 支付凭证 -->
    <view class="card">
      <view class="fir_title">支付凭证</view>
      <view class="upload-card">
<!--        <view class="upload-area">-->
<!--          <view v-if="voucher"  class="upload-placeholder">-->
<!--            <img :src="voucher" alt="" srcset="" />-->
<!--          </view>-->
<!--          <view v-else class="upload-placeholder" @click="upImage">-->
<!--            <view class="camera-icon">📷</view>-->
<!--            <text class="upload-text">支付凭证图片</text>-->
<!--          </view>-->
<!--        </view>-->
        <view class="row">
          <view class="row_cont" style="color: #5E8ED6; font-size: 13px;" @click="previewImage">[ 放大查看 ]</view>
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
      //white-space: nowrap;

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
