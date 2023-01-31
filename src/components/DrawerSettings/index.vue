<template>
    <div class="setting">
        <el-button size="large" class="setting-btn" type="primary" @click="drawer = true">
            <el-icon class="setting-icon">
                <Setting />
            </el-icon>
        </el-button>
        <el-drawer v-model="drawer" title="系统设置" size="20%">
            <el-icon class="logo-show">
                <Lock />
            </el-icon>
            <span>logo显示与隐藏</span>
            <el-switch class="logo-toggle" v-model="systemStore.storeToggle" />
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useSystemStore } from "@/stores/systemStore.js"

const emit = defineEmits(["onToggleEvent"])

const systemStore = useSystemStore()
const drawer = ref(false)

// 组件传递方案
const logoToggle = ref(true)
watch(logoToggle, (newValue, oldValue) => {
    emit("onToggleEvent",newValue)
})
</script>

<style scoped>
.setting {
    position: fixed;
    right: 0;
    top: 300px;
    z-index: 100;
}

.setting-icon {
    font-size: 25px;
}

.logo-toggle {
    position: relative;
    left: 100px;
}

.logo-show {
    margin-right: 20px;
    margin-right: 10px;
}
</style>