// china_ghphpt/changePassWord/changePassWord.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'',
        tel:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bindKeyInput: function (e) {
        this.setData({
            name: e.detail.value
        })
    },

    bindKeyInput1: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    submit: function (e) {
        var fromObject = e.detail.value;
        var name = fromObject.name;
        var tel = fromObject.tel;
        console.log(name + tel);
        if (name == undefined || name.length == 0) {
            wx.showToast({
                title: '用户名不能为空',
                icon: 'none',
                duration: 500
            })
        } else if (tel == undefined || tel.length == 0) {
            wx.showToast({
                title: '原手机号不能为空',
                icon: 'none',
                duration: 500
            })
        } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
            wx.showToast({
                title: '手机号格式有误',
                icon: 'none',
                duration: 500
            })
        }else {
            //在发起请求前，如果后端接口卡住，在此添加loading...
            app.util.request({
                url: "entry/wxapp/index",
                data: {
                    op: "edit_phone",
                    name: name,
                    tel: tel,
                },
                success: function (res) {
                    console.log('submit', res.data)
                    if (res.data.code == 1) {
                        // wx.setStorageSync('phone', res.data.user.phone);
                        wx.showToast({
                            title: '验证正确',
                            icon: 'success',
                            duration: 2000,
                            success: function () {
                                wx.navigateTo({
                                    url: '../changePassWord1/changePassWord1?id='+res.data.user,
                                })
                            }
                        });
                    } else {
                        wx.showToast({
                            title: '验证失败',
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