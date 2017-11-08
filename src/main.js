import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from './api/http'
import router from './router'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import iView from 'iview';
import _ from 'lodash';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import 'common/sass/index.scss'
import 'common/css/font-awesome.min.css'



Vue.use(iView);
Vue.use(Vuex);


Vue.prototype.$axios = axios;
Vue.prototype.$_ = _;

fastclick.attach(document.body);
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
});


const store = new Vuex.Store({
  state: {
    todo: '',
    isLogin: !!JSON.parse(localStorage.getItem('kkzToken')),
    user: JSON.parse(localStorage.getItem('kkzUser'))
  },
  mutations: {
    get_todo_list (state, todo){
      state.todo = todo;
    },
    is_login_active (state, isLogin) {
      state.isLogin = isLogin;
    },
    get_user (state, user){
      state.user = user;
    },
  },
  actions: {
    geTodo(store){
      store.commit('get_todo_list', '5555')
    },
    isLoginActive(store){
      let isLogin = !!JSON.parse(localStorage.getItem('kkzToken'));
      store.commit('is_login_active', isLogin)
    },
    getUser(store){
      let user = JSON.parse(localStorage.getItem('kkzUser'));
      store.commit('get_user', user)
    },
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});



