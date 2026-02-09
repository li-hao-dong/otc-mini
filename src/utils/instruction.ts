// 风险揭示书
export const riskBook = () => {
    return uni.navigateTo({url: `/pages/pdfView/pdfView?pdfUrl=/storage/doc/otc_equity_option_risk_disclosure.pdf`});
}

// 产品说明书
export const prodBook = () => {
    return uni.navigateTo({url: `/pages/pdfView/pdfView?pdfUrl=/storage/doc/otc_equity_option_product_descr.pdf`});
}
