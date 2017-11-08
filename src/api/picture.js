import axios from 'axios'
import {pictureUrl,topicUrl,pictureHotUrl} from "./config"


export function getHotPictureList() {

  return axios.get(pictureHotUrl).then((res) => {
    return res.data
  })

}

export function getTopicList() {
  return axios.get(topicUrl).then((res) => {
    return res.data;
  })

}

export function postPictureStoreList(formData) {

  return axios({
    method: 'post',
    url: pictureUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })
}


export function getShowPictureList(id) {

  return axios.get(pictureUrl + '/' +id).then((res) => {
    return res.data
  })

}


export function getPictureList() {

  return axios.get(pictureUrl).then((res) => {
    return res.data
  })

}

export function deletePicture(id) {
  return axios({
    method: 'delete',
    url: pictureUrl + '/' + id,
  }).then((res) => {
    return res.data;
  })
}

export function postUpdatePictureList(formData) {

  return axios({
    method: 'patch',
    url: pictureUrl + '/' + formData.id,
    data: formData
  }).then((res) => {
    return res.data;
  })
}