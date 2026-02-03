<template>
  <view class="container">

    <swiper class="swiper" :style="`height: ${swiperHeight}px`" circular :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item v-for="(img,key) in background" :key="key">
<!--        <view class="swiper-item" :style="{background: color, height: '100%'}">{{ color }}</view>-->
        <img :src="img" alt="img" srcset="" width="100%">
      </swiper-item>
    </swiper>

    <view class="part_box market_indices">
<!--      <view class="title">市场指数</view>-->
      <view class="row" style="padding-top: 15px">
        <view :class="`indice ${Number(marketIndice.change.split('%')[0])>0?'indice_red':'indice_green'}`" v-for="(marketIndice, key) in marketIndices" :key="key">
          <view class="indice_title">{{marketIndice.name}}</view>
          <view :class="`indice_value ${Number(marketIndice.change.split('%')[0])>0?'red':'green'}`">{{marketIndice.price}}</view>
          <view class="row">
            <view :class="`stext ${Number(marketIndice.change.split('%')[0])>0?'red':'green'}`">{{marketIndice.change}}</view>
<!--            <view class="stext red">{{marketIndice.change_amount}}</view>-->
          </view>
        </view>
      </view>
    </view>

    <view class="part_box hot_sectors">
      <view class="title">热门板块</view>
      <view style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <view>
          <view :class="`bk_menu ${activeBkType==menu.code?'bk_menu_active':''}`" v-for="(menu, key) in bkTypes" :key="key" @click="changeHotSelector(menu.code)">{{menu.name}}</view>
        </view>
        <view style="color: #807d7e;" @click="showMoreData">更多></view>
      </view>
      <view>
        <view class="hot_sectors_th">
          <view>排名</view>
          <view>板块名称</view>
          <view>涨幅</view>
          <view>换手率</view>
        </view>
        <view v-if="hotSectors && hotSectors.length > 0">
          <view class="hot_sectors_td" v-for="(item,n) in hotSectors" :key="n" @click="toPlateDetail(item)">
            <view :class="`regular ordinal ${calcOrdinalBg(item.排名)}`">{{item.排名}}</view>
            <view>
              <view>{{item.板块名称}}</view>
              <view class="stext">{{item.板块代码}}</view>
            </view>
            <view :class="`${item.涨跌幅.toFixed(2) > 0 ? 'red':'green'}`">{{item.涨跌幅 >0 ? '+':''}}{{ item.涨跌幅.toFixed(2) }}%</view>
            <view>{{item.换手率}}%</view>
          </view>
        </view>
        <view v-else class="noData">
          暂无数据
        </view>
      </view>
    </view>

    <view class="part_box hot_target">
      <view class="title">官推标的</view>
      <view>
        <view :class="`bk_menu ${activeBdReferral==menu.code?'bk_menu_active':''}`" v-for="(menu, key) in bdReferral" :key="key" @click="activeBdReferral = menu.code">{{menu.name}}</view>
      </view>
      <view>
        <view class="hot_target_th">
          <view>名称/代码</view>
          <view>最新价格</view>
          <view>涨幅</view>
          <view>换手率</view>
        </view>
        <view v-if="referralBd && referralBd.length > 0">
          <view class="hot_target_td" v-for="(item,n) in referralBd" :key="n" @click="uni.navigateTo({url: `/pages/inquiry/inquiry?name=${item.name}`})">
            <view>
              <view>{{ item.name}}</view>
              <view class="stext">{{ item.code }}</view>
            </view>
            <view :class="` ordinal ${calcOrdinalBg(item.latest_price)}`">￥{{Number(truncToTwo(item.latest_price))}}</view>
            <view :class="`${Number(truncToTwo(item.pct_change)) > 0 ? 'red':'green'}`">{{Number(truncToTwo(item.pct_change)) >0 ? '+':''}}{{ Number(truncToTwo(item.pct_change)) }}%</view>
            <view>{{ Number(truncToTwo(item.pct_change_5d)) }}%</view>
          </view>
        </view>
        <view v-else class="noData">
          暂无数据
        </view>
      </view>
    </view>

    <view class="part_box">
      <view class="title">公司介绍</view>
      <view style="color: #807d7e;">
        本平台由深圳市芯晟微提供技术支持，专注于场外个股期权撮合与服务，联合合作机构为用户提供标准化产品结构、透明费用和全流程信息披露。您的个人信息与订单数据采用加密传输和权限控制，仅用于履行交易与合规风控义务。
      </view>
    </view>

    <fab />

    <tabbar :currentTabbarKey="0"/>
  </view>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getConcept, getIndices, getIndustry, getRecommendations} from "@/api";
