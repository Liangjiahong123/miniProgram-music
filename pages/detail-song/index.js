import { createStoreBindings } from 'mobx-miniprogram-bindings';
import songStore from '../../stores/song';
Page({
  onLoad(options) {
    const type = options.type;
    this.useSongStore(type);
  },
  useSongStore(type) {
    this.storeBindings = createStoreBindings(this, {
      store: songStore,
      fields: [type]
    });
  }
});
