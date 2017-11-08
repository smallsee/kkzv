<template>
  <div class="recommend">
    <header-title :headerTitle="'最新好看电影'" ></header-title>
    <ul class="clearfix">
      <template v-for="(item,index) in data">
      <li style="float: left">
        <image-title-rate :img="item.thumb" :title="item.title" :isNoMarginRight="(index + 1 ) % 5 === 0"></image-title-rate>
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

</style>