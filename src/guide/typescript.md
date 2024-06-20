---
title: typescript知识点
date: 2024-05-22
categories:
 - 前端
tags:
 - ts
 - typescript
---


## 类型断言

有时你知道类型信息，但是 TypeScript 无法确定。

例如，如果你使用的是 document.getElementById，TypeScript 只知道这将返回某种 HTMLElement，但你可能知道你的页面将始终具有具有给定 ID 的 HTMLCanvasElement。

在这种情况下，你可以使用类型断言来指定更具体的类型：

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// 你还可以使用尖括号语法（注意：这种写法在 .tsx 文件中有其他意义）：
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

你可以使用两次断言将变量转成所需类型，先是 any（或 unknown），然后是所需类型

```ts
const a = expr as any as T;
```

## 非空断言运算符（后缀 !）
TypeScript 还具有一种特殊的语法，可以在不进行任何显式检查的情况下从类型中删除 null 和 undefined。在任何表达式之后写 ! 表示该值不是 null 或 undefined：
```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

## 泛型函数

### 约束条件
下例表明泛型Type必须包含{ length: number }的属性。
```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
//Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```
看下面的例子，意思是该函数承诺返回与泛型相同的类型，而不仅仅是与约束匹配的类型。

```ts
interface A{
  length:number
}
// 在 AType extends BType 中，只有 AType 是 BType 的子类型，ts 通过类型约束的检验；
function len<T extends A>(c:T):T{
  return {length:c.length} 
}
// 报错
/* Type '{ length: number; }' is not assignable to type 'T'.
  '{ length: number; }' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'A'. */

```

## 索引签名

```ts
interface StringArray {
  [index: number]: string;
}
```

可以支持两种类型的索引器，但从数字索引器返回的类型必须是从字符串索引器返回的类型的子类型。这是因为当使用 number 进行索引时，JavaScript 在索引到对象之前实际上会将其转换为 string。这意味着使用 100（ number）建立索引与使用 "100"（ string）建立索引是一样的，因此两者需要保持一致。

```ts
interface Animal {
  name: string;
}
 
interface Dog extends Animal {
  breed: string;
}
 
// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
// 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
  [x: string]: Dog;
}
```

其他属性也是一样，需为索引签名的子类型

```ts
interface NumberDictionary {
  [index: string]: number;
 
  length: number; // ok
  name: string;
// Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}
```

## 多余属性检查

正常情况下，属性不匹配会报错。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
 
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
 
let mySquare = createSquare({ colour: "red", width: 100 });
/* Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
  Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'? */
```

可以使用断言绕过检查

```ts
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
```

先赋值给一个变量，在传入也可绕过检查。前提是在 squareOptions 和 SquareConfig 之间具有共同属性，否则也会报错

```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

// 错误示例
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
// Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.
```

## keyof

```ts
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
    
// type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
    
// type M = string | number
```

请注意，在这个例子中，M 是 string | number - 这是因为 JavaScript 对象键总是被强制转换为字符串，所以 obj[0] 总是与 obj["0"] 相同。

## 索引访问类型
我们可以使用索引访问类型来查找另一种类型上的特定属性：

对象

```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
     
// type Age = number

type I1 = Person["age" | "name"];
     
// type I1 = string | number
 
type I2 = Person[keyof Person];
     
// type I2 = string | number | boolean
 
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
     
// type I3 = string | boolean
```
数组
```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
/* 
type Person = {
    name: string;
    age: number;
} 
*/
type Age = typeof MyArray[number]["age"];
     
// type Age = number
// Or
type Age2 = Person["age"];
      
// type Age2 = number
```

## 条件类型

条件类型的形式看起来有点像 JavaScript 中的条件表达式 (condition ? trueExpression : falseExpression)：

```ts
SomeType extends OtherType ? TrueType : FalseType;
```

当 extends 左边的类型可以赋值给右边的类型时，就会得到第一个分支（“true” 分支）的类型；否则，你将在后一个分支（“false” 分支）中获得类型。

### infer

条件类型提供了infer关键字，让我们可以从true分支中进行类型推导。例如，我们可以在Flatten中推断出元素类型，而不是使用索引访问类型“手动”获取它:

```ts
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

### 分布式条件类型

当条件类型使用泛型，且泛型是联合类型时，它们就是分布式的。举个例子:

```ts
type ToArray<Type> = Type extends any ? Type[] : never;
```

如果我们将联合类型传入 ToArray，那么条件类型将应用于该联合类型的每个成员。

```ts
type StrArrOrNumArr = ToArray<string | number>;

// 相当于 ToArray<string> | ToArray<number>;
// type StrArrOrNumArr = string[] | number[]
           
```
通常，分布式是期望的行为。为避免这种行为，你可以对泛型进行一些操作，如：
```ts
//1.用方括号将 extends 关键字的每一侧括起来使其成为数组类型：
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
 
// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>;

// type ArrOfStrOrNum = (string | number)[]

//2.取对象的某个属性
type LookUp<U extends { type: string }, T> = U extends {type:T}  ? 1: 2 // 分布
type LookUp<U extends { type: string }, T> = U['type'] extends T ? 1: 2 // 不分布
```
注意：
```ts
// 只有T分布，U不分布？
type Exclude<T,U>=T extends U ? never : T

type E=Exclude<'a'|'b'|'c','a'|'b'> //c
type E1=Exclude<'a','a'|'b'>|Exclude<'b','a'|'b'>|Exclude<'c','a'|'b'>//c
type E2=Exclude<'a','a'>|Exclude<'b','a'>|Exclude<'a','b'>|Exclude<'b','b'>|Exclude<'c','a'>|Exclude<'c','b'> // 'a'|'b'|'c'
```

## 映射类型

映射类型是一种泛型类型，它使用PropertyKeys的联合(通常通过keyof创建)迭代键来创建类型:

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
           
/* 
type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
} 
*/
```

在此示例中，OptionsFlags 将获取 Type 类型的所有属性并将其值更改为布尔值。

### 映射修饰符

在映射期间可以应用两个额外的修饰符：readonly 和 ? 分别影响可变性和可选性。

你可以通过添加前缀 - 或 + 来移除或添加这些修饰符。如果你没有写前缀，则默认为 +。

```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>;
           
// type UnlockedAccount = {
//     id: string;
//     name: string;
// }
```

### 通过 as 重新映射键

在 TypeScript 4.1 及更高版本中，你可以使用映射类型中的 as 子句重新映射映射类型中的键：

```ts

type B='a'|'c'

type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as B ]: Type[Properties]
}

type Z=MappedTypeWithNewProperties<{x:number}>
/* 
type Z = {
    a: number;
    c: number;
} 
*/

```

你可以映射任意联合，不仅是 string | number | symbol 的联合(注：上面 `Properties in keyof Type` 的类型)，还可以映射任何类型的联合：

```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
       
/* 
type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
} 
*/
```