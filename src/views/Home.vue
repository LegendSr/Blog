<template>
  <div class="home">
    <page>
      
    </page>
  </div>
</template>
<style lang="scss">
.home{
  width: 100%;
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
    return {
      list:[{
        title:'《青春猪头少年不会梦到兔女郎学姐》圣地巡礼',
        date:moment(),
        read:1390,
        wordNumber:1230,
        type:"日记本",
        introduce:""
      }]
    }
  }
}
</script>
