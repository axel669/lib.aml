import { Parser, Rule } from "@axel669/proteus"

export default Parser({
    [Parser.start]: Rule.contents,
    contents: Rule(
        { entries: Rule.$repeat(0)(
            Rule.$or(
                [Rule.textTag],
                [Rule.tag],
                [Rule.tagLine],
                [Rule.textLine],
                [Rule.emptyLine]
            )
        ) },
        /\s*/,
        ({ entries }) => entries.map(
            entry => entry[0]
        ).filter(entry => entry.text?.[0] !== "")
    ),
    textTag: Rule(
        { indent: Rule.indent },
        ":",
        { type: /script|style/ },
        Rule.eoc,
        { props: Rule.$repeat(0)(
            ([ prop ], _, { indent }) =>
                prop.indent.length === indent.length,
            Rule.attr
        ) },
        { children: Rule.$repeat(0)(
            ([line], _, { indent }) => (
                line.text[0] === ""
                || line.indent.length > indent.length
            ),
            Rule.$or(
                [Rule.textLine],
                [Rule.emptyLine]
            )
        ) },
        ({ indent, type, children, props }) => {
            return {
                indent,
                type,
                props: props.map(
                    prop => prop[0].pair
                ),
                children: [
                    { text: ["\n"] },
                    ...children.map(
                        child => child[0]
                    )
                ]
            }
        }
    ),
    tag: Rule(
        { indent: Rule.indent },
        ":",
        { type: Rule.$or(
            [/[a-zA-Z][^\s\]]*/],
            [Rule.insert]
        ) },
        Rule.eoc,
        { props: Rule.$repeat(0)(
            ([ prop ], _, { indent }) =>
                prop.indent.length === indent.length,
            Rule.$or(
                [Rule.attr],
                [Rule.restAttr]
            )
        ) },
        { children: Rule.$repeat(0)(
            ([item], _, { indent }) => (
                item.text?.[0] === ""
                || item.indent.length > indent.length
            ),
            Rule.$or(
                [Rule.tag],
                [Rule.tagLine],
                [Rule.textLine],
                [Rule.emptyLine],
            )
        ) },
        ({ indent, type, children, props }) => {
            return {
                indent,
                type,
                props: props.map(
                    prop => prop[0].pair
                ),
                children: [
                    { text: ["\n"] },
                    ...children.map(
                        child => child[0]
                    )
                ]
            }
        }
    ),
    tagLine: Rule(
        { indent: Rule.indent },
        ":",
        {
            type: Rule.$or(
                [/[a-zA-Z][^\s\]]*/],
                [Rule.insert]
            )
        },
        Rule.space,
        { props: Rule.$opt(Rule.inlineAttrs) },
        {
            text: Rule.$repeat(1)(
                Rule.$or(
                    [/[^\r\n\0]+/],
                    [Rule.insert],
                )
            )
        },
        Rule.eoc,
        ({ indent, type, text, props }) => ({
            indent,
            type,
            props: props?.[0] ?? [],
            children: [
                { indent: `${indent} `, text: text.flat() }
            ]
        })
    ),
    textLine: Rule(
        { indent: Rule.indent },
        { text: Rule.$repeat(1)(
            Rule.$or(
                [/[^\r\n\0]+/],
                [Rule.insert],
            )
        ) },
        Rule.eoc,
        ({ indent, text }) => ({ indent, text: [ indent, ...text.flat(), "\n" ] })
    ),
    indent: Rule(
        /[\t ]*/,
        ([ indent ]) => indent
    ),
    eol: Rule(
        /\r?\n/
    ),
    emptyLine: Rule(
        Rule.indent,
        Rule.eol,
        ([ indent ]) => ({ indent, text: [ "", "\n" ] })
    ),
    eoc: Rule(
        Rule.$or(
            [Rule.eol],
            [Rule.eof]
        )
    ),
    insert: Rule(
        "\0",
        { index: /\d+/ },
        "\0",
        ({ index }, _, { secret }) => ({ [secret]: index })
    ),
    restAttr: Rule(
        { indent: Rule.indent },
        "...",
        { value: Rule.insert },
        Rule.eoc,
        ({ indent, value }) => ({ indent, pair: value })
    ),
    attr: Rule(
        { indent: Rule.indent },
        ".",
        { name: Rule.attrName },
        { value: Rule.$opt(
            Rule.space,
            Rule.attrValue,
            Rule.$repeat(0)(
                Rule.eol,
                Rule.indent,
                "/ ",
                Rule.attrValue
            )
        ) },
        Rule.eoc,
        ({ indent, name, value }) => {
            const attrParts =
                (value === null)
                ? [true]
                : [
                    value[1],
                    ...value[2].map(
                        part => part[3]
                    )
                ].flat(1)
            const attrValue =
                (attrParts.length === 1)
                ? attrParts[0]
                : attrParts.join(" ")
            return {
                indent,
                pair: [name, attrValue]
            }
        }
    ),
    inlineAttr: Rule(
        ".",
        { name: Rule.attrName },
        Rule.space,
        { value: Rule.$or(
            [Rule.string],
            [Rule.insert]
        ) },
        ({ name, value }) => [name, value]
    ),
    inlineAttrs: Rule(
        "[",
        { first: Rule.inlineAttr },
        { rest: Rule.$repeat(0)(
            Rule.space,
            "/",
            Rule.space,
            Rule.inlineAttr
        ) },
        "]",
        ({ first, rest }) => [
            first,
            ...rest.map(
                item => item[3]
            )
        ]
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
        Rule.$repeat(1)(
            Rule.$or(
                [/[^\r\n\0]+/],
                [Rule.insert]
            )
        ),
        ([value]) => value.map(item => item[0])
    ),
    string: Rule(
        /"(\\"|[^"])*"/,
        ([str]) => JSON.parse(str)
    ),
})
