import axios from 'axios'
import Mock from 'mockjs';
import {imageDeleteUrl} from "./config"

/**
 * 获取淘宝Rap的Video数据
 * @returns {*}
 */
export function postImageDelete(file) {
  const url = 'http://rap.taobao.org/mockjs/17725/api/video/create?accessToken=aaa';

  const data = Object.assign({}, {
    format: 'json'
  });

  return axios({
    method: 'post',
    url: imageDeleteUrl,
    data: {
      file: file
    }
  }).then((res) => {
    return res.data;
  })
}