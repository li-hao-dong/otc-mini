/**
 * FilterOptions
 */
export interface InquiryOptionsResp {
    /**
     * 可选的规模列表（万元）
     */
    nominalAmounts?: number[];
    optionTypes?: OptionType[];
    /**
     * 热门标的列表
     */
    popularUnderlyings?: PopularUnderlying[];
    sources?: Source[];
    structures?: StructureDefinition[];
    terms?: Term[];
    [property: string]: any;
}

export interface OptionType {
    code?: Code;
    name?: string;
    [property: string]: any;
}

export enum Code {
    Snowball = "SNOWBALL",
    Call = "CALL"
}

interface PopularUnderlying {
    assetCode?: string;
    assetName?: string;
    currentPrice?: number;
    priceChange?: string;
    [property: string]: any;
}

export interface Source {
    code?: string;
    isActive?: boolean;
    name?: string;
    [property: string]: any;
}

/**
 * StructureDefinition
 */
export interface StructureDefinition {
    /**
     * 结构代码
     */
    code?: string;
    exoticStructure?: string;
    /**
     * 结构显示名称
     */
    name?: string;
    // relativeStrike?: number;
    strikeType?: StrikeType;
    applicableOptionTypes?: string[];
    [property: string]: any;
}

enum StrikeType {
    ATM = "ATM",
    Exotic = "EXOTIC",
    Itm = "ITM",
    Otm = "OTM",
}

export interface Term {
    code?: string;
    days?: number;
    name?: string;
    [property: string]: any;
}
