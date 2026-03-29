import { useStore } from "@/stores";
import { failToast, warnToast } from "@/utils/toast/toast";
import type {response} from "@/interfaces/response";
const timeout = 6000; // 6s内未返回数据视为超时

const beforeRequest = (url:string) => {
    // 对 不需要 token 的接口 直接放行
    // 用户认证相关
    if(url.includes("/users/register") || url.includes("/users/login") || url.includes("/sms/register-code")) return true;

    // 公开数据接口（市场数据、板块数据等，无需登录即可访问）
    // if(url.includes("/market/indices") || url.includes("/board/industry") ||
    //    url.includes("/board/concept") || url.includes("/board/recommendations") ||
    //    url.includes("/board/constituents") || url.includes("/board/stock/fee")) return true;

    if(!useStore().user.token){
        warnToast("请先登录");
        setTimeout(() => {
            // #ifdef MP-WEIXIN
            uni.switchTab({url: '/pages/user/user'})
            // #endif

            // #ifdef H5 || APP-PLUS
            uni.reLaunch({url: '/pages/reLogin/reLogin'})
            // #endif
        }, 2000)
        return false;
    }
    return true;
}; // 执行拦截器

const http = {
    /**
     * @description http 请求 get 方法
     * */
    get(url: string) {
        return new Promise((resolve, reject) => {
            if(!beforeRequest(url)){
                reject(false)
                return
            }
            uni.request({
                method: "GET",
                timeout,
                url,
                header: {
                    Authorization: `${useStore().user.token_type} ${useStore().user.token}`,
                },
                success: (res:response) => {
                    // console.log("res@@@", res);
                    if (res.statusCode != 200) {
                        this.checkoutDataCode(res.data?.code??res?.statusCode, res?.msg ?? res?.data);
                        // failToast(res.data.msg);
                        setTimeout(() => {reject(res?.msg ?? res?.data);}, 2000)
                        return;
                    }
                    resolve(res.data);
                },
                fail: (err) => {
                    // this.checkoutStatusCode(err.statusCode);
                    reject(err);
                },
            });
        });
    },

    /**
     * @description http 请求 post 方法
     * @param {string} url
     * @param {object} data
     * @param {string} [contentType]
     * */
    post(url: string, data: any, contentType?: string) {
        return new Promise((resolve, reject) => {
            if(!beforeRequest(url)){
                reject(false)
                return
            }
            uni.request({
                method: "POST",
                timeout,
                url,
                header: {
                    'content-type': contentType ? contentType : "application/json",
                    'Authorization': `${useStore().user.token_type} ${useStore().user.token}`,
                },
                data,
                success: (res:response) => {
                    // console.log("res@@@", res);
                    if (res.statusCode != 200) {
                        console.log("res", res)
                        let hintContent = this.checkoutDataCode(res.data?.code??res?.statusCode, res?.msg ?? res?.data?.message ?? res?.data);
                        // failToast(res.data.msg);
                        setTimeout(() => {reject(hintContent ?? res?.msg ?? res?.data);}, 2000)
                        return;
                    }
                    resolve(res);
                },
                fail: (err) => {
                    // this.checkoutStatusCode(err.statusCode);
                    reject(err);
                }
            });
        });
    },
    /**
     * @description http 请求 put 方法
     * @param {string} url
     * @param {object} data
     * */
    put(url: string, data: any) {
        return new Promise((resolve, reject) => {
            if(!beforeRequest(url)){
                reject(false)
                return
            }
            uni.request({
                method: "PUT",
                timeout,
                url,
                header: {
                    'content-type': "application/json",
                    'Authorization': `${useStore().user.token_type} ${useStore().user.token}`,
                },
                data,
                success: (res:response) => {
                    if (res.statusCode != 200) {
                        let hintContent = this.checkoutDataCode(res.data?.code??res?.statusCode, res?.msg ?? res?.data?.message ?? res?.data);
                        setTimeout(() => {reject(hintContent ?? res?.msg ?? res?.data);}, 2000)
                        return;
                    }
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    },
    /**
     * @description http 请求 patch 方法
     * @param {string} url
     * @param {object} data
     * */
    // patch(url: string) {
    //     // 有网络
    //     return new Promise((resolve, reject) => {
    //         uni.request({
    //             method: "PATCH",
    //             timeout,
    //             url,
    //             header: {
    //                 Authorization: `${useStore().user.token_type} ${useStore().user.token}`,
    //             },
    //             success: (res:response) => {
    //                 console.log("res@@@", res);
    //                 if (res.statusCode != 200) {
    //                     // this.checkoutDataCode(res.data.code);
    //                     failToast(res.data.msg);
    //                     return;
    //                 }
    //                 resolve(res.data);
    //             },
    //             fail: (err) => {
    //                 // this.checkoutStatusCode(err.statusCode);
    //                 reject(err);
    //             },
    //         });
    //     });
    // },

    /**
     * @param {number} code
     * @description 校验状态码
     * */
    checkoutStatusCode(code: number) {
        switch (code) {
            case -1:
                // http 请求超时
                break;
            case 200:
                // http 正常响应
                break;
            case 400:
                // http 错误的请求（参数错误，语句错误等）
                break;
            case 401:
                // http 身份验证失败
                break;
            case 404:
                // http 请求失败
                break;
        }
    },
    /**
     * 校验data中自定义的code
     * */
    checkoutDataCode(code: number, msg?: string) {
        let hintContent;
        switch (code) {
            case 400:{
                warnToast(msg!);
                hintContent = new Promise(() => {})
                break;
            }
            case 401: {
                // token 失效
                const routers = getCurrentPages();
                if (routers && routers.length > 0) {
                    const currentPage = routers[routers.length - 1];
                    // console.log("currentPage", currentPage.route);
                    // #ifdef MP-WEIXIN
                    if (currentPage.route !== "pages/user/user") {
                        warnToast("请重新登录");
                        setTimeout(() => uni.switchTab({url: '/pages/user/user'}), 2000);
                        return;
                    }
                    // #endif

                    // #ifdef H5 || APP-PLUS
                    const currentRoute = currentPage.route as string;
                    if (currentRoute !== "pages/reLogin/reLogin" && currentRoute !== "/" && currentRoute !== "pages/user/user") {
                        warnToast("请重新登录");
                        setTimeout(() => uni.redirectTo({url: '/pages/reLogin/reLogin'}), 2000);
                        return;
                    }
                    // #endif
                }
                // 使用 getCurrentPages 获取当前页面路由（跨平台兼容）
                const currentPages = getCurrentPages();
                const currentPage = currentPages.length > 0 ? currentPages[currentPages.length - 1] : null;
                const pageRouter = currentPage ? `/${currentPage.route}` : '';

                // #ifdef MP-WEIXIN
                if (pageRouter !== "/pages/user/user") {
                    warnToast("请重新登录");
                    setTimeout(() => uni.switchTab({url: '/pages/user/user'}), 2000);
                }
                // #endif

                // #ifdef H5 || APP-PLUS
                if (pageRouter !== "/pages/reLogin/reLogin" && pageRouter !== "/") {
                    warnToast("请重新登录");
                    setTimeout(() => uni.redirectTo({url: '/pages/reLogin/reLogin'}), 2000);
                }
                // #endif
                break;
            }
            case 409:
                // warnToast("用户已存在");
                hintContent = msg ?? "用户已存在"
                break;
            // default:
            //     warnToast(msg || "请求出错，请稍后重试");
        }

        return hintContent;
    },
};

export default http;
