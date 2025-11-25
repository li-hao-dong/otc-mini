/**
 * Request
 *
 * EquityOptionCalculatorRequest，个股期权计算器请求体，对应前端“计算器”页面。
 * 支持香草看涨期权（Call）和雪球期权（Snowball）。
 */
export interface calculatorReq {
    /**
     * 规模（万元），前端“规模”字段，对应名义本金，单位为 10,000 元
     */
    nominalAmount: number;
    /**
     * 开仓价（元），即买入期权时标的价格
     */
    openPrice: number;
    /**
     * 期权费率（%），如 10 表示期权费为名义本金的 10%
     */
    optionFeeRate: number;
    /**
     * 期权类型，支持香草看涨期权（Call）和雪球期权（Snowball）
     */
    optionType: OptionType;
    /**
     * 结算价（元），即期权到期/提前结算时标的价格
     */
    settlementPrice: number;
    /**
     * 结构代码，需来自 `/inquiry/options` 返回的 `structures.code`。
     * 例如：ATM_100、ITM_80、OTM_103、EXOTIC_8080 等。
     */
    structureCode: string;
    [property: string]: any;
}

/**
 * 期权类型，支持香草看涨期权（Call）和雪球期权（Snowball）
 */
export enum OptionType {
    Call = "Call",
    Snowball = "Snowball",
}


/**
 * EquityOptionCalculatorResult，个股期权计算结果。
 * 支持香草看涨期权（Call）和雪球期权（Snowball）。
 * 不同类型的具体收益公式由后端实现。
 */
export interface EquityOptionCalculatorResult {
    /**
     * 预计回款（万元），对应前端“预计回款”。
     *
     * 香草看涨期权示例：
     * expectedPayout = nominalAmount × payoffRate。
     */
    expectedPayout?: number;
    /**
     * 实际盈亏（万元），对应前端“实际盈亏”。
     *
     * 香草看涨期权示例：
     * netProfit = expectedPayout − nominalAmount × optionFeeRate / 100。
     */
    netProfit?: number;
    /**
     * 规模（万元），与请求一致
     */
    nominalAmount?: number;
    /**
     * 开仓价（元），与请求一致
     */
    openPrice?: number;
    /**
     * 期权费率（%），与请求一致
     */
    optionFeeRate?: number;
    /**
     * 期权类型，与请求一致
     */
    optionType?: OptionType;
    /**
     * 对于香草看涨期权：标的“期权化”涨幅（无单位），
     * 例如 (15 - 12) / 12 = 0.25 表示 25%。
     * 对应公式：max( S_T / S_0 − f , 0 )。
     * 对于雪球期权：由业务规则计算，可用此字段表达“有效收益率”。
     */
    payoffRate?: number;
    /**
     * 盈亏比例（%），对应前端“盈亏比例”。
     *
     * 香草看涨期权示例：
     * profitRate = netProfit / (nominalAmount × optionFeeRate / 100) × 100。
     */
    profitRate?: number;
    /**
     * 结算价（元），与请求一致
     */
    settlementPrice?: number;
    /**
     * 行权价（元）。按照结构对应的行权价系数计算：
     * strikePrice = openPrice × 行权价系数。
     * 例如 ATM_100 → 100%，ITM_80 → 80% 等。
     */
    strikePrice?: number;
    /**
     * 结构代码
     */
    structureCode?: string;
    /**
     * 结构显示名称，便于前端直接展示
     */
    structureName?: string;
    [property: string]: any;
}
