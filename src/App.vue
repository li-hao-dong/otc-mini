<script setup lang="ts">
import {onLaunch, onShow, onHide, onBackPress} from "@dcloudio/uni-app";
import {useStore} from "@/stores";
// #ifdef H5
import VConsole from 'vconsole';
// #endif
import {startGuide} from "@/utils/guide/guide";
// #ifdef H5
import {driverObj} from "@/utils/guide/guide";
// #endif
// #ifdef APP-PLUS
import {checkAppUpdate} from "@/utils/checkAppUpdate";
// #endif


// 通用返回处理函数
const handleBackPress = (): boolean => {
  const pages = getCurrentPages();
  // 如果页面栈只有1页，说明是 reLaunch 后的状态，返回首页
  if (pages.length <= 1) {
    uni.switchTab({
      url: '/pages/home/home'
    });
    return true; // 阻止默认返回行为
  }
  return false; // 允许默认返回行为
};

onLaunch(() => {
  console.log("App Launch");
  // #ifdef APP-PLUS
  // App 端隐藏原生 tabbar，使用自定义 tabbar 组件
  // 延迟调用确保 tabbar 已初始化
  setTimeout(() => {
    uni.hideTabBar({
      animation: false
    });
  }, 100);
  // #endif
});

onShow(() => {
  console.log("App Show");
  const userStore = useStore().user
  userStore.initUserInfo()
  // #ifdef APP-PLUS
  // 每次 App 显示时确保隐藏原生 tabbar
  uni.hideTabBar({
    animation: false
  });
  // 检测APP版本更新（需要登录状态）
  if (userStore.token && userStore.token_valid_until && new Date().getTime() < userStore.token_valid_until) {
    checkAppUpdate();
  }
  // #endif
});

onHide(() => {
  console.log("App Hide");
});

// #ifdef APP-PLUS
// APP 端拦截物理返回键
onBackPress((options) => {
  // options.from === 'backbutton' 检查是否是物理/左上角返回按钮触发
  if (options.from === 'backbutton') {
    return handleBackPress();
  }
  return false;
});
// #endif

</script>

<style>
page{
  --color-primary-bg: #d6423a;
  --color-secondary-bg: #f5f5f5;
  --color-primary-text: #ffffff;
  --size-text: 14px;
}

#app{
  position: relative;

}
/*.bottom-box {
  bottom: var(--window-bottom); !* 自动适配 Tabbar 的位置 *!
}*/

.container{
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-secondary-bg);
  font-size: var(--size-text);
  padding-bottom: 80px;
  box-sizing: border-box;
}

.rise_color,
.rise_color text{
  color: #f44336;
}

.fall_color,
.fall_color text{
  color: #4caf50;
}
.normal_color,
.normal_color text{
  color: #bfbfbf;
}

.uni-tabbar__label {
  font-size: 20upx !important; /* 使用upx单位适配不同屏幕 */
}

.uni-tabbar-bottom{
  display: none !important;
}

</style>
