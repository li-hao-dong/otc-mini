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
