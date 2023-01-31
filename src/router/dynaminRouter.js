// 添加动态路由防止用户直接通过路由访问越级权限
const manage = {
    path: '/work',
    name: 'work',
    meta: {
        requiresAuth: true,
        key: "工作监督管理"
    },
    component: () => import('../views/WorkManage/index.vue')
}

export default manage