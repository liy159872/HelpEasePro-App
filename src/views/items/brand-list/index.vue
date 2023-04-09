<template>
  <div class="goods_brand_list">
    <van-list v-model="loading"
              :finished="finished"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="getBrandList">
      <div class="brand-info"
           v-for="(brand, index) in list"
           :key="index"
           @click="itemClick(brand.id)">
        <div class="name">
          <img class="img"
               :src="brand.picUrl"
               background-size="cover" />
          <div class="info-box">
            <div class="txt">{{brand.name}}</div>
            <div class="line"></div>
            <div class="price">揭榜{{brand.floorPrice}}元+外快</div>
          </div>
        </div>
        <div class="desc">
          {{brand.desc}}
        </div>
      </div>
    </van-list>

  </div>
</template>

<script>
import { brandList } from '@/api/api';
import { List } from 'vant';

export default {
  data() {
    return {
      list: [],
      page: 0,
      limit: 10,
      loading: false,
      finished: false
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.page = 0;
      this.list = [];
      this.getBrandList();
    },
    getBrandList() {
      this.page++;
      brandList({
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.list.push(...res.data.data.list);
        this.loading = false;
        this.finished = res.data.data.page >= res.data.data.pages;
      });
    },
    itemClick(id) {
      this.$router.push(`/items/brand/${id}`);
    }
  },

  components: {
    [List.name]: List
  }
};
</script>

<style lang="scss" scoped>
.goods_brand_list {
  .brand-info {
    .name {
      width: 100%;
      height: 180px;
      overflow: hidden; /* 隐藏超出容器宽高的部分 */
      position: relative;

      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 180px;
        object-fit: cover; /* 按比例缩放图像以填充容器 */
      }

      .info-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 180px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        display: block;

        .txt {
          margin-top: 60px;
          height: 25px;
          font-size: 25px;
          color: #fff;
        }

        .line {
          margin: 0 auto;
          margin-top: 16px;
          display: block;
          height: 2px;
          width: 300px;
          background: #fff;
        }
        .price{
          height: 25px;
          font-size: 25px;
          color: #fff;
        }
      }
    }
    .desc {
      background: #fff;
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 25px 20px;
      font-size: 20px;
      color: #666;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
