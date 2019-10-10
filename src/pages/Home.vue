<template>
  <div>
    <div class="block">
      <el-carousel style="width:100%;margin-bottom:20px;">
        <el-carousel-item v-for="item in adlist" :key="item">
          <img :src="item" style="width:100%" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="10">
      <el-col
        :span="6"
        v-for="item in navlist"
        :key="item.name"
        style="position:relative;text-align:center;"
      >
        <el-image :src="item.url" style="width:100%;"></el-image>
        <div class="navword">{{item.name}}</div>
      </el-col>
    </el-row>
    <el-row :gutter="8" type="flex">
      <el-col
        :span="12"
        v-for="item in recommend"
        :key="item.photo.path"
        style="margin:4px 0;"
        ref="scoele"
        @click.native="goto(item.id)"
      >
        <el-card :body-style="{ padding: '6px'}">
          <el-image :src="item.photo.path.replace(/c\-ssl/,'a-ssl')" style="width:100%;"></el-image>
          <div style="padding: 14px;">
            <span>{{item.album.name}}</span>
            <p>
              <span class="el-icon-star-on"></span>
              <span>{{item.album.favorite_count}}</span>
            </p>
            <el-divider></el-divider>
            <img
              :src="item.sender.avatar.replace(/c\-ssl/,'a-ssl')"
              style="border-radius:50%;height:30px;width:30px;"
            />
            <div class="auth">
              <p>{{item.sender.username}}</p>
              <p>{{item.album.name}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      start: 0,
      timer: null,
      adlist: [
        "https://c-ssl.duitang.com/uploads/item/201909/20/20190920143259_cP2eu.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201908/26/20190826143813_u3USx.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201909/18/20190918163246_MaAPZ.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201909/18/20190918162939_XxJki.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201908/16/20190816162547_JUaCG.thumb.700_0.jpeg"
      ],
      navlist: [
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020025_n5S2v.png",
          name: "壁纸"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020847_Kf2A5.png",
          name: "头像"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021642_LNWyY.png",
          name: "表情"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021031_TZet2.png",
          name: "文字"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021100_PjnFC.png",
          name: "爱豆"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826020723_xswVH.png",
          name: "影视"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021141_yh3sj.png",
          name: "动漫"
        },
        {
          url:
            "https://c-ssl.duitang.com/uploads/people/201908/26/20190826021521_PhVBW.png",
          name: "更多分类"
        }
      ],
      recommend: []
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "xiangqing", params: {id} });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = 0;
      this.$refs.scoele.map((item, index) => {
        if (index === this.$refs.scoele.length - 1) {
          offsetTop = this.$refs.scoele[index].$el.offsetTop;
        }
      });
      if (scrollTop >= offsetTop) {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          this.start += 24;
          let { data } = await this.$axios.get(
            "http://localhost:1907/duit/napi/index/hot/",
            {
              params: {
                start: this.start,
                limit: 24,
                more: 1,
                include_fields: "sender%2Calbum"
              }
            }
          );
          for (let index in data.data.object_list) {
            this.recommend.push(data.data.object_list[index]);
          }
          // window.console.log(this.recommend);
        }, 1000);
      }
    }
  },
  components: {},
  async created() {
    // 发起ajax请求
    let { data } = await this.$axios.get(
      "http://localhost:1907/duit/napi/index/hot/",
      {
        params: {
          start: this.start,
          limit: 24,
          more: 1,
          include_fields: "sender%2Calbum"
        }
      }
    );
    this.recommend = data.data.object_list;
    // window.console.log(this.recommend);
  }
};
</script>
<style scoped>
.navword {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  color: #58bc58;
  font-weight: bold;
}
.auth {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
}
.auth p:nth-child(1) {
  color: rgb(52, 152, 219);
}
.el-row {
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>