// components/video-item/index.js
Component({
  properties: {
    videoItem: { type: Object, value: {} }
  },

  methods: {
    handleNavToDetail(e) {
      const currentItem = this.properties.videoItem;
      wx.navigateTo({
        url: `/packageVideo/pages/detail-video/index?id=${currentItem.id}`
      });
    }
  }
});
