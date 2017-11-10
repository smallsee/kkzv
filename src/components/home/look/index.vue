<template>
  <div class="kkz-look w">
    <div class="margin-top-10">
      <Input v-model="video" placeholder="请输入视频链接，爱奇艺，优酷，b站的 如b站：https://www.bilibili.com/video/av2765086/" :icon="'search'" @on-enter="_selectVideo" @on-click	="_selectVideo">
      </Input>
    </div>


    <div class="video margin-top-10 main">
      <iframe :src="'http://jiexi.92fz.cn/player/vip.php?url=' + videoNow " width="100%" scrolling="no" height="100%" ></iframe>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        video: '',
        videoNow:'https://www.bilibili.com/video/av2765086/'
      }
    },
    methods:{
      _selectVideo() {
        this.videoNow = this.video;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  @media only screen and (min-width: 50em) {
    .kkz-look{
      .main{
        width: 100%;
        height: 551.25px;
      }
    }
  }

  @media only screen and (max-width: 50em) {
    .kkz-look{
      .main{
        width: 100%;
        height: 235px;
      }
    }
  }
</style>