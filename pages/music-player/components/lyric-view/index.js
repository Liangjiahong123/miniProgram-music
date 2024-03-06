import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { playerStore } from '../../../../stores/player';
const app = getApp();

ComponentWithStore({
  storeBindings: {
    store: playerStore,
    fields: ['lyricData', 'currentLyric']
  },
  data: {
    contentHeight: 555,
    lyricScrollTop: 0
  },

  lifetimes: {
    attached() {
      this.setData({ contentHeight: app.globalData.windowHeight });
    }
  },

  observers: {
    currentLyric(newVal) {
      if (!newVal) return;
      this.setData({ lyricScrollTop: newVal.index * 35 });
    }
  }
});
