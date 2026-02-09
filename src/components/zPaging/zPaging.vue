<template>
  <z-paging
    ref="paging"
    :default-page-size="20"
    v-model="dataList"
    use-page-scroll
    @query="queryList"
  >
    <!-- 自定义下拉刷新view -->
    <!-- <template #refresher="{ refresherStatus }">
      <view>刷新中{{ refresherStatus }}</view>
    </template> -->

    <!-- 设置自己的empty组件，非必须。空数据时会自动展示空数据组件，不需要自己处理 -->
     <template #empty v-if="dataList.length === 0">
       <slot name="empty">
         <view>暂无数据</view>
       </slot>
     </template>

    <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
    <slot></slot>

    <!-- 自定义的没有更多数据view -->
    <template #loadingMoreNoMore>
      <view class="noe_data_box">
        <view class="before_solid"></view>
        <view class="no_data">没有更多数据了</view>
        <view class="after_solid"></view>
      </view>
    </template>
  </z-paging>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // 必须导入需要用到的页面生命周期（即使在当前页面上没有直接使用到）
  // import { onPageScroll, onReachBottom } from '@dcloudio/uni-app';
  import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging.js';

  const paging = ref<any>(null);

  const emits = defineEmits();
  const dataList = defineModel({
    type: Array,
    default: () => [],
  });

  useZPaging(paging);

  const queryList = (pageNo: number, pageSize: number) => {
    console.log(pageNo, pageSize);
    /**
     *业务逻辑
     *  */
    emits('callback', { paging: paging.value, pageNo, pageSize });
  };

  const reload = () => {
    paging.value.reload();
  };

  defineExpose({ reload });
</script>

<style lang="scss" scoped>
  @import './style';
</style>
