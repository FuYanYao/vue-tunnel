const express = require("express")
const router = express.Router()
const url = require("url")
const SQLConnect = require("./SQLConnect")
const jwt = require("jsonwebtoken")
const jwtSecteat = require("./jwtSecret")
const vipData = require("./data/vip")
const adminData = require("./data/admin")
const lineData = require("./data/line")

router.post("/login", (req, res) => {
    // 接收客户端参数
    const { username, password } = req.body;
    const sql = "select * from user where username=? and password=?";
    SQLConnect(sql, [username, password], result => {
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username,
                permission: result[0].permission
            }, jwtSecteat.secret)

            res.send({
                status: 200,
                username: result[0].username,
                permission: result[0].permission,
                token
            })
        } else {
            res.send({
                status: 500,
                msg: "用户名或密码错误"
            })
        }
    })
})

router.get("/router", (req, res) => {
    const user = url.parse(req.url, true).query.user
    switch (user) {
        case "admin":
            res.send({
                status: 200,
                menuData: adminData
            })
            break;
        case "vip":
            res.send({
                status: 200,
                menuData: vipData
            })
            break;
        default:
            res.send({
                status: 200,
                menuData: vipData
            })
    }
})

router.get("/line", (req, res) => {
    res.send({
        status: 200,
        result: lineData
    })
})

router.get("/project/all", (req, res) => {
    var page = url.parse(req.url, true).query.page || 1
    const sql = "select * from project order by id desc limit 15 offset " + (page - 1) * 15
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无信息"
            })
        }
    })
})

/**
 * 隧道模糊查询
 */
router.get("/project/search", (req, res) => {
    const search = url.parse(req.url, true).query.search
    const sql = "select * from project where concat(`name`,`address`,`remark`) like '%" + search + "%'"
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无信息"
            })
        }
    })
})

/**
 * 获得总页数
 */
router.get("/project/total", (req, res) => {
    const sql = "select count(*) from project where id"
    SQLConnect(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无信息"
            })
        }
    })
})

/**
 * 隧道添加
 */
router.get("/project/add", (req, res) => {
    var name = url.parse(req.url, true).query.name || "";
    var number = url.parse(req.url, true).query.number || "";
    var money = url.parse(req.url, true).query.money || "";
    var address = url.parse(req.url, true).query.address || "";
    var duration = url.parse(req.url, true).query.duration || "";
    var startTime = url.parse(req.url, true).query.startTime || "";
    var endTime = url.parse(req.url, true).query.endTime || "";
    var quantity = url.parse(req.url, true).query.quantity || "";
    var status = url.parse(req.url, true).query.status || "";
    var remark = url.parse(req.url, true).query.remark || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,?,?,?,?)"
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark]
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    })
})

// 隧道信息删除
router.get("/project/del", (req, res) => {
    var id = url.parse(req.url, true).query.id
    const sql = "delete from project where id=?"
    SQLConnect(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})

// 隧道预更新
router.get("/project/update/pre", (req, res) => {
    const id = url.parse(req.url, true).query.id
    const sql = "select * from project where id=?"
    SQLConnect(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result: result[0]
            })
        } else {
            res.send({
                status: 500,
                msg: '预更新失败'
            })
        }
    })
})

/**  
 * 修改隧道接口
 * 
 * restFull API
 * 
 */
router.put("/project/update/:id", (req, res) => {
    const id = req.params.id
    const { name, number, money, address, duration, startTime, endTime, quantity, status, remark } = req.body
    const sql = "update project set name=?,number=?,money=?,address=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?"
    const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark,id]
    SQLConnect(sql, arr, result => {
        if(result.affectedRows>0){
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 隧道设计信息 tree列表 一级
 */
router.get("/tunnel/list",(req,res) => {
    const sql = "select * from tunnel"
    SQLConnect(sql,null,result=> {
        if(result.length> 0){
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 隧道设计信息 tree列表 二级
 */
router.get("/tunnel/list/child",(req,res)=> {
    const cid = url.parse(req.url,true).query.cid
    const sql = "select * from tunnelchild where cid=?"
    SQLConnect(sql,[cid],result => {
        if(result.length> 0){
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

module.exports = router