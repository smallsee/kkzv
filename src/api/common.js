import axios from 'axios'
import {commitUrl,FavUrl,FanUrl,hasFanUrl,hasFaVUrl,searchUrl,userCommitUrl,userFavUrl,userFanUrl,userUrl} from "./config"

export function getUserCommit(user_id,commit_type) {
  return axios({
    method: 'get',
    url: userCommitUrl,
    params:{
      commit_type: commit_type,
      user_id: user_id,
    },
  }).then(res => {
    return res.data;
  })
}

export function getUser(user_id) {
  return axios({
    method: 'get',
    url: userUrl + '/user/' + user_id,
  }).then(res => {
    return res.data;
  })
}


export function getUserFan(user_id,type) {
  return axios({
    method: 'get',
    url: userFanUrl,
    params:{
      type: type,
      user_id: user_id,
    },
  }).then(res => {
    return res.data;
  })
}

export function getUserFav(user_id,fav_type) {
  return axios({
    method: 'get',
    url: userFavUrl,
    params:{
      fav_type: fav_type,
      user_id: user_id,
    },
  }).then(res => {
    return res.data;
  })
}

export function getSearch(type,data) {
  return axios({
    method: 'get',
    url: searchUrl,
    params:{
      title: data,
      type: type,
    },
  }).then(res => {
    return res.data;
  })
}

export function postStoreCommit(id,type,commit) {
  return axios({
    method: 'post',
    url: commitUrl,
    data:{
      id: id,
      type: type,
      commit: commit
    },
  }).then(res => {
    return res.data;
  })
}

export function postStoreFav(id,type,commit) {
  return axios({
    method: 'post',
    url: FavUrl,
    data:{
      id: id,
      type: type,
      commit: commit
    },
  }).then(res => {
    return res.data;
  })
}

export function postStoreFan(fan_id,star_id) {
  return axios({
    method: 'post',
    url: FanUrl,
    data:{
      fan_id: fan_id,
      star_id: star_id
    },
  }).then(res => {
    return res.data;
  })
}

export function gethasFan(fan_id,star_id) {
  return axios({
    method: 'get',
    url: hasFanUrl,
    params:{
      fan_id: fan_id,
      star_id: star_id
    },
  }).then(res => {
    return res.data;
  })
}

export function gethasFav(user_id,fav_type,fav_id) {
  return axios({
    method: 'get',
    url: hasFaVUrl,
    params:{
      user_id: user_id,
      fav_type: fav_type,
      fav_id: fav_id
    },
  }).then(res => {
    return res.data;
  })
}