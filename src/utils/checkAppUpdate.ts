/**
 * APP 版本检测工具
 */
import { checkAppVersion } from '@/api'
import { AppVersion } from '@/appVersion'
import { globalPopupInstance } from '@/pages/appVersionModal/globalPopup'
import type { CheckAppVersionResp } from '@/interfaces/appVersion'

/** 版本检测缓存，避免短时间内重复检测 */
let lastCheckTime = 0
const CHECK_INTERVAL = 5 * 60 * 1000 // 5分钟内不重复检测

/** 是否处于强制更新阻断状态 */
let isForceUpdateBlocking = false

/**
 * 检测APP版本更新
 * @param force 是否强制检测（忽略缓存时间）
 */
export const checkAppUpdate = async (force = false): Promise<CheckAppVersionResp | null> => {
    // #ifdef APP-PLUS || APP-HARMONY
    const now = Date.now()
    if (!force && now - lastCheckTime < CHECK_INTERVAL) {
        console.log('[VersionCheck] 跳过检测，距离上次检测未超过5分钟')
        return null
    }
    lastCheckTime = now

    try {
        const result = await checkAppVersion({
            platform: AppVersion.platform,
            version_code: AppVersion.versionCode,
            current_version: AppVersion.versionName,
            channel: AppVersion.channel,
            build_type: AppVersion.buildType
        })

        console.log('[VersionCheck] 检测结果:', result)

        if (result.has_update) {
            showUpdatePopup(result)
        }

        return result
    } catch (error) {
        console.error('[VersionCheck] 检测失败:', error)
        return null
    }
    // #endif

    // #if !(APP-PLUS || APP-HARMONY)
    return null
    // #endif
}

/**
 * 是否处于强制更新阻断状态
 */
export const isInForceUpdateBlocking = (): boolean => {
    return isForceUpdateBlocking
}

/**
 * 显示更新弹窗
 */
const showUpdatePopup = (versionInfo: CheckAppVersionResp) => {
    const { force_update, latest_version_name, release_notes, download_url, store_url, upgrade_tips } = versionInfo

    // 设置强制更新阻断状态
    isForceUpdateBlocking = force_update

    // 主文案：优先 upgrade_tips
    const content = upgrade_tips || '发现新版本，建议更新以获得更好体验'
    // 附加内容：release_notes（更新说明）
    const subContent = release_notes || ''

    globalPopupInstance.show({
        type: 2, // Modal 弹窗
        title: `发现新版本 v${latest_version_name}`,
        content,
        subContent,
        showCancel: !force_update,
        confirmText: '立即更新',
        cancelText: '稍后再说',
        closeOpacity: !force_update, // 可选更新允许点击遮罩关闭，强制更新不允许
        confirm: () => {
            handleUpdate(download_url, store_url, force_update, versionInfo)
        },
        cancel: () => {
            if (!force_update) {
                console.log('[VersionCheck] 用户选择稍后更新')
            }
        }
    })
}

/**
 * 处理更新操作
 */
const handleUpdate = (
    downloadUrl: string | null,
    storeUrl: string | null,
    forceUpdate: boolean,
    versionInfo: CheckAppVersionResp
) => {
    // 优先使用应用市场地址
    const updateUrl = storeUrl || downloadUrl

    if (!updateUrl) {
        // 根据是否强制更新显示不同提示
        const errorMsg = forceUpdate
            ? '当前版本已停止支持，但更新地址暂不可用，请联系管理员'
            : '更新地址暂不可用'

        uni.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 3000
        })

        // 强制更新且地址为空，重新弹出弹窗保持阻断状态
        if (forceUpdate) {
            setTimeout(() => {
                showUpdatePopup(versionInfo)
            }, 3500)
        }
        return
    }

    // #ifdef APP-PLUS || APP-HARMONY
    // 打开浏览器下载
    plus.runtime.openURL(updateUrl, (err) => {
        console.error('[VersionCheck] 打开更新地址失败:', err)
        uni.showToast({
            title: '打开更新地址失败',
            icon: 'none'
        })

        // 强制更新时打开失败，重新弹窗
        if (forceUpdate) {
            setTimeout(() => {
                showUpdatePopup(versionInfo)
            }, 1500)
        }
    })
    // #endif
}