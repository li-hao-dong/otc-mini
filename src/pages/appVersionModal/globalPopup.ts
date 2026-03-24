import { createApp, h, reactive } from 'vue';
import globalPopup from './appVersionModal.vue';

/** 弹窗配置类型 */
interface PopupConfig {
    /** 弹窗类型（1、提交反馈弹窗 2、modal弹窗 3、自定义弹窗） */
    type?: 1 | 2 | 3;
    /** 是否显示取消按钮 */
    showCancel?: boolean;
    /** 确定按钮文字 */
    confirmText?: string;
    /** 取消按钮文字 */
    cancelText?: string;
    /** 点击遮罩是否关闭弹窗 */
    closeOpacity?: boolean;
    /** 标题 */
    title?: string;
    /** 内容文本 */
    content?: string;
    /** 附加内容（更新说明） */
    subContent?: string;
    /** 反馈弹窗状态 (1、成功 2、失败 3、正常) */
    icon?: 1 | 2 | 3;
    /** 确定回调 */
    confirm?: () => void;
    /** 取消回调 */
    cancel?: () => void;
}

const POPUP_BOX_ID = 'popup-box';
const HIDE_DELAY = 500;

/** 弹窗状态管理 */
const popupState = reactive({
    show: false,
    config: {
        type: 1 as 1 | 2 | 3,
        showCancel: false,
        confirmText: '确定',
        cancelText: '取消',
        closeOpacity: false,
        title: '',
        content: '',
        subContent: '',
        icon: 1 as 1 | 2 | 3
    },
    cancel: null as (() => void) | null,
    confirm: null as (() => void) | null
});

class GlobalPopup {
    private popupApp: ReturnType<typeof createApp> | null = null;
    private popupEl: HTMLElement | null = null;
    private isMounted: boolean = false;

    /** 显示弹窗 */
    show(params: PopupConfig): void {
        // #ifdef APP-PLUS || APP-HARMONY
        uni.navigateTo({
            url: `/pages/appVersionModal/appVersionModal?type=${params.type || 1}&title=${encodeURIComponent(params.title || '')}&content=${encodeURIComponent(params.content || '')}&subContent=${encodeURIComponent(params.subContent || '')}&showCancel=${params.showCancel ? 1 : 0}&confirmText=${encodeURIComponent(params.confirmText || '确定')}&cancelText=${encodeURIComponent(params.cancelText || '取消')}&closeOpacity=${params.closeOpacity ? 1 : 0}&icon=${params.icon || 1}`,
            events: {
                confirm: () => {
                    params.confirm?.();
                },
                cancel: () => {
                    params.cancel?.();
                }
            }
        });
        // #endif

        // #ifdef H5
        this.showH5(params);
        // #endif
    }

    // #ifdef H5
    /** H5 环境显示弹窗 */
    private showH5(params: PopupConfig): void {
        // 更新状态
        popupState.show = true;
        popupState.config = {
            type: params.type || 1,
            showCancel: params.showCancel || false,
            confirmText: params.confirmText || '确定',
            cancelText: params.cancelText || '取消',
            closeOpacity: params.closeOpacity || false,
            title: params.title || '',
            content: params.content || '',
            subContent: params.subContent || '',
            icon: params.icon || 1
        };
        popupState.cancel = params.cancel || null;
        popupState.confirm = params.confirm || null;

        // 如果已经挂载，直接返回
        if (this.isMounted) {
            return;
        }

        // 创建挂载点
        this.popupEl = document.createElement('div');
        this.popupEl.id = POPUP_BOX_ID;
        document.body.appendChild(this.popupEl);

        // 创建弹窗应用实例
        this.popupApp = createApp({
            render() {
                return h(globalPopup, {
                    show: popupState.show,
                    config: popupState.config,
                    onCancel: () => {
                        // 先关闭弹窗
                        popupState.show = false;
                        // 再执行用户回调
                        popupState.cancel?.();
                    },
                    onConfirm: () => {
                        // 先关闭弹窗
                        popupState.show = false;
                        // 再执行用户回调
                        popupState.confirm?.();
                    }
                });
            }
        });

        this.popupApp.mount(this.popupEl);
        this.isMounted = true;
    }
    // #endif

    /** 隐藏弹窗 */
    hide(): void {
        // #ifdef H5
        this.hideH5();
        // #endif

        // #ifdef APP-PLUS || APP-HARMONY
        uni.navigateBack();
        // #endif
    }

    // #ifdef H5
    /** H5 环境隐藏弹窗 */
    private hideH5(): void {
        popupState.show = false;

        setTimeout(() => {
            if (this.popupApp && this.popupEl) {
                this.popupApp.unmount();
                if (this.popupEl.parentNode) {
                    document.body.removeChild(this.popupEl);
                }
                this.popupApp = null;
                this.popupEl = null;
                this.isMounted = false;
            }
            popupState.cancel = null;
            popupState.confirm = null;
        }, HIDE_DELAY);
    }
    // #endif
}

/** 全局弹窗实例 */
export const globalPopupInstance = new GlobalPopup();

export default GlobalPopup;