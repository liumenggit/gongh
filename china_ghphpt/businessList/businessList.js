// china_ghphpt/businessList/businessList.js
var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1500,
    curIdx: 0, // 当前导航索引
    pageN: 1, //当前页数
    scrollHeight: 0, //滚动高度 = 设备可视区高度 -  导航栏高度
    list: [], // 内容区列表
    latitude: '',
    longitude: '',
    address: '',
    businessList: [],
    seller: [],
    searchContent: '',
    seller_type:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.getLoca();
    // var id = 0;
    console.log(options.id)
    if (options.id != '' && options.id != undefined) {
      this.setData({
        curIdx: options.id
      });
    }
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GNLBZ-ZLPKI-PGAGE-5UPVE-2UYCZ-AKFUM'
    });
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "seller_type",
      },
      success: function(res) {
        console.log(res.data)
        _this.setData({
          seller_type: res.data.seller_type,
          setting: res.data.setting,
        })
        var id1 = _this.data.seller_type[_this.data.curIdx].id;
        _this.getList(id1, 1);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 100为导航栏swiper-tab 的高度
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 160,
    })
  },
  // 获取列表
  getList: function(id, page) {
    var _this = this;
    console.log('id', id)
    console.log('page', page)
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "seller",
        id: id,
        page: page,
      },
      success: function(res) {
        // console.log("seller",res.data)
        var sellerList = res.data.seller;
        if (sellerList.length > 0) {
          for (var i = 0; i < sellerList.length; i++) {
            _this.calculateLoca(sellerList[i].x, sellerList[i].y, i, function(i, j) {
              sellerList[i].range = j.toString();
              _this.setData({
                seller: sellerList,
              })
            })
          }
          _this.setData({
            seller: sellerList,
          })
          console.log("sellerList1", sellerList);
        } else {
          console.log("sellerList2", sellerList);
          _this.setData({
            seller: sellerList,
          })
        }
      }
    })
  },
  // 获取更多
  getListMore: function(id, page) {
    var _this = this;
    // console.log('id', id)
    // console.log('page', page)
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "seller",
        id: id,
        page: page,
      },
      success: function(res) {
        // console.log(res.data)
        if (res.data.seller.length == 0) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
          })
        } else {
          var arra1 = _this.data.seller.concat(res.data.seller);
          // console.log("arra1", arra1);
          _this.setData({
            seller: arra1,
          })
        }
      }
    })
  },
  getUserLocation: function() {
    let vm = this
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        // 拒绝授权后再次进入重新授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
          wx.showModal({
            title: '',
            content: '需要获取你的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none'
                })
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    // console.log('dataAu:success', dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      //再次授权，调用wx.getLocation的API
                      vm.getLoca()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                      setTimeout(() => {
                        wx.navigateBack()
                      }, 1500)
                    }
                  }
                })
              }
            }
          })
        }
        // 初始化进入，未授权
        else if (res.authSetting['scope.userLocation'] == undefined) {
          // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLoca(res)
        }
        // 已授权
        else if (res.authSetting['scope.userLocation']) {
          // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLoca(res)
        }
      }
    })
  },
  // 获取当前定位
  getLoca: function(e) {
    // console.log(111);
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("getLocation:", res);
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        // 反编译当前定位经纬度
        _this.reverseLoca(res.latitude, res.longitude);
        var id1 = _this.data.seller_type[_this.data.curIdx].id;
        _this.getList(id1, 1);
      }
    })
  },
  // 反编译当前经纬度
  reverseLoca: function(lat, lon) {
    var _this = this;
    // 获取位置信息
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lon
      },
      success: function(res) { //成功后的回调
        // console.log("success:", res);
        // console.log(res.result.formatted_addresses.recommend);
        _this.setData({
          address: res.result.formatted_addresses.recommend
        });
      },
      fail: function(error) {
        // console.error("fail:", error);
      },
      complete: function(res) {
        // console.log("complete:", res);
      }
    })
  },
  // 根据当前经纬度计算商家距离
  calculateLoca: function(lon, lat, i, callback) {
    // obj.range = 200;
    var la1 = parseFloat(lat)
    var lo1 = parseFloat(lon)
    var la2 = this.data.latitude
    var lo2 = this.data.longitude
    console.log(la1, lo1, la2, lo2);
    qqmapsdk.calculateDistance({
      from: {
        // latitude: 49.984060,
        // longitude: 126.307520
        latitude: la1,
        longitude: lo1
      },
      to: [{
        // latitude: 39.984060,
        // longitude: 116.307520
        latitude: la2,
        longitude: lo2
      }],
      success: function(res) { //成功后的回调
        // console.log("calculateLoca", res);

        var rang = res.result.elements[0].distance / 1000
        callback(i, rang);
      },
      fail: function(error) {
        // console.error(error);
      },
      complete: function(res) {
        // console.log(res);
      }
    });

  },
  //点击切换
  clickTab: function(e) {
    var _this = this;
    this.setData({
      curIdx: e.currentTarget.dataset.current,
      pageN: 1
    });
    var id1 = this.data.seller_type[this.data.curIdx].id;
    this.getList(id1, this.data.pageN);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var _this = this;
    var id1 = _this.data.seller_type[_this.data.curIdx].id;
    _this.setData({
      pageN: _this.data.pageN + 1
    });
    _this.getListMore(id1, _this.data.pageN);
  },
  /**
   * 搜索
   */
  search: function(e) {
    const con = this.data.searchContent;
    if (con != '' && con != undefined) {
      wx.navigateTo({
        url: '../businessSearch/businessSearch?con=' + con,
      })
    } else {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  detail: function(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../businessDetail/businessDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  bindKeyInput: function(e) {
    this.setData({
      searchContent: e.detail.value
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

  }
})