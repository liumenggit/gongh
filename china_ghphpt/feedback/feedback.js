// china_ghphpt/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      name: '商家名称11',
      id: 0
    }, {
      name: '商家名称22',
      id: 1
    }, {
      name: '商家名称33',
      id: 2
    }],
    index: 0,
    lastArea: 150
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "complaint",
      },
      success: function(res) {
        console.log('商家', res.data)
        that.setData({
          array: res.data.seller,
          setting: res.data.setting,
        })
      }
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }, // 获取输入框的值
  getDataBindTap: function(e) {
    var information = e.detail.value; //输入的内容
    console.log("information", information);
    var value = e.detail.value.length; //输入内容的长度
    var lastArea = 150 - value; //剩余字数
    var that = this;
    that.setData({
      information: information,
      lastArea: lastArea
    })
  },

  submit: function(e) {
    // 提交
    var con = this.data.information;
    console.log(con);
    // return;
    var phone = wx.getStorageSync('phone');
    var seller = this.data.array[this.data.index].title;
    if (con == '' || con == undefined) {
      wx.showToast({
        title: '反馈内容不能为空',
        icon: 'none',
        duration: 500
      })
    } else {
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "complaint_add",
          seller: seller,
          phone: phone,
          content: con,
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.code == 1) {
            // wx.setStorageSync('phone', res.data.user.phone);
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            });
          } else {
            wx.showToast({
              title: '验证失败',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })
    }
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
    }else {
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