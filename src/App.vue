<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {useStore} from "@/stores";
import {truncToTwo} from "@/utils";
onLaunch(() => {
  console.log("App Launch");
  useStore().user.initUserInfo()
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
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
  min-height: 100vh;
  background-color: var(--color-secondary-bg);
  font-size: var(--size-text);
  padding-bottom: 20px;
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
