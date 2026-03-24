<template>
  <!-- H5环境: 通过show控制显示 -->
  <!-- #ifdef H5 -->
  <view class="popup-overlay" v-if="show" @click="handleOverlayClick">
    <view class="popup-container" @click.stop>
      <view v-if="config.type === 1" class="popup-feedback">
        <view class="popup-icon">
          <text class="icon-text" :class="iconClass">{{ iconText }}</text>
        </view>
        <view v-if="config.title" class="popup-title">{{ config.title }}</view>
        <view v-if="config.content" class="popup-content">{{ config.content }}</view>
        <view class="popup-btns">
          <view v-if="config.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ config.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ config.confirmText || '确定' }}
          </view>
        </view>
      </view>

      <view v-else-if="config.type === 2" class="popup-modal">
        <view v-if="config.title" class="popup-header">
          <text class="popup-title">{{ config.title }}</text>
        </view>
        <view class="popup-body">
          <view v-if="config.content" class="popup-content-main">{{ config.content }}</view>
          <view v-if="config.subContent" class="popup-content-sub">{{ config.subContent }}</view>
        </view>
        <view class="popup-btns">
          <view v-if="config.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ config.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ config.confirmText || '确定' }}
          </view>
        </view>
      </view>

      <view v-else class="popup-custom">
        <view v-if="config.title" class="popup-title">{{ config.title }}</view>
        <view v-if="config.content" class="popup-content">{{ config.content }}</view>
        <view class="popup-btns">
          <view v-if="config.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ config.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ config.confirmText || '确定' }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- #endif -->

  <!-- APP-PLUS环境: 作为页面直接显示 -->
  <!-- #ifdef APP-PLUS || APP-HARMONY -->
  <view class="popup-overlay" @click="handleOverlayClick">
    <view class="popup-container" @click.stop>
      <view v-if="pageConfig.type === 1" class="popup-feedback">
        <view class="popup-icon">
          <text class="icon-text" :class="pageIconClass">{{ pageIconText }}</text>
        </view>
        <view v-if="pageConfig.title" class="popup-title">{{ pageConfig.title }}</view>
        <view v-if="pageConfig.content" class="popup-content">{{ pageConfig.content }}</view>
        <view class="popup-btns">
          <view v-if="pageConfig.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ pageConfig.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ pageConfig.confirmText || '确定' }}
          </view>
        </view>
      </view>

      <view v-else-if="pageConfig.type === 2" class="popup-modal">
        <view v-if="pageConfig.title" class="popup-header">
          <text class="popup-title">{{ pageConfig.title }}</text>
        </view>
        <view class="popup-body">
          <view v-if="pageConfig.content" class="popup-content-main">{{ pageConfig.content }}</view>
          <view v-if="pageConfig.subContent" class="popup-content-sub">{{ pageConfig.subContent }}</view>
        </view>
        <view class="popup-btns">
          <view v-if="pageConfig.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ pageConfig.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ pageConfig.confirmText || '确定' }}
          </view>
        </view>
      </view>

      <view v-else class="popup-custom">
        <view v-if="pageConfig.title" class="popup-title">{{ pageConfig.title }}</view>
        <view v-if="pageConfig.content" class="popup-content">{{ pageConfig.content }}</view>
        <view class="popup-btns">
          <view v-if="pageConfig.showCancel" class="popup-btn cancel-btn" @click="handleCancel">
            {{ pageConfig.cancelText || '取消' }}
          </view>
          <view class="popup-btn confirm-btn" @click="handleConfirm">
            {{ pageConfig.confirmText || '确定' }}
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { onLoad, onBackPress } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

interface PopupConfig {
  type?: 1 | 2 | 3;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  closeOpacity?: boolean;
  title?: string;
  content?: string;
  subContent?: string;
  icon?: 1 | 2 | 3;
}

// H5端Props
const props = defineProps<{
  show: boolean;
  config: PopupConfig;
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}>();

// APP端页面参数
const pageConfig = ref<PopupConfig>({
  type: 1,
  showCancel: false,
  confirmText: '确定',
  cancelText: '取消',
  closeOpacity: false,
  title: '',
  content: '',
  subContent: '',
  icon: 1
});

// 事件通道（APP端使用）
let eventChannel: any = null;

onLoad((options) => {
  // #ifdef APP-PLUS || APP-HARMONY
  if (options) {
    pageConfig.value = {
      type: Number(options.type) as 1 | 2 | 3 || 1,
      showCancel: options.showCancel === '1',
      confirmText: decodeURIComponent(options.confirmText || '确定'),
      cancelText: decodeURIComponent(options.cancelText || '取消'),
      closeOpacity: options.closeOpacity === '1',
      title: decodeURIComponent(options.title || ''),
      content: decodeURIComponent(options.content || ''),
      subContent: options.subContent ? decodeURIComponent(options.subContent) : '',
      icon: Number(options.icon) as 1 | 2 | 3 || 1
    };
  }

  // 获取事件通道
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1] as any;
  if (currentPage && currentPage.getOpenerEventChannel) {
    eventChannel = currentPage.getOpenerEventChannel();
  }
  // #endif
});

// #ifdef APP-PLUS || APP-HARMONY
// APP端拦截返回键：强制更新时不允许返回
onBackPress(() => {
  // 如果没有取消按钮（强制更新），阻止返回
  if (!pageConfig.value.showCancel) {
    uni.showToast({
      title: '请先更新到最新版本',
      icon: 'none'
    });
    return true; // 阻止返回
  }
  return false; // 允许返回
});
// #endif

// H5端图标计算
const iconClass = computed(() => {
  const icon = props.config.icon || 1;
  return {
    'icon-success': icon === 1,
    'icon-error': icon === 2,
    'icon-info': icon === 3
  };
});

const iconText = computed(() => {
  const icon = props.config.icon || 1;
  if (icon === 1) return '✓';
  if (icon === 2) return '✕';
  return 'i';
});

// APP端图标计算
const pageIconClass = computed(() => {
  const icon = pageConfig.value.icon || 1;
  return {
    'icon-success': icon === 1,
    'icon-error': icon === 2,
    'icon-info': icon === 3
  };
});

const pageIconText = computed(() => {
  const icon = pageConfig.value.icon || 1;
  if (icon === 1) return '✓';
  if (icon === 2) return '✕';
  return 'i';
});

const handleOverlayClick = () => {
  // #ifdef H5
  if (props.config.closeOpacity) {
    handleCancel();
  }
  // #endif
  // #ifdef APP-PLUS || APP-HARMONY
  if (pageConfig.value.closeOpacity) {
    handleCancel();
  }
  // #endif
};

const handleCancel = () => {
  // #ifdef APP-PLUS || APP-HARMONY
  if (eventChannel) {
    eventChannel.emit('cancel');
  }
  uni.navigateBack();
  // #endif
  // #ifdef H5
  emit('cancel');
  // #endif
};

const handleConfirm = () => {
  // #ifdef APP-PLUS || APP-HARMONY
  if (eventChannel) {
    eventChannel.emit('confirm');
  }
  uni.navigateBack();
  // #endif
  // #ifdef H5
  emit('confirm');
  // #endif
};
</script>

<style lang="scss">
/* 页面透明背景（APP端需要，不能用 scoped） */
page {
  background: transparent;
}
</style>

<style lang="scss" scoped>
@import './style.scss';
</style>