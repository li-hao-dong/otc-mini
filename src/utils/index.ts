import {computed} from "vue";

export const calcClassName = (priceChange:string|number) => {
    let changePrice:number = 0;
    if (typeof priceChange === 'number'){
        changePrice = priceChange;
    }else if (typeof priceChange === 'string'){
        changePrice = Number(priceChange.replace('%',''));
    }
    if(changePrice > 0){
        return 'rise_color'
    }else if(changePrice < 0){
        return 'fall_color'
    }else {
        return 'normal_color'
    }
}


// 格式化输出本地时间（年/月/日 时:分:秒）
export const formatLocalTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 截断两位小数（不四舍五入）
export const truncToTwo = (num: number) => {
    if (num === null || num === undefined) return '-';

    if (isNaN(num)) return '0.00';

    const str = Number(num).toFixed(10);
    const dotIndex = str.indexOf('.');

    // 没有小数点
    if (dotIndex === -1) return str + '.00';

    const intPart = str.slice(0, dotIndex);
    let decimalPart = str.slice(dotIndex + 1);
    // console.log("decimalPart", decimalPart)

    // 如果小数位超过两位 → 截断
    if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
    }

    // 如果小数位不足两位 → 补零
    while (decimalPart.length < 2) {
        decimalPart += '0';
    }

    return intPart + '.' + decimalPart;
};


export const goBack = () => {
	// 获取页面栈
	const pages = getCurrentPages();
	// 如果页面栈大于1，说明有上一页
	if (pages.length > 1) {
		uni.navigateBack();
	} else {
		// 否则，返回首页或者指定页面
		// 注意：如果首页是tabbar，请使用 uni.switchTab
		uni.switchTab({
			url: '/pages/home/home'
		});
	}
};

/**
 * 清除购买流程页面并跳转
 * @description 用于购买流程完成后，清除流程中的页面历史
 * @param targetUrl 目标页面路径
 * @param isTabbar 目标页面是否为 tabbar 页面
 */
export const clearOrderFlowAndNavigate = (targetUrl: string, isTabbar: boolean = false) => {
	const pages = getCurrentPages();

	// 购买流程页面列表
	const orderFlowPages = [
		'pages/inquiry/inquiry',
		'pages/inquiryResult/inquiryResult',
		'pages/orderPlacement/orderPlacement'
	];

	// 计算需要返回的层级
	let delta = 0;
	for (let i = pages.length - 2; i >= 0; i--) {
		const pageRoute = pages[i].route || '';
		if (orderFlowPages.some(flowPage => pageRoute.includes(flowPage))) {
			delta++;
		} else {
			break;
		}
	}

	if (delta > 0) {
		// 有流程页面需要清理
		uni.navigateBack({
			delta,
			success: () => {
				// 返回成功后跳转目标页面
				setTimeout(() => {
					if (isTabbar) {
						uni.switchTab({ url: targetUrl });
					} else {
						uni.navigateTo({ url: targetUrl });
					}
				}, 100);
			}
		});
	} else {
		// 没有流程页面，直接跳转
		if (isTabbar) {
			uni.switchTab({ url: targetUrl });
		} else {
			uni.navigateTo({ url: targetUrl });
		}
	}
};

/**
 * 清除所有购买流程页面并关闭当前页
 * @description 用于支付成功等场景，彻底清理流程
 * @param targetUrl 目标页面路径
 */
export const clearAllOrderFlow = (targetUrl: string) => {
	// 使用 reLaunch 清空所有页面历史
	uni.reLaunch({ url: targetUrl });
};

export const formatSeconds = computed(() => {
    return function (totalSeconds: number){
        // 计算分钟和秒数
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // 使用 padStart(2, '0') 确保数值小于10时前面补0
        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');

        return `${mm}:${ss}`;
    }
})
