<template>
  <navigation-title title="拼单详情"></navigation-title>
  <view class="container">
    <view class="card">
      <view class="tag" v-if="orderDetail.isOfficialRecommend">
        官方推荐
      </view>
      <view class="bd row">
        <view>{{ orderDetail.underlyingAssetName }} <text>{{orderDetail.underlyingAssetCode}} · {{orderDetail.strikeType}} {{orderDetail.termName}} {{orderDetail.optionType}}</text></view>
        <view>{{orderDetail?.groupStatus}}</view>
      </view>
      <view class="row">
        <view class="small_tit">拼单进度：</view>
        <view class="group_order_data">{{ orderDetail.currentSize }} / {{ orderDetail.targetSize }} ⼈ </view>
      </view>
      <view>
        <view class="progress_bg">
          <view class="progress_active" :style="`width: ${orderDetail.currentSize / orderDetail.targetSize * 100 }%`"></view>
        </view>
      </view>
      <view class="time_hint">截止于 {{ formatLocalTime(new Date(orderDetail.expireTime)) }}</view>
      <view class="row">
        <view class="small_tit">拼单编号：</view>
        <view class="group_order_data">{{ orderDetail.groupOrderNo }}</view>
      </view>
      <view class="hint_cont">
        <view>拼单费⽤</view>
<!--        <view>◦ 拼单模式：官⽅推荐标的拼单</view>-->
        <view>◦ 拼单服务费：订单盈利部分的 {{fee}}%，仅在盈利时收取</view>
        <view>◦ 拼单服务费不会出现在当前⽀付⾦额中，将在订单结算（已结算状态）时，从实际收益中⾃动扣除。</view>
<!--        <view style="color: var(&#45;&#45;color-primary-bg)">本次拼单未成团，相关订单将按平台规则处理。本次未产⽣盈利结算，因此不收取拼单服务费。</view>-->
      </view>
    </view>
    <view class="card" v-if="myOrderDetail && Object.keys(myOrderDetail).length > 0">
      <view class="fir_title">我的拼单信息</view>
      <view class="row">
        <view class="small_tit">我的⾝份：</view>
        <view class="group_order_data">{{calcRole(myOrderDetail.role)}}</view>
      </view>
      <view class="row">
        <view class="small_tit">我的订单状态：</view>
        <view class="group_order_data">{{ myOrderDetail.orderStatus }} </view>
      </view>
      <view class="row">
        <view class="small_tit">我的名义本金：</view>
        <view class="group_order_data">¥ {{ truncToTwo(myOrderDetail.nominalAmount) }}</view>
      </view>
<!--      <view>-->
<!--        &lt;!&ndash;    • 若我的订单状态为待⽀付/待上传：&ndash;&gt;-->
<!--        &lt;!&ndash;    [ 去⽀付 / 上传凭证 ] （跳转现有“订单⽀付⻚”）&ndash;&gt;-->
<!--        &lt;!&ndash;    • 若已⽀付：&ndash;&gt;-->
<!--        &lt;!&ndash;    [ 查看我的订单详情 ]&ndash;&gt;-->
<!--        <view class="btn">bottons here</view>-->
<!--      </view>-->
<!--      <view class="hint_cont">-->
<!--          <view>本次应付⾦额为您的期初期权费，不包含拼单服务费；如本订单最终产⽣盈利，将按照 {{fee}}% ⽐例，从您的盈利中⾃动扣除拼单服务费。</view>-->
<!--      </view>-->
    </view>

    <view class="card">
      <view class="fir_title row">
        <view>成员列表</view>
        <view style="font-weight: lighter" v-if="orderDetail.currentSize !== orderDetail.targetSize">当前已有 {{orderDetail.currentSize}}人 ，还需 {{orderDetail.targetSize - orderDetail.currentSize}}人</view>
      </view>
