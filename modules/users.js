/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-21 20:01:52
 * @Description: file content
 */
const userSql = {
  // 用户
  add: 'insert into users(username, password, role, account) values(?, ?, ?, ?)',
  query: 'SELECT * FROM users WHERE account = ?'
  // selectUser: 'select * from user WHERE username = ? AND password = ? '
}

module.exports = userSql