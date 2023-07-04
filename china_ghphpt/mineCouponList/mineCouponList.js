// china_ghphpt/mineCouponList/mineCouponList.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [{
            name: '全部卡券状态',
            id: 0
        }, {
            name: '可用',
            id: 1
        }, {
            name: '已用',
            id: 2
        }, {
            name: '失效',
            id: 3
        }],
        index: 1,
        array1: [{
                name: '全部卡券类型',
                id: 0
            }, {
                name: '长期优惠券',
                id: 1
            }, {
                name: '限时折扣券',
                id: 2
            },
            {
                name: '生日券',
                id: 3
            }
        ],
        index1: 0,

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var phone = wx.getStorageSync('phone');
        if (options.type) {
            this.setData({
                index: options.type
            })
        }
        this.getList();
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        this.getList();
    },
    bindPickerChange1: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index1: e.detail.value
        })
        this.getList();
    },
    getList: function (e) {
        var that = this;
        var index = this.data.array[this.data.index].id;
        var index1 = this.data.array1[this.data.index1].id;
        var phone = wx.getStorageSync('phone');
        console.log(index, index1)
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'mine_coupon',
                is_state: index,
                type: index1,
                phone: phone
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    coupon_card: res.data.coupon_card,
                    setting: res.data.setting,
                })

            }
        })
    },
    useCoupon: function (e) {
        var openid = wx.getStorageSync('openid');
        console.log(openid);
        if (openid != '') {
            // 订阅消息模板

            console.log(e.currentTarget.dataset.id);
            wx.navigateTo({
                url: '../useCoupon/useCoupon?id=' + e.currentTarget.dataset.id,
            })
            // wx.requestSubscribeMessage({
            //     // tmplIds: ['EiD9fuLbwalGBi-qaPgDCAVEGoUVv-JnbzTG2R7Tw6g'],
            //     tmplIds: ['xe2mWo2ZN2E7FNPzz3Ea98MORfwxxDnCYPniGLxanDU'],
            //     success(res) {
            //         console.log(e.currentTarget.dataset.id);
            //         wx.navigateTo({
            //             url: '../useCoupon/useCoupon?id=' + e.currentTarget.dataset.id,
            //         })
            //     },
            //     fail(res) {
            //         wx.showToast({
            //             title: '网络异常',
            //             icon: 'none',
            //         });
            //     }
            // })
        } else {
            console.log(e.currentTarget.dataset.id);
            wx.navigateTo({
                url: '../useCoupon/useCoupon?id=' + e.currentTarget.dataset.id,
            })
        }
    },
    // 导航
    goto_index: function () {
        wx.reLaunch({
            url: '../index/index',
        })
    },
    goto_couponList: function () {
        wx.reLaunch({
            url: '../couponList/couponList',
        })
    },
    goto_PointsMall: function () {
        wx.reLaunch({
            url: '../PointsMall/PointsMall',
        })
    },
    goto_businessList: function () {
        wx.reLaunch({
            url: '../businessList/businessList',
        })
    },
    goto_mine: function () {
        var phone = wx.getStorageSync('phone');
        var openid = wx.getStorageSync('openid');
        console.log(phone)
        if (openid == '') {
            wx.navigateTo({
                url: '../empower/empower',
            })
        } else if (phone == '') {
            wx.navigateTo({
                url: '../login/login',
            })
        } else {
            wx.reLaunch({
                url: '../mine/mine',
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})