/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 20:26:01
 * @Description: file content
 */
// 引入路由
const express = require('express')
const router = express.Router()

const db = require('../../db')
// 引入user的sql语句
const userSql = require('../../modules/users')


const jsonWrite = function (res, data) {
  if (typeof data === 'undefined') {
    res.json({
      code: 500,
      msg: res
    })
  } else {
    res.json({
      code: 200,
      data: data,
    })
  }
}


router.post('/register', (req, res) => {

  // 查询是否存在
  db.query(userSql.query, [req.body.account], (err, result) => {
    if (err) {
      res.status(500).json({
        code: 500,
        msg: err.sqlMessage
      })
    } else {
      console.log('==>', result.length)
      if (result.length) {
        res.status(500).json({
          code: 500,
          msg: '用户已注册!'
        })
      } else {
        // 注册
        const params = [
          req.body.username,
          req.body.password,
          req.body.role,
          req.body.account
        ]
        db.query(userSql.add, params, (err, result) => {
          if (err) {
            console.log(err.sqlMessage)
            res.status(500).json({
              code: 500,
              msg: err.sqlMessage
            })
          } else {
            jsonWrite(res, result)
          }
        })
      }
    }
  })
  // 
})

module.exports = router