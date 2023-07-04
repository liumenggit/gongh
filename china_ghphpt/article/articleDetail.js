// china_ghphpt/article/articleDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",//文章id
    results:null,
    setting:null,
    url:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      id: id
    })
    this.getArticleData()
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

  },

	previewImage:function(e){
		var cur=e.target.dataset.src;//获取本地一张图片链接
		wx.previewImage({
			  current: cur, //字符串&#xff0c;默认显示urls的第一张
  			urls: [cur] // 数组&#xff0c;需要预览的图片链接列表
		})
	},
  getArticleData:function(){
    var that = this;
    var phone = wx.getStorageSync('phone');
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "article_detail",
        id: that.data.id,
        phone: phone,
      },
      success: function (res) {
        that.setData({
          results: res.data.article,
          setting: res.data.setting

        })
      }
    })
  }
})