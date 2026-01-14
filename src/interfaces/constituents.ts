export interface ConstituentsResp {
    updated_at: string,
    count: number,
    data: constituents[],
    status: string,
    message: string
}

export interface constituents {
    "今开": number; // 40.41
    "代码": string; // "300792"
    "名称": string; // "壹网壹创"
    "市净率": number; // 3.99
    "市盈率-动态": number; // 88.98
    "序号": number; // 2
    "成交量": number; // 528166
    "成交额": number; // 2416407311.5
    "振幅": number; // 21.64
    "换手率": number; // 24.85
    "昨收": number; // 41.08
    "最低": number; // 40.41
    "最新价": number; // 49.3
    "最高": number; // 49.3
    "涨跌幅": number; // 20.01
    "涨跌额": number; // 8.22
}
