<template>
  <div class="w">
    <div class="margin-top-10">
      <Input v-model="video" placeholder="请输入视频链接，爱奇艺，优酷，b站的 如b站：https://www.bilibili.com/video/av2765086/" :icon="'search'" @on-enter="_selectVideo" @on-click	="_selectVideo">
      </Input>
    </div>


    <div class="video margin-top-10">
      <iframe :src="'http://jiexi.071811.cc/jx.php?url=' + videoNow " width="100%" scrolling="no" height="551.25px" ></iframe>
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

</style>