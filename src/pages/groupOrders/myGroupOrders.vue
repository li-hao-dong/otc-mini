<template>
    <view>
      <view class="container" v-if="groupOrderDatas.length > 0">
        <view class="card" v-for="(groupOrder, key) in groupOrderDatas" :key="key" @click="toDetail(groupOrder)">
          <view :class="`${groupOrder.creatorName == '我' ? 'Leader':'Member'}`">{{groupOrder.creatorName == '我' ? 'Leader':'Member'}}</view>
          <!--        贵州茅台 600519.SH · 轻度价外看涨-->
          <view class="bd">{{ groupOrder.underlyingAssetName }} <text>{{ groupOrder.underlyingAssetCode }} · 平值100？？？{{groupOrder.optionType == "CALL" ? '看涨':'看跌'}}</text></view>
          <view class="row">
            <view class="small_tit">拼单模式：</view>
<!--            <view class="group_order_data">官⽅推荐 · 盈利部分 15% 服务费 </view>-->
            <view class="group_order_data">官⽅推荐</view>
          </view>
          <view class="row">
            <view class="small_tit">拼单进度：</view>
            <view class="group_order_data">{{ groupOrder.currentSize }} / {{ groupOrder.targetSize }} ⼈ </view>
          </view>
          <view class="row">
            <view class="small_tit">单⼈期权费：</view>
            <view class="group_order_data">¥ {{truncToTwo(Number(groupOrder.totalNominalAmount) / groupOrder.targetSize)}} / ⼈</view>
          </view>

          <view class="row ">
            <view class="time_hint">截止于 {{ formatLocalTime(new Date(groupOrder.expireTime)) }}</view>
<!--            <view class="add_group">加⼊拼单</view>-->
          </view>

          <view class="hint_cont">
            拼单服务费仅在对应订单最终盈利时按约定⽐例收取；如订单亏损，则不收取该项费⽤。
          </view>
        </view>
        <view class="num_hint" @click="getPlatGroupOrders">
          <view>共 {{groupResp.total}} 条拼单记录，分 {{groupResp.totalPages}} 页显示</view>
          <view>{{ groupResp.totalPages === payloadData.page ? '没有更多数据了' : '点击加载' }}</view>
        </view>
      </view>

      <view v-else>
       <view class="not_data">
          当前暂⽆您的拼单，您可以
          <view class="new_group_order">
            <view class="add_group" @click="uni.navigateTo({url: '/pages/inquiry/inquiry'})">发起新的拼单</view>
          </view>
         <view class="new_group_order">
           <view class="add_group" @click="uni.reLaunch({url: '/pages/groupOrders/groupOrders'})">去拼单市场</view>
         </view>
       </view>
      </view>

    </view>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {getGroupOrders, getMyGroupOrders} from "@/api";
import type {GetGroupOrdersReq, GetGroupOrdersResp, Group} from "@/interfaces/groupOrders/getGroupOrders";
import {formatLocalTime, truncToTwo} from "../../utils";
import type {MyGroupOrderReq} from "@/interfaces/groupOrders/myGroupOrder";

const groupOrderDatas = ref<Array<Group>>([])
const payloadData = reactive<MyGroupOrderReq>({
  page: 1,
  pageSize: 10
})
const groupResp = reactive<{total: number, totalPages: number}>({
  total: 0,
  totalPages: 0,
})

onMounted(() => {
  getPlatGroupOrders()
})

const getPlatGroupOrders = async () => {
  if(groupOrderDatas.value.length>0){
    if(groupResp.totalPages === payloadData.page){
      return
    }
    payloadData!.page += 1
  }
  getMyGroupOrders(payloadData).then(res => {
    console.log('res', res)
    if(groupOrderDatas.value.length>0){
      groupOrderDatas.value = groupOrderDatas.value.concat(res.groups)
    }else{
      groupOrderDatas.value = res.groups
    }
    groupResp.total = res.pagination.total;
    groupResp.totalPages = res.pagination.totalPages;
  }).catch(err => {
    console.log('err', err)
  })
};

const toDetail = (groupOrder: Group) => {
  uni.navigateTo({
    url: `/pages/groupOrders/groupOrderDetail?groupOrderNo=${groupOrder.groupOrderNo}`
  })
}

</script>

<style scoped>
.container{
  padding-top: 10px;
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

.Leader{
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px 8px;
  background-color: #FFE5B4;
  color: #FF8C00;
  border-radius: 0px 12px 0px 8px;
  font-size: 12px;
}

.Member {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px 8px;
  background-color: #E0E0E0;
  color: #666666;
  border-radius: 0px 12px 0px 8px;
  font-size: 12px;
}

.bd{
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  padding-bottom: 10px;
  border-bottom: 1px solid #E6E6E6;
  margin-top: 20px;
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

.time_hint{

}

.add_group{
  width: fit-content;
  padding: 0 15px;
  line-height: 35px;
  color: var(--color-primary-bg);
  border: 1px solid var(--color-primary-bg);
  border-radius: 20px;
}

.hint_cont{
  margin-top: 5px;
  color: #c0c0c0;
  font-size: 12px;
}

.not_data{
  width: 100dvw;
  height: 100dvh;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  color: #c0c0c0;
  font-size: 16px;
}

.new_group_order{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.num_hint{
  text-align: center;
  font-size: 12px;
  color: #c0c0c0;
}

</style>
