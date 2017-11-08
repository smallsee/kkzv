import axios from 'axios'
import {homeUrl} from "./config"




export function getHotList() {

  return axios.get(homeUrl).then((res) => {
    return res.data
  })

}

