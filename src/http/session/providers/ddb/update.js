var getDoc = require('./_get-dynamo-doc-instance')
var week = require('./_week-from-now')

module.exports = function _update(name, payload, callback) {
  var _ttl = week()
  var session = Object.assign(payload, {_ttl})
  getDoc(function _gotDoc(err, db) {
    if (err) callback(err)
    else {
      db.put({
        TableName: name,
        Item: session
      },
      function _create(err) {
        if (err) {
          callback(err)
        }
        else {
          callback(null, session)
        }
      })
    }
  })
}
