// china_ghphpt/empower/empower.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onGotUserInfoBefor:function(){
    var that = this;
    if (that.data.isClick){
      that.setData({
        isClick: false

      })
      that.onGotUserInfo()
      setTimeout(function(){
        that.setData({
          isClick:true
        })
      },2000)
    }else{
      wx:wx.showToast({
        title: '请勿重复点击',
      })
    }

  },
  onGotUserInfo: function () {
    var that = this;
    // var phone = wx.getStorageSync('phone');
    console.log('登录22')
    wx.login({
      success(res) {
        console.log('登录22', res)
        if (res.code) {
          // 发起网络请求
          wx.getUserInfo({
            withCredentials: true,
            success: function (wxInfo) {
              // userInfo.wxInfo = wxInfo.userInfo, wx.setStorageSync("userInfo", userInfo)
              console.log('用户信息', wxInfo.userInfo)
              that.setData({
                getUser: true,
                avatarUrl: wxInfo.userInfo.avatarUrl
              })
              wx.setStorageSync('nickName', wxInfo.userInfo.nickName);
              wx.setStorageSync('avatarUrl', wxInfo.userInfo.avatarUrl);
              // return false
              app.util.request({
                url: "entry/wxapp/index",
                data: {
                  op: "get_openid",
                  code: res.code,
                },
                success: function (res) {
                  console.log('获取openID', res)
                  // if (res.data.code == 1) {
                    console.log(res.data)
                  wx.setStorageSync('openid', res.data.openid);
                  wx.navigateTo({
                    url: '../login/login',
                  })
                    // wx.setStorage({
                    //   key: 'key',
                    //   data: res.data.openid
                    // })

                  // } else {
                  //   wx.showToast({
                  //     icon: 'none',
                  //     title: "登录失败"
                  //   });
                  // }
                }
              })
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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