// pages/main-video/mian-video.js
import {
  getTopMV
} from '../../service/video'
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.fetchTopMV()
  },
  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)

    const Newlist = [...this.data.videoList, ...res.data]
    this.setData({
      videoList: Newlist
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMV()
  },

  async onPullDownRefresh() {
    // 清空之前的数据
    this.setData({
      videoList: []
    })
    this.data.offset = 0
    this.data.hasMore = true
    // 重新请求数据
    await this.fetchTopMV()
    // 停住下拉刷新
    wx.stopPullDownRefresh()

 
  },
  // 事件监听
  // onVideoItemTap(event){
  //   const item =event.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: `/pages/detail-video/detail-video?id=${item.id}`,
  //   })
  // }
})