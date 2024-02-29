import { request } from '../services/index';

export function getMusicBannerApi(type) {
  return request.get({ url: '/banner', data: { type } });
}
