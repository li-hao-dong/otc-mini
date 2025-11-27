export const calcClassName = (priceChange:string|number) => {
    let changePrice:number = 0;
    if (typeof priceChange === 'number'){
        changePrice = priceChange;
    }else if (typeof priceChange === 'string'){
        changePrice= Number(priceChange.replace('%',''));
    }
    if(changePrice > 0){
        return 'rise_color'
    }else if(changePrice < 0){
        return 'fall_color'
    }else {
        return 'normal_color'
    }
}
