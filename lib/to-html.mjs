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
    "svelte:self",
    "svelte:component",
    "svelte:window",
    "svelte:document",
    "svelte:body",
    "svelte:options",
]

const attrValue = (value) => value.toString().replace(/"/g, "&quot;")
const toHTML = (node) => {
    if (Array.isArray(node) === true) {
        return node.map(toHTML).join("\n")
    }
    if (node.text !== undefined) {
        return `${node.indent}${node.text.join("")}`
    }

    const { type, children, props, indent } = node
    const attrs =
        Object.entries(props)
            .map(
                ([key, value]) => {
                    if (value === null || value === undefined || value === false) {
                        return null
                    }
                    if (value === true || value === "") {
                        return key
                    }
                    return `${key}="${attrValue(value)}"`
                }
            )
            .filter(prop => prop !== null)
            .join(" ")
    if (voids.includes(type) === true) {
        return `${indent}<${type} ${attrs} />`
    }
    if (children.length === 0) {
        return `${indent}<${type} ${attrs}></${type}>`
    }
    // const childContent = node.children.map(toHTML).join("\n")
    return `${indent}<${type} ${attrs}>\n${toHTML(children)}\n${indent}</${type}>`
}

export default toHTML
