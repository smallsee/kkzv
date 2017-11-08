<template>
  <div class="kkz-tv" >

    <div class="main w flex-row-between">
      <div class="main-left">

        <div class="tag">
          <header-title headerTitle="分类"></header-title>


          <p class="word-break tag-item">
            <span class="tag-item_title">明星:</span>

            <Select @on-change="_changStarSelect" class="star-select" v-model="starNow" filterable multiple size="large" >
              <Option  v-for="item in starData" :value="item.name" :key="item.name">{{ item.name }}</Option>
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

        <div class="kkz-tv">

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
                    :url="'/#/tv/'+item.id"
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


        <div class="hot-tv">
          <header-title :headerTitle="'热门番剧'" ></header-title>
          <template v-for="(item,index) in sortData">
              <image-title-row
                  :isBox="true"
                  :isFlexEnd="true"
                  :img="item.thumb"
                  :title="item.title"
                  :url="'/#/tv/' + item.id"
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
  import {getTvList,getTagList, getStarList,getDirectorList} from 'api/tv';
  import {ERR_OK} from 'api/config';

  export default {
    data() {
      return {
        data: [],

        screenData:[],

        tagData: [],
        tagNow: "",
        tagDataNow: [],

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
      this._getTvList();
      this._getTagList();
      this._getStarList();
    },
    methods:{
      _getStarList(){
        getStarList().then(res => {
          if (res.meta.errno === ERR_OK){
            this.starData = res.data;
          }
        })
      },
      _getTvList() {
        getTvList().then(res => {
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
      _refreshData(arr){
        this.data = arr.slice(0,this.pageSize);
        this.total = arr.length;
      },
      _refresh(){
        this.screenData = [];
        if (!this.starDataNow.length > 0 && !this.tagDataNow.length){
          this._refreshData(this.dataTotal);
        }else{
          this._refreshData(this.$_.union(this.starDataNow,this.tagDataNow));
        }
      },
      _dataRemake() {
         if (this.starDataNow.length > 0 && this.tagDataNow.length > 0){
           this.screenData = this.$_.intersection(this.starDataNow, this.tagDataNow);
           this._refreshData(this.screenData);
         }
      },
      _changStarSelect(){
        this.starDataNow = [];
        this._refresh();

        if(this.starNow.length > 0){
          let dataTotal = this.dataTotal;
          dataTotal.forEach((item) => {
            this.starNow.forEach((selfStar) => {
              item.star.forEach((star) => {
                  if (selfStar === star){
                    this.starDataNow.push(item)
                  }
              });
            });
          });
          this._refreshData(this.$_.union(this.starDataNow));
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
  .kkz-tv{
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
            .star-select{
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
          .dateTv{
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