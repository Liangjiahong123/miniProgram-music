import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { playerStore, MODE_NAMES } from '../../../../stores/player';

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: playerStore,
    fields: [
      'currentSong',
      'currentTime',
      'durationTime',
      'progressValue',
      'playing',
      'playModeIndex'
    ],
    actions: ['playSong', 'setPlayStatus', 'setPlayModeIndex']
  },

  data: {
    playMode: 'order'
  },

  methods: {
    handleTogglePlayMode() {
      this.setPlayModeIndex();
    },

    handleToggleSong(e) {},

    handleTogglePlayStatus() {
      this.setPlayStatus();
    }
  },

  observers: {
    currentSong(newVal) {
      if (!newVal.id) return;
      this.playSong();
    },
    playModeIndex(newVal) {
      if (newVal == undefined || newVal == null) return;
      this.setData({ playMode: MODE_NAMES[newVal] });
    }
  }
});
