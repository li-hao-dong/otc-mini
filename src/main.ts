import { createSSRApp } from "vue";
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import uList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import uListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
import { createPinia } from 'pinia'
import App from "./App.vue";
export function createApp() {
  const pinia = createPinia();
  const app = createSSRApp(App);
  app.use(pinia);
  app.component("uniIcons", uniIcons)
  app.component("uniLists", uList)
  app.component("uniListItem", uListItem)
  return {
    app
  };
}
