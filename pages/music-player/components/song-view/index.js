import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import { playerStore, MODE_NAMES } from '../../../../stores/player';

ComponentWithStore({
  storeBindings: {
    store: playerStore,
    fields: ['currentSong', 'playing', 'playModeIndex', 'currentLyric'],
    actions: ['playSong', 'setPlayStatus', 'setPlayModeIndex', 'changeCurrentSong']
  },

  data: {
    playMode: 'order'
  },

  methods: {
    handleTogglePlayMode() {
      this.setPlayModeIndex();
    },

    handleToggleSong(e) {
      const clickType = e.currentTarget.dataset.click;
      this.changeCurrentSong(clickType);
    },

    handleTogglePlayStatus() {
      this.setPlayStatus();
    }
  },

  observers: {
    playModeIndex(newVal) {
      if (newVal == undefined || newVal == null) return;
      this.setData({ playMode: MODE_NAMES[newVal] });
    }
  }
});
