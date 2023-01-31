<template>
    <div class="layout-container">
        <DrawerSettings @on-toggle-event="getToggleEvent" />
        <SliderNavs :myToggle="myToggle" />
        <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }">
            <TopNavs />
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import SliderNavs from '../components/SliderNavs/index.vue'
import TopNavs from '../components/TopNavs/index.vue'
import { useMenuStore } from '../stores/menuStore'
import { onMounted,ref } from 'vue';
import api from '../api/index.js'
import { useLoginStore } from "@/stores/loginStore.js"
import { useRouter } from 'vue-router';
import manageRouter from '../router/dynaminRouter';
import DrawerSettings from '../components/DrawerSettings/index.vue'

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()

const myToggle = ref(false)

onMounted(() => {
    api.getRouter({
        user: loginStore.permission
    }).then(({ data: res }) => {
        if (res.status === 200) {
            menuStore.menus = res.menuData.menus
            if (loginStore.permission === 'admin'){
                // 给admin添加具有的动态路由
                router.addRoute('layout',manageRouter)
            }
        }
    }).catch(err => {
        console.log(err);
    })
})

const getToggleEvent = (data) => {
    myToggle.value = data
}

</script>

<style scoped>
.right-container {
    margin-left: 210px;
    transition: 0.3s ease-in;
}

.content {
    padding: 20px;
}
</style>