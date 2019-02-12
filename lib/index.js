
'use strict'

const { Container } = require('./container')


exports.Container = Container

/**
 * Create a dependency container
 * 
 * @param {Map} map 
 * @public
 */
exports.createContainer = function (map = new Map()) {
  return new Container(map)
}
