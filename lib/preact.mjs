import { h } from "preact"
import amlParse from "../dist/module.mjs"

export * from "preact"
export * from "@preact/signals"

const prep = (items, depth, mapFunc) =>
    items
        .flat(depth)
        .map(mapFunc)
        .filter(item => item !== null)
const preactify = (node) => {
    if (node.text !== undefined) {
        if (node.text.length === 0) {
            return null
        }
        return node.text
    }
    return h(
        node.type,
        node.props,
        ...prep(node.children, 1, preactify)
        // ...node.children.flat(1).map(preactify)
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
    const items = amlParse(input, { values })
    return prep(items, 0, preactify)
}
