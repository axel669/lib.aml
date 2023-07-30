const none = Symbol("none")

let state = null
let opt = null

const consumeString = (pattern, input, pos) => {
    if (input.substr(pos, pattern.length) === pattern) {
        return [pos + pattern.length, pattern]
    }
    return [pos, none]
}
const consumeRegex = (pattern, input, pos) => {
    pattern.lastIndex = pos
    const match = pattern.exec(input)
    if (match === null) {
        return [pos, none]
    }
    return [pattern.lastIndex, match?.[0] ?? null]
}
let count = {}
let lastc = null
const inc = (name) => {
    if (lastc !== name) {
        lastc = name
        console.log("parsing", name)
    }
    const c = count[name] ?? 0
    count[name] = c + 1
    if (c === 100) {
        throw new Error(`broke in ${name}`)
    }
}
const parse_eof = (input, pos) => {
    inc("eof")
    console.log(pos, input.length)
    if (pos === input.length) {
        return [pos, null]
    }
    return [pos, none]
}

let last = 0
let lastRule = null
let currentRule = null
const location = (pos) => {
    if (pos < last) {
        return
    }
    last = pos
    lastRule = currentRule
}
const linePosition = (input, pos) => {
    let line = 0
    let next = 0
    while (next < pos && next !== -1) {
        line += 1
        next = input.indexOf("\n", next + 1)
    }
    return {
        line,
        col: pos - input.lastIndexOf("\n", pos)
    }
}
const $parse_or2 = (input, pos) => {
    inc("or2")
    let loc = pos
    let match = null

    ;[loc, match] = parse_textTag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_tag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_textLine(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat1 = (input, pos, parentResults) => {
    inc("repeat1")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or2(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $condition4 = ([ prop ], _, { indent }) =>
prop.indent.length === indent.length
const $parse_repeat3 = (input, pos, parentResults) => {
    inc("repeat3")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_attr(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition4(partialValue, state, parentResults) !== true) {
            loc = startLoc
            break
        }

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $condition6 = ([line], _, { indent }) => (
line.text.length === 0
|| line.indent.length > indent.length
)
const $parse_repeat5 = (input, pos, parentResults) => {
    inc("repeat5")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_textLine(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition6(partialValue, state, parentResults) !== true) {
            loc = startLoc
            break
        }

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $parse_or7 = (input, pos) => {
    inc("or7")
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[a-zA-Z][^\s\]]*/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $condition9 = ([ prop ], _, { indent }) =>
prop.indent.length === indent.length
const $parse_repeat8 = (input, pos, parentResults) => {
    inc("repeat8")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_attr(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition9(partialValue, state, parentResults) !== true) {
            loc = startLoc
            break
        }

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $parse_or11 = (input, pos) => {
    inc("or11")
    let loc = pos
    let match = null

    ;[loc, match] = parse_tag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_textLine(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $condition12 = ([item], _, { indent }) => (
item.text?.length === 0
|| item.indent.length > indent.length
)
const $parse_repeat10 = (input, pos, parentResults) => {
    inc("repeat10")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or11(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition12(partialValue, state, parentResults) !== true) {
            loc = startLoc
            break
        }

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $parse_or14 = (input, pos) => {
    inc("or14")
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[^\r\n\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat13 = (input, pos, parentResults) => {
    inc("repeat13")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or14(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $parse_or15 = (input, pos) => {
    inc("or15")
    let loc = pos
    let match = null

    ;[loc, match] = parse_eol(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_eof(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat17 = (input, pos, parentResults) => {
    inc("repeat17")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_eol(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = parse_indent(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = consumeString("/ ", input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = parse_attrValue(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial

        results.push(partialValue)
    }
    if (results.length < 0) {
        return [pos, none]
    }
    return [loc, results]
}
const $parse_opt16 = (input, pos) => {
    inc("opt16")
    const results = []
    let loc = pos
    let match = null

    ;[loc, match] = parse_space(input, loc)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    ;[loc, match] = parse_attrValue(input, loc)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    ;[loc, match] = $parse_repeat17(input, loc, results)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    return [loc, results]
}
const $parse_or18 = (input, pos) => {
    inc("or18")
    let loc = pos
    let match = null

    ;[loc, match] = parse_string(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = consumeRegex(/[^\s\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_or20 = (input, pos) => {
    inc("or20")
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[^\r\n\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat19 = (input, pos, parentResults) => {
    inc("repeat19")
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or20(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial

        results.push(partialValue)
    }
    if (results.length < 1) {
        return [pos, none]
    }
    return [loc, results]
}

const action_contents = ({ entries }) => entries.map(
entry => entry[0]
)
const parse_contents = (input, pos) => {
    inc("contents")
    const results = []
    let loc = pos
    let match = null

    currentRule = "contents"

    ;[loc, match] = $parse_repeat1(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.entries = match

    ;[loc, match] = consumeRegex(/\s*/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_contents(results, state, opt)]
}
const action_textTag = ({ indent, type, children, props }) => {
    return {
        indent,
        type,
        props: Object.fromEntries(
        props.map(
        prop => prop[0].pair
        )
        ),
        children: children.map(
        child => child[0] ?? ""
        )
    }
}
const parse_textTag = (input, pos) => {
    inc("textTag")
    const results = []
    let loc = pos
    let match = null

    currentRule = "textTag"

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString("[", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = consumeRegex(/script|style/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.type = match

    ;[loc, match] = consumeString("]", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_repeat3(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.props = match

    ;[loc, match] = $parse_repeat5(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.children = match

    return [loc, action_textTag(results, state, opt)]
}
const action_tag = ({ indent, type, children, props }) => {
    return {
        indent,
        type,
        props: Object.fromEntries(
        props.map(
        prop => prop[0].pair
        )
        ),
        children: children.map(
        child => child[0]
        ).flat()
    }
}
const parse_tag = (input, pos) => {
    inc("tag")
    const results = []
    let loc = pos
    let match = null

    currentRule = "tag"

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString("[", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_or7(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.type = match

    ;[loc, match] = consumeString("]", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_repeat8(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.props = match

    ;[loc, match] = $parse_repeat10(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.children = match

    return [loc, action_tag(results, state, opt)]
}
const action_textLine = ({ indent, text }) => ({ indent, text: text.flat(), type: "_text" })
const parse_textLine = (input, pos) => {
    inc("textLine")
    const results = []
    let loc = pos
    let match = null

    currentRule = "textLine"

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = $parse_repeat13(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.text = match

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_textLine(results, state, opt)]
}
const action_indent = ([ indent ]) => indent
const parse_indent = (input, pos) => {
    inc("indent")
    const results = []
    let loc = pos
    let match = null

    currentRule = "indent"

    ;[loc, match] = consumeRegex(/[\t ]*/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_indent(results, state, opt)]
}
const action_eol = i => i
const parse_eol = (input, pos) => {
    inc("eol")
    const results = []
    let loc = pos
    let match = null

    currentRule = "eol"

    ;[loc, match] = consumeRegex(/\r?\n/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_eol(results, state, opt)]
}
const action_eoc = i => i
const parse_eoc = (input, pos) => {
    inc("eoc")
    const results = []
    let loc = pos
    let match = null

    currentRule = "eoc"

    ;[loc, match] = $parse_or15(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_eoc(results, state, opt)]
}
const action_insert = ({ index }, _, { values }) => values[parseInt(index)]
const parse_insert = (input, pos) => {
    inc("insert")
    const results = []
    let loc = pos
    let match = null

    currentRule = "insert"

    ;[loc, match] = consumeString("\u0000", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = consumeRegex(/\d+/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.index = match

    ;[loc, match] = consumeString("\u0000", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_insert(results, state, opt)]
}
const action_attr = ({ indent, name, value }) => {
    console.log(value)
    const attrValue = value?.[1] ?? ""
    return {
        indent,
        pair: [name, attrValue]
    }
}
const parse_attr = (input, pos) => {
    inc("attr")
    const results = []
    let loc = pos
    let match = null

    currentRule = "attr"

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString(":", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_attrName(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.name = match

    ;[loc, match] = $parse_opt16(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.value = match

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_attr(results, state, opt)]
}
const action_space = i => i
const parse_space = (input, pos) => {
    inc("space")
    const results = []
    let loc = pos
    let match = null

    currentRule = "space"

    ;[loc, match] = consumeRegex(/[\t ]+/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_space(results, state, opt)]
}
const action_attrName = ([name]) => name
const parse_attrName = (input, pos) => {
    inc("attrName")
    const results = []
    let loc = pos
    let match = null

    currentRule = "attrName"

    ;[loc, match] = $parse_or18(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_attrName(results, state, opt)]
}
const action_attrValue = ([ value ]) => {
    if (value.length === 1) {
        return value[0][0]
    }
    return value.map(item => item[0]).join("")
}
const parse_attrValue = (input, pos) => {
    inc("attrValue")
    const results = []
    let loc = pos
    let match = null

    currentRule = "attrValue"

    ;[loc, match] = $parse_repeat19(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_attrValue(results, state, opt)]
}
const action_string = ([str]) => JSON.parse(str)
const parse_string = (input, pos) => {
    inc("string")
    const results = []
    let loc = pos
    let match = null

    currentRule = "string"

    ;[loc, match] = consumeRegex(/"(\\"|[^"])*"/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_string(results, state, opt)]
}
export default (input, options) => {
    last = 0
    opt = options
    state = {
    }
    const [index, value] = parse_contents(input, 0)
    if (index !== input.length) {
        if (value === none) {
            const pos = linePosition(input, last)
            const error = new Error(`
            Parser failed at line ${pos.line}, col ${pos.col}.
            -> Expected ${lastRule} but got ${JSON.stringify(input.at(last))}.
            `
            .trim()
            .replace(/^\s/mg, "")
            )
            error.input = input
            error.position = pos
            error.index = last
            error.rule = lastRule

            return error
        }
        const error = new Error("Expected EOF got not that dingus")
        error.index = index
        error.parsed = input.slice(0, index)
        error.remaining = input.slice(index)
        error.result = value
        return error
    }

    return value
}
