// china_ghphpt/h5Map/certified.js
import WxValidate from '../../../utils/WxValidate.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        profession: null,
        name: null,
        id_card: null,
        phone: null,
        professionList: [],
        professionIndex: null,
        tipShow: false,
        tipCon: '认证成功'
    },

    goMine: function () {
        this.setData({
            tipShow: false
        })
    },
    formSubmit: function (e) {
        console.log('认证', e)

        if (!this.WxValidate.checkForm(e.detail.value)) {
            const error = this.WxValidate.errorList[0]
            console.log("error_+_+_+_+" + JSON.stringify(error))
            wx.showToast({
                title: error.msg,
                icon: "none",
                duration: 800
            })
            return false
        }
        var that = this;
        wx.login({
            success: (res) => {
                console.log('login', res.code)
                // 获取openid
                app.util.request({
                    url: "entry/wxapp/index",
                    data: {
                        op: "get_openid",
                        code: res.code,
                    },
                    success: function (res) {
                        console.log('get_openid', res.data.openid)
                        // 注册
                        app.util.request({
                            url: "entry/wxapp/index",
                            data: {
                                op: "gzz_zhuce",
                                name: that.data.name,
                                id_card: that.data.id_card,
                                work_id: that.data.professionList[that.data.professionIndex].id,
                                phone: that.data.phone,
                                open_id: res.data.openid,
                                nickname: '微信用户',
                                avatar: '',
                            },
                            success: function (res) {
                                console.log('实名认证', res.data.code)
                                if (res.data.code == 1) {
                                    console.log('ok成功')

                                    that.setData({
                                        tipShow: true,
                                        tipCon: res.data.msg
                                    })
                                    // wx.showToast({
                                    //     title: res.data.msg,
                                    //     icon: "none",
                                    //     duration: 800
                                    // })
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                } else {
                                    console.log('err')
                                    that.setData({
                                        tipShow: true,
                                        tipCon: res.data.msg
                                    })
                                }
                            }
                        })
                    }
                })
            },
        })
    },
    getPhoneNumber(e) {
        console.log('手机号', e.detail.code)
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "get_phone",
                code: e.detail.code
            },
            success: function (res) {
                console.log('手机号', res.data.data.phone_info.phoneNumber)
                that.setData({
                    phone: res.data.data.phone_info.phoneNumber
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initValidate()
        var that = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "get_zhiye",
            },
            success: function (res) {
                console.log('职业', res.data.data)
                that.setData({
                    professionList: res.data.data
                })
            }
        })
    },

    initValidate() {
        const rules = {
            name: {
                required: true,
            },
            phone: {
                required: true,
                tel: true
            },
            id_card: {
                required: true,
                idcard: true
            }
        }
        const messages = {
            name: {
                required: '请输入姓名'
            },
            phone: {
                required: '请输入手机号',
                tel: '请输入正确的手机号'
            },
            id_card: {
                required: '请输入身份证号',
                idcard: '请输入正确身份证号'
            }
        }
        this.WxValidate = new WxValidate(rules, messages)
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

    }
})