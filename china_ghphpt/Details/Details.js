// china_ghphpt/Details/Details.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [{
            name: '全部明细',
            id: 0
        }, {
            name: '收入',
            id: 1
        }, {
            name: '支出',
            id: 2
        }],
        index: 0,
        picer: {
            shouru: 985,
            zhichu: 865,
            dpicer: 852
        },
        picer_list: [
            {
                name: "日常签到",
                amount: 5,
                time: "2020-10-10 08:20:10",
                balance: 20
            }, {
                name: "日常签到",
                amount: 5,
                time: "2020-10-10 08:20:10",
                balance: 210
            }
        ],


    },

    /**
     * 生命周期函数--监听页面加载
     */
    picer_change: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        this.getList();
    },

    onLoad: function(options) {
        var that = this;
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'integral_record_list',
                phone: phone,
                type:0,
            },
            success: function(res) {
                console.log(res);
                that.setData({
                    integral_record: res.data.integral_record,
                    integral: res.data.integral,
                    setting: res.data.setting,
                })
            }
        })
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        this.getList();
    },

    getList: function(e) {
        var that = this;
        var index = that.data.array[that.data.index].id;
        console.log(index)
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'integral_record_list',
                phone: phone,
                type:index,
            },
            success: function(res) {
                console.log(res);
                that.setData({
                    integral_record: res.data.integral_record,
                    integral: res.data.integral,
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})