// china_ghphpt/labour/components/readyRelease/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList()
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

    },
    getList(){
    var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "my_post",
          user_phone: phone,
        },
        success: function (res) {
            if(res.statusCode== 200){
                that.setData({
                    listData:res.data.data
                })
            }
            // console.log(res.data)
         }
        })
    },
  gotoDetial(e) {
    var id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../../components/details/index?id=' + id,
    })
  },
    remove_list(e){
        var that = this
        var id = e.currentTarget.dataset.id
        wx.showModal({
            title: '提示',
            content: '确认删除？',
            success (res) {
              if (res.confirm) {
                var phone = wx.getStorageSync('phone');
                app.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "del_post",
                    user_phone: phone,
                    id:id
                },
                success: function (res) {
                    if(res.statusCode== 200){
                        wx.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 1500
                          })
                          that.getList()
                    }
                    // console.log(res.data)
                 }
                }) 
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
       
    },
})