// china_ghphpt/h5Map/map.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [],
        markers: [],
        showType: 'map'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "gzz_list",
            },
            success: function (res) {
                that.setData({
                    addressList: res.data.data
                })
                that.setData({
                    markers: that.data.addressList.map(function (element) {
                        console.log('element', element)
                        let data = {
                            "label": {
                                "color": element.color,
                                "content": element.title,
                                "textAlign": "center"
                            },
                            "latitude": element.latitude,
                            "longitude": element.longitude,
                            "rotate": [
                                -30,
                                2
                            ]
                        }
                        return data;
                    })
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },
    // 切换显示方式
    tabSwich() {
        if (this.data.showType == 'map') {
            this.setData({
                showType: 'list',

            })
        } else {
            this.setData({
                showType: 'map',

            })
        }
    },
    // 详情
    goDetial(e) {
        var addressinfo = this.data.addressList[e.currentTarget.dataset.index]
        console.log('addressinfo', addressinfo)
        wx.navigateTo({
            url: 'details/detial?id=' + addressinfo.id
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})