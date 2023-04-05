import {
  getMusicBanner
} from "../../service/music"
import querySelect from "../../utils/query-select"
import throttle from '../../utils/throttle'
// import {
//   throttle
// } from 'underscore'
const querySelecThrottle = throttle(querySelect, 100)
Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 130
  },
  onLoad() {
    this.fetchMusicBanner()
  },
  onRecommenMoreClick(){
console.log(11);
  },
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({
      banners: res.banners
    })
  },
  
  async onBannerImageLoad(event) {
    const res = await querySelecThrottle(".banner-image")
    this.setData({
      bannerHeight: res[0].height
    })
  },
  
})