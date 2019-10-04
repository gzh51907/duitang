<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in menus" :key="item.name">
        <router-link :to="item.path">{{item.text}}</router-link>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车"
        },
        {
          name: "reg",
          path: "/reg",
          text: "注册"
        },
        {
          name: "login",
          path: "/login",
          text: "登录"
        }
      ]
    };
  },
  components: {}
};
</script>
