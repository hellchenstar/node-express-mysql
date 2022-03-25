/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-25 17:42:32
 * @Description: file content
 */
const menuSql = {
  // 添加菜单
  add: 'insert into menu(name, url, icon, parentId, level,disabled) values(?, ?, ?, ?, ?, ?)',
  // 新增or更新菜单
  update:
    'update menu set name = ?,url = ?,icon = ?,parentId = ?,level = ? ,disabled = ? where id = ?',
  // 查所有菜单
  queryAll: 'select * from menu',
  // 根据菜单url名称查找
  queryByUrl: 'select * from menu where url = ?',
  // 根据id查找
  queryById: 'select * from menu where id = ?',
  // 根据id删除
  // 逻辑删除
  changeMenuStatusById: 'update menu set disabled = ? where id = ?',
  // 物理删除
  // delMenuById: 'delete from menu where id = ?'
};

module.exports = menuSql;
