import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { getMusicBannerApi, getRecommendSongApi, getSongMenuApi } from '../../api/music';
import { getTerminalType, querySelector, getRandomNum } from '../../utils/helpers';
import { songStore } from '../../stores/song';
import throttle from '../../utils/throttle';

const TERMINAL_TYPE = {
  pc: 0,
  android: 1,
  ios: 2,
  ipad: 3
};
const querySelectThrottle = throttle(querySelector, 100);

Page({
  data: {
    searchKey: '',
    bannerList: [],
    bannerHeight: 150,
    recommendSongs: [],
    hotSongMenu: [],
    recSongMenu: []
  },

  onLoad() {
    this.fetchMusicBanner();
    this.fetchRecommendSong();
    this.fetchHotSongMenu();
    this.fetchRecSongMenu();

    this.storeBindings = createStoreBindings(this, {
      store: songStore, // 数据源(将store中的某些字段、方法绑定到当前页面中)
      actions: ['setRecommendSongs'] // 将哪些方法绑定到此页面中
    });
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  handleSearchFocus() {
    wx.navigateTo({
      url: `/pages/detail-search/index?key=${this.data.searchKey}`
    });
  },

  handleNavToMoreSong() {
    wx.navigateTo({
      url: '/pages/detail-song/index'
    });
  },

  async onBannerImgLoaded() {
    const [rect] = await querySelectThrottle('.banner-pic');
    this.setData({ bannerHeight: rect.height });
  },

  async fetchMusicBanner() {
    const terminal = getTerminalType();
    const type = TERMINAL_TYPE[terminal];
    const { banners = [] } = await getMusicBannerApi(type);
    this.setData({ bannerList: banners });
  },

  async fetchRecommendSong() {
    const { playlist } = await getRecommendSongApi(3778678);
    const random = getRandomNum(6, playlist.tracks.length);
    const recommendSongs = playlist.tracks.slice(random - 6, random);
    this.setData({ recommendSongs });
    this.setRecommendSongs(playlist.tracks);
  },

  async fetchHotSongMenu() {
    const { playlists } = await getSongMenuApi();
    const hotSongMenu = playlists;
    this.setData({ hotSongMenu });
  },

  async fetchRecSongMenu() {
    const { playlists } = await getSongMenuApi('华语');
    const recSongMenu = playlists;
    this.setData({ recSongMenu });
  }
});
