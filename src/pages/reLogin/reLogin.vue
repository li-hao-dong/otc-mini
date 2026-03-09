<script setup lang="ts">
import { reactive, ref } from 'vue'
import {getSmsCode, userLoginH5, userRegister} from "@/api";
import {useStore} from "@/stores";

type Mode = 'login' | 'register'
const mode = ref<Mode>('login')

const loginForm = reactive({
  userName: '',
  password: ''
})

const registerForm = reactive({
  userName: '',
  telephone: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
  referrerUuid: ''
})

const showLoginPwd = ref(false)
const showRegisterPwd = ref(false)
const showRegisterConfirmPwd = ref(false)
const smsBtnText = ref("发送验证码")
const remainingTime = ref(0)
const timer = ref()


const dealTime = () => {
  timer.value = setInterval(() => {
    if(remainingTime.value >0){
      remainingTime.value -= 1
    }else {
      clearInterval(timer.value)
      timer.value = ''
    }
    // console.log("remainingTime.value", remainingTime.value)
  }, 1000)
}

const initSmsCodeData = () => {
  const smsCodeTime = uni.getStorageSync("smsCode")

  if(new Date().getTime() <= smsCodeTime){
    remainingTime.value = Math.floor((smsCodeTime - new Date().getTime())/ 1000)
    dealTime()
  }
}

initSmsCodeData()

const switchMode = (m: Mode) => {
  mode.value = m
}

const getSmsCodes = () => {
  if(remainingTime.value) {
    uni.showToast({ title: '请等待时间结束', icon: 'none' })
    return
  }

  if(!registerForm.telephone || !/^[0-9]{11}$/.test(registerForm.telephone.trim())){
    uni.showToast({ title: '手机号码格式不正确', icon: 'none' })
    return
  }

  getSmsCode(registerForm.telephone).then(res => {
    // console.log("rews", res)
    if(!res.success){
      uni.showToast({ title: res.message || '发送失败', icon: 'none' })
      return
    }
    uni.showToast({ title: '发送成功', icon: 'none' })
    if(res.next_request_interval){
      uni.setStorageSync("smsCode", new Date().getTime()+(res?.next_request_interval ? res?.next_request_interval * 1000:0))
      remainingTime.value = res.next_request_interval
      dealTime()
    }
  }).catch(err => {
    console.log("获取验证码异常 error", err)
    uni.showToast({ title: err.message, icon: 'none' })
  })
}

