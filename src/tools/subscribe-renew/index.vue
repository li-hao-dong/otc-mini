<template>
  <view class="page subscriptionRenewPage">
    <view class="pageInner">
      <!-- 顶部说明 -->
      <view class="heroCard">
        <view class="heroTitle">续费手动记账功能</view>
        <view class="heroDesc">
          保持续费后，可继续新增记录、查看最新估算、管理提醒并维护结算台账。
        </view>
      </view>

      <!-- 状态卡 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">当前状态</text>
            <text class="sectionHint">按实际有效期动态展示</text>
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

            <view class="statusMetaList">
              <view class="statusMetaRow" v-if="pageState.expireDate">
                <text class="statusMetaLabel">当前有效期至</text>
                <text class="statusMetaValue" :class="statusMetaValueClass">
                  {{ pageState.expireDate }}
                </text>
              </view>

              <view
                class="statusMetaRow"
                v-if="pageState.status === 'active' && typeof pageState.remainingDays === 'number'"
              >
                <text class="statusMetaLabel">剩余天数</text>
                <text class="statusMetaValue">{{ pageState.remainingDays }} 天</text>
              </view>

              <view
                class="statusMetaRow"
                v-if="pageState.status === 'expired' && pageState.readonlyEnabled"
              >
                <text class="statusMetaLabel">当前能力</text>
                <text class="statusMetaValue">历史记录可只读查看</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 套餐卡 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">续费套餐</text>
            <text class="sectionHint">当前提供月费续费</text>
          </view>

          <view
            class="planCard"
            :class="{ planCardActive: selectedPlanCode === renewPlan.code }"
            @click="selectPlan(renewPlan.code)"
          >
            <view class="planTopRow">
              <view class="planLeft">
                <view class="planTitleRow">
                  <text class="planTitle">{{ renewPlan.title }}</text>
                  <view class="planTag">
                    <text class="planTagText">续费</text>
                  </view>
                </view>

                <view class="planPriceRow">
                  <text class="planCurrency">￥</text>
                  <text class="planPrice">{{ renewPlan.price }}</text>
                  <text class="planUnit">/ 月</text>
                </view>
              </view>

              <view class="planSelectBox">
                <view
                  class="planSelectInner"
                  v-if="selectedPlanCode === renewPlan.code"
                ></view>
              </view>
            </view>

            <view class="planDesc">
              {{ renewPlan.desc }}
            </view>

            <view class="planFeatureWrap">
              <view class="planFeature" v-for="item in renewPlan.features" :key="item">
                <text class="planFeatureText">{{ item }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 续费说明 -->
      <view class="panelCard">
        <view class="section">
          <view class="sectionHeader">
            <text class="sectionTitle">续费说明</text>
            <text class="sectionHint">帮助用户理解续费结果</text>
          </view>

          <view class="noticeCard">
            <view class="noticeTitle">续费成功后恢复完整功能</view>
            <view class="noticeDesc">
              续费后可继续新增和编辑手工记录、刷新估值、修改提醒，并持续维护未结算与已结算记录。
            </view>
          </view>

          <view class="noticeCard" v-if="pageState.status === 'expired'">
            <view class="noticeTitle">已到期期间不会自动补算历史操作</view>
            <view class="noticeDesc">
              续费后将从当前状态继续使用。若到期期间存在未处理持仓，请及时检查提醒设置与最终结算补录情况。
            </view>
          </view>

          <view class="noticeCard" v-else>
            <view class="noticeTitle">提前续费可保持使用连续性</view>
            <view class="noticeDesc">
              在有效期结束前完成续费，可避免进入只读模式，维持记录维护、估值刷新与提醒能力的连续使用。
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
            @click="handleRenew"
          >
            <text class="primaryBtnText">{{ submitting ? "处理中..." : "立即续费" }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { failToast } from "@/utils/toast/toast"

type RenewStatus = "active" | "expired"

interface SubscriptionRenewPageState {
  status: RenewStatus
  expireDate: string
  remainingDays?: number
  readonlyEnabled: boolean
}

interface RenewPlan {
  code: string
  title: string
  price: string
  desc: string
  features: string[]
}

const pageState = ref<SubscriptionRenewPageState>({
  status: "active",
  expireDate: "2026-05-01",
  remainingDays: 6,
  readonlyEnabled: true,
})

const renewPlan = ref<RenewPlan>({
  code: "MANUAL_LEDGER_MONTHLY_RENEW",
  title: "月费续费",
  price: "39",
  desc: "适用于当前订阅的续期延长，继续保持手动记账功能完整可用。",
  features: [
    "继续新增与编辑手工记录",
    "继续查看当前盈亏估算",
    "继续使用到期提醒与修改提醒",
    "继续录入最终结算并保存台账",
  ],
})

const selectedPlanCode = ref<string>(renewPlan.value.code)
const submitting = ref(false)

const statusBadgeText = computed(() => {
  return pageState.value.status === "active" ? "订阅有效中" : "已到期"
})

const statusBadgeClass = computed(() => {
  return pageState.value.status === "active"
    ? "statusBadgeActive"
    : "statusBadgeExpired"
})

const statusCardClass = computed(() => {
  return pageState.value.status === "active"
    ? "statusCardActive"
    : "statusCardExpired"
})

const statusMainText = computed(() => {
  return pageState.value.status === "active"
    ? "当前订阅仍有效，可提前续费保持连续使用"
    : "当前订阅已到期，续费后可恢复完整功能"
})

const statusDescText = computed(() => {
  return pageState.value.status === "active"
    ? "建议在到期前完成续费，避免进入只读模式，确保记录维护与提醒能力不中断。"
    : "当前可继续查看历史记录；若需新增、编辑、刷新估值或修改提醒，请先完成续费。"
})

const statusMetaValueClass = computed(() => {
  return pageState.value.status === "active"
    ? "statusMetaValueNormal"
    : "statusMetaValueWarn"
})

const submitMetaText = computed(() => {
  if (!selectedPlanCode.value) return "请选择续费套餐"

  return `已选择：${renewPlan.value.title}（￥${renewPlan.value.price}/月）`
})

const selectPlan = (planCode: string) => {
  selectedPlanCode.value = planCode
}

const handleRenew = async () => {
  if (submitting.value) return

  if (!selectedPlanCode.value) {
    failToast("请选择续费套餐")
    return
  }

  try {
    submitting.value = true
    uni.showLoading({ title: "处理中" })

    uni.hideLoading()

    uni.showToast({
      title: "续费成功",
      icon: "success",
    })

    setTimeout(() => {
      uni.$u.route({
        url: "/tools/record-list/index",
        type: "redirectTo",
      })
    }, 300)
  } catch (error) {
    uni.hideLoading()
    failToast("续费失败，请稍后重试")
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