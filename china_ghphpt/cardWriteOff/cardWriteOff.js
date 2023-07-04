// china_ghphpt/writeOff/writeOff.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {

        page: '',
        Loading: false,
        isLogin: false,
        radioCheckVal: 0, //收益占比单选
        date: '开始时间', //收益占比时间段起始时间
        date2: '结束时间', //收益占比时间段终止时间

        array: [{
                name: '优惠券类型',
                id: 0
            },
            {
                name: '长期优惠券',
                id: 1
            },
            {
                name: '限时折扣券',
                id: 2
            }
        ],
        index: 0,
        dateNow: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        this.setData({
            dateNow: util.formatTime(new Date())
        });
        // var id = options.id;
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'write_list',
                phone: phone,
            },
            success: function(res) {
                console.log(res);
                that.setData({
                    coupon_record: res.data.coupon_record,
                    coupon_record_count: res.data.coupon_record_count,
                    coupon_record_sum: res.data.coupon_record_sum,
                })
            }
        })
    },
    // 收益占比时间段选择
    bindDateChange(e) {
        let that = this;
        console.log(e.detail.value)
        that.setData({
            date: e.detail.value,
            radioCheckVal: 0,
        })
    },
    bindDateChange2(e) {
        let that = this;
        that.setData({
            date2: e.detail.value,
            radioCheckVal: 0,
        })
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    search: function(e) {
        var that = this;
        var start = this.data.date;
        var end = this.data.date2;
        var index = this.data.index;

        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'write_list',
                start: start,
                end: end,
                type: index,
                phone: phone,
            },
            success: function(res) {
                console.log(res);
                that.setData({
                    coupon_record: res.data.coupon_record,
                    coupon_record_count: res.data.coupon_record_count,
                    coupon_record_sum: res.data.coupon_record_sum,
                })

            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})