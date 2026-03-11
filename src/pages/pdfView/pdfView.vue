<template>
  <view>
    <!-- #ifdef H5 -->
    <VuePdfEmbed annotation-layer text-layer :source="pdfUrl" />
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view v-if="loading" style="text-align: center; padding: 20px;">加载中...</view>
    <view v-else style="text-align: center; padding: 20px;">
      <text>PDF 文档已下载，请点击下方按钮打开</text>
      <button @click="openPdf" style="margin-top: 20px;">打开文档</button>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

// #ifdef H5
import VuePdfEmbed from "vue-pdf-embed";
// optional styles
import "vue-pdf-embed/dist/styles/annotationLayer.css";
import "vue-pdf-embed/dist/styles/textLayer.css";
// #endif

import { BASE_URL } from "@/api";
import { useStore } from "@/stores";
const pdfUrl = ref();
const loading = ref(false);
const localPath = ref("");

const initPdf = async (url: string) => {
  loading.value = true;
  uni.showLoading({ title: '加载文档中，请耐心等待' });

  // #ifdef H5
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
  uni.hideLoading();
  loading.value = false;
  // #endif

  // #ifndef H5
  // App 端使用 downloadFile 下载 PDF
  uni.downloadFile({
    url: `${BASE_URL}${url}`,
    header: {
      Authorization: `Bearer ${useStore().user.token}`,
    },
    success: (res) => {
      console.log('下载成功:', res);
      if (res.statusCode === 200) {
        localPath.value = res.tempFilePath;
      } else {
        uni.showToast({ title: `下载失败: ${res.statusCode}`, icon: 'none' });
      }
    },
    fail: (err) => {
      console.error('下载失败:', err);
      uni.showToast({ title: '下载失败', icon: 'none' });
    },
    complete: () => {
      loading.value = false;
      uni.hideLoading();
    }
  });
  // #endif

};

// #ifndef H5
const openPdf = () => {
  if (localPath.value) {
    uni.openDocument({
      filePath: localPath.value,
      fileType: 'pdf',
      success: () => {
        console.log('打开文档成功');
      },
      fail: (err) => {
        console.error('打开文档失败:', err);
        uni.showToast({ title: '打开文档失败', icon: 'none' });
      }
    });
  }
};
// #endif

onLoad((opt) => {
  if (opt?.pdfUrl) initPdf(opt.pdfUrl);
});
</script>

<style lang="scss" scoped></style>
