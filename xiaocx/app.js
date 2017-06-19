//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res2) {              
             
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var code = res.code;
              var iv = res2.iv;
              //请求自己的服务器
              getApp().Login(code, encryptedData, iv);
            }
          })
        },
         fail: function (res) {
           wx.openSetting({
             //重新请求获取定位
             success: (res) => { }
           })
         }
      })
    }
  },
  Login: function (code, encryptedData, iv) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/LaiHaiManage/applogin/login.do?code=' + code + "&encryptedData=" + encryptedData + "&iv=" + iv,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.globalData.userInfo = res.data.info;
        wx.setStorageSync("userInfo", res.data.info);  
      }
    })
  },
  globalData:{
    userInfo:null
  } ,
  detail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?a_id=' + e.currentTarget.id
    })
  }
})
