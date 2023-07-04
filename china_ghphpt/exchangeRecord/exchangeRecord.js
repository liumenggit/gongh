const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        nomore: 0,
        coupon_record: []
    },

    onLoad: function (options) {
        this.setData({
            seller_id: options.seller_id
        });
        this.getlist()
    },


    getlist: function () {
        var that = this;
        var phone = wx.getStorageSync('phone');
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: 'coupon_list',
                phone: phone,
                seller_id: this.data.seller_id,
                page: this.data.page
            },
            success: function (res) {
                console.log(res);
                that.setData({
                  coupon_record: that.data.coupon_record.concat(res.data.coupon_list),
                    page: that.data.page + 1,
                    count: res.data.count,
                })
              console.log(that.data.coupon_record)
            }
        })
    },

    onReachBottom: function () {
        // console.log('page', this.data.page)
        // console.log(Math.ceil(this.data.count / 10))
        // console.log(this.data.coupon_record)
        if (this.data.page - 1 == Math.ceil(this.data.count / 10)) {
            this.setData({
                nomore: 1,
            })
            return false;
        }
        this.getlist()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})