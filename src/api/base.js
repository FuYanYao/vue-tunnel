const base = {
    baseUrl: "http://localhost:3000",
    login: "/api/login",                      // 登录地址
    router: "/api/router",                    // 用户权限
    line: "/api/line",                        // 图表line
    projectInfo: "/api/project/all",          // 隧道信息获取
    search: "/api/project/search",            // 搜索地址
    total: "/api/project/total",              // 总条数
    add: "/api/project/add",                  // 添加隧道
    del: "/api/project/del",                  // 删除隧道
    pre: "/api/project/update/pre",           // 编辑预更新
    update: "/api/project/update/",           // 编辑数据
    tunnelList: "/api/tunnel/list",           // 隧道设计信息tree一级
    tunnelListChild: "/api/tunnel/list/child",//隧道设计信息tree二级
}

export default base