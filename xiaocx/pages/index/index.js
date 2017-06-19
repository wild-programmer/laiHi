//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    carousel_images: [],
    hotactivitylist: [],
    loadingHidden: false  // loading
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  detail: function (e) {
    getApp().detail(e);
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    //活动轮播
    wx.request({
      url: 'http://127.0.0.1:8080/LaiHaiManage/app/activity/getAppActivityByCarousel.do',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          carousel_images: res.data.pd_list
        })
      }
    }),
    //热门活动列表
      wx.request({
      url: 'http://127.0.0.1:8080/LaiHaiManage/app/activity/getAppActivityList.do',
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          that.setData({
            hotactivitylist: res.data.pd_list
          })
        }
      })


  }
})
