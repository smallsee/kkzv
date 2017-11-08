<template>
  <div class="kkz-picture" >

    <div class="main w flex-row-between">
      <div class="main-left">

        <div class="topic">
          <header-title headerTitle="分类"></header-title>


          <p class="word-break topic-item">
            <span class="topic-item_title">类型:</span>
            <span :class="{active: !topicNow }" class="topic-item_content" @click="_changeTopic('')">全部</span>
            <template v-for="(item,index) in topicData">

              <span :class="{active: topicNow == item.name }" class="topic-item_content" @click="_changeTopic(item.name)">{{item.name}}</span>
            </template>
          </p>

        </div>

        <div class="kkz-picture">

          <header-title headerTitle="全部动漫" ></header-title>
          <ul class="clearfix">

            <template v-if="data.length < 1">
              <Spin size="large"></Spin>
            </template>

            <template v-if="data.length > 0" v-for="(item,index) in data">

            <li class="float-left margin-right-10">
              <image-title-rate   width="150px" imgHeight="150px"
                    :isNoMarginRight="(index+1)%4 === 0 ? true : false"
                    :img="item.thumb"
                    :url="'/#/picture/'+item.id"
                    :title="item.title"
                    :isRate="false"
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


        <div class="hot-picture">
          <header-title :headerTitle="'热门番剧'" ></header-title>
          <template v-for="(item,index) in sortData">
              <image-title-row
                  :isBox="true"
                  :isFlexEnd="true"
                  :img="item.thumb"
                  :title="item.title"
                  :url="'/#/picture/' + item.id"
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
  import {getPictureList,getTopicList} from 'api/picture';
  import {ERR_OK} from 'api/config';

  export default {
    data() {
      return {
        data: [],

        screenData:[],

        topicData: [],
        topicNow: "",
        topicDataNow: [],

        starData: [],
        starNow: [],
        starDataNow: [],


        dataTotal:[],
        sortData:[],
        sortPage:10,
        total: 0,
        pageSize: 16
      }
    },
    created() {
      this._getPictureList();
      this._getTopicList();
    },
    methods:{
      _getPictureList() {
        getPictureList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.dataTotal = this.$_.orderBy(res.data, 'id', 'desc');
            this.data = this.dataTotal.slice(0,this.pageSize);
            this.total = this.dataTotal.length;

            this.sortData = this.$_.orderBy(this.dataTotal, 'see', 'desc').slice(0,this.sortPage);
          }
        })
      },
      _getTopicList() {
        getTopicList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.topicData = res.data;
          }
        })
      },
      _refreshData(arr){
        this.data = arr.slice(0,this.pageSize);
        this.total = arr.length;
      },
      _refresh(){
        this.screenData = [];
        if (!this.starDataNow.length > 0 && !this.topicDataNow.length){
          this._refreshData(this.dataTotal);
        }else{
          this._refreshData(this.$_.union(this.starDataNow,this.topicDataNow));
        }
      },
      _dataRemake() {
         if (this.starDataNow.length > 0 && this.topicDataNow.length > 0){
           this.screenData = this.$_.intersection(this.starDataNow, this.topicDataNow);
           this._refreshData(this.screenData);
         }
      },
      _changeTopic(name=''){
        this.topicDataNow = [];
        this._refresh();
        this.topicNow = name;
        if(this.topicNow){
          this.dataTotal.forEach((item) => {
                item.topic.forEach((topic) => {
                  if (topic.name === this.topicNow){
                    this.topicDataNow.push(item)
                  }
                });
          });
          this._refreshData(this.topicDataNow);
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
  .kkz-picture{
    box-sizing: border-box;
    .main{
      .main-left{
        width: 720px;
        height: auto;
        .topic{
          .topic-item{
            margin-top: 10px;
            font-size: 12px;
            line-height: 15px;
            .star-select{
              margin-left: 10px;
              width: 500px;
            }
          }
          .topic-item_content{
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
          .datePicture{
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