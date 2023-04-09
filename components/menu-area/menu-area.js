// components/menu-area/menu-area.js
const App =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
    },
    menuList:{
      type:Array,
      value:[]
    }

  },
  data: {
    ScreenWidth:375
  },
  lifetimes:{
    attached(){
      this.ScreenWidth=App.globalData.ScreenWidth
    }
  },
  methods:{
    onRecommenMoreClick(){
      wx.navigateTo({
        url: '/pages/datail-menu/datail-menu',
      })
    }
  }
  
})
