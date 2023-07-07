import { h } from "preact"
import tag from "./tag.mjs"

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
    )
}
export const aml = (parts, ...values) => prep(
    tag(parts, ...values),
    0,
    preactify
)
