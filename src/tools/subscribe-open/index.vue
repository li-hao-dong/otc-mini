<template>
  <view class="page subscriptionOpenPage">
    <view class="pageInner">
      <!-- 顶部说明 -->
      <view class="heroCard">
        <view class="heroTitle">开通手动记账功能</view>
        <view class="heroDesc">
          持续管理外部期权持仓，查看估算盈亏、到期提醒与最终结算结果。
        </view>
      </view>

      <!-- 功能权益区 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">功能权益</text>
            <text class="sectionHint">开通后持续可用</text>
          </view>

          <view class="benefitList">
            <view class="benefitItem" v-for="item in benefitList" :key="item.title">
              <view class="benefitIcon">√</view>
              <view class="benefitContent">
                <view class="benefitTitle">{{ item.title }}</view>
                <view class="benefitDesc">{{ item.desc }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 当前状态卡 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">当前状态</text>
            <text class="sectionHint">按授权状态动态展示</text>
          </view>

          <view class="statusCard" :class="statusCardClass">
            <view class="statusTopRow">
              <view class="statusBadge" :class="statusBadgeClass">
                <text class="statusBadgeText">{{ statusBadgeText }}</text>
              </view>
              <text class="statusMainText">{{ statusMainText }}</text>
            </view>

            <view class="statusDesc">
              {{ statusDescText }}
            </view>

            <view
              class="statusReadonlyNotice"
              v-if="pageState.readonlyEnabled"
            >
              历史记录可继续只读查看；开通后可恢复新增、编辑、估值刷新与提醒设置。
            </view>
          </view>
        </view>
      </view>

      <!-- 套餐卡 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">套餐选择</text>
            <text class="sectionHint">当前提供一个月费版本</text>
          </view>

          <view
            class="planCard"
            :class="{ planCardActive: selectedPlanCode === monthlyPlan.code }"
            @click="selectPlan(monthlyPlan.code)"
          >
            <view class="planTopRow">
              <view class="planLeft">
                <view class="planTitleRow">
                  <text class="planTitle">{{ monthlyPlan.title }}</text>
                  <view class="planTag">
                    <text class="planTagText">推荐</text>
                  </view>
                </view>

                <view class="planPriceRow">
                  <text class="planCurrency">￥</text>
                  <text class="planPrice">{{ monthlyPlan.price }}</text>
                  <text class="planUnit">/ 月</text>
                </view>
              </view>

              <view class="planSelectBox">
                <view
                  class="planSelectInner"
                  v-if="selectedPlanCode === monthlyPlan.code"
                ></view>
              </view>
            </view>

            <view class="planDesc">
              {{ monthlyPlan.desc }}
            </view>

            <view class="planFeatureWrap">
              <view class="planFeature" v-for="item in monthlyPlan.features" :key="item">
                <text class="planFeatureText">{{ item }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作区 -->
      <view class="submitBar">
        <view class="submitMeta">
          <text class="submitMetaLabel">当前选择</text>
          <text class="submitMetaValue">{{ submitMetaText }}</text>
        </view>

        <view class="actionRow">
          <view
            class="secondaryBtn"
            :class="{ secondaryBtnDisabled: submitting }"
            @click="handleBack"
          >
            <text class="secondaryBtnText">返回</text>
          </view>

          <view
            class="primaryBtn"
            :class="{ primaryBtnDisabled: submitting || !selectedPlanCode }"
            @click="handleOpenSubscription"
          >
            <text class="primaryBtnText">{{ submitting ? "处理中..." : "立即开通" }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { failToast } from "@/utils/toast/toast"

type SubscriptionOpenStatus = "not_opened" | "trial_ended" | "expired"

interface SubscriptionOpenPageState {
  status: SubscriptionOpenStatus
  readonlyEnabled: boolean
}

interface SubscriptionPlan {
  code: string
  title: string
  price: string
  desc: string
  features: string[]
}

const pageState = ref<SubscriptionOpenPageState>({
  status: "trial_ended",
  readonlyEnabled: true,
})

const monthlyPlan = ref<SubscriptionPlan>({
  code: "MANUAL_LEDGER_MONTHLY",
  title: "月费版",
  price: "39",
  desc: "适用于持续记录外部期权订单并进行持仓跟踪管理。",
  features: [
    "支持新增与编辑手工记录",
    "支持查看当前盈亏估算",
    "支持刷新估值与到期提醒",
    "支持录入最终结算并保存台账",
  ],
})

const selectedPlanCode = ref<string>(monthlyPlan.value.code)
const submitting = ref(false)

const benefitList = [
  {
    title: "手动记账",
    desc: "录入外部平台期权订单，形成独立持仓记录与后续管理基础。",
  },
  {
    title: "当前盈亏估算",
    desc: "在持仓期间持续查看浮动盈亏、预计收益与盈亏率变化。",
  },
  {
    title: "到期提醒",
    desc: "支持多时点提醒，帮助用户在临近到期时及时处理持仓。",
  },
  {
    title: "结算台账保存",
    desc: "到期后录入最终结算结果，形成已实现盈亏与可追溯结算记录。",
  },
]

const statusBadgeText = computed(() => {
  switch (pageState.value.status) {
    case "trial_ended":
      return "试用已结束"
    case "expired":
      return "订阅已到期"
    case "not_opened":
    default:
      return "尚未开通"
  }
})

const statusBadgeClass = computed(() => {
  switch (pageState.value.status) {
    case "trial_ended":
      return "statusBadgeWarn"
    case "expired":
      return "statusBadgeExpired"
    case "not_opened":
    default:
      return "statusBadgeDefault"
  }
})

const statusCardClass = computed(() => {
  switch (pageState.value.status) {
    case "trial_ended":
      return "statusCardWarn"
    case "expired":
      return "statusCardExpired"
    case "not_opened":
    default:
      return ""
  }
})

const statusMainText = computed(() => {
  switch (pageState.value.status) {
    case "trial_ended":
      return "试用已结束，需开通后继续使用完整功能"
    case "expired":
      return "订阅已到期，需重新开通后恢复完整能力"
    case "not_opened":
    default:
      return "当前尚未开通手动记账功能"
  }
})

const statusDescText = computed(() => {
  switch (pageState.value.status) {
    case "trial_ended":
      return "若需继续新增记录、查看最新估算、修改提醒与维护持仓，请完成开通。"
    case "expired":
      return "若需继续维护历史持仓、刷新估值与新增记录，请重新开通月费服务。"
    case "not_opened":
    default:
      return "你可以先开通月费版，持续使用记录、估值、提醒与结算相关功能。"
  }
})

const submitMetaText = computed(() => {
  if (!selectedPlanCode.value) {
    return "请选择套餐"
  }

  if (selectedPlanCode.value === monthlyPlan.value.code) {
    return `已选择：${monthlyPlan.value.title}（￥${monthlyPlan.value.price}/月）`
  }

  return "请选择套餐"
})

const selectPlan = (planCode: string) => {
  selectedPlanCode.value = planCode
}

const handleOpenSubscription = async () => {
  if (submitting.value) return

  if (!selectedPlanCode.value) {
    failToast("请选择套餐")
    return
  }

  try {
    submitting.value = true
    uni.showLoading({ title: "处理中" })

    uni.hideLoading()

    uni.showToast({
      title: "开通成功",
      icon: "success",
    })

    setTimeout(() => {
      uni.$u.route({
        url: "/tools/record-list/index",
        type: "redirect",
      })
    }, 300)
  } catch (error) {
    uni.hideLoading()
    failToast("开通失败，请稍后重试")
  } finally {
    submitting.value = false
  }
}

const handleBack = () => {
  if (submitting.value) return

  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }

  uni.$u.route({
    url: "/tools/home/index",
    type: "switchTab",
  })
}
</script>

<style lang="scss" src="./style.scss"></style>