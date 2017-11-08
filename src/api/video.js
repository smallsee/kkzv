import axios from 'axios'
import {animeUrl, animeStoreUrl, tagUrl, akiraUrl, animeHomeUrl, weekUrl,animeShowUrl,animeRecommendUrl,animeHomeHotUrl} from "./config"


export function getHomeAnimeList() {

  return axios.get(animeHomeUrl).then((res) => {
    return res.data
  })

}

export function getHomeHotAnimeList() {

  return axios.get(animeHomeHotUrl).then((res) => {
    return res.data
  })

}

export function getRecommendAnimeList(condition) {

  return axios.get(animeRecommendUrl,{
    params:{
      tagList: condition.tagList,
      akiraList: condition.akiraList,
    }
  }).then((res) => {
    return res.data
  })

}

export function getShowAnimeList(id) {

  return axios.get(animeShowUrl + '/' +id).then((res) => {
    return res.data
  })

}

export function getAnimeList() {

  return axios.get(animeUrl).then((res) => {
    return res.data
  })

}


export function getAkiraList() {
  return axios.get(akiraUrl).then((res) => {
    return res.data;
  })

}


export function getTagList() {
  return axios.get(tagUrl).then((res) => {
    return res.data;
  })

}

export function getWeekList() {
  return axios.get(weekUrl).then((res) => {
    return res.data;
  })

}

export function postAnimeList(formData) {

  return axios({
    method: 'post',
    url: animeStoreUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })
}

export function postUpdateAnimeList(formData) {

  return axios({
    method: 'patch',
    url: animeUrl + '/' + formData.id,
    data: formData
  }).then((res) => {
    return res.data;
  })
}

export function deleteAnime(id) {
  return axios({
    method: 'delete',
    url: animeUrl + '/' + id,
  }).then((res) => {
    return res.data;
  })
}

