
export type Factory = (c: Container, ...args: any[]) => any

export class Container {
  /**
   * The internal map of factories
   * 
   * @private
   */
  private _factories: Map<string, Factory>

  /**
   * Initialize a new container instance
   * 
   * @param map The factories map
   * @constructor
   * @public
   */
  public constructor (map: Map<string, Factory>) {
    this._factories = map
  }

  /**
   * Add a service factory
   * 
   * @param name The service name
   * @param fn The service factory
   * @public
   */
  public bind (name: string, fn: Factory): this {
    this._factories.set(name, fn)
    return this
  }

  /**
   * Bind a singleton factory
   * 
   * @param name The bind name
   * @param fn The factory function
   * @public
   */
  public singleton (name: string, fn: Factory) {
    return this.bind(name, _memoize(fn))
  }

  /**
   * Invoke the factory and return the instance
   * 
   * @param name 
   * @param args Optional arguments
   * @public
   */
  public make (name: string, ...args: any[]): any {
    let fn = this._factories.get(name)

    if (fn) return fn(this, ...args)
  }

  /**
   * Check if a factory is already registered
   * 
   * @param name 
   * @public
   */
  public bound (name: string): boolean {
    return this._factories.has(name)
  }
}

/**
 * Create a memoized version of a factory
 * 
 * @param fn factory function
 * @private
 */
function _memoize (fn: Factory): Factory {
  let value: any

  return (container, ...args) => {
    return value || (value = fn(container, ...args))
  }
}
