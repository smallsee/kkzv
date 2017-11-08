<template>
  <div class="new-picture">
    <header-title headerTitle="最火图片" :more="true" moreText="图片"></header-title>

    <ul class="clearfix">
      <template v-for="(item,index) in data">
      <li>
        <a :href="'/#/picture/' + item.id"><img v-lazy="item.thumb" alt=""></a>
      </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
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
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .new-picture{
    ul{
      li{
        float: left;
        overflow: hidden;
        width: 75px;
        height: 75px;
        margin-right: 10px;
        margin-top: 10px;
        img{
          width: 100%;
        }
      }
    }
  }
</style>