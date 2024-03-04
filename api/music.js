import { request } from '../services/index';

export function getMusicBannerApi(type) {
  return request.get({ url: '/banner', data: { type } });
}

export function getRecommendSongApi(id) {
  return request.get({ url: '/playlist/detail', data: { id } });
}

export function getSongMenuApi(limit = 15, cat = '') {
  return request.get({ url: '/top/playlist', data: { limit, offset: 0, cat } });
}

export function getSongMenuTagApi() {
  return request.get({ url: '/playlist/hot' });
}

export function getSongDetailApi(id) {
  return request.get({ url: '/song/detail', data: { ids: id } });
}
