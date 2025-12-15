import { useStore } from "@/stores";
import { failToast, warnToast } from "@/utils/toast/toast";
import type {response} from "@/interfaces/response";
const timeout = 6000; // 6s内未返回数据视为超时


/**
 * @TODO
 * request 拦截器
 * @description 等待完善，需要先对接不同状态的接口
 * */
export const interceptor = function () {
    // 添加请求拦截器
    uni.addInterceptor("request", {
        // 发请求前执行
        invoke(args) {
            if(!`${useStore().user.token}`){
                warnToast("请先登录");
                setTimeout(() => {
                    uni.switchTab({url: '/pages/user/user'})
                }, 2000)
                return;
            }
            // if (useStore().user.token_valid_until < new Date().getTime()) {
            //     // 超出有效时间
            //     warnToast("请重新登录");
            //     return;
            // }
        },
    });
};

const beforeRequest = (url:string) => {
    if(url.includes("/users/login") || url.includes("/inquiry/history") || url.includes("/inquiry/options") || url.includes("/tools/equity-option/calculate") || url.includes("/users/orders?page=")) return true;

    if(!useStore().user.token){
        warnToast("请先登录");
        setTimeout(() => {
            uni.switchTab({url: '/pages/user/user'})
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
                    console.log("res@@@", res);
                    if (res.statusCode != 200) {
                        this.checkoutDataCode(res.data.code);
                        // failToast(res.data.msg);
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
    post(url: string, data: any, contentType: string) {
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
                    if (res.statusCode != 200) {
                        this.checkoutDataCode(res.data.code);
                        // failToast(res.data.msg);
                        return;
                    }
                    resolve(res);
                },
                fail: (err) => {
                    // this.checkoutStatusCode(err.statusCode);
                    reject(err);
                },
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
    checkoutDataCode(code:  number) {
        switch (code) {
            case 401: {
                // token 失效
                const routers = getCurrentPages();
                if (routers && routers.length > 0) {
                    const currentPage = routers[routers.length - 1];
                    console.log("currentPage", currentPage.route);
                    if (currentPage.route !== "pages/user/user") {
                        uni.switchTab({url: '/pages/user/user'});
                        warnToast("请重新登录");
                        return;
                    }
                }
                let pageRouter = window.location.pathname;
                if (pageRouter !== "/pages/user/user") {
                    uni.switchTab({url: '/pages/user/user'});
                    warnToast("请重新登录");
                }
                break;
            }
        }
    },
};

export default http;
