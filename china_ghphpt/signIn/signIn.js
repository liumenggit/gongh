// china_ghphpt/signIn/signIn.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showText: '签到成功',
    isSignIn: true,
    days: [1, 2, 3, 4, 5, 6, 7],
    click: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // var openid = wx.getStorageSync('openid');
    var phone = wx.getStorageSync('phone');
    // console.log(openid)
    // if (openid != '' || phone != '') {
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "sign",
        // openid: openid,
        phone: phone,
      },
      success: function(res) {
        console.log('用户签到', res.data)
        that.setData({
          member: res.data.user,
          integral: res.data.integral,
          setting: res.data.setting,
          isSignIn: res.data.user.is_sign
        })
        if (res.data.user.is_sign == false){
          that.setData({
            click:0
          })
        }
      }
    })
    // };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 签到
  signIn: function() {
    var that = this;
    if (that.data.click == 0) {
      that.setData({
        click: 1,
        istoday: true
      })
      var phone = wx.getStorageSync('phone');
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "add_sign",
          // openid: openid,
          phone: phone,
        },
        success: function(res) {
          console.log('签到', res.data)
          if (res.data.code == 1) {
            that.setData({
              show: true,
              showText: "签到积分+" + res.data.integral,
            })
            wx.reLaunch({
              url: '../signIn/signIn',
            })
          } else {
            wx.showToast({
              title: '签到失败',
              icon: 'none',
              duration: 2000,
            });

            that.setData({
              click: 0,
              istoday: false
            })
          }
        }
      })
    }
  },
  signN: function() {
    wx.showToast({
      icon: 'none',
      title: "今天已经签过到了哦~"
    });
  },
  close: function(e) {
    var that = this;
    that.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  // 导航
  goto_index: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  goto_couponList: function() {
    wx.reLaunch({
      url: '../couponList/couponList',
    })
  },
  goto_PointsMall: function() {
    wx.reLaunch({
      url: '../PointsMall/PointsMall',
    })
  },
  goto_businessList: function() {
    wx.reLaunch({
      url: '../businessList/businessList',
    })
  },
  goto_mine: function() {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }


})