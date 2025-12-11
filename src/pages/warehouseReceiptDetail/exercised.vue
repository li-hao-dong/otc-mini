<script setup lang="ts">

import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {orderDetail} from "@/api";
import {formatLocalTime, truncToTwo} from "@/utils";

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
  <view class="container">
    <view class="card">
      <view class="fir_title" style="color:#FF9800;">已行权 · 待结算</view>
      <view class="row"><view class="row_cont">您已成功提交行权申请，并由平台与合作机构确认受理。当前订单正在进行资金结算与对账，请耐心等待。</view></view>
      <view class="row"><view class="row_cont"><text>本次行权比例：</text>100%</view></view>
      <view class="row"><view class="row_cont"><text>行权方式：</text>手动行权</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">本页面仅说明行权申请已生效，实际收益情况将在订单状态更新为「已结算」后统一展示。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">产品与合约要素</view>
      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail?.underlyingAssetName }} {{ detail?.underlyingAssetCode }} · {{detail?.structureDisplayName}}{{detail?.optionType === "Call" ? '看涨':'看跌'}}</view></view>
      <view class="row"><view class="row_cont"><text>订单号：</text>{{ detail?.orderNo }}</view></view>
      <view class="row"><view class="row_cont"><text>订单类型：</text>个股场外期权</view></view>
      <view class="row"><view class="row_cont"><text>生效日期：</text>{{ formatLocalTime(new Date(detail?.createdTime)) }}</view></view>
      <view class="row"><view class="row_cont"><text>到期日期：</text>{{ formatLocalTime(new Date(detail?.maturityDate)) }}</view></view>
      <view class="row"><view class="row_cont"><text>期限：</text>{{ detail?.termName }}</view></view>
      <view class="row"><view class="row_cont"><text>合约结构：</text>{{detail?.structureDisplayName}}{{detail?.optionType === "Call" ? '看涨':'看跌'}}（{{ detail?.optionCode }}）</view></view>
      <view class="row"><view class="row_cont"><text>期权类型：</text>看涨期权（{{ detail?.optionType }}）</view></view>
      <view class="row"><view class="row_cont"><text>行权方式：</text>欧式，到期一次性现金结算</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">本模块为合约关键信息摘要，完整条款以《产品说明书》《交易确认书》为准。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">资金投入与成本</view>
      <view class="row"><view class="row_cont"><text>名义本金：</text>¥ {{truncToTwo(detail?.nominalAmount)}}</view></view>
      <view class="row"><view class="row_cont"><text>期权费率：</text>{{ truncToTwo(detail?.optionFeeRate * 100) }}%</view></view>
      <view class="row"><view class="row_cont"><text>期权费：</text>¥ {{ truncToTwo(detail?.optionFee) }}</view></view>
      <view class="row"><view class="row_cont"><text>手续费：</text>¥ {{truncToTwo(detail?.transactionFee)}}</view></view>
      <view class="row"><view class="row_cont"><text>总计支出：</text>¥ {{truncToTwo(detail?.transactionFee + detail?.optionFee)}}</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">上述为您在本笔订单中的历史投入与费用情况，并不代表最终结算金额，实际盈亏请以「已结算」状态页面及正式结算单为准。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">文档与风险提示</view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《交易确认书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《产品说明书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《风险揭示书》</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">场外个股期权属于高风险复杂金融产品，可能发生全部期权费损失。本订单已完成行权申请，当前处于资金结算与交收阶段，具体收益及资金到账情况以合作机构最终结算结果和实际入账为准。</view></view>
    </view>

    <view class="submit">刷新订单状态</view>
    <view class="card"><view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">我有疑问，联系客服</view></view></view>
  </view>
</template>

<style scoped lang="scss">
.card{ width: 90%; margin: auto; padding: 10px; border-bottom: 1px solid silver;
  .fir_title{ font-size: 15px; font-weight: bold; margin-bottom: 8px; }
  .row{ padding: 2px 0; display: flex; align-items: center; justify-content: space-between;
    .row_cont{ text{ color: #999999; } }
  }
}
.submit{ margin: auto; margin-top: 20px; width: 95%; text-align: center; background: var(--color-primary-bg); line-height: 50px; border-radius: 15px; box-sizing: border-box; color: #FFFFFF; }
</style>
