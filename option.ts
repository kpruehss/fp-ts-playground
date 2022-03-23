import {pipe, flow} from "fp-ts/function";
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import {Semigroup} from "fp-ts/Semigroup";
import {none} from "fp-ts/Option";

interface Foo {
  bar: string
}

const foo = {
  bar: 'hello'
} as Foo | undefined

// Safely access a parameter on an object that may or may not exist
pipe(foo, O.fromNullable, O.map(({bar}) => bar), O.match(() => 'empty', (a) => a)) //?

// using fp-ts Array ADT, we cna safely access array items
const arr: any[]= [2];

// this function is basically the implementation of A.head
function safeHead<T>(arr: T[]): O.Option<T> {
  return arr.length ? O.some(arr[0]) : O.none;
}

const safeFirstValue: O.Option<number> = A.head(arr)

safeHead(arr) //?
safeFirstValue //?

const firstElementDoubled = pipe(safeFirstValue, O.map(value => value * 2))
firstElementDoubled //?

pipe(firstElementDoubled, O.fold(() => 0, (result) => result)) //?

// Same as line 32, but using match
pipe(firstElementDoubled, O.match(
  () => 'nothing was passed',
  (some) => `a some containing ${some}`
)) //?

const oneOverValue = pipe(firstElementDoubled, O.chain(n => n === 0 ? O.none : O.some(1/n))) //?