//app.js
App({
    //wx70b948dc3d56345f 开发环境
    //wxef13ba8936d25eab 正事环境
    onLaunch: function () {

        wx.getSystemInfo({
            success: (res) => {
                this.globalData.statusBarHeight = res.statusBarHeight
            }
        })
        wx.getSystemInfo({
            success:(res) => {
                console.log('pc',res.platform)
                this.globalData.platform = res.platform
            }
        })
        // this.getArea()
        //调用API从本地缓存中获取数据
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                console.log('res.hasUpdate====', res)
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
    onShow: function () {},
    onHide: function () {},
    onError: function (msg) {
        console.log(msg)
    },
    siteInfo: require("siteinfo.js"),
    util: require('we7/resource/js/util.js'),
    // nav: function (e) {
    //   var url = e.currentTarget.dataset.url;
    //   wx.redirectTo({
    //     url: url,
    //     success: function (res) { },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // },
    globalData: {
        userInfo: null,
        imgBaseUrl: "https://192.168.1.1"
    },
    getArea: function () {
        var area = wx.getStorageSync('area')
        if (!area) {
            wx.setStorageSync('area', 1)
            return new Promise((resolve, reject) => {
                this.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        op: "get_city",
                    },
                    success: function (res) {
                        // console.log('城市信息', res.data.data[0].id)
                        wx.setStorageSync('area', res.data.data[0].id)
                        return resolve(res.data.data[0].id)
                    }
                })
            })
        } else {
            return area
        }
        return Number(wx.getStorageSync('area'));
        // return 1
    }
});