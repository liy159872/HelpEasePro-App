<template>
  <div class="about">
    <van-nav-bar title="关于我们" />
    <van-cell center title="作者简介" />
    <van-card
        :num="1"
        :thumb="'https://i.328888.xyz/2023/04/13/igOAcv.jpeg'"
        :title="'开发作者'"
        :desc="'一个热爱编程的年轻人。他的主要技术栈是Vue和SpringBoot，喜欢研究新技术。'"
        @click.native="showDeveloperDetails"
    />
    <van-card
        :num="2"
        :thumb="'https://i.328888.xyz/2023/04/13/igOnyy.jpeg'"
        :title="'女友支持'"
        :desc="'作者的女友是一个温柔善良的机长，一直支持着他的事业。在作者需要帮助的时候，她总是第一个出现。'"
        @click.native="showGirlfriendDetails"
    />
    <van-cell center title="我们的生活" />
    <video
        class="video"
        :autoplay="false"
        :width="windowWidth"
        :height="playHeight"
        controls
        :src="videoUrl"
        type="video/mp4"
    />
    <van-dialog v-model="showDetails" title="关于我们" show-cancel-button>
      <img :src="details.thumb" style="width: 50%" class="center-img"/>
      <van-cell-group>
        <van-cell :title="details.title" :label="details.label" />
        <van-cell :title="details.desc" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { FindAllVideo } from "@/api/video";

export default {
  data() {
    return {
      videoList: [],
      windowWidth: document.documentElement.clientWidth - 30, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      playHeight: 0,
      videoUrl: require("../assets/zxmwife.mp4"),
      showDetails: false,
      details: {},
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    showDeveloperDetails() {
      this.details = {
        thumb: 'https://i.328888.xyz/2023/04/13/igOAcv.jpeg',
        title: "开发作者",
        label: "一个热爱编程的年轻人",
        desc: "他的主要技术栈是Vue和SpringBoot，喜欢研究新技术。",
      };
      this.showDetails = true;
    },
    showGirlfriendDetails() {
      this.details = {
        thumb: 'https://i.328888.xyz/2023/04/13/igOnyy.jpeg',
        title: "女友支持",
        label: "作者的女友是一个温柔善良的机长",
        desc:
            "她一直支持着作者的事业。在作者需要帮助的时候，她总是第一个出现。",
      };
      this.showDetails = true;
    },
  },
  mounted() {
    this.playHeight = (3 / 4) * this.windowWidth;
    FindAllVideo().then((res) => {
      if (res.status) {
        this.videoList = res.data;
        console.log(res.data);
      }
    });
  },
};
</script>

<style scoped>
.van-dialog .center-img {
  display: block;
  margin: 0 auto;
}

.about {
  padding: 20px;
}
</style>
