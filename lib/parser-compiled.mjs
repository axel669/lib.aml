// Generated Proteus output
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
const parse_eof = (input, pos) => {
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
    let loc = pos
    let match = null

    ;[loc, match] = parse_textTag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_tag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_tagLine(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_textLine(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat1 = (input, pos, parentResults) => {
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
const $parse_repeat3 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_emptyLine(input, loc)
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
const $condition5 = ([ prop ], _, { indent }) =>
prop.indent.length === indent.length
const $parse_repeat4 = (input, pos, parentResults) => {
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
        if ($condition5(partialValue, state, parentResults) !== true) {
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
    let loc = pos
    let match = null

    ;[loc, match] = parse_textLine(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_emptyLine(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $condition8 = ([line], _, { indent }) => (
line.text.length === 0
|| line.indent.length > indent.length
)
const $parse_repeat6 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or7(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition8(partialValue, state, parentResults) !== true) {
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
const $parse_repeat9 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_emptyLine(input, loc)
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
const $parse_or10 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[a-zA-Z][^\s\]]*/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_or12 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = parse_attr(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_restAttr(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $condition13 = ([ prop ], _, { indent }) =>
prop.indent.length === indent.length
const $parse_repeat11 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or12(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition13(partialValue, state, parentResults) !== true) {
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
const $parse_or15 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = parse_tag(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_tagLine(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_textLine(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $condition16 = ([item], _, { indent }) => (
item.text?.length === 0
|| item.indent.length > indent.length
)
const $parse_repeat14 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or15(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        const partialValue = partial
        if ($condition16(partialValue, state, parentResults) !== true) {
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
const $parse_repeat17 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_emptyLine(input, loc)
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
const $parse_or18 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[a-zA-Z][^\s\]]*/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_opt19 = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    ;[loc, match] = parse_inlineAttrs(input, loc)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    return [loc, results]
}
const $parse_or21 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[^\r\n\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat20 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or21(input, loc)
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
const $parse_repeat22 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_emptyLine(input, loc)
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
const $parse_or24 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[^\r\n\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat23 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or24(input, loc)
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
const $parse_or25 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = parse_eol(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_eof(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat27 = (input, pos, parentResults) => {
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
const $parse_opt26 = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    ;[loc, match] = parse_space(input, loc)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    ;[loc, match] = parse_attrValue(input, loc)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    ;[loc, match] = $parse_repeat27(input, loc, results)
    results.push(match)
    if (match === none) { location(pos); return [pos, null] }

    return [loc, results]
}
const $parse_or28 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = parse_string(input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat29 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = parse_space(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = consumeString("/", input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = parse_space(input, loc)
        if (match === none) { loc = startLoc; location(pos); break }
        partial.push(match)

        ;[loc, match] = parse_inlineAttr(input, loc)
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
const $parse_or30 = (input, pos) => {
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
const $parse_or32 = (input, pos) => {
    let loc = pos
    let match = null

    ;[loc, match] = consumeRegex(/[^\r\n\0]+/y, input, loc)
    if (match !== none) { return [loc, match] }

    ;[loc, match] = parse_insert(input, loc)
    if (match !== none) { return [loc, match] }

    return [pos, none]
}
const $parse_repeat31 = (input, pos, parentResults) => {
    const results = []
    let loc = pos
    let match = null

    while (true) {
        const startLoc = loc
        const partial = []
        ;[loc, match] = $parse_or32(input, loc)
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
    const results = []
    let loc = pos
    let match = null

    currentRule = "textTag"

    ;[loc, match] = $parse_repeat3(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString(":", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = consumeRegex(/script|style/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.type = match

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_repeat4(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.props = match

    ;[loc, match] = $parse_repeat6(input, loc, results)
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
        prop => prop[0].pairs
        ).flat(1)
        ),
        children: children.map(
        child => child[0]
        ).flat()
    }
}
const parse_tag = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    currentRule = "tag"

    ;[loc, match] = $parse_repeat9(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString(":", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_or10(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.type = match

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_repeat11(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.props = match

    ;[loc, match] = $parse_repeat14(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.children = match

    return [loc, action_tag(results, state, opt)]
}
const action_tagLine = ({ indent, type, text, props }) => ({
    indent,
    type,
    props: props?.[0] ?? {},
    children: [
    { indent: `${indent} `, text: text.flat(), type: "_text" }
]
})
const parse_tagLine = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    currentRule = "tagLine"

    ;[loc, match] = $parse_repeat17(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = consumeString(":", input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_or18(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.type = match

    ;[loc, match] = parse_space(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = $parse_opt19(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.props = match

    ;[loc, match] = $parse_repeat20(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.text = match

    ;[loc, match] = parse_eoc(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_tagLine(results, state, opt)]
}
const action_textLine = ({ indent, text }) => ({ indent, text: text.flat(), type: "_text" })
const parse_textLine = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    currentRule = "textLine"

    ;[loc, match] = $parse_repeat22(input, loc, results)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)
    results.indent = match

    ;[loc, match] = $parse_repeat23(input, loc, results)
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
    const results = []
    let loc = pos
    let match = null

    currentRule = "eol"

    ;[loc, match] = consumeRegex(/\r?\n/y, input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_eol(results, state, opt)]
}
const action_emptyLine = ([ indent ]) => ({ indent, text: [] })
const parse_emptyLine = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    currentRule = "emptyLine"

    ;[loc, match] = parse_indent(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    ;[loc, match] = parse_eol(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_emptyLine(results, state, opt)]
}
const action_eoc = i => i
const parse_eoc = (input, pos) => {
    const results = []
    let loc = pos
    let match = null

    currentRule = "eoc"

    ;[loc, match] = $parse_or25(input, loc)
    if (match === none) { location(pos); return [pos, none] }
    results.push(match)

    return [loc, action_eoc(results, state, opt)]
}
const action_insert = ({ index }) => ({
    index,
    toJSON() {
        return `\0${index}\0`
    }
    })
    const parse_insert = (input, pos) => {
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
    const action_restAttr = ({ indent, value }) => ({ indent, pairs: Object.entries(value) })
    const parse_restAttr = (input, pos) => {
        const results = []
        let loc = pos
        let match = null

        currentRule = "restAttr"

        ;[loc, match] = parse_indent(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.indent = match

        ;[loc, match] = consumeString("...", input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        ;[loc, match] = parse_insert(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.value = match

        ;[loc, match] = parse_eoc(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        return [loc, action_restAttr(results, state, opt)]
    }
    const action_attr = ({ indent, name, value }) => {
        const attrParts =
        (value === null)
        ? [true]
        : [
        value[1],
        ...value[2].map(
        part => part[3]
        )
        ]
        const attrValue =
        (attrParts.length === 1)
        ? attrParts[0]
        : [ attrParts.join(" ") ]
        return {
            indent,
            pairs: [ [name, attrValue] ]
        }
    }
    const parse_attr = (input, pos) => {
        const results = []
        let loc = pos
        let match = null

        currentRule = "attr"

        ;[loc, match] = parse_indent(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.indent = match

        ;[loc, match] = consumeString(".", input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        ;[loc, match] = parse_attrName(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.name = match

        ;[loc, match] = $parse_opt26(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.value = match

        ;[loc, match] = parse_eoc(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        return [loc, action_attr(results, state, opt)]
    }
    const action_inlineAttr = ({ name, value }) => [name, value]
    const parse_inlineAttr = (input, pos) => {
        const results = []
        let loc = pos
        let match = null

        currentRule = "inlineAttr"

        ;[loc, match] = consumeString(".", input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        ;[loc, match] = parse_attrName(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.name = match

        ;[loc, match] = parse_space(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        ;[loc, match] = $parse_or28(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.value = match

        return [loc, action_inlineAttr(results, state, opt)]
    }
    const action_inlineAttrs = ({ first, rest }) => Object.fromEntries([
    first,
    ...rest.map(
    item => item[3]
    )
    ])
    const parse_inlineAttrs = (input, pos) => {
        const results = []
        let loc = pos
        let match = null

        currentRule = "inlineAttrs"

        ;[loc, match] = consumeString("[", input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        ;[loc, match] = parse_inlineAttr(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.first = match

        ;[loc, match] = $parse_repeat29(input, loc, results)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)
        results.rest = match

        ;[loc, match] = consumeString("]", input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        return [loc, action_inlineAttrs(results, state, opt)]
    }
    const action_space = i => i
    const parse_space = (input, pos) => {
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
        const results = []
        let loc = pos
        let match = null

        currentRule = "attrName"

        ;[loc, match] = $parse_or30(input, loc)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        return [loc, action_attrName(results, state, opt)]
    }
    const action_attrValue = ([value]) => value.map(item => item[0])
    const parse_attrValue = (input, pos) => {
        const results = []
        let loc = pos
        let match = null

        currentRule = "attrValue"

        ;[loc, match] = $parse_repeat31(input, loc, results)
        if (match === none) { location(pos); return [pos, none] }
        results.push(match)

        return [loc, action_attrValue(results, state, opt)]
    }
    const action_string = ([str]) => JSON.parse(str)
    const parse_string = (input, pos) => {
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
