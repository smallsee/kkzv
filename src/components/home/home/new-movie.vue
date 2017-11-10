<template>
  <div class="new-movie">
    <header-title :headerTitle="'最新好看电影'" ></header-title>
    <ul class="clearfix">
      <template v-for="(item,index) in data">
      <li style="float: left">
        <image-title-rate :url="'/#/movie/' + item.id" :img="item.thumb" :title="item.title" :isNoMarginRight="(index + 1 ) % 5 === 0"></image-title-rate>
      </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  import ImageTitleRate from 'base/image-title-rate/image-title-rate'
  export default {
    props:{
      data:{
        type: Array,
        default:  function () {
          return []
        }
      },
    },
    components:{
      HeaderTitle,
      ImageTitleRate
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @media only screen and (min-width: 50em) {

  }

  @media only screen and (max-width: 50em) {
    .new-movie{
      width: 100%;
      ul{
        width: 100%;
        display: flex;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        li{
          margin-right: 5px;
          .image-title-rate{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>