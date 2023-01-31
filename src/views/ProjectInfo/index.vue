<template>
    <div class="search">
        <span>项目状态:</span>
        <el-input class="input" @keyup.enter="searchHandler" v-model="searchInfo" size="large"
            placeholder="请输入要搜索的信息"></el-input>
        <el-button @click="searchHandler" class="button" size="large" type="primary" plain>搜索</el-button>
        <el-button @click="addHandler" class="button" size="large" type="primary" plain>添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="130" />
        <el-table-column prop="number" label="项目编码" width="100" />
        <el-table-column prop="money" label="项目金额" width="120" />
        <el-table-column prop="address" label="项目地址" width="120" />
        <el-table-column prop="duration" label="项目工期(月)" width="70" />
        <el-table-column prop="startTime" :formatter="value => dateFormater(Number(value.startTime))" label="开工时间"
            width="140" />
        <el-table-column prop="endTime" :formatter="value => dateFormater(Number(value.endTime))" label="终止时间"
            width="140" />
        <el-table-column prop="quantity" label="隧道数量" width="80" />
        <el-table-column prop="status" label="项目状态" width="80">
            <template #default="scope">
                <el-tag :type="scope.row.status === '1' ? '' : 'success'">{{ statusHandle(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="remark" label="备注">
            <template #default="scope">
                <div v-html="scope.row.remark"></div>
            </template>
        </el-table-column>

        <el-table-column align="right" width="135px" label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
        <el-pagination :page-size="pageSize" @current-change="currentChangeHandler" background
            layout="prev, pager, next, jumper" :total="total" />
    </div>
    <!-- 增加数据对话框 -->
    <el-dialog @close="clean" v-model="addDialogVisible" title="添加隧道信息" width="42%" center>
        <!-- 添加数据表单 -->
        <el-form :inline="true" :model="addFormInfo">
            <el-form-item label="项目名称">
                <el-input v-model="addFormInfo.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="addFormInfo.number" placeholder="请输入项目编码"></el-input>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="addFormInfo.money" placeholder="请输入项目金额"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="addFormInfo.address" placeholder="请输入项目地址"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
                <el-input v-model="addFormInfo.duration" placeholder="请输入项目工期"></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
                <!-- <el-input v-model="addFormInfo.startTime" placeholder="请输入开工时间"></el-input> -->
                <!-- value-format="x"将格式改为时间戳 -->
                <el-date-picker value-format="x" v-model="addFormInfo.startTime" type="date"
                    placeholder="请输入开工时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="终止时间">
                <!-- <el-input v-model="addFormInfo.endTime" placeholder="请输入终止时间"></el-input> -->
                <el-date-picker value-format="x" v-model="addFormInfo.endTime" type="date"
                    placeholder="请输入终止时间"></el-date-picker>

            </el-form-item>
            <el-form-item label="隧道数量">
                <el-input v-model="addFormInfo.quantity" placeholder="请输入隧道数量"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-input v-model="addFormInfo.status" placeholder="`1`施工中  -  `0`已完工"></el-input>
            </el-form-item>
            <el-form-item label="项目备注">
                <!-- <el-input v-model="addFormInfo.remark" placeholder="请输入项目备注"></el-input> -->
                <TinymceEditor v-model="addFormInfo.remark" :options="options" @onDataEvent="getInfoEditorHandler" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="sureHandler">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogEditorVisible" title="编辑隧道信息" width="42%" center>
        <el-form :inline="true" :model="editorFormInfo">
            <el-form-item label="项目名称">
                <el-input v-model="editorFormInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="项目编码">
                <el-input v-model="editorFormInfo.number"></el-input>
            </el-form-item>
            <el-form-item label="项目金额">
                <el-input v-model="editorFormInfo.money"></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
                <el-input v-model="editorFormInfo.address"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
                <el-input v-model="editorFormInfo.duration"></el-input>
            </el-form-item>
            <el-form-item label="开工时间">
                <el-date-picker value-format="x" v-model="editorFormInfo.startTime" type="date" />
            </el-form-item>
            <el-form-item label="终止时间">
                <el-date-picker value-format="x" v-model="editorFormInfo.endTime" type="date" />
            </el-form-item>
            <el-form-item label="隧道数量">
                <el-input v-model="editorFormInfo.quantity"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-input v-model="editorFormInfo.status"></el-input>
            </el-form-item>
            <el-form-item label="项目备注">
                <TinymceEditor v-model="editorFormInfo.remark" :options="options" @onDataEvent="getInfoEditorHandler" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogEditorVisible = false">取消</el-button>
                <el-button type="primary" @click="sureEditorHandler">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
import api from '@/api/index.js'
import { onMounted, reactive, ref } from 'vue'
import { dateFormater } from '../../utils/utils'
import TinymceEditor from '../../components/TinymceEditor/index.vue'

const projectObj = {
    name: "",
    number: "",
    money: "",
    address: "",
    duration: "",
    startTime: "",
    endTime: "",
    quantity: "",
    status: "",
    remark: ""
}

const projectInfo = reactive({
    list: []
})

// 初始化总条数
const total = ref(0)

// 每页显示的数据条数
const pageSize = ref(15)

// 添加增加对话框
const addDialogVisible = ref(false)

// 编辑对话框控制器
const dialogEditorVisible = ref(false)

// 初始化添加对话框状态
const addFormInfo = reactive(projectObj)

// 初始化编辑对话框状态
const editorFormInfo = reactive(projectObj)

// 编辑ID
const editorID = ref(0)

onMounted(() => {
    http(1)
})

onMounted(() => {
    api.getTotal().then(({ data: res }) => {
        if (res.status === 200) {
            total.value = res.result[0]['count(*)']
        } else {
            total.value = 0
        }
    })
})

// 搜索初始化
const searchInfo = ref('')

const http = (page) => {
    api.getProjectInfo({ page }).then(({ data: res }) => {
        if (res.status === 200) {
            projectInfo.list = res.result
        }
    })
}

/**
 *  隧道状态的显示转化
 */
const statusHandle = (status) => {
    return status === '1' ? '施工中' : '已完工'
}

/**
 * 表格头部样式
 */
const headerClass = () => {
    return {
        background: "#dcdcdc",
        color: "#999",
        fontWeight: 700
    }
}

/**
 * 表格编辑
 */
const handleEdit = (index, row) => {
    dialogEditorVisible.value = true
    editorID.value = row.id
    api.getPreProject({ id: row.id }).then(({ data: res }) => {
        if (res.status === 200) {
            editorFormInfo.name = res.result.name
            editorFormInfo.number = res.result.number
            editorFormInfo.money = res.result.money
            editorFormInfo.address = res.result.address
            editorFormInfo.duration = res.result.duration
            // 注: 拿到的时间为字符串类型，需做转化
            editorFormInfo.startTime = Number(res.result.startTime)
            editorFormInfo.endTime = Number(res.result.endTime)
            editorFormInfo.quantity = res.result.quantity
            editorFormInfo.status = res.result.status
            editorFormInfo.remark = res.result.remark
        } else {
            ElMessage.error(res.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}

/**
 * 表格删除
 */
const handleDelete = (index, row) => {
    ElMessageBox.confirm('您确定要删除数据吗?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        api.getDelProject({ id: row.id }).then(({ data: res }) => {
            if (res.status === 200) {
                ElMessage({
                    message: res.msg,
                    type: 'success',
                })
                http(1)
            } else {
                ElMessage.error(res.msg)
            }
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: 'Delete canceled',
        })
    })
}

// 搜索事件
const searchHandler = () => {
    api.getSearch({ search: searchInfo.value }).then(({ data: res }) => {
        if (res.status === 200) {
            projectInfo.list = res.result
        } else {
            projectInfo.list = []
        }
    })
}

// 分页
const currentChangeHandler = (val) => {
    // console.log(val);
    http(val)
}

// 添加对话框弹出事件
const addHandler = () => {
    addDialogVisible.value = true
}

// 添加对话框确认事件
const sureHandler = () => {
    api.getAddProject({
        name: addFormInfo.name,
        number: addFormInfo.number,
        money: addFormInfo.money,
        address: addFormInfo.address,
        duration: addFormInfo.duration,
        startTime: addFormInfo.startTime,
        endTime: addFormInfo.endTime,
        quantity: addFormInfo.quantity,
        status: addFormInfo.status,
        remark: addFormInfo.remark
    }).then(({ data: res }) => {
        if (res.status === 200) {
            addDialogVisible.value = false
            http(1)
            ElMessage({
                message: '添加成功',
                type: 'success',
            })
        } else {
            ElMessage.error(res.msg)
        }
    }).catch(error => {
        console.log(error);
    })
}

// 定义富文本编辑器的宽高
const options = {
    width: "100%",
    height: "300px"
}

// 富文本编辑器信息获取
const getInfoEditorHandler = (data) => {
    addFormInfo.remark = data
}

// 清空表单
const clean = () => {
    addFormInfo.name = ""
    addFormInfo.number = ""
    addFormInfo.money = ""
    addFormInfo.address = ""
    addFormInfo.duration = ""
    addFormInfo.startTime = ""
    addFormInfo.endTime = ""
    addFormInfo.quantity = ""
    addFormInfo.status = ""
    addFormInfo.remark = ""
}

// 确认修改事件
const sureEditorHandler = () => {
    api.getUpdateProject(editorID.value,{
        name: editorFormInfo.name,
        number: editorFormInfo.number,
        money: editorFormInfo.money,
        address: editorFormInfo.address,
        duration: editorFormInfo.duration,
        startTime: editorFormInfo.startTime,
        endTime: editorFormInfo.endTime,
        quantity: editorFormInfo.quantity,
        status: editorFormInfo.status,
        remark: editorFormInfo.remark
    }).then(({data:res})=> {
        if (res.status === 200){
            ElMessage({
                type: "success",
                message: res.msg
            })
            http(1)
        }else {
            ElMessage.error(res.msg)
        }
    })
    dialogEditorVisible.value = false
}

</script>

<style scoped>
.search {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #fff;
}

.search span {
    font-weight: 700;
}

.search .input {
    width: 300px;
}

.page {
    position: fixed;
    right: 10px;
    bottom: 80px;
}
</style>