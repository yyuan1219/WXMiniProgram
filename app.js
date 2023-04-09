// app.js
App({
  globalData:{
    screenWidth:375,
    screenHight:667,
  },
  onLaunch(){
  // 获取设备的信息
    wx.getSystemInfo({
      success:(res)=>{
        this.globalData.screenHight=res.screenHight
        this.globalData.screenWidth=res.screenWidth

      }
    })
  }

})
