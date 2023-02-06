<template>
    <div class="add-user">
        <span>用户状态</span>
        <el-input @keyup.enter="searchHandler" class="input" v-model="searchInfo" size="large" placeholder="请输入用户信息"></el-input>
        <el-button @click="searchHandler" type="primary" class="button" plain size="large">搜索</el-button>
        <el-button type="primary" class="button" plain size="large">添加</el-button>
    </div>
    <el-table style="width:100%" :data="userList.list">
        <el-table-column width="200" label="id" prop="id"></el-table-column>
        <el-table-column width="200" label="用户名" prop="username"></el-table-column>
        <el-table-column width="260" label="权限">
            <template #default="scope">
                <div>{{ scope.row.permission === "admin" ? "管理员" : "普通用户" }}</div>
            </template>
        </el-table-column>
        <el-table-column width="260" label="电话号码" prop="phone"></el-table-column>
        <el-table-column label="操作" prop="phone">
            <template #default="scope">
                <el-button size="small" @click="handleEditor(scope.$index,scope.row)">编辑权限</el-button>
                <el-button size="small" @click="handleDelete(scope.$index,scope.row)" type="danger">删除用户</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog center width="41%" title="添加用户" v-model="dialogAddVisible">
        <el-form  :model="userForm" status-icon label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" type="text"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="" prop="permission">
                <el-input v-model="userForm.permission" type="text"></el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
                <el-input v-model="userForm.phone" type="text"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button @click="sureAddUserHandler" type="primary">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import api from "@/api/index.js"
import { onMounted, reactive, ref } from "vue"

const userList = reactive({
    list: []
})

const searchInfo = ref("")

const dialogAddVisible = ref(false)

const userForm = reactive({
    username: "",
    password:"",
    permission:"",
    phone:""
})

onMounted(() => {
    api.getUserList().then(({ data: res }) => {
        if (res.status === 200) { 
            userList.list = res.result
         }
    }).catch(error => {
        console.log(error);
    })
})

const handleEditor = (index,row) => {

}

const handleDelete = (index,row) => {

}

// 用户查询
const searchHandler = () => {
    api.getSearchUser({
        search: searchInfo.value
    }).then(({data:res})=>{
        userList.list = res.result
    })
}

// 确定添加用户
const sureAddUserHandler = () =>{

}
</script>

<style scoped>
.add-user{
    margin-top: 10px;
    margin-bottom: 10x;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
}

.add-user span{
    font-weight: 700;
}

.add-user .input{
    width: 300px;
}
</style>