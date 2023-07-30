// import parse from "./multiline.mjs"
// import aml from "../lib/parser.mjs"

// const { parse } = aml

import tag from "../lib/tag.mjs"

const input = `
    [div]
    :wat
    :test some value
    / spanning lines
    / like so many lines
        content?
`

const splash = {
    a: 10,
    b: 12
}

console.dir(
    tag`
        [div]
        :wat
        :...${splash}
        :test some value
        / spanning lines
        / like so many lines
            content?
    `,
    { depth: null }
)
// console.dir(
//     parse(`[test]`),
//     { depth: null }
// )
