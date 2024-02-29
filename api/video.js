import { request } from '../services/index';
// 获取视频列表
export function getVideoListApi(offset) {
  return request.get({ url: '/top/mv', data: { limit: 20, offset } });
}
// 获取视频详情
export function getVideoDetail(id) {
  return request.get({ url: '/mv/detail', data: { mvid: id } });
}
// 获取视频url
export function getVideoUrl(id, r = 1080) {
  return request.get({ url: '/mv/url', data: { id, r } });
}
