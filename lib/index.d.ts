
export declare class Container {
  /**
   * Initialize a new container instance
   *
   * @param map The factories map
   * @constructor
   * @public
   */
  constructor(map: Map<string | symbol, Factory>);

  /**
   * Add a service factory.
   *
   * @param name The factory name.
   * @param fn The factory function.
   * @throws `TypeError` if the factory is not a function.
   * @public
   */
  bind(name: string, fn: Factory): this;

  /**
   * Bind a singleton factory.
   *
   * @param name The factory name.
   * @param fn The factory function.
   * @throws `TypeError` if the factory is not a function.
   * @public
   */
  singleton(name: string, fn: Factory): this;

  /**
   * Invoke the factory and return the service
   * 
   * @param name The factory name
   * @param args Additional arguments to pass
   * @public
   */
  make(name: string, ...args: any[]): any;

  /**
   * Check if a factory is already registered
   *
   * @param name The factory name
   * @public
   */
  bound(name: string): boolean;
}

export declare type Factory = (c: Container, ...args: any[]) => any;
