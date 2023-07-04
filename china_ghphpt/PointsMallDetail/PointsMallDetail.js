// china_ghphpt/PointsMallDetail/PointsMallDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin_state: "1",//抢兑状态 1未开始 2进行中 3已结束
  },


  modalcnt: function (e) {
    var phone = wx.getStorageSync('phone');
    var openid = wx.getStorageSync('openid');
    if (openid == '') {
      wx.navigateTo({
        url: '../empower/empower',
      })
      return
    } else if (phone == '') {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    } 
    var that = this;
    console.log(that.data);
    var yhjf = that.data.yhjf;
    var integ = that.data.goods.integral;
    var phone = wx.getStorageSync('phone');
    wx.showModal({
      title: '确认兑换',
      content: '本次兑换需要消耗' + integ + '积分',
      success: function (res) {
        if (res.confirm) {
          app.util.request({
            url: "entry/wxapp/index",
            data: {
              op: "receive_goods",
              phone: phone,
              id: that.data.data_id,
            },
            success: function (res) {
              //console.log('成功')
              if (res.data.code == 1) {
                wx.showModal({
                  title: res.data.msg,
                  showCancel: false,
                  content: '商品兑换成功，请尽快到店领取',
                  success: function (res) {}
                })
              } else {
                wx.showModal({
                  title: '兑换失败',
                  showCancel: false,
                  content: res.data.msg,
                  success: function (res) {}
                })
              }
            }
          })

        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id)
    var that = this;
    var id = options.id;
    that.setData({
      data_id: options.id,
    })
    console.log(this.data.data_id)
    console.log(options.id)
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "goods_detail",
        id: id,
        // phone: phone,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          // user: res.data.user,
          goods: res.data.goods,
          data_id: options.id,
          setting: res.data.setting,
          begin_state: res.data.goods.begin_state 
        })
        // var id1 = _this.data.seller_type[_this.data.curIdx].id;
        // _this.getList(id1, 1);
      }
    })
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

    // 导航
    goto_index: function () {
        wx.reLaunch({
            url: '../index/index',
        })
    },
    goto_couponList: function () {
        wx.reLaunch({
            url: '../couponList/couponList',
        })
    },
    goto_PointsMall: function () {
        wx.reLaunch({
            url: '../PointsMall/PointsMall',
        })
    },
    goto_businessList: function () {
        wx.reLaunch({
            url: '../businessList/businessList',
        })
    },
    goto_mine: function () {
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
  gotoBusiness:function(e){
    wx.navigateTo({
      url: '../businessDetail/businessDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  gotoArticle:function(e){
    wx.navigateTo({
      url: '../article/articleDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})