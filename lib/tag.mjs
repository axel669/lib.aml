import aml from "./proteus.mjs"

export default (parts, ...values) => {
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
    return items
}
