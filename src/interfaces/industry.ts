export interface IndustryResp {
    count: number;
    data: industryStruct[];
    message: string;
    status: string;
    updated_at: string;
    [property: string]: any;
}

export interface industryStruct {
    "上涨家数": number;
    "下跌家数": number;
    "总市值": number;
    "换手率": number;
    "排名": number;
    "最新价": number;
    "板块代码": string;
    "板块名称": string;
    "涨跌幅": number;
    "涨跌额": number;
    "领涨股票": string;
    "领涨股票-涨跌幅": number;
}
