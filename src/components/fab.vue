<script setup lang="ts">
    import {ref} from "vue";

    const title = ref('uni-fab')
    const directionStr = ref('垂直')
    const horizontal = ref('right')
    const vertical = ref('bottom')
    const direction = ref('vertical')
    const pattern = ref({
      color: '#7A7E83',
      backgroundColor: '#fff',
      selectedColor: '#007AFF',
      buttonColor: '#007AFF',
      iconColor: '#fff'
    })
    const is_color_type =ref( false)
    const content =ref( [
        {
          iconPath: '/static/menu/icon_calc.png',
          selectedIconPath: '/static/menu/icon_calc_active.png',
          text: '计算器',
          active: false,
          pagePath: "/pages/calculator/calculator",
          type: '',
        },
        {
          iconPath: '/static/menu/icon_place_an_order.png',
          selectedIconPath: '/static/menu/icon_place_an_order_active.png',
          text: '下单',
          active: false,
          pagePath: "/pages/inquiry/inquiry",
          type: '',
        },
        // {
        //   iconPath: '/static/menu/icon_inquiry_history.png',
        //   selectedIconPath: '/static/menu/icon_inquiry_history_active.png',
        //   text: '首页',
        //   active: false,
        //   pagePath: "/pages/home/home",
        // },
    ])

    const trigger = (e: { item: { pagePath: string } }) => {
      // content.value[e.index].active = !e.item.active
      // if(e.item.type === 'tabbar'){
      //   uni.switchTab({url: e.item.pagePath})
      // }else {
        uni.navigateTo({url: e.item.pagePath})
      // }
    }
</script>

<template>
  <uni-fab
      :pattern="pattern"
      :content="content"
      :horizontal="horizontal"
      :vertical="vertical"
      :direction="direction"
      @trigger="trigger"
  ></uni-fab>
</template>

<style scoped lang="scss">
::v-deep(.uni-fab__content--other-platform){
  box-shadow: unset ;
}
::v-deep{
  .uni-fab__plus{
    background: var(--color-primary-bg) !important;
  }
}

/* #ifdef APP-PLUS || APP-HARMONY */
/* App 端向上偏移，避免与自定义 tabbar 重合 */
::v-deep .uni-fab,
::v-deep .uni-fab__circle{
  bottom: 70px !important;
}
/* #endif */
</style>
