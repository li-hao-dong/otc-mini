<script setup lang="ts">
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, orderDetail} from "@/api";
import type {BankAccountInfoResp} from "@/interfaces/bankData";

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
</script>

<template>
  <view class="container">
    <!-- 状态概览 -->
    <view class="card">
      <view class="fir_title" style="color: #FF9800;">{{detail.orderStatus}} · 待购买</view>
      <view class="row">
        <view class="row_cont"><text>本次已支付金额：</text><text style="color:#E8473A">¥ {{ detail.paymentAmount }}</text></view>
      </view>
      <view class="row">
        <view class="row_cont">{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">订单号：{{detail.orderNo}}</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">
          我们已确认收到您的支付，正在为您向合作机构申请购买期权产品。
          资金已锁定，请耐心等待成交结果。
        </view>
      </view>
    </view>

    <!-- 订单进度 -->
    <view class="card">
      <view class="fir_title">订单进度(待开发？？？)</view>
      <view class="row"><view class="row_cont">✓ 订单已提交</view></view>
      <view class="row"><view class="row_cont">✓ 支付凭证已上传</view></view>
      <view class="row"><view class="row_cont">✓ 平台已确认收款</view></view>
      <view class="row"><view class="row_cont">● 正在向渠道申请购买期权</view></view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">
          预计成交时间：当日内。
          实际成交时间以《交易确认书》为准，如有异常我们会通过短信/微信通知您。
        </view>
      </view>
    </view>

    <!-- 产品要素 -->
    <view class="card">
      <view class="fir_title">产品信息</view>
      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view></view>
      <view class="row"><view class="row_cont"><text>合约结构：</text>{{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}（{{ detail.optionCode }}）</view></view>
      <view class="row"><view class="row_cont"><text>期权类型：</text>看涨期权（{{detail.optionType}}）</view></view>
      <view class="row"><view class="row_cont"><text>期限：</text>
        {{ detail.termName }}</view></view>
    </view>

    <!-- 支付信息（已确认） -->
    <view class="card">
      <view class="fir_title">支付信息（已确认）</view>
      <view class="row"><view class="row_cont"><text>支付状态：</text>已确认收款(写死？)</view></view>
      <view class="row"><view class="row_cont"><text>实际支付金额：</text>¥ {{paymentAmount}}</view></view>
      <view class="row"><view class="row_cont"><text>支付方式：</text>银行转账</view></view>
      <view class="row"><view class="row_cont"><text>付款银行：</text>
        {{ detail.bankName }}</view></view>
      <view class="row"><view class="row_cont"><text>付款账号：</text>尾号 {{ detail.bankAccount }}</view></view>
      <view class="row"><view class="row_cont"><text>支付时间：</text>{{detail.paymentTime}}</view></view>
      <view class="row"><view class="row_cont"><text>转账备注：</text>12cfe2566119 0000（没看到？？）</view></view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">如支付信息与您实际转账不符，请尽快联系客服核对。</view></view>
    </view>

    <!-- 文档与风险提示 -->
    <view class="card">
      <view class="fir_title">文档与风险提示</view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《交易确认书》（生成后可见）</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《产品说明书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《风险揭示书》</view></view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">
          场外个股期权属于高风险复杂金融产品，可能发生全部投资本金损失。
          当前资金已锁定，正在申请购买相应期权产品，请确认已充分阅读并理解相关文档，仅使用自有闲散资金参与投资。
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="submit">刷新订单状态</view>
    <view class="card">
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">我有疑问，联系客服</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">
          如长时间未更新为「已购买」，或对订单有疑问，
          请联系您的客户经理或在线客服。
        </view>
      </view>
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
      /*white-space: nowrap;*/

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
</style>
