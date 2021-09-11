## Memory Leak

### Garbage Collected

`reference counting`, when the count reaches zero

### Accidental Global variables

```js
function foo () {
    bar = 'this is a hidden global variables'
}
```

_in fact, it's:_

```js
function foo () {
    window.bar = 'this is a hidden global variables'
}
```

to avoid, add `use strict`

### Forgotten timers or callbacks

`setInterval`, `on`, `addEventListener`

### Out of DOM references

```js
const elements = {
    button: document.getElementById('button')
}

function removeButton () {
    // direct child of body
    document.body.removeChild(document.getElementById('button'))
    // after remove, still a reference to #button
    // the button element is still in memory
    // and can not be collected by GC
}
```

### Closures