import {onHide, onShow} from "@dcloudio/uni-app";
import type {IndustryResp, industryStruct} from "@/interfaces/industry";
import type {ConceptResp, conceptStruct} from "@/interfaces/concept";
import type {RecommendationItemResp} from "@/interfaces/recommendation";
import type {MarketIndexResponse} from "@/interfaces/indices";
import Fab from "@/components/fab.vue";
import {truncToTwo} from "@/utils";
import Tabbar from "@/components/tabbar.vue";
const marketIndices = ref<MarketIndexResponse[]>([]);
const bkTypes = ref<{ name: string, code: number, type: string }[]>([
  { name: '概念板块', code: 1, type: "concept"},
  { name: '行业板块', code: 2, type: "industry"}
]);
const activeBkType = ref<number>(1);
const hotSectors = ref<industryStruct[] | conceptStruct[]>([])

// const bdReferral = ref<{ name: string, code: number }[]>([
//   {name: '推荐', code: 1},
//   {name: '保本', code: 2},
// ]);
const activeBdReferral = ref<number>(1);
const referralBd = ref<RecommendationItemResp[]>();

const background = ref(["/static/post.png"])
const indicatorDots = ref(true)
const autoplay = ref(true)
const interval = ref(2000)
const duration = ref(1500)
const timer = ref();
const swiperHeight = ref()

onShow(() => {
  initSwiperHeight()
  activeBkType.value = 1;
  getIndicess();
  getConcepts()
  getRecommendationss();
  // getConcepts();
  // timer.value = setInterval(() => {
  //   getIndicess();
  //   if(activeBkType.value == 1){
  //     getConcepts()
  //   }else {
  //     getIndustries()
  //   }
  //   getRecommendationss();
  // }, 60000 * 3)
})

onHide(() => {
  // clearInterval(timer.value)
  // timer.value = null;
})

const initSwiperHeight = () => {
  const width = document.body.clientWidth || document.documentElement.clientWidth
  const imgWidth = 390
  const imgHeight = 150
  swiperHeight.value = width * imgHeight / imgWidth
}
const toPlateDetail = (item: industryStruct|conceptStruct) => {
  const boardType = bkTypes.value.find( (val)=> val.code==activeBkType.value)
  // console.log("boardType", boardType)
  uni.navigateTo({url: `/pages/plateComposition/plateComposition?board_type=${boardType.type}&symbol=${item.板块代码}`})
}

const change = (e) => {
  current.value = e.detail.current;
}

function changeHotSelector(code: number){
  activeBkType.value = code;
  if(code == 1){
    getConcepts()
  }else {
    getIndustries()
  }
}

function calcOrdinalBg(n){
  if(n === 1){
    return 'bg_gold'
  }else if(n === 2){
    return 'bg_silver'
  }else if(n === 3){
    return 'bg_bronze'
  }else{
    return ''
  }
}

const getIndustries = () => {
  uni.showLoading({title: "加载中…"})
  getIndustry().then(res => {
    // console.log("res", res)
    hotSectors.value = res
    uni.hideLoading()
  }).catch(err => {
    console.log("getIndustries err.", err)
    uni.hideLoading()
  })
}

const getConcepts = () => {
  uni.showLoading({title: "加载中…"})
  getConcept().then(res => {
    hotSectors.value = res
    uni.hideLoading()
  }).catch(err => {
    console.log("getConcepts err.", err)
    uni.hideLoading()
  })
}

const getRecommendationss = () => {
  getRecommendations().then(res => {
    referralBd.value = res;
  }).catch(err => {
    console.log("getRecommendationss err.", err)
  })
}

