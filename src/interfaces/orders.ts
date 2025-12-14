export interface userOrderResp {
    orders?: OrderSummary[];
    pagination?: Pagination;
    summary?: OrdersSummary;
    [property: string]: any;
}

/**
 * OrderSummary
 */
export interface OrderSummary {
    /**
     * 创建时间
     */
    createdTime?: Date;
    /**
     * 剩余天数
     */
    daysToExpiry?: number | null;
    /**
     * 预计回款
     */
    estimatedPayout?: number | null;
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
     * 期权代码，例如 "100c_1m"
     */
    optionCode?: null | string;
    /**
     * 期权费
     */
    optionFee?: number;
    /**
     * 期权费率，例 0.0515 表示 5.15%
     */
    optionFeeRate?: number | null;
    /**
     * 期权类型
     */
    optionType?: string;
    /**
     * 订单ID（如需要可返回数据库主键ID的字符串形式）
     */
    orderId?: string;
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 订单状态
     */
    orderStatus?: string;
    /**
     * 当前标的涨跌幅（例如 "-0.92%"）
     */
    priceChange?: null | string;
    /**
     * 盈亏比例
     */
    profitRate?: number | null;
    /**
     * 交易方名称，例如“银河德睿”
     */
    sourceName?: null | string;
    /**
     * 交易方简称，例如 "YHDR" 或 "ZJ"
     */
    sourceShortName?: null | string;
    /**
     * 开仓时间
     */
    startDate?: Date | null;
    /**
     * 行权价格
     */
    strikePrice?: number | null;
    /**
     * 行权价类型
     */
    strikeType?: string;
    /**
     * 结构显示名称，如“平值100”
     */
    structureDisplayName?: null | string;
    /**
     * 期限名称
     */
    termName?: string;
    /**
     * 通道费
     */
    transactionFee?: number | null;
    /**
     * 标的代码
     */
    underlyingAssetCode?: string;
    /**
     * 标的名称
     */
    underlyingAssetName?: string;
    /**
     * 当前标的价格（用于展示“股价”）
     */
    underlyingPrice?: number | null;
    [property: string]: any;
}

/**
 * Pagination
 */
export interface Pagination {
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页数量
     */
    pageSize?: number;
    /**
     * 总记录数
     */
    total?: number;
    /**
     * 总页数
     */
    totalPages?: number;
    [property: string]: any;
}

export interface OrdersSummary {
    /**
     * 当前列表中所有订单的预计回款（总成本 + 汇总预计盈亏）
     */
    estimatedPayout?: number;
    /**
     * 当前列表中所有订单的预计盈亏之和
     */
    estimatedProfit?: number;
    /**
     * 当前列表中所有订单的名义本金之和
     */
    nominalAmount?: number;
    /**
     * 当前列表中所有订单的期权费之和
     */
    optionFee?: number;
    /**
     * 汇总盈亏比例，estimatedProfit / (期权费 + 通道费) 之和，返回小数形式
     */
    profitRate?: number | null;
    [property: string]: any;
}
