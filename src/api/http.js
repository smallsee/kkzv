/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'

import Notice from 'iview/src/components/notice';


// axios 配置
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.kkzToken) {
      config.headers.Authorization = `Bearer   ${JSON.parse(localStorage.getItem('kkzToken'))}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {

      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          localStorage.removeItem('kkzToken');
          localStorage.removeItem('kkzUser');
          Notice.error({
            title: '错误提醒',
            desc: '您的账号密码错误 - - ，非常抱歉你不能登陆'
          });
          break;
        case 400:
          // 401 清除token信息并跳转到登录页面
          localStorage.removeItem('kkzToken');
          localStorage.removeItem('kkzUser');
          Notice.error({
            title: '错误提醒',
            desc: '您的认证过期或者您没有登录，请前往登录页面登录下吧'
          });
          break;

      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

export default axios;