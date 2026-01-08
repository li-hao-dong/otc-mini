<script setup lang="ts">
import {ref} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, exerciseHandler, orderDetail} from "@/api";
import type {BankAccountInfoResp} from "@/interfaces/bankData";
import {formatLocalTime, truncToTwo} from "@/utils";
import {type ExerciseReq, ExerciseType} from "@/interfaces/exercise";
import type {UserGroupOrderDetailResp} from "@/interfaces/groupOrders/getUserGroupOrderDetail";

const voucher = ref<string | string[]>()
// const detail = ref<OrderDetail | null>(null);
const bankReceiptInfoData = ref<BankAccountInfoResp>();
const orderId = ref<string>("");
const props = defineProps<{orderId?: string, detail: OrderDetail | UserGroupOrderDetailResp}>();

onLoad((option) =>{
  console.log("option", option)
  orderId.value = option?.id || "";
  // getDetail(option?.id)
  // getBankReceiptInfo(option?.id)
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

const exexercise = () => {
  if(!orderId.value){
    return;
  }

  uni.showModal({
    title: "行权确认",
    content: "行权提交后：\n" +
        "订单状态将变为「已行权」，进入结算流程；行权申请提交后原则上不可撤销；",
    // content: "请确认您已充分理解产品及风险，是否提交行权申请？",
    success: (res) => {
      // console.log("行权确认结果", res)
      if(res.confirm){
        const payload: ExerciseReq = {
          exerciseQuantity: 1,
          exerciseType: ExerciseType.Manual,
          remarks: undefined
        }
        exerciseHandler(orderId.value, payload).then(res => {
          console.log("行权结果", res)
          if (res.status !== "success") {
            uni.showToast({
              title: res.message || '行权申请提交失败',
              duration: 1000,
              icon: 'error'
            });
            return;
          }
          uni.showToast({
            title: '行权申请已提交',
            duration: 1000
          });

          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/warehouseReceiptDetail/exercised?id=${orderId.value}`
            });
          }, 2000)
        })
      }

      if (res.cancel){
        return;
      }
    },
    fail: (err) => {
      return;
    }
  })


}
</script>

<template>
  <view class="container">
    <!-- 持仓概览 -->
    <view class="card">
      <view class="fir_title">订单状态</view>
      <view class="fir_title" style="color:#E8473A;">已购买 · 持有中 · 可行权</view>
      <view class="row">
        <view class="row_cont"><text>当前参考盈亏：</text><text :class="Number(detail?.estimatedProfit) >= 0 ? 'valueRed' : 'valueGreen'">
          {{ Number(detail?.estimatedProfit) >=0 ? '+':'-' }} ¥ {{truncToTwo(Math.abs(detail?.estimatedProfit))}} ({{detail?.profitRate}}%)</text></view>
      </view>
<!--      <view class="row">-->
<!--        <view class="row_cont" style="color:#999999; font-size:12px;">参考数据更新时间：{{ formatLocalTime(new Date()) }}</view>-->
<!--      </view>-->
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">参考盈亏 = 当前预估期权价值 - 总计支出，仅供参考，不作为最终结算依据。</view>
      </view>
      <view class="row"><view class="row_cont"><text>标的现价：</text>¥ {{truncToTwo(detail?.underlyingPrice)}}</view></view>
      <view class="row"><view class="row_cont"><text>行权价：</text>¥ {{ truncToTwo(detail?.strikePrice) }}</view></view>
      <view class="row"><view class="row_cont"><text>距行权价：</text>{{truncToTwo(detail?.underlyingPrice - detail?.strikePrice)}}</view></view>
      <view class="row"><view class="row_cont"><text>剩余到期：</text>
        {{ detail?.daysToExpiry }} 天</view></view>
      <view class="row"><view class="row_cont"><text>名义本金：</text>¥ {{truncToTwo(detail?.nominalAmount)}}</view></view>
      <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px"></view>
      <view class="row"><view class="row_cont"><text>当前行权状态：</text>可申请行权</view></view>
      <view class="row"><view class="row_cont"><text>行权截止时间：</text>
        {{ detail?.maturityDate }}</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">是否支持行权，以及具体规则，以您签署的合同及交易确认书为准。</view></view>
    </view>

    <!-- 产品与合约要素 -->
    <view class="card">
      <view class="fir_title">产品与合约要素</view>
      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail?.underlyingAssetName }} {{ detail?.underlyingAssetCode }} · {{detail?.structureDisplayName}}{{detail?.optionType === "Call" ? '看涨':'看跌'}}</view></view>
      <view class="row"><view class="row_cont"><text>订单号：</text>{{detail?.orderNo}}</view></view>
      <view class="row"><view class="row_cont"><text>下单时间：</text>{{formatLocalTime(new Date(detail?.createdTime))}}</view></view>
      <view class="row"><view class="row_cont"><text>合约结构：</text>{{detail?.structureDisplayName}}{{detail?.optionType === "Call" ? '看涨':'看跌'}}（{{ detail?.optionCode }}）</view></view>
      <view class="row"><view class="row_cont"><text>期权类型：</text>看涨期权（{{detail?.optionType}}）</view></view>
      <view class="row"><view class="row_cont"><text>行权方式：</text>欧式，到期一次性现金结算</view></view>
      <view class="row"><view class="row_cont"><text>生效日期：</text>
        {{ detail?.startDate }}</view></view>
      <view class="row"><view class="row_cont"><text>到期日期：</text>{{ detail?.maturityDate }}</view></view>
      <view class="row"><view class="row_cont"><text>期限：</text>{{ detail?.termName }}</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">收益结构：到期时，如果标的价格高于行权价，则根据约定公式计算收益；若标的价格低于或等于行权价，则期权到期失效，可能损失全部期权费。（具体以《产品说明书》《交易确认书》为准）</view></view>
    </view>

    <!-- 资金投入与成本 -->
    <view class="card">
      <view class="fir_title">资金投入与成本</view>
      <view class="row"><view class="row_cont"><text>名义本金：</text>¥ {{truncToTwo(detail?.nominalAmount)}}</view></view>
      <view class="row"><view class="row_cont"><text>期权费率：</text>{{ truncToTwo(detail?.optionFeeRate * 100) }}%</view></view>
      <view class="row"><view class="row_cont"><text>期权费：</text>¥ {{truncToTwo(detail?.optionFee)}}</view></view>
      <view class="row"><view class="row_cont"><text>通道费：</text>¥ {{ truncToTwo(detail?.transactionFee) }}</view></view>
      <view class="row"><view class="row_cont"><text>总计支出：</text>¥ {{ truncToTwo(Number(detail?.optionFee) + Number(detail?.transactionFee)) }}</view></view>
    </view>

    <!-- 支付信息 -->
    <view class="card">
      <view class="fir_title">支付信息</view>
      <view class="row"><view class="row_cont"><text>支付状态：</text>已支付</view></view>
      <view class="row"><view class="row_cont"><text>实际支付金额：</text>¥ {{ truncToTwo(detail?.paymentAmount) }}</view></view>
      <view class="row"><view class="row_cont"><text>支付方式：</text>银行转账</view></view>
      <view class="row"><view class="row_cont"><text>付款银行：</text>{{ detail?.bankName }}</view></view>
      <view class="row"><view class="row_cont"><text>付款账号：</text>尾号 {{ detail?.bankAccount.substr(-4) }}</view></view>
      <view class="row"><view class="row_cont"><text>支付时间：</text>{{formatLocalTime(new Date(detail?.paymentTime))}}</view></view>
<!--      <view class="row"><view class="row_cont"><text>转账备注：</text>12cfe2566119 0000（没看到）</view></view>-->
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
    <view class="submit" @click="exexercise">行权</view>
<!--    <view class="card">-->
<!--      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看收益试算</view></view>-->
<!--      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">行权申请提交后，可能无法撤销，请在充分理解产品及风险的前提下谨慎操作。如需其他操作（提前终止、特殊安排等），请联系客服。</view></view>-->
<!--    </view>-->
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

      .valueRed {
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
        font-weight: 400;
        font-size: 13px;
        line-height: 1.21em;
        color: #E8473A;
      }

      .valueGreen {
        color: #2ECC71;
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
