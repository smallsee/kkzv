import axios from 'axios'
import {articleUrl,topicUrl,articleHotUrl} from "./config"


export function getHotArticleList() {

  return axios.get(articleHotUrl).then((res) => {
    return res.data
  })

}

export function getTopicList() {
  return axios.get(topicUrl).then((res) => {
    return res.data;
  })

}

export function postArticleStoreList(formData) {

  return axios({
    method: 'post',
    url: articleUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })
}


export function getShowArticleList(id) {

  return axios.get(articleUrl + '/' +id).then((res) => {
    return res.data
  })

}


export function getArticleList() {

  return axios.get(articleUrl).then((res) => {
    return res.data
  })

}

export function deleteArticle(id) {
  return axios({
    method: 'delete',
    url: articleUrl + '/' + id,
  }).then((res) => {
    return res.data;
  })
}

export function postUpdateArticleList(formData) {

  return axios({
    method: 'patch',
    url: articleUrl + '/' + formData.id,
    data: formData
  }).then((res) => {
    return res.data;
  })
}