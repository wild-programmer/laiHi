var app = getApp()

Page({
  data:{
    motto:'小小科技小小科技小小科技小小科技小小科技小小科技小小科技小小科技',
    dizhi:'上海静安'
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })

      },
    })
  }
})