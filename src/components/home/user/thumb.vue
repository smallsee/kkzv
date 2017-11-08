<template>

  <div class="kkz-user_info">
    <template v-if="isLogin">
      <template v-if="user.id == $route.params.id">
        <div class="wrapper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.true"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.width"
            :autoCropHeight="option.height"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
        <div class="test-button">
          <button @click="changeImg" class="btn">changeImg</button>
          <label class="btn" for="uploads">upload</label>
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                 accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
          <button @click="startCrop" v-if="!crap" class="btn">start</button>
          <button @click="stopCrop" v-else class="btn">stop</button>
          <button @click="clearCrop" class="btn">clear</button>
          <button @click="finish('base64')" class="btn">preview(base64)</button>
          <button @click="finish('blob')" class="btn">preview(blob)</button>
          <a @click="down('base64')" class="btn" :href="downImg" download="demo">download(base64)</a>
          <a @click="down('blob')" class="btn" :href="downImg" download="demo">download(blob)</a>
        </div>
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
          <div :style="previews.div">
            <img :src="option.img" :style="previews.img">
          </div>
        </div>
      </template>
      <template v-else>
        <div class="diff_user">
          = =你不可以这样哦
        </div>
      </template>
    </template>
  </div>

</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
  import vueCropper from 'vue-cropper'
  export default {
    data() {
      return {
//        src: 'http://img1.vued.vanthink.cn/vued7553a09a5d5209ebd00a48264394b7f3.png',
//        cropSrc: 'http://img1.vued.vanthink.cn/vued7553a09a5d5209ebd00a48264394b7f3.png',
//        cropArgs: {
//          toCropImgH: '?',
//          toCropImgW: '?',
//          toCropImgX: '?',
//          toCropImgY: '?'
//        },
//        token:''
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
          }
        ],
        option: {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [4, 3],
          fixedBox: true
        },
        downImg: '#'
      };
    },
    created() {
//      this.token = JSON.parse(window.localStorage.getItem('kkzToken'));
    },
    methods:{
      changeImg () {
        this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
      },
      startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop () {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop () {
        // clear
        this.$refs.cropper.clearCrop()
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      finish (type) {
        // 输出
        var test = window.open('about:blank')
        test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var test = window.open('')
            test.location.href = window.URL.createObjectURL(data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            test.location.href = data
          })
        }
      },

      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg (e) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.option.img = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    components: {
      vueCropper,
      'vue-core-image-upload': VueCoreImageUpload
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      user() {
        return this.$store.state.user
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .upload{
    max-width: 150px;
    margin-top: 30px;
    text-align: center;
    display: block;
    padding: 6px 10px;
    height: 24px;
    background: #F6697A;
    border-radius: 5px;
    font-size: 12px;
    color: white;
    cursor: pointer;
  }


  * {
    margin: 0;
    padding: 0;
  }
  .content {
    margin: auto;
    max-width: 1200px;
    margin-bottom: 100px;
  }
  .test-button {
    display: flex;
    flex-wrap: wrap;
  }
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }
  .des {
    line-height: 30px;
  }
  code.language-html {
    padding: 10px 20px;
    margin: 10px 0px;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
  }
  .show-info {
    margin-bottom: 50px;
  }
  .show-info h2 {
    line-height: 50px;
  }
  /*.title, .title:hover, .title-focus, .title:visited {
    color: black;
  }*/
  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
  }
  .test {
    height: 500px;
  }
  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
  .model img {
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }
  .c-item {
    display: block;
    padding: 10px 0;
    user-select: none;
  }
  @keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>