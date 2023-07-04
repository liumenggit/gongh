// china_ghphpt/mineIntegralCL/mineIntegralCL.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollHeight: 0, //滚动高度 = 设备可视区高度 -  导航栏高度
        array: [{
            name: '可用的',
            id: 0
        }, {
            name: '失效的',
            id: 1
        }, {
            name: '已完成',
            id: 2
        }],
        index: 0,
        curIdx: 0, // 当前导航索引
        list1: [{
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }, {
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }, {
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }, {
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }, {
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }],
        list2: [{
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }],
        list3: [{
            id: 111,
            logo: 'http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png',
            name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
            price: 123,
            sellerName: '商户名称商户名称商户名称商户名称商户名称',
            time: '2020-02-02 12:12:12'
        }]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        // 100为导航栏swiper-tab 的高度
        _this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 60,
        })
        _this.getList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    //点击切换
    clickTab: function(e) {
        var _this = this;
        this.setData({
            curIdx: e.currentTarget.dataset.current
        });
    },

    //swiper切换时会调用
    pagechange: function(e) {
        if ("touch" === e.detail.source) {
            let currentPageIndex = this.data.curIdx
            currentPageIndex = (currentPageIndex + 1) % 3
            this.setData({
                curIdx: currentPageIndex
            })
        }
    },
    // 获取列表
    getList: function(id) {
        var _this = this;
        // console.log('id', id)
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "mine_goods",
                phone: phone,
            },
            success: function(res) {
                // console.log(res.data)
                _this.setData({
                    goods_card_1: res.data.goods_card_1,
                    goods_card_2: res.data.goods_card_2,
                    goods_card_3: res.data.goods_card_3,
                    setting: res.data.setting,
                })
            }
        })
    },

    detail: function(e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '../mineIntegralCD/mineIntegralCD?id=' + e.currentTarget.dataset.id +"&type=useIntegralC",
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})