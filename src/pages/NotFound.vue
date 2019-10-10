<template>
  <el-card class="box-card">
    <div>
        <h2>404</h2>
        <p>This page could not be found.</p>
    </div>
  </el-card>
</template>
<script>
export default {};
</script>
<style scoped>
.box-card{
    height: 777px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 200px;
}
.box-card div{
    width: 100%;
    display: flex;
    align-items: center;
}
.box-card div h2{
    font-size: 32px;
    font-weight: 400;
    line-height: 60px;
    margin: 0;
    padding-right: 20px;
    border-right: 1px solid #666;
}
.box-card div p{
    font-size: 18px;
    line-height: 18px;
    margin: 0;
    margin-left: 20px;
}
</style>