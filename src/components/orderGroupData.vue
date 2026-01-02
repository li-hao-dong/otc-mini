<template>
  <view class="container">
    <view class="card">
      <view class="fir_title">拼单信息</view>
<!--      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view></view>-->
<!--      <view class="row"><view class="row_cont"><text>订单号：</text>-->
<!--        {{ detail.orderNo }}</view></view>-->
      <view class="row"><view class="row_cont"><text>拼单类型：</text>拼单订单</view></view>
      <view class="row">
        <view class="row_cont">
          <text>拼单⻆⾊：</text>
          发起⼈ / 成员
        </view>
      </view>
      <view class="row"><view class="row_cont"><text>拼单⼈数：</text>2 / 3 ⼈</view></view>
      <view class="row"><view class="row_cont"><text>拼单模式：</text>官⽅推荐标的拼单</view></view>
      <view class="row"><view class="row_cont"><text>拼单服务费：</text>订单盈利部分的 15%，仅在盈利时收取</view></view>
      <view class="row"><view class="row_cont"><text>拼单状态：</text>？？？</view></view>
      <view class="hint_cont">
        ◦ 拼单进度和其他成员的⽀付情况仅作参考，实际购买、⾏权与结算仍以本订单的《交易确认
        书》为准。
        ◦ 拼单服务费将于本订单「已结算」时，根据实际盈利情况按 15% ⽐例计收；如本订单亏损，则
        不收取拼单服务费。
      </view>
      <view class="row">查看拼单详情</view>
    </view>
    拼单信息
    拼单类型： 拼单订单
    拼单⻆⾊： 发起⼈ / 成员
    拼单⼈数： 2 / 3 ⼈
    拼单模式：官⽅推荐标的拼单
    拼单服务费：订单盈利部分的 15%，仅在盈利时收取
    拼单状态：
    • 拼单中（group_status = OPEN）
    • 等待成员⽀付（PAYING）
    • 拼单已成团（PAID）
    • 拼单已超时（TIMEOUT）
    • 拼单已取消（CANCELLED）
    [⼩字灰⾊]
    ◦ 拼单进度和其他成员的⽀付情况仅作参考，实际购买、⾏权与结算仍以本订单的《交易确认
    书》为准。
    ◦ 拼单服务费将于本订单「已结算」时，根据实际盈利情况按 15% ⽐例计收；如本订单亏损，则
    不收取拼单服务费。
    [按钮]
    [  ] （跳转到“拼单详情⻚”）
  </view>
</template>

<script setup>

import {formatLocalTime} from "@/utils";
</script>

<style lang="scss" scoped>

</style>
