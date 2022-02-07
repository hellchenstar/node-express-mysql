/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-02-07 11:51:09
 * @Description:用户模块
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