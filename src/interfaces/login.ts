export interface loginReq {
    /**
     * 用户密码（仅在账号密码登录时必填）
     */
    password?: string;
    /**
     * 推荐人的uuid（仅在扫推荐人的推荐二维码登录时填写）
     */
    referrer_uuid?: string;
    /**
     * 用户名或邮箱；微信登录时提供则用于新账号创建时直接使用
     */
    user_name?: string;
    /**
     * 微信小程序登录时获取的 `js_code`，用于换取微信会话凭证
     */
    wechat_login_js_code?: string;
    [property: string]: any;
}

/**
 * 登录成功后返回的令牌及用户信息
 */
export interface loginResp {
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
