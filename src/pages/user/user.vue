<template>
  <view class="container">
    <view class="userPage">
      <view class="signBox" @click="login">
        <view class="avator"><uni-icons type="person" size="66" color="white"></uni-icons></view>
        <view class="userData">
          <view class="userName">
            <input type="text" placeholder="请输入你的昵称" v-model="username">
          </view>
          <view class="userTel">{{tel}}</view>
        </view>
      </view>
<!--      <view class="userTel">-->
<!--        <view class="label">手机绑定</view>-->
<!--      </view>-->
      <view class="row idCard">
        <view class="label">身份号码</view>
        <view class="value">
          <input type="text" placeholder="请输入你的身份证号码" v-model="idCard">
        </view>
      </view>
      <view class="row provinceCity">
        <view class="label">省市区</view>
        <view class="value">
          <picker mode="region" @change="changePicker" :disabled="address">{{ address ? address : '请设置地址' }}</picker>
        </view>

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {userLogin} from "@/api";

const address = ref<string|undefined>()
const idCard = ref<string|undefined>("320************1234")
const username = ref<string|undefined>("张三丰")
const tel = ref<string|undefined>("138****1234")

const login = () => {
  uni.login({
    "provider": "weixin",
    "onlyAuthorize": true, // 微信登录仅请求授权认证
    success: function(event){
      const {code} = event
      //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      console.log("event", event)
      console.log("code", code)
      // userLogin(code).then((res: loginResp) => {
      //   console.log("login res:", res)
      // })
    },
    fail: function (err) {
      // 登录授权失败
      // err.code是错误码
    }
  })
}

const changePicker = <T>(e: T) => {
  address.value = e.detail!.value.join('');
}

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
  background: #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

.value input{
  width: 100%;
  text-align: right;
}

.idCard{
  margin-top: 20px;
}
</style>
