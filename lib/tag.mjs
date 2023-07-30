import aml from "./parser-compiled.mjs"

const cache = new Map()
const tag = (parts, ...values) => {
    if (cache.has(parts) === true) {
        if (parts.length === 1) {
            return cache.get(parts)
        }
        return cache.get(parts)(values)
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
    const items = aml(input, { values })

    const structure = JSON.stringify(items, null, 4).replace(
        /"\\u0000(\d+)\\u0000"/g,
        (_, n) => `values[${n}]`
    )
    const gen = new Function(
        "values",
        `return ${structure}`
    )
    cache.set(parts, (parts.length === 1) ? gen() : gen)

    return gen(values)
}

export default tag
export { cache }
