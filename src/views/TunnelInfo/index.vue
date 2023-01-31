<template>
    <div class="tunnel-container">
        <div class="tunnel-list">
            <h3>选择断面</h3>
            <el-tree lazy :load="loadNode" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <div class="tunnel-content">

        </div>
    </div>
</template>

<script setup>


const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label' // 对应data中的选项
}

const handleNodeClick = (data) => {

}
</script>

<style scoped>
.tunnel-container{
    display: flex;
}

.tunnel-list{
    width: 250px;
    background-color: #fff;
    padding: 10px;
    margin-right: 10px;
}

.tunnel-list h3{
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0;
}

.tunnel-content{
    flex: 1;
}
</style>