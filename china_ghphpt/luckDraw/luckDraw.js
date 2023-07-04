// 上下文对象
//by lzy 
var that;
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result:"",
    luckResultText:"",//弹框默认前缀
    ifDrawAll:'', //判断当前总个数是否限制抽奖
    ifDrawDay: '', //判断当天是否限制抽奖
    is_play: false,// 是否在运动中，避免重复启动bug
    available_num: 0,// 可用抽奖的次数，可自定义设置或者接口返回
    available_allnum:0,//一共剩余抽奖次数
    start_angle: 0,// 转动开始时初始角度=0位置指向正上方，按顺时针设置，可自定义设置
    base_circle_num: 9,// 基本圈数，就是在转到（最后一圈）结束圈之前必须转够几圈 ，可自定义设置
    low_circle_num: 5,// 在第几圈开始进入减速圈（必须小于等于基本圈数），可自定义设置
    add_angle: 10,// 追加角度，此值越大转动越快，请保证360/add_angle=一个整数，比如1/2/3/4/5/6/8/9/10/12等
    use_speed: 1,// 当前速度，与正常转速值相等
    nor_speed: 1,// 正常转速，在减速圈之前的转速，可自定义设置
    low_speed: 10,// 减速转速，在减速圈的转速，可自定义设置
    end_speed: 20,// 最后转速，在结束圈的转速，可自定义设置
    random_angle: 0,// 中奖角度，也是随机数，也是结束圈停止的角度，这个值采用系统随机或者接口返回
    change_angle: 0,// 变化角度计数，0开始，一圈360度，基本是6圈，那么到结束这个值=6*360+random_angle；同样change_angle/360整除表示走过一整圈
    result_val: "未中奖",// 存放奖项容器，可自定义设置
    Jack_pots: [// 奖项区间 ，360度/奖项个数 ，一圈度数0-360，可自定义设置
      // random_angle是多少，在那个区间里面就是中哪个奖项 可从后台获取 动态设置
     
    ],
    luckDrawResult:"", //抽奖结果,
    luckDrawResultIfshow:false, //弹框是否显示 默认false
    // user_integral:"",// 抽奖总积分
    // acti_integral:"",//每次所需积分
    drawNum:'1'//抽奖次数  默认为1 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // that.luckDrawStart();
    that.getData()
  },
  getData(){
    var phone = wx.getStorageSync('phone');
    that = this 
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "activity_detail",
        phone:phone
      },
    
      success: function (res) {
        that.setData({
          result: res.data,
          Jack_pots: res.data.activity_prize,
          available_num: res.data.user_day_limit,
          ifDrawAll: res.data.activity_detail.acti_all_limit,
          ifDrawDay: res.data.activity_detail.acti_day_limit,
          // user_integral: res.data.user_integral,
          // acti_integral: res.data.activity_detail.acti_integral,
        })
      }
    })
  },
  getLuckDrawData:function(){

    var phone = wx.getStorageSync('phone');
    that = this
    app.util.request({
      url: "entry/wxapp/index",
      data: {
        op: "activity_lottery",
        phone: phone
      },
      success: function (res) {
        if (res.data.code == 0){
            that.setData({
              luckDrawResultIfshow: true,
              luckResultText: res.data.msg,
              luckDrawResult: res.data.msg
            })
            that.luckDrawReset()
            return
        }
        if (that.data.ifDrawDay != 0){
          if (res.data.user_day_limit > that.data.ifDrawDay){
            that.setData({
              luckDrawResultIfshow:true,
              luckResultText:"您今天抽奖次数用完了",
            })
            return
          }
        }
        if (that.data.ifDrawAll != 0) {
          if (res.data.user_all_limit > that.data.ifDrawAll) {
            that.setData({
              luckDrawResultIfshow: true,
              luckResultText: "您的抽奖次数用完了",
            })
            return
          }
        }
        that.setData({
          // random_angle: Math.ceil(Math.random() * 360)
          random_angle: res.data.radio,
          available_allnum: res.data.user_all_limit,
          available_num: res.data.user_day_limit,
          luckResultText: res.data.msg,

        });
      }
    })
  },
  /**
   * 启动抽奖
   */
  luckDrawStart: function () {
    var phone = wx.getStorageSync('phone');
    var openid = wx.getStorageSync('openid');
    if (openid == '') {
      wx.navigateTo({
        url: '../empower/empower',
      })
      return
    } else if (phone == '') {
      wx.navigateTo({
        url: '../login/login',
      })
      return
    } 
    // 判断抽奖积分
    // if (that.data.acti_integral * that.data.drawNum >that.data.user_integral) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '您的积分不足，去签到吧~',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.reLaunch({
    //           url: '../signIn/signIn',
    //         })
    //       }
    //     }
    //   })
    //   return
    // }

    // 阻止运动中重复点击
    if (!that.data.is_play) {
      // 设置标识在运动中
      that.setData({
        is_play: true
      });
      // 重置参数
      that.luckDrawReset();
      // 几率随机，也可从服务端获取几率
      that.getLuckDrawData()

      // 运动函数
      setTimeout(that.luckDrawChange, that.data.use_speed);
    };
  },

  /**
   * 转盘运动
   */
  luckDrawChange: function () {
    // 继续运动
    if (that.data.change_angle >= that.data.base_circle_num * 360 + that.data.random_angle) {// 已经到达结束位置
      // 提示中奖，
      
      that.getLuckDrawResult();
      // 运动结束设置可用抽奖的次数和激活状态设置可用
      that.luckDrawEndset();
    } else {// 运动
      if (that.data.change_angle < that.data.low_circle_num * 360) {// 正常转速
        // console.log("正常转速")
        that.data.use_speed = that.data.nor_speed
      } else if (that.data.change_angle >= that.data.low_circle_num * 360 && that.data.change_angle <= that.data.base_circle_num * 360) {// 减速圈
        // console.log("减速圈")
        that.data.use_speed = that.data.low_speed
      } else if (that.data.change_angle > that.data.base_circle_num * 360) {// 结束圈
        // console.log("结束圈")
        that.data.use_speed = that.data.end_speed
      }
      // 累加变化计数
      that.setData({
        change_angle: that.data.change_angle + that.data.add_angle >= that.data.base_circle_num * 360 + that.data.random_angle ? that.data.base_circle_num * 360 + that.data.random_angle : that.data.change_angle + that.data.add_angle
      });
      setTimeout(that.luckDrawChange, that.data.use_speed);
    }

  },

  /**
   * 重置参数
   */
  luckDrawReset: function () {
    // 转动开始时首次点亮的位置，可自定义设置
    that.setData({
      start_angle: 0
    });
    // 当前速度，与正常转速值相等
    that.setData({
      use_speed: that.data.nor_speed
    });
    // 中奖索引，也是随机数，也是结束圈停止的位置，这个值采用系统随机或者接口返回
    that.setData({
      random_angle: 0
    });
    // 变化计数，0开始，必须实例有12个奖项，基本是6圈，那么到结束这个值=6*12+random_number；同样change_num/12整除表示走过一整圈
    that.setData({
      change_angle: 0
    });
  },

  /**
   * 获取抽奖结果
   */
  getLuckDrawResult: function () {
    for (var j = 0; j < that.data.Jack_pots.length; j++) {
      if (that.data.random_angle >= that.data.Jack_pots[j].begin_radio && that.data.random_angle <= that.data.Jack_pots[j].end_radio) {
       
        that.setData({
          // luckDrawResultIfshow:true,
          result_val: that.data.Jack_pots[j].acpr_name,
          luckDrawResult: that.data.Jack_pots[j].acpr_name,
        });
        setTimeout(function(){
          that.setData({
            luckDrawResultIfshow: true,
            drawNum: Number(that.data.drawNum)+1
          })
        },1000)
        break;
      };
    };
  },

  /**
   * 更新状态（运动结束设置可用抽奖的次数和激活状态设置可用）
   */
  luckDrawEndset: function () {
    // 是否在运动中，避免重复启动bug
    that.setData({
      is_play: false
    })
    // 可用抽奖的次数，可自定义设置
    that.setData({
      available_num: that.data.available_num - 1
    });
  },
  closeModel:function(){
    that.setData({
      luckDrawResultIfshow: false,
      luckResultText: "",
    })
  }
})