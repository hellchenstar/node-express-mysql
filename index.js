/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-14 17:39:45
 * @Description: file content
 */
const express = require('express')
const app = express()


app.use(express.static('./dist'))

// post请求必须
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 初始化passport
const passport = require('passport')
app.use(passport.initialize())
require('./config/passport.js')(passport)

app.disable('etag');

// 引入路由模块
const users = require('./routers/api/users.js')
const menu = require('./routers/api/menu.js')
// 使用router
app.use('/api/users', users)
app.use('/api/menu', menu)


// 开启服务
const port = process.env.port || 21009
app.listen(port, () => {
  console.log(`服务运行成功,端口号：${port}`)
})