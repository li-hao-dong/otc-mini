/**
 * Request
 *
 * MarketIndicesSummaryResponse，市场指数汇总响应
 */
export interface IndicesResp {
    /**
     * 板块指数
     */
    board_indices: MarketIndexResponse[];
    /**
     * 行业指数
     */
    industry_indices: MarketIndexResponse[];
    /**
     * 国际指数
     */
    international_indices: MarketIndexResponse[];
    /**
     * 主要大盘指数
     */
    major_indices: MarketIndexResponse[];
    /**
     * 总指数数量
     */
    total_count: number;
    /**
     * 数据更新时间
     */
    updated_at: Date;
    [property: string]: any;
}

/**
 * MarketIndexResponse，市场指数响应数据
 */
export interface MarketIndexResponse {
    /**
     * 成交额
     */
    amount?: null | string;
    category: MarketIndexCategory;
    /**
     * 涨跌幅（百分比）
     */
    change: string;
    /**
     * 涨跌额
     */
    change_amount?: number | null;
    /**
     * 指数代码
     */
    code: string;
    /**
     * 指数描述
     */
    description?: null | string;
    /**
     * 指数名称
     */
    name: string;
    /**
     * 当前价格
     */
    price: number;
    /**
     * 成交量
     */
    volume?: null | string;
    [property: string]: any;
}

/**
 * MarketIndexCategory，市场指数分类
 */
export enum MarketIndexCategory {
    Board = "board",
    Industry = "industry",
    International = "international",
    Major = "major",
}
