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
        <view class="para"><text class="labelBolder">询价规模: 100万</text></view>
      </view>

      <view class="table">
        <view class="tableHeader">
          <view class="th thW66L"><text class="thText">结构</text></view>
          <view class="th thW84"><text class="thText">1个月</text></view>
          <view class="th thW84"><text class="thText">2周</text></view>
          <view class="th thW84"><text class="thText">2个月</text></view>
          <view class="th thW66R"><text class="thText">报价方</text></view>
        </view>
        <view class="tableBody">
          <view class="tr" v-for="(r,i) in 10" :key="i">
            <view class="td tdW66L"><text class="tdText" :class="r.c1Class">{{ i }}</text></view>
            <view class="td tdW84"><text class="tdText" :class="r.c2Class">{{ i }}</text></view>
            <view class="td tdW84"><text class="tdText" :class="r.c3Class">{{ i }}</text></view>
            <view class="td tdW84"><text class="tdText" :class="r.c4Class">{{ i }}</text></view>
            <view class="td tdW66R"><text class="tdText" :class="r.c5Class">{{ i }}</text></view>
          </view>
        </view>
      </view>

      <view class="row actions">
        <view class="btn fixed" role="button" tabindex="0"><text class="btnText">客服</text></view>
        <view class="btn grow" role="button" tabindex="0"><text class="btnText">重新询价</text></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const assetName = ref("招商银行");
const assetCode = ref("600036.SH");
const currentPrice = ref("42.96");
const priceChange = ref("0.00%");

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
}
.thText { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: lighter; font-size: 14px; line-height: 1.21em; color: #000000; text-align: center; }
.thW66L { width: 66.53px; }
.thW84 { width: 83.97px; }
.thW66R { width: 66.56px; }

.tableBody { width: 100%; }
.tr { display: flex; justify-content: center; }
.td { padding: 10px 9px; border-bottom: 1px solid #eeeeee; box-sizing: border-box; }
.tdW66L { width: 66.53px; }
.tdW84 { width: 83.97px; }
.tdW66R { width: 66.56px; }
.tdText { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 400; font-size: 14px; line-height: 1.21em; color: #000000; }
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
