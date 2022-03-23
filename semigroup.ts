// https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7
// SEMIGROUPS - used to concat things of a given type
import {last, Semigroup} from "fp-ts/Semigroup";

// create an instance of Semigroup for numbers
const semiGroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

const semiGroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}


semiGroupSum.concat(2, 2) //?
semiGroupString.concat('2', '2') //?
// can also get a semigroup of specified type via function, ie: always
// emit the last item
last<string>().concat('1','2') //?