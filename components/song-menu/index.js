// components/song-menu/index.js
const app = getApp();

Component({
  properties: {
    title: { type: String, value: '歌单' },
    hasMore: { type: Boolean, value: true },
    songData: { type: Array, value: [] }
  },

  data: {
    scrollViewWidth: 375
  },

  lifetimes: {
    attached() {
      this.setData({ scrollViewWidth: app.globalData.screenWidth });
    }
  },
  methods: {
    handleMenuMoreClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/index'
      });
    }
  }
});
