<template>
  <view class="page introPage">
    <view class="pageInner">
      <!-- 顶部说明 -->
      <view class="heroCard">
        <view class="heroTitle">手动记账与持仓跟踪</view>
        <view class="heroDesc">
          用于记录外部平台期权订单，持续查看估算盈亏、到期提醒与最终结算结果。
        </view>
      </view>

      <!-- 功能说明 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">功能说明</text>
            <text class="sectionHint">适用于外部期权订单记录</text>
          </view>

          <view class="featureList">
            <view class="featureItem" v-for="item in featureList" :key="item.title">
              <view class="featureIcon">√</view>
              <view class="featureContent">
                <view class="featureTitle">{{ item.title }}</view>
                <view class="featureDesc">{{ item.desc }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 风险提示 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">风险提示</text>
            <text class="sectionHint">请先理解估算值与实际结算的区别</text>
          </view>

          <view class="noticeCard noticeCardWarn">
            <view class="noticeTitle">未到期盈亏为估算值，仅供参考</view>
            <view class="noticeDesc">
              在记录存续期间，系统展示的浮动盈亏、预计收益与盈亏率，属于基于当前信息的估算结果，不构成实际结算依据。
            </view>
          </view>

          <view class="noticeCard">
            <view class="noticeTitle">最终结果以实际结算为准</view>
            <view class="noticeDesc">
              到期后请录入最终结算价格或结算金额，系统才会形成已实现盈亏与正式结算台账。
            </view>
          </view>
        </view>
      </view>

      <!-- 试用权益 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">试用权益</text>
            <text class="sectionHint">首次使用可体验完整流程</text>
          </view>

          <view class="trialCard">
            <view class="trialTopRow">
              <view class="trialBadge">
                <text class="trialBadgeText">试用期</text>
              </view>
              <text class="trialDays">{{ trialDaysText }}</text>
            </view>

            <view class="trialDesc">
              试用期内可完整使用新增记录、估算盈亏、到期提醒、录入最终结算等功能。
            </view>

            <view class="trialList">
              <view class="trialItem" v-for="item in trialBenefits" :key="item">
                <text class="trialDot"></text>
                <text class="trialItemText">{{ item }}</text>
              </view>
            </view>

            <view class="trialFootnote">
              试用结束后，可按月订阅继续使用；历史记录保留只读查看。
            </view>
          </view>
        </view>
      </view>

      <!-- 操作区 -->
      <view class="submitBar">
        <view class="submitMeta">
          <text class="submitMetaLabel">当前状态</text>
          <text class="submitMetaValue">{{ currentStatusText }}</text>
        </view>

        <view class="actionRow">
          <view
            class="secondaryBtn"
            :class="{ secondaryBtnDisabled: submitting }"
            @click="handleCancel"
          >
            <text class="secondaryBtnText">暂不使用</text>
          </view>

          <view
            class="primaryBtn"
            :class="{ primaryBtnDisabled: submitting }"
            @click="handleStartTrial"
          >
            <text class="primaryBtnText">{{ submitting ? "处理中..." : primaryActionText }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { failToast } from "@/utils/toast/toast"

type IntroPageStatus = "not_opened" | "trial" | "subscribed" | "expired"

interface ManualLedgerTrialState {
  status: IntroPageStatus
  trialDays: number
  trialRemainingDays?: number
}

const pageState = ref<ManualLedgerTrialState>({
  status: "not_opened",
  trialDays: 7,
  trialRemainingDays: 0,
})

const submitting = ref(false)

const featureList = [
  {
    title: "手动记录外部期权订单",
    desc: "支持录入标的、行权价、方向、成本、到期日、外部平台与备注等核心信息。",
  },
  {
    title: "持续查看当前盈亏（估算）",
    desc: "在持仓期间，系统可展示浮动盈亏、预计收益与盈亏率，便于持续跟踪。",
  },
  {
    title: "到期前多次提醒",
    desc: "支持在到期前 7 天、3 天、1 天及当天进行提醒，减少遗忘与遗漏。",
  },
  {
    title: "到期后录入最终结算",
    desc: "支持按结算价格或结算金额补录结果，形成已实现盈亏与结算台账。",
  },
]

const trialBenefits = [
  "新增与编辑手工记录",
  "查看估算盈亏与持仓状态",
  "设置与修改到期提醒",
  "录入最终结算并查看已实现盈亏",
]

const trialDaysText = computed(() => {
  return `免费试用 ${pageState.value.trialDays} 天`
})

const currentStatusText = computed(() => {
  switch (pageState.value.status) {
    case "trial":
      return `试用中，剩余 ${pageState.value.trialRemainingDays ?? 0} 天`
    case "subscribed":
      return "已订阅，可直接使用完整功能"
    case "expired":
      return "试用已结束或订阅已到期"
    case "not_opened":
    default:
      return "尚未开通，可先开始试用"
  }
})

const primaryActionText = computed(() => {
  switch (pageState.value.status) {
    case "trial":
    case "subscribed":
      return "立即使用"
    case "expired":
    case "not_opened":
    default:
      return "开始试用"
  }
})

const handleStartTrial = async () => {
  if (submitting.value) return

  try {
    submitting.value = true

    if (pageState.value.status === "trial" || pageState.value.status === "subscribed") {
      uni.$u.route("/tools/record-list/index")
      return
    }

    uni.showLoading({ title: "开通中" })

    pageState.value.status = "trial"
    pageState.value.trialRemainingDays = pageState.value.trialDays

    uni.hideLoading()

    uni.showToast({
      title: "试用已开始",
      icon: "success",
    })

    setTimeout(() => {
      uni.$u.route("/tools/record-list/index")
    }, 300)
  } catch (error) {
    uni.hideLoading()
    failToast("试用开通失败，请稍后重试")
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  if (submitting.value) return

  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }

  uni.$u.route("/tools/home/index")
}
</script>

<style lang="scss" src="./style.scss"></style>