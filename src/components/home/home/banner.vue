<template>
  <div class="kkz-banner">
    <div class="mask-background" style="width: 100%;overflow: hidden">
      <img src="./1.jpg" alt="">
    </div>
    <div class="banner w flex-row-between">
      <div class="left">

        <!--这边也要改造-->
        <Carousel  dots="none" autoplay v-model="banner_item" @on-change="bannerChange">
          <template v-for="(item,index) in banner">
          <Carousel-item>
            <image-title-cover :url="'/#/anime/' + item.id" :img="item.thumb" :width="430" :height="300" :title="item.title"></image-title-cover>
          </Carousel-item>
          </template>
        </Carousel>
      </div>

      <!--后期改为组件-->
      <ul class="right clearfix">

        <template v-for="(item,index) in banner_list">
          <li class="float-left">
            <image-title-cover :url="'/#/picture/' + item.id" :img="item.thumb" :textFont="'12px'" :title="item.title" :isNoMarginRight="(index+1) % 3 === 0"></image-title-cover>
          </li>
        </template>


      </ul>
    </div>
  </div>
</template>

<script>
  import ImageTitleCover from 'base/image-title-cover/image-title-cover'
  export default {
    props:{
      banner:{
        type: Array,
        default:  function () {
          return []
        }
      },
      banner_list:{
        type: Array,
        default:  function () {
          return []
        }
      }
    },
    data() {
      return {
        banner_item: 0,
      }
    },
    methods: {
      bannerChange(oldValue, value) {

      }
    },
    components:{
      ImageTitleCover
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/variable";
  .kkz-banner{
    .mask-background{
      position: absolute;
      overflow: hidden;
      filter: blur(10px);
      z-index: -2;
      margin-top: -10px;
      height: 320px;

    }
    .banner{
      margin-top: 10px;
      .left{
        width: 430px;
        .banner-item{
          position: relative;
          width: 430px;
          height: 300px;
          overflow: hidden;
          img{
            width: 100%;
          }
          h3{
            position: absolute;
            text-align: center;
            color: $color-text-white;
            width: 430px;
            bottom: 0;
          }
        }

      }
      .right{
        width: 530px;
      }
    }
  }
</style>