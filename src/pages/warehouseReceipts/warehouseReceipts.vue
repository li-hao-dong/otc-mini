<template>
  <view class="container wrPage">
    <view class="topBar">
      <text class="topText">模拟机构</text>
      <text class="topText">录入 +</text>
    </view>

    <view class="segTabs">
      <view class="segItem">
        <text class="segActive">持仓中(1)</text>
        <view class="segUnderline"></view>
      </view>
      <view class="segItem">
        <text class="segText">已结算(0)</text>
      </view>
    </view>

    <view class="segTabs">
      <view class="segItem">
        <text class="segActive">香草</text>
        <view class="segUnderline"></view>
      </view>
      <view class="segItem">
        <text class="segText">雪球</text>
      </view>
    </view>

    <view class="card sumCard">
      <view class="sumRow">
        <view class="sumCol">
          <view class="sumMain">
            <view class="sumLabel">名义本金</view>
            <view class="sumValueRed">100.00万</view>
          </view>
          <view class="sumMain">
            <view class="sumLabel">期权费</view>
            <view class="sumValueRed">93800.00元</view>
          </view>
        </view>
        <view class="sumCol">
           <view class="sumSub">
            <view class="subLabel">预计回款</view>
            <view class="subValueBlue">6704.98元</view>
          </view>
         
          <view class="sumSub">
            <view class="subLabel">预计盈亏</view>
            <view class="subValueGreen">-87095.02元</view>
          </view>
          <view class="sumSub">
            <view class="subLabel">盈亏比例</view>
            <view class="subValueGreen">-92.85%</view>
          </view>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="assetInfo">
        <view>
          <view class="assetName">中国铝业</view>
          <view class="assetCode">601600.SH</view>
        </view>
        <view class="row priceRow">
          <view class="para"><text class="label">股价：</text></view>
          <view class="para"><text class="valueRed">10.51</text></view>
        </view>
        <view class="row changeRow">
          <text class="label">涨幅：0.67%</text>
        </view>
      </view>

      <view class="rowBorder">
        <text class="dataText">开仓时间：20251127</text>
        <text class="dataText">到期时间：20260127</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期权代码：100c_2m</text>
        <text class="dataText">名义本金：100万</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期限：2M</text>
        <text class="dataText">剩余天数：59天</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">开仓价格：10.44元</text>
        <text class="dataText">行权价格：10.44元</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">预计回款：<text class="linkBlue">6704.98元</text></text>
        <text class="dataText">预计盈亏：<text class="valueGreen">-87095.02元</text></text>
      </view>
      <view class="rowBorder">
        <text class="dataText">期权费：93800.00元</text>
        <text class="dataText">盈亏比例：<text class="valueGreen">-92.85%</text></text>
      </view>
      <view class="rowBorder">
        <text class="dataText">交易商：ZJ</text>
        <text class="dataText">期权费率：9.38%</text>
      </view>
      <view class="rowBorder">
        <text class="dataText">手续费：0元</text>
      </view>

      <view class="actions">
        <text class="actionLink">设置目标价</text>
        <text class="actionLink">设置到期提醒</text>
        <view class="outlineBtn" role="button" tabindex="0"><text class="outlineText">行权</text></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style>
.wrPage {
  /* background-color: #F7F7F7; */
}

.topBar {
  background-color: var(--color-primary-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 2.5%;
  box-sizing: content-box;
}

.topText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  line-height: 1.21em;
  color: #FFFFFF;
}

.segTabs {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0 5px 0;
}

.segItem {
  width: 50%;
  text-align: center;
}

.segActive {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  position: relative;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  /* line-height: 1.21em; */
  padding: 10px 0 ;
  color:var(--color-primary-bg);
}

.segText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  /* line-height: 1.21em; */
  color: #999999;
}

/* .segUnderline { width: 50%; height: 2px;  background-color: #E8473A; margin-top: 6px; } */
.segActive::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: 0;
  margin: auto;
  width: 50%;
  height: 2px;
  background-color: var(--color-primary-bg);
}

.sumCard {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.sumRow {
  width: 100%;
}

.sumCol {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  /* gap: 8px; */
  flex: 1;
}

.sumMain {
  width: 50%;
  text-align: center;
}

.sumLabel {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  padding: 8px 0;
  color: #333333;
}

.sumValueRed {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
  text-align: center;
}

/* .sumSub {
  display: flex;
  align-items: center;
  gap: 8px;
} */

.subLabel {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 15px;
  padding: 8px 0;
  color: #333333;
}

.subValueBlue {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #1E90FF;
  text-align: center;
}

.subValueGreen {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #2ECC71;
  text-align: center;
}

.card {
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 16px auto;
  padding: 5%;
  box-sizing: border-box;
}

.assetInfo{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.row {
  display: flex;
}

.para {
  display: flex;
  align-items: center;
  gap: 6px;
}

.assetName {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.21em;
  color: #000000;
}

.assetCode {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  /* line-height: 1.21em; */
  color: #999999;
  padding-top: 5px;
}

.label {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

.valueRed {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
}

.changeRow {
  padding: 6px 0 8px;
}

.rowBorder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  /* border-top: 1px solid #EEEEEE; */
}

.dataText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #000000;
}

.valueGreen {
  color: #2ECC71;
}

.linkBlue {
  color: #1E90FF;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 8px;
}

.actionLink {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #5E8ED6;
}

.outlineBtn {
  border: 1px solid #E8473A;
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outlineText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.21em;
  color: #E8473A;
}
</style>
