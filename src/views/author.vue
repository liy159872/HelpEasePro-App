<template>
  <div class="about">
    <h2>关于我们</h2>
    <div class="author-info">
      <div class="author-avatar">
        <img src="https://i.328888.xyz/2023/04/13/igOAcv.jpeg" alt="开发作者">
      </div>
      <div class="author-desc">
        <h3>开发作者</h3>
        <p>一个热爱编程的年轻人。他的主要技术栈是Vue和SpringBoot，喜欢研究新技术。</p>
      </div>
    </div>
    <div class="gf-info">
      <div class="gf-avatar">
        <img src="https://i.328888.xyz/2023/04/13/igOnyy.jpeg" alt="女友支持">
      </div>
      <div class="gf-desc">
        <h3>女友支持</h3>
        <p>作者的女友是一个温柔善良的机长，一直支持着他的事业。在作者需要帮助的时候，她总是第一个出现。</p>
      </div>
    </div>
    <h2>我们的生活</h2>
    <div class="video-wrapper">
      <video
          class="video"
          :autoplay="false"
          :width="windowWidth"
          :height="playHeight"
          controls
      >
        <source :src="videoUrl" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import { FindAllVideo } from "../../HelpEasePro-Mobile/src/api/video";

export default {
  data() {
    return {
      videoList: [],
      windowWidth: document.documentElement.clientWidth - 30, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      playHeight: 0,
      videoUrl: require("../../HelpEasePro-Mobile/src/assets/zxmwife.mp4"),
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
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
.about {
  padding: 20px;
}
.author-info, .gf-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.author-avatar, .gf-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}
.author-avatar img, .gf-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.author-desc, .gf-desc {
  flex: 1;
}
.video-wrapper {
  margin-top: 20px;
}
.video {
  display: block;
  margin: 0 auto;
}
</style>
