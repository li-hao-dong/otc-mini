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
        },
        // {
        //   iconPath: '/static/menu/icon_inquiry_history.png',
        //   selectedIconPath: '/static/menu/icon_inquiry_history_active.png',
        //   text: '首页',
        //   active: false,
        //   pagePath: "/pages/home/home",
        // },
    ])

    const trigger = (e) => {
      // content.value[e.index].active = !e.item.active
      uni.navigateTo({url: e.item.pagePath})
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
:deep(.uni-fab__content--other-platform){
  box-shadow: unset;
}
:deep{
  .uni-fab__plus{
    background: var(--color-primary-bg) !important;
  }

  //.uni-fab__content{
  //  width: 40px !important;
  //
  //}
  //.uni-fab__item,
  //.uni-fab__circle{
  //  width: 40px !important;
  //  height: 40px !important;
  //}
}
</style>
