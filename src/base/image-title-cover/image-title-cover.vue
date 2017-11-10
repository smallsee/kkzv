<template>
  <div class="banner-item_hot" :class="{ 'no-margin-right': isNoMarginRight }" :style="{ width:  width+ 'px', height: height + 'px' }">
    <a :href="url">
      <img v-lazy="img" alt="">
    </a>
    <h3 :style="{ width:  width+ 'px',   'text-align': textAlign,'font-size': textFont,'color':textColor}">{{title}}</h3>
  </div>
</template>

<script>
  export default {
    props: {
      rateValue: {
        type: String,
        default: '4'
      },
      width: {
        type: String,
        default: '170'
      },
      height: {
        type: String,
        default: '145'
      },
      url:{
        type: String,
        default: '#'
      },
      isNoMarginRight:{
        type: Boolean,
        default: false
      },
      img:{
        type: String,
        default: 'http://ohadc19qz.bkt.clouddn.com/00034acdc2f7c957146a84de54bfef0c'
      },
      textAlign:{
        type: String,
        default: 'center'
      },
      title:{
        type: String,
        default: '请输入标题文字'
      },
      textFont:{
        type: String,
        default: '16px'
      },

      textColor:{
        type: String,
        default: 'white'
      }

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/variable";
  .banner-item_hot{
    position: relative;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    img{
      width: 100%;
      height: 100%;
    }
    h3{
      position: absolute;
      box-sizing: border-box;
      padding: 0 5px;
      color: $color-text-white;
      bottom: 5px;
    }
  }
</style>