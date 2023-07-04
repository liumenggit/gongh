Page({

    /**
     * 页面的初始数据
     */
    data: {
        date:{
            start:'2023-1-10',
            end:'2023-1-15'
        },
        status:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    dateParse:function(){
        return true;
    },
    payFees: function () {
        console.log('立即缴费')
        var app = getApp();
        console.log('pay_fees_appid',app.siteInfo.pay_fees_appid)
        wx.navigateToMiniProgram({
            appId: 'wx70b948dc3d56345f',
            path: 'page/index/index?id=123',
            extraData: {
              foo: 'bar'
            },
            envVersion: 'develop',
            success(res) {
              // 打开成功
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