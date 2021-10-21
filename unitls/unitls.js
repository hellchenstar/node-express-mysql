/*
 * @Author: chenx
 * @CreatedDate: Do not edit
 * @LastEditTime: 2021-10-20 16:10:41
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
const errWrite = (res, err) => {
  res.status(200).json({
    code: 500,
    msg: err
  })
}

module.exports = {
  jsonWrite,
  errWrite
}
