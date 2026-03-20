/**
 * 检测APP版本更新请求参数
 */
export interface CheckAppVersionReq {
    /**
     * 客户端平台标识，目前只支持 "android"
     */
    platform: string;
    /**
     * 客户端当前安装包的内部版本号，必须为正数
     */
    version_code: number;
    /**
     * 客户端当前安装包的显示版本号
     */
    current_version?: string;
    /**
     * 客户端分发渠道标识
     */
    channel?: string;
    /**
     * 构建类型
     * - "release": 正式发布版
     * - "debug": 调试版
     * - "staging": 预发版
     */
    build_type?: string;
}

/**
 * 检测APP版本更新响应数据
 */
export interface CheckAppVersionResp {
    /**
     * 是否存在更新版本
     */
    has_update: boolean;
    /**
     * 是否必须强制更新
     */
    force_update: boolean;
    /**
     * 最新版本内部版本号，程序比较用
     */
    latest_version_code: number;
    /**
     * 最新版本名，主要展示给用户看，例如：1.0.5
     */
    latest_version_name: string;
    /**
     * 最低可兼容版本号
     * 如果当前客户端的 version_code 小于这个值，就意味着必须强制升级
     */
    min_supported_version_code: number;
    /**
     * 当前版本内部版本号
     */
    current_version_code: number;
    /**
     * 当前版本名
     */
    current_version_name: string | null;
    /**
     * 安装包下载地址
     * 官网分发的 APK，前端点击"立即更新"时跳转这个地址
     */
    download_url: string | null;
    /**
     * 应用市场地址
     */
    store_url: string | null;
    /**
     * 更新说明
     */
    release_notes: string | null;
    /**
     * 升级提示文案
     */
    upgrade_tips: string | null;
    /**
     * 安装包 SHA256
     */
    file_sha256: string | null;
    /**
     * 安装包大小（字节）
     */
    file_size_bytes: number | null;
    /**
     * 发布时间，例如 2026-03-17T09:00:00Z
     */
    published_at: string | null;
    /**
     * 客户端平台标识
     */
    platform: string;
    /**
     * 客户端分发渠道标识
     */
    channel: string | null;
    /**
     * 构建类型
     */
    build_type: string | null;
}