// enrolledinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u_id: wx.getStorageSync("userInfo").u_id   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---enrolledinfo page onLoad---" + options.type);
    this.setData({
      ptype: options.type,
      price: options.price,
      a_id: options.a_id
    });   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
 chooseImg: function () {
   var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有     
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log("---enrolledinfo page chooseImg---" + tempFilePaths[0]);
        that.setData({
          filePath: tempFilePaths[0],

        }) 
      }
    })
  },
 formSubmit: function (e) {
   console.log("---enrolledinfo page formSubmit---");
    var that = this;
    wx.uploadFile({
      url: 'http://127.0.0.1:8080/LaiHaiManage/app/activityenrolled/save.do',
      filePath: this.data.filePath,　//待上传的图片，由 chooseImage获得
      name: 'file',
      formData: {
        price: this.data.price,
        a_id: this.data.a_id,
        u_id:this.data.u_id,
        ptype: this.data.ptype,
        company: encodeURI(e.detail.value.company),
        position: encodeURI(e.detail.value.position),
        mobile: encodeURI(e.detail.value.mobile)
      }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log("addfood success", res);
        wx.navigateTo({
          url: '../succeed/succeed?'
        })

      },
      fail: function (res) {
        console.log("addfood fail", res);
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})
