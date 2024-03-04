// components/song-item-col/index.js
Component({
  properties: {
    songItem: { type: Object, value: {} }
  },

  methods: {
    handleSongItemTap() {
      const menuId = this.properties.songItem.id;
      wx.navigateTo({
        url: `/pages/detail-song/index?id=${menuId}`
      });
    }
  }
});
