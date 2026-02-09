/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'z-paging/components/z-paging/js/hooks/useZPaging.js' {
  /**
   * z-paging 官方 hooks 声明
   * @param pagingRef z-paging 组件的 ref 实例
   */
  const useZpaging: (pagingRef: any) => void;
  export default useZpaging;
}
