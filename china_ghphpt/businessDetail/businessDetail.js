// china_ghphpt/businessDetail/businessDetail.js
var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 顶部轮播
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1500,
    currentIndex: 0,
    id: '',
    showMap: 0,
    showShare: 0,
    access_token: '',
    range: '0',
    markers: [{
      iconPath: "https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/location.png",
      id: 0,
      longitude: 113.324520,
      latitude: 23.099994,
      width: 40,
      height: 40
    }],
    send_coupon_params: [{
      "stock_id": "15131970",
      "out_request_no": "89560002019101000121",
    }],
    sign: '9A0A8659F005D6984697E2CA0A9CF3B79A0A8659F005D6984697E2CA0A9CF3B7',
    send_coupon_merchant: '10016226'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    if (options.scene != undefined) {
      const scene = decodeURIComponent(options.scene);
      id = scene.split('&')[0].split('=')[1]
      console.log(id);
    }
    that.setData({
      id: id
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GNLBZ-ZLPKI-PGAGE-5UPVE-2UYCZ-AKFUM'
    });
    that.mapCtx = wx.createMapContext('map');

    var openid = wx.getStorageSync('openid');
    console.log(openid);
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "seller_detail",
        id: id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          seller: res.data.seller,
          coupon: res.data.coupon,
          setting: res.data.setting,
        })

        that.setData({
          'markers[0].longitude': res.data.seller.x,
          'markers[0].latitude': res.data.seller.y,
        })
        that.getLoca();
        console.log(that.data.markers);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 100为导航栏swiper-tab 的高度
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100) - 50,
    })
  },
  // 获取当前定位
  getLoca: function (e) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log("getLocation:", res);
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        // 距离
        _this.calculateLoca(_this.data.seller.x, _this.data.seller.y);
      }
    })
  },
  tel: function (e) {
    var _this = this;
    console.log(_this.data.seller.phone)
    wx.makePhoneCall({
      phoneNumber: _this.data.seller.phone //仅为示例，并非真实的电话号码
    })
  },
  address: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        console.log(res)
        const latitude = parseFloat(_this.data.seller.y)
        const longitude = parseFloat(_this.data.seller.x)
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          // scale: 18,
          name: _this.data.seller.name,
          address: _this.data.seller.address
        })
      }
    })
    // wx.openLocation({
    //     latitude: _this.data.seller.y,
    //     longitude: _this.data.seller.x,
    //     // name: name,
    //     scale: 18
    // })

    // 地图内显示定位
    // _this.mapCtx.includePoints({
    //     padding: [10],
    //     points: [{
    //         latitude: _this.data.seller.y,
    //         longitude: _this.data.seller.x,
    //     }, {
    //         latitude: _this.data.latitude,
    //         longitude: _this.data.longitude,
    //     }]
    // })

    // qqmapsdk.direction({
    //     mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
    //     //from参数不填默认当前地址
    //     from: {
    //         latitude: _this.data.latitude,
    //         longitude: _this.data.longitude,
    //     },
    //     to: {
    //         latitude: _this.data.seller.y,
    //         longitude: _this.data.seller.x,
    //     },
    //     success: function(res) {
    //         console.log(res);
    //         var ret = res;
    //         var coors = ret.result.routes[0].polyline,
    //             pl = [];
    //         //坐标解压（返回的点串坐标，通过前向差分进行压缩）
    //         var kr = 1000000;
    //         for (var i = 2; i < coors.length; i++) {
    //             coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    //         }
    //         //将解压后的坐标放入点串数组pl中
    //         for (var i = 0; i < coors.length; i += 2) {
    //             pl.push({
    //                 latitude: coors[i],
    //                 longitude: coors[i + 1]
    //             })
    //         }
    //         console.log(pl)
    //         //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
    //         _this.setData({
    //             latitude: pl[0].latitude,
    //             longitude: pl[0].longitude,
    //             polyline: [{
    //                 points: pl,
    //                 color: '#FF0000DD',
    //                 width: 4
    //             }]
    //         })
    //     },
    //     fail: function(error) {
    //         console.error(error);
    //     },
    //     complete: function(res) {
    //         console.log(res);
    //     }
    // });
    // this.setData({
    //     showMap: 1
    // })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
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
  // 根据当前经纬度计算商家距离
  calculateLoca: function (lon, lat, callback) {
    console.log("calculateLoca111", lon, lat);
    var _this = this;
    var la1 = parseFloat(lat)
    var lo1 = parseFloat(lon)
    var la2 = this.data.latitude
    var lo2 = this.data.longitude
    console.log(la1, lo1, la2, lo2);

    qqmapsdk.calculateDistance({
      from: {
        latitude: la1,
        longitude: lo1
      },
      to: [{
        latitude: la2,
        longitude: lo2
      }],
      success: function (res) { //成功后的回调
        console.log("calculateLoca", res);
        var rang = res.result.elements[0].distance / 1000
        _this.setData({
          rang: rang,
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });

  },
  // 关闭地图
  close: function () {
    this.setData({
      showMap: 0
    })
  },
  // 分享
  share: function (e) {
    var _this = this;
    var id = this.data.id;
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "share_img",
        id: id,
      },
      success: function (res) {
        // console.log(res.data.img);
        let qrcodeurl = res.data.img;
        _this.setData({
          imgUrl: qrcodeurl
        })
        _this.createNewImg();
        _this.setData({
          showShare: 1
        })
      }
    })
  },
  textByteLength(text, num) { // text为传入的文本  num为单行显示的字节长度
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },
  createNewImg: function () {
    var that = this;
    wx.showLoading({
      title: '正在生成图片...',
      mask: true,
    });
    wx.downloadFile({
      url: 'https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/shareCBg.png', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res, "reererererer")
          that.setData({
            bgCUrl: res.tempFilePath
          })
          const fs = wx.getFileSystemManager();
          //随机定义路径名称
          var times = new Date().getTime();
          var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
          var code = "data:image/png;base64," + that.data.imgUrl;
          //将base64图片写入
          fs.writeFile({
            filePath: codeimg,
            data: code.slice(22),
            encoding: 'base64',
            success: (res) => {
              console.log("draw", codeimg);
              that.setData({
                codeCUrl: codeimg
              })
              that.canvasF();
            }
          })
        }
      }
    })
  },
  canvasF: function () {
    var that = this;
    const ctx = wx.createCanvasContext('shareCanvas')
    ctx.width = 260
    ctx.height = 410
    // 背景图
    ctx.drawImage(that.data.bgCUrl, 0, 0, 516, 791, 0, 0, 260, 410)
    // 小程序码
    ctx.drawImage(that.data.codeCUrl, 0, 0, 300, 300, 60, 80, 150, 150)
    ctx.setTextAlign('center')
    ctx.setFillStyle('#666666')
    ctx.setFontSize(11)
    ctx.fillText(that.data.seller.title, 125, 285)
    ctx.fillText(that.data.seller.phone, 125, 315)
    const CONTENT_ROW_LENGTH = 37; // 正文 单行显示字符长度
    let [contentLeng, contentArray, contentRows] = that.textByteLength(that.data.seller.address, CONTENT_ROW_LENGTH);
    let contentHh = 12 * 1.3;
    for (let m = 0; m < contentArray.length; m++) {
      ctx.fillText(contentArray[m], 130, 340 + contentHh * m);
    }
    ctx.stroke()
    ctx.draw()
    //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 260,
        height: 410,
        destWidth: 780,
        destHeight: 1230,
        canvasId: 'shareCanvas',
        success: function (res) {
          that.setData({
            shareImage: res.tempFilePath
          })
          wx.hideLoading();
        },
        fail: function (res) {
          console.log(res)
          wx.hideLoading();
        }
      })
    }, 2000);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImage,
      success(res) {
        wx.showToast({
          icon: 'none',
          title: "图片保存成功！",
          duration: 2000,
        });
      }
    })
  },
  // 关闭分享弹出层
  closeShareW: function () {
    this.setData({
      showShare: 0
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    // let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  // couponDetail: function (e) {
  //   console.log(e.currentTarget.dataset.id);
  //   wx.navigateTo({
  //     url: '../couponDetail/couponDetail?id=' + e.currentTarget.dataset.id,
  //   })
  // },
  businessCode: function (e) {
    var type = e.currentTarget.dataset.id;
    if (type == "2"){
      wx.navigateTo({
        url: '../businessCode/businessCode?id=' + this.data.seller.wx_code_id,
      })
    }else if(type == "3"){
      wx.navigateTo({
        url: '../article/articleDetail?id=' + this.data.seller.article_id,
      })
    }

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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})