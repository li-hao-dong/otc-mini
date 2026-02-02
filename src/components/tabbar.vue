<template>
<!--  <view class="tabbar_box">-->
<!--    <view v-for="(tabbar, key) in tabbarData" :key="key" @click="toPage(tabbar)">-->
<!--      <view>-->
<!--        <image :src="currentTabbarKey === key ? tabbar.iconPath:tabbar.selectedIconPath" mode="widthFix"></image>-->
<!--      </view>-->
<!--      <view>{{tabbar.text}}</view>-->
<!--    </view>-->
<!--  </view>-->
  <up-tabbar
      :value="props.currentTabbarKey" active-color="#d6423a">
    <up-tabbar-item v-for="(tabbar, key) in tabbarData" :key="key"
                    @click="changeTabbar" >
      <template #active-icon>
        <view class="special-tabbar-item">
          <image class="special-img" :src="tabbar.selectedIconPath"></image>
        </view>
      </template>
      <template #inactive-icon>
        <view class="special-tabbar-item">
          <image class="special-img" :src="tabbar.icon"></image>
        </view>
      </template>
      <template #text><text :class="`${props.currentTabbarKey === key ? 'active':''}`">{{tabbar.text}}</text></template>
    </up-tabbar-item>
  </up-tabbar>
</template>
<script setup lang="ts">
import {ref} from "vue";

const tabbarData = ref([
  {
    pagePath: "/pages/home/home",
    icon: "/static/menu/icon_home.png",
    selectedIconPath: "/static/menu/icon_home_active.png",
    text: "首页",
    pageType: 'tabbar'
  },
  {
    pagePath: "/pages/inquiryHistory/inquiryHistory",
    icon: "/static/menu/icon_inquiry_history.png",
    selectedIconPath: "/static/menu/icon_inquiry_history_active.png",
    text: "询价",
    pageType: 'tabbar'
  },
  {
    pagePath: "/pages/inquiry/inquiry",
    icon: '/static/menu/icon_place_an_order.png',
    selectedIconPath: '/static/menu/icon_place_an_order_active.png',
    // "iconPath": "static/menu/icon_cd.png",
    // "selectedIconPath": "static/menu/icon_cd_active.png",
    text: "下单",
    pageType: ''
  },
  {
    pagePath: "/pages/groupOrders/groupOrders",
    icon: "/static/menu/icon_group_order.png",
    selectedIconPath: "/static/menu/icon_group_order_active.png",
    text: "拼单",
    pageType: 'tabbar'
  },
  {
    pagePath: "/pages/user/user",
    icon: "/static/menu/icon_user.png",
    selectedIconPath: "/static/menu/icon_user_active.png",
    text: "我的",
    pageType: 'tabbar'
  }
])
const props =  defineProps({
  currentTabbarKey:{
    type: Number,
    default: 0
  }
})

const toPage = (key: number) => {
  if(!tabbarData.value[key].pageType){
    uni.navigateTo({url: tabbarData.value[key].pagePath})
  }else {
    uni.switchTab({url: tabbarData.value[key].pagePath})
  }
}

const changeTabbar = (e:any) => {
  toPage(e)
}
</script>


<style scoped lang="scss">
.u-tabbar__content__item-wrapper{
  padding-top: 3px;

  .u-tabbar-item{
    font-size: 12px;
    font-weight: lighter;

    .special-tabbar-item {

      .special-img {
        width: 25px;
        height: 25px;
      }
    }

    &:nth-child(3){
      transform: translateY(14px);
      .special-tabbar-item {
        width: 66px;
        height: 66px;
        background-color: #FFFFFF;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        transform: translateY(10px);
        /*box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.2);*/
        z-index: -1;

        .special-img {
          width: 33px;
          height: 33px;
        }
      }
    }

    .active{
      color: #d6423a;
    }

  }
}



</style>
