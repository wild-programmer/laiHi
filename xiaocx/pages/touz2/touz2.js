var app = getApp()

Page({
  data:{
    tianshi1:0,
    motto:'小小科技小小科技小小科技小小科技小小科技小小科技小小科技小小科技',
    dizhi:'上海静安',
    windowHeight: ""
  },
  checkboxgroupBindchange: function (e) {
    var temp1 = e.detail.value
    var temp2 = ''
    console.log(temp1)
    if (temp1.length != 0) {
      for (var i = 0, len = temp1.length; i < len; i++) {
        temp2 = temp2 + temp1[i] + ','
      }
      this.setData({
        tianshi1: '您选择了：' + temp2
      })
    } else {
      this.setData({
        tianshi1: ''
      })
    }
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
  },
  

})