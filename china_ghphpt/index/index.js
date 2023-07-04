//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 顶部轮播
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1500,
        // 通知滚动
        vertical1: true,
        indicatorDots1: false,
        autoplay1: true,
        interval1: 3000,
        duration1: 1000,
        // 广告位
        indicatorDots2: false,
        autoplay2: false,
        interval2: 1500,
        duration2: 500,
        scrollHeight: 0, //滚动高度 = 设备可视区高度 -  导航栏高度,
        goods: "", //积分推荐商品
        cityList: "",
        is_show_location: false,
        is_birthday: false,
        location_name: '定位',
        statusBarHeight: app.globalData.statusBarHeight,
        platform: app.globalData.platform,
        memberArea: wx.getStorageSync('member') ? wx.getStorageSync('member').area : null
    },
    //显示定位弹窗
    location_dw: function () {
        console.log('打开');
        this.setData({
            is_show_location: true
        })
    },

    topBubble: function () {
        console.log('关闭');
        this.setData({
            is_show_location: false
        })
    },
    chooese_city: function (e) {
        console.log(e)
        var cityname = e.currentTarget.dataset.cityname;
        var cityid = e.currentTarget.dataset.id;
        console.log('cityid', cityid)
        wx.setStorageSync('area', cityid)
        this.setData({
            is_show_location: false,
            location_name: cityname,
        })
        this.onLoad()
    },
    onShow: function () {
        // 100为导航栏swiper-tab 的高度
        this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120,
        })
    },
    onLoad: function () {
        var that = this;
  

        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "get_city",
            },
            success: function (res) {
                console.log('城市信息', res.data.data.find(item => item.id == wx.getStorageSync('area')).name)
                that.setData({
                    location_name: res.data.data.find(item => item.id == wx.getStorageSync('area')).name,
                    cityList: res.data.data,
                })
            }
        })

        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "index",
                phone: wx.getStorageSync('phone')
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    banner_1: res.data.banner_1,
                    seller_type: res.data.seller_type,
                    notice: res.data.notice,
                    member_count: res.data.member_count,
                    banner_2: res.data.banner_2,
                    coupon: res.data.coupon,
                    goods: res.data.index_goods,
                    seller: res.data.seller,
                    setting: res.data.setting,
                    activity_home: res.data.activity_home,
                    birthday_coupon: res.data.birthday_coupon
                })
                var nowDay = new Date()
                var birthday = new Date(wx.getStorageSync('birthday') ? wx.getStorageSync('birthday') : '2000-01-01')
                nowDay.setFullYear(2000)
                nowDay.setTime(nowDay.getTime() + (30 * 24 * 60 * 60 * 1000))
                birthday.setFullYear(2000)
                birthday.setHours(0)
                console.log('当前', nowDay.getTime())
                console.log('记录', birthday.getTime())
                if (birthday.getTime() >= nowDay.getTime() && wx.getStorageSync('birthday') && isObjectEmpty(that.birthday_coupon)) {
                    var is_birthday = true
                } else {
                    var is_birthday = false
                }
                that.setData({
                    is_birthday: is_birthday
                })
            }
        })
    },
    onLaunch() {
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function () {
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        })
                    })
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    businessList: function (e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../businessList/businessList?id=' + e.currentTarget.dataset.id,
        })
    },
    couponDetail: function (e) {
        console.log(e.currentTarget.dataset.id);
        var id = e.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "couponDetail",
                id: id
            },
            success: function (res) {
                console.log(res.data)
                if (res.data.code == 1) {
                    wx.navigateTo({
                        url: '../couponDetail/couponDetail?id=' + e.currentTarget.dataset.id,
                    })
                } else {
                    wx.showToast({
                        title: '该卡券已领完',
                        icon: "none",
                        duration: 1500
                    })
                }
            }
        })
    },
    businessDetail: function (e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../businessDetail/businessDetail?id=' + e.currentTarget.dataset.id,
        })
    },
    gotoLuck: function () {
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
            wx.navigateTo({
                url: '../luckDraw/luckDraw',
            })
        }
    },
    signIn: function () {
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
            wx.navigateTo({
                url: '../signIn/signIn',
            })
        }
    },
    //   领取生日券
    birthdayCoupon: function () {
        wx.navigateTo({
            url: '../BirthdayCoupon/BirthdayCoupon',
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
        // wx.reLaunch({
        //     url: '../h5Map/map',
        //   })
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

    },
    /*跳转到详情*/
    detail: function (e) {
        console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../PointsMallDetail/PointsMallDetail?id=' + e.currentTarget.dataset.id,
        })
    },
})