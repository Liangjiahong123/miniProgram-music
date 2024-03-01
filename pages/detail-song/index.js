import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { songStore } from '../../stores/song';
Page({
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: songStore,
      fields: ['getAllRecommendSongs']
    });
  }
});
