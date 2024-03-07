// components/video-item-row/index.js
Component({
  properties: {
    videoItem: { type: Object, value: {} }
  },

  methods: {
    handleNavToDetail() {
      wx.redirectTo({
        url: `/pages/detail-video/index?id=${this.properties.videoItem.id}`
      });
    }
  }
});