<!--      <view v-for="(_, index) in orderDetail.targetSize" :key="index">-->
<!--        <view class="members" v-if="orderDetail.members[index]">-->
<!--          <view class="row">-->
<!--            <view style="display: flex; gap: 10px; align-items: center">-->
<!--              <view style="display: flex; gap: 10px; align-items: center;">-->
<!--                <view class="member_key"><p>{{index+1}}</p></view>-->
<!--                <view class="memebr_name">{{orderDetail.members[index]?.maskedUserId}}</view>-->
<!--              </view>-->
<!--              <view class="member_role">-->
<!--                {{calcRole(orderDetail.members[index].role)}}-->
<!--              </view>-->
<!--            </view>-->
<!--            <view>{{orderDetail.members[index]?.orderStatus}}</view>-->
<!--          </view>-->
<!--          <view class="group_order_data">名义本金: ¥ {{ truncToTwo(orderDetail.members[index].nominalAmount) }}</view>-->
<!--        </view>-->
<!--        <view v-else>-->
<!--          <view class="wait_add" @click="addHintCont"><uni-icons type="plusempty" size="20" color="#d6423a"></uni-icons>待加入</view>-->
<!--        </view>-->
<!--      </view>-->
      <view >
        <view class="members" v-for="(member, index) in orderDetail.members" :key="index">
          <view class="row">
            <view style="display: flex; gap: 10px; align-items: center">
              <view style="display: flex; gap: 10px; align-items: center;">
                <view class="member_key"><p>{{index+1}}</p></view>
                <view class="memebr_name">{{member?.maskedUserId}}</view>
              </view>
              <view class="member_role">
                {{calcRole(member.role)}}
              </view>
            </view>
            <view>{{member?.orderStatus}}</view>
          </view>
          <view class="group_order_data">名义本金: ¥ {{ truncToTwo(member.nominalAmount) }}</view>
        </view>
        <view v-if="Object.keys(myOrderDetail).length == 0 && orderDetail.currentSize < orderDetail.targetSize">
          <view class="wait_add" @click="addHintCont"><uni-icons type="plusempty" size="20" color="#d6423a"></uni-icons>点击加入</view>
        </view>
      </view>
    </view>

    <view>
      <view class="card">
        <view class="fir_title">拼单规则</view>
        <view class="hint_cont">
          <view>• 拼单⼈数达到⽬标且全部成员⽀付成功后，系统将统⼀向通道侧申请购买该期权产品</view>
          <view>• 如在截⽌时间前未凑⻬⼈数或有⼈未完成⽀付，平台将按规则取消相关订单</view>
          <view>• 实际购买、⾏权和结算以各⾃订单的《交易确认书》为准</view>
          <view v-if="orderDetail.isOfficialRecommend">• 本拼单为官⽅推荐标的拼单：如订单最终盈利，将按盈利部分的 {{fee}}% 收取拼单服务费；如订单亏损，则不收取该项费⽤，您的亏损不会因为拼单⽽扩⼤。</view>
        </view>
      </view>
    </view>
<!--    <view class="btns_bottom"  v-if="Object.keys(myOrderDetail).length > 0 && myOrderDetail?.paymentStatus.toUpperCase() == 'PADDING'">-->
<!--      &lt;!&ndash;   我尚未⽀付   &ndash;&gt;-->
<!--      <view class="operation_btn">去支付?? 如何寻找的支付状态</view>-->
<!--    </view>-->
    <view class="btns_bottom" v-if="orderDetail?.currentSize<orderDetail?.targetSize">
      <!--   我已⽀付，拼单未满员   -->
      <view class="operation_btn" @click="copyUrl">分享给好友拼单</view>
    </view>
    <view class="btns_bottom" v-if="Object.keys(myOrderDetail).length > 0 && orderDetail?.currentSize==orderDetail?.targetSize" >
      <!--   我已⽀付，拼单已满且组状态为 PAID   -->
      <view class="operation_btn" @click="toOrderDetail">前往仓单详情</view>
      <view class="hint_cont">
        拼单已成团，系统将为所有成员统⼀申请购买期权产品。若订单最终盈利，将按 本拼单模式约定，从收益中⾃动扣除拼单服务费。
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import {addGroupOrder, getGroupOrderDetail, getStockFee} from "@/api";
import type {GroupOrderDetailResp, Member} from "@/interfaces/groupOrders/groupOrderDetail";
import {formatLocalTime, truncToTwo} from "@/utils";
import NavigationTitle from "@/components/navigationTitle.vue";

const orderDetail = ref<GroupOrderDetailResp>({});
const myOrderDetail = ref<Member>({});
const fee = ref<number>()

onLoad((option) => {
  // 页面加载时的逻辑
  console.log('Page loaded with options:', option);
  initOrderDetail(option.groupOrderNo)
});

const calcStatus = (groupStatus) => {
  // 计算订单状态的逻辑

  let text = "";
  switch (groupStatus.toUpperCase()){
    case "OPEN":
      text = "拼单中";
      break;
    case "FULL":
      text = "⼈数已满";
      break;
    case "PAYING":
      text = "等待成员⽀付";
      break;
    case "PAID":
      text = "拼单已成团";
      break;
    case "TIMEOUT":
      text = "拼单已超时";
      break;
    case "CANCELLED":
      text = "拼单已取消";
      break;
    default:
      text = groupStatus;
  }

  return text;
}

const calcRole = (role) => {
  // 计算用户角色的逻辑
  let text = "";
  switch (role.toUpperCase()){
    case "LEADER":
      text = "发起人";
      break;
    case "MEMBER":
      text = "成员";
      break;
  }

  return text;
}

const calcOrderStatus = (orderStatus) => {
  // 计算订单状态的逻辑
  //  待⽀付 / 已上传凭证 · 待确认 / ⽀付已确认
  let text = "";
  switch (orderStatus.toUpperCase()){
    case "PENDING_PAYMENT":
      text = "待支付";
      break;
    case "PENDING_VOUCHER":
      text = "已上传凭证 · 待确认";
      break;
    case "CANCELLED":
      text = "支付已确认";
      break;
    default:
      text = orderStatus;
  }

  return text;
}

