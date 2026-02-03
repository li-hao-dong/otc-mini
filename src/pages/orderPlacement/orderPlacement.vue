<template>
    <view class="container orderPage">
        <view class="pageWrap">

          <view class="sub_tabs">
            <view class="tab_btn "
                  v-for="(tab,k) in subTabs" :class="activeTab == k ? 'tab_btn_avtive': ''"
                  @click="activeTab = k"
            >{{ tab }}</view>
          </view>

            <view class="card cardHeader">
                <view class="row assetRowName">
                    <text class="assetName">{{orderPayload?.assetName}}</text>
                </view>
                <view class="row assetRowCode">
                  <text class="assetCode">{{ orderPayload?.assetCode }}</text> ·
                  <text class="assetCode">{{ orderPayload?.structureName }}{{calcOptionType(orderPayload?.optionType)}} {{orderPayload?.term}} {{orderPayload?.quote.price}}% {{orderPayload?.quote.sourceCode}}</text>
                </view>
                <view class="row rowChange">
                  <view class="para"><text class="labelGray">标的名称：</text></view>
                  <view class="para"><text class="">{{ orderPayload?.assetName }}</text></view>
                </view>
                <view class="row rowChange">
                  <view class="para"><text class="labelGray">标的代码：</text></view>
                  <view class="para"><text class="">{{ orderPayload?.assetCode }}</text></view>
                </view>
                <view class="row rowChange">
                  <view class="para"><text class="labelGray">产品结构</text></view>
                  <view class="para"><text class="">{{ orderPayload?.structure }}</text></view>
                </view>
                <view class="row rowChange">
                  <view class="para"><text class="labelGray">期限</text></view>
                  <view class="para"><text class="">{{ orderPayload?.term }}</text></view>
                </view>
                <view class="row rowChange">
                  <view class="para"><text class="labelGray">交易类型</text></view>
                  <view class="para"><text class="">{{ calcOptionType(orderPayload?.optionType) }}</text></view>
                </view>
                <view class="row rowPrice">
                    <view class="para"><text class="labelGray">股价：</text></view>
                    <view class="para"><text :class="orderPayload?.currentPrice > 0 ? valueRed : valueGreen">￥{{ orderPayload?.currentPrice }}</text></view>
                </view>
                <view class="row rowChange">
                    <view class="para"><text class="labelGray">涨幅：</text></view>
                    <view class="para"><text :class="orderPayload?.priceChange > 0 ? valueRed : valueGreen">{{ orderPayload?.priceChange }}</text></view>
                </view>
