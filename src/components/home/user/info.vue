<template>

    <div class="kkz-user_info">
      <template v-if="isLogin">
        <template v-if="user.id == $route.params.id">
          <div class="user_info">


            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">


              <Form-item label="名称" prop="name">
                <Input :disabled="edit" v-model="formValidate.name" placeholder="请输入名称"></Input>
              </Form-item>





              <Form-item label="简介">
                <Input :disabled="edit" v-model="formValidate.info" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入您的意见..."></Input>
              </Form-item>

            </Form>


            <div class="flex-row-end user_edit" >
              <Button type="info" @click.stop="_changeEdit">修改</Button>
              <template v-if="!edit">
                <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
              </template>
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
  import {postUserInfoUpdate} from 'api/auth';
  import {ERR_OK} from 'api/config';
  import {postImageDelete} from 'api/image'
  export default {
    data() {
      return {
        edit: true,
        formValidate: {
          name: '',
          email: '',
          info:'',
          thumb:''
        },
        ruleValidate: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.formValidate.name = this.user.name;
      this.formValidate.email = this.user.email;
      this.formValidate.thumb = this.user.thumb;
    },
    methods:{
      _changeEdit(){
        this.edit = !this.edit;
      },
      handleSubmit(name) {

        this.$refs[name].validate((valid) => {
          if (valid) {

            postUserInfoUpdate(this.formValidate).then(res => {
              if(res.meta.errno === ERR_OK){
                window.localStorage.setItem('kkzUser',JSON.stringify(res.data));
                this.$Message.success('成功修改!');
                this.$store.dispatch('getUser');
                this.edit = !this.edit;
              }
            })
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },


      //上传图片
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
  .user_info{
    box-sizing: border-box;
    padding: 10px 50px 10px 0;

  }
  .user_edit{
    button{
      margin-left: 20px;
    }
  },
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
</style>