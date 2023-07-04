// china_ghphpt/changePassWord1/changePassWord1.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remind: '加载中',
        angle: 0,
        color: "#ff6f10", //按钮颜色
        disabled: false, //是否可以点击
        getCode: "获取验证码", //显示文字
        tel:'',
        code:'',
        getCodeN:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var id = options.id;
        this.setData({
            id: id
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    bindKeyInput1: function (e) {
        this.setData({
            code: e.detail.value
        })
    },
    sendCode: function (e) {
        var that = this;
        var tel = this.data.tel;
        if(tel == ''||tel==undefined){
            wx.showToast({
                title: '新手机号不能为空',
                icon: 'none',
                duration: 500
            })
            return false;
        } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
            wx.showToast({
                title: '手机号格式有误',
                icon: 'none',
                duration: 500
            })
            return false;
        } 
        // 获取验证码
        app.util.request({
            url: "entry/wxapp/sms",
            data: {
                mobile: tel
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    getCodeN: res.data.num
                })
            }
        })
        var times = 300
        var i = setInterval(function () {
            times--
            if (times == 0) {
                that.setData({
                    color: "#ff6f10",
                    disabled: false,
                    getCode: "获取验证码",
                })
                clearInterval(i)
            } else {
                that.setData({
                    getCode: "重新获取" + times + "s",
                    color: "#999",
                    disabled: true
                })
            }
        }, 1000)
    }, 
    submit: function(e) {
        var fromObject = e.detail.value;
        var tel = fromObject.tel;
        var code = fromObject.code;
        var id = this.data.id;
        console.log(tel + code);
        if (tel == undefined || tel.length == 0) {
            wx.showToast({
                title: '新手机号不能为空',
                icon: 'none',
                duration: 500
            })
        } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
            wx.showToast({
                title: '手机号格式有误',
                icon: 'none',
                duration: 500
            })
        }  else if (code == undefined || code.length == 0) {
            wx.showToast({
                title: '验证码不能为空',
                icon: 'none',
                duration: 500
            })
        } else if (code != this.data.getCodeN) {
            wx.showToast({
                title: '验证码错误',
                icon: 'none',
                duration: 500
            })
        } else {
            //在发起请求前，如果后端接口卡住，在此添加loading...
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "new_phone",
                    tel: tel,
                    id: id,
                },
                success: function (res) {
                    console.log('submit', res.data)
                    if (res.data.code == 1) {
                        wx.setStorageSync('phone', tel);
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 2000,
                            success: function() {
                                wx.navigateTo({
                                    url: '../mine/mine',
                                })
                            }
                        });
                    } else {
                        wx.showToast({
                            title: '修改失败',
                            icon: 'none',
                            duration: 2000,
                        });
                    }
                }
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})