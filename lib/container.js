
'use strict'

exports.Container = class {
  /**
   * 
   * @param {Map} map 
   */
  constructor (map) {
    this._factories = map
  }

  /**
   * Add a service factory.
   * 
   * @param {string | symbol} name The service name
   * @param {function} fn Factory function
   * @throws `TypeError` if the factory is not a function.
   * @public
   */
  bind (name, fn) {
    if (typeof fn !== 'function') {
      throw new TypeError(`Expect a function but got: ${typeof fn}`)
    }

    this._factories.set(name, fn)

    return this
  }

  /**
   * Add a singleton factory
   * 
   * @param {string | symbol} name The service name
   * @param {function} fn Factory function
   * @public
   */
  singleton (name, fn) {
    return this.bind(name, _memoize(fn))
  }

  /**
   * Invoke the factory and return the service
   * 
   * @param {string | symbol} name The factory name
   * @param {...any} args Additional arguments to pass
   * @public
   */
  make (name, ...args) {
    let fn = this._factories.get(name)

    if (fn) return fn(this, ...args)
  }

  /**
   * Check if a factory is already registered for the given service
   * 
   * @param {string | symbol} name The service name
   * @public
   */
  bound (name) {
    return this._factories.has(name)
  }
}

/**
 * Create a memoized version of a factory
 * 
 * @param fn factory function
 * @private
 */
function _memoize (fn) {
  let value

  return (container, ...args) => {
    return value || (value = fn(container, ...args))
  }
}
