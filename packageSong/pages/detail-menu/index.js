import { getSongMenuTagApi, getSongMenuApi } from '../../../api/music';
Page({
  data: {
    songMenus: []
  },

  onLoad() {
    this.fetchAllSongMenu();
  },

  async fetchAllSongMenu() {
    const { tags } = await getSongMenuTagApi();
    const allPromises = tags?.map(item => getSongMenuApi(6, item.name));
    Promise.all(allPromises).then((res) => {
      this.setData({ songMenus: res });
    });
  }
});
