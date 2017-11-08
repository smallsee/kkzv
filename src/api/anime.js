import axios from 'axios'
import {animeUrl,animeHotUrl, tagUrl, akiraUrl} from "./config"




export function getHotAnimeList() {

  return axios.get(animeHotUrl).then((res) => {
    return res.data
  })

}



export function getShowAnimeList(id) {

  return axios.get(animeUrl + '/' +id).then((res) => {
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


export function postAnimeList(formData) {

  return axios({
    method: 'post',
    url: animeUrl,
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

