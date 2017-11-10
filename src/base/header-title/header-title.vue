<template>

  <div class="flex-row-between header-title">
    <h4  >{{headerTitle}}</h4>
    <ul v-if="!more">
      <li v-for="item in headerText">
        <router-link class="header-title_a" :to="item.url">
          {{item.text}}
        </router-link>

      </li>
    </ul>

    <router-link tag="span" :to="url" v-if="more">
        更多{{moreText}}
    </router-link>

  </div>


</template>

<script>
  export default {
    props: {
      headerTitle: {
        type: String,
        default: '请输入标题名称'
      },
      headerText: {
        type: Array,
        default:  function () {
          return []
        }
      },
      moreText: {
        type: String,
        default: ''
      },
      more: {
        type: Boolean,
        default: false
      },
      isShowBorder: {
        type: Boolean,
        default: true
      },
      url: {
        type: String,
        default: '#'
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/variable";
  .header-title{
    border-left: 4px solid $color-border-red-d;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 10px;
    h4{
      font-size: 1.6rem;
      line-height: 20px;
    }
    span{
      cursor: pointer;
      font-size: 13px;
      color: #959595;
      line-height: 20px;
      height: 20px;
    }
    ul{
      li{
        float: left;
        margin-right: 10px;
        a{
          font-size: 14px;
        }
      }
    }
  }
</style>