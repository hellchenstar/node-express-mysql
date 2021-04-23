/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-23 14:48:52
 * @Description: file content
 */
const userSql = {
  // 用户
  add: 'insert into users(username, password, role, account) values(?, ?, ?, ?)',
  // 根据账号查找
  queryByAccount: 'select * from users where account = ?',
  // 根据id查找
  queryById: 'select * from users where id = ?'
}

module.exports = userSql