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
          <text class="valueText" :class="calcClassName(priceChange)">{{ currentPrice }}</text>
        </view>
        <view class="para">
          <text class="labelText" >涨幅: </text>
          <text class="valueText" :class="calcClassName(priceChange)">{{ priceChange }}</text>
        </view>
      </view>

      <view class="row rowMid">
<!--        <view class="para"><text class="labelBold">询价人:{{useStore().user.name ? useStore().user.name : null }}</text></view>-->
        <view class="para"><text class="labelBolder">询价规模: {{ nominalAmount }} 万</text></view>
      </view>


      <view style=" margin-top: 10px; ">
        <view class="grid_col" ref="gridCol" :style="`width: 100%; color: #777777; display: grid; grid-template-columns: ${gridCol}; font-size: 12px; padding-bottom: 10px; border-bottom: 1px solid #eaeaea;`">
          <view >结构</view>
          <view v-for="(term, index) in terms" :key="index">{{ term }}</view>
          <view >报价方</view>
        </view>
        <view class="grid_col" :style="`width: 100%; display: inline-grid; grid-template-columns: ${gridCol}; align-items: center; padding: 10px 0; line-height: 20px; border-bottom: 1px solid #eaeaea;`"
              v-for="(item, index) in results" :key="index">
          <view>{{ item.structureName }}</view>
          <view v-for="(term, i) in terms" :key="i">
            <view style="line-height: 26px;" v-for="(quote, x) in Object.values(item.quotes)" :key="x" :class="quote[term] && quote[term][0].isRecommended?'rise_color':''">{{ `${quote[term] ? quote[term][0].price+'%' : '-'}` }}</view>
          </view>
          <view>
            <view style="line-height: 26px;" v-for="(quote, x) in Object.keys(item.quotes)" :key="x">{{ quote }}</view>
          </view>
        </view>
      </view>

<!--      <uni-table ref="table" border stripe emptyText="暂无更多数据">-->
<!--        <uni-tr>-->
<!--          <uni-th align="center">结构</uni-th>-->
<!--          <uni-th align="center" v-for="(term, index) in terms" :key="index">{{ term }}</uni-th>-->
<!--          <uni-th align="center">报价方</uni-th>-->
<!--        </uni-tr>-->
<!--        <uni-tr >-->
<!--          <uni-td>{{ item.structureName }}</uni-td>-->
<!--          <uni-td v-for="(term, i) in terms" :key="i">{{ item.terms[term].price }}%</uni-td>-->
<!--          <uni-td>{{ item.sourceCode }}</uni-td>-->
<!--        </uni-tr>-->
<!--      </uni-table>-->


      <view class="row actions">
<!--        <view class="btn fixed" role="button" tabindex="0"><text class="btnText">客服</text></view>-->
        <view class="btn grow" role="button" tabindex="0"><text class="btnText" @click="toInquiry">重新询价</text></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted, ref, watch} from "vue";
import {hideLoading, loadingToast} from "@/utils/toast/toast";
import {inquiryQuote} from "@/api";
import type {InquiryResp, Quote, QuoteResult} from "@/interfaces/inquiry/inquiryQuote";
import {onReady, onShow} from "@dcloudio/uni-app";
import {useStore} from "../../stores";
import {calcClassName} from "@/utils";
const assetName = ref<string | undefined>();
const assetCode = ref<string | undefined>();
const currentPrice = ref<number | undefined>();
const nominalAmount = ref<number | undefined>();
const priceChange = ref<string | undefined>();
const terms = ref<string[] | undefined>();
const results = ref<QuoteResult[] | undefined>([]);
const gridCol = ref<string>("");

onShow(() => {
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
    console.log("inquiryQuote res1111,", res.data)
    assetName.value = res.data.underlying;
    assetCode.value = res.data.underlyingCode;
    currentPrice.value = res.data.currentPrice;
    priceChange.value = res.data.priceChange;
    nominalAmount.value = res.data.nominalAmount;
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

    formatInquiryStruct(res.data.results)
  }).catch((err: Error) => {
    console.log("inquiryQuote error,", err)
  }).finally(() => {
    hideLoading()
  })

};

const formatInquiryStruct = (quoteResult:QuoteResult[]) =>　{
  console.log("quoteResult", quoteResult)
  const filterData: any = {};
  quoteResult.map((item:QuoteResult) => {
    // console.log("item", item)
    // 处理结构与周期
    if(!filterData[item.structure!]){
      filterData[item.structure!] = {
        structure: item.structure,
        structureName: item.structureName,
        terms: {
          [item.termName!]: item.term,
        },
        quotes: {}
      };
    } else {
      filterData[item.structure!] = {
        ...filterData[item.structure!],
        terms: {
          ...filterData[item.structure!].terms,
          [item.termName!]: item.term
        },
        quotes: {
          ...filterData[item.structure!].quotes
        }
      };
    }
    // 处理 供应商 的周期数据
    item.quotes?.map((quote:Quote) => {
      filterData[item.structure!] = {
        ...filterData[item.structure!],
        quotes: {
          ...filterData[item.structure!].quotes,
          [quote.sourceCode!]: {
            ...filterData[item.structure!].quotes[quote.sourceCode!],
            [item.termName!]: filterData[item.structure!].quotes[quote.sourceCode!] && filterData[item.structure!].quotes[quote.sourceCode!][item.termName!]?.length > 0 ? filterData[item.structure!].quotes[quote.sourceCode!][item.termName!].push(quote) :[quote]
            // [item.termName!]: quote
          }
        }
      };
      // console.log(item.structure, "|", quote.sourceCode, "|", item.termName, "|", filterData[item.structure!].quotes[quote.sourceCode!])

    })
  });

  terms.value = Object.keys(filterData[Object.keys(filterData)[0]].terms);
  results.value = Object.values(filterData)
  console.log("filterData,", filterData)
  console.log("terms,", terms.value)
  gridCol.value = `25% repeat(${terms.value?.length}, 1fr) 25%`;
}

const toInquiry = () => {
  uni.redirectTo({
    url: '/pages/inquiry/inquiry'
  });
}


</script>

<style>
.resultPage { background-color: #f5f5f5; }

.card {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 10px 2.5%;
  box-sizing: border-box;
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

.asset { display: flex; flex-direction: column; padding: 0 0 10px 0; }
.assetName { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 15.6px; line-height: 1.21em; color: #000000; }
.assetCode { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 16px; line-height: 1.21em; color: #999999; padding-top: 2px;}

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
.grow { flex: 1; }
.btnText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 13.3px;
  line-height: 1.21em;
  color: #ffffff;
}
</style>
