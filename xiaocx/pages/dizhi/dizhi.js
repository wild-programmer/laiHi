var app = getApp()
Page({
  data:{
    motto:'小小科技小小科技小小科技小小科技小小科技小小科技小小科技小小科技',
    dizhi:'上海静安',
    location:'上海',
    dz:[
      {
        message:'北京'
      },
      {
        message:'上海'
        },
      {
        message:'广州'
        },
      {
        message:'深圳'
        },
      {
        message:'杭州'
        },
      {
        message:'郑州'
        }
    ]
  },
 touchendsite: function(event) {
    this.setData({ location:event.currentTarget.id})    
  }
})