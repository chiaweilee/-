## BigInt

_ECMAScript `stage 3`, not support under IE/EDGE_

represent whole numbers larger than 253 - 1

```js
BigInt(value);
```

_BigInt() is not used with the new operator._

```js
9999999999999999 - 1 === 9999999999999998; // false, 10000000000000000
9999999999999999n - 1n === 9999999999999998n; // true
BigInt(9999999999999999) - BigInt(1) === BigInt(9999999999999998); // true
```
