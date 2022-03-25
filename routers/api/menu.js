/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2022-03-25 17:41:44
 * @Description: 菜单
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { jsonWrite, errWrite } = require('../../unitls/unitls');

const db = require('../../db');
const menuSql = require('../../modules/menu');
const { route } = require('express/lib/application');
// 新增菜单
router.post(
  '/saveMenu',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 查询数据库中是否有当前菜单
    db.query(menuSql.queryByUrl, [req.body.url], (err, result) => {
      if (err) {
        errWrite(res, err.sqlMessage);
      }
      if (result.length) {
        errWrite(res, '菜单已存在!');
      } else {
        const params = [
          req.body.name,
          req.body.url,
          req.body.icon,
          req.body.parentId ? req.body.parentId : null,
          req.body.level,
          req.body.disabled,
        ];
        db.query(menuSql.add, params, (err, result) => {
          if (err) {
            errWrite(res, err.sqlMessage);
          } else {
            jsonWrite(res, '新增成功', result);
          }
        });
      }
    });
  }
);

router.post(
  '/updateMenu',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // 查询数据库中是否有当前菜单
    db.query(menuSql.queryById, [req.body.id], (err, result) => {
      if (err) {
        errWrite(res, err.sqlMessage);
      }
      if (!result.length) {
        errWrite(res, '菜单不存在!');
      } else {
        const params = [
          req.body.name,
          req.body.url,
          req.body.icon,
          req.body.parentId ? req.body.parentId : null,
          req.body.level,
          req.body.id,
          req.body.disabled,
        ];
        db.query(menuSql.update, params, (err, result) => {
          if (err) {
            errWrite(res, err.sqlMessage);
          } else {
            jsonWrite(res, '更新成功', result);
          }
        });
      }
    });
  }
);
// 菜单列表
router.get(
  '/menuList',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.query(menuSql.queryAll, (err, result) => {
      if (err) {
        errWrite(res, err.sqlMessage);
      }
      jsonWrite(res, '', result);
    });
  }
);

// 删除菜单
router.post(
  '/changeMenuStatus',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const params = [req.body.disabled ? 1 : 0, req.body.id];
    db.query(menuSql.changeMenuStatusById, params, (err, result) => {
      if (err) {
        errWrite(res, err.sqlMessage);
      }
      jsonWrite(res, '删除成功', '');
    });
  }
);
module.exports = router;
