<template>
  <view class="container">
    <view class="sub_tabs">
      <view class="tab_btn "
            v-for="(tab,k) in subTabs" :class="activeTab == k ? 'tab_btn_avtive': ''"
            @click="activeTab = k"
      >{{ tab }}</view>
    </view>

    <view class="group_cont_box" v-show="activeTab == 0">
        <groupOrdersMarket />
    </view>
    <view class="group_cont_box" v-show="activeTab == 1">
        <myGroupOrders />
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MyGroupOrders from "@/pages/groupOrders/myGroupOrders.vue";
import GroupOrdersMarket from "@/pages/groupOrders/groupOrdersMarket.vue";

const activeTab = ref<number>(0);
const subTabs = ref<Array<string>>(['拼单市场', '我的拼单']);
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

.group_cont_box{

}
</style>
