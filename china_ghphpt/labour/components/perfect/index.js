// china_ghphpt/labour/components/perfect/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadId:'',
        listData:"",
        showIdCard:false,
        adressArr:[],
        adressIndex:"0",
        eduArr:"",
        eduIndex:'0',
        sxArr: '',
        sxIndex:'0',
        syIndex:"0",
        date:"请选择",
        workLong:['请选择','1年','两年','三年','5年','十年'],
        isifHas:['请选择','是', '否'],
        name:"",
        phone:"",
        experience:"",
        idCard:"",
        sex:"0",
        school:""
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            loadId:options.id
        })
        this.getJlDetials()
      this.getFromData()
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
    bindDateChange: function(e) {
        this.setData({
          date: e.detail.value
        })
      },
    bindPickerChangeEdu(e){
      this.setData({
        eduIndex: e.detail.value
      })
    },
      bindPickerChange1: function(e) {
          if(e.detail.value == 1){
              this.setData({
                showIdCard:true
              })
          }else{
            this.setData({
                showIdCard:false
              })
          }
        this.setData({
          sxIndex: e.detail.value,
          
        })
      },
  bindPickerChangeSy: function(e) {
      this.setData({
        syIndex: e.detail.value,
        
      })
    },
  bindPickerAdressChange:function(e){
    this.setData({
      adressIndex: e.detail.value,

    })
  },
    bindPickerChange3: function(e) {
        this.setData({
          index3: e.detail.value,
          
        })
      },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getSchool(e){
    this.setData({
      school: e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getexperience(e){
    this.setData({
      experience: e.detail.value
    })
  },
  getIdcard(e){
   this.setData({
     idCard: e.detail.value
    })
  },
  choseSex(e){
    var type = e.currentTarget.dataset.type
    this.setData({
      sex_: type
    })
  },
  saveJl(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "add_resume",
            user_phone: phone,
            name:that.data.name,
            address: Number(that.data.adressIndex)+1,
            phone: that.data.phone,
            birthday:that.data.date,
            edu: Number(that.data.eduIndex)+1,
            experience: that.data.experience,
            is_sy: that.data.syIndex,
            sx: Number(that.data.sxIndex)+1,
             id_card: that.data.idCard,
             sex:that.data.sex_,
           school: that.data.school
        },
        success: function (res) {
            if(res.statusCode== 200){
                  wx.showToast({
                    title: "保存成功",
                    icon: "none",
                    duration: 1500
                  })
              wx.reLaunch({
                url: '../../components/center/index',
              })
            }
            // console.log(res.data)
        }
    })
      },
      getFromData(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
          url: "entry/wxapp/index",
          data: {
            op: "resume_form",
            user_phone: phone,
          },
          success: function (res) {
            if (res.statusCode == 200) {
              if (res.data.code == 1) {
                var adressArr_ =[]
                var eduArr_=[]
                var sxArr_=[]
                for (var i = 0; i < res.data.data.city.length;i++){
                  adressArr_.push(res.data.data.city[i].title)
                }
                for (var i = 0; i < res.data.data.edu.length; i++) {
                  eduArr_.push(res.data.data.edu[i].title)
                }
                for (var i = 0; i < res.data.data.sx.length; i++) {
                  sxArr_.push(res.data.data.sx[i].title)
                }
                that.setData({
                  adressArr: adressArr_,
                  eduArr: eduArr_,
                  sxArr: sxArr_
                })
              }

            }
            // console.log(res.data)
          }
        })
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
    getJlDetials(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "resume_info",
            user_phone: phone,
            id:that.data.loadId,
            post_id: that.data.loadId
        },
        success: function (res) {
            if(res.statusCode== 200){
                if(res.data.code == 1){
                  if (res.data.data.sx == '2'){
                    that.setData({
                      showIdCard:true
                    })
                  }else{
                    that.setData({
                      showIdCard: false
                    })
                  }
                  that.setData({
                    listData:res.data.data,
                    name: res.data.data.name,
                    phone: res.data.data.phone,
                    sex_: res.data.data.sex,
                    experience: res.data.data.experience,
                    adressIndex: res.data.data.address-1,
                    eduIndex: res.data.data.edu-1,
                    sxIndex: res.data.data.sx - 1,
                    syIndex: res.data.data.is_sy,
                    school: res.data.data.school,
                    date:res.data.data.birthday?res.data.data.birthday:"请选择",
                    idCard: res.data.data.id_card,
                  })
                }
    
            }
            // console.log(res.data)
        }
    })
    },
})