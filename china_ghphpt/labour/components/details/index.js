// china_ghphpt/labour/components/details/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadId:"",
        laodData:"",
        business_id:'',
        isPefect:false,
        desc:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        this.setData({
            loadId:options.id
        })
        this.getDetials()
        this.getMyJl()
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
  escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }).replace(/<section/g, '<div').replace(/<img/gi, '<img style="max-width:100%;height:auto" ').replace(/<u>/g, '').replace(/<u style="">/g, '').replace(/<\/u>/g, '');
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
    getDetials(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "post_info",
            user_phone: phone,
            id:that.data.loadId
        },
        success: function (res) {
            if(res.statusCode== 200){
                var introduce = that.escape2Html(res.data.data.desc)
                that.setData({
                    laodData:res.data.data,
                    desc: introduce
                })
            }
            // console.log(res.data)
        }
    })
    },
  callPhone(e){
    let phone = e.currentTarget.dataset.phone;
    // console.log(phone)
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        console.log('成功拨打电话')
      }
    })
  },
    updateDetials(e){
        var id = e.currentTarget.dataset.id

        
        this.setData({
            loadId:id
        })
        this.getDetials()
    },
  getMyJl() {
    var phone = wx.getStorageSync('phone');
    var that = this
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "my_resume",
        user_phone: phone,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.data) {
            that.setData({
              listData: res.data.data,
              isPefect:true
            })
          }

        }
        // console.log(res.data)
      }
    })

  },
    sendJl(e){
        var id = e.currentTarget.dataset.id
        var phone = wx.getStorageSync('phone');
        var that = this
        if(that.data.isPefect){
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "post_resume",
            user_phone: phone,
            id:that.data.loadId,
            post_id: id
        },
        success: function (res) {
            if(res.statusCode== 200){
                if(res.data.code == 1){
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                      })
                }
    
            }
            // console.log(res.data)
        }
    })
        } else {
            wx.navigateTo({
              url: '../../components/center/index',
            })
      }
  },
})