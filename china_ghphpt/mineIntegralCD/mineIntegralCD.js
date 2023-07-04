// china_ghphpt/mineIntegralCD/mineIntegralCD.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      debugger
        var that = this;
        var id = options.id;
        // var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "goods_card_detail",
                id: id,
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    goods: res.data.goods,
                    id:id
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    // 立即使用
    use: function(e) {
      var id = this.data.id;
      var type = "useIntegralC"
        wx.navigateTo({
          url: '../useIntegralC/useIntegralC?id=' + id + "&type=useIntegralC" ,
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})