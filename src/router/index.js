import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import auth from 'common/js/auth'

//后台
import Admin from '@/components/admin/index'
import AdminAnime from '@/components/admin/anime/index'
import AdminAnimeCreate from '@/components/admin/anime/create'
import AdminAnimeUpdate from '@/components/admin/anime/update'
import AdminArticle from '@/components/admin/article/index'
import AdminArticleCreate from '@/components/admin/article/create'
import AdminArticleUpdate from '@/components/admin/article/update'
import AdminTv from '@/components/admin/tv/index'
import AdminTvCreate from '@/components/admin/tv/create'
import AdminTvUpdate from '@/components/admin/tv/update'
import AdminPicture from '@/components/admin/picture/index'
import AdminPictureCreate from '@/components/admin/picture/create'
import AdminPictureUpdate from '@/components/admin/picture/update'
import AdminMovie from '@/components/admin/movie/index'
import AdminMovieCreate from '@/components/admin/movie/create'
import AdminMovieUpdate from '@/components/admin/movie/update'
import AdminLogin from '@/components/admin/login/index'



//前台
import HomeApp from '@/components/home/index'
import Home from '@/components/home/home/index'
import Look from '@/components/home/look/index'

import Anime from '@/components/home/anime/index'
import AnimeDetail from '@/components/home/anime/detail'
import AnimeShow from '@/components/home/anime/show'

import Movie from '@/components/home/movie/index'
import MovieShow from '@/components/home/movie/show'

import Picture from '@/components/home/picture/index'
import PictureShow from '@/components/home/picture/show'


import Tv from '@/components/home/tv/index'
import TvDetail from '@/components/home/tv/detail'
import TvShow from '@/components/home/tv/show'

import Article from '@/components/home/article/index'
import ArticleShow from '@/components/home/article/show'
import Login from '@/components/home/login/index'
import Register from '@/components/home/register/index'
import Search from '@/components/home/search/search'

import User from '@/components/home/user/index'
import UserFav from '@/components/home/user/fav'
import UserCommit from '@/components/home/user/commit'
import UserFan from '@/components/home/user/fan'
import UserInfo from '@/components/home/user/info'
import UserPassword from '@/components/home/user/password'
import UserThumb from '@/components/home/user/thumb'



Vue.use(Router);


const router =  new Router({
  routes: [
    {
      path: '/',
      name: '前台主页',
      redirect: '/home',
      component: HomeApp,
      hidden: true,
      children: [
        { path: '/home', component: Home, name: '主页',meta: { notKeepAlive: true }},
        { path: '/look', component: Look, name: '点播',},

        { path: '/anime', component: Anime, name: '视频',},
        { path: '/anime/detail/:id', component: AnimeDetail, name: '视频详情页',meta: { notKeepAlive: true }},
        { path: '/anime/:id', component: AnimeShow, name: '视频播放页',meta: { notKeepAlive: true }},

        { path: '/movie', component: Movie, name: '电影'},
        { path: '/movie/:id', component: MovieShow, name: '电影详情页',meta: { notKeepAlive: true }},

        { path: '/picture', component: Picture, name: '图片'},
        { path: '/picture/:id', component: PictureShow, name: '图片详情页',meta: { notKeepAlive: true }},

        { path: '/tv', component: Tv, name: '电视剧',},
        { path: '/tv/detail/:id', component: TvDetail, name: '电视剧详情页',meta: { notKeepAlive: true }},
        { path: '/tv/:id', component: TvShow, name: '电视剧播放页',meta: { notKeepAlive: true }},

        { path: '/article', component: Article, name: '文章'},
        { path: '/article/:id', component: ArticleShow, name: '文章详情页',meta: { notKeepAlive: true }},
        { path: '/user/:id', component: User, name: '用户面板',meta: { notKeepAlive: true },
          children: [
            { path: 'fav/:type', component: UserFav, name: '用户收藏页',meta: { notKeepAlive: true }},
            { path: 'commit/:type', component: UserCommit, name: '用户评论页',meta: { notKeepAlive: true }},
            { path: 'fan/:type', component: UserFan, name: '用户好友页',meta: { notKeepAlive: true }},
            { path: 'info', component: UserInfo, name: '用户个人资料',meta: { notKeepAlive: true }},
            { path: 'password', component: UserPassword, name: '用户密码',meta: { notKeepAlive: true }},
            { path: 'thumb', component: UserThumb, name: '用户头像',meta: { notKeepAlive: true }},
          ]
        },
      ]
    },
    {
      path: '/admin/login',
      name: '后台登陆',
      component: AdminLogin,
      hidden: true
    },
    {
      path: '/login',
      name: '前台登陆',
      component: Login,
      hidden: true
    },
    {
      path: '/register',
      name: '前台注册',
      component: Register,
      hidden: true
    },
    {
      path: '/search',
      name: '搜索',
      component: Search,
      hidden: true
    },
    {
      path: '/admin',
      name: '动漫',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: '/admin/anime', component: AdminAnime, name: '动漫列表页',index:'1-1',},
        { path: '/admin/anime/create', component: AdminAnimeCreate, name: '动漫添加页',index:'1-2',},
        { path: '/admin/anime/:id', component: AdminAnimeUpdate, name: '动漫修改页',index:'1-3', hidden: true ,meta: { notKeepAlive: true }},

      ]
    },
    {
      path: '/admin',
      name: '电视剧',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: '/admin/tv', component: AdminTv, name: '电视剧列表页',index:'3-1',},
        { path: '/admin/tv/create', component: AdminTvCreate, name: '电视剧添加页',index:'3-2',},
        { path: '/admin/tv/:id', component: AdminTvUpdate, name: '电视剧修改页',index:'3-3', hidden: true ,meta: { notKeepAlive: true }},

      ]
    },
    {
      path: '/admin',
      name: '电影',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: '/admin/movie', component: AdminMovie, name: '电影列表页',index:'4-1',},
        { path: '/admin/movie/create', component: AdminMovieCreate, name: '电影添加页',index:'4-2',},
        { path: '/admin/movie/:id', component: AdminMovieUpdate, name: '电影修改页',index:'4-3', hidden: true ,meta: { notKeepAlive: true }},

      ]
    },
    {
      path: '/admin',
      name: '文章',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: '/admin/article', component: AdminArticle, name: '文章列表页',index:'2-1',},
        { path: '/admin/article/create', component: AdminArticleCreate, name: '文章添加页',index:'2-2',meta: { notKeepAlive: true }},
        { path: '/admin/article/:id', component: AdminArticleUpdate, name: '文章修改页',index:'2-3', hidden: true,meta: { notKeepAlive: true }},
      ]
    },
    {
      path: '/admin',
      name: '图片',
      component: Admin,
      meta: {
        requiresAuth: true
      },
      children: [
        { path: '/admin/picture', component: AdminPicture, name: '图片列表页',index:'5-1',},
        { path: '/admin/picture/create', component: AdminPictureCreate, name: '图片添加页',index:'5-2',meta: { notKeepAlive: true }},
        { path: '/admin/picture/:id', component: AdminPictureUpdate, name: '图片修改页',index:'5-3', hidden: true,meta: { notKeepAlive: true }},
      ]
    },
  ]
})


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn() || JSON.parse(localStorage.getItem('kkzUser')).name !== 'xiaohai') {

      next({
        path: '/home'
      });
      next()
    } else {
      next()
    }
  } else {
    next()
  }

});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
});

export default router