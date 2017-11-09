<template>
  <div class="kkz-admin-article-create">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">


      <Form-item label="标题" prop="title">
        <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
      </Form-item>

      <Form-item label="缩略图" prop="thumb">

        <div class="demo-upload-list" v-if="formValidate.thumb">
          <img :src="formValidate.thumb">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(formValidate.thumb)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(formValidate.thumb)"></Icon>
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
          action="http://www.lifanh.com/api/image"
          :data="imgData"
          style="display: inline-block;width:80px">
          <div v-if="!formValidate.thumb" style="width: 80px;height:80px;line-height: 80px;border: 1px dashed #dddee1;">
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


      <Form-item label="话题" prop="topic">
        <multiselect v-model="formValidate.topic" tag-placeholder="选择话题" placeholder="选择话题" label="name" track-by="name" :options="topicList" :multiple="true" :taggable="true" @tag="addTopic"></multiselect>
      </Form-item>




      <Form-item label="内容" prop="content">
        <quill-editor ref="myTextEditor"
                      :content="formValidate.content"
                      :config="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
      </Form-item>

      <Form-item>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </Form-item>
    </Form>
  </div>
</template>
<script>
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  import ICol from "../../../../node_modules/iview/src/components/grid/col";
  import {postUpdateArticleList,getTopicList,getShowArticleList} from 'api/article';
  import {ERR_OK} from 'api/config';
  import {postImageDelete} from 'api/image'
  import Multiselect from 'vue-multiselect'
  import { quillEditor } from 'vue-quill-editor'
  export default {
    components: {ICol,Multiselect,quillEditor},
    data () {
      return {
        imgData: {
          width: 300,
          height: 300,
        },
        imgName: '',
        visible: false,
        //上传图片
        defaultList: [],
        canCrop:true,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl:'http://www.lifanh.com/api/crop/upload/',
        content:'',
        editorOption:{
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageImport: true,
            imageResize: {
              displaySize: true
            }
          }
        },
        topicList: [],
        formValidate: {
          title: '',
          topic: [],
          content: '',
          thumb:''
        },
        ruleValidate: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          topic: [
            { required: true, type: 'array', min: 1, message: '至少选择一个话题', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个话题', trigger: 'change' }
          ],
          thumb: [
            { required: true, message: '缩略图不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getTopicList()
      this._getArticleData(this.$route.params.id);
    },
    methods: {
      _getArticleData(id) {
        getShowArticleList(id).then(res => {
          if (res.meta.errno === ERR_OK){
            this.formValidate = res.data;
          }
        })
      },
      //上传图片
      handleView (url) {
        this.imgName = url;
        this.visible = true;
      },
      handleRemove (file) {

        postImageDelete(this.formValidate.thumb).then((res) => {
          if (res.meta.errno === ERR_OK){
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.formValidate.thumb = '';
            this.$Message.success('成功删除');
          }else{
            this.$Message.error(res.message);
          }

        });


      },
      handleSuccess (res, file) {
        if (res.meta.errno === ERR_OK){
          this.formValidate.thumb = res.data;
          file.url = this.formValidate.thumb;
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
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.formValidate.content = html
      },
      addTopic (newTopic) {
        const topic = {
          name: newTopic,
        };
        this.topicList.push(topic);
        this.formValidate.topic.push(topic)
      },
      _getTopicList () {
        getTopicList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.topicList= res.data;
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      handleSubmit(name) {

        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formValidate)
            this.$Message.success('表单验证成功!');
            postUpdateArticleList(this.formValidate).then(res => {
              if (res.meta.errno === ERR_OK){
                this.$Message.success('提交成功!');
                this.$router.push({
                  path: `/admin/article`
                });
              }
            })

          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .kkz-admin-article-create{
    min-height: 800px;
    .quill-editor-example{
      min-height: 20em;
    }
    .ivu-upload.ivu-upload-drag{
      border: 0 !important;
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
</style>
