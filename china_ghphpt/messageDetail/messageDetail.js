// china_ghphpt/messageDetail/messageDetail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var that = this;
        // var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'notice_deatil',
                id:id
            },
            success: function(res) {
                console.log(res);
                that.setData({
                    notice: res.data.notice,
                    setting: res.data.setting,
                })
            }
        })
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