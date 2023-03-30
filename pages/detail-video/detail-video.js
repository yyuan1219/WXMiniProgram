// pages/detail-video/detail-video.js
import {
  getMVUrl
  ,getMVInfo
  ,getMVrelated
} from '../../service/video'
Page({
  data: {
    id: 0,
    mvUrl:"",
    mvInfo:"",
    mvrelated:[],
    danmuList:[
      {text:"哈哈哈哈，真好听",color:"#ff0000",time:3},
      {text:"不错喔",color:"#ffff00",time:9},
    ]
  },
   onLoad(options) {
    // 获取id
    const id = options.id
    this.setData({
      id
    })
    // 请求数据
     this.fetchMVUrl()
     this.fetchMVInfo()
     this.fetchMVrelated()

   
  },
  async fetchMVUrl(){
    const res=await getMVUrl(this.data.id)
    this.setData({mvUrl:res.data.url})
  },
  async fetchMVInfo(){
    const res=await getMVInfo(this.data.id)
    this.setData({mvInfo:res.data})
  },
  async fetchMVrelated(){
    const res=await getMVrelated(this.data.id)
    this.setData({mvrelated:res.data})
  }

})