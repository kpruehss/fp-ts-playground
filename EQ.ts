import * as EQ from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as ARR from 'fp-ts/Array'
import * as S from 'fp-ts/string'
import {pipe} from "fp-ts/function";
import {contramap} from "fp-ts/Eq";

type Point = {
  x: number,
  y: number
}

// LETS COMPARE 2 STRUCTURES OF ARBITRARY TYPE (Point)

// Declare an instance of EQ for Point
const eqPoint: EQ.Eq<Point> = EQ.struct({x: N.Eq, y: N.Eq})

// Compare 2 given points using the instance of EqPoint
eqPoint.equals({x: 0, y: 0}, {x: 0, y: 0}) //?
eqPoint.equals({x: 0, y: 0}, {x: 0, y: 1}) //?

// LETS COMPARE ARRAYS

// declare an instance of EQ for arrays of strings
const eqArrayOfStrings = ARR.getEq(S.Eq);

eqArrayOfStrings.equals(['Time','After','Time'], ['Time','After','Time']) //?
eqArrayOfStrings.equals(['Time','After','Time'], ['Time','After','time']) //?

// We can use contramap to create an instance of Eq for a given type A. Lets
// create a user type and get an Eq instance based on the user ID
type User = {
  id: number,
  name: string
}

const eqUser: Eq<User> = pipe(
  N.Eq, // user.id is a number, if you wanted it based on name, use S.Eq
  contramap((user: User) => user.id)
)
const user1: User = {
  id: 1,
  name: 'Bob'
}

const user2: User = {
  id: 1,
  name: 'Steve'
}
eqUser.equals(user1, user2) //?