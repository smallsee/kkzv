<template>
  <div class="latest-commit">
    <header-title :headerTitle="'最新评论'" ></header-title>

    <template v-for="(item,index) in data">
      <commit :img="item.user.thumb"
              :userName="item.user.name"
              :time="''"
              :commitText="item.content"
              :userUrl="'/#/user/' + item.user.id"
      ></commit>
    </template>

  </div>
</template>

<script>
  import HeaderTitle from 'base/header-title/header-title'
  import Commit from 'base/commit/commit'
  export default {
    props:{
      data:{
        type: Array,
        default:  function () {
          return []
        }
      }
    },
    mounted() {
      console.log(this.data);
    },
    components:{
      HeaderTitle,
      Commit
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>