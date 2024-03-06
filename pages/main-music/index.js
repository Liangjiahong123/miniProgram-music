import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
import { getMusicBannerApi, getSongMenuApi } from '../../api/music';
import { getTerminalType, querySelector } from '../../utils/helpers';
import songStore from '../../stores/song';
import { playerStore } from '../../stores/player';
import throttle from '../../utils/throttle';

const TERMINAL_TYPE = {
  pc: 0,
  android: 1,
  ios: 2,
  ipad: 3
};
const querySelectThrottle = throttle(querySelector, 100);

const storeBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'songStore',
      store: songStore,
      fields: ['getRandomRecSongs', 'getPeakRankData', 'getShowRanks'],
      actions: ['fetchRankSongs']
    },
    {
      namespace: 'playerStore',
      store: playerStore,
      actions: ['setPlaySongList', 'setPlaySongIndex']
    }
  ]
});

Page({
  behaviors: [storeBehavior],

  data: {
    searchKey: '',
    bannerList: [],
    bannerHeight: 150,
    hotSongMenu: [],
    recSongMenu: []
  },

  onLoad() {
    this.fetchMusicBanner();
    this.fetchRankSongs();
    this.fetchHotSongMenu();
    this.fetchRecSongMenu();
  },

  handleSearchFocus() {
    wx.navigateTo({
      url: `/pages/detail-search/index?key=${this.data.searchKey}`
    });
  },

  handleNavToMoreSong() {
    wx.navigateTo({
      url: '/pages/detail-song/index?type=recommendRankSongs'
    });
  },

  handleSavePlayList(e) {
    const index = e.currentTarget.dataset.index;
    this.setPlaySongList(this.data.songStore.getRandomRecSongs);
    this.setPlaySongIndex(index);
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

  async fetchHotSongMenu() {
    const { playlists } = await getSongMenuApi();
    const hotSongMenu = playlists;
    this.setData({ hotSongMenu });
  },

  async fetchRecSongMenu() {
    const { playlists } = await getSongMenuApi(15, '华语');
    const recSongMenu = playlists;
    this.setData({ recSongMenu });
  }
});
