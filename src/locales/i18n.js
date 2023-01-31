import { createI18n } from 'vue-i18n'
import en from "./lang/en"
import zh from "./lang/zh"

const messages = {
    zh,
    en
}

const i18n = createI18n({
    legacy: false, // 对于组合式API的支持,莫名其妙且只能为false
    locale: localStorage.getItem("lang"),
    globalInjection: true,
    messages
})

export default i18n