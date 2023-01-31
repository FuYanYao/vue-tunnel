import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "./assets/init.css"
import piniaPersist from "pinia-plugin-persist"
import elementIcon from "./plugins/icons"
import echarts from "./plugins/echart"
import i18n from "./locales/i18n"
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import en from 'element-plus/dist/locale/en.mjs'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(elementIcon)
app.use(echarts)
app.use(i18n)

app.use(ElementPlus, {
    locale: localStorage.getItem("lang") === "zh" ? zhCn : '',
  })

app.mount('#app')
