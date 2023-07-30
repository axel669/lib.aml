const voids = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]
export const render = (node) => {
    if (Array.isArray(node) === true) {
        return node.map(render).join("\n")
    }
    // if (node?.__type === undefined) {
    //     return node
    // }
    // const indent = (typeof node.indent === "string") ? node.indent : ""
    const { indent } = node
    if (node.text !== undefined) {
        return `${indent}${node.text}`
    }
    // if (node.__type === "tag") {
    const { type, children } = node
    const attrs =
        Object.entries(node.props)
            .map(
                ([key, value]) => {
                    if (value === null || value === undefined || value === false) {
                        return null
                    }
                    if (value === true || value === "") {
                        return key
                    }
                    return `${key}="${value.toString().replace(/"/g, "&quot;") ?? ""}"`
                }
            )
            .filter(prop => prop !== null)
            .join(" ")
    if (voids.includes(type) === true) {
        return `${indent ?? ""}<${type} ${attrs} />`
    }
    if (children.length === 0) {
        return `${indent}<${type} ${attrs}></${type}>`
    }
    if (node.indent === undefined) {
        const innerText = node.children.map(render).join("")
        return `<${type} ${attrs}>${innerText}${indent}</${type}>`
    }
    const childContent = node.children.map(render).join("\n")
    return `${indent}<${type} ${attrs}>\n${childContent}\n${indent}</${type}>`
    // }
    // const items = node.children.map(render).join("")
    // return `${indent}${items}`
}
