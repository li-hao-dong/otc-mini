/**
 * 登录成功后返回的令牌及用户信息
 */
export interface loginH5Resp {
    /**
     * 用于后续 API 调用的 Bearer Token
     */
    access_token?: string;
    /**
     * 令牌有效期（秒）
     */
    expires_in?: number;
    /**
     * 令牌类型
     */
    token_type?: TokenType;
    /**
     * 登录用户的基础信息
     */
    user_info?: UserInfo;
    [property: string]: any;
}

/**
 * 令牌类型
 */
export enum TokenType {
    Bearer = "Bearer",
}

/**
 * 登录用户的基础信息
 */
export interface UserInfo {
    /**
     * 用户唯一标识
     */
    user_id?: string;
    /**
     * 用户显示名称
     */
    user_name?: string;
    [property: string]: any;
}
