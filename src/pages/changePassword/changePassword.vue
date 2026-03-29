<script setup lang="ts">
import { reactive, ref } from 'vue'
import { changePassword } from '@/api'
import type { ChangePasswordReq } from '@/interfaces/user'
import { useStore } from '@/stores'

const form = reactive<ChangePasswordReq>({
  old_password: '',
  new_password: ''
})

const showOldPwd = ref(false)
const showNewPwd = ref(false)
const loading = ref(false)

const onSubmit = async () => {
  // 表单验证
  if (!form.old_password || form.old_password.trim() === '') {
    uni.showToast({ title: '请输入旧密码', icon: 'none' })
    return
  }
  if (!form.new_password || form.new_password.trim() === '') {
    uni.showToast({ title: '请输入新密码', icon: 'none' })
    return
  }
  if (form.new_password.length < 6) {
    uni.showToast({ title: '新密码至少6位', icon: 'none' })
    return
  }
  if (form.old_password === form.new_password) {
    uni.showToast({ title: '新密码不能与旧密码相同', icon: 'none' })
    return
  }

  loading.value = true
  uni.showLoading({ title: '修改中...' })

  try {
    const res = await changePassword(form)
    uni.hideLoading()
    if (res.status === 'success') {
      uni.showToast({ title: '密码修改成功，请重新登录', icon: 'success' })
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
    console.log('修改密码异常', err)
    uni.showToast({ title: typeof err === 'string' ? err : (err as Error).message || '修改失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="container">
    <view class="card">
      <view class="title">修改密码</view>

      <view class="form-row">
        <text class="label">旧密码</text>
        <view class="input-wrap">
          <view class="icon-left">🔒</view>
          <input
            class="input"
            v-model="form.old_password"
            :password="!showOldPwd"
            placeholder="请输入旧密码"
          />
          <view class="eye" @click="showOldPwd = !showOldPwd">{{ showOldPwd ? '🙈' : '👁️' }}</view>
        </view>
      </view>

      <view class="form-row">
        <text class="label">新密码</text>
        <view class="input-wrap">
          <view class="icon-left">🔐</view>
          <input
            class="input"
            v-model="form.new_password"
            :password="!showNewPwd"
            placeholder="请输入新密码（至少6位）"
          />
          <view class="eye" @click="showNewPwd = !showNewPwd">{{ showNewPwd ? '🙈' : '👁️' }}</view>
        </view>
      </view>

      <view class="submit" :class="{ disabled: loading }" @click="onSubmit">
        {{ loading ? '修改中...' : '确认修改' }}
      </view>

      <!-- <view class="tips">
        <text>为保障账户安全，建议使用6位以上包含字母和数字的复杂密码。</text>
      </view> -->
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

.tips {
  margin-top: 16px;
  font-size: 12px;
  color: #999;
  line-height: 1.6;
}
</style>