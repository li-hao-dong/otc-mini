/**
 * OrderDetail
 */
export interface OrderDetail {
    /**
     * 创建时间
     */
    createdTime?: Date;
    /**
     * 剩余天数
     */
    daysToExpiry?: number | null;
    /**
     * 预计盈亏
     */
    estimatedProfit?: number | null;
    /**
     * 到期日期
     */
    maturityDate?: Date | null;
    /**
     * 名义本金
     */
    nominalAmount?: number;
    /**
     * 期权费
     */
    optionFee?: number | null;
    /**
     * 期权类型
     */
    optionType: string;
    /**
     * 订单编号
     */
    orderNo: string;
    /**
     * 订单状态
     */
    orderStatus: string;
    /**
     * 盈亏比例
     */
    profitRate?: number | null;
    /**
     * 行权价类型
     */
    strikeType: string;
    /**
     * 期限名称
     */
    termName: string;
    /**
     * 标的代码
     */
    underlyingAssetCode: string;
    /**
     * 标的名称
     */
    underlyingAssetName: string;
    /**
     * 汇款账号
     */
    bankAccount?: null | string;
    /**
     * 汇款银行
     */
    bankName?: null | string;
    /**
     * 报送通道商时间
     */
    channelSubmitTime?: Date | null;
    /**
     * 客户姓名
     */
    customerName?: null | string;
    /**
     * 客户手机号
     */
    customerPhone?: null | string;
    /**
     * 预计回款
     */
    estimatedPayout?: number | null;
    /**
     * 行权时间
     */
    exerciseTime?: Date | null;
    /**
     * 是否价内
     */
    isInTheMoney?: boolean | null;
    /**
     * 期权代码
     */
    optionCode?: null | string;
    /**
     * 实际支付金额
     */
    paymentAmount?: number | null;
    /**
     * 支付时间
     */
    paymentTime?: Date | null;
    /**
     * 支付凭证URL
     */
    paymentVoucherUrl?: null | string;
    /**
     * 开仓时涨跌幅
     */
    priceChange?: string;
    /**
     * 上游购买时间
     */
    purchaseTime?: Date | null;
    /**
     * 报价价格
     */
    quotedPrice?: number;
    /**
     * 相对行权价
     */
    relativeStrike?: number;
    /**
     * 结算金额
     */
    settlementAmount?: number | null;
    /**
     * 结算价
     */
    settlementPrice?: number | null;
    /**
     * 数据源名称
     */
    sourceName?: string;
    /**
     * 起始日期
     */
    startDate?: Date | null;
    /**
     * 状态时间线
     */
    statusTimeline?: StatusTimelineItem[] | null;
    /**
     * 实际行权价
     */
    strikePrice?: number;
    /**
     * 结构显示名称
     */
    structureDisplayName?: string;
    /**
     * 开仓时标的价格
     */
    underlyingPrice?: number;
    /**
     * 上游期权费
     */
    upstreamFee?: number | null;
    /**
     * 上游报价价格
     */
    upstreamQuote?: number | null;
    /**
     * 上游报价时间
     */
    upstreamQuoteTime?: Date | null;
    /**
     * 波动率百分比
     */
    volatilityPercent?: number;
    [property: string]: any;
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
     * 状态
     */
    status?: string;
    /**
     * 时间戳
     */
    timestamp?: Date;
    [property: string]: any;
}
