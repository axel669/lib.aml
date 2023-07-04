import { Parser, Rule } from "@axel669/proteus"

export default Parser({
    [Parser.start]: Rule.contents,
    contents: Rule(
        { entries: Rule.$repeat(
            0,
            Rule.$or(
                // [Rule.emptyLine],
                [Rule.textTag],
                [Rule.tag],
                [Rule.textLine],
            )
        ) },
        /\s*/,
        ({ entries }) => entries.map(
            entry => entry[0]
        )
    ),
    textTag: Rule(
        { indent: Rule.indent },
        "[",
        { type: /script|style/ },
        "]",
        Rule.eol,
        { props: Rule.$repeat(
            0,
            ([ prop ], _, { indent }) =>
                prop.indent.length === indent.length,
            Rule.attr
        ) },
        { children: Rule.$repeat(
            0,
            ([line], _, { indent }) => (
                line.text === ""
                || line.indent.length > indent.length
            ),
            Rule.textLine
        ) },
        ({ indent, type, children, props }) => {
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
    ),
    tag: Rule(
        { indent: Rule.indent },
        "[",
        { type: Rule.$or(
            [/[a-zA-Z][^\s\]]*/],
            [Rule.insert]
        ) },
        "]",
        Rule.eol,
        { props: Rule.$repeat(
            0,
            ([ prop ], _, { indent }) =>
                prop.indent.length === indent.length,
            Rule.attr
        ) },
        { children: Rule.$repeat(
            0,
            ([item], _, { indent }) => (
                item.text === ""
                || item.indent.length > indent.length
            ),
            Rule.$or(
                [Rule.tag],
                [Rule.textLine],
            )
        ) },
        ({ indent, type, children, props }) => {
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
                )
            }
        }
    ),
    textLine: Rule(
        { indent: Rule.indent },
        { text: /[^\r\n]*/ },
        Rule.eol,
        ({ indent, text }) => ({ indent, text, type: "_text" })
    ),
    indent: Rule(
        /[\t ]*/,
        ([ indent ]) => indent
    ),
    eol: Rule(
        /\r?\n/
    ),
    insert: Rule(
        "\0",
        { index: /\d+/ },
        "\0",
        ({ index }, _, { values }) => values[parseInt(index)]
    ),
    attr: Rule(
        { indent: Rule.indent },
        ":",
        { name: Rule.attrName },
        {
            value: Rule.$opt(
                Rule.space,
                Rule.$or(
                    [Rule.string],
                    [Rule.attrValue],
                )
            )
        },
        Rule.eol,
        ({ indent, name, value }) => {
            const attrValue = value?.[1] ?? ""
            return {
                indent,
                pair: [name, attrValue]
            }
        }
    ),
    space: Rule(
        /[\t ]+/
    ),
    attrName: Rule(
        Rule.$or(
            [Rule.string],
            [/[^\s\0]+/],
            [Rule.insert]
        ),
        ([name]) => name
    ),
    attrValue: Rule(
        Rule.$repeat(
            1,
            Rule.$or(
                [/[^\r\n\0]+/],
                [Rule.insert]
            )
        ),
        ([ value ]) => {
            if (value.length === 1) {
                return value[0][0]
            }
            return value.map(item => item[0]).join("")
        }
    ),
    string: Rule(
        /"(\\"|[^"])*"/,
        ([str]) => JSON.parse(str)
    ),
})
