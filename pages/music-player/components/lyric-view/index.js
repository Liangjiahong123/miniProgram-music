import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { playerStore } from '../../../../stores/player';
const app = getApp();

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: playerStore,
    fields: ['lyricData', 'currentLyric']
  },
  data: {
    contentHeight: 555
  },

  lifetimes: {
    attached() {
      this.setData({ contentHeight: app.globalData.windowHeight });
    }
  }
});