<!--                <view class="row rowInquirer">-->
<!--                    <view class="para"><text class="labelGray">询价人：</text></view>-->
<!--                    <view class="para"><text class="valueDark">-</text></view>-->
<!--                </view>-->
<!--                <view class="row rowScale">-->
<!--                    <view class="para"><text class="labelGray">名义本金：</text></view>-->
<!--                    <view class="para"><text class="valueDark">{{ orderPayload?.nominalAmount }}万</text></view>-->
<!--                </view>-->
<!--                <view class="row rowStruct">-->
<!--                    <view class="para"><text class="labelGray">{{ orderPayload?.structureName }}</text></view>-->
<!--                    <view class="para"><text class="valueDark">{{orderPayload?.term}} {{orderPayload?.quote.price}}% {{orderPayload?.quote.sourceCode}}</text></view>-->
<!--                </view>-->
            </view>

            <view class="card">
                <view class="row">
                    <text class="sectionTitle">下单价格</text>
                </view>
                <view class="priceType">
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType(PriceType.MARKET)">
                        <view class="radioDot" :class="selectedPriceType === PriceType.MARKET ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">市价</text>
                    </view>
                    <view class="optionRow" role="button" tabindex="0" @click="selectPriceType(PriceType.LIMIT)">
                        <view class="radioDot" :class="selectedPriceType === PriceType.LIMIT ? 'radioPrimary' : 'radioSecondary'"></view>
                        <text class="pillText">限价</text>
                    </view>
                    <view class="limitInput" v-if="selectedPriceType === PriceType.LIMIT">
                        <input type="number" class="inputBox" placeholder="请输入限价" v-model="limitPrice" />
                        <text class="unit">元</text>
                    </view>
                </view>

                <view class="row">
                    <text class="sectionTitle">下单规模</text>
                </view>
                <view class="quantityRow">
                    <view class="quantityStrong"><input type="number" class="inputBox" placeholder="请输入下单规模" v-model="quantity" /></view>
                    <text class="quantitySuffix">× 100万</text>
                </view>
                <view class="group_buy_hint1" v-show="activeTab === 1">
                  如通过拼单方式购买，拼单服务费将在订单盈利结算时，从您的
                  实际收益中按约定比例扣除，不增加亏损金额。
                </view>
            </view>

            <view class="card">
              <view class="row">
                <text class="sectionTitle">总费用概览</text>
              </view>
              <view class="row">
                <view class="row_cont"><text class="popup_card_row_title">名义本金：</text>¥ {{truncToTwo(orderPayload?.nominalAmount * 10000 * quantity)}}</view>
              </view>
              <view class="row">
                <view class="row_cont"><text class="popup_card_row_title">期权费率：</text>
                  {{ truncToTwo(orderPayload?.quote.price) }}% {{useStore().miniData.waitPriceHint}}</view>
              </view>
              <view class="row">
                <view class="row_cont"><text class="popup_card_row_title">期权费（预估）：</text>¥ {{truncToTwo(orderPayload?.nominalAmount * 10000 * quantity * orderPayload?.quote.price / 100)}}{{useStore().miniData.waitPriceHint}}</view>
              </view>
              <view class="row">
                <view class="row_cont"><text class="popup_card_row_title">通道费（预估）：</text>¥ {{ truncToTwo(useStore().miniData.channelFee) }}</view>
              </view>
              <view class="row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
              </view>
              <view class="row">
                <view class="row_cont"><text class="popup_card_row_title">预估合计：</text>¥ {{ truncToTwo(orderPayload?.nominalAmount * 10000 * quantity * orderPayload?.quote.price / 100 + useStore().miniData.channelFee) }}{{useStore().miniData.waitPriceHint}}</view>
              </view>
              <view>
                <view class="row_cont" style="color: #999999; font-size: 12px;">(最终金额以渠道确认后为准)</view>
                <view class="row_cont" style="color: #d6423a; font-size: 12px;">当前页面展示的费率与费用项均为预估/待报价，不代表最终报价。
                  您提交订单后，通道侧运营人员将根据实时市场情况进行报价并回传最终期权费率、期权费、通道费及合计金额，并通过系统或短信通知您。
                  如您不接受确认后的报价，可取消订单。</view>
              </view>
            </view>

            <view class="card" v-show="activeTab === 1">
              <view class="row">
                <text class="sectionTitle">拼单购买</text>
              </view>
              <view class="group_buy_hint2">
                <view style="border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 10px;">
                  <view>· 支持多人拼单购买同一产品</view>
                  <view>· 拼单人数达到目标且全部完成支付后，系统统一向通道侧下单</view>
                  <view>· 拼单未成团或超时，将按规则自动取消相关订单</view>
                </view>
                <view>
                  <view>· 本产品支持：官方推荐标的拼单</view>
                  <view>· 拼单服务费：订单盈利部分的 {{fee}}%，仅在订单最终盈利时收取</view>
                  <view>· 服务费将在「已结算」时从实际收益中自动扣除</view>
                </view>
              </view>
            </view>

            <view class="card" v-show="activeTab === 1">
              <view class="row">
                <text class="sectionTitle">其他正在拼单</text>
              </view>
              <view class="group_buy_hint2">
                <view v-show="groupOrders.length > 0">
                  <view v-for="(item, key) in groupOrders" :key="key" style="border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 10px;">
                    <view class="row" style="display: flex; justify-content: space-between; align-items: center;">
                      <view>
                        <view class="small_title">{{ item.underlyingAssetName }} · {{item.underlyingAssetCode}}{{item.termName}}{{item.optionType}}</view>
                        <view class="group_buy_data">{{ item.targetSize }}人拼单 · 已有 {{ item.currentSize }}/{{ item.targetSize }} 人</view>
                        <view class="group_buy_data">截止时间 {{formatLocalTime(new Date(item.expireTime))}}</view>
                      </view>
                      <view>
                        <view class="add_group_buy" @click="uni.navigateTo({url: '/pages/groupOrders/groupOrderDetail?groupOrderNo='+item.groupOrderNo})">加入拼单</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view v-show="groupOrders.length === 0">
                  暂无其他拼单，快来发起拼单吧！
                </view>
              </view>
              <view class="show_more" @click="uni.switchTab({ url: '/pages/groupOrders/groupOrders' })">
                查看全部拼单 >
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

            <view class="cta" role="button" tabindex="0" @click="placeOrder" v-show="activeTab === 0">
                <text class="ctaText">下单</text>
            </view>

          <view class="group_buy_btns" v-show="activeTab === 1">
            <view class="own_buy_btn" @click="activeTab = 0">单独购买</view>
            <view class="group_buy_btn" @click="openConvenedBland">发起拼单</view>
          </view>
        </view>
        <uni-popup ref="popup" type="bottom">
          <view class="bottom_popup">
            <view class="card_popup">
              <text class="popup_title">拼单基本信息</text>
              <view class="popup_card_row">
                <view class="popup_card_row_title">产品名称</view>
                <view class="popup_card_row_cont">{{orderPayload?.assetName}} {{ orderPayload?.assetCode }} · {{ orderPayload?.structureName }}{{orderPayload?.optionType}}</view>
              </view>
              <view class="popup_card_row">
                <view class="popup_card_row_title">名义本金</view>
                <view class="popup_card_row_cont">¥ {{truncToTwo(quantity * 1000000)}}</view>
              </view>
              <view class="popup_card_row">
                <view class="popup_card_row_title">拼单类型</view>
                <view class="popup_card_row_cont">官方推荐标的拼单</view>
              </view>
              <view class="popup_card_row">
                <view class="popup_card_row_title">拼单服务费</view>
                <view class="popup_card_row_cont">盈利部分的 {{ fee }}%（仅在盈利时收取）</view>
              </view>
            </view>

            <view class="card_popup">
              <text class="popup_title">选择拼单人数</text>
              <view class="popup_card_row group_num">
                <view :class='`choose_people ${choosePeople == num ? "choose_people_active" : ""} `' v-for="(num,key) in [2, 3, 4, 5, 6, 8, 10]" :key="key" @click="choosePeople=num">{{num}}人</view>
              </view>
