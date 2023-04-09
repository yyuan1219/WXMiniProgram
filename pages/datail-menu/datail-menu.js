// pages/datail-menu/datail-menu.js
import {
  getSongMenuList,
  getSongMenuTag
} from "../../service/music"
Page({

  data: {
    songMenus: []
  },

  onLoad() {
    this.fetchGetAllMenuList()
  },
  async fetchGetAllMenuList() {
    //  1.获取tags
    const tagres = await getSongMenuTag()
    const tags = tagres.tags
    // 2.根据tags去获取对应的歌单
    const allPromises = []
    for (const tag of tags) {
      const promise = getSongMenuList(tag.name)
      allPromises.push(promise)
    }
    // 3.获取到所有的数据后再进行一次渲染
    Promise.all(allPromises).then(res => {
      console.log(res);

      this.setData({
        songMenus: res
      })
    })
  }

})