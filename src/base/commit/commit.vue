<template>
  <div class="kkz-commit flex-row">
    <a class="user-thumb" :href="userUrl">
      <img v-lazy="img" :style="{width: imgSize, height: imgSize}">
    </a>

    <div class="content">
      <p class="user-commit word-break" :style="{ 'max-height':maxHeight }">
        <a class="user-name" :href="userUrl">{{userName}} :</a>
        {{commitText}}
      </p>

      <div class="from-video flex-row-between">

        <div v-show="isShowVideo" class="from-video_name word-break" :style="{ 'max-width':maxWidth }">
          作品: <a :href="videoUrl" >{{videoTitle}}</a>
        </div>

        <span>
          <span v-if="!isShowVideo">{{loushu}} 楼  |</span>
          {{time}}
        </span>

        <div v-show="!isShowVideo" class="reply">
          <span @click.stop="_commitReply">回复</span>
          |
          <span @click.stop="_commitUp">点赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      loushu:{
        type:Number,
        default: 0
      },
      id:{
        type:Number,
        default: 0
      },
      commitText:{
        type:String,
        default: "请输入评论"
      },
      isShowVideo:{
        type:Boolean,
        default: true
      },
      img:{
        type:String,
        default: "http://oeu14qdl0.bkt.clouddn.com/68a4a3745c2de67f80b8097b2a0f7403zzzzzzzzs.png"
      },
      imgSize:{
        type:String,
        default: "24px"
      },
      userUrl:{
        type:String,
        default: "#"
      },
      videoUrl:{
        type:String,
        default: "#"
      },
      videoTitle:{
        type:String,
        default: "海贼王zzzzzasdsadaasdsasssasdsaadsada"
      },
      maxHeight:{
        type: String,
        default: "45px"
      },
      maxWidth:{
        type: String,
        default: "150px"
      },
      userName:{
        type: String,
        default: "小海"
      },
      time:{
        type: String,
        default: "44分钟前"
      },
    },
    methods:{
      _commitReply(){
        this.$emit('commitReply', this.id);
      },
      _commitUp() {
        this.$emit('commitUp', this.id);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-commit{
    box-sizing: border-box;
    padding-top: 10px;
    border-top: 1px solid #ededed;
    .user-thumb{
      margin-right: 10px;
      img{
        border-radius: 50%;
      }
    }
    .content{
      width: 100%;
      .user-commit{
        letter-spacing: .02em;
        line-height: 21px;
        font-size: 13px;
        .user-name{
          display: inline;
          text-decoration: none;
          cursor: pointer;
          color: #118D93;
        }
      }
      .from-video{
        overflow: hidden;
        max-height: 12px;
        letter-spacing: .02em;
        color: #999;
        margin: 10px 0;
        font-size: 12px;
      }
      .reply{
        span{
          cursor: pointer;
          color: #118D93;
          margin: 0 5px;
          &:hover{
            color: #c34b69 !important;
          }
        }
      }
    }
  }
</style>