import * as J from 'fp-ts/Json'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Apply'
import {pipe} from 'fp-ts/function'

const firstJson = JSON.stringify({firstJson: true})
const secondJson = JSON.stringify({secondJson: 'ITS WORKING'})

// pipe(
//   firstJson,
//   J.parse,
//   E.match(
//     (e) => console.error(e),
//     (data) => console.log(data)
// ))

// Parse 2 JSON (naive...not scalable)
pipe(
  J.parse(firstJson),
  E.chain(one =>
    pipe(
      // J.parse('{"a": }'),
      J.parse(secondJson),
      E.map(two => [one, two])
    )
  ),
  E.match(
    e => console.error(e),
    data => console.log(data)
  )
)

// Parse multiple JSON in a scalable way
const sequenceE = A.sequenceT(E.either);