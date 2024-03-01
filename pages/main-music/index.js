import { getMusicBannerApi, getRecommendSongApi } from '../../api/music';
import { getTerminalType, querySelector, getRandomNum } from '../../utils/helpers';
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
    recommendSongs: []
  },

  onLoad() {
    this.fetchMusicBanner();
    this.fetchRecommendSong();
  },

  handleSearchFocus() {
    wx.navigateTo({
      url: `/pages/detail-search/index?key=${this.data.searchKey}`
    });
  },

  async fetchMusicBanner() {
    const terminal = getTerminalType();
    const type = TERMINAL_TYPE[terminal];
    const { banners = [] } = await getMusicBannerApi(type);
    this.setData({ bannerList: banners });
  },

  async onBannerImgLoaded() {
    const [rect] = await querySelectThrottle('.banner-pic');
    this.setData({ bannerHeight: rect.height });
  },

  async fetchRecommendSong() {
    const { playlist } = await getRecommendSongApi(3778678);
    const random = getRandomNum(6, playlist.tracks.length);
    this.setData({ recommendSongs: playlist.tracks.slice(random - 6, random) });
  }
});
