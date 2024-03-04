// pages/music-player/components/nav-bar/index.js
Component({
  data: {
    selected: 0
  },
  methods: {
    handleToggleTitle(e) {
      const title = e.currentTarget.dataset.title;
      this.setData({ selected: title });
      this.triggerEvent('change', this.data.selected);
    }
  }
});
