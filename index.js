/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 18:56:13
 * @Description: file content
 */
const express = require('express')
const app = express()

// post请求必须
app.use(express.urlencoded({ extended: false }))
app.use(express.json())





// 引入路由模块
const users = require('./routers/api/users.js')
// const menu = require('./routers/api/menu.js')
// 使用router
app.use('/api/users', users)
// app.use('/api/menu', menu)


// 开启服务
const port = process.env.port || 2888
app.listen(port, () => {
  console.log(`服务运行成功,端口号：${port}`)
})