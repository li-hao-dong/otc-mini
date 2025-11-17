<template>
  <view class="container">
    <view class="userPage">
      <view class="signBox">
        <view class="avator"></view>
        <view class="userData">
          <view class="userName">昵称</view>
          <view class="userTel">120****1234</view>
        </view>
      </view>
<!--      <view class="userTel">-->
<!--        <view class="label">手机绑定</view>-->
<!--      </view>-->
      <view class="row idCard">
        <view class="label">身份号码</view>
        <view class="view">320************1234</view>
      </view>
      <view class="row provinceCity">
        <view class="label">省市</view>
        <view class="value">广东深圳</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped>
.signBox{
  width: 100%;
  background: var(--color-primary-bg);
  padding: 20px 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
}
.avator{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #999999;
}

.userName{
  font-size: 17px;
  font-weight: 500;
  padding-bottom: 10px;
}

.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: white;
  border-bottom: 1px solid #f2f2f2;
}

.idCard{
  margin-top: 20px;
}
</style>
