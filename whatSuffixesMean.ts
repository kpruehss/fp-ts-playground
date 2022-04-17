// The 'c' suffix (ie. Functor2c vs Functor2)
// the number in Functor2c means kind
// the c means Constrained

// NEED TO FIGURE THIS OUT MORE

// -------------------------------------------------------------------------

// The 'e' suffix (ie. matchE)
// 'E' means effect
// for example, instead of returning a value, you return a Task holding the
// value (the Task is an 'Effect')

import * as T from "fp-ts/Task";
import * as TO from "fp-ts/TaskOption"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/lib/Either"
import * as IE from "fp-ts/lib/IOEither"
import {pipe} from "fp-ts/function"

const value = TO.of("hello");

// T.Task<number>
pipe(value, TO.match(() => 0, (str) => str.length))

// T.Task<number>
pipe(value, TO.matchE(() => T.of(0), (str) => T.of(str.length)))

// Both of the above result in a Task<number>, but matchE you have an effect
// in the form of a Task

// -------------------------------------------------------------------------

// The "k" suffix (ie. fromEitherK or chainEitherK)
// 'K' mean Kleisli. A Kleisli arrow function with signature
// (a: A) => F<B>

// Lets write a number parser
 function parse(s: string): E.Either<Error, number> {
  const n = parseFloat(s);
  return isNaN(n)
    ? E.left(new Error(`cannot decode ${JSON.stringify(s)} to number`))
    : E.right(n)
 }

 // And now we get a value of type IOEither<Error, string>
const input: IE.IOEither<Error, string> = IE.right('foo')
// How can you parse that input??

// You can lift the Kleisli arrow function 'parse' from :
// (s: string) => E.Either<Error, number>
// into a function: (s:string) => IE>IOEither<Error, number> using
// fromEitherK

pipe(input, IE.chain(IE.fromEitherK(parse)))() //?

// or with less boilerplate:
pipe(input, IE.chainEitherK(parse))() //?

// ------------------------------------------------------------------------

// The "T" usually means Transformer (in sequenceT it actually means Tuple),
// as in Monad Transformers

// ------------------------------------------------------------------------

// The "W" (ie. chainW, chainEitherKW) means Widen. Functions that end with W
// can aggregate errors into a Union (for use with Either based data-types) or
// environments into an intersection (for Reader based data types)

declare function parseString(s: string): E.Either<string, number>
declare function fetchUser(id: number): TE.TaskEither<Error, User>

// this will raise an error because: type 'string' is not assignment to type
// "Error"
const program_ = (s: string) => pipe(s, TE.fromEitherK(parseString), TE.chain(fetchUser))

// const program: (s: string) => TE.TaskEither<string, Error | user>
const program = (s: string) => pipe(s, TE.fromEitherK(parseString), TE.chainW(fetchUser))