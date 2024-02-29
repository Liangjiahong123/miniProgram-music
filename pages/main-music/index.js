import { getMusicBannerApi } from '../../api/music';
import { getTerminalType } from '../../utils/helpers';

const TERMINAL_TYPE = {
  pc: 0,
  android: 1,
  ios: 2,
  ipad: 3
};

Page({
  data: {
    searchKey: '',
    bannerList: [],
    bannerHeight: ''
  },

  onLoad() {
    this.fetchMusicBanner();
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
  }
});
