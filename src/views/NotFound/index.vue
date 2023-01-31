<template>
    <el-result title="404" sub-title="Sorry, request error" class="result-box">
        <template #icon>
            <el-image class="img" src="https://p1.ssl.qhimg.com/t01d47905c72afe46f8.jpg" />
        </template>
        <template #extra>
            <el-button type="primary" @click="router.back()">返回</el-button>
        </template>
    </el-result>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped>
.result-box{
    width: 100%;
}
.img{
    width: 300px;
}
</style>