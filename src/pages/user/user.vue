<template>
  <view class="container">
    <view class="userPage">
      <view style="position: relative;">
        <!-- #ifdef MP-WEIXIN -->
        <input v-if="!username" id="setName" type="nickname" @click="getUserProfile" v-model="username" class="nickname" placeholder=""/>
        <!-- #endif -->
        <view class="signBox">
          <view class="avator">
            <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
              <uni-icons v-if="!avatarUrl" type="person" size="66" color="white"></uni-icons>
              <image v-else open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="avatar" :src="avatarUrl" style="width: 70px; height: 70px;"></image>
            </button>
<!--            <image v-else class="avatar" :src="avatarUrl" style="width: 70px; height: 70px;"></image>-->
          </view>
          <view class="userData">
            <view class="userName">
              <view>{{username?username:'点击此处进行登录'}}</view>
            </view>
<!--            <view class="userTel">{{tel}}-->
<!--            </view>-->
          </view>
        </view>
      </view>
<!--      <view class="userTel">-->
<!--        <view class="label">手机绑定</view>-->
<!--      </view>-->
<!--      <view class="title">-->
<!--        <view>用户信息</view>-->
<!--        <view v-if="!userDataStatus"><uni-icons type="gear" size="20" @click="setUserDataStatus"></uni-icons></view>-->
<!--        <view v-else class="update_user_data" @click="updateUserData">更新用户信息</view>-->
<!--      </view>-->
<!--      <view class="row">-->
<!--        <view class="label">身份号码</view>-->
<!--        <view class="value">-->
<!--          <input type="text" placeholder="请输入你的身份证号码" v-model="idCard">-->
<!--        </view>-->
<!--      </view>-->
<!--      <view class="row provinceCity">-->
<!--        <view class="label">省市区</view>-->
<!--        <view class="value">-->
<!--          <picker mode="region" @change="changePicker" :disabled="address">{{ address ? address : '请设置地址' }}</picker>-->
<!--        </view>-->
<!--      </view>-->

      <view class="row" style="margin-top: 20px">
        <view class="label">当前身份</view>
        <view class="value">
          普通用户
        </view>
      </view>

      <view style="margin-top: 20px">
<!--        <view class="row" @click="uni.navigateTo({url: '/pages/groupOrders/myGroupOrders'})">-->
<!--          <view class="label">我的拼单</view>-->
<!--          <view class="value">-->
<!--            <uni-icons type="right" size="16"></uni-icons>-->
<!--          </view>-->
<!--        </view>-->
        <view class="row" @click="signOut">
          <view class="label">退出登录</view>
          <view class="value">
            <uni-icons type="right" size="16"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {getUserInfo, userLogin} from "@/api";
import type {loginResp} from "@/interfaces/login";
import {useStore} from "@/stores";
import {onLoad, onShow} from "@dcloudio/uni-app";
import {failToast, succToast} from "@/utils/toast/toast";

const avatarUrl = ref<string|undefined>("")
const address = ref<string|undefined>("暂无")
const idCard = ref<string|undefined>("暂无")
const username = ref<string|undefined>("")
const token = ref<string|undefined>(undefined)
const tel = ref<string|undefined>("暂无")
const ticket = ref<string|undefined>("")
const userDataStatus = ref<boolean>(false)

onShow(() =>{
  initUserInfo()
})

// watch(username, (newVal, oldValue) => {
//   if (newVal != oldValue && !token.value) {
//     // console.log("用户名已设置，执行登录操作", newVal)
//     uni.showLoading({title: '登录中...'})
//     const timer = setInterval(()=>{
//       if(ticket.value){
//         login()
//         clearInterval(timer)
//         uni.hideLoading()
//       }
//     }, 100)
//   }
// })

const updateUserData = () => {
  // Placeholder for updating user data
  console.log("更新用户数据:", {idCard: idCard.value, address: address.value})
  userDataStatus.value = false;
}

const setUserDataStatus = () => {
  userDataStatus.value = true;
}

const initUserInfo = () => {
  const userInfo = useStore().user;
  if(userInfo){
    token.value = userInfo.token;
    username.value = userInfo.name;
    avatarUrl.value = userInfo.avatarUrl;
    getUserInfo()
  }
}

const login = () => {
  if(!username.value){
    failToast("请先设置用户名!")
    return;
  }

  // if (!avatarUrl.value){
  //   failToast("请先设置头像!")
  //   return;
  // }

  if (!ticket.value){
    failToast("临时票据失效,请再次登录!")
    username.value = undefined;
    return;
  }

  console.log("ticket.value", ticket.value)
  console.log("username.value", username.value)

  userLogin(ticket.value, username.value).then((res: loginResp) => {
    if(res.status === 'success'){
      useStore().user.setUserInfo({uuid:res.data.user_info.user_uuid,name:res.data.user_info.user_name, token:res.data.access_token, token_type:res.data.token_type, token_valid_until: new Date().getTime() + (60 * 60 * 24 * 1000)});
      succToast("登录成功!")
      getUserInfo()
    }else {
      console.log("res", res)
    }
  }).catch((err: Error) => {
    console.log("login err:", err)
  })

}

const getUserProfile = () => {
  if (token.value) return
  if(uni.getUserProfile){
    uni.getUserProfile({desc: '用于完善会员资料'}).then((res) => {
      console.log("res", res)
      uni.login({
        "provider": "weixin",
        "onlyAuthorize": true, // 微信登录仅请求授权认证
        success: function(event){
          const {code} = event
          //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
          // username.value = res.userInfo.nickName;
          ticket.value = code;
        },
        fail: function (err) {
          // 登录授权失败
          // err.code是错误码
        }
      })
    })
  }
}

const onChooseAvatar = (e:any) => {
  console.log("user avatar", e)
  if(e.detail && e.detail.avatarUrl){
    avatarUrl.value = e.detail.avatarUrl;
    useStore().user.setAvatarUrl(e.detail.avatarUrl)
  }
}

const changePicker = <T>(e: T) => {
  address.value = e.detail!.value.join('');
}

const signOut = () => {
  useStore().user.clearUserInfo();
  token.value = undefined;
  username.value = undefined;
  avatarUrl.value = undefined;
  ticket.value = undefined;
  succToast("已退出登录")
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/reLogin/reLogin'
    })
  }, 1000)
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
  box-sizing: border-box;
}

#setName{
  position: absolute;
  width: 100vw;
  height: 100%;
  opacity: 0;
}

.avator,
.avatar-wrapper{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.title{
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0;
}

.update_user_data{
  font-size: 14px;
  color: var(--color-primary-bg);
  font-weight: lighter;
}

button{
  padding: 0 !important;
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

</style>
