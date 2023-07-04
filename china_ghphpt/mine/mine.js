// pages/mine/mine.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        member: '',
        getUser: false,
        avatarUrl: '',
        // 广告位
        indicatorDots: false,
        autoplay: true,
        interval: 1500,
        duration: 500,
        ishowTip: false,
        status: '',
        tipsAlert: "",
        banner: [{
            add_time: "1586836710",
            id: "11",
            img: "http://w720190822.oss-cn-qingdao.aliyuncs.com/ghphpt/images/c13c69baea3e635697ee86c5e7e10c71.png",
            is_show: "1",
            sort: "",
            title: "22",
            type: "1",
            uniacid: "16",
            update_time: "0",
            url: "",
            version: ''
        }]
    },
    onLoad: function () {
        var that = this;
        var openid = wx.getStorageSync('openid');
        var phone = wx.getStorageSync('phone');
        console.log(phone)
        if (openid != '' || phone != '') {
            that.setData({
                getUser: true
            })
            that.getlist(openid, phone);
        }
        // wx.getSetting({
        //   success(res) {
        //     if (res.authSetting['scope.userInfo'] == true) {
        //       wx.redirectTo({
        //         url: '../index/index',
        //       })
        //     }
        //   }
        // })
        const accountInfo = wx.getAccountInfoSync();
        console.log(accountInfo, '小程序信息')
        console.log(accountInfo.miniProgram.version, "版本号")

        that.setData({
            version: accountInfo.miniProgram.version
        })

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
        var that = this;
        var openid = wx.getStorageSync('openid');
        var phone = wx.getStorageSync('phone');
        console.log(phone)
        if (openid != '' || phone != '') {
            that.setData({
                getUser: true
            })
            that.getlist(openid, phone);
        }

    },
    onChooseAvatar(e) {
        var that = this;
        const {
            avatarUrl
        } = e.detail
        console.log('avatarUrl', e)
        var app = getApp();
        var url = app.siteInfo.siteroot + '?i=' + app.siteInfo.uniacid + '&t=' + app.siteInfo.multiid + '&v=' + app.siteInfo.version + '&from=wxapp&c=entry&a=wxapp&do=index&m=china_ghphpt&op=upload';
        this.setData({
            ['member.avatar']: avatarUrl,
        })
        wx.setStorageSync('member', that.data.member)
        wx.uploadFile({
            header: {
                'Content-Type': 'multipart/form-data',
            },
            filePath: avatarUrl,
            name: 'file',
            url: url,
            success: res => {
                var imgurl = JSON.parse(res.data).url;
                console.log('上传陈工', imgurl)

                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        op: 'change_avatar',
                        phone: that.data.member.phone,
                        avatar: imgurl
                    },
                    success: function (res) {
                        console.log('修改头像', res)

                        if (res.code == 1) {
                            that.setData({
                                ['member.avatar']: imgurl,
                            })
                            wx.setStorageSync('member', that.data.member)
                        }

                        wx.showToast({
                            icon: 'none',
                            title: res.msg,
                            duration: 3000
                        });
                    }
                })
            }
        })



        // op upload


    },
    getlist: function (openid, phone) {
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "mine",
                openid: openid,
                phone: phone,
            },
            success: function (res) {
                console.log('用户信息', res.data)
                wx.setStorageSync('birthday', res.data.member.birthday)
                wx.setStorageSync('member', res.data.member)
                that.setData({
                    member: res.data.member,
                    coupon_card_2_count: res.data.coupon_card_2_count,
                    coupon_card_2_sum: res.data.coupon_card_2_sum,
                    coupon_card_1_count: res.data.coupon_card_1_count,
                    setting: res.data.setting,
                    banner: res.data.advert,
                    phoneP: res.data.member.phone.substring(0, 3) + '****' + res.data.member.phone.substring(7)
                })
            }
        })
    },
    onGotUserInfo: function () {
        var that = this;
        var phone = wx.getStorageSync('phone');
        console.log('登录22')
        wx.login({
            success(res) {
                console.log('登录22', res)
                if (res.code) {
                    // 发起网络请求
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (wxInfo) {
                            // userInfo.wxInfo = wxInfo.userInfo, wx.setStorageSync("userInfo", userInfo)
                            console.log('用户信息', wxInfo.userInfo)
                            that.setData({
                                getUser: true,
                                avatarUrl: wxInfo.userInfo.avatarUrl
                            })
                            // return false
                            app.util.request({
                                url: "entry/wxapp/index",
                                data: {
                                    op: "empower",
                                    code: res.code,
                                    nickname: wxInfo.userInfo.nickName,
                                    avatar_img: wxInfo.userInfo.avatarUrl,
                                    phone: phone
                                },
                                success: function (res) {
                                    console.log('登录返回值', res)
                                    if (res.data.code == 1) {
                                        console.log(res.data)
                                        wx.setStorageSync('openid', res.data.openid)
                                        // wx.setStorage({
                                        //   key: 'key',
                                        //   data: res.data.openid
                                        // })

                                    } else {
                                        wx.showToast({
                                            icon: 'none',
                                            title: "登录失败",
                                            duration: 3000
                                        });
                                    }
                                }
                            })
                        },
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },

    weikaifang:function(){
        this.setData({
            status: "功能暂未开放",
            ishowTip: true,
            tipsAlert: "功能暂未开放",
        })
    },

    scan: function () {
        var that = this;
        // 扫一扫
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                console.log("code11111111", res)
                console.log(res.result);
                var code = res.result.split('&')[0].split('=')[1];
                var type = res.result.split('&')[1].split('=')[1];
                console.log(code, type);
                if (type == "coupon") {
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            op: "write_coupon",
                            code: code,
                            phone: wx.getStorageSync('phone')
                        },
                        success: function (res) {
                            var resa = res;
                            if (resa.data.code == 1) {
                                that.setData({
                                    status: "核销成功",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            } else {
                                that.setData({
                                    status: "核销失败",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            }
                        }
                    })
                } else if (type == "goods") {
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            op: "write_goods",
                            code: code,
                            phone: wx.getStorageSync('phone')
                        },
                        success: function (res) {
                            console.log('核销返回值', res)
                            if (res.data.code == 1) {
                                that.setData({
                                    status: "核销成功",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            } else {
                                that.setData({
                                    status: "核销失败",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            }
                        }
                    })
                } else if (type == "prize") {
                    app.util.request({
                        url: "entry/wxapp/index",
                        data: {
                            op: "write_activity",
                            code: code,
                            phone: wx.getStorageSync('phone')
                        },
                        success: function (res) {
                            console.log('核销返回值', res)
                            if (res.data.code == 1) {
                                that.setData({
                                    status: "核销成功",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            } else {
                                that.setData({
                                    status: "核销失败",
                                    ishowTip: true,
                                    tipsAlert: res.data.msg,
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    gotoDetial: function () {
        wx.navigateTo({
            url: '../drawList/drawList',
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
    goMine: function () {
        this.setData({
            ishowTip: false,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})