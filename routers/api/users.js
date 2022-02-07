/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-22 10:23:40
 * @Description: file content
 */
// 引入路由
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const db = require('../../db')
const { jsonWrite, errWrite } = require('../../unitls/unitls')
// 引入user的sql语句
const userSql = require('../../modules/users')




// 注册
router.post('/register', (req, res) => {
  // 查询是否存在
  db.query(userSql.queryByAccount, [req.body.account], (err, result) => {
    if (err) {
      errWrite(res, err.sqlMessage)

    } else {
      if (result.length) {
        jsonWrite(res, '用户已注册')

      } else {
        // 注册
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) {
              errWrite(res, err)
              console.log(err)
            }
            let password = hash
            const params = [
              req.body.username,
              password,
              req.body.role,
              req.body.account
            ]
            db.query(userSql.add, params, (err, result) => {
              if (err) {
                errWrite(res, err.sqlMessage)
              } else {
                jsonWrite(res, '注册成功', result)
              }
            })
          });
        });

      }
    }
  })
  // 
})
// 登录
router.post('/login', (req, res) => {
  // 查询数据库中是否有当前账号
  const account = req.body.account
  const password = req.body.password
  db.query(userSql.queryByAccount, [account], (err, result) => {
    // console.log("err",err)
    // console.log("result",result)
    if (err) {
      errWrite(res, err)
      return
    }
    // 查询库中是否有此账号，没有则提示未注册，有则匹配密码登录
    
    if (result.length) {
      let obj = result[0]
      // 密码匹配
      bcrypt.compare(password, obj.password).then(isMatch => {
        if (isMatch) {
          let rules = {
            id: obj.id,
            account: obj.account,
            role: obj.role
          }
          // jwt token加密
          jwt.sign(rules, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            let data = {
              account: obj.account,
              id: obj.id,
              role: obj.role,
              username: obj.username,
              token: `Bearer ${token}`
            }
            jsonWrite(res, '', data)

          })
        } else {
          jsonWrite(res, '密码错误')
        }
      })
    } else {
      jsonWrite(res, '用户未注册')
    }
  })
})

// 用户个人信息
router.get('/userInfo', passport.authenticate("jwt", { session: false }), (req, res) => {
  jsonWrite(res, '', req.user)
})
module.exports = router