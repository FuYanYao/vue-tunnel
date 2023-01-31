import axios from "../utils/request";
import base from "./base"

const api = {
    // 登录
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    // 用户权限
    getRouter(params) {
        return axios.get(base.baseUrl + base.router, {
            params
        })
    },
    // 获取line图表
    getLine() {
        return axios.get(base.baseUrl + base.line)
    },
    getProjectInfo(params) {
        return axios.get(base.baseUrl + base.projectInfo, {
            params
        })
    },
    // 模糊查询
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    // 获取数据总条数
    getTotal() {
        return axios.get(base.baseUrl + base.total)
    },
    // 添加隧道
    getAddProject(params) {
        return axios.get(base.baseUrl + base.add,{
            params
        })
    },
    // 删除隧道
    getDelProject(params) {
        return axios.get(base.baseUrl + base.del,{
            params
        })
    },
    // 隧道预更新
    getPreProject(params) {
        return axios.get(base.baseUrl + base.pre,{
            params
        })
    },
    // 隧道修改
    getUpdateProject(id, params) {
        return axios.put(base.baseUrl + base.update + id ,params)
    },
    // 隧道设计信息tree一级
    getTunnelList() {
        return axios.get(base.baseUrl + base.tunnelList)
    },
    // 隧道设计信息tree二级
    getTunnelListChild(params) {
        return axios.get(base.baseUrl + base.tunnelListChild,{
            params
        })
    },
}

export default api