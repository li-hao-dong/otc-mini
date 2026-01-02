export interface orderPayloadReq {
    /**
     * 询价ID
     */
    inquiryId: string;
    /**
     * 限价单时的价格
     */
    limitPrice?: number;
    /**
     * 实际下单名义本金（元）
     */
    nominalAmount: number;
    /**
     * MARKET、LIMIT
     */
    priceType: PriceType;
    selectedQuote: SelectedQuote;
    [property: string]: any;
}

export enum PriceType {
    MARKET = "Market",
    LIMIT = "Limit"
}

export interface SelectedQuote {
    productCode?: string;
    [property: string]: any;
}

/**
 * ApiResponse
 */
/**
 * OrderResponse
 */
export interface orderPayloadResp {
    /**
     * 客服联系信息
     */
    contactInfo?: ContactInfo;
    /**
     * 预计结算日期
     */
    estimatedSettlement?: Date;
    /**
     * 名义本金
     */
    nominalAmount?: number;
    /**
     * 期权费用
     */
    optionFee?: number;
    /**
     * 订单ID
     */
    orderId?: string;
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 产品代码
     */
    productCode?: string;
    status?: Status;
    [property: string]: any;
}

/**
 * 客服联系信息
 */
export interface ContactInfo {
    customerServicePhone?: string;
    wechatGroup?: string;
    [property: string]: any;
}

export enum Status {
    Cancelled = "CANCELLED",
    Exercised = "EXERCISED",
    Matured = "MATURED",
    Paid = "PAID",
    PaymentConfirmed = "PAYMENT_CONFIRMED",
    PendingChannel = "PENDING_CHANNEL",
    PendingPayment = "PENDING_PAYMENT",
    Purchased = "PURCHASED",
    Quoted = "QUOTED",
    Settled = "SETTLED",
}
