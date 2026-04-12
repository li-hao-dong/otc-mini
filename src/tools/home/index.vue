<template>
  <view class="page toolsHomePage">
    <view class="pageInner">
      <!-- 顶部说明卡片 -->
      <view class="headerCard">
        <view class="headerTitle">工具</view>
        <view class="headerDesc">
          面向个股期权场外交易场景，提供记录、跟踪、提醒与辅助管理工具。
        </view>
      </view>

      <!-- 工具列表 -->
      <view class="toolList">
        <!-- 手动记账卡片 -->
        <view class="toolCard">
          <!-- 卡片头部 -->
          <view class="toolCardHeader">
            <view class="toolIconWrap">
              <text class="toolIcon">记</text>
            </view>
            <view class="toolHeaderContent">
              <view class="toolTitleRow">
                <text class="toolTitle">手动记账</text>
                <view class="statusTag statusTagTrial">
                  <text class="statusTagText">试用中</text>
                </view>
              </view>
              <view class="toolDesc">
                记录外部个股期权订单，持续查看盈亏与到期提醒。
              </view>
            </view>
          </view>

          <!-- 标签组 -->
          <view class="tagList">
            <view class="tagItem">试用</view>
            <view class="tagItem">月费</view>
            <view class="tagItem">持仓跟踪</view>
            <view class="tagItem">到期提醒</view>
          </view>

          <!-- 状态信息 -->
          <view class="statusInfo">
            <view class="statusRow">
              <text class="statusLabel">当前状态</text>
              <text class="statusValue statusValueWarn">试用中，剩余 3 天</text>
            </view>
            <view class="statusRow">
              <text class="statusLabel">试用剩余</text>
              <text class="statusValue statusValueWarn">3 天</text>
            </view>
          </view>

          <!-- 底部按钮组 -->
          <view class="actionRow">
            <view class="btnSecondary">
              <text class="btnText">了解功能</text>
            </view>
            <view class="btnPrimary" @click="handleNavigateToIllustrate">
              <text class="btnText btnTextPrimary">立即使用</text>
            </view>
          </view>
        </view>

        <!-- 期权计算器卡片 -->
        <view class="toolCard">
          <view class="toolCardHeader">
            <view class="toolIconWrap toolIconCalc">
              <text class="toolIcon">算</text>
            </view>
            <view class="toolHeaderContent">
              <view class="toolTitleRow">
                <text class="toolTitle">期权计算器</text>
              </view>
              <view class="toolDesc">
                收益测算、度辅助分析。
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleNavigateToIllustrate = () => {
  uni.$u.route("/tools/illustrate/index")
}
</script>

<style lang="scss" src="./style.scss"></style>