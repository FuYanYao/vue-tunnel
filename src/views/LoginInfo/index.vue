<template>
    <div class="login-container">
        <el-form class="user" size="large" :model="user">
            <div class="title-container">
                <h3 class="title">隧道后台系统管理登录</h3>
            </div>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" v-model="user.username" type="text" placeholder="请输入用户名" name="username" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" v-model="user.password" type="password" placeholder="请输入密码" name="password" />
            </el-form-item>
            <el-button style="width:100%;margin-buttom:30px;" type="primary"
                @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '@/api/index.js'
import { User,Lock } from "@element-plus/icons-vue"
import { useLoginStore } from "@/stores/loginStore.js"
import { useRouter } from 'vue-router'

// 登录仓库对象
const loginStore = useLoginStore()
// 获取路由对象
const router = useRouter()

// 声明用户信息
const user = reactive({
    username: '',
    password: '',
})

/**
 * 登录事件
 */
const handleLogin = () => {
    api.getLogin({
        username: user.username,
        password: user.password
    }).then(({ data: res }) => {
        if (res.status === 200) {
            loginStore.token = res.token
            loginStore.username = res.username
            loginStore.permission = res.permission
            router.push("/")
        } else {
            ElMessage.error(res.msg)
        }
    })
}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}

.user {
    position: relative;
    width: 400px;
    height: 160px;
    padding: 160px 35px;
    margin: 0 auto;
}

.title-container .title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin: 20px;
}
</style>

