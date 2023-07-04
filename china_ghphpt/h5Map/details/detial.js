// china_ghphpt/h5Map/details/detial.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressinfo: {},
        certification: true,
        tipShow: false,
        tipCon: ''
    },

    cloneTip() {
        this.setData({
            tipShow: false
        })
    },
    openDoor() {
        console.log('实名认证开门')
        var that = this
        wx.login({
            success: (res) => {
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        op: "get_openid",
                        code: res.code,
                    },
                    success: function (res) {
                        app.util.request({
                            url: "entry/wxapp/index",
                            data: {
                                op: "gzz_login",
                                open_id: res.data.openid,
                            },
                            success: function (res) {
                                console.log('认证状态', res.data.code)
                                that.setData({
                                    certification: res.data.code ? true : false
                                })
                                if (res.data.code == 1) {
                                    console.log('认证用户可以开门-地址id', that.data.addressinfo.id)
                                    // 开门
                                    app.util.request({
                                        url: "entry/wxapp/index",
                                        data: {
                                            op: "open_door",
                                            id: that.data.addressinfo.id,
                                            user_id: res.data.data.id
                                        },
                                        success: function (res) {
                                            console.log('开门信息', res.data.msg, res.data.code == 1 ? "success" : "fail")
                                            // wx.showToast({
                                            //     title: res.data.msg,
                                            //     icon: res.data.code == 1 ? "success":"error",
                                            //     duration: 1000
                                            // })
                                            that.setData({
                                                tipShow: true,
                                                tipClass: res.data.code == 1 ? "tipOk" : "tipFail",
                                                tipCon: res.data.msg
                                            })
                                        }
                                    })


                                } else {
                                    wx.navigateTo({
                                        url: '../certified/certified',
                                    })
                                }
                            }
                        })
                    }
                })
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var adderssId = options.id ? options.id : decodeURIComponent(options.scene).split('&')[0].split('=')[1]
        // 获取地图详情
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "gzz_info",
                id: adderssId
            },
            success: function (res) {
                console.log('地图详情', res)
                that.setData({
                    addressinfo: res.data.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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
    gotoMap() {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                console.log('导航到', that.data.addressinfo.address)
                const latitude = parseFloat(that.data.addressinfo.latitude)
                const longitude = parseFloat(that.data.addressinfo.longitude)
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    // scale: 18,
                    name: that.data.addressinfo.name,
                    address: that.data.addressinfo.address
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})