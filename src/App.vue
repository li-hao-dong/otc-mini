<script setup lang="ts">
import {onLaunch, onShow, onHide, onBackPress} from "@dcloudio/uni-app";
import {useStore} from "@/stores";
import {truncToTwo} from "@/utils";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  useStore().user.initUserInfo()
});
onHide(() => {
  console.log("App Hide");
});

onBackPress((options) => {
  // options.from === 'backbutton' 检查是否是物理/左上角返回按钮触发
  if (options.from === 'backbutton') {
    // 检查当前页面栈或业务逻辑，决定是否返回主页
    if (this.$Route.path === '/pages/index/index') { // 假设这是首页附近
      uni.showModal({
        title: '提示',
        content: '已经是首页附近，是否退出应用或返回主页?',
        success: function (res) {
          if (res.confirm) {
            // 退出应用或跳转到主页
            uni.reLaunch({ url: '/pages/index/index' }); // 返回主页并清理历史栈
          } else if (res.cancel) {
            // console.log('用户点击取消');
          }
        }
      });
      return true; // 阻止默认返回行为（防止直接退出应用）
    }
    // 如果有上一页，则让其正常返回
    // uni.navigateBack(); // 默认返回上一页
  }
  // return false; // 允许默认返回行为
})
</script>
<style>
page{
  --color-primary-bg: #d6423a;
  --color-secondary-bg: #f5f5f5;
  --color-primary-text: #ffffff;
  --size-text: 14px;
}

.container{
  width: 100%;
  min-height: 100dvh;
  background-color: var(--color-secondary-bg);
  font-size: var(--size-text);
  padding-bottom: 80px;
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

</style>
