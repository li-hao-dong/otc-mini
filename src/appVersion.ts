/**
 * APP 版本配置
 * 需要与 manifest.json 中的 versionCode 和 versionName 保持一致
 */
export const AppVersion = {
    /** 内部版本号，必须为正数，用于版本比较 */
    versionCode: 10000,
    /** 显示版本号，如：1.0.0 */
    versionName: '1.0.0',
    /** 平台标识 */
    platform: 'android',
    /** 分发渠道 */
    channel: 'official',
    /** 构建类型：release | debug | staging */
    buildType: 'release'
} as const

export type AppVersionConfig = typeof AppVersion