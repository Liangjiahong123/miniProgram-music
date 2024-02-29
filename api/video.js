import { request } from '../services/index';
// 获取视频列表
export function getVideoListApi(limit = 20, offset = 0) {
  return request.get({ url: '/top/mv', data: { limit, offset } });
}
// 获取视频详情
export function getVideoDetailApi(id) {
  return request.get({ url: '/mv/detail', data: { mvid: id } });
}
// 获取视频url
export function getVideoUrlApi(id, r = 1080) {
  return request.get({ url: '/mv/url', data: { id, r } });
}
