// china_ghphpt/couponList/couponList.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    array1: [{
      name: '全部卡券类型',
      id: 0
    }, {
      name: '长期优惠券',
      id: 1
    }, {
      name: '限时折扣券',
      id: 2
    }],
    index1: 0,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: 'coupon',
      },
      success: function(res) {
        console.log(res);
        var sellerTL = [{
          name: '全部商家类型',
          id: 0
        }];
        sellerTL = sellerTL.concat(res.data.seller_type)
        console.log(sellerTL);
        that.setData({
          coupon: res.data.coupon,
          array: sellerTL,
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
    this.getList();
  },
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    this.getList();
  },
  getList: function(e) {
    var that = this;
    var index = that.data.array[that.data.index].id;
    var index1 = that.data.array1[that.data.index1].id;
    console.log(index, index1)
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: 'coupon',
        type: index1,
        seller_type: index
      },
      success: function(res) {
        console.log(res);
        that.setData({
          coupon: res.data.coupon,
          // seller_type: res.data.seller_type,
        })

      }
    })
  },
  couponDetail: function(e) {
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "couponDetail",
        id: id
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          wx.navigateTo({
            url: '../couponDetail/couponDetail?id=' + e.currentTarget.dataset.id,
          })
        } else {
          wx.showToast({
            title: '该卡券已领完',
            icon: "none",
            duration: 1500
          })
        }
      }
    })
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