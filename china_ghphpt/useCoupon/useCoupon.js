// china_ghphpt/useCoupon/useCoupon.js
import drawQrcode from '../../resource/js/weapp.qrcode.js'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var phone = wx.getStorageSync('phone');
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'coupon_ewm',
                id: id,
                phone: phone
            },
            success: function (res) {
                console.log(res);

                that.setData({
                    coupon_card: res.data.coupon_card
                })

                drawQrcode({
                    width: 150,
                    height: 150,
                    canvasId: 'myQrcode',
                    // text: res.data.coupon.id
                    text: 'code=' + res.data.coupon_card.card_number +'&type=coupon'
                })

            }
        })

    },
    back: function () {
        wx.navigateTo({
            url: '../mineCouponList/mineCouponList',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})