<template>
  <div class="about" style="background:#fff">
    <div>
      <el-button @click="index">首页</el-button>
      <div style="padding:10px">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="创建时间"
            
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ dateFormat(scope.row.createdDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            width="180">
          </el-table-column>
          <el-table-column
            label="类型"
            prop="type"
            width="180">
          </el-table-column>
          <el-table-column
            label="描述"
            width="240">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ HtmlParse(scope.row.introduce) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col :span="20" :offset="2">
          <div>
            <el-form :inline="true" :rules="rules" ref="ruleForm" label-position="left" label-width="80px" :model="formLabelAlign">
              <el-form-item label="标题" prop="title">
                <el-input v-model="formLabelAlign.title"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="是否显示" >
                <el-switch v-model="formLabelAlign.show"></el-switch>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-form-item label="类型" prop="type">
                <el-checkbox-group v-model="formLabelAlign.type">
                  <el-checkbox label="博客" name="type"></el-checkbox>
                  <el-checkbox label="趣闻" name="type"></el-checkbox>
                  <el-checkbox label="生活" name="type"></el-checkbox>
                  <el-checkbox label="情感" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="描述">
                <div :id='id+"introduce"'></div>
              </el-form-item>
              <el-form-item label="内容">
                <div :id='id+"content"'></div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { constants } from 'crypto';
var E = require('wangeditor')
var moment = require('moment')
var $ = require("jquery")
var createdData={
  title: '',
  introduce:'',
  type:[],
  content:'',
  show:true,
  id:null
}
export default {
  data(){
    return {
      id:'id'+new Date().getTime(),
      tableData: [],
      formLabelAlign: JSON.parse(JSON.stringify(createdData)),
      editorText:'',
      editorContentText:'',
      rules: {
          title: [
            { required: true, message: '请输入博客标题', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请选择一个类型', trigger: 'change' }
          ]
        },
      editor:null,
      editorContent:null
    }
  },
  mounted(){
    this.editor = new E("#"+this.id+"introduce")
    this.editor.customConfig.onchange = (html)=> {
        this.formLabelAlign.introduce=html
    }
    this.editor.customConfig.zIndex = 100
    this.editor.create()
    this.editorContent = new E("#"+this.id+"content")
    this.editorContent.customConfig.onchange = (html)=> {
        this.formLabelAlign.content=html
    }
    this.editorContent.customConfig.zIndex = 100
    this.editorContent.create()
    
    this.loadBlogList()
  },
  methods:{
    index(){
      this.$router.push("/")
    },
    cancel(){
      console.log('111')
      this.format(createdData)
      console.log(createdData)
    },
    format(form){
      console.log(form)
      this.editor.txt.html(form.introduce)
      this.editorContent.txt.html(form.content)
      this.formLabelAlign.content=form.content
      this.formLabelAlign.introduce=form.introduce
      this.formLabelAlign.show=form.show
      this.formLabelAlign.title=form.title
      this.formLabelAlign.type=form.type
      this.formLabelAlign.id=form.id
    },
    HtmlParse(html){
      var text=$(html).text()
      return text.substr(0,20)
    },
    dateFormat(date){
      console.log(date)
      return moment(Number(date)).format("YYYY-MM-DD HH:mm")
    },
    loadBlogList(){
      this.$api.get('BlogList',{}).then((data)=>{
        console.log(data)
        this.tableData=data.msg
        this.$message({message:'加载成功！',type: 'success'});
      })
    },
    handleEdit(index, row) {
      this.format(row)
      this.$api.get("Blog",{
        id:row.id
      },(data)=>{
        this.format(data.msg[0])
      })
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delete('Blog',{id:row.id},()=>{
            this.loadBlogList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    onSubmit(){
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let form = this.formLabelAlign
          if(!form.content || !form.introduce){
            this.$message.error('请输入内容和描述');
            return
          }
          this.$api.post('Blog',{
            content:form.content,
            introduce: form.introduce,
            show: form.show,
            title: form.title,
            type: form.type,
            id:form.id
          },(msg)=>{
            this.$message({message:'成功！',type: 'success'});
            this.loadBlogList()
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>
