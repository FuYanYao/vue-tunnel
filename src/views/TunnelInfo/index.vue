<template>
  <div class="tunnel-container">
    <div class="tunnel-list">
      <h3>选择断面</h3>
      <el-tree lazy :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div class="tunnel-content">
      <el-table :data="tunnelContent.data" style="width:100%">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="隧道名称" prop="tunnelname"></el-table-column>
        <el-table-column label="图名" prop="imagename"></el-table-column>
        <el-table-column label="图号" prop="num"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="danger" @click="previewHandler(scope.$index, scope.row)">预览</el-button>
            <el-button size="small" type="success" @click="updateHandler(scope.$index, scope.row)">上传</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 上传对话框 -->

  <el-dialog center  v-model="dialogVisible" title="上传文件" width="30%">
    <el-upload ref="uploadRef" :on-success="handlePDFSuccess" class="upload" :on-exceed="handleExceed" :limit="1" v-model:file-list="fileList"
      action="http://localhost:3000/api/upload">
      <el-button type="primary">点击上传</el-button>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearUpload">取消</el-button>
        <el-button type="primary" @click="clearUpload">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import api from "@/api/index.js"
import { reactive, onMounted, ref } from "vue"
import { useRouter } from "vue-router"


const router = useRouter()
onMounted(() => {
  handleNodeClick({ content: "zb" })
})

const uploadRef = ref()

const dialogVisible = ref(false)

const fileList = ref([])

const currentID = ref(0)

const defaultProps = {
  children: 'children',
  label: 'name' // 对应data中的选项
}

const tunnelContent = reactive({
  data: []
})

const handleNodeClick = (data) => {
  api.getTunnelContent({ content: data.content }).then(({ data: res }) => {
    if (res.status === 200) {
      tunnelContent.data = res.result
    } else {
      tunnelContent.data = []
    }
  }).catch(error => {
    console.log(error);
  })
}

const loadNode = (node, resolve) => {
  if (node.level === 0) {
    // 一级节点
    api.getTunnelList().then(({ data: res }) => {
      if (res.status === 200) {
        return resolve(res.result)
      } else {
        return resolve([])
      }
    })
  } else if (node.level === 1) {
    // 二级节点
    api.getTunnelListChild({
      cid: node.data.cid
    }).then(({ data: res }) => {
      if (res.status === 200) {
        return resolve(res.result)
      } else {
        return resolve([])
      }
    })
  } else if (node.level > 1) {
    // 大于二级节点
    return resolve([])
  }
}

// 预览
const previewHandler = (index,row) => {
  router.push("pdf/"+row.id)
}

// 上传
const updateHandler = (index,row) => {
  currentID.value = row.id
  dialogVisible.value = true
}

// 上传文件超出
const handleExceed = () => {
  console.log("上传文件超出");
}

// 上传成功的回调函数
const handlePDFSuccess = (response,uploadFile) => {
  // console.log(response,uploadFile);
  api.getUploadTunnelContent({
    id: currentID.value,
    urlName: response.url.substr(7)
  }).then(({data:res})=>{
    if(res.status===200){
      console.log(res);
    } 
  }).catch(error=> {
    console.log(error);
  })
  clearUpload()
}

const clearUpload = () => {
  dialogVisible.value = false
  uploadRef.value.clearFiles()
}

</script>

<style scoped>
.tunnel-container {
  display: flex;
}

.tunnel-list {
  width: 250px;
  background-color: #fff;
  padding: 10px;
  margin-right: 10px;
}

.tunnel-list h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 10px 0;
}

.tunnel-content {
  flex: 1;
}

.upload {
  display: inline-block;
}
</style>