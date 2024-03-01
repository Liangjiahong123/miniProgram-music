// components/rcm-song-item/index.js
Component({
  properties: {
    songItem: { type: Object, value: {} }
  },
  methods: {
    handleSongItemTap() {
      const songId = this.properties.songItem.id;
      console.log(songId);
    }
  }
});
