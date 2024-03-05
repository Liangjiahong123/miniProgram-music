import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { playerStore } from '../../stores/player';
import { getSongDetailApi, getSongLyricApi } from '../../api/music';

const app = getApp();
Page({
  data: {
    lyric: [],
    contentHeight: 555,
    currentTab: 0
  },

  onLoad(options) {
    this.setData({ contentHeight: app.globalData.windowHeight });
    this.usePlayerStore();
    this.fetchSongWithId(options.id);
    this.fetchSongLyric(options.id);
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
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

  usePlayerStore() {
    this.storeBindings = createStoreBindings(this, {
      store: playerStore,
      fields: ['currentSong'],
      actions: ['fetchSongWithId']
    });
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
