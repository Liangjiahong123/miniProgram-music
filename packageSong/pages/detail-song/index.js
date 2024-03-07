import { BehaviorWithStore } from 'mobx-miniprogram-bindings';
import { getRecommendSongApi } from '../../../api/music';
import songStore from '../../../stores/song';
import { playerStore } from '../../../stores/player';

const storeBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'songStore',
      store: songStore,
      fields: ['recommendRankSongs', 'newRankSongs', 'originRankSongs', 'soarRankSongs']
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
    songsData: {}
  },

  onLoad(options) {
    const { id, type } = options;

    if (type) {
      this.setPageTitle();
      this.setData({ songsData: this.data.songStore[type] });
    } else if (id) {
      this.fetchSongMenuInfo(id);
    }
  },

  setPageTitle(title) {
    wx.nextTick(() => {
      wx.setNavigationBarTitle({
        title: title || this.data.songsData?.name || '歌单'
      });
    });
  },

  handleSavePlayList(e) {
    const index = e.currentTarget.dataset.index;
    this.setPlaySongList(this.data.songsData?.tracks || []);
    this.setPlaySongIndex(index);
  },

  async fetchSongMenuInfo(id) {
    const { playlist } = await getRecommendSongApi(id);
    this.setData({ songsData: playlist });
    this.setPageTitle(playlist.name);
  }
});
