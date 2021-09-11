## classes

Classes are in fact "special functions", and just as you can define `function expressions` and `function declarations`, the class syntax has two components:
`class expressions` and `class declarations`

### Class declarations

```js
class Test {
    constructor () {}
}
```

#### Hoisting

`function declarations` are `hoisting` and `class declarations` are not

```js
new Test() // ReferenceError
class Test {}
```

### Class expressions

```js
const Test = class {}
const Test = class Test2 {}
```

### Prototype methods

```js
Class Test {
    constructor (h, w) {
        this.h = h
        this.w = w
    }
    // Getter
    get area () {
        return this.clacArea()
    }
    // Method
    calcArea () {
        return this.h * this.w
    }
}
```

### Static methods
