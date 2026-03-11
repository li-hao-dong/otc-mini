const network = {
    /**
     * @description 判断网络连接状态
     * @return false 未连接网络 true 连接网络
     * */
    handleNetworkChange(): Promise<boolean> {
        return new Promise((resolve) => {
            uni.getNetworkType({
                success: (res) => {
                    // networkType 可能值：wifi/2g/3g/4g/5g/unknown/none
                    if (res.networkType === 'none') {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                },
                fail: () => {
                    resolve(false);
                }
            });
        });
    },
    /**
     * @description 监听网络状态变化
     * */
    checkNetworkStatus(callback?: (isOnline: boolean) => void) {
        uni.onNetworkStatusChange((res) => {
            if (callback) {
                callback(res.isConnected);
            }
        });
    },
    /**
     * @description 移除网络状态监听（uni-app 中不需要手动移除）
     * */
    removeNetworkEvent() {
        // uni.onNetworkStatusChange 返回的函数可以用来取消监听
        // 但这里简化处理，App 生命周期内通常不需要移除
    },
};

export default network;