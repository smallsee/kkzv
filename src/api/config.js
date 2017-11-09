export const ERR_OK = 0;
export const has_delete = 1001;
export const has_store = 1002;
export const apiDomain = 'http://www.lifanh.com/';

export const imageDeleteUrl =  apiDomain + 'api/image/delete';

export const loginUrl =  apiDomain + 'oauth/token';
export const RegisterUrl =  apiDomain + 'api/user/register';
export const userUrl =  apiDomain + 'api/user';

export const homeUrl =  apiDomain + 'api/home';

export const animeUrl =  apiDomain + 'api/admin/anime';
export const animeHotUrl =  apiDomain + 'api/anime/hot';


export const articleUrl =  apiDomain + 'api/admin/article';
export const articleHotUrl =  apiDomain + 'api/article/hot';

export const pictureUrl =  apiDomain + 'api/admin/picture';
export const pictureHotUrl =  apiDomain + 'api/picture/hot';


export const movieUrl =  apiDomain + 'api/admin/movie';
export const movieHotUrl =  apiDomain + 'api/movie/hot';

export const tvUrl =  apiDomain + 'api/admin/tv';
export const tvHotUrl =  apiDomain + 'api/tv/hot';

export const topicUrl =  apiDomain + 'api/topic';
export const akiraUrl =  apiDomain + 'api/akira';
export const starUrl =  apiDomain + 'api/star';
export const directorUrl =  apiDomain + 'api/director';
export const tagUrl =  apiDomain + 'api/tag';
export const commitUrl =  apiDomain + 'api/commit';
export const FanUrl =  apiDomain + 'api/fan';

export const hasFanUrl =  apiDomain + 'api/hasfan';
export const hasFaVUrl =  apiDomain + 'api/hasfav';

export const FavUrl =  apiDomain + 'api/fav';
export const searchUrl =  apiDomain + 'api/search';

export const userCommitUrl =  apiDomain + 'api/user/commit';
export const userFavUrl =  apiDomain + 'api/user/fav';
export const userFanUrl =  apiDomain + 'api/user/fan';



export const LoginUrl =  apiDomain + 'api/user/login';
export const UserInfoUrl =  apiDomain + 'api/user/me';
export const UserInfoEditUrl =  apiDomain + 'api/user/info/update';

export const getHeader = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'));

  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer  ' + tokenData.access_token
  };

  return headers
};