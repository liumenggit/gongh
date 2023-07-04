// china_ghphpt/labour/components/center/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:"",
         isReady:false,
         alertMessage:"",
        isGo:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getMyJl()
        this.get_business()
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
    gotoReleses(){
        wx.navigateTo({
            url: '../../components/releases/index',
        })
    },
  gotoReadySend(){
    wx.navigateTo({
      url: '../../components/realdySend/index',
    })
  },
    gotoReady(){
        wx.navigateTo({
            url: '../../components/readyRelease/index',
        })
    },
    gotoEnterprise(){
      
      if (!this.data.isReady){
        if(this.data.isGo){
          wx.navigateTo({
            url: '../../components/enterprise/index',
          })
        }else{
          wx.showToast({
            title: this.data.alertMessage,
            icon: "none",
            duration: 1500
          })
        }
      }else{
        wx.showToast({
          title: this.data.alertMessage,
          icon: "none",
          duration: 1500
        })
      }

    },
    gotoRerfect(e){
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../../components/perfect/index?id='+id,
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    getMyJl(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "my_resume",
            user_phone: phone,
        },
        success: function (res) {
            if(res.statusCode== 200){
              if (res.data.data){
                that.setData({
                  listData: res.data.data
                })
              }

            }
            // console.log(res.data)
        }
    })

    },
    get_business(){
      var phone = wx.getStorageSync('phone');
      var that = this
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "get_business",
          user_phone: phone,
        },
        success: function (res) {
          
          if (res.statusCode == 200) {
            if (res.data.code == '0'){
                that.setData({
                  isReady: false,
                  isGo:true
                })
            }
            if (res.data.code == '1'){
              if (res.data.data.status == 3 ) {
                that.setData({
                  isReady: false,
                  alertMessage:"正在等待审核",
                  isGo: false

                })
              }
              if (res.data.data.status == 1){
                that.setData({
                  isReady: true,
                  alertMessage: "已认证",
                  isGo: false
                })
              }
              if (res.data.data.status == 2) {
                that.setData({
                  isReady: false,
                  alertMessage: "审核未通过,请联系管理员",
                  isGo: false
                })
              }
            }
     
          }
          // console.log(res.data)
        }
      })
    },
})