<template>
  <view class="page recordEmptyPage">
    <view class="pageInner">
      <!-- 顶部说明 -->
      <view class="headerCard">
        <view class="headerTitle">手动记账</view>
        <view class="headerDesc">
          用于记录外部个股期权订单，并持续跟踪估算盈亏、到期提醒与最终结算。
        </view>
        <view class="headerTag">试用中</view>
      </view>

      <!-- 状态提示卡 -->
      <view class="statusCard">
        <view class="statusCardHeader">
          <view class="statusCardTitle">当前状态</view>
          <view class="statusCardHint">授权信息与使用状态</view>
        </view>

        <view class="trialBox">
          <view class="trialTopRow">
            <view class="statusTag statusTagTrial">
              <text class="statusTagText">试用中</text>
            </view>
            <view class="trialMainText">试用已开通，可完整体验手动记账流程</view>
          </view>

          <view class="trialDesc">
            建议在试用期内完成首次建仓记录、查看估算结果，并体验提醒与结算流程。
          </view>

          <view class="trialDivider"></view>

          <view class="trialFooter">
            <view class="trialMetaLabel">试用剩余</view>
            <view class="trialMetaValue">3 天</view>
          </view>

          <view class="trialAction">
            <view class="btnPrimary" @click="handleSubscriptionAction">
              <text class="btnTextPrimary">立即订阅</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态区域 -->
      <view class="emptySection">
        <EmptyState />
      </view>

      <!-- 提示和按钮区域 -->
      <view class="actionSection">
        <view class="emptyNoticeCard emptyNoticeCardHighlight">
          <view class="emptyNoticeTitle">当前提示</view>
          <view class="emptyNoticeDesc">
            建议先新增第一笔记录，或先查看示例了解录入后的展示效果。
          </view>
        </view>

        <view class="emptyActions">
          <view class="primaryBtn" @click="handleCreateFirstRecord">
            <text class="primaryBtnText">新增第一笔记录</text>
          </view>
          <view class="secondaryBtn" @click="handleViewExample">
            <text class="secondaryBtnText">查看示例</text>
          </view>
        </view>
      </view>

      <!-- 只读模式拦截弹层 -->
      <ReadonlyModal
        v-model:visible="showReadonlyModal"
        blockedAction="create"
        renewUrl="/tools/subscribe-renew/index"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ReadonlyModal from "@/tools/components/ReadonlyModal.vue"
import EmptyState from "@/tools/components/EmptyState.vue"

const showReadonlyModal = ref(false)

const handleSubscriptionAction = () => {
  uni.$u.route("/tools/subscribe-open/index")
}

const handleCreateFirstRecord = () => {
  uni.$u.route("/tools/record-create/index")
}

const handleViewExample = () => {
  uni.$u.route("/tools/example-preview/index")
}
</script>

<style lang="scss" src="./style.scss"></style>