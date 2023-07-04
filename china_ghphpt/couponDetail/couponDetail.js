// china_ghphpt/couponDetail/couponDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tipShow: false,
        tipCon: "领取成功",
        successcode: 0,
        click: 1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'coupon_detail',
                id: id
            },
            success: function (res) {
                that.setData({
                    coupon: res.data.coupon,
                })
            }
        })
    },
    getCoupon: function (e) {
        console.log('订阅', 'getCoupon')
        var that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['tI8nunQEAdAAt6MoM2yQIYpZDpTU4LmcdyMZgkm1au4'],
            success(res) {
                console.log('订阅', res)
            },
            fail(err) {
                console.log('fail', err)
            },
            complete() {
                console.log('后方')
                if (that.data.click == 1) {
                    that.setData({
                        click: 0
                    })
                    console.log(e.currentTarget.dataset.id);
                    var openid = wx.getStorageSync('openid');
                    var phone = wx.getStorageSync('phone');
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
                        console.log('发送',e.currentTarget.dataset.id,phone)
                        app.util.request({
                            url: "entry/wxapp/index",
                            data: {
                                op: "receive_coupon",
                                id: e.currentTarget.dataset.id,
                                phone: phone
                            },
                            success: function (res) {
                                console.log(res.data.msg)
                                that.setData({
                                    tipShow: true,
                                    successcode: res.data.code,
                                    tipCon: res.data.msg,
                                })
                            },
                            fail: function () {
                                that.setData({
                                    click: 1
                                })
                            }
                        })
                    }
                } else {
                    wx.showToast({
                        title: '请勿频繁点击',
                        icon: 'none'
                    })
                }
            }
        })
    },
    goBusiness: function (e) {
        // 商家详情
        console.log(e.currentTarget.dataset.sellerId);
        wx.navigateTo({
            url: '../businessDetail/businessDetail?id=' + e.currentTarget.dataset.sellerId,
        })
    },
    goMine: function () {
        this.setData({
            tipShow: false,
            click: 1
        })
        if (this.data.successcode == 1) {
            wx.reLaunch({
                url: '../mineCouponList/mineCouponList?type=1',
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})