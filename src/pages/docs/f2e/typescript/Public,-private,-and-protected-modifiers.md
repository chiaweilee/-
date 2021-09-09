## Public, private, and protected modifiers

_[typescript-handbook](http://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers)_

### Public

by default

### Private

`private`, cannot be accessed from outside of its containing class.

### Protected

`protected`, can also be accessed within deriving classes.

[sandbox](https://codesandbox.io/s/typescript-9eywy)

```ts
class Component {
  protected props: any;
  protected constructor(props: any) {
    this.props = props;
  }
}

class MyComponent extends Component {
  public constructor(props: any) {
    super(props);
  }

  public test() {
    return this.props;
  }
}
```

### Readonly

`readonly` properties must be initialized at their declaration or in the constructor.

### Get/Set

`getters`/`setters` as a way of intercepting accesses to a member of an object.

### Static

`static` on the origin, as it’s a general value for all grids. Each instance accesses this value through prepending the name of the class.

### Abstract

`abstract` keyword is used to define abstract classes as well as abstract methods within an abstract class.

[sandbox](https://codesandbox.io/s/typescript-1kpzw)

```ts
abstract class Component {
  protected props: any;
  protected constructor(props: any) {
    this.props = props;
  }

  protected abstract render(): void;
}

class MyComponent extends Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { name } = this.props;
    return 'Hello, '.concat(name, '!');
  }
}
```
