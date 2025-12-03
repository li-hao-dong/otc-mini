import { ref } from "vue";

<script setup lang="ts">

import {ref} from "vue";

const voucher = ref<string | string[]>()

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
  <view class="container">
<!--    OrderStatus::Quoted => "已报价",-->
<!--    OrderStatus::PendingPayment => "待支付",-->
    <view class="card">
      <view class="fir_title">金额摘要</view>
      <view class="row">
        <view class="row_cont"><text>本次应付金额:</text> ¥ 99,800.00</view>
      </view>
      <view class="row">
        <view class="row_cont">中国铝业 601600.SH · 平值100看涨</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单号：</text>ORD2025-1101-0001   （小字）</view>
      </view>
    </view>

    <view class="card">
      <view class="fir_title">费用明细</view>
      <view class="row">
        <view class="row_cont"><text>名义本金：</text>¥ 1,000,000.00</view>
        <view class="row_cont"><text>期权费率：</text>9.38%</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>期权费：</text>¥ 93,800.00</view>
      </view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
        <view class="row_cont"><text>手续费：</text>¥ 6,000.00</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>合计应付：</text>¥ 99,800.00</view>
      </view>
    </view>

    <view class="card">
      <view class="fir_title">收款信息</view>
      <view class="row">
        <view class="row_cont"><text>收款户名：</text>北京某某科技有限公司</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>收款银行：</text>中国银行 北京中关村支行</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>银行账号：</text>1234 5678 9012 3456</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>转账备注：</text>12cfe2566119 0000</view>
      </view>
    </view>

    <view class="card">
      <view class="fir_title">上传支付凭证</view>
      <view class="row">
        <view class="row_cont"><text>实际支付金额：</text>¥ 99,800.00</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付时间：</text>2025-11-01 15:02</view>
      </view>
      <!-- 上传支付凭证卡片 -->
      <view class="upload-card">
<!--        <view class="card-title">支付凭证图片 + 上传支付凭证</view>-->

        <view class="upload-area">
          <view v-if="voucher"  class="upload-placeholder">
            <img :src="voucher" alt="" srcset="" />
          </view>
          <view v-else class="upload-placeholder" @click="upImage">
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

    <view class="submit">
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
