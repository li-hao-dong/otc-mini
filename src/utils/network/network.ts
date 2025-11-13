const network = {
    /**
     * @description 刷新页面
     * */
    // reload() {
    //     this.$store.commit("isRouterAlive", false);
    //     this.$nextTick(() => {
    //         this.$store.commit("isRouterAlive", true);
    //     })
    // },
    /**
     * @description 判断网络连接状态
     * @return false 未连接网络 true 连接网络
     * */
    handleNetworkChange() {
        // console.log("network check system");
        if (!navigator.onLine) {
            // 无网络连接
            // this.errHint("网络异常");
            return false;
        } else {
            // 有网络
            // this.succHint("网络恢复");
            // this.reload();
            return true;
        }
    },
    /**
     * @description 监听网络状态
     * @param {boolean} navigator.onLine 有网络true 无网络false
     * */
    checkNetworkStatus() {
        window.addEventListener("online", this.handleNetworkChange);
        window.addEventListener("offline", this.handleNetworkChange);
    },
    removeNetworkEvent() {
        window.removeEventListener("online", this.handleNetworkChange);
        window.removeEventListener("offline", this.handleNetworkChange);
    },
};

export default network;
