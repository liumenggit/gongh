// china_ghphpt/useIntegralC/useIntegralC.js
import drawQrcode from '../../resource/js/weapp.qrcode.js'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      type:"",// 区分来源
      id:"",
      cardNumber:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var type = options.type;
      
      this.setData({
        type: type,
        id:id
      })
      this.getEwm()
       

    },
    getEwm:function(){
      var that = this 
      var phone = wx.getStorageSync('phone');
      if (that.data.type == 'prize') {
        wx.setNavigationBarTitle({
          title: '抽奖礼品',
        })
        var temp = {
          op: 'prize_ewm',
          acca_id: that.data.id,
          phone: phone
        }
      }
      if (that.data.type == 'useIntegralC') {
        wx.setNavigationBarTitle({
          title: '二维码',
        })
        var temp = {
          op: 'goods_ewm',
          id: that.data.id,
          phone: phone
        }
      }
      
      app.util.request({
        url: "entry/wxapp/index",
        data: temp,
        success: function (res) {
          if (that.data.type == 'useIntegralC'){
            that.setData({
              goods_card: res.data.goods_card,
              cardNumber: res.data.goods_card.card_number
            })

            drawQrcode({
              width: 150,
              height: 150,
              canvasId: 'myQrcode',
              // text: res.data.coupon.id
              text: 'code=' + res.data.goods_card.card_number + '&type=goods'
            })
          }
          if (that.data.type == 'prize') {
            that.setData({
              goods_card: res.data.prize_card,
              cardNumber: res.data.prize_card.acca_number
            })

            drawQrcode({
              width: 150,
              height: 150,
              canvasId: 'myQrcode',
              // text: res.data.coupon.id
              text: 'code=' + res.data.prize_card.acca_number + '&type=prize'
            })
          }
        }
      })
    },
    back: function () {
        wx.navigateTo({
            url: '../mineIntegralCL/mineIntegralCL',
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})