<template>
  <view class="container resultPage">
    <view class="card">
      <view class="row rowTop">
        <view class="asset">
          <text class="assetName">{{ assetName }}</text>
          <text class="assetCode">{{ assetCode }}</text>
        </view>
        <view class="para">
          <text class="labelText">股价: </text>
          <text class="valueText">{{ currentPrice }}</text>
        </view>
        <view class="para">
          <text class="labelText">涨幅: </text>
          <text class="valueText">{{ priceChange }}</text>
        </view>
      </view>

      <view class="row rowMid">
        <view class="para"><text class="labelBold">询价人:</text></view>
        <view class="para"><text class="labelBolder">询价规模: 待定</text></view>
      </view>
<!-- 
      <view class="table">
        <view class="tableHeader">
          <view class="th thW66L"><text class="thText">结构</text></view>
          <view class="th thW84" v-for="(term, index) in terms" :key="index"><text class="thText">{{ term }}</text></view>
          <view class="th thW66R"><text class="thText">报价方</text></view>
        </view>
        <view class="tableBody">
          <view class="tr" v-for="(item, index) in results" :key="index">
            <view class="td tdW66L"><text class="tdText">{{ item.structureName }}</text></view>
            <view class="td tdW84" v-for="(term, i) in terms" :key="i"><view class="tdText" >{{ item.terms[term].price }}%</view></view>
            <view class="td tdW66R" ><view class="tdText">{{ item.sourceCode }}</view></view>
          </view>
        </view>
      </view>

      <view style="width: 100%;">
        <view :style="`width:100%; display: inline-grid; grid-template-columns: repeat(${terms.length ? terms.length + 2 : 2 }, 1fr);`">
          <view class="th"><text class="thText">结构</text></view>
          <view class="th" v-for="(term, index) in terms" :key="index"><text class="thText">{{ term }}</text></view>
          <view class="th"><text class="thText">报价方</text></view>
        </view>
        <view class="tr" v-for="(item, index) in results" :key="index" :style="`width:100%; display: inline-grid; grid-template-columns: repeat(${terms.length ? terms.length + 2 : 2 }, 1fr);`">
          <view class="td"><text class="tdText">{{ item.structureName }}</text></view>
          <view class="td" v-for="(term, i) in terms" :key="i"><view class="tdText" >{{ item.terms[term].price }}%</view></view>
          <view class="td" ><view class="tdText">{{ item.sourceCode }}</view></view>
        </view>
      </view> -->

      <uni-table ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th align="center">结构</uni-th>
          <uni-th align="center" v-for="(term, index) in terms" :key="index">{{ term }}</uni-th>
          <uni-th align="center">报价方</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in results" :key="index">
          <uni-td>{{ item.structureName }}</uni-td>
          <uni-td v-for="(term, i) in terms" :key="i">{{ item.terms[term].price }}%</uni-td>
          <uni-td>{{ item.sourceCode }}</uni-td>
        </uni-tr>
      </uni-table>


      <view class="row actions">
        <view class="btn fixed" role="button" tabindex="0"><text class="btnText">客服</text></view>
        <view class="btn grow" role="button" tabindex="0"><text class="btnText" @click="getInquiryResults">重新询价</text></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {hideLoading, loadingToast} from "@/utils/toast/toast";
import {inquiryQuote} from "@/api";
import type {InquiryResp, QuoteResult} from "@/interfaces/inquiry/inquiryQuote";
const assetName = ref<string | undefined>();
const assetCode = ref<string | undefined>();
const currentPrice = ref<number | undefined>();
const priceChange = ref<string | undefined>();
const terms = ref<string[] | undefined>();
const results = ref<QuoteResult[] | undefined>([]);

onMounted(() => {
  getInquiryResults();
})

const getInquiryResults = () => {
  // Placeholder for fetching inquiry results

  const payload = uni.getStorageSync('InquiryQuoteReqPayload')
  if(Object.keys(payload).length === 0){
    console.log("没有询价请求参数")
    return;
  }

  loadingToast("询价中");
  inquiryQuote(payload).then((res: InquiryResp) =>{
    console.log("inquiryQuote res1111,", res)
    assetName.value = res.data.underlying;
    assetCode.value = res.data.underlyingCode;
    currentPrice.value = res.data.currentPrice;
    priceChange.value = res.data.priceChange;
    // interface QuoteItem {
    //   structure: string;
    //   structureName: string;
    //   term: string;
    //   termName: string;
    //   quotes: {
    //     price: string;
    //     sourceCode: string;
    //   }[];
    // }
    //

    const filterData: any = {};
    res.data.results.map((item:QuoteResult) => {
      if(!filterData[item.structure!]){
        filterData[item.structure!] = {
          structure: item.structure,
          structureName: item.structureName,
          terms: {
            [item.termName!]: item.quotes!.length > 0 && item.quotes![0],
          },
          sourceName: item.quotes!.length > 0 && item.quotes![0].sourceName,
          sourceCode: item.quotes!.length > 0 && item.quotes![0].sourceCode,
        };
      }else {
        filterData[item.structure!] = {
          ...filterData[item.structure!],
          terms: {
            ...filterData[item.structure!].terms,
            [item.termName!]: item.quotes!.length > 0 && item.quotes![0],
          },
        };
      }
    });

    terms.value = Object.keys(filterData[Object.keys(filterData)[0]].terms);
    results.value = Object.values(filterData)
    console.log("filterData,", filterData)
    console.log("terms,", terms.value)


  }).catch((err: Error) => {
    console.log("inquiryQuote error,", err)
  }).finally(() => {
    hideLoading()
  })
};

</script>

<style>
.resultPage { background-color: #f5f5f5; }

.card {
  width: 95%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.row { display: flex; align-items: center; }

.rowTop {
  justify-content: space-between;
  /* gap: 67.6px; */
  /* padding: 10px 0 11px; */
  border-bottom: 1px solid #eeeeee;
}

.rowMid {
  justify-content: space-between;
  padding: 9px 0 10px;
  border-bottom: 1px solid #eeeeee;
}

.para { display: flex; align-items: center; gap: 4px; }

.asset { display: flex; flex-direction: column; }
.assetName { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 15.6px; line-height: 1.21em; color: #000000; }
.assetCode { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 1.21em; color: #999999; }

.labelText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.21em;
  color: #000000;
}

.valueText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 15.6px;
  line-height: 1.21em;
  color: #e63946;
}

.labelBold {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.21em;
  color: #000000;
}

.labelBolder {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 15.5px;
  line-height: 1.21em;
  color: #000000;
}

.table { width: 100%; align-self: stretch; }
.tableHeader { display: flex; justify-content: center; width: 100%; }

.th {
  background-color: #f8f8f8;
  border: 1px solid #eeeeee;
  padding: 9.5px 9px 11.5px;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
}

.tableBody { width: 100%; }
.tr { width: 100%; display: flex; justify-content: space-between; }
.td { padding: 10px 9px; border-bottom: 1px solid #eeeeee; box-sizing: border-box; font-size: 14px; text-align: center; border: 1px solid red;}
.bold { font-weight: 700; }
.red { color: #e63946; }

.actions { justify-content: space-between; padding: 29px 0 10px; }

.btn {
  background-color: #e63946;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 20px 12px;
}
.fixed { width: 120px; }
.grow { flex: 1; margin-left: 20px; }
.btnText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13.3px;
  line-height: 1.21em;
  color: #ffffff;
}
</style>
