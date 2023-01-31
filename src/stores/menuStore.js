import { defineStore } from "pinia"

export const useMenuStore = defineStore('menu',{
    state: () => {
        return {
            isCollapse: false,
            breadcrumb: '首页',
            menus: []
        }
    },
    // 本地持久化存储
    persist: {
        enabled: true,
        strategies: [
            {
                key: "menus",// 持久化存储的key
                storage: localStorage
            }
        ]
    }
})