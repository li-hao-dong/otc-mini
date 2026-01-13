import { createSSRApp } from "vue";
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import uList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import uListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
import uTable from '@dcloudio/uni-ui/lib/uni-table/uni-table.vue'
import uTr from '@dcloudio/uni-ui/lib/uni-tr/uni-tr.vue'
import uTh from '@dcloudio/uni-ui/lib/uni-th/uni-th.vue'
import uTd from '@dcloudio/uni-ui/lib/uni-td/uni-td.vue'
import uDataSelect from "@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
export function createApp() {
  const pinia = createPinia();
  const app = createSSRApp(App);
  app.use(pinia);
  app.component("uniIcons", uniIcons)
  app.component("uniLists", uList)
  app.component("uniListItem", uListItem)
  app.component("uniTable", uTable)
  app.component("uniTr", uTr)
  app.component("uniTh", uTh)
  app.component("uniTd", uTd)
  app.component("uDataSelect", uDataSelect)
  return {
    app
  };
}
