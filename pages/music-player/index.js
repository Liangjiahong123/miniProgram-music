import { getSongDetailApi } from '../../api/music';

Page({
  data: {
    currentSong: {}
  },
  onLoad(options) {
    this.fetchSongDetailInfo(options.id);
  },

  async fetchSongDetailInfo(id) {
    const { songs } = await getSongDetailApi(id);
    this.setData({ currentSong: songs[0] || {} });
  }
});
