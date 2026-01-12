<template>
  <view class="container">
    <view class="part_box market_indices">
      <view class="title">市场指数</view>
      <view class="row">
        <view class="indice" v-for="(marketIndice, key) in marketIndices" :key="key">
          <view class="indice_title">{{marketIndice.name}}</view>
          <view class="indice_value red">{{marketIndice.value}}</view>
          <view class="row">
            <view class="stext red">{{marketIndice.change}}</view>
            <view class="stext red">{{marketIndice.changeValue}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="part_box hot_sectors">
      <view class="title">热门板块</view>
      <view>
        <view :class="`bk_menu ${activeBkType==menu.code?'bk_menu_active':''}`" v-for="(menu, key) in bkTypes" :key="key" @click="activeBkType = menu.code">{{menu.name}}</view>
      </view>
      <view>
        <view class="hot_sectors_th">
          <view>排名</view>
          <view>板块名称</view>
          <view>涨幅</view>
          <view>热度</view>
        </view>
        <view class="hot_sectors_td" v-for="n in 5" :key="n">
          <view :class="`regular ordinal ${calcOrdinalBg(n)}`">{{n}}</view>
          <view>
            <view>{{n}}名字</view>
            <view class="stext">code{{n}}</view>
          </view>
          <view class="red green">{{ Math.random().toFixed(2) }}%</view>
          <view>热度xxx</view>
        </view>
      </view>
    </view>

    <view class="part_box hot_target">
      <view class="title">热门标的</view>
      <view>
        <view :class="`bk_menu ${activeBdReferral==menu.code?'bk_menu_active':''}`" v-for="(menu, key) in bdReferral" :key="key" @click="activeBdReferral = menu.code">{{menu.name}}</view>
      </view>
      <view>
        <view class="hot_target_th">
          <view>名称/代码</view>
          <view>最新价格</view>
          <view>涨幅</view>
          <view>5日涨幅</view>
        </view>
        <view class="hot_target_td" v-for="n in 5" :key="n">
          <view>
            <view>{{n}}名字</view>
            <view class="stext">code{{n}}</view>
          </view>
          <view :class="`regular ordinal ${calcOrdinalBg(n)}`">{{n}}</view>
          <view class="red green">{{ Math.random().toFixed(2) }}%</view>
          <view>热度xxx</view>
        </view>
      </view>
    </view>

    <view class="part_box">
      <view class="title">公司介绍</view>
      <view>
        本平台由深圳市芯晟微提供技术支持，专注于场外个股期权撮合与服务，联合合作机构为用户提供标准化产品结构、透明费用和全流程信息披露。您的个人信息与订单数据采用加密传输和权限控制，仅用于履行交易与合规风控义务。
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const marketIndices = [
  { name: '上证指数', code: '000001.SH', value: '3,456.78', change: '+12.34', changeValue: '+0.36%' },
  { name: '深证成指', code: '399001.SZ', value: '14,567.89', change: '-45.67', changeValue: '-0.31%' },
  { name: '创业板指', code: '399006.SZ', value: '3,123.45', change: '+23.45', changeValue: '+0.76%' },
];
const bkTypes = [
  { name: '概念板块', code: 1},
  { name: '行业板块', code: 2}
];
const activeBkType = ref<number>(1);

const bdReferral = ref<string>([
  {name: '推荐', code: 1},
  {name: '保本', code: 2},
]);
const activeBdReferral = ref<number>(1);

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
</script>

<style lang="scss" scoped>
.container{
  .part_box{
    width: 95%;
    margin: auto;
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
      margin-bottom: 10px;
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
      .indice{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(180deg, #fdebec, #f5f5f5);
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
      padding: 8px 0;

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
      padding: 8px 0;

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
