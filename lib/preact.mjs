import { h } from "preact"
import amlParse from "../dist/module.mjs"

export * from "preact"

const preactify = (node) => {
    if (node.text !== undefined) {
        return node.text
    }
    return h(
        node.type,
        node.props,
        ...node.children.map(preactify)
    )
}
export const aml = (parts, ...values) => {
    const input =
        parts
            .map(
                (part, index) =>
                    (index !== parts.length - 1)
                        ? `${part}\0${index}\0`
                        : part
            )
            .join("")
        + "\n"
    const items = amlParse(input, { values })
    return items.map(preactify)
}
