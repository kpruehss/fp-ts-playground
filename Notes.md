# Definition of a Monoid
- A monoid is any algebraic construct that has an Identity element 
(something that when applied to a given value, returns the value 
un-altered ie: multiplying any given number by 1, 1 is the identity 
element for multiplication) 
- A monoid has to be associative, IE the order of operation doesn't matter.

### Summery
If a set of values `T` and an operation `op` has an identity element, and 
the order of operation doesn't matter, then the set is a monoid. A function 
such as `reduce()` will work seamlessly with a monoid, but if we had a 
[semigroup](#definition-of-a-semigroup) instead, we have to be aware of what we use as the initial 
value 
and which direction we're reducing (`reduce()` is left-to-right, `reduceRight()` is right-to-left)

# Definition of a Semigroup
- In short, a Semigroup is similar to a Monoid, but does not have an 
identity element. It still follows the associativity rules. Without an 
identity element, it matters whether we put the initial value to the left of 
the first element, or the right of the last element. 
