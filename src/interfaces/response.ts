export interface response {
    /**
     * 状态码
     */
    code?: number;
    /**
     * 响应消息
     */
    message?: string;
    /**
     * 请求ID，用于问题追踪
     */
    requestId?: string;
    /**
     * 响应时间戳
     */
    timestamp?: Date;
    data?: any;
    statusCode?: number;

    [property: string]: any;
}
