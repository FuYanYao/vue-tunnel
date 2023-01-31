<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* 公共样式 */
body,html,#app{
  height: 100%;
}
.el-menu{
  border-right: 0 !important;
}
/* 修改element-dialog header的样式 */
.el-dialog__header{
  background-color: #304156;
  margin-right: 0 !important;
  padding-bottom: 15px !important;
}

.el-dialog__header span{
  color: #fff;
}

</style>
