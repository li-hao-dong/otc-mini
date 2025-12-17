<template>
    <view class="container orderPage">
        <view class="pageWrap">
            <view class="card cardHeader">
                <view class="row assetRowName">
                    <text class="assetName">{{orderPayload?.assetName}}</text>
                </view>
                <view class="row assetRowCode">
                    <text class="assetCode">{{ orderPayload?.assetCode }}</text>
                </view>
                <view class="row rowPrice">
                    <view class="para"><text class="labelGray">股价：</text></view>
                    <view class="para"><text class="valueRed">￥{{ orderPayload?.currentPrice }}</text></view>
                </view>
                <view class="row rowChange">
                    <view class="para"><text class="labelGray">涨幅：</text></view>
                    <view class="para"><text class="valueGreen">{{ orderPayload?.priceChange }}</text></view>
                </view>
                <view class="row rowInquirer">
                    <view class="para"><text class="labelGray">询价人：</text></view>
                    <view class="para"><text class="valueDark">-</text></view>
                </view>
                <view class="row rowScale">
                    <view class="para"><text class="labelGray">询价规模：</text></view>
                    <view class="para"><text class="valueDark">{{ orderPayload?.nominalAmount }}万</text></view>
                </view>
                <view class="row rowStruct">
                    <view class="para"><text class="labelGray">{{ orderPayload?.structureName }}</text></view>
                    <view class="para"><text class="valueDark">{{orderPayload?.term}} {{orderPayload?.quote.price}}% {{orderPayload?.quote.sourceCode}}</text></view>
                </view>
            </view>

            <view class="card">
                <view class="row">
                    <text class="sectionTitle">下单价格</text>
                </view>
                <view class="priceType">
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType(PriceType.MARKET)">
                        <view class="radioDot"
                            :class="selectedPriceType === PriceType.MARKET ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">市价</text>
                    </view>
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType(PriceType.LIMIT)">
                        <view class="radioDot"
                            :class="selectedPriceType === PriceType.LIMIT ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">限价</text>
                        <view class="limitInput">
                            <input type="number" class="inputBox" :disabled="selectedPriceType !== PriceType.LIMIT" placeholder="" v-model="limitPrice" />
                            <text class="unit">元</text>
                        </view>
                    </view>
                </view>

                <view class="row">
                    <text class="sectionTitle">下单规模</text>
                </view>
                <view class="quantityRow">
                    <view class="quantityStrong"><input type="number" class="inputBox" placeholder="" v-model="quantity" /></view>
                    <text class="quantitySuffix">× 100万</text>
                </view>
            </view>

            <!-- <view class="card">
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
            </view> -->

            <view class="cta" role="button" tabindex="0" @click="placeOrder">
                <text class="ctaText">模拟下单</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import {buyProduct, subscribeMessage} from '@/api';
import { PriceType, type orderPayloadReq } from '@/interfaces/inquiry/orderPayload';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import {useStore} from "@/stores";
const selectedPriceType = ref<PriceType>(PriceType.MARKET);
const orderPayload = ref<any>(null);
const quantity = ref<number>(1);
const limitPrice = ref<number>(0);

onLoad(() => { initData(); });

const selectPriceType = (t: PriceType.MARKET | PriceType.LIMIT) => { selectedPriceType.value = t; };


const initData = () => {
    orderPayload.value = uni.getStorageSync('OrderPayload');
    if(!orderPayload.value) uni.switchTab ({ url: '/pages/inquiry/inquiry' });
};

const placeOrder = () => {
    if (!useStore().user.token){
      uni.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => { uni.switchTab ({ url: '/pages/user/user' }); }, 1500);
      return;
    }

    if (!orderPayload.value) return;
    else if (!orderPayload.value?.inquiryId || !orderPayload.value?.quote?.productCode) return  uni.showToast({ title: '询价单号或产品代码不存在', icon: 'none' });
    else if (!quantity.value) return uni.showToast({ title: '下单数量不存在', icon: 'none' });
    else if (!limitPrice.value && selectedPriceType.value === PriceType.LIMIT) return uni.showToast({ title: '限价不存在', icon: 'none' });

    uni.showModal({ title: '提示', content: '确定要下单吗？' })
        .then(res => {
            if (res.confirm) {
                buyProduct(orderPayload.value?.inquiryId, orderPayload.value?.quote?.productCode, selectedPriceType.value, Number(quantity.value * 1000000), Number(limitPrice.value)).then(res => {
                    // console.log('buyProduct res', res);
                    if (res.status && res.status === 'success'){
                      uni.showToast({ title: '下单成功', icon: 'success' });
                      // const messageIds = ['vRe7yXMLbcmLgExmZkMuH5zaAk1Nh7X9gh9cmwndsr4']
                      // uni.requestSubscribeMessage(
                      //     {
                      //       tmplIds: messageIds, // 替换为你的模板ID
                      //       success(res) {
                      //         if (res[messageIds[0]] === 'accept'){
                      //           console.log('订阅消息授权成功：', res);
                      //           subscribeMessage(messageIds).then(res => {
                      //             console.log('订阅消息接口调用结果：', res);
                      //           });
                      //         }else {
                      //           console.log('订阅消息被拒绝：', res);
                      //         }
                      //       },
                      //       fail(err) {
                      //         console.error('订阅消息授权失败：', err);
                      //       },
                      //       complete() {
                      //         setTimeout(() => { uni.reLaunch({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
                      //       }
                      //     }
                      // )
                      setTimeout(() => { uni.reLaunch({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
                    }
                    else uni.showToast({ title: res.message || '下单失败', icon: 'none' });
                });
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        });
};

const applySubscribeMessage = () => {
    const messageIds = ['vRe7yXMLbcmLgExmZkMuH5zaAk1Nh7X9gh9cmwndsr4']
    uni.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log('订阅消息设置：', res);
        if (res.subscriptionsSetting && res.subscriptionsSetting.mainSwitch === false) {
          console.log('订阅消息总开关已关闭');
          return;
        }
        // 检查特定模板的订阅状态
        const tmplId = messageIds[0];
        const tmplStatus = res.subscriptionsSetting[tmplId];
        if (tmplStatus === 'accept') {
          console.log('用户已授权订阅该模板消息');
          setTimeout(() => { uni.reLaunch({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
          return;
        } else if (tmplStatus === 'reject') {
          console.log('用户已拒绝订阅该模板消息');
        } else {
          console.log('用户未选择订阅该模板消息');
        }

        uni.requestSubscribeMessage(
          {
            tmplIds: messageIds, // 替换为你的模板ID
            success(res) {
              if (res[messageIds[0]] === 'accept'){
                console.log('订阅消息授权成功：', res);
                subscribeMessage(messageIds).then(res => {
                  console.log('订阅消息接口调用结果：', res);
                });
              }else {
                console.log('订阅消息被拒绝：', res);
              }
            },
            fail(err) {
              console.error('订阅消息授权失败：', err);
            },
            complete() {
              setTimeout(() => { uni.reLaunch({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
            }
          }
        )
      },
      fail(err) {
        console.error('获取订阅消息设置失败：', err);
      }
    })


};

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
    width: 100%;
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
    font-size: 14px;
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
    position: relative;
}

.radioPrimary::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: #0075FF;
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
    padding-left: 10px;
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
