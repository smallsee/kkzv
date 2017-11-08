import axios from 'axios'
import {LoginUrl, UserInfoUrl, RegisterUrl,UserInfoEditUrl} from "./config"


export function getUserInfo(token) {

  return axios.get(UserInfoUrl,{
    params: {
      token: token
    }
  }).then((res) => {
    return res.data
  })

}

export function postLogin(formData) {

  return axios({
    method: 'post',
    url: LoginUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })

}

export function postUserInfoUpdate(formData) {

  return axios({
    method: 'patch',
    url: UserInfoEditUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })

}

export function postRegister(formData) {

  return axios({
    method: 'post',
    url: RegisterUrl,
    data: formData
  }).then((res) => {

    return res.data;
  })

}
