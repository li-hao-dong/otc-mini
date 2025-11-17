<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
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
  --size-text: 16px;
}

.container{
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-secondary-bg);
  font-size: var(--size-text);
}

</style>
