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
</script>

<template>
  <view class="container">
    <!-- 持仓概览 -->
    <view class="card">
      <view class="fir_title" style="color:#E8473A;">已购买 · 持有中 · 可行权(写死？？)</view>
      <view class="row">
        <view class="row_cont"><text>当前参考盈亏：</text><text style="color:#E8473A">+ ¥ {{detail.estimatedProfit}} ({{detail.profitRate}}%)</text></view>
      </view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">参考数据更新时间：2025-11-15 14:30(不知道字段???)</view>
      </view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">参考盈亏 = 当前预估期权价值 - 总计支出，仅供参考，不作为最终结算依据。</view>
      </view>
      <view class="row"><view class="row_cont"><text>标的现价：</text>¥ {{detail.underlyingPrice}}</view></view>
      <view class="row"><view class="row_cont"><text>行权价：</text>¥ {{ detail.strikePrice }}</view></view>
      <view class="row"><view class="row_cont"><text>距行权价：</text>+5.68%{{不知道}}</view></view>
      <view class="row"><view class="row_cont"><text>剩余到期：</text>
        {{ detail.maturityDate }} 天</view></view>
      <view class="row"><view class="row_cont"><text>名义本金：</text>¥ {{detail.nominalAmount}}</view></view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px"></view>
      <view class="row"><view class="row_cont"><text>当前行权状态：</text>可申请行权(不知道字段？？)</view></view>
      <view class="row"><view class="row_cont"><text>行权/了结截止时间：</text>2025-12-02 15:00(不知道字段？？)</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">是否支持行权，以及具体规则，以您签署的合同及交易确认书为准。</view></view>
    </view>

    <!-- 产品与合约要素 -->
    <view class="card">
      <view class="fir_title">产品与合约要素</view>
      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail.underlyingAssetName }} {{ detail.underlyingAssetCode }} · {{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}</view></view>
      <view class="row"><view class="row_cont"><text>订单号：</text>{{detail.orderNo}}</view></view>
      <view class="row"><view class="row_cont"><text>下单时间：</text>{{detail.createdTime}}</view></view>
      <view class="row"><view class="row_cont"><text>合约结构：</text>{{detail.structureDisplayName}}{{detail.optionType === "Call" ? '看涨':'看跌'}}（{{ detail.optionCode }}）</view></view>
      <view class="row"><view class="row_cont"><text>期权类型：</text>看涨期权（{{detail.optionType}}）</view></view>
      <view class="row"><view class="row_cont"><text>行权方式：</text>欧式，到期一次性现金结算(不知道字段？？？)</view></view>
      <view class="row"><view class="row_cont"><text>生效日期：</text>2025-11-01(不知道字段？？？)</view></view>
      <view class="row"><view class="row_cont"><text>到期日期：</text>2025-12-02(不知道字段？？？)</view></view>
      <view class="row"><view class="row_cont"><text>期限：</text>{{ detail.termName }}</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">收益结构：到期时，如果标的价格高于行权价，则根据约定公式计算收益；若标的价格低于或等于行权价，则期权到期失效，可能损失全部期权费。（具体以《产品说明书》《交易确认书》为准）</view></view>
    </view>

    <!-- 资金投入与成本 -->
    <view class="card">
      <view class="fir_title">资金投入与成本</view>
      <view class="row"><view class="row_cont"><text>名义本金：</text>¥ {{detail.nominalAmount}}</view></view>
      <view class="row"><view class="row_cont"><text>期权费率：</text>{{ detail.optionFeeRate }}%</view></view>
      <view class="row"><view class="row_cont"><text>期权费：</text>¥ {{detail.optionFee}}</view></view>
      <view class="row"><view class="row_cont"><text>手续费：</text>¥ {{ detail.transactionFee }}</view></view>
      <view class="row"><view class="row_cont"><text>总计支出：</text>¥ {{ detail.optionFee + detail.transactionFee }}</view></view>
    </view>

    <!-- 支付信息 -->
    <view class="card">
      <view class="fir_title">支付信息</view>
      <view class="row"><view class="row_cont"><text>支付状态：</text>已支付(写死？)</view></view>
      <view class="row"><view class="row_cont"><text>实际支付金额：</text>¥ {{ detail.paymentAmount }}</view></view>
      <view class="row"><view class="row_cont"><text>支付方式：</text>银行转账</view></view>
      <view class="row"><view class="row_cont"><text>付款银行：</text>{{ detail.bankName }}</view></view>
      <view class="row"><view class="row_cont"><text>付款账号：</text>尾号 {{ detail.bankAccount }}</view></view>
      <view class="row"><view class="row_cont"><text>支付时间：</text>{{detail.paymentTime}}</view></view>
      <view class="row"><view class="row_cont"><text>转账备注：</text>12cfe2566119 0000（没看到）</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">如支付信息与您实际转账不符，请尽快联系客服核对。</view></view>
    </view>

    <!-- 文档与风险提示 -->
    <view class="card">
      <view class="fir_title">文档与风险提示</view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《交易确认书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《产品说明书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《风险揭示书》</view></view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">
          场外个股期权属于高风险复杂金融产品，可能发生全部投资本金损失。<br/>
          请确认已充分阅读并理解《产品说明书》《风险揭示书》，仅使用自有闲散资金参与投资，并充分评估自身风险承受能力。
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="submit">行权</view>
    <view class="card">
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看收益试算</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">行权申请提交后，可能无法撤销，请在充分理解产品及风险的前提下谨慎操作。如需其他操作（提前终止、特殊安排等），请联系客服。</view></view>
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
