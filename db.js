/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-09-14 15:39:26
 * @Description: // 创建数据库连接
 */
// 引入mysql数据库
const mysql = require('mysql')
const keys = require('./config/keys')


const db = mysql.createConnection({
  host: keys.dbUrl,
  user: 'root',
  password: '123456',
  database: 'chenx-vue3'
})

db.connect((err) => {
  if (err) throw err
  console.log('数据库连接成功')
})
module.exports = db