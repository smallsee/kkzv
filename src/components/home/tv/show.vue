<template>
  <div class="kkz-tv_detail" >

    <div class="main w flex-row-between">

      <div class="main-left">


        <div class="tv-info">

          <span class="fav_style" v-if="isFav" @click="_favChange">
            <i  style="margin-right: 2px;color: #FFAFC9" class="fa fa-star"></i>已收藏
          </span>

          <span class="fav_style" v-if="!isFav" @click="_favChange">
            <i  style="margin-right: 2px" class="fa fa-star-o"></i>收藏
          </span>


          <h4 class="title word-break">{{data.title}}
          </h4>



          <div class="flex-row">


            <div class="thumb">
              <img v-lazy="data.thumb" alt="">
            </div>

            <div class="info">

              <div class="info-wrapper">
                <span class="info_name">集数:</span>
                <span class="info_content">{{data.version}}/{{data.files_count}}</span>
              </div>

              <div class="info-wrapper">
                <span class="info_name">国家:</span>

                <span href="#" class="info_content">{{data.country}}&nbsp;&nbsp;</span>

              </div>

              <div class="info-wrapper">
                <span class="info_name">类型:</span>
                <template v-for="(item,index) in data.tag">
                  <a href="#" class="info_content">{{item}}&nbsp;&nbsp;</a>
                </template>
              </div>



              <div class="info-wrapper">
                <span class="info_name">明星:</span>
                <template v-for="(item,index) in data.star">
                  <a href="#" class="info_content">{{item}}&nbsp;&nbsp;</a>
                </template>
              </div>

              <div class="info-wrapper">
                <span class="info_name">简介:</span>
                <span class="info_content introduction word-break">{{data.introduction}}</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div class="main-right">
        <write-rate></write-rate>
      </div>
    </div>


    <div class="main file-content">
      <div class="w flex-row-between">
        <div class="main-left">

          <div class="file">
            <header-title :headerTitle="'下载链接'"></header-title>
            <div class="file-info clearfix">
              <div class="file-info clearfix">
                <template v-for="(item,index) in fileData">
                  <a :href="'/#/tv/detail/' + data.id + '?file=' + index" class="file float-left">{{index + 1}}.{{item.file_name}}</a>
                </template>

                <span class="float-left a-blue-pink file-show" v-if="showFile" @click="_changeFileShow">{{isShowAllFile ? '收起' : '展开'}}</span>

              </div>

            </div>
          </div>

          <div class="recommend">
            <header-title :headerTitle="'相关推荐'"></header-title>

            <div class="flex-row-end change-recommend">
              <Button @click="_shuffleRecommend" size="small" type="ghost" shape="circle">
                <span class="icon"><Icon  type="refresh"></Icon></span>换一批</Button>
            </div>

            <ul class="clearfix">

              <template v-for="(item,index) in recommendDataShow">

                <li class="float-left recommend-item">
                  <image-title-rate
                    width="100%" imgHeight="220px"
                    :isNoMarginRight="(index+1)%4 === 0 ? true : false"
                    :img="item.thumb"
                    :url="'/#/tv/'+item.id"
                    :title="item.title"
                    :id="item.id"
                    @select="_changeData"

                  ></image-title-rate>
                </li>

              </template>

            </ul>
          </div>

          <div class="commit">

            <write-commit @commitSubmit="_commitSubmit"></write-commit>


            <header-title :headerTitle="'精彩评论'"></header-title>

            <div class="commit-page flex-row-end">
              <Page   simple :total="commitTotal" :page-size="commitPageSize" :current="commitNowPage" @on-change="_changePageSize"></Page>
            </div>

            <template v-if="commitData.length" v-for="(item,index) in commitData">
              <commit :imgSize="'58px'" :isShowVideo="false"
                      :commitText="item.content"
                      :userName="item.user.name"
                      :id="item.id"
                      :loushu="data.commits_count - (commitNowPage - 1 ) * commitPageSize - index"
                      @commitReply="_commitReply" @commitUp="_commitUp"></commit>
            </template>

            <div class="no-commit" v-if="!commitData.length">快来添加一条评论吧</div>
          </div>

        </div>
        <div class="main-right">

          <header-title :headerTitle="'热门电影'" ></header-title>

          <template v-for="(item,index) in movieHot">
            <image-title-row
              :isFlexEnd="true"
              :img="item.thumb"
              :title="item.title"
              :url="'/#/movie/' + item.id"
              :num="item.see + '次观看'"
            ></image-title-row>
          </template>


        </div>

      </div>
    </div>
  </div>






</template>

