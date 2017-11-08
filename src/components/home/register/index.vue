
<template>
    <div class="kkz-login">
      <div class="login_image">
        <img src="./background_login3.jpg" alt="" width="100%" height="100%">
      </div>
      <Form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
        <Form-item class="formLogin-title">
          <h3>开口奏僵尸注册</h3>
        </Form-item>

        <Form-item prop="name">
          <i-input size="large" type="text" v-model="formLogin.name" placeholder="名称">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>

        <Form-item prop="email">
          <i-input size="large" type="text" v-model="formLogin.email" placeholder="邮箱">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>

        <Form-item prop="password">
          <i-input size="large"  type="password" v-model="formLogin.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>

        <Form-item prop="confirmation_password">
          <i-input size="large"  type="password" v-model="formLogin.confirmation_password" placeholder="重复密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </i-input>
        </Form-item>

        <Form-item label="缩略图" prop="thumb">

          <div class="demo-upload-list" v-if="formLogin.thumb">
            <img :src="formLogin.thumb">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(formLogin.thumb)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(formLogin.thumb)"></Icon>
            </div>
          </div>




          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="drag"
            action="http://127.0.0.1:8000/api/image"
            :data="imgData"
            style="display: inline-block;width:80px">
            <div v-if="!formLogin.thumb" style="width: 80px;height:80px;line-height: 80px;border: 1px dashed #dddee1;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>

          <Modal title="查看图片" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
          </Modal>

          <!--<Upload-->
          <!--:on-success="_imgUploadSuccess"-->
          <!--:on-remove="_imgUploadRemovie"-->
          <!--action="http://rap.taobao.org/mockjs/17725/api/image?accessToken=aaa"-->
          <!--&gt;-->
          <!--<Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>-->
          <!--</Upload>-->
        </Form-item>


        <Form-item class="login-no-bottom">
          <Row >
            <i-col :xs="{ span: 2, offset: 4 }" >
              <i-button type="primary" @click="handleSubmit('formLogin')">注册</i-button>
            </i-col>
            <i-col :xs="{ span: 2, offset: 4 }" >
              <i-button type="primary" @click="handleLogin()">登陆</i-button>
            </i-col>
            <i-col :xs="{ span: 2, offset: 4 }">
              <i-button  type="primary" @click="formLoginReset('formLogin')">重置</i-button>
            </i-col>
          </Row>
        </Form-item>
      </Form>
    </div>
</template>
<script>
  import {postRegister, getUserInfo} from 'api/auth';
  import {ERR_OK} from 'api/config';
  import {postImageDelete} from 'api/image';
  export default {
    data () {
      return {
        imgData: {
          width: 300,
          height: 300,
        },
        imgName: '',
        defaultList: [],
        canCrop:true,
        visible: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl:'http://127.0.0.1:8000/api/crop/upload/',
        formLogin: {
          email: '',
          password: '',
          confirmation_password: '',
          thumb:'',
          name:''

        },
        formLoginRules: {
          name: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
          thumb: [
            { required: true, message: '缩略图不能为空', trigger: 'blur'}
          ],
          confirmation_password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
    },
    methods: {
      handleView (url) {
        this.imgName = url;
        this.visible = true;
      },
      handleRemove (file) {

        postImageDelete(this.formLogin.thumb).then((res) => {
          if (res.meta.errno === ERR_OK){
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.formLogin.thumb = '';
            this.$Message.success('成功删除');
          }else{
            this.$Message.error(res.message);
          }

        });


      },
      handleSuccess (res, file) {
        if (res.meta.errno === ERR_OK){
          this.formLogin.thumb = res.data;
          file.url = this.formLogin.thumb;
          this.$Message.success('成功添加');
        }else{
          this.$Message.error(res.message);
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },

      handleSubmit(name) {

        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formLogin.confirmation_password !== this.formLogin.password) {
              this.$Message.error('两次密码不一样!');
            }
            postRegister(this.formLogin).then(res => {
              if (res.token){
                window.localStorage.setItem('kkzToken',JSON.stringify(res.token));
                getUserInfo(res.token).then(res => {
                  window.localStorage.setItem('kkzUser',JSON.stringify(res.user));
                  this.$Message.success('成功登陆!');
                  this.$router.push({
                    path: '/'
                  });
                });

              }
            });


          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleLogin(){
        this.$router.push({
          path: '/login'
        });
      },
      formLoginReset(name){
        this.$refs[name].resetFields();
      }
    }
  }
</script>


<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-login{
    .quill-editor-example{
      min-height: 20em;
    }
    .demo-upload-list{
      display: inline-block;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
    }
    .demo-upload-list img{
      width: 100%;
      height: 100%;
    }
    .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
      display: block;
    }
    .demo-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
  .login_image{
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .card-box {
    padding: 20px;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: rgba(249, 249, 249, 0.57);;
    margin: 180px auto;
    width: 400px;

  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .formLogin-title {
    text-align: center;
    font-seze: 28px;
  }
  .formLogin-title h3{
    font-size: 18px;
  }
  .login-no-bottom {
    margin-bottom: 10px;
  }

</style>