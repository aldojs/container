
const assert = require('assert')
const { createContainer } = require('../lib')

const NOOP = () => {}


describe('unit test the container', () => {
  describe('container.bind(name, fn)', () => {
    it('should set an item in the map', () => {
      let map = new Map()
      let container = createContainer(map)

      container.bind('foo', NOOP)

      assert.equal(map.get('foo'), NOOP)
      assert(container.bound('foo'))
      assert.equal(map.size, 1)
    })

    it('should fail if `fn` is not a function', () => {
      let container = createContainer()

      assert.throws(() => {
        container.bind('foo', 123)
      })

      assert.throws(() => {
        container.bind('foo', 'str')
      })

      assert.throws(() => {
        container.bind('foo', {})
      })

      assert.throws(() => {
        container.bind('foo', [])
      })

      assert.throws(() => {
        container.bind('foo', false)
      })

      assert.throws(() => {
        container.bind('foo', null)
      })
    })
  })

  describe('container.make(name, ...args)', () => {
    it('should pass the container', () => {
      let container = createContainer()

      container.bind('foo', (c) => {
        assert.strictEqual(container, c)
        return true
      })

      assert(container.make('foo'))
    })

    it('should pass the arguments', () => {
      let container = createContainer()

      container.bind('foo', (_, str, num) => {
        assert.equal(str, 'bar')
        assert.equal(num, 123)
        return true
      })

      assert(container.make('foo', 'bar', 123))
    })

    it('should return the factory output', () => {
      let container = createContainer()

      container.bind('foo', () => ({ bar: true }))

      assert.deepEqual(container.make('foo'), { bar: true })
    })
  })

  describe('container.singleton(name, fn)', () => {
    it('should bind a memoized version of the factory', () => {
      let container = createContainer()

      container.singleton('foo', () => ({ foo: true }))

      assert.strictEqual(container.make('foo'), container.make('foo'))
    })

    it('should fail if `fn` is not a function', () => {
      let container = createContainer()

      assert.throws(() => {
        container.singleton('foo', 123)
      })

      assert.throws(() => {
        container.singleton('foo', 'str')
      })

      assert.throws(() => {
        container.singleton('foo', {})
      })

      assert.throws(() => {
        container.singleton('foo', [])
      })

      assert.throws(() => {
        container.singleton('foo', false)
      })

      assert.throws(() => {
        container.singleton('foo', null)
      })
    })
  })
})