<!--              <view class="popup_card_row">-->
<!--                <view class="popup_card_row_title"></view>-->
<!--                <view class="popup_card_row_cont">单人名义本金： ¥ {{Math.ceil(quantity * 1000000 / choosePeople * 100) / 100}} / 人</view>-->
<!--              </view>-->
              <view>
                <view class="pd_hint">• 请在拼单创建后 24 小时内完成邀请并支付</view>
                <view class="pd_hint">• 所有成员支付成功后，系统才会统一向通道侧申请购买</view>
                <view class="pd_hint">• 拼单未成团或超时，将按平台规则取消订单</view>
                <view class="pd_hint">• 如订单最终盈利，平台将按约定从盈利部分中收取 {{ fee }}% 拼单服务费； 如订单亏损，则不收取该项费用。</view>
                <view class="pd_hint">示例：若最终盈利 10,000 元，则拼单服务费为 1,500 元， 剩余收益 8,500 元。</view>
              </view>
            </view>

            <view class="card_popup">
              <view class="popup_card_row">
                <text class="popup_title">个人费用概览</text>
              </view>
              <view class="popup_card_row">
                <view class="row_cont"><text class="popup_card_row_title">名义本金：</text>¥ {{truncToTwo(Math.ceil(orderPayload?.nominalAmount * 10000 * quantity / choosePeople * 100) / 100)}}</view>
              </view>
              <view class="popup_card_row">
                <view class="row_cont"><text class="popup_card_row_title">期权费率：</text>
                  {{ truncToTwo(orderPayload?.quote.price) }}%</view>
              </view>
              <view class="popup_card_row">
                <view class="row_cont"><text class="popup_card_row_title">期权费（预估）：</text>¥ {{truncToTwo(Math.ceil(orderPayload?.nominalAmount * 10000 * quantity * orderPayload?.quote.price / 100 / choosePeople * 100) / 100)}}</view>
              </view>
              <view class="popup_card_row">
                <view class="row_cont"><text class="popup_card_row_title">通道费（预估）：</text>¥ {{ truncToTwo(Math.ceil(useStore().miniData.channelFee / choosePeople)) }}</view>
              </view>
              <view class="popup_card_row" style="border-bottom: 1px #999 dashed; padding-bottom: 8px; margin-bottom: 8px">
              </view>
              <view class="popup_card_row">
                <view class="row_cont"><text class="popup_card_row_title">预估合计：</text>¥ {{ truncToTwo(Math.ceil(orderPayload?.nominalAmount * 10000 * quantity * orderPayload?.quote.price / 100 / choosePeople * 100) / 100 + Math.ceil(useStore().miniData.channelFee / choosePeople)) }}</view>
              </view>
              <view class="popup_card_row">
                <view class="row_cont" style="color: #999999; font-size: 12px;">(最终金额以渠道确认后为准)</view>
              </view>
            </view>

            <view class="popup_card_btns">
              <view class="cancel_btn" @click="popup.close()">取消</view>
              <view class="confirm_btn" @click="createGroupOrders">确认发起拼单</view>
            </view>
          </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import {buyProduct, createGroupOrder, getGroupOrders, getStockFee, subscribeMessage} from '@/api';
