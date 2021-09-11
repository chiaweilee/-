## require & import

### CommonJs

```js
const test = 1
module.exports = {
    test
}
```

```js
const { test } = require('./test')
```

### ES Moudle

```js
const test = 1
export default test
export {
    test
}
```

```js
import _test, { test } from './test'
```

### different

- CommonJs output `a copy of value`
- ES Moudle output `reference` of value

- CommonJs Load at running
- ES Module output at compile
