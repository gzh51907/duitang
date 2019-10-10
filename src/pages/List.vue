<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="ii" @click="gotoHome">首页</el-menu-item>
      <el-menu-item
        v-for="item in navlist"
        :index="item.catekey"
        :key="item.name"
        @click="gotoList(item.catekey)"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "",
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
    this.activeIndex = id;
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
    }
  }
};
</script>