<template>
  <div class="kkz-tv_show">

    <transition name="slide">
      <div v-if="isCloseLight" class="mask-box"></div>
    </transition>

    <div class="w">
      <div class="flex-row-between  title">

        <div>
          <Breadcrumb separator="/">

            <Breadcrumb-item href="/tv">
              视频
            </Breadcrumb-item>

            <Breadcrumb-item :href="'/tv/' + data.id">
              {{data.title}}
            </Breadcrumb-item>

            <Breadcrumb-item>
              第{{ file + 1 }}集：{{file_name}}
            </Breadcrumb-item>

          </Breadcrumb>
        </div>

        <Button :class="{close: isCloseLight}" class="light" type="ghost" shape="circle" @click="_changeLight">
          {{ isCloseLight ? '开灯' : '关灯' }}
        </Button>

      </div>


      <div class="tv">
        <iframe :src="'http://jiexi.92fz.cn/player/vip.php?url=' + file_url " width="100%" scrolling="no" height="100%" ></iframe>
      </div>

      <div class="file-info clearfix">

        <template v-for="(item,index) in data.files">
          <a :href="'/#/tv/detail/' + data.id + '?file=' + index" :class="{active: index == file}" class="file float-left"
             @click="_changFile(index)"
          >{{index + 1}}.{{item.file_name}}</a>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import {getShowTvList} from 'api/tv'
  export default {
    data() {
      return {
        isCloseLight: false,
        data:[],
        file: 0,
        file_url: '',
        file_name: '',
      }
    },
    created() {

      this.file = parseInt(this.$route.query.file) ? parseInt(this.$route.query.file) : 0;
      this._getTvData(this.$route.params.id);
    },
    methods:{
      _changeLight() {
        this.isCloseLight = !this.isCloseLight
      },
      _changFile(id) {
        this.file = id;
        this.file_url = this.data.files[this.file].file_url
        this.file_name = this.data.files[this.file].file_name
      },
      _getTvData(id) {
        getShowTvList(id).then(res => {
          this.data = res.data;
          this.file_url = this.data.files[this.file].file_url;
          this.file_name = this.data.files[this.file].file_name
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  

  @media only screen and (min-width: 50em) {
    .kkz-tv_show{
      .slide-enter-active, .slide-leave-active{
        transition: all 1s;
      }
      .slide-enter, .slide-leave-to{
        opacity: 0;
      }
      .mask-box{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 20;
      }
      .title{
        margin-top: 20px;
        .ivu-breadcrumb-item-link{
          &:hover{
            color: #dd5862;
          }
        }
        .light{
          position: relative;
          background-color: black;
          color: #ffffff;
          z-index:30;
        }
        .close{
          background-color: white;
          color: #dd5862;
        }
      }
      .tv{
        position: relative;
        margin-top: 20px;
        z-index:30;
        width: 100%;
        height: 551.25px;
      }
      .file-info{
        margin-top: 20px;
        .file{
          cursor: pointer;
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
          &.active{
            color: #dd5862;
            background-color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-tv_show{
      .slide-enter-active, .slide-leave-active{
        transition: all 1s;
      }
      .slide-enter, .slide-leave-to{
        opacity: 0;
      }
      .mask-box{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 20;
      }

      .title{
        margin-top: 20px;
        .ivu-breadcrumb-item-link{
          &:hover{
            color: #dd5862;
          }
        }
        .light{
          position: relative;
          background-color: black;
          color: #ffffff;
          z-index:30;
        }
        .close{
          background-color: white;
          color: #dd5862;
        }
      }
      .tv{
        position: relative;
        margin-top: 20px;
        z-index:30;

        width: 100%;
        height: 235px;
      }
      .file-info{
        margin-top: 20px;
        .file{
          cursor: pointer;
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
          &.active{
            color: #dd5862;
            background-color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
</style>
