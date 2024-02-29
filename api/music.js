import { request } from '../services/index';

export function getMusicBannerApi(type) {
  return request.get({ url: '/banner', data: { type } });
}

export function getRecommendSongApi(id) {
  return request.get({ url: '/playlist/detail', data: { id } });
}
