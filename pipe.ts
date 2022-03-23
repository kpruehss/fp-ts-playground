import {pipe, flow} from "fp-ts/function";

const increment = value => value + 1 //?
increment(1) //?
const double = value => value * 2

const incDouble = flow(increment, double) //?

incDouble(1) //?

pipe(1, increment, double) //?
