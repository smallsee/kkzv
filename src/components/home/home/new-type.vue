<template>
  <div class="new-type">
    <header-title :headerTitle="headerTitle" :headerText="headerText"></header-title>

    <ul class="clearfix">
      <template v-for="(item,index) in data">
      <li style="float: left">
        <image-title-rate
          :url="'/#/' + urlType + '/' + item.id"
          :title="item.title"
          :img="item.thumb"
          :isNoMarginRight="(index + 1 )%5 ===0"
        ></image-title-rate>
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
      urlType:{
        type: String,
        default: '#'
      },
      headerTitle:{
        type: String,
        default: '#'
      },
    },
    data() {
      return {
        headerText:[
          {
            url:'#',
            text:'骑士&魔法'
          },
          {
            url:'#',
            text:'实教'
          },
          {
            url:'#',
            text:'狂堵'
          },
          {
            url:'#',
            text:'龙珠'
          },
        ]
      }
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
      .new-type{
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