import axios from 'axios'
import {tvUrl, tagUrl,tvHotUrl,starUrl,directorUrl} from "./config"




export function getHotTvList() {

  return axios.get(tvHotUrl).then((res) => {
    return res.data
  })

}


export function getShowTvList(id) {

  return axios.get(tvUrl + '/' +id).then((res) => {
    return res.data
  })

}

export function getTvList() {

  return axios.get(tvUrl).then((res) => {
    return res.data
  })

}



export function getStarList() {
  return axios.get(starUrl).then((res) => {
    return res.data;
  })

}

export function getDirectorList() {
  return axios.get(directorUrl).then((res) => {
    return res.data;
  })

}

export function getTagList() {
  return axios.get(tagUrl).then((res) => {
    return res.data;
  })

}



export function postTvList(formData) {

  return axios({
    method: 'post',
    url: tvUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })
}

export function postUpdateTvList(formData) {

  return axios({
    method: 'patch',
    url: tvUrl + '/' + formData.id,
    data: formData
  }).then((res) => {
    return res.data;
  })
}

export function deleteTv(id) {
  return axios({
    method: 'delete',
    url: movieUrl + '/' + id,
  }).then((res) => {
    return res.data;
  })
}

