/**
 * 发起拼单请求参数
 */
export interface CreateGroupOrderReq {
    /**
     * 当priceType为"Limit"时提供，限价价格
     */
    limitPrice?: number;
    /**
     * 总名义本金
     */
    nominalAmount: number;
    /**
     * 价格类型: "Market"、"Limit"
     */
    priceType: string;
    /**
     * 产品代码
     */
    productCode: string;
    /**
     * 参与人数
     */
    targetSize: number;
    [property: string]: any;
}
/**
 * 发起拼单响应参数
 */
export interface CreateGroupOrderResp {
    /**
     * 过程时间
     */
    expireTime: string;
    /**
     * 拼单单号
     */
    groupOrderNo: string;
    /**
     * 拼单状态
     */
    groupStatus: string;
    /**
     * 对应主订单单号
     */
    orderNo: string;
    /**
     * 剩余时间 单位：秒
     */
    remainingTime: number;
    /**
     * 分享链接URL
     */
    shareLink: string;
    /**
     * 分享链接二维码
     */
    shareQRCode: string;
    [property: string]: any;
}
