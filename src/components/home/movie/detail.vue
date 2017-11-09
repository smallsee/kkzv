<template>
  <div class="kkz-movie_show">

    <transition name="slide">
      <div v-if="isCloseLight" class="mask-box"></div>
    </transition>

    <div class="w">
      <div class="flex-row-between  title">

        <div>
          <Breadcrumb separator="/">

            <Breadcrumb-item href="/movie">
              视频
            </Breadcrumb-item>

            <Breadcrumb-item :href="'/movie/' + data.id">
              {{data.title}}
            </Breadcrumb-item>

          </Breadcrumb>
        </div>

        <Button :class="{close: isCloseLight}" class="light" type="ghost" shape="circle" @click="_changeLight">
          {{ isCloseLight ? '开灯' : '关灯' }}
        </Button>

      </div>


      <div class="movie">
        <iframe :src="'http://jiexi.92fz.cn/player/vip.php?url=' + data.url " width="100%" scrolling="no" height="551.25px" ></iframe>
      </div>
      
    </div>
  </div>
</template>

<script>
  import {getShowMovieList} from 'api/movie'
  export default {
    data() {
      return {
        isCloseLight: false,
        data:[],
        file: 0,
      }
    },
    created() {
      this._getMovieData(this.$route.params.id);
    },
    methods:{
      _changeLight() {
        this.isCloseLight = !this.isCloseLight
      },
      _getMovieData(id) {
        getShowMovieList(id).then(res => {
          this.data = res.data;
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-movie_show{
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
    .movie{
      position: relative;
      margin-top: 20px;
      z-index:30;
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
</style>
