<template>
  <div class="kkz-article">
    <div class="w">
      <div class="banner">
        <img src="./banner.jpg" alt="">
      </div>

      <div class="new-article_box flex-row">
        <template v-for="(item,index) in newData">
          <div class="new-article_item " :class="{'no-margin-right': (index + 1)%6==0}">
            <div class="thumb">
              <a :href="'/#/article/' + item.id">
                <img v-lazy="item.thumb" alt="">
              </a>
              <p class="topic">{{item.topic[0].name}}</p>
            </div>
            <a  :href="'/#/article/' + item.id">
            <p class="title">{{item.title}}</p>
            </a>
          </div>
        </template>
      </div>

      <div class="main flex-row-between">
        <div class="left">
          <h3 class="title">热门搜索</h3>
          <div></div>
          <template v-for="(item,index) in topicHotData">
            <a-background
              :text="item.name"
              @select="_selectClick"
            ></a-background>
          </template>
          <a-background
            :text="'全部'"
            @select="_selectClick"
          ></a-background>
          <header-title :headerTitle="'话题搜索'" ></header-title>
          <Select @on-change="_changTopicSelect" class="akira-select" v-model="topicNow" filterable multiple size="large" >
            <Option  v-for="item in topicData" :value="item.name" :key="item.name">{{ item.name }}</Option>
          </Select>

          <header-title :headerTitle="'标题搜索'" ></header-title>
          <Select @on-change="_changTitleSelect" class="akira-select" v-model="titleNow" filterable multiple size="large" >
            <Option  v-for="item in dataTotal" :value="item.title" :key="item.title">{{ item.title }}</Option>
          </Select>
        </div>
        <div class="middle">

          <div class="middle_banner">
            <Carousel  dots="none" autoplay v-model="banner_item">
              <template v-for="(item,index) in shuffleData">
                <Carousel-item>
                  <image-title-cover
                    :img="item.thumb"
                    :text="''"
                    :url="'/#/article/' + item.id"
                    :textColor="'rgba(51, 50, 50, 0.71)'"
                    :width="650" :height="300"></image-title-cover>
                </Carousel-item>
              </template>
            </Carousel>
          </div>

          <div class="article_box">
            <template v-for="(item,index) in data" v-if="data.length > 0">
              <div class="article_item flex-row">
                <a :href="'/#/article/' + item.id">
                  <div class="thumb">
                    <img v-lazy="item.thumb" alt="">

                  </div>
                </a>

              <div class="content">
                <h3 class="title">{{item.title}}</h3>
                <div class="body" v-html="item.content"></div>
                <div class="info flex-row-between">
                  <div class="detail">
                    <i class="fa fa-star-o"></i>
                    <span>{{item.favs_count}}</span>
                    <i class="fa fa-eye"></i>
                    <span>{{item.see}}</span>
                    <i class="fa fa-comment-o"></i>
                    <span>{{item.commits_count}}</span>
                  </div>
                  <a :href="'/#/article/' + item.id">
                  <span>阅读全文</span>
                  </a>
                </div>
              </div>
            </div>
            </template>
            <div v-if="!data.length" class="no_data">没有获取到数据</div>
          </div>

          <div style="float: right;">
            <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
          </div>

        </div>
        <div class="right">
          <h3 class="title">热门文章</h3>

          <div class="hot-anime">
            <template v-for="(item,index) in hotData">
              <image-title-row
                :isBox="true"
                :isFlexEnd="true"
                :img="item.thumb"
                :title="item.title"
                :url="'/#/article/' + item.id"
                :num="item.see + '次观看'"
              ></image-title-row>
            </template>
          </div>

          <header-title :headerTitle="'热门动漫'" ></header-title>
          <div class="hot-anime">
            <template v-for="(item,index) in dataAnimeHot">
              <image-title-row
                :isFlexEnd="true"
                :isShowText="false"
                :img="item.thumb"
                :title="item.title"
                :url="'/#/anime/' + item.id"
                :num="item.see + '次观看'"
              ></image-title-row>
            </template>
          </div>

          <header-title :headerTitle="'热门电视剧'" ></header-title>
          <div class="hot-anime">
            <template v-for="(item,index) in dataTvHot">
              <image-title-row
                :isFlexEnd="true"
                :isShowText="false"
                :img="item.thumb"
                :title="item.title"
                :url="'/#/anime/detail/' + item.id"
                :num="item.see + '次观看'"
              ></image-title-row>
            </template>
          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ABackground from 'base/a-background/a-background'
  import HeaderTitle from 'base/header-title/header-title'
  import {getArticleList,getTopicList,deleteArticle} from 'api/article';
  import {getHotAnimeList} from 'api/anime';
  import {getHotTvList} from 'api/tv';
  import {ERR_OK} from 'api/config';
  import ImageTitleCover from 'base/image-title-cover/image-title-cover'
  import ImageTitleRow from 'base/image-title-row/image-title-row'
  export default {
    data() {
      return {
        banner_item: 0,
        hotPage: 6,
        newPage: 6,
        shufflePage: 5,
        data:[],
        dataAnimeHot:[],
        dataTvHot:[],
        hotData:[],
        newData:[],
        shuffleData:[],


        dataTotal:[],
        total: 0,
        pageSize: 5,
        pageHotSize: 4,

        topicData:[],
        topicHotData:[],
        topicHotPage:8,
        topicNow:[],
        topicDataNow:[],
        select:'',

        titleNow:[],
        titleDataNow:[],

        screenData:[]
      }
    },
    created() {
      this._getArticleList();
      this._getAnimeHotList();
      this._getTvHotList();
      this._getTopicList();
    },
    methods:{
      _refreshData(arr){
        this.data = arr.slice(0,this.pageSize);
        this.total = arr.length;
      },
      _refresh(){
        this.screenData = [];
        if (!this.titleDataNow.length > 0 && !this.topicDataNow.length){
          this._refreshData(this.dataTotal);
        }else{
          this._refreshData(this.$_.union(this.titleDataNow,this.topicDataNow));
        }
      },
      _dataRemake(){
        if (this.titleDataNow.length > 0 && this.topicDataNow.length > 0){
          this.screenData = this.$_.intersection(this.titleDataNow, this.topicDataNow);
          this._refreshData(this.screenData);
        }
      },
      _changTitleSelect() {
        this.titleDataNow = [];
        this._refresh();

        if(this.titleNow.length > 0){
          this.dataTotal.forEach((item) => {
            this.titleNow.forEach((selfTitle) => {
                if (selfTitle === item.title){
                  this.titleDataNow.push(item)
                }
            });
          });
          this._refreshData(this.$_.union(this.titleDataNow));
          this._dataRemake();
        }

//        else{
//          this.titleDataNow = this.dataTotal;
//        }
//        this.data = this.$_.union(this.titleDataNow).slice(0,this.pageSize);
//        this.total = this.titleDataNow.length;
      },
      _changTopicSelect(){
        this.topicDataNow = [];
        this._refresh();
        if(this.topicNow.length > 0){

          this.dataTotal.forEach((item) => {

            this.topicNow.forEach((selfTopic) => {

              item.topic.forEach((topic) => {

                if (selfTopic === topic.name){
                  this.topicDataNow.push(item)
                }
              });

            });

          });
          this._refreshData(this.$_.union(this.topicDataNow));
          this._dataRemake();
        }
      },
      _selectClick(name){
        this.topicDataNow = [];
        this._refresh();
        this.select = name;

        if(this.select !== '全部'){
          this.dataTotal.forEach((item) => {
            item.topic.forEach((topic) => {
                if (topic.name === this.select){
                  this.topicDataNow.push(item)
                }
            });
          });
          this._refreshData(this.$_.union(this.topicDataNow));
          this._dataRemake();
        }
//        else{
//          this.select = '全部';
//          this.topicDataNow = this.dataTotal;
//        }
//
//        this.data = this.topicDataNow.slice(0,this.pageSize);
//        this.total = this.topicDataNow.length;
      },
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
      _getAnimeHotList(){
        getHotAnimeList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.dataAnimeHot = res.data.slice(0,this.pageHotSize);
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _getTvHotList(){
        getHotTvList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.dataTvHot = res.data.slice(0,this.pageHotSize);
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _getTopicList(){
        getTopicList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.topicData = res.data;
            this.topicHotData = this.$_.orderBy(res.data, 'use_count', 'desc').slice(0,this.topicHotPage);
          }
        })
      },
      _getArticleList() {
        getArticleList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.dataTotal = res.data;
            this.hotData = this.$_.orderBy(res.data, 'see', 'desc').slice(0,this.hotPage);
            this.newData = this.$_.shuffle(res.data).slice(0,this.newPage);;
            this.shuffleData = this.$_.shuffle(res.data).slice(0,this.shufflePage);


            this.data = this.dataTotal.slice(0,this.pageSize);
            this.total = res.data.length;
          }else{
            this.$Message.error(res.message);
          }

        })
      },
    },
    components: {
      ImageTitleCover,
      ImageTitleRow,
      HeaderTitle,
      ABackground
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/mixin";
  .kkz-article{
    .banner{
      margin-top: 20px;
      border: 2px solid #cccccc;
      width: 100%;
      height: 350px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }

    .new-article_box{
      margin-top: 20px;
      .new-article_item{
        width: 155px;
        margin-right: 10px;
        .thumb{
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100px;
          img{
            width: 100%;
            height: 100%;
          }
          .topic{
            font-size: 12px;
            display: inline-block;
            position: absolute;
            left: 0;
            bottom:0;
            padding: 5px;
            color: #ffffff;
            background-color: rgba(202, 134, 97, 0.47);;
          }
        }
        .title{
          color: rgb(86, 86, 86);
          margin-top: 10px;
          width: 100%;
          font-size: 14px;
          height: 14px;
          overflow: hidden;
        }
      }
    }

    .main{
      position: relative;
      margin-top: 20px;
      .left{
        width: 180px;
        .title{
          display: inline-block;
          margin-bottom: 15px;
          font-size: 15px;
          font-weight: bold;
          padding-top: 15px;
          border-top: 1px solid black;
          color: #333;
        }
        @include border-top-1px(rgba(7,17,27,0.2));
      }
      .middle{
        position: relative;
        width: 600px;
        .article_box{
        .article_item{
          width: 100%;

          padding: 20px 0;
          border-bottom: 1px solid #eee;
          .thumb{
            width: 200px;
            height: 135px;
            overflow: hidden;
            margin-right: 10px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .content{
            width: 420px;
            height: 135px;
            .title{
              font-size: 18px;
              color: black;
              margin-bottom: 10px;

            }
            .body{
              font-size: 12px;
              color: black;
              width: 100%;
              height: 85px;
              overflow: hidden;
              margin-bottom: 10px;
            }
            .info{
              font-size: 12px;
              span{
                margin: 0 5px;
              }
            }
          }
        }
        }
      }
      .right{
        width: 180px;
        .title{
          display: inline-block;
          margin-bottom: 15px;
          font-size: 15px;
          font-weight: bold;
          padding-top: 15px;
          border-top: 1px solid black;
          color: #333;
        }
        @include border-top-1px(rgba(7,17,27,0.2));

      }
    }
  }
</style>