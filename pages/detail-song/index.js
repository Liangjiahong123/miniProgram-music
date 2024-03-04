import { createStoreBindings } from 'mobx-miniprogram-bindings';
import songStore from '../../stores/song';
Page({
  onLoad(options) {
    const type = options.type;
    this.useSongStore(type);
    this.setPageTitle();
  },

  useSongStore(type) {
    this.storeBindings = createStoreBindings(this, {
      store: songStore,
      fields: {
        songsData: () => songStore[type]
      }
    });
  },

  setPageTitle() {
    wx.nextTick(() => {
      wx.setNavigationBarTitle({
        title: this.data.songsData?.name
      });
    });
  }
});
