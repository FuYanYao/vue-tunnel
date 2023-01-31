<template>
    <div class="card">
        <div class="box">
            <el-icon class="box-icon" style="color:#40c9c6">
                <Notification />
            </el-icon>
            <span class="box-title">隧道数量: 1000</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#36a3f7">
                <Finished />
            </el-icon>
            <span class="box-title">检验合格: 900</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#f4561c">
                <Odometer />
            </el-icon>
            <span class="box-title">正在施工: 1000</span>
        </div>
        <div class="box">
            <el-icon class="box-icon" style="color:#34bfa3">
                <Warning />
            </el-icon>
            <span class="box-title">地质预报: 5000</span>
        </div>
    </div>
    <div class="line" id="line"></div>
    <div class="charts">
        <div class="charts-rada" id="charts-rada"></div>
        <div class="charts-rose" id="charts-rose"></div>
        <div class="charts-bar" id="charts-bar"></div>
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from "vue"
import api from '../../api/index'
const { proxy } = getCurrentInstance()

onMounted(() => {
    api.getLine().then(({data: res})=>{
        if(res.status === 200){
            proxy.$line("line",res.result.lines)
        }
        proxy.$rada("charts-rada")
        proxy.$rose("charts-rose")
        proxy.$bar("charts-bar")
    }).catch(error=>{
        console.log(error);
    })
})


</script>
<style scoped>
.card {
    display: flex;
}

.card .box {
    flex: 1;
    height: 130px;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
}

.card .box:nth-child(1) {
    margin-left: 0;
}

.card .box:nth-child(4) {
    margin-right: 0;
}

.card .box .box-icon {
    display: block;
    font-size: 60px;
    color: #40c9c6;
    line-height: 130px;
    float: left;
    padding-left: 20px;
}

.box-title {
    display: block;
    font-size: 18px;
    color: #666;
    line-height: 130px;
    float: right;
    padding-right: 20px;
}

.line {
    width: 100%;
    height: 300px;
    background-color: #fff;
}

.charts{
    display: flex;
}

.charts div{
    flex: 1;
    height: 450px;
    margin: 20px;
    padding: 10px;
    background-color: #fff;
}

.charts div:nth-child(1){
    margin-left: 0;
}
.charts div:nth-child(3){
    margin-right: 0;
}
</style>