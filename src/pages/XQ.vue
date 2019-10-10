<template>
  <el-container>
    <el-header></el-header>
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
      recommend: []
    };
  },
  created() {
    let { id } = this.$route.params;
    this.getData(id);
  },
  methods: {
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
.colList{
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.colList div h5,.colList div p{
  margin: 20px;
}
.colList div h5{
  font-size: 16px;
  font-weight: normal;
  color: #333;
}
.colList div p{
  font-size: 12px;
  color: #777;
}
</style>