<template>
  <view>
    <!--    <up-pdf-reader-->
    <!--        :src="pdfUrl" height="calc(100vh - 44px)">-->
    <!--    </up-pdf-reader>-->
    <VuePdfEmbed annotation-layer text-layer :source="pdfUrl" />
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

// optional styles
import "vue-pdf-embed/dist/styles/annotationLayer.css";
import "vue-pdf-embed/dist/styles/textLayer.css";
import { BASE_URL } from "@/api";
import { useStore } from "@/stores";
const pdfUrl = ref();

const initPdf = async (url: string) => {
  uni.showLoading({title: '加载文档中，请耐心等待'})
  const res = await uni.request({
    url: `${BASE_URL}${url}`,
    responseType: "arraybuffer",
    header: {
      Authorization: `Bearer ${useStore().user.token}`,
    },
  });

  if (res.statusCode === 200) {
    pdfUrl.value = new Uint8Array(res.data as ArrayBuffer);
  }

  uni.hideLoading()
};

onLoad((opt) => {
  if (opt.pdfUrl) initPdf(opt.pdfUrl);
});
</script>

<style lang="scss" scoped></style>
