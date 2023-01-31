<template>
    <div class="slider-navs" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
        <div v-show="systemStore.storeToggle" class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
        <el-menu 
        background-color="#304156" 
        text-color="#fff" 
        active-text-color="#ffd04b" 
        :default-active="active"
        router 
        class="el-menu-vertical-demo" 
        :collapse="menuStore.isCollapse"
        >
            <!-- 循环生成视图，不会增加页面结构 -->
            <template v-for="(item, index) in menuStore.menus" :key="index">
                <el-sub-menu :index="item.path" v-if="item.children">
                    <template #title>
                        <component class="icon" :is="item.icon"></component>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="childItem.path" v-for="(childItem,childIndex) in item.children" :key="childIndex">
                        <span>{{ childItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <component class="icon" :is="item.icon"></component>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMenuStore } from '@/stores/menuStore';
import { useSystemStore } from '@/stores/systemStore'

const active = ref("/")
const menuStore = useMenuStore()
const systemStore = useSystemStore()
// const props = defineProps({
//     myToggle: {
//         type: Boolean,
//         default:false
//     }
// })

if (localStorage.getItem("active")) {
    active.value = localStorage.getItem('active')
}

</script>
<style scoped>
.slider-navs {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 210px;
    background-color: #304156;
    transition: 0.3s ease-in;
}

.logo {
    width: 100%;
    height: 60px;
    background-color: #364e6d;
    text-align: center;
    font-size: 25px;
    color: #fff;
    line-height: 60px;
}

.el-menu-vertical-demo {
    text-align: center;
}

.icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
</style>