import { PriceType, type orderPayloadReq } from '@/interfaces/inquiry/orderPayload';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import {useStore} from "@/stores";
import {formatLocalTime, truncToTwo} from "@/utils";
import type {CreateGroupOrderReq} from "@/interfaces/groupOrders/createGroupOrders";
import {
  type GetGroupOrdersReq,
  type GetGroupOrdersResp, type Group,
  OptionType,
  Status
} from "@/interfaces/groupOrders/getGroupOrders";
const activeTab = ref<Number>(0);
const subTabs = ref<Array<string>>(['单独购买', '拼单购买']);
const selectedPriceType = ref<PriceType>(PriceType.MARKET);
const orderPayload = ref<any>(null);
const quantity = ref<Number>(1);
const limitPrice = ref<Number>(0);
const popup = ref<any>(null);
const choosePeople = ref<Number>(1);
const groupOrders = ref<Array<Group>>([]);
const fee = ref<number>()

onLoad(() => { initData(); });

const selectPriceType = (t: PriceType.MARKET | PriceType.LIMIT) => { selectedPriceType.value = t; };


const initData = () => {
    orderPayload.value = uni.getStorageSync('OrderPayload');
    getGroupOrderData()
    getStockFees()
    if(!orderPayload.value) uni.navigateTo ({ url: '/pages/inquiry/inquiry' });
};

