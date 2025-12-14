/**
 * OrderDetail
 */
export interface OrderDetail {
    /**
     * 银行账号（脱敏）
     */
    bankAccount?: string;
    /**
     * 银行名称
     */
    bankName?: string;
    /**
     * 渠道提交时间
     */
    channelSubmitTime?: Date;
    /**
     * 订单创建时间
     */
    createdTime?: Date;
    /**
     * 客户姓名
     */
    customerName?: string;
    /**
     * 客户电话
     */
    customerPhone?: string;
    /**
     * 剩余到期天数
     */
    daysToExpiry?: number;
    /**
     * 预计支付金额
     */
    estimatedPayout?: number;
    /**
     * 预计收益
     */
    estimatedProfit?: number;
    /**
     * 行权时间
     */
    exerciseTime?: Date | null;
    /**
     * 是否为价内期权
     */
    isInTheMoney?: boolean;
    /**
     * 到期日
     */
    maturityDate?: Date;
    /**
     * 名义本金
     */
    nominalAmount?: number;
    /**
     * 期权代码
     */
    optionCode?: string;
    /**
     * 期权费
     */
    optionFee?: number;
    /**
     * 期权费率
     */
    optionFeeRate?: number;
    /**
     * 期权类型
     */
    optionType?: OptionType;
    /**
     * 订单唯一标识
     */
    orderNo?: string;
    /**
     * 订单状态
     */
    orderStatus?: string;
    /**
     * 支付金额
     */
    paymentAmount?: number;
    /**
     * 支付时间
     */
    paymentTime?: Date;
    /**
     * 支付凭证URL
     */
    paymentVoucherUrl?: null | string;
    /**
     * 价格变化百分比
     */
    priceChange?: string;
    /**
     * 收益率
     */
    profitRate?: number;
    /**
     * 购买时间
     */
    purchaseTime?: Date;
    /**
     * 报价
     */
    quotedPrice?: number;
    /**
     * 相对行权价百分比
     */
    relativeStrike?: number;
    /**
     * 结算金额
     */
    settlementAmount?: number | null;
    /**
     * 结算价格
     */
    settlementPrice?: number | null;
    /**
     * 报价方名称
     */
    sourceName?: string;
    /**
     * 报价方简称
     */
    sourceShortName?: string;
    /**
     * 起始日期
     */
    startDate?: Date;
    /**
     * 订单状态时间线
     */
    statusTimeline?: StatusTimelineItem[];
    /**
     * 行权价格
     */
    strikePrice?: number;
    /**
     * 行权价类型
     */
    strikeType?: string;
    /**
     * 结构显示名称
     */
    structureDisplayName?: string;
    /**
     * 期限名称
     */
    termName?: string;
    /**
     * 交易通道费
     */
    transactionFee?: number;
    /**
     * 标的资产代码
     */
    underlyingAssetCode?: string;
    /**
     * 标的资产名称
     */
    underlyingAssetName?: string;
    /**
     * 标的资产当前价格
     */
    underlyingPrice?: number;
    /**
     * 上游费用
     */
    upstreamFee?: number;
    /**
     * 上游报价
     */
    upstreamQuote?: number;
    /**
     * 上游报价时间
     */
    upstreamQuoteTime?: Date;
    /**
     * 波动率百分比
     */
    volatilityPercent?: number;
    [property: string]: any;
}

/**
 * 期权类型
 */
export enum OptionType {
    Call = "Call",
    Put = "Put",
}

/**
 * StatusTimelineItem
 */
export interface StatusTimelineItem {
    /**
     * 状态描述
     */
    description?: string;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 状态代码
     */
    status?: string;
    /**
     * 状态变更时间
     */
    timestamp?: Date;
    [property: string]: any;
}

/**
 * 请求状态
 */
export enum Status {
    Error = "error",
    Success = "success",
}
