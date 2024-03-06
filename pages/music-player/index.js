import {  BehaviorWithStore } from 'mobx-miniprogram-bindings';
import { playerStore } from '../../stores/player';

const app = getApp();

const storeBehavior = BehaviorWithStore({
  storeBindings: {
    store: playerStore,
    fields: ['currentSong'],
    actions: ['fetchSongWithId', 'fetchSongLyric', 'setCurrentTime', 'clearCurrentLyric']
  }
});

Page({
  behaviors: [storeBehavior],

  data: {
    contentHeight: 555,
    currentTab: 0
  },

  onLoad(options) {
    this.setData({ contentHeight: app.globalData.windowHeight });
    this.fetchSongWithId(options.id);
    this.fetchSongLyric(options.id);
  },

  onTabTitleChange(e) {
    const currentTab = e.detail;
    this.setData({ currentTab });
  },

  onSwiperChange(e) {
    const current = e.detail.current;
    const navBarRef = this.selectComponent('.nav-bar');
    navBarRef.setData({ selected: current });
  }
});