const onSubmit = () => {
  if (mode.value === 'login') {
    // 登录
    if (!loginForm.userName || loginForm.userName.trim() === '') {
      uni.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }
    if (!loginForm.password || loginForm.password.trim() === '') {
      uni.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    userLoggedIn()
  } else {
    // 注册
    if (!registerForm.userName || registerForm.userName.trim() === '') {
      uni.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }
    // if (!registerForm.telephone || registerForm.telephone.trim() === '') {
    //   uni.showToast({ title: '请输入手机号码', icon: 'none' })
    //   return
    // }
    if(!registerForm.telephone || !/^[0-9]{11}$/.test(registerForm.telephone.trim())){
      uni.showToast({ title: '手机号码格式不正确', icon: 'none' })
      return
    }

    if(!registerForm.smsCode || !/^[0-9]{6}$/.test(registerForm.smsCode.trim())){
      uni.showToast({ title: '验证码不正确', icon: 'none' })
      return
    }

    if (!registerForm.password || registerForm.password.trim() === '') {
      uni.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    if (!registerForm.confirmPassword || registerForm.confirmPassword.trim() === '') {
      uni.showToast({ title: '请再次输入密码', icon: 'none' })
      return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      uni.showToast({ title: '两次密码不一致', icon: 'none' })
      return
    }
    userRegistered()
  }
}

const userRegistered = () => {
  // console.log("注册表单", registerForm)
  uni.showToast({ title: '注册中...', icon: 'none' })

  userRegister(registerForm.userName, registerForm.password, `+86${registerForm.telephone}`, registerForm.smsCode, registerForm.referrerUuid)
    .then(res => {
      if(res.access_token){
        uni.showToast({ title: '注册成功，请登录', icon: 'none' })
        switchMode('login')
      } else {
        uni.showToast({ title: res.message || '注册失败', icon: 'none' })
      }
    })
    .catch(err => {
      console.log("注册异常", err)
      uni.showToast({ title: typeof(err) === 'string' ? err:err.message, icon: 'none' })
    })
}

const userLoggedIn = () => {
  userLoginH5(loginForm.userName, loginForm.password, "", "")
    .then(res => {
      if(res.status == "success"){
        uni.showToast({ title: '登录成功', icon: 'none' })
        uni.setStorageSync('authToken', res.data.access_token)
        // uni.setStorageSync('userInfo', res.data.userInfo)
        useStore().user.setUserInfo({uuid:res.data.user_info.user_uuid,name:res.data.user_info.user_name, token:res.data.access_token, token_type:res.data.token_type, token_valid_until: new Date().getTime() + (60 * 60 * 24 * 6 * 1000)});

        uni.reLaunch({ url: '/pages/home/home' })
      } else {
        uni.showToast({ title: res.message || '登录失败', icon: 'none' })
      }
    })
    .catch(err => {
      console.log("登录异常", err)
      uni.showToast({ title: err, icon: 'none' })
    })
}

</script>

<template>
  <view class="container">
    <view style="position: relative; z-index: 2; width: 90%; margin: 0 auto;">
      <view class="brand">
        <text class="brand-title">{{ mode === 'login' ? '登录' : '注册' }}</text>
        <text class="brand-sub">欢迎使用场外期权服务</text>
      </view>

      <!--    <view class="switcher">-->
      <!--      <view class="switch-btn" :class="{ active: mode==='login' }" @click="switchMode('login')">登录</view>-->
      <!--      <view class="switch-btn" :class="{ active: mode==='register' }" @click="switchMode('register')">注册</view>-->
      <!--&lt;!&ndash;      <view class="switch-btn" @click="switchMode(`login`)">登录</view>&ndash;&gt;-->
      <!--&lt;!&ndash;      <view class="switch-btn" @click="switchMode(`register`)">注册</view>&ndash;&gt;-->
      <!--    </view>-->

      <view class="card">
        <!--      <view class="fir_title">{{ mode === 'login' ? '登录账户' : '创建账户' }}</view>-->

        <view class="form-row">
          <text class="label">用户名</text>
          <view v-if="mode==='login'" class="input-wrap">
            <view class="icon-left">👤</view>
            <input class="input" v-model="loginForm.userName" placeholder="请输入用户名" />
          </view>
          <view v-else class="input-wrap">
            <view class="icon-left">👤</view>
            <input class="input" v-model="registerForm.userName" placeholder="请输入用户名" />
          </view>
        </view>

        <view class="form-row" v-if="mode!=='login'">
          <text class="label">手机号码</text>
          <view class="input-wrap">
            <view class="icon-left">📱</view>
            <input class="input" v-model="registerForm.telephone" placeholder="请输入手机号码" />
          </view>
        </view>

        <view class="form-row" v-if="mode!=='login'">
          <text class="label">验证码</text>
          <view class="input-wrap">
            <view class="icon-left">🔢</view>
            <input class="input" maxlength="6" v-model="registerForm.smsCode" placeholder="请输入验证码" />
            <view class="sms-btn" @click="getSmsCodes">{{ remainingTime ? `${remainingTime}s`:smsBtnText }}</view>
          </view>
        </view>

        <view class="form-row">
          <text class="label">密码</text>
          <view v-if="mode==='login'" class="input-wrap">
            <view class="icon-left">🔒</view>
            <input class="input" v-model="loginForm.password" :password="!showLoginPwd" placeholder="请输入密码" />
            <view class="eye" @click="showLoginPwd = !showLoginPwd">{{ showLoginPwd ? '🙈' : '👁️' }}</view>
          </view>
          <view v-else class="input-wrap">
            <view class="icon-left">🔒</view>
            <input class="input" v-model="registerForm.password" :password="!showRegisterPwd" placeholder="请输入密码" />
            <view class="eye" @click="showRegisterPwd = !showRegisterPwd">{{ showRegisterPwd ? '🙈' : '👁️' }}</view>
          </view>
        </view>

        <view v-if="mode==='register'" class="form-row">
          <text class="label">确认密码</text>
          <view class="input-wrap">
            <view class="icon-left">🔒</view>
            <input class="input" v-model="registerForm.confirmPassword" :password="!showRegisterConfirmPwd" placeholder="请再次输入密码" />
            <view class="eye" @click="showRegisterConfirmPwd = !showRegisterConfirmPwd">{{ showRegisterConfirmPwd ? '🙈' : '👁️' }}</view>
          </view>
        </view>

        <view v-if="mode==='register'" class="form-row">
          <text class="label">推荐人（选填）</text>
          <view class="input-wrap">
            <view class="icon-left">🏷️</view>
            <input class="input" v-model="registerForm.referrerUuid" placeholder="请输入推荐人ID" />
          </view>
        </view>

        <view class="submit" @click="onSubmit">{{ mode==='login' ? '登录' : '注册' }}</view>

        <view class="row">
          <view class="row_cont" style="color:#5E8ED6; font-size:12px;">
            <text @click="switchMode(mode==='login' ? 'register' : 'login')" style="color: var(--color-primary-bg)">{{ mode==='login' ? '没有账号？去注册' : '已有账号？去登录' }}</text>
          </view>
        </view>

        <view class="upload-tips">
          <text>为保障账户安全，请使用复杂密码并妥善保管。登录或注册即表示已阅读并同意相关服务条款与隐私政策。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 100dvh;
  min-width: 100vw;
  min-height: 100dvh;
  background-color: #F7F7F7;
  background: url("../../static/login_bg.jpg") no-repeat 100%/cover;
  padding: 0;
  position: relative;
  display: table-cell;
  vertical-align: middle;

  &:before{
    content: "";
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100dvh;
    background: rgba(0,0,0,0.6);
    position: absolute;
    inset: 0;
    z-index: 1;
}

}
.brand{ width: 90%; margin: 0 auto 10px; text-align: left;
  .brand-title{ font-size: 22px; font-weight: 600; color: #fff; }
  .brand-sub{ display: block; margin-top: 6px; font-size: 12px; color: #999; }
}
.switcher{ width: 90%; margin: 0 auto 12px; display: flex; gap: 8px; }
.switch-btn{ flex: 1; text-align: center; line-height: 40px; border: 1px solid #DDD; border-radius: 10px; color:#666; }
.switch-btn.active{ background: var(--color-primary-bg); color: #FFF; border-color: transparent; }

.card{ width: 90%; margin: auto; padding: 16px; background: #FFF; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.fir_title{ font-size: 16px; font-weight: bold; margin-bottom: 10px; }
.form-row{ margin-bottom: 12px; }
.label{ display: block; font-size: 12px; color: #000000; margin-bottom: 6px; }
.input{ width: 100%; height: 44px; border: 1px solid #EEE; border-radius: 10px; padding: 0 12px; box-sizing: border-box; font-size: 14px; }
.input-wrap{ position: relative; }
.input-wrap .input{ padding-right: 42px; padding-left: 42px; }
.eye{ position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 18px; color: #999; }
.sms-btn {position: absolute; width: 66px; right: 0px; top: 50%; transform: translateY(-50%); font-size: 13px; text-align: center; background: var(--color-primary-bg); color: #FFFFFF; padding: 0 10px; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 10px}
.icon-left{ position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 18px; color: #999; }
.submit{ margin: 14px auto; width: 100%; text-align: center; background: var(--color-primary-bg); line-height: 46px; border-radius: 12px; box-sizing: border-box; color: #FFFFFF; }
.row{ padding: 2px 0; display: flex; align-items: center; justify-content: space-between; }
.row_cont text{ color: #999; }
.upload-tips { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 1.6; color: #999999; margin-top: 8px; }
</style>
