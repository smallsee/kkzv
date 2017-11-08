<template>
  <div class="latest-topics">
    <header-title headerTitle="最火电影" :more="true" moreText="专题"></header-title>

    <ul class="clearfix">
      <template v-for="(item,index) in data">
        <li>
          <image-title-cover :textColor="'#ff9400'" :url="'/#/movie/' + item.id" :img="item.thumb" :title="item.title" textAlign="left" textFont="14px" :width="250" :height="150"></image-title-cover>
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
      }
    },
    components:{
      HeaderTitle,
      ImageTitleCover
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .latest-topics{

  }
</style>