/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-23 19:21:46
 * @Description: file content
 */
const menuSql = {
  // 添加菜单
  add: 'insert into menu(name, url, icon, parentId, level) values(?, ?, ?, ?, ?)',
  // 新增or更新菜单
  update: 'update menu set name = ?,id = ?,url = ?,icon = ?,parentId = ?,level = ? where id = ?',
  // 查所有菜单
  queryAll: 'select * from menu',
  // 根据菜单url名称查找
  queryByUrl: 'select * from menu where url = ?',
  // 根据id查找
  queryById: 'select * from menu where id = ?'
}

module.exports = menuSql