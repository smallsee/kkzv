<template>
  <div class="kkz-home" >
      <banner :banner="hotAnime" :banner_list="newPicture"></banner>

      <div class="main w flex-row-between">
          <div class="main-left">

            <new-movie :data="newMovie"></new-movie>
            <new-type :data="newAnime" :urlType="'anime'" :headerTitle="'最新好看动漫'"></new-type>
            <new-type :data="newTv" :urlType="'tv'" :headerTitle="'最新好看电视剧'"></new-type>
            <new-article :data="newArticle"></new-article>

          </div>
          <div class="main-right">
            <hot-picture :data="hotPicture"></hot-picture>
            <hot-movie :data="hotMovie"></hot-movie>
            <hot-topic :data="topic"></hot-topic>
            <new-commit :data="commit"></new-commit>

          </div>
      </div>



  </div>
</template>

<script>
  import {getHotList} from 'api/home';
  import {ERR_OK} from 'api/config';
  import Banner from 'home/home/banner'

  import NewMovie from 'home/home/new-movie'
  import NewArticle from 'home/home/new-article'
  import NewType from 'home/home/new-type'

  import hotPicture from 'home/home/hot-picture'
  import HotMovie from 'home/home/hot-movie'



  import HotTopic from 'home/home/hot-topic'
  import NewCommit from 'home/home/new-commit'




  export default {
    data() {
      return {
        newAnime:[],
        hotAnime:[],

        newMovie:[],
        hotMovie:[],

        newPicture:[],
        hotPicture:[],

        newTv:[],
        hotTv:[],

        newArticle:[],
        hotArticle:[],

        topic:[],
        commit:[],
      }
    },
    created() {
      this._getHotList();
    },
    methods:{
      _getHotList() {
        getHotList().then( res => {
          if (res.meta.errno === ERR_OK){

            this.hotAnime = res.data.anime['hot'].slice(0,5);
            this.hotTv = res.data.tv['hot'].slice(0,5);
            this.hotPicture = res.data.picture['hot'].slice(0,6);
            this.hotMovie = res.data.movie['hot'].slice(0,3);
            this.hotArticle = res.data.article['hot'].slice(0,5);

            this.newAnime = res.data.anime['new'].slice(0,10);
            this.newTv = res.data.tv['new'].slice(0,10);
            this.newPicture = res.data.picture['new'].slice(0,6);
            this.newMovie = res.data.movie['new'].slice(0,10);
            this.newArticle = res.data.article['new'].slice(0,6);


            this.topic = res.data.topic.slice(0,6);
            this.commit = res.data.commit.slice(0,6);


          }else{
            this.$Message.error(res.message);
          }
        })
      }
    },
    components:{
      Banner,

      NewMovie,
      NewArticle,
      NewType,
      hotPicture,

      HotMovie,


      HotTopic,
      NewCommit,

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/variable";



  @media only screen and (min-width: 50em) {
    .kkz-home{
      box-sizing: border-box;
      padding-top: 10px;

      .main{
        margin-top: 20px;
        .main-left{
          width: 720px;
          height: auto;
        }
        .main-right{
          width: 250px;
          height: auto;
        }
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-home{
      box-sizing: border-box;
      padding-top: 10px;

      .main{
        margin-top: 20px;
        .main-left{
          width: 100%;
          height: auto;
        }
        .main-right{
          display: none;
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>