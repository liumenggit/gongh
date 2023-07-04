// china_ghphpt/clerkList/clerkList.js
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
    onLoad: function(options) {
        var that = this;
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'sell_user_list',
                phone: phone
            },
            success: function(res) {
                console.log(res);
                // console.log('删除店员', res.data)
                that.setData({
                    sell_user: res.data.sell_user,
                })

            }
        })
    },
    delBtn: function(options) {
        var _this = this;
        var id = options.currentTarget.dataset.id;
        var phone = wx.getStorageSync('phone');
        // console.log(options.currentTarget.dataset.id);
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'del_sell_user',
                id: id,
                phone: phone
            },
            success: function(res) {
                console.log(res);
                console.log('删除店员', res.data)
                if (res.data.code == 1) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000,
                    });
                    _this.onLoad();
                } else {
                    wx.showToast({
                        title: '删除失败',
                        icon: 'none',
                        duration: 2000,
                    });
                }

            }
        })

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})