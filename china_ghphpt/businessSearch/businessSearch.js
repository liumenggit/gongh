// china_ghphpt/businessSearch/businessSearch.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageN:1,
        businessList:[],
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var businessSearch = options.con;
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "seller_search",
                title:businessSearch,
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    seller: res.data.seller,
                    title: businessSearch,
                    setting: res.data.setting,
                })
            }
        })
        // console.log(businessSearch)
        // this.getList(businessSearch);
    },

    bindKeyInput: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    search: function (e) {
        const con = this.data.title;
        if (con != '' && con != undefined) {
            var that = this;
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "seller_search",
                    title: con,
                },
                success: function (res) {
                    console.log(res.data)
                    that.setData({
                        seller: res.data.seller,
                    })
                }
            })
        } else {
            wx.showToast({
                title: '搜索内容不能为空',
                icon: 'none',
                duration: 2000
            })
        }
    },
    detail: function (e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../businessDetail/businessDetail?id=' + e.currentTarget.dataset.id,
        })
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
          } else {
            wx.reLaunch({
                url: '../mine/mine',
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})