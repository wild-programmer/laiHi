var app = getApp()

Page({
  data: {
    span4: 'span',
    span3: 'span',
    span2: 'span',
    span1:'span',
    select:'0',
    active:'active',
    motto:'小小科技小小科技小小科技小小科技小小科技小小科技小小科技小小科技',
    dizhi:'上海静安'
  },
  clickactive:function(e){
    var that = this;
    if (that.data.span1 =='span'){
      that.setData({
        span1: 'span active'
        })
    }else{
      that.setData({
        span1: 'span'
      })
    }    
  },
  clickactive2: function (e) {
    var that = this;
    if (that.data.span2 == 'span') {
      that.setData({
        span2: 'span active'
      })
    } else {
      that.setData({
        span2: 'span'
      })
    }
  },
  clickactive3: function (e) {
    var that = this;
    if (that.data.span3 == 'span') {
      that.setData({
        span3: 'span active'
      })
    } else {
      that.setData({
        span3: 'span'
      })
    }
  }
})