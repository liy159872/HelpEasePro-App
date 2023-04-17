<template>
<div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goBack" v-show="showHeader"/>
</div>

</template>
<script>
import { NavBar } from 'vant';
import { mapState } from 'vuex';

export default {
    name:"v-header",
    data(){
        return {
          history: [],  // 记录历史路由地址的数组

            title:"",
        };
    },

  mounted() {
    // 在页面挂载时记录当前路由地址
    this.history.push(this.$route.path);
  },

    computed: {
        showHeader:function(){
            let header=this.$store.getters.showHeader;
            this.title=this.$store.getters.titleHeader;
            return header
        }
    },
    methods: {
        // goBack() {
        //     this.$router.back(-1);
        // }

      goBack() {
        if (this.history.length > 1) {
          // 取出上一次的路由地址
          const lastPath = this.history[this.history.length - 2];
          // 移除最后一次记录的路由地址
          this.history.pop();
          // 跳转到上一次的路由地址
          this.$router.push(lastPath);
        } else {
          // 如果历史记录只有一个地址，则返回首页
          this.$router.push('/');
        }
      }
   },
   components: {
    [NavBar.name]:NavBar,
  }
}
</script>