<script>
  import {getShowTvList,getRecommendTvList,getTvList} from 'api/tv'
  import {getHotMovieList} from 'api/movie'
  import {postStoreCommit,postStoreFav,gethasFav} from 'api/common'
  import ImageTitleRate from 'base/image-title-rate/image-title-rate'
  import {ERR_OK,has_delete,has_store} from 'api/config';
  import HeaderTitle from 'base/header-title/header-title'
  import WriteRate from 'base/write-rate/write-rate'
  import WriteCommit from 'base/write-commit/write-commit'
  import Commit from 'base/commit/commit'
  import ImageTitleRow from 'base/image-title-row/image-title-row'
  export default {
    data() {
      return {
        isShowAllFile: false,
        data:[],
        fileData:[],
        fileShortData:[],
        fileLongData:[],
        fileNum: 12,
        dataTotal:[],

        recommend:{
          tagList: [],
          akiraList: []
        },

        recommendData:[],
        recommendDataShow:[],
        recommendNum: 4,

        commitTotalData:[],
        commitData:[],
        commitPageSize:8,
        commitTotal: 0,
        commitNowPage: 1,

        movieHot:[],
        movieHotPage: 5,



        isFav:false,
      }
    },
    created() {
      this._getTvData(this.$route.params.id);
      this._getTvList();
      this._getMovieHotList();
      this._hasFav();
    },
    methods:{
      _favChange() {
        postStoreFav(this.data.id,'tv').then(res => {
          if (res.meta.errno === has_delete){
            this.$Message.success('取消收藏');
            this.isFav = false
          }
          if (res.meta.errno === has_store){
            this.$Message.success('成功收藏');
            this.isFav = true
          }
        })
      },
      _hasFav(){
        gethasFav(this.userNow.id,'tv', this.$route.params.id).then(res => {
          if (res.meta.errno === has_delete){
            this.isFav = true
          }
          if (res.meta.errno === has_store){
            this.isFav = false
          }
        })
      },
      _getMovieHotList(){
        getHotMovieList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.movieHot = res.data.slice(0,this.movieHotPage);
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _changePageSize(even) {
        this.commitNowPage = even;
        this.commitData = this.commitTotalData.slice( (even-1)*this.commitPageSize , even*this.commitPageSize);
      },
      _commitSubmit(commit) {
        postStoreCommit(this.data.id,'tv',commit).then(res => {
          if (res.meta.errno === ERR_OK){
            this.$Message.success('成功添加评论');
            this.data.commits_count += 1;
            this.commitData = this.$_.concat(res.data,this.commitData);
          }
        })
      },
      _commitReply(id) {
        console.log(id)
      },
      _commitUp(id) {
        console.log(id)
      },
      _changeFileShow() {
        this.isShowAllFile = !this.isShowAllFile;

        if(this.isShowAllFile){
          this.fileData = this.fileLongData;
        }else{
          this.fileData = this.fileShortData;
        }

      },
      _changeData(id) {

        this.dataTotal.forEach((item) => {
          if (parseInt(item.id) === parseInt(id) ){
            this._getTvData(id);
          }
        });

        setTimeout(() => {
          this._Recommend();
        },20);
//        this.$router.push({
//          path: `tv/detail/` + id
//        });

      },
      _getTvData(id) {
        getShowTvList(id).then(res => {
          if (res.meta.errno === ERR_OK){
            this.data = res.data;

            this.commitTotalData = res.data.commits;
            this.commitTotal = this.commitTotalData.length;
            this.commitData = this.commitTotalData.slice(0,this.commitPageSize);

            this.recommend.tagList = res.data.tag;
            this.recommend.akiraList = res.data.akira;
            this.fileShortData = res.data.files.slice(0,this.fileNum),
              this.fileLongData = res.data.files;
            this.fileData = this.fileShortData
          }
        })
      },
      _getTvList() {
        getTvList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.dataTotal = res.data;
            this._Recommend()
          }
        })
      },
      _Recommend() {
        let tagList = [];
        this.recommendData = [];
        this.recommend.tagList.forEach((item) => {
          if (item !== '番剧' ){
            tagList.push(item)
          }
        });

        this.dataTotal.forEach((item) => {
          if ( ( this.$_.intersection(item.tag, tagList) ).length > 0){
            this.recommendData.push(item);
          }

          if ( ( this.$_.intersection(item.akira, this.recommend.akiraList) ).length > 0){
            this.recommendData.push(item);
          }
        });

        this.recommendData = this.$_.union(this.recommendData);

        this._shuffleRecommend();
      },
      _shuffleRecommend(){

        this.recommendDataShow = this.$_.shuffle(this.recommendData).slice(0,this.recommendNum);
      }
    },
    components:{
      HeaderTitle,
      ImageTitleRate,
      WriteCommit,
      Commit,
      WriteRate,
      ImageTitleRow
    },

    computed:{
      showFile() {
        return this.data.files_count > this.fileNum ? true : false;
      },
      isLogin() {
        return this.$store.state.isLogin
      },
      userNow() {
        return this.$store.state.user
      }
    },
    watch: {
      '$route': function (route) {
        this._hasFav();
        this._getTvData(this.$route.params.id);
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/variable";


  @media only screen and (min-width: 50em) {
    .kkz-tv_detail{
      box-sizing: border-box;
      .main{
        margin-top: 20px;
        .main-left{
          width: 720px;
          height: auto;
          position: relative;
          .fav_style{
            font-size: 14px;
            position: absolute;
            top: 10px;
            right: 0;
            cursor: pointer;
          }
          .title{
            margin-bottom: 20px;
            letter-spacing:1px;
            max-width: 600px;
            font-size: 22px;
            span{
              color: #888;
            }
          }
          .thumb{
            min-width: 145px;
            height: 200px;
            overflow: hidden;
            margin-right: 10px;
            img{
              width: 100%;
            }
          }
          .info{
            .info-wrapper{
              color: #232121;
              font-size: 14px;
              margin-bottom: 5px;
              .info_name{
                color: #888;
              }
              .info_content{
                line-height: 25px;
              }
              a{
                color: #118D93;
                &:hover{
                  color: #dd5862;
                }
              }
            }
          }

          .file-info{
            margin-top: 20px;
            .file{
              border-radius: 8px;
              display: block;
              background-color: rgba(255, 255, 255, 0.45);
              border: 1px solid rgba(0, 0, 0, 0.12);
              padding: 8px 10px;
              font-size: 13px;
              margin: 0 10px 10px 0;
              color: #5a4a4a;
              &:hover{
                color: #dd5862;
                background-color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
        .main-right{
          box-sizing: border-box;
          padding-left: 15px;
          width: 250px;
          height: auto;
        }
      }
      .file-show{
        line-height: 30px;
        cursor: pointer;
      }
      .file-content{
        background-color: #ffffff;
        .change-recommend{
          margin-top: -25px;
          margin-bottom: 15px;
        }
      }
      .recommend-item{
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
        width: 170px;
        margin-right: 10px;
      }
      .no-commit{
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        padding: 20px 0;
        text-align: center;
        font-size: 13px;
        width: 100%;
      }
      .commit-page{
        font-size: 13px;
        margin-top: -30px;
        margin-bottom: 10px;
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-tv_detail{
      box-sizing: border-box;
      .main{
        margin-top: 20px;
        .main-left{
          width: 100%;
          height: auto;
          position: relative;
          .fav_style{
            font-size: 14px;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
          }
          .title{
            margin-bottom: 20px;
            letter-spacing:1px;
            max-width: 600px;
            font-size: 16px;
            span{
              color: #888;
            }
          }
          .thumb{
            min-width: 145px;
            height: 200px;
            overflow: hidden;
            margin-right: 10px;
            img{
              width: 100%;
            }
          }
          .info{
            .info-wrapper{
              color: #232121;
              font-size: 14px;
              margin-bottom: 5px;
              .info_name{
                color: #888;
              }
              .info_content{
                line-height: 25px;
                &.introduction{
                  max-height: 100px;
                  overflow: hidden;
                  display: inline-block;
                }
              }
              a{
                color: #118D93;
                &:hover{
                  color: #dd5862;
                }
              }
            }
          }

          .file-info{
            margin-top: 20px;
            .file{
              border-radius: 8px;
              display: block;
              background-color: rgba(255, 255, 255, 0.45);
              border: 1px solid rgba(0, 0, 0, 0.12);
              padding: 8px 10px;
              font-size: 13px;
              margin: 0 10px 10px 0;
              color: #5a4a4a;
              &:hover{
                color: #dd5862;
                background-color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
        .main-right{
          display: none;
        }
      }
      .file-show{
        line-height: 30px;
        cursor: pointer;
      }
      .file-content{
        background-color: #ffffff;
        .change-recommend{
          margin-top: -25px;
          margin-bottom: 15px;
        }
      }
      .recommend-item{
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
        width: 45%;
        margin-left: 10px;
        .image-title-rate{
          margin-right: 0;
        }
      }
      .no-commit{
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        padding: 20px 0;
        text-align: center;
        font-size: 13px;
        width: 100%;
      }
      .commit-page{
        font-size: 13px;
        margin-top: -30px;
        margin-bottom: 10px;
      }
    }
  }
</style>

