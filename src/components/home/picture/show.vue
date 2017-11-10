<template>
  <div class="kkz-picture_show">
    <Modal
      v-model="isShowCommit"
      title="发表评论">

      <write-commit :showTitle="false" :commitWidth="415" @commitSubmit="_commitSubmit"></write-commit>
      <div slot="footer"></div>
    </Modal>

    <div class="w">
      <div class="clearfix book_list">
        <div class="book_list_left" style="border-bottom: 0">
          <div class="user-info">
            <div class="user-thumb">
              <img v-lazy="user.thumb" alt="">
            </div>
            <div class="user-name" style="" >{{user.name}}</div>

            <template v-if="isLogin">
              <div v-if="hasFan" class="user-star" @click="_fanChange(user.id)">取消关注</div>

              <div v-if="!hasFan" class="user-star" @click="_fanChange(user.id)">关注</div>
            </template>
          </div>
        </div>
        <div class="book_list_right">
          <div class="title clearfix">
            {{data.title}}
          </div>

          <div class="content clearfix">

            <div class="time flex-row-between">
              <div class="title-box">
                <i style="color: #F6697A" class="fa fa-clock-o fa-2x"></i>
                <span class="time_text">{{created_at.date}}</span>
              </div>
              <div id="jsLeftBtn" class="collect" style="background: none">



                <div v-if="isFav" @click="_favChange">
                  <span  style="margin-right: 2px;color: #FFAFC9" class="fa fa-star"></span>已收藏
                </div>

                <div v-if="!isFav" @click="_favChange">
                  <span  style="margin-right: 2px" class="fa fa-star-o"></span>收藏
                </div>



              </div>
            </div>

            <div class="content_image content-box">

              <div  style="text-indent:2em;word-wrap:break-word;word-break:break-all;" class="book-list-item-content"></div>
              <div id="book-list" >

                <img :src="data.big_thumb" alt="" width="100%" >


              </div>
            </div>



            <!--<div class="hide_thing">-->
            <!--sasd-->
            <!--</div>-->

            <div class="hide_thing" v-if="!isLogin">
              <p  style="cursor: pointer" @click="_openLogin">点击登陆后评论</p>
            </div>

            <div style="padding: 20px;box-sizing: border-box" v-if="isLogin">
              <write-commit :showThumb="false" :showTitle="false" :commitWidth="735" @commitSubmit="_commitSubmit"></write-commit>
            </div>

            <div class="float-right">
              <Page   simple :total="commitTotal" :page-size="commitPageSize" :current="commitNowPage" @on-change="_changePageSize"></Page>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="w" style="margin-top: -5px">

      <div class="clearfix book_list book_commit"  >
        <template v-for="(item,index) in commitData">
          <div class="book_list_left">
            <div class="user-info">
              <div class="user-thumb">
                <img v-lazy="item.user.thumb" alt="">
              </div>
              <div class="user-name">{{item.user.name}}</div>

            </div>
          </div>
          <div class="book_list_right">

            <div class="content">

              <div class="time">
                <i style="color: #F6697A" class="fa fa-clock-o fa-2x"></i>
                <span class="time_text"> {{item.created_at}}</span>
              </div>

              <div class="content_image ">
                <div  style="text-indent:2em;word-wrap:break-word;word-break:break-all;">
                  {{item.content}}
                </div>
                <span class="content_commit" >{{data.commits_count - (commitNowPage - 1 ) * commitPageSize - index}}楼</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
  import {postStoreCommit,postStoreFav,postStoreFan,gethasFan,gethasFav} from 'api/common'
  import {getShowPictureList} from 'api/picture';
  import {ERR_OK,has_delete,has_store} from 'api/config';
  import WriteCommit from 'base/write-commit/write-commit'
  export default {
    data() {
      return {
        data:[],
        user:[],
        created_at:[],

        commitTotalData:[],
        commitData:[],
        commitPageSize:5,
        commitTotal: 0,
        commitNowPage: 1,

        isShowCommit:false,
        isFav:false,
        api_token: true,
        hasFan:false
      }
    },
    created() {
      if (!this.isLogin){
        this.api_token = false;
      }
      this._getPictureData(this.$route.params.id,this.api_token);
      this._hasFav();
    },
    methods:{
      _openCommit(){
        this.isShowCommit = true;
      },
      _openLogin(){
        this.$router.push({
          path: '/login'
        });
      },
      _changePageSize(even) {
        this.commitNowPage = even;
        this.commitData = this.commitTotalData.slice( (even-1)*this.commitPageSize , even*this.commitPageSize);
      },
      _commitSubmit(commit) {
        postStoreCommit(this.data.id,'picture',commit).then(res => {
          if (res.meta.errno === ERR_OK){
            this.$Message.success('成功添加评论');
            this.data.commits_count += 1;
            this.commitData = this.$_.concat(res.data,this.commitData);
            this.isShowCommit = false
          }
        })
      },
      _fanChange(star_id){

        console.log(this.userNow.id, star_id)
        postStoreFan(this.userNow.id, star_id).then(res => {

          if (res.meta.errno === has_delete){
            this.$Message.success('取消关注');
            this.hasFan = false
          }
          if (res.meta.errno === has_store){
            this.$Message.success('成功关注');
            this.hasFan = true
          }

        })
      },
      _favChange() {
        postStoreFav(this.data.id,'picture').then(res => {
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
      _getPictureData(id){
        getShowPictureList(id).then(res => {
          if (res.meta.errno === ERR_OK){


            this.data = res.data;
            this.user = res.data.user;
            this.created_at = res.data.created_at;
            this.commitTotalData = res.data.commits;
            this.commitTotal = this.commitTotalData.length;
            this.commitData = this.commitTotalData.slice(0,this.commitPageSize);

            this._hasFan();
          }
        })
      },
      _hasFan(){
        gethasFan(this.userNow.id, this.user.id).then(res => {
          if (res.meta.errno === has_delete){
            this.hasFan = true
          }
          if (res.meta.errno === has_store){
            this.hasFan = false
          }
        })
      },
      _hasFav(){
        gethasFav(this.userNow.id,'picture', this.$route.params.id).then(res => {
          if (res.meta.errno === has_delete){
            this.isFav = true
          }
          if (res.meta.errno === has_store){
            this.isFav = false
          }
        })
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      userNow() {
        return this.$store.state.user
      }
    },
    components: {
      WriteCommit
    },
    watch: {
      '$route': function (route) {
        this._hasFav();
        this._getPictureData(this.$route.params.id);
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">






  @media only screen and (min-width: 50em) {
    .kkz-picture_show{
      .book_list{
        margin-top: 20px;
        border: 1px solid rgba(255,255,255,0.82);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #1b2433;
        overflow: hidden;
        margin-bottom: 0;
        .book_list_left{
          float: left;
          background-color: #1b2433;
          border-top-left-radius: 10px;
          padding-top: 10px;
          width: 150px;
          min-height: 260px;
          border-bottom: 1px solid rgba(103, 90, 90, 0.24);
          .user-name{
            width: 150px;
            margin: 20px auto;

            height:30px;text-align: center;color: #fff;line-height: 20px;text-overflow:ellipsis;white-space:nowrap;overflow: hidden
          }
          .user-star{
            text-align: center;
            margin: 10px auto;
            width: 90px;
            display: block;
            padding: 8px 20px;
            background: #F6697A;
            border-radius: 5px;
            font-size: 12px;
            color: white;
            cursor: pointer;
          }
          .user-thumb{
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 10px;
          }
          img{
            width: 100%;
            height: 100%;
            border-radius: 150px;
          }

        }

        .book_list_right{
          width: 828px;
          float: right;
          overflow: hidden;
          background-color: #edf2f6;

          .title{
            width: 100%;
            height: 80px;
            padding-left: 50px;
            color: gray;
            background-color: white;

            font-size: 20px;
            font-weight: bold;
            line-height: 80px;

          }

          .content{
            margin-top: 10px;
            width: 95%;
            background-color: white;
            float: right;
            padding-left: 1%;
            overflow: hidden;
            .time{
              width: 100%;
              height: 50px;
              background-color: white;
              margin-bottom: 5px;
              line-height: 50px;
              font-size: 12px;
              .title-box{
                float: left;
                height: 50px;
                width: 630px;
                span{
                  margin-left: 5px;
                }
              }
              .collect{
                width: 70px;
                height: 40px;
                margin-right: 10px;
                float: right;
                text-align: center;
                background-color: #B5B5B5;
                border-radius: 10px;
                margin-top: 10px;
                line-height: 40px;
                cursor: pointer;
              }
            }

            .content_image{

              width: 98%;
            }
            .content-box{
              min-height: 400px;
            }
            #book-list{
              img{
                max-width: 844px;
                max-height: 600px;
                cursor: pointer;
                margin-bottom: 5px;
              }
            }


            .hide_thing{
              border: 1px dashed black;
              width: 98%;
              height: 80px;
              line-height: 80px;
              text-align: center;
              margin-top: 20px;
              margin-bottom: 20px;

            }
          }
        }
      }
      .book_commit{
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        margin-top: 0;
        .book_list_right{
          .content{
            min-height: 250px;
            position: relative;

          }
          .content_commit{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 35px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }

      .book_list_mask{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.8);
        z-index:200;
        left: 0;
        top: 0;

        .commit_add{
          border: 3px solid #b1aeae;
          margin-top: 150px;
          padding: 10px;
        }
        .commit_add_button{
          margin-top: 20px;
        }
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-picture_show{
      .book_list{
        width: 100%;
        margin-top: 20px;
        border: 1px solid rgba(255,255,255,0.82);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #1b2433;
        overflow: hidden;
        margin-bottom: 0;
        .book_list_left{
          display: none;
        }

        .book_list_right{
          width: 100%;
          overflow: hidden;
          background-color: #edf2f6;

          .title{
            width: 100%;
            height: 50px;
            padding-left: 10px;
            color: gray;
            background-color: white;

            font-size: 20px;
            font-weight: bold;
            line-height: 50px;

          }

          .content{
            width: 100%;
            background-color: white;
            padding-left: 1%;
            overflow: hidden;
            .time{
              width: 100%;
              height: 50px;
              background-color: white;
              margin-bottom: 5px;
              line-height: 50px;
              font-size: 12px;
              .title-box{
                height: 50px;
                width: 100%;
                span{
                  margin-left: 5px;
                }
              }
              .collect{
                width: 70px;
                height: 40px;
                margin-right: 10px;
                float: right;
                text-align: center;
                background-color: #B5B5B5;
                border-radius: 10px;
                margin-top: 10px;
                line-height: 40px;
                cursor: pointer;
              }
            }

            .content_image{

              width: 98%;
            }
            #book-list{
              img{
                width: 100%;
                cursor: pointer;
                margin-bottom: 5px;
              }
            }


            .hide_thing{
              border: 1px dashed black;
              width: 98%;
              height: 80px;
              line-height: 80px;
              text-align: center;
              margin-top: 20px;
              margin-bottom: 20px;

            }
          }
        }
      }

      .book_commit{

      border-radius: 10px;
        margin-top: 10px;
        .book_list_right{
          .content{
            min-height: 120px;
            position: relative;

          }
          .content_commit{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 35px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>