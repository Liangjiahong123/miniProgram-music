// pages/detail-song/components/header-view/index.js
Component({
  properties: {
    songsData: { type: Object, value: {} }
  },

  methods: {
    handleToShare() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  }
});
