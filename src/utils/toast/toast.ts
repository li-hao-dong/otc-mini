// import succImg from "../static/images/toast_succ_icon.png";
// import failImg from "../static/images/toast_fail_icon.png";
// import warnImg from "../static/images/toast_warn_icon.png";
const duration = 2000;

// /**
//  * 自定义loading提示
//  * */
// export const loadingTotal = function (){
//   let totalBox = document.createElement('div');
//   let totalMask = document.createElement("div");
//   let totalMain = document.createElement("div");
//   totalBox.setAttribute("class", 'loading-total');
//   totalMask.setAttribute("class", 'mask');
//   totalMain.setAttribute("class", 'total-main');
//   totalBox.appendChild(totalMask); // total的遮罩部分
//   totalBox.appendChild(totalMain); // total的内容部分
//   document.body.appendChild(totalBox);
// }
export const succToast = function (title: string) {
    uni.showToast({
        title,
        // image: succImg,
        mask: true,
        position: "center",
        duration,
    });
};

export const failToast = function (title: string) {
    uni.showToast({
        title,
        // image: failImg,
        icon: "error",
        mask: true,
        position: "center",
        duration,
    });
};

export const warnToast = function (title: string) {
    uni.showToast({
        title,
        // image: warnImg,
        icon: "error",
        mask: true,
        position: "center",
        duration,
    });
};

export const loadingToast = function (title: string) {
    uni.showLoading({ title });
};

export const hideLoading = function () {
    uni.hideLoading();
};
