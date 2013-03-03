
var EventEmitter = require('events').EventEmitter
var next         = process.nextTick
var SubDb        = require('./sub')

var Hooks   = require('level-hooks')

module.exports   = function (db, sep) {
  //use \xff (255) as the seperator,
  //so that sections of the database will sort after the regular keys
  sep = sep || '\xff'
  Hooks(db)

  db.namespace = function (prefix) {
    return new SubDb(db, prefix, sep)
  }

  db.prefix = function () {
    return ''
  }

  db.pre = db.hooks.pre
  db.post = db.hooks.post

  return db
}

