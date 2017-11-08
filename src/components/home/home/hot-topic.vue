<template>
  <div class="hot-anime-team">
    <header-title headerTitle="热门标签"></header-title>

    <div>
      <template v-for="(item,index) in data">
        <a-background :text="item.name"></a-background>
      </template>
    </div>
  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  import ABackground from 'base/a-background/a-background'
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
      ABackground,
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .a-background{

  }
</style>