import {
  getMusicBanner,
  getPlaylistDetail,
  getSongMenuList
} from "../../service/music"
import querySelect from "../../utils/query-select"
import throttle from '../../utils/throttle'
import recommendStore from '../../store/recommendStore'
import rangkingStore from '../../store/rangkingStore'

// import {
//   throttle
// } from 'underscore'
const querySelecThrottle = throttle(querySelect, 100)
const app = getApp()
Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 130,
    recommendSongs: [],
    // 歌单数据
    hotMenuList: [],
    recMenuList: [],
    rankingInfos:{
      newRanking: {},
      originRanking: {},
      upRanking: {}
    },
    
    ScreenWidth: 375
  },
  onLoad() {
    this.fetchMusicBanner()
    this.fetchSongMenuList()
    recommendStore.onState("recommendSongs", this.getrecommendSongs)
    rangkingStore.onState("originRanking", this.handleOriginRanking)
    rangkingStore.onState("newRanking", this.handleNewRanking)
    rangkingStore.onState("upRanking", this.handleUpRanking)

    recommendStore.dispatch("fetchRecommendSongsAction")
    rangkingStore.dispatch("fetchRangkingDataAction")

    // 获取屏幕尺寸
    this.setData({
      ScreenWidth: app.globalData.screenWidth
    })
  },
  onRecommenMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song',
    })

  },
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },

  // 网络请求的方法封装
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({
      banners: res.banners
    })
  },

  async fetchRecommendSongs() {
    const res = await getPlaylistDetail(3778678)
    const playlist = res.playlist
    const recommendSongs = playlist.tracks.slice(0, 6)
    this.setData({
      recommendSongs: recommendSongs
    })
  },
  async fetchRecommendSongs() {
    const res = await getPlaylistDetail(3778678)
    const playlist = res.playlist
    const recommendSongs = playlist.tracks.slice(0, 6)
    this.setData({
      recommendSongs: recommendSongs
    })
  },
  async fetchSongMenuList() {
    // const res = await querySelecThrottle(".banner-image")
    getSongMenuList().then(res => {
      this.setData({
        hotMenuList: res.playlists
      })
    })
    getSongMenuList("华语").then(res => {
      this.setData({
        recMenuList: res.playlists
      })
    })
  },
  getrecommendSongs(value) {
    this.setData({
      recommendSongs: value.slice(0, 6)
    })
  },
  handleOriginRanking(value) {
    const newRankingInfos={ ...this.data.rankingInfos,newRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  handleNewRanking(value) {
    const newRankingInfos={ ...this.data.rankingInfos,originRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  handleUpRanking(value) {
    const newRankingInfos={ ...this.data.rankingInfos,upRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  onUnload(){
    recommendStore.offState("recommendSongs",this.getrecommendSongs)
    rangkingStore.offState("newRanking",this.handleNewRanking)
    rangkingStore.offState("originRanking",this.handleoriginRanking)
    rangkingStore.offState("upRanking",this.handleupRanking)

  }
  

})