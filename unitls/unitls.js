/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-04-23 15:23:11
 * @Description: file content
 */

// 成功返回
const jsonWrite = function (res, msg, data) {
  if (typeof data === 'undefined') {
    res.json({
      code: 500,
      msg: msg
    })
  } else {
    res.json({
      code: 200,
      data: data,
      msg: msg
    })
  }
}
// 失败返回
const errWrite = (res, msg) => {
  res.status(200).json({
    code: 500,
    msg: msg
  })
}

module.exports = {
  jsonWrite,
  errWrite
}
