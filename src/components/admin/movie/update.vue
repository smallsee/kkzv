<template>
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
        action="http://127.0.0.1:8000/api/image"
        :data="imgData"
        style="display: inline-block;width:80px">
        <div v-if="!formValidate.thumb" style="width: 80px;height:80px;line-height: 80px;border: 1px dashed #dddee1;">
          <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>

      <Modal title="查看图片" v-model="visible">
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>

    </Form-item>



    <Form-item label="明星" prop="star">
      <Select v-model="formValidate.star" filterable multiple size="large">
        <Option v-for="item in starList" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </Form-item>

    <Form-item label="导演" prop="director">
      <Select v-model="formValidate.director" filterable multiple size="large">
        <Option v-for="item in directorList" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </Form-item>

    <Form-item label="类型" prop="tag">
      <Select v-model="formValidate.tag" filterable multiple size="large">
        <Option v-for="item in tagList" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
    </Form-item>



    <Form-item label="下载地址" prop="url">
      <Input v-model="formValidate.url" placeholder="请输入下载地址"></Input>
    </Form-item>


    <Form-item label="简介" prop="introduction">
      <Input v-model="formValidate.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简介..."></Input>
    </Form-item>


    <Form-item>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </Form-item>
  </Form>
</template>
<script>
  import ICol from "../../../../node_modules/iview/src/components/grid/col";
  import {getStarList,getDirectorList,getTagList, postUpdateMovieList,getShowMovieList} from 'api/movie';
  import Mock from 'mockjs';
  import {ERR_OK} from 'api/config';
  import {postImageDelete} from 'api/image'

  export default {
    components: {ICol},
    data () {
      return {
        //上传图片带的参数
        imgData: {
          width: 300,
          height: 300,
        },
        //上传图片
        defaultList: [

        ],
        imgName: '',
        visible: false,
        //
        tagList: [],
        starList: [],
        directorList: [],
        formValidate: {
          title: '',
          thumb: '',
          url: '',
          star: [],
          director: [],
          tag: [],
          introduction: '',
        },
        ruleValidate: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '国家不能为地址', trigger: 'blur' }
          ],
          thumb: [
            { required: true, message: '缩略图不能为空', trigger: 'blur'}
          ],
          star: [
            { required: true, type: 'array', min: 1, message: '至少选择一个明星', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个声优', trigger: 'change' }
          ],
          director: [
            { required: true, type: 'array', min: 1, message: '至少选择一个导演', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个声优', trigger: 'change' }
          ],
          tag: [
            { required: true, type: 'array', min: 1, message: '至少选择一个类型', trigger: 'change' },
            { type: 'array', max: 4, message: '最多选择四个类型', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入作品简介', trigger: 'blur' },
            { type: 'string', min: 10, message: '介绍不能少于10字', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this._getStarList();
      this._getTagList();
      this._getDirectorList();
      this._getMovieData(this.$route.params.id);
    },
    methods: {
      filesAdd () {
        this.formValidate.files.push({
          title: '',
          url: ''
        });
      },
      filesRemove (index) {
        this.formValidate.files.splice(index, 1);
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
            this.$Message.success('成功删除');
          }else{
            this.$Message.error(res.message);
          }
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          this.formValidate.thumb = '';

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
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 5 张图片。'
          });
        }
        return check;
      },
      //
      _getMovieData(id) {
        getShowMovieList(id).then(res => {
          if (res.meta.errno === ERR_OK){
            this.formValidate = res.data;
          }
        })
      },
      _getStarList () {
        getStarList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.starList= res.data
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _getDirectorList () {
        getDirectorList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.directorList= res.data
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      _getTagList () {
        getTagList().then((res) => {
          if (res.meta.errno === ERR_OK){
            this.tagList= res.data
          }else{
            this.$Message.error(res.message);
          }

        })
      },
      handleSubmit (name) {
        let formData = this.formValidate;
        this.$refs[name].validate((valid) => {
          if (valid) {
            postUpdateMovieList(formData).then((res) => {
              if (res.meta.errno === ERR_OK){
                this.formValidate.thumb = '';
                this.$Message.success('提交成功!');
                this.$router.push({
                  path: `/admin/movie`
                });
              }
            });

          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
    beforeDestroy() {
      this.formValidate = '';
    }
  }
</script>

<style>
  .ivu-upload.ivu-upload-drag{
    border: 0;
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
</style>
