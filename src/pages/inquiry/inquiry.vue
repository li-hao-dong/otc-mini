<template>
  <view class="container inquiryPage">
    <view class="form">
      <view class="section">
        <view class="label">标的</view>
        <view class="inputWrap">
          <input class="input" v-model="underlying" placeholder="请输入名称/代码" />
        </view>
      </view>

      <view class="section">
        <view class="label">类型 (单选)</view>
        <view class="chips">
          <view
            v-for="t in optionTypes"
            :key="t.code"
            class="chip"
            :class="{ active: selectedType === t.code }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedType === t.code"
            @click="selectType(t.code)"
          >
            <text class="chipText">{{ t.name }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="label">结构 (最多三选)</view>
        <view class="chips">
          <view
            v-for="s in structures"
            :key="s.code"
            class="chip"
            :class="{ active: selectedStructures.includes(s.code) }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedStructures.includes(s.code)"
            @click="toggleStructure(s.code)"
          >
            <text class="chipText">{{ s.name }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="label">规模 (单选)</view>
        <view class="chips">
          <view
            v-for="n in nominalAmounts"
            :key="n"
            class="chip"
            :class="{ active: selectedNominal === n }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedNominal === n"
            @click="selectNominal(n)"
          >
            <text class="chipText">{{ n }} 万</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="label">期限 (最多三选)</view>
        <view class="chips">
          <view
            v-for="t in terms"
            :key="t.code"
            class="chip"
            :class="{ active: selectedTerms.includes(t.code) }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedTerms.includes(t.code)"
            @click="toggleTerm(t.code)"
          >
            <text class="chipText">{{ t.name }}</text>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="label">报价方</view>
        <view class="chips">
          <view
            v-for="s in sources"
            :key="s.code"
            class="chip"
            :class="{ primary: selectedSources.includes(s.code) }"
            role="button"
            tabindex="0"
            :aria-pressed="selectedSources.includes(s.code)"
            @click="toggleSource(s.code)"
          >
            <text class="chipText">{{ s.name || s.code }}</text>
          </view>
        </view>
      </view>

      <view class="submitBtn" role="button" tabindex="0" @click="submit">
        <text class="submitText">询价</text>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {failToast, hideLoading, loadingToast} from "@/utils/toast/toast";
import {inquiryOptions, inquiryQuote} from "@/api";
import {
  Code,
  type InquiryOptionsResp,
  type OptionType,
  type Source,
  type StructureDefinition,
  type Term
} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";

type OptionTypeCode = "SNOWBALL" | "VANILLA";

const underlying = ref("");
const optionTypes = ref<OptionType[]>([]);
const selectedType = ref<Code>(Code.Snowball);

const structures = ref<StructureDefinition[]>();
const selectedStructures = ref<string[]>(['ATM']);

const nominalAmounts = ref<number[]>();
const selectedNominal = ref<number>(100);

const terms = ref<Term[]>();
const selectedTerms = ref<string[]>(['1M']);

const sources = ref<Source[]>();
const selectedSources = ref<string[]>(["GF"]);

onMounted(() => {
  getOptions();
})

const selectType = (code: OptionTypeCode) => {
  selectedType.value = <Code>code;
};

const toggleStructure = (code: string) => {
  const i = selectedStructures.value.indexOf(code);
  if (i >= 0) {
    selectedStructures.value.splice(i, 1);
  } else if (selectedStructures.value.length <= 3) {
    selectedStructures.value.push(code);
  }
};

const selectNominal = (n: number) => {
  selectedNominal.value = n;
};

const toggleTerm = (code: string) => {
  const i = selectedTerms.value.indexOf(code);
  if (i >= 0) {
    selectedTerms.value.splice(i, 1);
  } else if (selectedTerms.value.length <= 3) {
    selectedTerms.value.push(code);
  }
};

const toggleSource = (code: string) => {
  const i = selectedSources.value.indexOf(code);
  if (i >= 0) {
    selectedSources.value.splice(i, 1);
  } else {
    selectedSources.value.push(code);
  }
};

const getOptions = () => {
  // Placeholder for fetching options from an API if needed
  inquiryOptions().then((res: InquiryOptionsResp) => {
    // Process response if needed
    console.log("res!!!!", res)
    optionTypes.value = <OptionType[]>res.optionTypes;
    structures.value = <StructureDefinition[]>res.structures;
    nominalAmounts.value = <number[]>res.nominalAmounts;
    terms.value = <Term[]>res.terms;
    sources.value = <Source[]>res.sources;
  }).catch(() => {
    failToast("获取询价选项失败");
  });
};

const submit = () => {
  if (!underlying.value || selectedStructures.value.length === 0 || selectedTerms.value.length === 0) {
    failToast("请完善必选项");
    return;
  }
  const payload: InquiryQuoteReq = {
    nominalAmount: selectedNominal.value,
    optionType: <Code>selectedType.value,
    sources: selectedSources.value.includes("ALL") ? [] : selectedSources.value,
    structures: selectedStructures.value,
    terms: selectedTerms.value,
    underlying: underlying.value,
  };
  uni.setStorageSync('InquiryQuoteReqPayload', payload)
  uni.navigateTo({ url: "/pages/inquiryResult/inquiryResult" });
};
</script>

<style>
.form {
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
  padding-bottom: 15px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.21em;
  color: #000000;
  padding-top: 1px;
  padding-bottom: 3px;
}

.inputWrap {
  display: flex;
  justify-content: center;
  padding: 8px 9px 7px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
}

.input {
  width: 100%;
  font-size: 16px;
}

.chips {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding-bottom: 10px;
}

.chip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px 11px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 20px;
}

.chip.active {
  padding: 11px 17px 12px;
  border-width: 2px;
  border-color: #e63946;
}

.chip.primary {
  padding: 9px 16px;
  background-color: #e63946;
  border-color: #e63946;
  border-width: 2px;
  color: #ffffff;
}

.chipText {
  font-size: 14px;
}

.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 15px;
  background-color: #e63946;
  border-radius: 5px;
}

.submitText {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.21em;
  color: #ffffff;
}
</style>
