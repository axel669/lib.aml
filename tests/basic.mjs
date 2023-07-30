import parser from "../lib/parser.mjs"
import tag from "../lib/tag.mjs"

// const build = (type, props, ...children) => {
//     return { type, props, children }
// }
// const aml = `
//     :script
//         const code = true
//         console.log("hi, ", code)

//         const done = false

//     :label
//     .ws-x @toggle @flat
//         :input
//         .type checkbox
//         / more value
//         .checked
//         .onChange () => items.toggle(index)

//         :div
//         .ws-x $text p[4px]
//         .style flex-grow: 1;
//             item.text
//             testing

//     :div [.a "hi" / .b "100"] some content
// `

// console.dir(
//     parser.parse(aml, { build }),
//     { depth: null }
// )

console.dir(
    tag`
        :script
            const code = true
            console.log("hi, ", code)

            const done = false

        :label
        .ws-x @toggle @flat
            :input
            .type checkbox
            / more value
            .checked
            .onChange () => items.toggle(index)
            .f ${() => { }}
            ...${{a: 10}}

            :div
            .ws-x $text p[4px]
            .style flex-grow: 1;
                item.text
                testing

        :div [.a "hi" / .b "100"] some content ${-1}
    `,
    { depth: null }
)
