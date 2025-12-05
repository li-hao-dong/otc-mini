<template>
	<view class="container">
    <view class="row">
      <view class="cell title">类型：</view>
      <view class="cell content">香草看涨期权</view>
    </view>
    <view class="row">
      <view class="cell title">结构：</view>
      <view class="cell content">
        <uni-data-select
            v-model="calculator.structuresCode"
            :localdata="structures.range"
            @change="change"
        ></uni-data-select>
      </view>
    </view>
    <view class="row">
      <view class="cell title">规模：</view>
      <view class="cell content">
        <input type="number" v-model="calculator.magnitude" placeholder="请输入规模" /> <text> 万</text>
      </view>
    </view>
    <view class="row">
      <view class="cell title">期权费率：</view>
      <view class="cell content">
        <input type="number" v-model="calculator.optionRate" placeholder="请输入规模" /> <text> %</text>
      </view>
    </view>
    <view class="row">
      <view class="cell title">开仓价：</view>
      <view class="cell content">
        <input type="number" v-model="calculator.openingPrice" placeholder="请输入规模" /> <text> 元</text>
      </view>
    </view>
    <view class="row">
      <view class="cell title">结算价：</view>
      <view class="cell content">
        <input type="number" v-model="calculator.settlementPrice" placeholder="请输入规模" /> <text> 元</text>
      </view>
    </view>

    <view class="result_box">
      <view class="row">
        <view class="title">预计回款：</view>
        <view class="result">{{results.expectedPayment}} <text>万元</text></view>
      </view>
      <view class="row">
        <view class="title">实际盈亏：</view>
        <view class="result">{{results.actualProfitLoss}} <text>万元</text></view>
      </view>
      <view class="row">
        <view class="title">盈亏比例：</view>
        <view class="result">{{results.profitLossRatio}} <text>%</text></view>
      </view>
    </view>

    <view class="btn_box">
      <view class="reset_btn">
        <button @click="reset">重置</button>
      </view>
      <view class="calc_btn">
        <button :style="`background: var(--color-primary-bg); padding: 0; color: #fff;`" @click="calculatorHandler">计算</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {calculatorData, inquiryOptions} from "@/api";
import type {
  InquiryOptionsResp,
  OptionType,
  Source,
  StructureDefinition,
  Term
} from "@/interfaces/inquiry/inquiryOptions";
import {failToast} from "@/utils/toast/toast";
import {onLoad, onShow} from "@dcloudio/uni-app";
import type {calculatorReq} from "@/interfaces/calculator";

const structures = reactive({
  range: [],
})
const calculator = reactive({
  structure: 'Call', // 香草
  structuresCode: '', // 结构代码
  magnitude: null, // 规模
  optionRate: null, // 期权费率
  openingPrice: null, // 开仓价
  settlementPrice: null, // 结算价
})

const results = reactive({
  expectedPayment: 0.00, // 预计回款
  actualProfitLoss: 0.00, // 实际盈亏
  profitLossRatio: 0, // 盈亏比例
})

onShow(() => {
  getOptions();
})

const getOptions = () => {
  // Placeholder for fetching options from an API if needed
  inquiryOptions().then((res: InquiryOptionsResp) => {
    // Process response if needed
    console.log("res!!!!", res)
    structures.range = calcSameTypeStructure(<StructureDefinition[]>res.structures).map(v => {
      return {value: v.code, text: v.name}
    })
  }).catch(() => {
    failToast("获取询价选项失败");
  });
};

const calcSameTypeStructure = ( structures: StructureDefinition[]) => {
  return structures.filter((structure: StructureDefinition) => {
    if (structure?.applicableOptionTypes!.some(s => s.toUpperCase() === calculator.structure.toUpperCase())) {
      return structure
    }
  })
}

const change = (e) => {
  console.log("选择了结构:", e);
  calculator.structuresCode = e;
}

const calculatorHandler = () => {
  if(!calculator.structuresCode || !calculator.magnitude || !calculator.optionRate || !calculator.openingPrice || !calculator.settlementPrice){
    return failToast("请填写完整信息后再计算");
  }

  const payload = {
    nominalAmount: calculator.magnitude,
    openPrice: calculator.openingPrice,
    optionFeeRate: calculator.optionRate,
    optionType: calculator.structure,
    settlementPrice: calculator.settlementPrice,
    structureCode: calculator.structuresCode
  } as calculatorReq;
  calculatorData(payload).then((res) => {
    console.log("calculatorData res", res);
    results.expectedPayment = res.expectedPayout.toFixed(2) || res.expectedPayout;
    results.actualProfitLoss = res.netProfit.toFixed(2) || res.netProfit;
    results.profitLossRatio = res.profitRate;
  }).catch((err: Error) => {
    console.log("calculatorData err", err);
  });
}

const reset = () => {
  calculator.structuresCode = '';
  calculator.magnitude = null;
  calculator.optionRate = null;
  calculator.openingPrice = null;
  calculator.settlementPrice = null;

  results.expectedPayment = 0.00;
  results.actualProfitLoss = 0.00;
  results.profitLossRatio = 0;
}

</script>

<style>

.row{
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}

.title{
  width: 25%;
  text-align: right;
}
.content{
  width: 75%;
  text-align: left;
  padding-left: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.content input{
  width: 60%;
  outline: 1px solid #ccc;
  background: #ffffff;
  padding: 5px 14px;
}


.uni-stat-box{
  width: 80% !important;
  flex: unset !important;
}

.result{
  width: 60%;
  text-align: right;
  color: var(--color-primary-bg);
}

.result text{
  color: #000000;
}

.result_box{
  width: 100%;
  background: #e5e5e5;
  padding: 10px 0;
}

.btn_box{
  width: 100%;
  padding: 10px 2.5%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.reset_btn{
  width: 47.5%;
}

.calc_btn{
  width: 47.5%;
}

wx-button {
  font-size: 14px;
}

</style>
