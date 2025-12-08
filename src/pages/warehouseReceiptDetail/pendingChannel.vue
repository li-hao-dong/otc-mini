<script setup lang="ts">
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {orderDetail} from "@/api";

const detail = ref<OrderDetail | null>(null);

onLoad((option) =>{
  console.log("option", option)
  getDetail(option?.id)
})

const getDetail = (orderId: string) => {
  orderDetail(orderId).then(res => {
    console.log("订单详情", res)
    detail.value = res
  })
}

</script>

<template>
  <!--  OrderStatus::PendingChannel => "待渠道确认", -->
  <view class="container">
    <!-- 订单状态 -->
    <view class="card">
      <view class="fir_title" style="color: #FF9800;">{{ detail.orderStatus }}</view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">
          我们已收到您的下单请求，正在向合作机构确认可用额度和价格。<br/>
          确认结果将通过站内消息 / 短信通知，请耐心等待。
        </view>
      </view>
    </view>

    <!-- 金额摘要 -->
    <view class="card">
      <view class="fir_title">金额摘要（预估）</view>
      <view class="row">
        <view class="row_cont"><text>预估应付金额：</text>¥ {{detail.estimatedPayout}}</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">(以渠道最终确认结果为准)</view>
      </view>
      <view class="row">
        <view class="row_cont">{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>订单号：</text>{{detail.orderNo}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>下单时间：</text>
          {{ detail.createdTime }}</view>
      </view>
    </view>

    <!-- 产品信息 -->
    <view class="card">
      <view class="fir_title">产品信息</view>
      <view class="row">
        <view class="row_cont"><text>标的名称：</text>
          {{ detail.underlyingAssetName }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>标的代码：</text>{{ detail.underlyingAssetCode }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>产品结构：</text>{{ detail.structureDisplayName }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>期限：</text>{{ detail.termName }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>交易类型：</text>{{detail.optionType}}</view>
      </view>
    </view>

    <!-- 费用概览 -->
    <view class="card">
      <view class="fir_title">费用概览</view>
      <view class="row">
        <view class="row_cont"><text>名义本金：</text>¥ {{detail.nominalAmount}}</view>
        <view class="row_cont"><text>期权费率：</text>
          {{ detail.optionFeeRate * 100 }}%</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>期权费（预估）：</text>¥ {{detail.optionFee}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>手续费（预估）：</text>¥ {{ detail.transactionFee }}</view>
      </view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
      </view>
      <view class="row">
        <view class="row_cont"><text>预估合计：</text>¥ {{ detail.optionFee + detail.transactionFee }}</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">(最终金额以渠道确认后为准)</view>
      </view>
    </view>

    <!-- 渠道处理进度 -->
    <view class="card">
      <view class="fir_title">渠道处理进度</view>
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>下单成功：</text>{{ detail.channelSubmitTime ? detail.channelSubmitTime : '' }}</view>-->
<!--      </view>-->
      <view class="row">
        <view class="row_cont"><text>当前状态：</text>{{ detail.orderStatus }}</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color: #999999; font-size: 12px;">
          渠道确认通过后，将生成正式收款信息和支付指引。<br/>
          在收到正式收款信息前，请勿自行向任何账户转账。
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

.upload-tips {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #999999;
}
</style>
