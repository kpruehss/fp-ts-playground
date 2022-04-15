import {pipe, flow} from "fp-ts/function";

const increment = value => value + 1 //?
increment(1) //?
const double = value => value * 2

const incDouble = flow(increment, double) //?

incDouble(1) //?

pipe(1, increment, double) //?
type Tuple = [number, boolean]
const lt4 = (value: Tuple) => [value, value[0] < 4]
const lt6 = (value: Tuple) => [value, value[0] < 6]
const unwrap = (value: Tuple): boolean => value[1]

pipe([1, true], lt4, lt6) //?