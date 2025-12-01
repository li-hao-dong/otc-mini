<template>
    <view class="container orderPage">
        <view class="pageWrap">
            <view class="card cardHeader">
                <view class="row assetRowName">
                    <text class="assetName">五粮液</text>
                </view>
                <view class="row assetRowCode">
                    <text class="assetCode">000858.SZ</text>
                </view>
                <view class="row rowPrice">
                    <view class="para"><text class="labelGray">股价：</text></view>
                    <view class="para"><text class="valueRed">117.89</text></view>
                </view>
                <view class="row rowChange">
                    <view class="para"><text class="labelGray">涨幅：</text></view>
                    <view class="para"><text class="valueGreen">-0.04%</text></view>
                </view>
                <view class="row rowInquirer">
                    <view class="para"><text class="labelGray">询价人：</text></view>
                    <view class="para"><text class="valueDark">-</text></view>
                </view>
                <view class="row rowScale">
                    <view class="para"><text class="labelGray">询价规模：</text></view>
                    <view class="para"><text class="valueDark">100万</text></view>
                </view>
                <view class="row rowStruct">
                    <view class="para"><text class="labelGray">平值100</text></view>
                    <view class="para"><text class="valueDark">2个月 8.00% ZQSY</text></view>
                </view>
            </view>

            <view class="card">
                <view class="row">
                    <text class="sectionTitle">下单价格</text>
                </view>
                <view class="priceType">
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType('market')">
                        <view class="radioDot"
                            :class="selectedPriceType === 'market' ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">市价</text>
                    </view>
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType('limit')">
                        <view class="radioDot"
                            :class="selectedPriceType === 'limit' ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">限价</text>
                        <view class="limitInput">
                            <input class="inputBox" placeholder="" />
                            <text class="unit">元</text>
                        </view>
                    </view>
                </view>

                <view class="row">
                    <text class="sectionTitle">下单规模</text>
                </view>
                <view class="quantityRow">
                    <text class="quantityStrong">1</text>
                    <text class="quantitySuffix">× 100万</text>
                </view>
            </view>

            <view class="card">
                <view class="row">
                    <text class="sectionTitle">上传附件</text>
                </view>

                <view class="uploadBox">
                    <view class="uploadInner" role="button" tabindex="0">
                        <text class="camera">📷</text>
                    </view>
                    <text class="uploadText">添加图片</text>
                </view>

                <view class="tip">
                    <text class="tipText">特别提示：上传的图片大小控制在 1M 以内，超出请压缩或者裁剪。</text>
                </view>
            </view>

            <view class="cta" role="button" tabindex="0">
                <text class="ctaText">模拟下单</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selectedPriceType = ref<'market' | 'limit'>('market');
const selectPriceType = (t: 'market' | 'limit') => { selectedPriceType.value = t; };
</script>

<style>
/* .orderPage { background-color: #ffffff; } */
.pageWrap {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    padding: 30px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.cardHeader {
    padding: 20px;
    gap: 4px;
}

.row {
    display: flex;
    width: 95%;
}

.assetRowName {
    padding: 2px 0 3px;
}

.assetRowCode {
    padding: 0 0 1px;
}

.rowPrice {
    justify-content: space-between;
    gap: 231.11px;
    padding-top: 12px;
}

.rowChange {
    justify-content: space-between;
    gap: 229.47px;
    padding-top: 12px;
}

.rowInquirer {
    justify-content: space-between;
    gap: 257px;
    padding-top: 12px;
}

.rowScale {
    justify-content: space-between;
    gap: 206.97px;
    padding-top: 12px;
}

.rowStruct {
    justify-content: space-between;
    gap: 128.58px;
    padding-top: 12px;
}

.para {
    display: flex;
    align-items: center;
    gap: 8px;
}

.assetName {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.21em;
    color: #333333;
}

.assetCode {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #999999;
}

.labelGray {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #999999;
}

.valueRed {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
    font-size: 14.6px;
    line-height: 1.21em;
    color: #FF0000;
}

.valueGreen {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
    font-size: 14.6px;
    line-height: 1.21em;
    color: #2ECC71;
}

.valueDark {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 500;
    font-size: 14.6px;
    line-height: 1.21em;
    color: #333333;
}

.sectionTitle {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.21em;
    color: #333333;
}

.priceType {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.optionRow {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 33px;
}

.radioDot {
    width: 15.6px;
    height: 15.6px;
    border-radius: 50%;
    background-color: #ffffff;
}

.radioPrimary {
    border: 1px solid #0075FF;
}

.radioSecondary {
    border: 1px solid #757575;
}

.pillText {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #333333;
}

.limitInput {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 20px;
}

.inputBox {
    width: 144px;
    border: 1px solid #DDDDDD;
    border-radius: 6px;
    padding: 8px 14.6px;
    font-size: 14px;
}

.unit {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #333333;
}

.quantityRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.quantityStrong {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.21em;
    color: #333333;
}

.quantitySuffix {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #333333;
}

.uploadBox {
    width: 88px;
    height: 88px;
    border: 1px dashed #C0C0C0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.uploadInner {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.camera {
    font-size: 20px;
    color: #AAAAAA;
}

.uploadText {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #AAAAAA;
}

.tip {
    padding-top: 6px;
}

.tipText {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.21em;
    color: #999999;
}

.cta {
    width: 95%;
    margin: 4px auto 15px auto;
    background-color: #E63946;
    border-radius: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px 0 16px;
}

.ctaText {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.21em;
    color: #FFFFFF;
}
</style>