const getGroupOrderData = () => {
  const payload: GetGroupOrdersReq = {
    optionType: orderPayload?.value.optionType || 'Call',
    page: 1,
    pageSize: 2,
    // productCode: '',
    status: Status.Open,
    underlyingAssetCode: orderPayload?.value.assetCode.indexOf('.') ? orderPayload?.value.assetCode.split('.')[0] : orderPayload?.value.assetCode,
  }

  getGroupOrders(payload).then(res => {
    // console.log('getGroupOrders res', res);
    if(res.groups && res.groups.length > 0){
      // 有拼单数据
      groupOrders.value = res.groups;
    }
  }).catch(error => {
    console.log('getGroupOrders error', error);
  })
}

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

                      // #ifdef MP-WEIXIN
                      // applySubscribeMessage()
                      const messageIds = ['vRe7yXMLbcmLgExmZkMuH5zaAk1Nh7X9gh9cmwndsr4']
                      uni.requestSubscribeMessage(
                          {
                            tmplIds: messageIds, // 替换为你的模板ID
                            success(res) {
                              if (res[messageIds[0]] === 'accept'){
                                // console.log('订阅消息授权成功：', res);
                                subscribeMessage(messageIds[0]).then(res => {
                                  // console.log('订阅消息接口调用结果：', res);
                                });
                              }else {
                                // console.log('订阅消息被拒绝：', res);
                              }
                            },
                            fail(err) {
                              console.error('订阅消息授权失败：', err);
                            },
                            complete() {
                              setTimeout(() => { uni.navigateTo({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
                            }
                          }
                      )
                      // #endif

                      // #ifdef H5
                      setTimeout(() => { uni.reLaunch({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
                      // #endif

                    }
                    else uni.showToast({ title: res.message || '下单失败', icon: 'none' });
                });
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        });
};

const applySubscribeMessage = () => {
    const messageIds = 'vRe7yXMLbcmLgExmZkMuH5zaAk1Nh7X9gh9cmwndsr4'
    uni.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log('订阅消息设置：', res);
        if (res.subscriptionsSetting && res.subscriptionsSetting.mainSwitch === false) {
          console.log('订阅消息总开关已关闭');
          return;
        }
        // 检查特定模板的订阅状态
        const tmplId = messageIds;
        const tmplStatus = res.subscriptionsSetting[tmplId];
        if (tmplStatus === 'accept') {
          console.log('用户已授权订阅该模板消息');
          subscribeMessage(messageIds).then(res => {
            console.log('订阅消息接口调用结果：', res);
          });
          setTimeout(() => { uni.navigateTo({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
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
              if (res.subscriptionsSetting[tmplId] === 'accept'){
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
              setTimeout(() => { uni.navigateTo({ url: '/pages/warehouseReceipts/warehouseReceipts' }); }, 1500);
            }
          }
        )
      },
      fail(err) {
        console.error('获取订阅消息设置失败：', err);
      }
    })


};

const openConvenedBland = () => {
  popup.value.open()
};

const createGroupOrders = () => {
  if (!choosePeople.value){
    uni.showToast({ title: '请选择拼单人数', icon: 'none' });
    return
  }
  const payload: CreateGroupOrderReq = {
    inquiryId: orderPayload.value?.inquiryId,
    productCode: orderPayload.value?.quote?.productCode,
    priceType: selectedPriceType.value,
    nominalAmount: Number(quantity.value * 1000000),
    limitPrice: Number(limitPrice.value),
    targetSize: choosePeople.value
  };
  createGroupOrder(payload).then(res => {
    console.log('createGroupOrders res', res);
    if(res.status && res.status === 'success'){
      uni.showToast({ title: '拼单创建成功', icon: 'success' });
      popup.value.close();
      setTimeout(() => { uni.reLaunch({ url: '/pages/groupOrders/groupOrderDetail?groupOrderNo='+ res?.data?.groupOrderNo}); }, 1500);
    } else {
      uni.showToast({ title: res.message || '拼单创建失败', icon: 'none' });
    }
  }).catch(err => {
    console.log('createGroupOrders err', err);
  })
}

const calcOptionType = (type: OptionType | undefined) => {
  if(type?.toUpperCase() === OptionType.Call.toUpperCase()) return '香草';
  else if(type?.toUpperCase() === OptionType.Put.toUpperCase()) return '雪球';
  else return type;
}

const getStockFees = () => {
  getStockFee(orderPayload.value.assetCode).then(res => {
    // console.log("getStockFee res", res)
    fee.value= res;
  }).catch(err => {
    console.log("getStockFee err", err)
  })
}

</script>

<style scoped>
/* .orderPage { background-color: #ffffff; } */

.sub_tabs{
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 12px;
}

.tab_btn{
  width: 50%;
  text-align: center;
  padding: 10px 0;
}

.tab_btn_avtive{
  color: #FFFFFF;
  background: var(--color-primary-bg);
  border-radius: 12px;
}

.pageWrap {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;
}

.card {
    width: 95%;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
    padding: 30px 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    display: flex;
    align-items: center;
}

.rowPrice,
.rowChange,
.rowInquirer,
.rowScale,
.rowStruct {
    justify-content: space-between;
    padding-top: 6px;
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
    height: 25px;
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
    width: 90%;
    margin: 8px auto 20px auto;
    background: var(--color-primary-bg);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
}

.ctaText {
    font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.21em;
    color: #FFFFFF;
}

.group_buy_hint1{
  color: #c0c0c0;
  font-size: 12px;
}

.group_buy_hint2{
  color: #666666;
  font-size: 13px;
  line-height: 22px;
}

.small_title{
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 5px;
}
.group_buy_data{
  color: #c0c0c0;

}
.add_group_buy{
  width: fit-content;
  padding: 0 15px;
  line-height: 35px;
  color: var(--color-primary-bg);
  border: 1px solid var(--color-primary-bg);
  border-radius: 20px;
}

.group_buy_btns{
  width: 100%;
  margin: 0 auto ;
  display: flex;
  gap: 20px;
  background: #FFFFFF;
  padding: 10px 2.5%;
  box-sizing: border-box;
}

.own_buy_btn,
.group_buy_btn{
  width: 50%;
  text-align: center;
  border-radius: 20px;
}

.own_buy_btn{
  border: 1px solid #CCCCCC;
  box-sizing: content-box;
  padding: 10px 0;
}

.group_buy_btn{
  box-sizing: content-box;
  padding: 10px 0;
  background: var(--color-primary-bg);
  color: #FFFFFF;
}

.show_more{
  width: 100%;
  text-align: center;
  /*width: fit-content;*/
  margin: 0 auto;
  color: #999999;
  font-size: 14px;
}

.bottom_popup{
  width: 100%;
  min-height: 50vh;
  max-height: 90vh;
  background: #f5f5f5;
  border-radius: 15px 15px 0 0;
  padding: 10px 2.5% 0 2.5%;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}

.card_popup{
  width: 100%;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
}

.card_popup:last-child{
  margin-bottom: unset;
}

.popup_title{
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.popup_card_row{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.popup_card_row_title{
  font-size: 14px;
  color: #999;
}

.popup_card_row_cont{
  font-size: 14px;
  color: #333333;
}

.group_num{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.choose_people{
  width: calc((100% - 40px) / 7);
  padding: 5px 0;
  border: 1px solid #CCCCCC;
  border-radius: 20px;
  text-align: center;
}

.choose_people_active{
  border: 1px solid var(--color-primary-bg);
  color: var(--color-primary-bg);
}

.pd_hint{
  font-size: 12px;
  color: #999999;
  padding-top: 4px;
}

.popup_card_btns{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
}

.cancel_btn{
  width: 50%;
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  padding: 12px 0;
  border-radius: 20px;
}

.confirm_btn{
  width: 50%;
  text-align: center;
  background: #e53935;
  color: #fff;
  border: none;
  padding: 12px 0;
  border-radius: 20px;
}

</style>
