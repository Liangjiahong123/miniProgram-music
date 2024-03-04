import { getSongDetailApi, getSongLyricApi } from '../../api/music';

Page({
  data: {
    song: {},
    lyric: []
  },

  onLoad(options) {
    this.fetchSongDetailInfo(options.id);
    this.fetchSongLyric(options.id);
  },

  onTabTitleChange(e) {
    const currentTab = e.detail;
    console.log(currentTab);
  },

  async fetchSongDetailInfo(id) {
    const { songs } = await getSongDetailApi(id);
    this.setData({ song: songs[0] || {} });
  },

  async fetchSongLyric(id) {
    const { lrc } = await getSongLyricApi(id);
    // this.setData({ currentSong: songs[0] || {} });
  }
});
