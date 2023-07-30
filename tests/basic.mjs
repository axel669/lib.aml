import parser from "../lib/parser.mjs"

const n = 10
const f = () => {}

const res = () => tag`
    :label
    .ws-x @toggle @flat
        :input
        .type checkbox
        / more value
        .checked ${n}
        .onChange () => items.toggle(index)

        :div
        .ws-x $text p[4px]
        .style flex-grow: 1;
            item.text
            testing ${[1, 2, 3, 4]}

    :${f} [.a "hi" / .b ${100}] some content
`
// console.dir(res(), { depth: null })

// console.time("repeat")
// for (let i = 0; i < 10000; i += 1) {
//     res()
// }
// console.timeEnd("repeat")

// console.log(
//     JSON.stringify(res, null, 2).replace(
//         /"\\u0000(\d+)\\u0000"/g,
//         (_, n) => `values[${n}]`
//     )
// )
