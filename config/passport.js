/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-20 14:36:19
 * @Description: file content
 */
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys.js')
const db = require('../db')
const userSql = require('../modules/users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // 这里通过token匹配，返回用户个人信息
    db.query(userSql.queryById, jwt_payload.id, (err, result) => {
      if (result.length) {
        return done(null, result[0])
      }
      return done(null, false)
    })

  }));
}