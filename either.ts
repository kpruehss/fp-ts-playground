import {
  chain,
  Either,
  fromPredicate,
  getApplicativeValidation,
  getValidation,
  left,
  map,
  mapLeft,
  right
} from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'
import {getSemigroup, NonEmptyArray} from "fp-ts/NonEmptyArray";
import {sequenceT} from "fp-ts/Apply";

pipe(
  1,
  fromPredicate(
    n => n > 0,
    () => 'Error'
  )
) //?


const minLength = (s: string): Either<string, string> =>
  s.length >= 6
    ? right(s)
    : left('Must contain at least 6 characters')

const oneCapital = (s:string): Either<string, string> =>
  /[A-Z]/g.test(s)
    ? right(s)
    : left('Must contain one capital letter')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('Must contain at least one number')

const validatePasswordBad = (s: string) =>
  pipe(minLength(s), chain(oneCapital), chain(oneNumber))

// Works but bad UX as each condition fails one at a time
validatePasswordBad('ab')

// instead, lets return an array of all errors at once. To do that we need a
// semigroup and use validation from Either.ts
// We'll neeed to either rewrite the validation functions to return an array
// (bad!)
// or use a combinator to adjust the current behavior (good!).
function lift<E, A>(check: (a:A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
  return a =>
    pipe(
      check(a),
      mapLeft(a => [a]) //mapLeft executes a map over the Left path
    )
}

const minLengthValidation = lift(minLength);
const oneCapitalValidation = lift(oneCapital);
const oneNumberValidation = lift(oneNumber);

// We now have new composed functions that return Non-Empty arrays of errors.
// Combine them using sequenceT, getting a validation returning a semigroup
// of non-empty array (note that semigroups are used to concat things, in
// this case concating errors into an array) and then supplying our lifted
// validation functions
function validatePassword(s:string): Either<NonEmptyArray<string>, string> {
  return pipe(
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      minLengthValidation(s),
      oneCapitalValidation(s),
      oneNumberValidation(s)
    ),
    map(() => s)
  )
}

// now we get an array of all errors at once instead
validatePassword('ab')