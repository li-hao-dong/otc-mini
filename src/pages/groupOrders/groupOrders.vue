<template>
  <view class="container">
    <view class="sub_tabs">
      <view class="tab_btn "
            v-for="(tab,k) in subTabs" :class="activeTab == k ? 'tab_btn_avtive': ''"
            @click="changeComponent(k)"
      >{{ tab }}</view>
    </view>
    <view class="create_group_order_btn" @click="uni.navigateTo({url: '/pages/inquiry/inquiry'})">创建新拼单</view>

<!--    <component :is="activeComponent" :key="activeTab" />-->
    <!--0        <groupOrdersMarket/>-->
    <!--1        <myGroupOrders/>-->

    <view class="group_cont_box" v-show="activeTab == 0">
        <groupOrdersMarket :groupOrderDatas="groupOrderDatas" :payloadData="payloadData" :groupResp="groupResp" @getGroupOrders="getPlatGroupOrders"/>
<!--      <component :is="activeComponent" :key="currentKey" />-->
    </view>
    <view class="group_cont_box" v-show="activeTab == 1">
        <myGroupOrders  :groupOrderDatas="myGroupOrderDatas" :payloadData="myGroupOrderPayloadData" :groupResp="myGroupOrderResp" @getGroupOrders="getMyGroupOrdersData"/>
<!--      <component :is="activeComponent" :key="currentKey" />-->
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import MyGroupOrders from "@/pages/groupOrders/myGroupOrders.vue";
import GroupOrdersMarket from "@/pages/groupOrders/groupOrdersMarket.vue";
import {getGroupOrders, getMyGroupOrders} from "@/api";
import type {MyGroupOrderReq} from "@/interfaces/groupOrders/myGroupOrder";
import type {GetGroupOrdersReq, Group} from "@/interfaces/groupOrders/getGroupOrders";
import {onShow} from "@dcloudio/uni-app";

const activeTab = ref<number>(0);
const subTabs = ref<Array<string>>(['拼单市场', '我的拼单']);
const currentKey = ref<number>(0);
const activeComponent = ref<any>(GroupOrdersMarket);

const groupOrderDatas = ref<Array<Group>>([])
const payloadData = reactive<GetGroupOrdersReq>({
  page: 1,
  pageSize: 10
})
const groupResp = reactive<{total: number, totalPages: number}>({
  total: 0,
  totalPages: 0,
})
const myGroupOrderDatas = ref<Array<Group>>([])
const myGroupOrderPayloadData = reactive<MyGroupOrderReq>({
  page: 1,
  pageSize: 10
})
const myGroupOrderResp = reactive<{total: number, totalPages: number}>({
  total: 0,
  totalPages: 0,
})

onShow(() => {
  if(activeTab.value === 0){
    clearPlatGroupOrdersData()
    getPlatGroupOrders()
  }else{
    clearMyPlatGroupOrdersData()
    getMyGroupOrdersData()
  }
});

const changeComponent = (key:number) => {
  activeTab.value = key;
  if (activeTab.value === 0) {
    // activeComponent.value = GroupOrdersMarket;
    clearPlatGroupOrdersData()
    getPlatGroupOrders()
  } else {
    // activeComponent.value = MyGroupOrders;
    clearMyPlatGroupOrdersData()
    getMyGroupOrdersData()
  }
  currentKey.value += 1; // 强制重新渲染组件
};


const getPlatGroupOrders = async () => {
  if(groupOrderDatas.value.length>0){
    if(groupResp.totalPages === payloadData.page){
      return
    }
    payloadData.page += 1
  }
  getGroupOrders(payloadData).then(res => {
    console.log('res111', res)
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

const clearPlatGroupOrdersData = () => {
    groupOrderDatas.value = []
    payloadData.page = 1
    groupResp.total = 0
    groupResp.totalPages = 0
}

const getMyGroupOrdersData = () => {
  if(myGroupOrderDatas.value.length>0){
    if(myGroupOrderResp.totalPages === myGroupOrderPayloadData.page){
      return
    }
    myGroupOrderPayloadData.page += 1
  }
  getMyGroupOrders(myGroupOrderPayloadData).then(res => {
    console.log('res222', res)
    if(myGroupOrderDatas.value.length>0){
      myGroupOrderDatas.value = myGroupOrderDatas.value.concat(res.groups)
    }else{
      myGroupOrderDatas.value = res.groups
    }
    myGroupOrderResp.total = res.pagination.total;
    myGroupOrderResp.totalPages = res.pagination.totalPages;
  }).catch(err => {
    console.log('err', err)
  })
};

const clearMyPlatGroupOrdersData = () => {
  myGroupOrderDatas.value = []
  myGroupOrderPayloadData.page = 1
  myGroupOrderResp.total = 0
  myGroupOrderResp.totalPages = 0
}

</script>

<style lang="scss" scoped>
.container{
  padding-top: 10px;
}
.sub_tabs{
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 12px;
  margin-bottom: 10px;
}

.tab_btn{
  width: 50%;
  text-align: center;
  padding: 10px 0;
}

.tab_btn_avtive{
  color: #FFFFFF;
  background: var(--color-primary-bg);
  border-radius: 12px;
}

.create_group_order_btn{
  width: 95%;
  text-align: center;
  margin: auto;
  padding: 10px 0;
  color: #000;
  background: #fff;
  border: 1px solid #CCCCCC;
  border-radius: 12px;
  box-sizing: content-box;
}

.group_cont_box{

}
</style>
