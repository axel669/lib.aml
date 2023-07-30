import aml from "./parser-compiled.mjs"
// import parser from "./parser.mjs"

// const aml = parser.parse

const index = Symbol("index")
const codeValue = (value) => {
    if (value[index] !== undefined) {
        return `values[${value[index]}]`
    }
    return JSON.stringify(value)
}
const codeProp = (pair) => {
    if (pair[index] !== undefined) {
        return `...values[${pair[index]}]`
    }
    const key = JSON.stringify(pair[0])
    const value = codeValue(pair[1])
    return `${key}: ${value}`
}
const codify = (node) => {
    if (node.text !== undefined) {
        return node.text.map(codeValue).join(", ")
        // console.log("text", node.text)
        // return
    }
    return [
        "build(",
        codeValue(node.type),
        ",{",
        node.props.map(codeProp).join(",\n"),
        "},",
        node.children.map(codify).join(",\n"),
        ")",
    ].join("\n")
    // console.group(codeValue(node.type))
    // console.groupEnd()
    // console.group("tag", node.type)
    // console.log("props", node.props)
    // node.children.map(codify)
    // console.groupEnd()
}

const use = (builder) => {
    const cache = new Map()
    return (parts, ...values) => {
        if (cache.has(parts) === true) {
            if (parts.length === 1) {
                return cache.get(parts)
            }
            return cache.get(parts)(builder, values)
        }
        const input =
            parts
                .map(
                    (part, index) =>
                        (index !== parts.length - 1)
                            ? `${part}\0${index}\0`
                            : part
                )
                .join("")
        const items = aml(input, { secret: index })

        const gen = new Function(
            "build",
            "values",
            `return [${items.map(codify).join(",\n")}]`
        )

        const result = gen(builder, values)
        cache.set(parts, (parts.length === 1) ? result : gen)

        return result
        // console.log(gen)
        // console.dir(
        //     items.map(codify).join(",\n"),
        //     { depth: null }
        // )
        // console.dir(
        //     gen(builder, values),
        //     { depth: null }
        // )

        // return items

        // const structure = JSON.stringify(items, null, 4).replace(
        //     /"\\u0000(\d+)\\u0000"/g,
        //     (_, n) => `values[${n}]`
        // )
        // const gen = new Function(
        //     "values",
        //     `return ${structure}`
        // )
    }
}

const amlTag = use(
    (type, props, ...children) => ({ type, props, children })
)
amlTag.use = use

export default amlTag
// export { cache }
