import axios from 'axios'
import {movieUrl, tagUrl,movieHotUrl,starUrl,directorUrl} from "./config"




export function getHotMovieList() {

  return axios.get(movieHotUrl).then((res) => {
    return res.data
  })

}


export function getShowMovieList(id) {

  return axios.get(movieUrl + '/' +id).then((res) => {
    return res.data
  })

}

export function getMovieList() {

  return axios.get(movieUrl).then((res) => {
    return res.data
  })

}


export function getAkiraList() {
  return axios.get(akiraUrl).then((res) => {
    return res.data;
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



export function postMovieList(formData) {

  return axios({
    method: 'post',
    url: movieUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })
}

export function postUpdateMovieList(formData) {

  return axios({
    method: 'patch',
    url: movieUrl + '/' + formData.id,
    data: formData
  }).then((res) => {
    return res.data;
  })
}

export function deleteMovie(id) {
  return axios({
    method: 'delete',
    url: movieUrl + '/' + id,
  }).then((res) => {
    return res.data;
  })
}

