<template>
  <div class="kkz-anime" >

    <div class="main w flex-row-between">
      <div class="main-left">

        <div class="tag">
          <header-title headerTitle="分类"></header-title>


          <p class="word-break tag-item">
            <span class="tag-item_title">声优:</span>

            <Select @on-change="_changSelect" class="akira-select" v-model="akiraNow" filterable multiple size="large" >
              <Option  v-for="item in akiraData" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </p>

          <p class="word-break tag-item">
            <span class="tag-item_title">类型:</span>
            <span :class="{active: !tagNow }" class="tag-item_content" @click="_changeTag('')">全部</span>
            <template v-for="(item,index) in tagData">

              <span :class="{active: tagNow == item.name }" class="tag-item_content" @click="_changeTag(item.name)">{{item.name}}</span>
            </template>
          </p>

        </div>

        <div class="kkz-anime">

          <header-title headerTitle="全部动漫" ></header-title>
          <ul class="clearfix">


            <template v-if="data.length < 1">
              <Spin size="large"></Spin>
            </template>

            <template v-if="data.length > 0" v-for="(item,index) in data">

            <li style="float: left">
              <image-title-rate   width="172px" imgHeight="220px"
                    :isNoMarginRight="(index+1)%4 === 0 ? true : false"
                    :img="item.thumb"
                    :url="'/#/anime/'+item.id"
                    :title="item.title"
              ></image-title-rate>
            </li>

            </template>

          </ul>
          <div style="float: right;">
            <Page  show-elevator show-sizer :total="total" :page-size="pageSize" :current="1" @on-change="_changePage" @on-page-size-change="_changePageSize"></Page>
          </div>
        </div>

      </div>

      <div class="main-right">


        <div class="hot-anime">
          <header-title :headerTitle="'热门番剧'" ></header-title>
          <template v-for="(item,index) in sortData">
              <image-title-row
                  :isBox="true"
                  :isFlexEnd="true"
                  :img="item.thumb"
                  :title="item.title"
                  :url="'/#/anime/' + item.id"
                  :num="item.see + '次观看'"
              ></image-title-row>
          </template>

          <header-title :headerTitle="'热门图片'" ></header-title>
          <template v-for="(item,index) in dataPictureHot">
            <image-title-row
              :isBox="true"
              :isFlexEnd="true"
              :img="item.thumb"
              :title="item.title"
              :url="'/#/picture/' + item.id"
              :num="item.see + '次观看'"
            ></image-title-row>
          </template>

          <header-title :headerTitle="'热门文章'" ></header-title>
          <template v-for="(item,index) in dataArticleHot">
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

      </div>
    </div>



  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  import ImageTitleRow from 'base/image-title-row/image-title-row'
  import ImageTitleRate from 'base/image-title-rate/image-title-rate'
  import {getAnimeList,getTagList, getAkiraList} from 'api/anime';
  import {getHotArticleList} from 'api/article';
  import {getHotPictureList} from 'api/picture';
  import {ERR_OK} from 'api/config';

  export default {
    data() {
      return {
        data: [],

        screenData:[],

        tagData: [],
        tagNow: "",
        tagDataNow: [],

        akiraData: [],
        akiraNow: [],
        akiraDataNow: [],

        pageHotSize: 4,
        dataPictureHot: [],
        dataArticleHot: [],


        dataTotal:[],
        sortData:[],
        sortPage:5,
        total: 0,
        pageSize: 16
      }
    },
    created() {
      this._getAnimeList();
      this._getTagList();
      this._getAkiraList();
      this._getPictureHotList();
      this._getArticleHotList();
    },
    methods:{
      _getPictureHotList(){
        getHotPictureList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.dataPictureHot = res.data.slice(0,this.pageHotSize);
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _getArticleHotList(){
        getHotArticleList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.dataArticleHot = res.data.slice(0,this.pageHotSize);
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _refreshData(arr){
        this.data = arr.slice(0,this.pageSize);
        this.total = arr.length;
      },
      _getAkiraList(){
        getAkiraList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.akiraData = res.data;
          }
        })
      },
      _getAnimeList() {
        getAnimeList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.dataTotal = this.$_.orderBy(res.data, 'id', 'desc');
            this.data = this.dataTotal.slice(0,this.pageSize);
            this.total = this.dataTotal.length;

            this.sortData = this.$_.orderBy(this.dataTotal, 'see', 'desc').slice(0,this.sortPage);
          }
        })
      },
      _getTagList() {
        getTagList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.tagData = res.data;
          }
        })
      },
      _refresh(){
        this.screenData = [];
        if (!this.akiraDataNow.length > 0 && !this.tagDataNow.length){
          this._refreshData(this.dataTotal);
        }else{
          this._refreshData(this.$_.union(this.akiraDataNow,this.tagDataNow));
        }
      },
      _dataRemake() {
         if (this.akiraDataNow.length > 0 && this.tagDataNow.length > 0){
           this.screenData = this.$_.intersection(this.akiraDataNow, this.tagDataNow);
           this._refreshData(this.screenData);
         }
      },
      _changSelect(){
        this.akiraDataNow = [];
        this._refresh();

        if(this.akiraNow.length > 0){
          let dataTotal = this.dataTotal;
          dataTotal.forEach((item) => {
            this.akiraNow.forEach((selfAkira) => {
              item.akira.forEach((akira) => {
                  if (selfAkira === akira){
                    this.akiraDataNow.push(item)
                  }
              });
            });
          });
          this._refreshData(this.$_.union(this.akiraDataNow));
          this._dataRemake();
        }
      },
      _changeTag(name=''){
        this.tagDataNow = [];
        this._refresh();
        this.tagNow = name;
        if(this.tagNow){

          this.dataTotal.forEach((item) => {

                item.tag.forEach((tag) => {
                  if (tag === this.tagNow){
                    this.tagDataNow.push(item)
                  }
                });
          });
          this._refreshData(this.tagDataNow);
          this._dataRemake();
        }
      },
      _changePageSize(even){
        this.pageSize = even;
      },
      _changePage(even){
        this.data = this.dataTotal.slice( (even-1)*this.pageSize , even*this.pageSize);
      },
    },
    components:{
      HeaderTitle,
      ImageTitleRate,
      ImageTitleRow
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/variable";
  .kkz-anime{
    box-sizing: border-box;
    .main{
      .main-left{
        width: 720px;
        height: auto;
        .tag{
          .tag-item{
            margin-top: 10px;
            font-size: 12px;
            line-height: 15px;
            .akira-select{
              margin-left: 10px;
              width: 500px;
            }
          }
          .tag-item_content{
            cursor: pointer;
            line-height: 22px;
            margin-right: 5px;

            &.active{
              color: #c34b69;
            }
            &:hover{
              color: #c34b69;
            }

          }
        }
      }
      .main-right{
        width: 250px;
        height: auto;
        .kkz-weekDate{
          .date-nav{
            margin-bottom: 10px;
            .date-item{
              cursor: pointer;
              font-size: 12px;
              &:hover{
                color: $color-border-red-d;
              }
              &.active{
                color: #c34b69;
              }
            }
          }
          .dateAnime{
            border-bottom: 1px dashed rgba(80, 72, 72, 0.14);
            padding: 10px 0;
            font-size: 13px;

            .title{
              color: #118D93;
              line-height: 22px;
              text-decoration: none;
              cursor: pointer;
              &:hover{
                color: $color-border-red-d;
              }
            }
            .now-num{
              font-size: 12px;
              color: #999;
              margin: 5px 0;
            }
          }
        }



      }
    }
  }
</style>