<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from "vue";
import type {OrderDetail} from "@/interfaces/orderDetail";
import {onLoad} from "@dcloudio/uni-app";
import {bankReceiptInfo, BASE_URL, orderDetail, paymentProofInfo} from "@/api";
import {formatLocalTime, truncToTwo} from "@/utils";
import {useStore} from "@/stores";
import type {BankAccountInfoResp} from "@/interfaces/bankData";
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
// console.log("props detail", props)


// watch(() => props.detail, (newVal) => {
//   if(newVal){
//     detail.value = newVal;
//   }
// }, {deep: true})

// watch(() => props.orderId, (newVal) => {
//   console.log("orderId changed", newVal)
//   if(newVal){
//     // getDetail(newVal)
//     // downloadImage(newVal.voucherUrl || "")
//     getPaymentProofInfo(newVal)
//   }
// }, {deep: true})

watchEffect(() => {
  // console.log("props changed", props.detail)
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

const getBankReceiptInfo = (orderId: string) => {
  bankReceiptInfo(orderId).then(res => {
    // console.log("银行收款信息", res)
    bankReceiptInfoData.value = res;
  })
}

function downloadImage(url: string) {
  if(!url){
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

const getPaymentProofInfo = (orderId:string) => {
  paymentProofInfo(orderId).then(res => {
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

</script>

<template>
  <view class="container">
    <view class="card">
      <view class="fir_title">订单状态</view>
      <view class="fir_title" style="color:#2ECC71;">已取消</view>
      <view class="row"><view class="row_cont"><text>本单最终盈亏：</text><text style="color:#E8473A">{{Number(detail?.estimatedProfit) >= 0 ? '+' : '-'}} ¥ {{Math.abs(truncToTwo(Number(detail?.estimatedProfit)))}}（{{ truncToTwo(detail?.profitRate * 100)}}%）</text></view></view>
      <view class="row"><view class="row_cont"><text>结算金额：</text>¥ {{ detail?.settlementAmount }} </view></view>
      <view class="row"><view class="row_cont"><text>总投入（期权费 + 通道费）：</text>¥ {{truncToTwo(Number(detail?.transactionFee) + Number(detail?.optionFee))}}</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">本单已完成全部结算，资金方向与盈亏结果已最终确定。上述数据基于合作机构结算结果，已不再变动，仅供对账与历史查询使用。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">结算结果信息</view>
      <view class="row"><view class="row_cont"><text>结算状态：</text>已完成</view></view>
<!--      <view class="row"><view class="row_cont"><text>结算日期：</text>{{ formatLocalTime(new Date(detail?.maturityDate)) }}</view></view>-->
      <view class="row"><view class="row_cont"><text>结算方式：</text>现金结算</view></view>
      <view class="row"><view class="row_cont"><text>结算说明：</text>标的价格高于行权价，行权产生正收益，扣除相关费用后形成本单净收益。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">资金结算明细</view>
      <view class="row"><view class="row_cont"><text>总投入：</text>¥ {{truncToTwo(Number(detail?.transactionFee) + Number(detail?.optionFee))}}</view></view>
      <view class="row"><view class="row_cont"><text>期权费：</text>¥ {{ truncToTwo(detail?.optionFee) }}</view></view>
      <view class="row"><view class="row_cont"><text>通道费：</text>¥ {{truncToTwo(detail?.transactionFee)}}</view></view>
      <view class="row"><view class="row_cont"><text>结算金额：</text>¥ {{ detail?.settlementAmount }}</view></view>
<!--      <view class="row"><view class="row_cont"><text>结算通道费：</text>¥ 500.00???</view></view>-->
      <view class="row"><view class="row_cont"><text>本单最终盈亏：</text><text style="color:#E8473A">{{(Number(detail?.estimatedProfit)) >= 0 ? '+' : '-'}} ¥ {{Math.abs(truncToTwo(Number(detail?.estimatedProfit)))}}（{{ truncToTwo(detail?.profitRate * 100)}}%）</text></view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">资金结算明细用于帮助您理解本单的投入、结算及最终盈亏构成，如对具体金额有疑问，请以结算单及银行流水为准，并及时联系客服核对。</view></view>
    </view>

    <view class="card">
      <view class="fir_title">产品与合约要素</view>
      <view class="row"><view class="row_cont"><text>产品名称：</text>{{ detail?.underlyingAssetName }} {{ detail?.underlyingAssetCode }} · {{detail?.structureDisplayName}}{{detail?.optionType}}</view></view>
      <view class="row"><view class="row_cont"><text>订单号：</text>{{ detail?.orderNo }}</view></view>
      <view class="row"><view class="row_cont"><text>订单类型：</text>个股场外期权</view></view>
      <view class="row"><view class="row_cont"><text>生效日期：</text>{{ formatLocalTime(new Date(detail?.createdTime)) }}</view></view>
      <view class="row"><view class="row_cont"><text>到期日期：</text>{{ formatLocalTime(new Date(detail?.maturityDate)) }}</view></view>
      <view class="row"><view class="row_cont"><text>期限：</text>{{ detail?.termName }}</view></view>
      <view class="row"><view class="row_cont"><text>合约结构：</text>{{detail?.structureDisplayName}}{{detail?.optionType}}（{{ detail?.optionCode }}）</view></view>
      <view class="row"><view class="row_cont"><text>期权类型：</text>看涨期权（{{ detail?.optionType }}）</view></view>
      <view class="row"><view class="row_cont"><text>行权方式：</text>欧式，到期一次性现金结算</view></view>
      <view class="row"><view class="row_cont" style="color:#999999; font-size:12px;">本模块为合约核心要素摘要，完整条款与定义以《产品说明书》《交易确认书》及《风险揭示书》等正式文件为准。</view></view>
    </view>

    <!-- 支付与历史信息 -->
    <view class="card">
      <view class="fir_title">支付与历史记录 ▼</view>
      <view class="row">
        <view class="row_cont" style="color:#999999; font-size:12px;">（默认收起；主要用于事后对账，不干扰主信息）</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>下单时间：</text>
          {{ formatLocalTime(new Date(detail?.createdTime)) }}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付时间：</text>{{formatLocalTime(new Date(remitData.paymentTime))}}</view>
      </view>
      <view class="row">
        <view class="row_cont"><text>支付方式：</text>银行转账</view>
      </view>
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>汇款银行：</text>-->
<!--          {{ remitData.bankName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>汇款账号：</text>尾号 {{ remitData.bankAccount?.substr(-4) }}</view>-->
<!--      </view>-->
      <view class="row">
<!--        <view class="row_cont"><text>转账备注：</text>12cfe2566119 0000</view>-->
      </view>
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款户名：</text>-->
<!--          {{ bankReceiptInfoData.accountName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款银行：</text>{{ bankReceiptInfoData.bankName }} {{ bankReceiptInfoData.branchName }}</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="row_cont"><text>收款账号：</text>{{ bankReceiptInfoData.bankAccount }}</view>-->
<!--      </view>-->
      <view class="row">
        <view class="row_cont" style="color:#5E8ED6; font-size:12px;"><text>支付凭证：</text>
          <text @click="previewImage">点击查看</text>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="fir_title">文档与风险提示</view>
<!--      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看/下载《结算单》</view></view>-->
<!--      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《交易确认书》</view></view>-->
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《产品说明书》</view></view>
      <view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">查看《风险揭示书》</view></view>
      <view class="upload-tips">
        <text>场外个股期权属于高风险复杂金融产品，可能发生全部期权费损失，历史结算结果不代表未来收益表现。</text>
        <text>请在未来投资中继续充分评估自身风险承受能力，仅使用自有闲散资金参与，并认真阅读相关产品文件与风险揭示文件。</text>
      </view>
    </view>

    <view class="submit" @click="()=> uni.navigateTo({url: '/pages/warehouseReceipts/warehouseReceipts'})">返回订单列表</view>
    <view class="card"><view class="row"><view class="row_cont" style="color:#5E8ED6; font-size:12px;">我有疑问，联系客服</view></view></view>

    <view class="card">
      <view class="upload-tips">
        <text>如您对结算金额、资金到账情况或文档内容存在疑问，</text>
        <text>请及时联系客服或您的客户经理，并保留相关银行流水及结算凭证以便核对。</text>
      </view>
    </view>
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
.upload-tips { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 13px; line-height: 1.21em; color: #999999; }
</style>
