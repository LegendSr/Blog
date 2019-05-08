<template>
  <div class="home">
    <page>
      <div class="home-list" >
        <div class="home-item" v-show="item.show" :key="item.id" v-for='item in blogList' >
          <div class="date">
            <div class="month">{{moment(Number(item.updateDate)).format("MM")}}月</div>
            <div class="day">{{moment(Number(item.updateDate)).format("DD")}}</div>
          </div>
          <div class="type">
            {{item.type.join()}}
          </div>
          <h1 style="text-align: center">
            <span>{{item.title}}</span>
          </h1>
          <p class="head"><span class="time"> <i class="el-icon-date"></i> 发表于{{moment(Number(item.updateDate)).format("YYYY-MM-DD")}}</span><b>·</b><span class="word"><i class="el-icon-document"></i> 字数统计{{item.wordNumber}}</span><b>·</b><span class="lock"> <i class="el-icon-view"></i> 阅读次数{{item.lock}}</span></p>
          <div class="content" v-html='item.content'></div>
        </div>
      </div>
    </page>
  </div>
</template>
<style lang="scss">
</style>
<script>
import page from "@/components/page.vue"
import moment from "moment"
export default {
  name: 'home',
  components: {
    page
  },
  data(){
      var list=[]
      try {
          list= JSON.parse(localStorage.Blog)
      } catch (error) {}
    return {
      moment:moment,
      blogList:list
    }
  },
  mounted(){
    this.loadBlogList()
  },
  methods:{
    toBlog(item){
      console.log(item)
    },
    loadBlogList(){
        let id = this.$route.params.blogId
        this.$api.get('Blog',{
            id:id
        }).then((data)=>{
            console.log(data)
            this.blogList=data.msg
            localStorage.Blog=JSON.stringify(this.blogList)
            this.$message({message:'加载成功！',type: 'success'});
        })
    }
  }
}
</script>
