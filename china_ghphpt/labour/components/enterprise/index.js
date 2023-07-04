// china_ghphpt/labour/components/enterprise/index.js
const app = getApp()
Page({


    /**
     * 页面的初始数据
     */
    data: {
      hyarr:[],
      hyIndex:'0',
      xzArr:"",
      xzIndex:"0",
      gmArr:"",
      gmIndex:"0",
      cityArr:"",
      cityIndex:"0",
      ghIndex:"0",
      ghArr:['请选择','是','否'],
      title:"",
      people:'',
      phone:'',
      telPhone:"",
      decs:"",
      moreMess:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getFrom()
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
    choseHy(e){
      this.setData({
        hyIndex: e.detail.value
      })
    },
  choseXz(e) {
    this.setData({
      xzIndex: e.detail.value
    })
  },
  chosecity(e){
    this.setData({
      cityIndex: e.detail.value
    })
  },
  choseGm(e) {
    this.setData({
      gmIndex: e.detail.value
    })
  },
  creatGh(e){
    this.setData({
      ghIndex: e.detail.value
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      people: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getTelPhone(e) {
    this.setData({
      telPhone: e.detail.value
    })
  },
  getDecs(e) {
    this.setData({
      decs: e.detail.value
    })
  },
  getMore(e) {
    this.setData({
      moreMess: e.detail.value
    })
  },
    getFrom(){
      var phone = wx.getStorageSync('phone');
      var that = this
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "add_business_form",
          user_phone: phone,
        },
        success: function (res) {
          if (res.statusCode == 200) {
            var hyarr_=[]
            var xzArr_ = []
            var gmArr_ = []
            var cityArr_=[]
            for (var i = 0; i < res.data.data.hy.length;i++){
              hyarr_.push(res.data.data.hy[i].title)
            }
            for (var i = 0; i < res.data.data.xz.length; i++) {
              xzArr_.push(res.data.data.xz[i].title)
            }
            for (var i = 0; i < res.data.data.gm.length; i++) {
              gmArr_.push(res.data.data.gm[i].title)
            }
            for (var i = 0; i < res.data.data.city.length; i++) {
              cityArr_.push(res.data.data.city[i].title)
            }
            that.setData({
              hyArr: hyarr_,
              xzArr: xzArr_,
              gmArr: gmArr_,
              cityArr: cityArr_,

            })
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: "none",
            //   duration: 1500
            // })
          }
          // console.log(res.data)
        }
      })
    },
    getmessage(){
      var phone = wx.getStorageSync('phone');
      var that = this
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "get_business",
          user_phone: phone,
          title: that.data.title,
          hy_id: Number(that.data.hyIndex) + 1,
          xz_id: Number(that.data.xzIndex) + 1,
          gm_id: Number(that.data.gmIndex) + 1,
          address: Number(that.data.cityIndex) + 1,
          people: that.data.name,
          phone: that.data.phone,
          telPhone: that.data.telPhone,
          desc: that.data.decs,
          moreMess: that.data.moreMess,
          is_gh: Number(that.data.ghIndex)+1
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 1500
            })
          }
        }
      })
    },
    sendCheck(){
      var phone = wx.getStorageSync('phone');
      var that = this
      if (that.data.title == ''){
        wx.showToast({
          title: '请填写企业名称',
          icon: "none",
          duration: 1500
        })
        return
      }
      if (that.data.phone == '') {
        wx.showToast({
          title: '请输入联系人电话',
          icon: "none",
          duration: 1500
        })
        return
      }
      if (that.data.name == '') {
        wx.showToast({
          title: '请输入联系人姓名',
          icon: "none",
          duration: 1500
        })
        return
      }
      // if (that.data.telPhone == '') {
      //   wx.showToast({
      //     title: '请输入联系固定电话',
      //     icon: "none",
      //     duration: 1500
      //   })
      //   return
      // }
      if (that.data.decs == '') {
        wx.showToast({
          title: '请输入企业简介',
          icon: "none",
          duration: 1500
        })
        return
      }
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "add_business",
          user_phone: phone,
          title: that.data.title,
          hy_id: Number(that.data.hyIndex)+1,
          xz_id: Number(that.data.xzIndex)+1,
          gm_id: Number(that.data.gmIndex)+1,
          address: Number(that.data.cityIndex)+1,
          people: that.data.people,
          phone: that.data.phone,
          tel: that.data.telPhone,
          desc: that.data.decs,
          infomation: that.data.moreMess,
          is_gh: that.data.ghIndex
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 1500
            })
            wx.navigateTo({
              url: '../../components/center/index',
            })

          }
        }
      })
      
    },
})