const getIndicess = () => {
  getIndices().then(res => {
    marketIndices.value = res?.major_indices.slice(0, 3);
  }).catch(err => {
    console.log("getIndicess err.", err)
  })
}

const showMoreData = () => {
  if(activeBkType.value == 1){
    // 概念板块
    uni.navigateTo({url: `/pages/plateList/plateList?type=concepts`})
    // getConcepts()
  }else {
    // 行业板块
    uni.navigateTo({url: `/pages/plateList/plateList?type=industries`})
    // getIndustries()
  }
}

</script>

<style lang="scss" scoped>
.container{
  .swiper{

    .swiper-item{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
    }
  }

  .part_box{
    width: 90%;
    margin: auto;

    .noData{
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      padding-top: 10px;
      margin-bottom: 10px;
    }

    .bk_menu{
      display: inline-block;
      padding: 5px 10px;
      margin-right: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      font-size: 14px;
    }

    .bk_menu_active{
      background-color: var(--color-primary-bg);
      color: #fff;

    }

    .row{
      display: flex;
      align-items: center;
      justify-content: space-between;

      /* 大盘指数 */
      .indice_red{
        background: linear-gradient(180deg, #fdebec, #f5f5f5);
      }

      .indice_green{
        background: linear-gradient(180deg, #ecfdeb, #f5f5f5);
      }
      .indice{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        width: calc(100% / 3 - 10px);
        border-radius: 10px;

        .indice_title{
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .indice_value{
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 5px;
        }

        .stext{
          font-size: 12px;

          &:nth-child(2n-1) {
            margin-right: 5px;
          }
        }

        .red {
          color: var(--color-primary-bg);
        }

        .green{
          color: #1fab63;
        }
      }
    }

    /* 热门板块 */
    .hot_sectors_th{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 1fr 3fr 2fr 2fr;
      color: #807d7e;

      & view:nth-child(1),
      & view:nth-child(2){
       text-align: left;
      }

      & view:nth-child(3),
      & view:nth-child(4){
        text-align: right;
      }
    }
    .hot_sectors_td{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 1fr 3fr 2fr 2fr;
      align-items: center;
      box-sizing: border-box;
      padding: 4px 0;

      & view:nth-child(1),
      & view:nth-child(2){
        text-align: left;
      }

      & view:nth-child(3),
      & view:nth-child(4){
        text-align: right;
      }

      .regular {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        background: #FFFFFF;
      }

      .bg_gold{
        background: #fb2736;
        color: #FFFFFF;
      }
      .bg_silver{
        background: #fe6718;
        color: #FFFFFF;
      }
      .bg_bronze{
        background: #f7950d;
        color: #FFFFFF;
      }

      .stext{
        font-size: 12px;
      }

      .red{
        color: #fc363b;
      }
      .green{
        color: #1fab63;
      }
    }

    /* 热门标的 */
    .hot_target_th{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 3fr 2fr 2fr 2fr;
      color: #807d7e;

      & view:nth-child(1),
      & view:nth-child(2){
       text-align: left;
      }

      & view:nth-child(3),
      & view:nth-child(4){
        text-align: right;
      }
    }
    .hot_target_td{
      width: 100%;
      display: inline-grid;
      grid-template-columns: 3fr 2fr 2fr 2fr;
      align-items: center;
      padding: 4px 0;

      & view:nth-child(1),
      & view:nth-child(2){
        text-align: left;
      }

      & view:nth-child(3),
      & view:nth-child(4){
        text-align: right;
      }

      .regular {
        width: 50px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        background: #FFFFFF;
      }

      .bg_gold{
        background: #fb2736;
        color: #FFFFFF;
      }
      .bg_silver{
        background: #fe6718;
        color: #FFFFFF;
      }
      .bg_bronze{
        background: #f7950d;
        color: #FFFFFF;
      }

      .stext{
        font-size: 12px;
      }

      .red{
        color: #fc363b;
      }
      .green{
        color: #1fab63;
      }
    }
  }
}
</style>
