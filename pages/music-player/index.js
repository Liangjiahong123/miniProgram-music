import { getSongDetailApi, getSongLyricApi } from '../../api/music';

const app = getApp();
Page({
  data: {
    song: {},
    lyric: [],
    contentHeight: 555,
    currentTab: 0
  },

  onLoad(options) {
    this.setData({ contentHeight: app.globalData.windowHeight });
    this.fetchSongDetailInfo(options.id);
    this.fetchSongLyric(options.id);
  },

  onTabTitleChange(e) {
    const currentTab = e.detail;
    this.setData({ currentTab });
  },

  onSwiperChange(e) {
    const current = e.detail.current;
    const navBarRef = this.selectComponent('.nav-bar');
    navBarRef.setData({ selected: current });
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
