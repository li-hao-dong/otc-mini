import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./driver.css"
import {nextTick} from "vue";
import {useStore} from "@/stores";


const delayJump = (move: Function, delay: number = 300 ) => {
    setTimeout(async () => {
        nextTick().then(() => {
            move();
        });
    }, delay);
}


export const driverObj = driver({
    showProgress: true,
    progressText: "当前 {{current}} 步,共 {{total}} 步",
    stagePadding: 5,
    showButtons: ['next', 'previous'],
    nextBtnText: '下一个',//'下一个→',
    prevBtnText: '前一个',//'←前一个',
    doneBtnText: '已完成',
    popoverClass: 'driverjs-theme',
    allowClose: false,
    allowKeyboardControl: true,
    disableActiveInteraction: true, // 高亮区域禁止点击
    steps: [
        // 菜单引导
        { element: '.home',
            popover: {
                title: '首页',
                description: '看板块热度与标的榜单，快速找到热门与官方推荐标的。看板块热度与标的榜单，快速找到热门与官方推荐标的。',
                side: "left",
                align: 'start',
                onNextClick: () => {
                    uni.$u.route({url:'/pages/inquiryHistory/inquiryHistory', type: "switchTab"})
                    delayJump(driverObj.moveNext)
                    // driverObj.moveNext();
                }
            },
        },
        { element: '.inquiryHistory',
            popover: {
                title: '询价历史',
                description: '查看你最近的询价与报价结果，支持一键复用参数再询价',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.$u.route({url: '/pages/home/home', type: "switchTab"})
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    uni.$u.route({url: '/pages/inquiry/inquiry', type: "reLaunch"})
                    delayJump(driverObj.moveNext)
                    // driverObj.moveNext();
                }
            },
        },
        { element: '.inquiry',
            popover: {
                title: '下单',
                description: '个股期权下单入口：选标的 → 选参数 → 询价 → 下单。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.$u.route({url: '/pages/inquiryHistory/inquiryHistory', type: "switchTab"})
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/groupOrders/groupOrders')
                    uni.$u.route({url:'/pages/groupOrders/groupOrders', type: "switchTab"})
                    delayJump(driverObj.moveNext)
                    // driverObj.moveNext();
                }
            },
        },
        { element: '.groupOrders',
            popover: {
                title: '拼单市场',
                description: '参与他人拼单，一起买同一份合约，降低单人资金占用与波动风险。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.$u.route({url: '/pages/inquiry/inquiry', type: "reLaunch"})
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/user/user')
                    uni.$u.route({url:'/pages/user/user', type: "switchTab"})
                    delayJump(driverObj.moveNext)
                    // driverObj.moveNext();
                }
            },
        },

        { element: '.user',
            popover: {
                title: '我的',
                description: '管理个人订单、持仓与拼单进度，查看明细与状态。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.$u.route({url: '/pages/groupOrders/groupOrders', type: "switchTab"})
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    uni.$u.route({url: '/pages/inquiry/inquiry?name=深科技', type: "navigateTo"})
                    delayJump(driverObj.moveNext)
                    // driverObj.moveNext();
                }
            },
        },

        // 下单页面引导
        { element: '.bdSection',
          popover: {
            title: '标的',
            description: '输入股票简称或代码，获取对应期权可选参数与报价。',
            side: "left",
            align: 'start',
              onPrevClick: () => {
              uni.$u.route({url:'/pages/user/user', type: "switchTab"})
              delayJump(driverObj.movePrevious)
              // driverObj.movePrevious();
            },
            onNextClick: () => {
                // uni.$u.route('/pages/inquiry/inquiry')
                delayJump(driverObj.moveNext)
            }
          },
        },
        // 类型
        { element: '.section:nth-child(2)',
            popover: {
                title: '类型/方向',
                description: '按你的交易意图选择：类型或者方向。\n' +
                    '不确定怎么选？可先用「默认参数」快速开始。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    delayJump(driverObj.moveNext)
                }
            },
        },
        // 结构
        { element: '.section:nth-child(3)',
            popover: {
                title: '结构',
                description: '按你的交易意图选择：结构。\n' +
                    '不确定怎么选？可先用「默认参数」快速开始。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    delayJump(driverObj.moveNext)
                }
            },
        },
        // 规模
        { element: '.section:nth-child(4)',
            popover: {
                title: '规模',
                description: '按你的交易意图选择：规模。\n' +
                    '不确定怎么选？可先用「默认参数」快速开始。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    delayJump(driverObj.moveNext)
                }
            },
        },
        // 期限
        { element: '.section:nth-child(5)',
            popover: {
                title: '期限',
                description: '按你的交易意图选择：期限。\n' +
                    '不确定怎么选？可先用「默认参数」快速开始。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    delayJump(driverObj.moveNext)
                }
            },
        },
        // 报价方
        { element: '.section:nth-child(6)',
            popover: {
                title: '报价方',
                description: '按你的交易意图选择：报价方。\n' +
                    '不确定怎么选？可先用「默认参数」快速开始。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                    // driverObj.movePrevious();
                },
                onNextClick: () => {
                    // uni.$u.route('/pages/inquiry/inquiry')
                    delayJump(driverObj.moveNext)
                }
            },
        },
        { element: '.submitBtn',
        popover: {
            title: '询价按钮',
            description: '提交后将返回最新报价（报价随市场波动）。',
            side: "left",
            align: 'start',
            onPrevClick: () => {
                delayJump(driverObj.movePrevious)
            },
            onNextClick: () => {
                // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                document.querySelector('.submitBtn')!.click();
                delayJump(driverObj.moveNext, 500)
            }
        }},

        // 询价结果
        { element: '.price',
            popover: {
                title: '价格',
                description: '选择一个报价进入下单。报价可能随行情变动，请以提交时为准。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.navigateBack()
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    document.querySelector('.price')!.click();
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.tab_btn:nth-child(1)',
            popover: {
                title: '独自下单',
                description: '你单独购买该合约，持仓与收益/风险由你承担。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    uni.navigateBack()
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    useStore().miniData.orderPlacementTabIndex = 1
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.tab_btn:nth-child(2)',
            popover: {
                title: '发起拼单',
                description: '多人共同买同一份合约，你只承担自己的份额资金与风险。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    useStore().miniData.orderPlacementTabIndex = 0
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.market',
            popover: {
                title: '下单价格',
                description: '市价：按提交后可成交的市场价格撮合，成交更快但价格可能波动。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.limit',
            popover: {
                title: '下单价格',
                description: '限价：指定成交价格，未达到价格可能无法成交。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.fee_box',
            popover: {
                title: '费用概览',
                description: '本次下单预计支付费用（含各项费用明细）。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.group_buy_btn',
            popover: {
                title: '发起拼单',
                description: '随后设置拼单相关信息。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    document.querySelector('.group_buy_btn')!.click();
                    useStore().miniData.groupPeople = 2
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.choose_people',
            popover: {
                title: '设置拼单人数',
                description: '设置拼单人数，系统将自动计算每人应付金额。拼单人数越多，单人资金占用越低（收益/风险按份额分摊）。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    // document.querySelector('.group_buy_btn')!.click();
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.personal_fee_box',
            popover: {
                title: '每人费用明细',
                description: '展示每人应付金额与费用构成，支持查看总费用。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    // document.querySelector('.group_buy_btn')!.click();
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.confirm_btn',
            popover: {
                title: '确认拼单',
                description: '点击确认拼单即可，发起拼单。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    useStore().miniData.orderPlacementTabIndex = 0
                    useStore().miniData.groupPeople = 0
                    uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.my_order',
            popover: {
                title: '我的仓单',
                description: '查看你发起/独自下单的订单状态、持仓与收益概览。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},
        { element: '.my_group_order',
            popover: {
                title: '我的拼单',
                description: '查看你参与的拼单：进度、份额、应付/已付、成交与回报。',
                side: "left",
                align: 'start',
                onPrevClick: () => {
                    delayJump(driverObj.movePrevious)
                },
                onNextClick: () => {
                    // uni.$u.route({url: '/pages/user/user', type: 'switchTab'})
                    delayJump(driverObj.moveNext)
                },

            }},

        { popover: { title: '完成教学', description: '就这样，你可以继续在应用程序中自由操作功能了。', onNextClick: () => {
                    uni.setStorageSync('appGuide', true)
                    delayJump(driverObj.moveNext)
                },}}
    ],

});
// driverObj.drive() // 调用方式
export const startGuide = () => {
    if(uni.getStorageSync('appGuide')) return
    uni.showModal({
        title: '提示',
        content: '即将进行交易引导',
        success: (res) => {
            // console.log("success 123", res)
            if(res.confirm) {
                uni.$u.route({url: '/pages/home/home', type: "switchTab"})
                delayJump(driverObj.drive)
            }
        },
    })
}
