<script setup lang="ts">
import { reactive, ref } from 'vue'
import { changePhone, sendSmsCode } from '@/api'
import type { ChangePhoneReq } from '@/interfaces/user'
import { useStore } from '@/stores'

const form = reactive<ChangePhoneReq>({
  current_password: '',
  new_phone: '',
  sms_code: ''
})

// 处理手机号输入，自动添加+86前缀
const phoneInput = ref('')
const handlePhoneInput = (value: string) => {
  phoneInput.value = value.replace(/\D/g, '').slice(0, 11)
  form.new_phone = `+86${phoneInput.value}`
}

const showPwd = ref(false)
const loading = ref(false)

// 验证码相关
const smsBtnText = ref("发送验证码")
const remainingTime = ref(0)
const timer = ref()

const dealTime = () => {
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1
    } else {
      clearInterval(timer.value)
      timer.value = ''
    }
  }, 1000)
}

const initSmsCodeData = () => {
  const smsCodeTime = uni.getStorageSync("changePhoneSmsCode")
  if (new Date().getTime() <= smsCodeTime) {
    remainingTime.value = Math.floor((smsCodeTime - new Date().getTime()) / 1000)
    dealTime()
  }
}

initSmsCodeData()

const sendSmsCodes = () => {
  if (remainingTime.value) {
    uni.showToast({ title: '请等待时间结束', icon: 'none' })
    return
  }

  if (!phoneInput.value || !/^[0-9]{11}$/.test(phoneInput.value.trim())) {
    uni.showToast({ title: '手机号码格式不正确', icon: 'none' })
    return
  }

  sendSmsCode({
    phone: form.new_phone,
    captcha_type: 'change_phone'
  }).then(res => {
    if (!res.success) {
      uni.showToast({ title: res.message || '发送失败', icon: 'none' })
      return
    }
    uni.showToast({ title: '发送成功', icon: 'none' })
    if (res.next_request_interval) {
      uni.setStorageSync("changePhoneSmsCode", new Date().getTime() + res.next_request_interval * 1000)
      remainingTime.value = res.next_request_interval
      dealTime()
    }
  }).catch(err => {
    console.log('获取验证码异常 error', err)
    uni.showToast({ title: err.message || '发送失败', icon: 'none' })
  })
}

const onSubmit = async () => {
  // 表单验证
  if (!form.current_password || form.current_password.trim() === '') {
    uni.showToast({ title: '请输入当前密码', icon: 'none' })
    return
  }
  if (!phoneInput.value || !/^[0-9]{11}$/.test(phoneInput.value.trim())) {
    uni.showToast({ title: '手机号码格式不正确', icon: 'none' })
    return
  }
  if (!form.sms_code || !/^[0-9]{6}$/.test(form.sms_code.trim())) {
    uni.showToast({ title: '验证码不正确', icon: 'none' })
    return
  }

  loading.value = true
  uni.showLoading({ title: '修改中...' })

  try {
    const res = await changePhone(form)
    uni.hideLoading()
    if (res.status === 'success') {
      uni.showToast({ title: '手机号修改成功，请重新登录', icon: 'success' })
      // 退出登录
      useStore().user.clearUserInfo()
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/reLogin/reLogin' })
      }, 1500)
    } else {
      uni.showToast({ title: res.message || '修改失败', icon: 'none' })
    }
  } catch (err) {
    uni.hideLoading()
    console.log('修改手机号异常', err)
    uni.showToast({ title: typeof err === 'string' ? err : (err as Error).message || '修改失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="container">
    <view class="card">
      <view class="title">修改手机号</view>

      <view class="form-row">
        <text class="label">当前密码</text>
        <view class="input-wrap">
          <view class="icon-left">🔒</view>
          <input
            class="input"
            v-model="form.current_password"
            :password="!showPwd"
            placeholder="请输入当前密码"
          />
          <view class="eye" @click="showPwd = !showPwd">{{ showPwd ? '🙈' : '👁️' }}</view>
        </view>
      </view>

      <view class="form-row">
        <text class="label">新手机号</text>
        <view class="input-wrap">
          <view class="icon-left">📱</view>
          <input
            class="input"
            v-model="phoneInput"
            type="number"
            maxlength="11"
            placeholder="请输入新手机号"
            @input="handlePhoneInput(phoneInput)"
          />
        </view>
      </view>

      <view class="form-row">
        <text class="label">验证码</text>
        <view class="input-wrap">
          <view class="icon-left">🔢</view>
          <input
            class="input"
            maxlength="6"
            type="number"
            v-model="form.sms_code"
            placeholder="请输入验证码"
          />
          <view class="sms-btn" @click="sendSmsCodes">{{ remainingTime ? `${remainingTime}s` : smsBtnText }}</view>
        </view>
      </view>

      <view class="submit" :class="{ disabled: loading }" @click="onSubmit">
        {{ loading ? '修改中...' : '确认修改' }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #F7F7F7;
  padding: 20px;
  box-sizing: border-box;
}

.card {
  padding: 20px 16px;
  background: #FFF;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-row {
  margin-bottom: 16px;
}

.label {
  display: block;
  font-size: 13px;
  color: #333;
  margin-bottom: 8px;
}

.input-wrap {
  position: relative;
}

.input {
  width: 100%;
  height: 44px;
  border: 1px solid #EEE;
  border-radius: 10px;
  padding: 0 42px;
  box-sizing: border-box;
  font-size: 14px;
}

.icon-left {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999;
}

.sms-btn {
  position: absolute;
  width: 80px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  text-align: center;
  background: var(--color-primary-bg);
  color: #FFFFFF;
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.submit {
  margin: 24px auto 0;
  width: 100%;
  text-align: center;
  background: var(--color-primary-bg);
  line-height: 46px;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 16px;
}

.submit.disabled {
  opacity: 0.6;
}
</style>