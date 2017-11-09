<template>
  <div class="image-title-row flex-row" :class="{'image-title-border-bottom': isBorderBottom}">

    <a class="user-thumb" :href="url">
      <img v-lazy="img" :style="{width: imgSize, height: imgSize}" :class="{box: isBox}">
    </a>

    <div class="content">

      <a  :href="url">
        <h3 class="title word-break"  v-bind:class="classObject" :style="{'max-height':maxHeight}">{{title}}</h3>
      </a>

      <div class="video-info" :class="{'flex-row-end' : isFlexEnd}" v-if="isShowText">
        <a class="user-name"  :href="userUrl">{{userName}}</a>
        <span>{{time}}</span>
        &nbsp;|&nbsp;
        <span>{{num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      isBox:{
        type:Boolean,
        default: false
      },
      isFlexEnd:{
        type:Boolean,
        default: false
      },
      isShowText:{
        type:Boolean,
        default: true
      },
      isBorderBottom:{
        type:Boolean,
        default: true
      },
      colorClass:{
        type:String,
        default: "a-blue-pink"
      },
      img:{
        type:String,
        default: "http://oeu14qdl0.bkt.clouddn.com/68a4a3745c2de67f80b8097b2a0f7403zzzzzzzzs.png"
      },
      imgSize:{
        type:String,
        default: "45px"
      },
      userUrl:{
        type:String,
        default: "#"
      },
      url:{
        type:String,
        default: "javascript:void(0);"
      },
      title:{
        type:String,
        default: "海贼王zzzzzasdsadaasdsasssasdsaadsada"
      },
      maxHeight:{
        type: String,
        default: "16px"
      },

      userName:{
        type: String,
        default: ""
      },
      time:{
        type: String,
        default: "44分钟前"
      },
      num:{
        type: String,
        default: "38部动漫"
      },
    },
    computed: {
      classObject: function () {
        return this.colorClass
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .image-title-border-bottom{
    border-bottom: 1px dashed rgba(224, 224, 224, 0.61);;
  }
  .image-title-row{
    padding-top: 10px;
    .user-thumb{
      margin-right: 10px;
      img{
        border-radius: 50%;
        &.box{
          border-radius: 0;
        }
      }
    }
    .content{
      margin-top: 10px;
      width: 100%;
      .title{
        color: #444;
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
      }
      .video-info{
        a{
          margin-right: 5px;
        }
        margin: 10px 0;
        font-size: 12px;
        color: #999;
      }
    }

  }
</style>