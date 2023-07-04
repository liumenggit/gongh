// china_ghphpt/labour/components/releases/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      title:"",
      treatment:"",
      treatmentIndex:"0",
      desc:"",
      phone:"",
      adressArr:"",
      adressIndex:"0",
      hyarr: [],
      hyIndex: '0',
      eduArr:[],
      eduIndex:"0",
      nums:"1",
      sexIndex:"0",
      sexArr:['男','女','不限制'],
      experience:""

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

  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  choseSex(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  chosecity(e){
       this.setData({
         adressIndex: e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getNums(e){
    this.setData({
      nums: e.detail.value
    })
  },
  getexperience(e) {
    this.setData({
      experience: e.detail.value
    })
  },
  chosetreatment(e){
    this.setData({
      treatmentIndex: e.detail.value
    })
  },
  choseEdu(e) {
    this.setData({
      eduIndex: e.detail.value
    })
  },
  
  choseHy(e) {
    this.setData({
      hyIndex: e.detail.value
    })
  },
  getFrom(){
    var phone = wx.getStorageSync('phone');
    var that = this
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "add_post_form",
        user_phone: phone,
      },
      success: function (res) {
        
        if (res.statusCode == 200) {
          var treatment_ = []
          var adressArr_=[]
          var hyarr_=[]
          var eduArr_=[]
          for (var i = 0; i < res.data.data.treatment.length; i++) {
            treatment_.push(res.data.data.treatment[i].title)
          }
          for (var i = 0; i < res.data.data.city.length; i++) {
            adressArr_.push(res.data.data.city[i].title)
          }
          for (var i = 0; i < res.data.data.hy.length; i++) {
            hyarr_.push(res.data.data.hy[i].title)
          }
          for (var i = 0; i < res.data.data.edu.length; i++) {
            eduArr_.push(res.data.data.edu[i].title)
          }
          that.setData({
            treatment: treatment_,
            adressArr: adressArr_,
            hyarr:hyarr_,
            eduArr: eduArr_
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
  sendFrom(){
    var phone = wx.getStorageSync('phone');
    var that = this
    if (that.data.adressIndex == 0){
      var city = 1
    }else{
      var city = Number(that.data.adressIndex) +1
    }
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "add_post",
        user_phone: phone,
        title:that.data.title,
        treatment: Number(that.data.treatmentIndex)+1,
        desc:that.data.desc,
        // user_phone:that.data.phone,
        edu:Number(that.data.eduIndex)+1,
        hy_id:Number(that.data.hyIndex)+1,
        experience: that.data.experience,
        nums:that.data.nums,
        sex:Number(that.data.sexIndex)+1,
        address: city
      },
      success: function (res) {

        if (res.statusCode == 200) {
   
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1500
          })
          if (res.data.code == 1) {
            setTimeout(function () {
              wx.reLaunch({
                url: '../../components/center/index',
              })
            }, 1000)
          }
     
      
        }
        // console.log(res.data)
      }
    })
  },
})