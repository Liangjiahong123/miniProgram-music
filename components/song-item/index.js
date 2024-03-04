// components/rcm-song-item/index.js
Component({
  properties: {
    songItem: { type: Object, value: {} },
    showImg: { type: Boolean, value: true },
    showIndex: { type: Boolean, value: false },
    index: { type: Number, value: 0 }
  },
  methods: {
    handleSongItemTap() {
      const songId = this.properties.songItem.id;
      wx.navigateTo({
        url: `/pages/music-player/index?id=${songId}`
      });
    }
  }
});
