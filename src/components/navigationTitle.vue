<template>
  <view class="navigation_title">
    <view @click="callBackPage"><uni-icons type="left" size="20" color="#fff"></uni-icons></view>
    {{ title }}
    <view></view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{title: string}>();
const callBackPage = () => {
  let pages = getCurrentPages(); // 获取页面栈
  let currentPages = pages[pages.length - 1]; // 当前页面
  let prevPage = pages[pages.length - 2]; // 上一个页面 (如果存在)
  if (prevPage){
    uni.navigateBack(-1);
  }else {
    uni.switchTab({
      url: '/pages/inquiryHistory/inquiryHistory'
    });
  }
}

</script>

<style lang="scss" scoped>
.navigation_title{
  position: sticky;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  padding: 0 2.5%;
  background: var(--color-primary-bg);
  color: #FFFFFF;
}
</style>
