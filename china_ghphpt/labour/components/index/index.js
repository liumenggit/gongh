// china_ghphpt/labour/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData:'',
        arry1:['地点'],
        arry2:["行业"],
        arry3:["薪资"],
        index1:"0",
        index2:"0",
        index3:"0",
        keyword:"",
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getlist()
        this.getTabList()
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
    gotoDetial(e){
        var id = e.currentTarget.dataset.id

        wx.navigateTo({
            url: '../../components/details/index?id='+id,
          })
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
  getAll(){
    this.setData({
      index1:"0",
      index2:"0",
      index3:"0"
    })
    this.getlist()
  },
    getlist(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "post_list",
            user_phone: phone,
            hy: Number(that.data.index2),
            address: Number(that.data.index1),
            treatment: Number(that.data.index3),
            keyword:that.data.keyword

        },
        success: function (res) {
            if(res.statusCode== 200){
                that.setData({
                    listData:res.data.data
                })
            }
            // console.log(res.data)
        }
    })
},
  searchVal(e){
    this.setData({
      keyword: e.detail.value
    })
   
  },
    getTabList(){
        var phone = wx.getStorageSync('phone');
        var that = this
        app.util.request({
        url: "entry/wxapp/index",
        data: {
            op: "post_list_form",
            user_phone: phone,
        },
        success: function (res) {
            if(res.statusCode== 200){
                var  addressArr = []
                var  hyArr = []
                var  treatmentArr = []
                for(var i=0;i<res.data.data.address.length;i++){
                    addressArr.push(res.data.data.address[i].title)
                }
                for(var i=0;i<res.data.data.hy.length;i++){
                    hyArr.push(res.data.data.hy[i].title)
                }
                for(var i=0;i<res.data.data.treatment.length;i++){
                    treatmentArr.push(res.data.data.treatment[i].title)
                }
               addressArr.unshift("工作地点")
               hyArr.unshift("工作要求")
               treatmentArr.unshift("薪酬范围")

                that.setData({
                    arry1: addressArr ,
                    arry2:hyArr,
                    arry3:treatmentArr,
                })
            }
            // console.log(res.data)
        }
    })
    },
    bindPickerChange1: function(e) {
        this.setData({
          index1: e.detail.value,
        })
        this.getlist()

      },
      bindPickerChange2: function(e) {
        this.setData({
          index2: e.detail.value
        })
        this.getlist()
      },
      bindPickerChange3: function(e) {
        this.setData({
          index3: e.detail.value
        })
        this.getlist()
      },
    search(){
      this.getlist()
    }
})