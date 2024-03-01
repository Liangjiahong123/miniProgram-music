import { request } from '../services/index';

export function getMusicBannerApi(type) {
  return request.get({ url: '/banner', data: { type } });
}

export function getRecommendSongApi(id) {
  return request.get({ url: '/playlist/detail', data: { id } });
}

export function getSongMenuApi(cat) {
  return request.get({ url: '/top/playlist', data: { limit: 15, offset: 0, cat } });
}
