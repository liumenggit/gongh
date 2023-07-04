//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    color: "#ff6f10", //按钮颜色
    disabled: false, //是否可以点击
    getCode: "获取验证码", //显示文字
    tel: '',
    oldTel: '',
    code: '',
    usernameL: "",
    tel1: "",
    tel2: "",
    code: "",
    change: true
  },
  //动画
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  //登陆跳转

  // 技术支持置地

  onLoad: function() {
    //winHeight = window.innerHeight; //可视窗口高度，不包括浏览器顶部工具栏   
    //创建节点选择器
    var that = this,
      query = wx.createSelectorQuery(); //
    var height1 = wx.getSystemInfoSync().windowHeight; //可视窗口高度，不包括浏览器顶部工具栏 
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function(res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height); //top220
      console.log(height1); //全屏
      //return false;
      if (res[0].height > height1) {
        //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
        var show = false;
        console.log(1)
      } else {
        var show = true;
        console.log(2)
      };
      that.setData({
        show: show
      })
    });
  },

  bindKeyInput1: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  bindKeyInput2: function(e) {
    this.setData({
      tel1: e.detail.value
    })
  },
  bindKeyInput3: function(e) {
    this.setData({
      tel2: e.detail.value
    })
  },

  bindKeyInput4: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  sendCode: function(e) {
    // 获取验证码
    var that = this;
    var tel = this.data.tel2;
    this.setData({
      oldTel: this.data.tel2
    })
    if (tel == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 500
      })
    } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 500
      })
    } else {
      app.util.request({
        url: "entry/wxapp/sms",
        data: {
          mobile: tel
        },
        success: function(res) {
          console.log(res);
          if (res.data.code == 1) {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                that.setData({
                  oldCode: res.data.num
                })
                var times = 300
                var i = setInterval(function() {
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
              }
            });
          } else {
            wx.showToast({
              title: '发送失败',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })

    }
  },
  doLogin: function(e) {
    // 暂时隐藏
    var fromObject = e.detail.value;
    var tel = fromObject.tel;
    var oldTel = this.data.oldTel;
    var code = fromObject.code;
    var oldCode = this.data.oldCode;
    console.log(tel + code);
    if (tel == undefined || tel.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 500
      })
    } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 500
      })
    } else if (code == undefined || code.length == 0) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 500
      })
    } else if (code != oldCode) {
      wx.showToast({
        title: '验证码不一致，请重新确认',
        icon: 'none',
        duration: 500
      })
    } else if (tel != oldTel) {
      wx.showToast({
        title: '手机号不一致，请重新确认',
        icon: 'none',
        duration: 500
      })
    } else {
      //在发起请求前，如果后端接口卡住，在此添加loading...
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "login",
          tel: tel,
        },
        success: function(res) {
          console.log('登录11', res.data)
          if (res.data.code == 1) {
            wx.setStorageSync('phone', res.data.user.phone);
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                // this.onGotUserInfo();
                wx.reLaunch({
                  url: '../mine/mine',
                })
              }
            });
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })
    }
  },
  doLogin1: function(e) {
    var openid = wx.getStorageSync('openid');
    var nickName = wx.getStorageSync('nickName');
    var avatarUrl = wx.getStorageSync('avatarUrl');
    var fromObject = e.detail.value;
    var username = fromObject.username;
    var tel = fromObject.tel;
    console.log(username + tel);
    if (username == undefined || username.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 500
      })
    } else if (tel == undefined || tel.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 500
      })
    } else if (!(/^1[3456789]\d{9}$/.test(tel)) || tel.length != 11) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 500
      })
    } else {
      //在发起请求前，如果后端接口卡住，在此添加loading...
      app.util.request({
        url: "entry/wxapp/index",
        data: {
          op: "new_login",
          tel: tel,
          username: username,
          openid: openid,
          nickName: nickName,
          avatar: avatarUrl,
        },
        success: function(res) {
          console.log('登录22', res.data)
          if (res.data.code == 1) {
            wx.setStorageSync('phone', res.data.user.phone);
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                // this.onGotUserInfo();
                wx.reLaunch({
                  url: '../mine/mine',
                })
              }
            });
          } else {
            wx.showToast({
              title: '登录失败,' + res.data.msg,
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })
    }
  },
  change: function() {
    var that = this;
    console.log(that.data.change);
    if (that.data.change) {
      that.setData({
        change: false
      })
    } else {
      that.setData({
        change: true
      })

    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

});