const initOrderDetail = (groupOrderNo) => {
  // 初始化订单详情的逻辑
  getGroupOrderDetail(groupOrderNo).then(res => {
    console.log('Order detail:', res);
    res.members = res.members.reverse();
    orderDetail.value = res;
    myOrderDetail.value = res.members.find(member => member.isMe) || {};
    getStockFees(orderDetail.value.underlyingAssetCode)
  }).catch(err => {
    console.log('Error fetching order detail:', err);
  })
};

const copyUrl = () => {
  uni.showModal({
    title: '如何邀请好友？',
    content: '复制链接后->发送给朋友->朋友在浏览器地址栏粘贴访问。',
    showCancel: true,
    cancelText: '取消',
    confirmText: '复制链接',
    success: (res) => {
      if (res.confirm) {
        // 复制链接的逻辑
        copyToClipboard()
      }
    }
  })

  function copyToClipboard() {
    // 复制链接的逻辑
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    uni.setClipboardData({
      data: url,
      success: () => {
        uni.showToast({
          title: '复制链接成功',
          icon: 'success'
        });
      },
      fail: () => {
        uni.showToast({
          title: '复制链接失败',
          icon: 'none'
        });
      }
    });
  }
}

const toOrderDetail = () => {
  // 跳转到订单详情页的逻辑
  uni.navigateTo({
    url: `/pages/warehouseReceiptDetail/warehouseReceiptDetail?groupOrderNo=${orderDetail.value.groupOrderNo}`
  });
}

const addHintCont = () => {
  if(myOrderDetail.value && Object.keys(myOrderDetail.value).length > 0){
    uni.showToast({
      title: '您已加入该拼单',
      icon: 'none'
    });
    return;
  }

  uni.showModal({
    title: '提示',
    content: '您确认要加入拼单吗？',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确认',
    success: (res) => {
      if (res.confirm) {
        addGroupOrder(orderDetail.value.groupOrderNo, Number(orderDetail.value.totalNominalAmount)).then(res => {
          uni.showToast({
            title: '加入拼单成功',
            icon: 'success'
          });
          setTimeout(() => {
            initOrderDetail(orderDetail.value.groupOrderNo);
          }, 1000);
        }).catch(err => {
          console.log('加入拼单失败:', err);
          uni.showToast({
            title: '加入拼单失败',
            icon: 'none'
          });
        });
        // uni.showToast({
        //   title: '加入拼单成功',
        //   icon: 'success'
        // });
      }
    }
  })
}

const getStockFees = (assetCode: string) => {
  getStockFee(assetCode).then(res => {
    console.log("getStockFee res", res)
    fee.value= res;
  }).catch(err => {
    console.log("getStockFee err", err)
  })
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 10px;
  padding-bottom: 90px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card {
  width: 95%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
}

.tag{
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 2px 8px;
  background-color: #FFEDD5;
  color: #D97706;
  border-radius: 12px;
  font-size: 12px;
}

.bd{
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  padding-bottom: 10px;
  border-bottom: 1px solid #E6E6E6;
  margin-top: 10px;
}

.bd text{
  font-weight: lighter;
  font-size: 14px;
  margin-left: 6px;
}


.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
}

.small_tit{
  font-size: 14px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
}

.group_order_data{
  overflow: hidden;
  white-space: nowrap;
}

.progress_bg{
  width: 100%;
  height: 10px;
  background: #e8e8e8;
  border-radius: 15px;
  overflow: hidden;
}

.progress_active{
  width: fit-content;
  height: 100%;
  background: #4caf50;
}

.time_hint{
  padding-top: 10px;
}

.hint_cont{
  margin-top: 5px;
  color: #c0c0c0;
  font-size: 12px;
}
.fir_title{ font-size: 15px; font-weight: bold; margin-bottom: 8px; }
.btn{
  text-align: center;
  padding: 0 15px;
  line-height: 35px;
  color: var(--color-primary-bg);
  border: 1px solid var(--color-primary-bg);
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.members{
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.members:last-child{
  border: unset;
}

.member_key{
  width: 20px;
  height: 20px;
  display: table-cell;
  text-align: center;
  vertical-align: center;
  border: 1px solid #c0c0c0;
  border-radius: 15px;
}

.memebr_name{
  font-size: 16px;
  font-weight: bold;
}

.member_role{
  width: fit-content;
  height: 20px;
  background: #4caf50;
  border-radius: 5px;
  padding: 1px 8px;
  color: #FFFFFF;
}

.wait_add{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--color-primary-bg);
  padding: 15px 0;
  border: 1px solid var(--color-primary-bg);
  border-radius: 15px;
  margin-bottom: 10px;
}

.btns_bottom{
  width: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 10px 2.5%;
  position: fixed;
  bottom: 0;
}

.operation_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #c0c0c0;
  padding: 15px 0;
  color: var(--color-primary-bg);
  border: 1px solid var(--color-primary-bg);
  border-radius: 15px;
  margin-bottom: 10px;
}
</style>
