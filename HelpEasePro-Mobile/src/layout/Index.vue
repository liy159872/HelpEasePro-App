<template>
  <div>
    <Header/>
    <router-view/>
    <van-tabbar v-model="active" :border="false" active-color="#06f">
      <van-tabbar-item v-for="(item,index) in pages"
                       replace :to="item.path"
                       route
                       :icon="item.icon"
                       :key="index">{{ item.title }}

      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Header from "@/layout/Header";

export default {
  components: {Header},
  data() {
    return {
      active: 0,
      pages: [
        {
          icon: 'https://i.328888.xyz/2023/04/04/ijOhnp.png',
          title: '首页',
          path: '/home'
        },
        {
          icon: 'https://i.328888.xyz/2023/04/13/igHsFc.png',
          title: '视频',
          path: '/video'
        },
        {
          icon: 'https://i.328888.xyz/2023/04/13/igO4tU.png',
          title: 'author',
          path: '/author'
        },
        {
          icon: './favicon.ico',
          title: '我的',
          path: '/me'
        },
      ],
    };
  },

  mounted() {
    for (let i = 0; i < this.pages.length; i++) {
      if (this.$route.path === this.pages[i].path) this.active = i
    }
  },

  methods: {},

}
</script>

<style scoped>
.van-tabbar {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 3px;
  padding-bottom: 3px;
  z-index: 9999;
}
</style>
