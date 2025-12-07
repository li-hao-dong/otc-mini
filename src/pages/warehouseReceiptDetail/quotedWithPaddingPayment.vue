<script setup lang="ts">

import {reactive, ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, orderDetail, uploadPaymentProof} from "@/api";
import type {BankAccountInfoResp} from "@/interfaces/bankData";

const orderId = ref<string>("")
const voucher = ref<string>()
const detail = ref<OrderDetail | null>(null);
const bankReceiptInfoData = ref<BankAccountInfoResp>();
const remitData = reactive<{accountName: string | null, bankName: string | null, bankAccount: string | null}>({
  accountName: null,
  bankName: null,
  bankAccount: null
})

onLoad((option) =>{
  console.log("option", option)
  orderId.value = option?.id;
  getDetail(orderId.value)
  getBankReceiptInfo(orderId.value)
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
// 上传支付凭证
const uploadPaymentVoucher = () => {
  console.log("11111")
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('选择的图片:', res);
      if(res.tempFiles[0].size > 1 * 1024 * 1024){
        uni.showToast({
          title: '图片大小不能超过1MB',
          icon: 'none'
        });
        return;
      }
      const tempFilePaths = res.tempFilePaths;

      if (!tempFilePaths[0].indexOf('jpg') && !tempFilePaths[0].indexOf('JPG') && !tempFilePaths[0].indexOf('PNG') && !tempFilePaths[0].indexOf('png') && !tempFilePaths[0].indexOf('jpeg') && !tempFilePaths[0].indexOf('JPEG')) {
        uni.showToast({
          title: '图片格式仅支持JPG、PNG',
          icon: 'none'
        });
        return;
      }

      if (tempFilePaths && tempFilePaths.length > 0) {
        voucher.value = tempFilePaths[0];
      }

    },
    fail: (err) => {
      console.error('选择图片失败:', err);
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      });
    }
  })
}

const uploadImage = () => {
  if (!voucher.value) {
    uni.showToast({
      title: '请先上传支付凭证',
      icon: 'none'
    });
    return;
  }

  if (!remitData.accountName) {
    uni.showToast({
      title: '请输入汇款人名称',
      icon: "none"
    })
    return;
  }
  if (!remitData.bankName) {
    uni.showToast({
      title: '请输入汇款银行名称',
      icon: "none"
    })
    return;
  }
  if (!remitData.bankAccount) {
    uni.showToast({
      title: '请输入汇款卡号',
      icon: "none"
    })
    return;
  }

  uploadPaymentProof(orderId.value, voucher.value, remitData.bankName, remitData.bankAccount).then(res => {
    console.log("上传支付凭证结果", res)
    uni.showToast({
      title: '支付凭证上传成功',
      icon: 'success'
    });
    setTimeout(()=>{
      uni.redirectTo({url: `/pages/warehouseReceiptDetail/paid?id=${orderId.value}`});
    }, 1500)
  }).catch(err => {
    console.error('上传支付凭证失败:', err);
    uni.showToast({
      title: '上传支付凭证失败',
      icon: 'none'
    });
  });
}
</script>

<template>
  <view class="container">
<!--    OrderStatus::Quoted => "已报价",-->
<!--    OrderStatus::PendingPayment => "待支付",-->
<!--    <view class="card">-->
<!--      <view class="fir_title">金额摘要</view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>本次应付金额:</text> ¥ {{ detail.paymentAmount }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont">{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>订单号：</text>{{detail.orderNo}}</view>-->
<!--      </view>-->
<!--    </view>-->

<!--    <view class="card">-->
<!--      <view class="fir_title">费用明细</view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>名义本金：</text>¥ {{ detail.nominalAmount }}</view>-->
<!--        <view class="row_cont"><text>期权费率：</text>-->
<!--          {{ detail.optionFeeRate }}%</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>期权费：</text>¥ {{ detail.optionFee }}</view>-->
<!--      </view>-->
<!--      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">-->
<!--        <view class="row_cont"><text>手续费：</text>¥ {{ detail.transactionFee }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>合计应付：</text>¥ {{ detail.optionFee + detail.transactionFee }}</view>-->
<!--      </view>-->
<!--    </view>-->

<!--    <view class="card">-->
<!--      <view class="fir_title">收款信息</view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款户名：</text>-->
<!--          {{ bankReceiptInfoData.accountName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款银行：</text>-->
<!--          {{ bankReceiptInfoData.bankName }} {{ bankReceiptInfoData.branchName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>银行账号：</text>{{bankReceiptInfoData.bankAccount}}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>转账备注：</text>-->
<!--          {{ bankReceiptInfoData.notes }}</view>-->
<!--      </view>-->
<!--    </view>-->

    <view class="card">
      <view class="fir_title">汇款信息</view>
      <view class="row">
        <view class="row_cont remittance"><text>汇款户名：</text>
          <input type="text" v-model="remitData.accountName" placeholder="请输入汇款户名"></view>
      </view>
      <view class="row">
        <view class="row_cont remittance"><text>汇款银行：</text>
          <input type="text" v-model="remitData.bankName" placeholder="请输入汇款银行">
        </view>
      </view>
      <view class="row">
        <view class="row_cont remittance"><text>汇款账号：</text>
          <input type="text" v-model="remitData.bankAccount" placeholder="请输入汇款账号">
        </view>
      </view>
    </view>

    <view class="card">
      <view class="fir_title">上传支付凭证</view>
      <view class="row">
        <view class="row_cont"><text>实际支付金额：</text>¥ {{ detail.paymentAmount }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付时间：</text>
          {{ detail.paymentTime }}</view>
      </view>
      <!-- 上传支付凭证卡片 -->
      <view class="upload-card">
<!--        <view class="card-title">支付凭证图片 + 上传支付凭证</view>-->

        <view class="upload-area">
          <view v-if="voucher"  class="upload-placeholder">
            <img :src="voucher" alt="" srcset="" />
          </view>
          <view v-else class="upload-placeholder" @click="uploadPaymentVoucher">
            <view class="camera-icon">📷</view>
            <text class="upload-text">支付凭证图片</text>
          </view>
        </view>

        <view class="upload-tips">
          <text>风险提示：场外个股期权属于高风险复杂金融产品，可能发生全部投资本金损失。
            请确认已充分阅读并理解产品说明及风险揭示书，仅使用自有闲散资金参与投资。</text>
        </view>
      </view>
    </view>

    <view class="submit" @click="uploadImage">
      提交支付凭证
    </view>
  </view>
</template>

<style scoped lang="scss">
.card{
  width: 90%;
  margin: auto;
  padding: 10px;
  /*box-sizing: border-box;*/
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

    .remittance{
      width: 100%;
      display: flex;
      align-items: center;
    }

    .remittance input{
      width: 100%;
      border: 1px solid #999999;
      padding: 5px 10px;
      border-radius: 5px;
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
