<template>
  <view class="readonlyModalRoot" v-if="visible">
    <view class="readonlyMask" @click="handleCancel"></view>

    <view class="readonlyDialog">
      <view class="dialogHeader">
        <view class="dialogTitleRow">
          <view class="dialogIconWrap">
            <text class="dialogIcon">锁</text>
          </view>
          <view class="dialogTitleBlock">
            <view class="dialogTitle">当前为只读模式</view>
            <view class="dialogSubtitle">
              你的手动记账订阅已到期
            </view>
          </view>
        </view>
      </view>

      <view class="dialogBody">
        <view class="messageCard">
          <view class="messageMain">
            历史记录仍可查看。续费后可继续新增、编辑、获取最新估值与到期提醒。
          </view>
          <view class="messageSub" v-if="blockedActionText">
            当前受限操作：{{ blockedActionText }}
          </view>
        </view>

        <view class="capabilityList">
          <view class="capabilityRow">
            <text class="capabilityLabel">当前可用</text>
            <text class="capabilityValue">查看历史记录</text>
          </view>
          <view class="capabilityRow">
            <text class="capabilityLabel">当前受限</text>
            <text class="capabilityValue capabilityValueWarn">
              新增 / 编辑 / 估值刷新 / 提醒修改
            </text>
          </view>
        </view>
      </view>

      <view class="dialogFooter">
        <view class="actionRow">
          <view class="secondaryBtn" @click="handleCancel">
            <text class="secondaryBtnText">取消</text>
          </view>

          <view class="primaryBtn" @click="handleRenew">
            <text class="primaryBtnText">去续费</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { BlockedAction } from "@/interfaces/tools/subscribe"

const props = withDefaults(defineProps<{
  visible: boolean
  blockedAction?: BlockedAction
  renewUrl?: string
}>(), {
  blockedAction: "generic",
  renewUrl: "/tools/subscribe-renew/index"
})

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void
  (e: "cancel"): void
  (e: "renew"): void
}>()

const blockedActionText = computed(() => {
  switch (props.blockedAction) {
    case "create":
      return "新增记录"
    case "edit":
      return "编辑记录"
    case "refresh_valuation":
      return "刷新估值"
    case "edit_reminder":
      return "修改提醒"
    case "generic":
    default:
      return ""
  }
})

const handleCancel = () => {
  emit("update:visible", false)
  emit("cancel")
}

const handleRenew = () => {
  emit("renew")
  emit("update:visible", false)
  uni.$u.route(props.renewUrl)
}
</script>

<style>
.readonlyModalRoot {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.readonlyMask {
  position: absolute;
  inset: 0;
  background: rgba(24, 24, 27, 0.42);
}

.readonlyDialog {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: calc(24rpx + env(safe-area-inset-bottom));
  background: #ffffff;
  border-radius: 12rpx;
  border: 1px solid #e4e4e7;
  box-shadow: 0 16rpx 48rpx rgba(24, 24, 27, 0.16);
  overflow: hidden;
}

.dialogHeader {
  padding: 28rpx 28rpx 20rpx;
  border-bottom: 1px solid #f1f5f9;
  box-sizing: border-box;
}

.dialogTitleRow {
  display: flex;
  align-items: flex-start;
  gap: 18rpx;
}

.dialogIconWrap {
  width: 68rpx;
  height: 68rpx;
  flex-shrink: 0;
  background: #fdf2f2;
  border: 1px solid #f3d4d1;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.dialogIcon {
  font-size: 28rpx;
  line-height: 1;
  color: #d6423a;
  font-weight: 700;
}

.dialogTitleBlock {
  min-width: 0;
  flex: 1;
}

.dialogTitle {
  font-size: 32rpx;
  line-height: 1.4;
  font-weight: 700;
  color: #18181b;
}

.dialogSubtitle {
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #71717a;
}

.dialogBody {
  padding: 24rpx 28rpx;
  box-sizing: border-box;
}

.messageCard {
  padding: 20rpx;
  background: #fafafa;
  border: 1px solid #e4e4e7;
  border-radius: 20rpx;
  box-sizing: border-box;
}

.messageMain {
  font-size: 25rpx;
  line-height: 1.7;
  color: #18181b;
  font-weight: 500;
}

.messageSub {
  margin-top: 12rpx;
  padding-top: 12rpx;
  border-top: 1px solid #e4e4e7;
  font-size: 22rpx;
  line-height: 1.6;
  color: #71717a;
}

.capabilityList {
  margin-top: 18rpx;
  padding: 20rpx;
  background: #fafafa;
  border: 1px solid #e4e4e7;
  border-radius: 20rpx;
  box-sizing: border-box;
}

.capabilityRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20rpx;
}

.capabilityRow + .capabilityRow {
  margin-top: 14rpx;
}

.capabilityLabel {
  flex-shrink: 0;
  font-size: 22rpx;
  line-height: 1.6;
  color: #71717a;
}

.capabilityValue {
  min-width: 0;
  text-align: right;
  font-size: 24rpx;
  line-height: 1.6;
  color: #18181b;
  font-weight: 500;
  word-break: break-all;
}

.capabilityValueWarn {
  color: #c2410c;
  font-weight: 600;
}

.dialogFooter {
  padding: 0 28rpx 28rpx;
  box-sizing: border-box;
}

.actionRow {
  display: flex;
  gap: 16rpx;
}

.secondaryBtn,
.primaryBtn {
  flex: 1;
  min-height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  box-sizing: border-box;
}

.secondaryBtn {
  background: #fafafa;
  border: 1px solid #e4e4e7;
}

.primaryBtn {
  background: linear-gradient(
    90deg,
    var(--app-brand-top-start, #d6423a) 0%,
    var(--app-brand-top-end, #c7342c) 100%
  );
  box-shadow: 0 10rpx 24rpx rgba(214, 66, 58, 0.18);
}

.secondaryBtnText {
  font-size: 28rpx;
  line-height: 1.2;
  color: #18181b;
  font-weight: 600;
}

.primaryBtnText {
  font-size: 28rpx;
  line-height: 1.2;
  color: #ffffff;
  font-weight: 600;
}
</style>