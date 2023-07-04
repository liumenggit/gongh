// china_ghphpt/PointsMall/PointsMall.js
const app = getApp()
var fromtData = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lzy start
    isfalse:false,
    clock:'',
    goodsList:'',
    advert:false,
    imgUrls:[],
    links:[],
    advertAutoPlay:true,
    total_micro_second:'',//倒计时时间
    count_type:0, // 倒计时是否显示
    timer:null,
    isShowSwaper:false, // 是否显示分类
    // lzy end
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1500,
    curIdx: '', // 当前导航索引
    pageN: 1, //当前页数
    scrollHeight: 0, //滚动高度 = 设备可视区高度 -  导航栏高度
    picer: 523,
    picers_list: [{
        img: "https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/tp.jpg",
        title: "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        picer: "699",
      },
      {
        img: "https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/tp.jpg",
        title: "2标题标题标题标题",
        picer: "2365",
      }

    ], // 内容区列表
    businessList: [],
    seller: [],
    searchContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var phone = wx.getStorageSync('phone');
    // that.checkLoginStatus()
    that.getList() 
    // countdown(this);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 100为导航栏swiper-tab 的高度
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120-100,
    })
  },
  // checkLoginStatus:function(){
  //   var that = this
  //   var phone = wx.getStorageSync('phone');
  //   var openid = wx.getStorageSync('openid');
  //   console.log(phone)
  //   if (openid == '') {
  //     wx.navigateTo({
  //       url: '../empower/empower',
  //     })
  //     return
  //   } else if (phone == '') {
  //     wx.navigateTo({
  //       url: '../login/login',
  //     })
  //     return
  //   }
  //   that.getList() 
  // },
  // 获取列表
  getList: function() {
    console.log('getList')
    var _this = this;
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "goods_list",
      },
      success: function(res) {
        
        if (res.data.goods_category.length < 1){
          return
        }

        // console.log(res.data)
        var sellerList = res.data.seller;
        //初始导航菜单加默认第一个选中
        if (_this.data.curIdx == ''){
          _this.setData({
            curIdx: res.data.goods_category[0].goca_id,
          })
        }
        //判定抽奖弹框

        if (res.data.activity_pop && res.data.activity_pop!='' ){
          _this.setData({
            isfalse:true
          })
        }else{
          _this.setData({
            isfalse: false
          })
        }
        var temp = res.data.advert;
        if (temp.length >1){
          var imgArr = [], urlArr = [];
          for (var i = 0; i < temp.length; i++) {
            imgArr.push(temp[i].img);
            urlArr.push(temp[i].url)
          }
          _this.setData({
            imgUrls: imgArr, 
            links: urlArr,
            isShowSwaper:true,
          })
        }else{
          _this.setData({
            isShowSwaper: true,
          })
        }

        var time =  _this.getTime()
        _this.setData({
          goodsList: res.data,
          goods: res.data.goods_category[0].goods_list,
          total_micro_second: res.data.goods_category[0].goca_begin_time - time,
          setting: res.data.setting,
          scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 100,
        })
        if (_this.data.total_micro_second < 0 ){
          _this.setData({
            count_type: 0,
            scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 100,
          })
        }
        if (res.data.goods_category[0].goca_type == 2){
          if (_this.data.total_micro_second > 0){
            clearTimeout(_this.data.timer)
            _this.setData({
              count_type: 2,
              scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 150,
            })
            countdown(_this);
          }else{
            _this.setData({
              count_type: 1,
              scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 100,
            })
          }
        }
      }
    })
  },
 getTime:function(){
   var time = fromtData.formatTime(new Date())
   var sjc = new Date(time.replace(/-/g, "/")).getTime()/1000
   return sjc
 },
  signIn: function() {
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
  details: function() {
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
        url: '../Details/Details',
      })
    }
  },
  //点击切换
  clickTab: function(e) {
    var _this = this;
    clearTimeout(_this.data.timer)
    this.setData({
      curIdx: e.currentTarget.dataset.current,
      // pageN: 1
    });
    var id1 = e.currentTarget.dataset.current; 
    var temp = _this.data.goodsList.goods_category
    var time = _this.getTime()
    for (var i = 0; i < temp.length;i++ ){
      if (temp[i].goca_id == id1){
          _this.setData({
            goods: temp[i].goods_list,
            total_micro_second: temp[i].goca_begin_time - time
          })
          
        if (temp[i].goca_type == 2){
          if (_this.data.total_micro_second <0){
            _this.setData({
              count_type: 0,
              scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 150,
            })
            countdown(_this);
          }
        }else{
          _this.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 120 - 100,
            count_type: 2
          })
        }
      }
    }

  },
  /*跳转到详情*/
  detail: function(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../PointsMallDetail/PointsMallDetail?id=' + e.currentTarget.dataset.id,
    })
  },




  // 导航
  goto_index: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  goto_couponList: function() {
    wx.reLaunch({
      url: '../couponList/couponList',
    })
  },
  goto_PointsMall: function() {
    wx.reLaunch({
      url: '../PointsMall/PointsMall',
    })
  },
  goto_businessList: function() {
    wx.reLaunch({
      url: '../businessList/businessList',
    })
  },
  goto_mine: function() {
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
  onShareAppMessage: function() {

  },
  /*lzy start*/ 
  close_stock:function(){
    this.setData({
      isfalse: false
    });
  },
  cound_second:function(){
   
  },
  go_luckDraw:function(){
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
 /*lzy end*/
})
/*lzy start*/ 
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
// var total_micro_second = 1000* 100;
/* 毫秒级倒计时 */
function countdown(that) {
  // 渲染倒计时时钟
  var temp = dateformat(that.data.total_micro_second*1000)
  that.setData({
    clock: temp
  });

  if (that.data.total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
    });
    // timeout则跳出递归
    return;
  }
  
  var time = setTimeout(function () {
    // 放在最后--
    that.setData({
      total_micro_second: that.data.total_micro_second -= 1
    })
    // that.data.total_micro_second -= 10;
   countdown(that);
  }
    , 1000)
  that.setData({
    timer: time
  }) 

}
// 时间格式化输出，如3:25:19 86。每10ms都会调用一次
function dateformat(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60);
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  // return hr + ":" + min + ":" + sec + " " + micro_sec;
  return {
    hr: hr,
    min: min,
    sec: sec,
  }
}
/*lzy end*/
