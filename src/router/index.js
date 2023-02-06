import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Homeview from '../views/Homeview/index.vue'
import Login from '../views/LoginInfo/index.vue'
import { useLoginStore } from '../stores/loginStore'
import { useMenuStore } from '../stores/menuStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      meta: {
        requiresAuth: true //限制未登录时的路由权限
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Homeview,
          meta: {
            requiresAuth: true,
            key: "首页"
          }
        }, {
          path: '/project',
          name: 'projet',
          meta: {
            requiresAuth: true,
            key: "项目基础信息"
          },
          component: () => import('../views/ProjectInfo/index.vue')
        }, {
          path: '/tunnel',
          name: 'tunnel',
          meta: {
            requiresAuth: true,
            key: "隧道设计信息"
          },
          component: () => import('../views/TunnelInfo/index.vue')
        }, {
          path: '/build',
          name: 'build',
          meta: {
            requiresAuth: true,
            key: "施工监控检测"
          },
          component: () => import('../views/BuildManage/index.vue')
        }, {
          path: '/geological',
          name: 'geological',
          meta: {
            requiresAuth: true,
            key: "超前地质预报"
          },
          component: () => import('../views/GeoLogicalInfo/index.vue')
        }, {
          path: '/system',
          name: 'system',
          meta: {
            requiresAuth: true,
            key: "系统信息管理"
          },
          component: () => import('../views/SystemManage/index.vue')
        }, {
          path: '/plan',
          name: 'plan',
          meta: {
            requiresAuth: true,
            key: "计划检测"
          },
          component: () => import('../views/BuildManage/PlanTest/index.vue')
        }, {
          path: '/section',
          name: 'section',
          meta: {
            requiresAuth: true,
            key: "切面检测"
          },
          component: () => import('../views/BuildManage/SectionTest/index.vue')
        }, {
          path: '/ucenter',
          name: 'ucenter',
          meta: {
            requiresAuth: true,
            key: "个人中心"
          },
          component: () => import('../views/UserCenter/index.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: "/pdf/:id",
      name: "pdf",
      component: () => import('../views/TunnelInfo/PDFViewer/index.vue')
    }, {
      // 404路径匹配规则
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('../views/NotFound/index.vue')
    }
  ]
})

/**
 * 路由权限
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 需要验证登录
    const loginStore = useLoginStore()
    if (!loginStore.token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  localStorage.setItem("active", to.path)
  if (to.meta.key) {
    const menuStore = useMenuStore()
    menuStore.breadcrumb = to.meta.key
  }
})



export default router
