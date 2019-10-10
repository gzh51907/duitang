<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="item.name" @click="gotoHome">首页</el-menu-item>
        <el-menu-item
          v-for="item in navlist"
          :index="item.name"
          :key="item.name"
          @click="gotoList(item.catekey)"
        >{{item.name}}</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <el-card :body-style="{ padding: '18px' }">
        <el-image :src="recommend.imgsrc" style="width:100%;"></el-image>
        <h4>{{recommend.picTitle}}</h4>
        <div class="auther">
          <div class="left">
            <el-image :src="recommend.humPic" style="width:60px;border-radius:50%;"></el-image>
            <div>
              <h5>{{recommend.humName}}</h5>
              <p>{{recommend.humColl}}</p>
            </div>
          </div>
          <div class="right">
            <p>{{recommend.pDate}}</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="color:#aaa;margin:6px;">相关标签</div>
        <div>
          <el-tag
            type="info"
            v-for="item in recommend.aTage"
            :key="item.tageName"
            style="margin-right:12px;"
          >{{item.tageName}}</el-tag>
        </div>
      </el-card>
    </el-main>
    <el-footer>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="title">
            <p class="left">收藏到以下专辑</p>
            <p class="right">{{recommend.colNum}} ></p>
          </div>
        </div>
        <div v-for="item in recommend.ali" :key="item.cover" class="colList">
          <el-image :src="item.cover" style="width:100px;height:100px;"></el-image>
          <div>
            <h5>{{item.collName}}</h5>
            <p>{{item.collHum}}</p>
          </div>
        </div>
      </el-card>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "壁纸",
      navlist: [
        {
          name: "壁纸",
          catekey: "5d5cf9260c14a94a3155e254"
        },
        {
          name: "头像",
          catekey: "5d4cde1a405dd99416c2afbd"
        },
        {
          name: "表情",
          catekey: "5d4bf0ed405dd99416c2af6f"
        },
        {
          name: "文字",
          catekey: "5d4cdeba405dd99416c2afbe"
        },
        {
          name: "爱豆",
          catekey: "5d4cdbf0405dd99416c2afb7"
        },
        {
          name: "影视",
          catekey: "5d4cdcdc405dd99416c2afb9"
        },
        {
          name: "动漫",
          catekey: "5d4cdd82405dd99416c2afbb"
        }
      ],
      recommend: []
    };
  },
  created() {
    let { id } = this.$route.params;
    this.getData(id);
  },
  methods: {
    handleSelect(index) {
      // window.console.log(index);
      this.activeIndex = index;
    },
    gotoHome() {
      this.$router.push("/home");
    },
    gotoList(id) {
      this.$router.push({ name: "list", params: { id } });
    },
    async getData(id) {
      let { data } = await this.$axios.get("http://localhost:1907/creeper/", {
        params: {
          id
        }
      });
      this.recommend = data;
      // window.console.log(data);
    }
  }
};
</script>
<style scoped>
.auther {
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.auther .left {
  display: flex;
}
.auther .left div h5 {
  font-size: 14px;
  margin: 5px;
  margin-bottom: 15px;
}
.auther .left div p {
  font-size: 12px;
  color: #999;
  margin: 5px;
}
.auther .right p {
  font-size: 12px;
  color: #bbb;
}
.title {
  display: flex;
  justify-content: space-between;
  height: 30px;
}
.title .left,
.title .right {
  margin: 0;
  line-height: 30px;
}
.colList {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.colList div h5,
.colList div p {
  margin: 20px;
}
.colList div h5 {
  font-size: 16px;
  font-weight: normal;
  color: #333;
}
.colList div p {
  font-size: 12px;
  color: #777;
}
</style>