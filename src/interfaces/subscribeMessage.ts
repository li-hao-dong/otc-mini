export interface subscribeMessageResp {
    details?: Detail[];
    /**
     * 订阅失败的模板数量
     */
    failed_count?: number;
    /**
     * 成功订阅的模板数量
     */
    success_count?: number;
    [property: string]: any;
}

export interface Detail {
    message?: string;
    status?: Status;
    template_id?: string;
    [property: string]: any;
}

export enum Status {
    Failed = "FAILED",
    Success = "SUCCESS",
}
