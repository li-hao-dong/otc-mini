<script setup lang="ts">
import { reactive, ref } from 'vue'

type Mode = 'login' | 'register'
const mode = ref<Mode>('login')

const loginForm = reactive({
  userName: '',
  password: ''
})

const registerForm = reactive({
  userName: '',
  telephone: '',
  password: '',
  confirmPassword: '',
  referrerUuid: ''
})

const showLoginPwd = ref(false)
const showRegisterPwd = ref(false)
const showRegisterConfirmPwd = ref(false)

const switchMode = (m: Mode) => {
  mode.value = m
}

const onSubmit = () => {
  if (mode.value === 'login') {
    if (!loginForm.userName || loginForm.userName.trim() === '') {
      uni.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }
    if (!loginForm.password || loginForm.password.trim() === '') {
      uni.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    uni.showToast({ title: '登录中...', icon: 'none' })
    console.log("登录表单", loginForm)
    setTimeout(() => {
      uni.showToast({ title: '登录成功', icon: 'none' })
      uni.reLaunch({ url: '/pages/inquiryResult/inquiryResult' })
    }, 2000)
  } else {
    if (!registerForm.userName || registerForm.userName.trim() === '') {
      uni.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }
    // if (!registerForm.telephone || registerForm.telephone.trim() === '') {
    //   uni.showToast({ title: '请输入手机号码', icon: 'none' })
    //   return
    // }
    if(registerForm.telephone && !/^[0-9]{11}$/.test(registerForm.telephone.trim())){
      uni.showToast({ title: '手机号码格式不正确', icon: 'none' })
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
    console.log("注册表单", registerForm)
    uni.showToast({ title: '注册中...', icon: 'none' })
    setTimeout(() => {
      uni.showToast({ title: '注册成功', icon: 'none' })
      switchMode('login')
    }, 2000)
  }
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
          <text class="label">手机号码（选填）</text>
          <view class="input-wrap">
            <view class="icon-left">📱</view>
            <input class="input" v-model="registerForm.telephone" placeholder="请输入手机号码" />
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
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #F7F7F7;
  background: url("../../static/login_bg.png") no-repeat 100%/cover;
  padding: 0;
  position: relative;
  display: table-cell;
  vertical-align: middle;

  &:before{
    content: "";
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
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
.icon-left{ position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 18px; color: #999; }
.submit{ margin: 14px auto; width: 100%; text-align: center; background: var(--color-primary-bg); line-height: 46px; border-radius: 12px; box-sizing: border-box; color: #FFFFFF; }
.row{ padding: 2px 0; display: flex; align-items: center; justify-content: space-between; }
.row_cont text{ color: #999; }
.upload-tips { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 12px; line-height: 1.6; color: #999999; margin-top: 8px; }
</style>
