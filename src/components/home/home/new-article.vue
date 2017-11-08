<template>
  <div class="hot-posts">
    <header-title :headerTitle="'最新好看文章'" :more="true" :moreText="'帖子'"></header-title>

    <ul class="clearfix">
      <template v-for="(item,index) in data">
      <li>
        <image-title-cover
          :img="item.thumb"
          :title="item.title"
          :textAlign="'left'"
          :textFont="'14px'"
          :width="233"
          :height="150"
          :isNoMarginRight="(index + 1) % 3 === 0"
        ></image-title-cover>
      </li>
      </template>


    </ul>
  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  import ImageTitleCover from 'base/image-title-cover/image-title-cover'
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
      ImageTitleCover
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .hot-posts{
    ul{
      li{
        float: left;
      }
    }
  }
</style>