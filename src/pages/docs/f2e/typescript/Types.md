## Types

### Basic

#### boolean

```typescript
const bool: boolean = false;
```

#### number

```typescript
const decimal: number = 61453;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
```

#### string

```typescript
const str: string = 'Hello, world!';
```

#### array

```typescript
const list: number[] = [1, 2, 3];
const numbers: Array<number> = [1, 2, 3];
const tuple: [string, number] = ['Jone', 18];
```

#### Void

```typescript
const fn = (): void => {};
```

```typescript
const x: void = null;
const y: void = undefined;
```

#### null and undefined

```typescript
// --strictNullChecks
let num: number | null | undefined;
num = 1;
num = undefined;
num = null;
```

### Type assertions

```typescript
const text: any = 'Hello, world!';
const length1: number = (<string>text).length;
const length2: number = (text as string).length;
```

### Readonly

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

const numbers: ReadonlyArray<number> = [1, 2, 3];
const num1 = numbers; // error!
const num2 = numbers as number[]; // works!
```

### Function

```typescript
interface Fn {
  (source: string, subString: string): boolean;
}
```

### Class

#### Implementing an interface

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
  new (hour: number, minute: number);
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

#### Extending Interfaces

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
```

### Namespacing

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
}

const validators: { [s: string]: Validation.StringValidator } = {};
```

### Declare

```typescript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```
