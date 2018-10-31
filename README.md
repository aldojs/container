
A framework-agnostic dependency container.

## Install

```sh
$ npm add @aldojs/container
```

## Usage

```js
let { createContainer } = require('@aldojs/container')

let container = createContainer()

// add a `foo` factory
container.bind('foo', (c) => ({ foo: true }))

// later, create `foo` object
let obj = container.make('foo')
```

## API

### container.bound(name)

Check a bind is already defined.

### container.bind(name, fn)

Add an new factory into the container.

### container.singleton(name, fn)

Bind a singleton factory to make a singleton instances.

### container.make(name, ...args)

Create and return the service instance, passing the additional arguments.

### Factory function

Each function given to `bind` or `singleton` as second parameter should have the following signature

```ts
function Factory = (c: Container, ...args: any[]) => any;
```
