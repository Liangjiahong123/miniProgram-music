import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { playerStore } from '../../../../stores/player';

ComponentWithStore({
  storeBindings: {
    store: playerStore,
    fields: ['currentSong', 'playing','currentLyric'],
    actions: ['setPlayStatus']
  },

  methods: {
    handleTogglePlayStatus() {
      this.setPlayStatus();
    },

    handleNavToPlayer() {
      wx.navigateTo({
        url: '/pages/music-player/index'
      });
    }
  }
});
