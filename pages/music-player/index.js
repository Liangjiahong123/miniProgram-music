// pages/music-player/index.js
Page({
  data: {
    songId: ''
  },
  onLoad(options) {
    this.setData({ songId: options.id });
  }
});
