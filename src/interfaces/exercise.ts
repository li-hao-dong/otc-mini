export interface ExerciseReq {
    /**
     * 行权比例（0-1，1表示全部行权）
     */
    exerciseQuantity?: number;
    /**
     * 行权类型（手动/自动）
     */
    exerciseType: ExerciseType;
    /**
     * 行权备注
     */
    remarks?: string;
    [property: string]: any;
}

/**
 * 行权类型（手动/自动）
 */
export enum ExerciseType {
    Auto = "AUTO",
    Manual = "MANUAL",
}


export interface ExerciseResp {
    /**
     * 预计结算日期
     */
    estimatedSettlementDate?: Date;
    /**
     * 行权流水号
     */
    exerciseId?: string;
    /**
     * 行权说明
     */
    notes?: string;
    /**
     * 订单ID
     */
    orderId?: string;
    /**
     * 行权后订单状态
     */
    orderStatus?: string;
    /**
     * 预计结算金额
     */
    settlementAmount?: number;
    /**
     * 行权手续费
     */
    settlementFee?: number;
    [property: string]: any;
}
