import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { getRecommendSongApi } from '../../api/music';
import songStore from '../../stores/song';
Page({
  onLoad(options) {
    const { id, type } = options;
    if (type) {
      this.useSongStore(type);
      this.setPageTitle();
    } else if (id) {
      this.fetchSongMenuInfo(id);
    }
  },

  useSongStore(type) {
    this.storeBindings = createStoreBindings(this, {
      store: songStore,
      fields: {
        songsData: () => songStore[type]
      }
    });
  },

  setPageTitle(title) {
    wx.nextTick(() => {
      wx.setNavigationBarTitle({
        title: title || this.data.songsData?.name || '歌单'
      });
    });
  },

  async fetchSongMenuInfo(id) {
    const { playlist } = await getRecommendSongApi(id);
    this.setData({ songsData: playlist });
    this.setPageTitle(playlist.name);
  }
});
