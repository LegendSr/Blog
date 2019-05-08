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
          <h1 class="title" @click='toBlog(item)'>
            <span>{{item.title}}</span>
          </h1>
          <p class="head"><span class="time"> <i class="el-icon-date"></i> 发表于{{moment(Number(item.updateDate)).format("YYYY-MM-DD")}}</span><b>·</b><span class="word"><i class="el-icon-document"></i> 字数统计{{item.wordNumber}}</span><b>·</b><span class="lock"> <i class="el-icon-view"></i> 阅读次数{{item.lock}}</span></p>
          <div class="content" v-html='item.introduce'></div>
        </div>
      </div>
    </page>
  </div>
</template>
<style lang="scss">
.home{
  width: 100%;
}
body{
  background: #efefef
}
.home-list{
  width: 780px;
  margin: 0 auto;
  padding-top: 40px;
  .home-item{
    position: relative;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 30px;
    .title{
      cursor: pointer;
      transition: all 3s linear;
      text-align: center;
      position: relative;
      span{ 
        position: relative;
        &::after{
          position: absolute;
          left: 0;
        content: "";
        display:block;
        width: 100%;
        height: 2px;
        background: #000
      }
      }
    }
    .content{
      padding: 0px 50px;
    }
    .head{
      text-align: center;
      padding-bottom: 30px;
      b{
        margin: 0 5px;
        font-weight: 900
      }
      .lock{
        color:#ff3f1a
      }
      .time{
        color: #00a7e0
      }
      .word{
        color: #000
      }
    }
    .type{
      position: absolute;
      left: -16px;
      top: 95px;
      border-color: #47456d;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
      background-color: #97dffd;
      margin: 5px 0 15px 2px;
      font-size: 14px;
      border-radius: 0 4px 4px 0;
      display: inline-block;
      padding: 7px 11px 7px 32px;
      line-height: 1;
      color: #fff;
      &:after{
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        border-top: 0 solid transparent;
        border-right-width: 1em;
        border-right-color: inherit;
        border-right-style: solid;
        border-bottom: 1em solid transparent;
        border-left: 0 solid transparent;
        width: 0;
        height: 0;
      }
    }
    .date{
      position: absolute;
      top: -30px;
      left: -30px;
      width: 65px;
      height: 65px;
      background: #97dffd;
      border-radius: 50%;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
      color: #fff;
      .month{
        font-size: 16px;
        text-align: center;
        margin-top: 5px;
      }
      .day{
        font-size: 30px;
        text-align: center;
      }
    }
  }
}
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
          list= JSON.parse(localStorage.blogList)
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
      this.$router.push({name:"blog",params:{blogId:item.id}})
    },
    loadBlogList(){
      
      this.$api.get('BlogList',{}).then((data)=>{
        console.log(data)
        this.blogList=data.msg
        localStorage.blogList=JSON.stringify(this.blogList) 
        this.$message({message:'加载成功！',type: 'success'});
      })
    }
  }
}
</script>
