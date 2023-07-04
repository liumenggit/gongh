// china_ghphpt/labour/components/footer/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      isPefect:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getMyJl()
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
    gotoCenter(){
      wx.reLaunch({
        url: '../../components/center/index',
      })
       
    },
  goToFb(){
    var phone = wx.getStorageSync('phone');
    var that = this
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "my_resume",
        user_phone: phone,
      },
      success: function (res) {
        
        if (res.statusCode == 200) {
          if (res.data.data){
            app.util.request({
              url: "entry/wxapp/index",
              data: {
                op: "fb_resume",
                user_phone: phone,
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  wx.showModal({
                    title: '提示',
                    content: '简历发布成功，企业会看到您的简历',
                    showCancel: false,
                    confirmColor: "#fb4b6b",
                    success: function (res) {
                      if (res.confirm) {
                        console.log('确定')
                      } else {
                        console.log('取消')
                      }
                    }
                  })
                  // wx.showToast({
                  //   title: '简历发布成功，企业会看到您的简历',
                  //   icon: "none",
                  //   duration: 1500
                  // })
                }
                // console.log(res.data)
                else {
                  wx.reLaunch({
                    url: '../../components/center/index',
                  })
                }
              }
            })
          }else{
            wx.reLaunch({
              url: '../../components/center/index',
            })
          }
         
        }
        // console.log(res.data)
      }
    })
    },
  goToIndex(){
    wx.reLaunch({
      url: '../../components/index/index',
    })
  
  }, 
  getMyJl() {
    
    var phone = wx.getStorageSync('phone');
    var that = this
  

  },
    goToDetails(){
      wx.reLaunch({
        url: '../../components/details/index',
      })
    
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})