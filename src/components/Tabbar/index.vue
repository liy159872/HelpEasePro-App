<template>
	<van-tabbar v-model="active" style="z-index: 1999">
		<van-tabbar-item
			v-for="(tab, index) in tabbar"
			:icon="tab.icon"
			:to="tab.path"
			:dot="tab.dot"
			:info="tab.info"
			:key="index">
			{{tab.name}}
		</van-tabbar-item>
	</van-tabbar>
</template>


<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  data() {
    return {
      active: 0,
      tabbar: [
        {
          name: '首页',
          path: '/',
          pathName: 'home',
          icon: 'https://i.328888.xyz/2023/04/04/ijOhnp.png',
          dot: false,
          info: ''
        },
        {
          name: '分类',
          path: '/items',
          pathName: 'class',
          icon: 'https://i.328888.xyz/2023/04/04/ij2Ld5.png',
          dot: false,
          info: ''
        },
        {
          name: 'Help',
          path: '/order',
          pathName: 'cart',
          icon: 'https://i.328888.xyz/2023/04/04/ijW4Lq.png',
          dot: false,
          info: ''
        },
        {
          name: '我的',
          path: '/user',
          pathName: 'user',
          icon: 'https://www.hualigs.cn/image/641fdd4dac243.jpg',
          dot: false,
          info: ''
        }
      ]
    };
  },

  watch: {
    $route: 'changeActive'
  },

  created() {
    const toName = this.$route.name;
    this.setActive(toName);
  },

  methods: {
    changeActive({ name }) {
      this.setActive(name);
    },
    setActive(name) {
      this.tabbar.forEach((tab, i) => {
        if (tab.pathName == name) {
          this.active = i;
          return false;
        }
      });
    }
  },

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>


<style>
/* 使用类名选择 */
.van-tabbar-item .van-icon {
  font-size: 50px;
}
</style>
